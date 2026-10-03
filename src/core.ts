import { Hono } from "hono";
import { DuitkuPop, POP_PRODUCTION, PopError } from "./duitku-pop.js";

export type CoreBindings = {
  PAYMENTS_ENABLED?: string;
  DUITKU_ENV?: string;
  DUITKU_MERCHANT_CODE?: string;
  DUITKU_API_KEY?: string;
  DUITKU_API_FAMILY?: string;
  DUITKU_SIGNING_PROFILE?: string;
  DUITKU_CONTRACT_VERIFIED?: string;
};

// POP adapter exists, but production commerce lacks verified merchant configuration,
// durable storage and approved products. No environment flag may bypass these gates.
const app = new Hono<{ Bindings: CoreBindings }>();
app.use("*", async (c, next) => {
  await next();
  c.header("Cache-Control", "no-store");
  c.header("X-Content-Type-Options", "nosniff");
  c.header("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  c.header("Referrer-Policy", "no-referrer");
  c.header("Strict-Transport-Security", "max-age=31536000");
});
app.use("*", async (c, next) => {
  if (c.req.url.length > 2048)
    return c.json({ error: { code: "REQUEST_TOO_LONG" } }, 414);
  await next();
});
for (const path of ["/health", "/ready"]) {
  app.use(path, async (c, next) => {
    if (!["GET", "HEAD"].includes(c.req.method)) {
      c.header("Allow", "GET, HEAD");
      return c.json({ error: { code: "METHOD_NOT_ALLOWED" } }, 405);
    }
    await next();
  });
}
app.get("/health", (c) => c.json({ status: "ok", service: "ranel-core" }));
app.get("/ready", (c) => c.json({
  status: "not_ready",
  paymentsEnabled: false,
  code: "PAYMENT_INTEGRATION_NOT_ACTIVATED",
}, 503));

// No parsing/logging of customer or callback bodies. Never acknowledge a callback
// as processed without signature verification and an atomic durable receipt.
app.post("/api/v1/payments", (c) => c.json({
  error: { code: "PAYMENTS_DISABLED" },
}, 503));
app.post("/api/v1/webhooks/duitku", async (c) => {
  if (c.env?.DUITKU_API_FAMILY !== "pop" ||
    c.env?.DUITKU_SIGNING_PROFILE !== POP_PRODUCTION.profile ||
    c.env?.DUITKU_CONTRACT_VERIFIED !== "true" ||
    c.env?.DUITKU_ENV !== "production" || !c.env?.DUITKU_API_KEY ||
    !c.env?.DUITKU_MERCHANT_CODE) {
    return c.json({ error: { code: "CALLBACK_PROCESSING_UNAVAILABLE" } }, 503);
  }
  try {
    const adapter = new DuitkuPop({
      merchantCode: c.env.DUITKU_MERCHANT_CODE,
      apiKey: c.env.DUITKU_API_KEY,
      environment: "production",
      merchantContractVerified: true,
      paymentsEnabled: false,
      coreOrigin: new URL(c.req.url).origin,
    });
    await adapter.authenticateCallback(c.req.raw);
    // Authentication alone is not paid-state proof: result/reference are unsigned.
    // Until corroboration and atomic persistence exist, NEVER acknowledge success.
    return c.json({ error: { code: "CALLBACK_PROCESSING_UNAVAILABLE" } }, 503);
  } catch (error) {
    if (error instanceof PopError) {
      if (error.code === "INVALID_CALLBACK_SIGNATURE")
        return c.json({ error: { code: "INVALID_CALLBACK_SIGNATURE" } }, 401);
      if (error.code === "BODY_TOO_LARGE")
        return c.json({ error: { code: "BODY_TOO_LARGE" } }, 413);
      if (["INVALID_CALLBACK_FORMAT", "INVALID_CALLBACK_SCHEMA", "CALLBACK_MERCHANT_MISMATCH"].includes(error.code))
        return c.json({ error: { code: "INVALID_CALLBACK" } }, 400);
      return c.json({ error: { code: "CALLBACK_PROCESSING_UNAVAILABLE" } }, 503);
    }
    return c.json({ error: { code: "INTERNAL_ERROR" } }, 500);
  }
});
app.get("/api/v1/payments/return", (c) => c.json({
  status: "unverified",
  message: "Browser return is not payment evidence.",
}, 202));
app.all("*", (c) => c.json({ error: { code: "NOT_FOUND" } }, 404));
app.onError((_error, c) => c.json({ error: { code: "INTERNAL_ERROR" } }, 500));
export default app;
