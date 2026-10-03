import { Hono } from "hono";

export type CoreBindings = {
  PAYMENTS_ENABLED?: string;
  DUITKU_ENV?: string;
  DUITKU_MERCHANT_CODE?: string;
  DUITKU_API_KEY?: string;
};

// Bounded integration seam only. No invoice client, callback verifier, auth or
// durable store is installed. Environment variables alone cannot activate it.
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
app.post("/api/v1/webhooks/duitku", (c) => c.json({
  error: { code: "CALLBACK_PROCESSING_UNAVAILABLE" },
}, 503));
app.get("/api/v1/payments/return", (c) => c.json({
  status: "unverified",
  message: "Browser return is not payment evidence.",
}, 202));
app.all("*", (c) => c.json({ error: { code: "NOT_FOUND" } }, 404));
app.onError((_error, c) => c.json({ error: { code: "INTERNAL_ERROR" } }, 500));
export default app;
