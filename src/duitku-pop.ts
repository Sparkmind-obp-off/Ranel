// Current public POP documentation profile, not classic V2/SNAP or legacy SDK.
// Merchant-specific HMAC support MUST be verified before production activation.
export const POP_PRODUCTION = {
  invoice: "https://api-prod.duitku.com/api/merchant/createInvoice",
  script: "https://app-prod.duitku.com/lib/js/duitku.js",
  checkoutOrigin: "https://app-prod.duitku.com",
  profile: "pop-docs-hmac-sha256-2026-10-03",
} as const;

export class PopError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "PopError";
  }
}
const fail = (code: string): never => { throw new PopError(code); };
const id = (value: unknown, max: number): value is string =>
  typeof value === "string" && new RegExp(`^[A-Za-z0-9_-]{1,${max}}$`).test(value);
const amountValid = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0;
const encoder = new TextEncoder();

async function signingKey(key: string) {
  if (typeof key !== "string" || key.length < 16 || key.length > 256)
    return fail("MISSING_PROVIDER_CONFIG");
  return crypto.subtle.importKey("raw", encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function popRequestSignature(merchant: string, timestamp: string, key: string) {
  if (!id(merchant, 50) || !/^\d{13}$/.test(timestamp))
    return fail("INVALID_SIGNING_INPUT");
  const signed = await crypto.subtle.sign("HMAC", await signingKey(key),
    encoder.encode(merchant + timestamp));
  return Array.from(new Uint8Array(signed), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function boundedText(response: Response | Request, max: number) {
  const announced = response.headers.get("content-length");
  if (announced && (!/^\d+$/.test(announced) || Number(announced) > max))
    return fail("BODY_TOO_LARGE");
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      total += part.value.byteLength;
      if (total > max) {
        await reader.cancel();
        return fail("BODY_TOO_LARGE");
      }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { result.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder("utf-8", { fatal: true }).decode(result);
}

export type PopConfig = {
  merchantCode: string;
  apiKey: string;
  environment: "production";
  merchantContractVerified: boolean;
  paymentsEnabled: boolean;
  coreOrigin: string;
  timeoutMs?: number;
};
// A persisted, server-priced order snapshot, never a browser-controlled price.
export type PopInvoiceOrder = {
  orderId: string;
  amount: number;
  currency: "IDR";
  productDetails: string;
  email: string;
  customerVaName?: string;
};
export type PopNotification = {
  merchantCode: string;
  orderId: string;
  amount: number;
  currency: "IDR";
  reference: string;
  resultCode: "00" | "01";
  authority: "authenticated_notification_only";
};

export class DuitkuPop {
  private readonly timeoutMs: number;
  constructor(private readonly config: PopConfig,
    private readonly transport: typeof fetch = fetch,
    private readonly clock: () => number = Date.now) {
    this.timeoutMs = config.timeoutMs ?? 8000;
    if (!Number.isInteger(this.timeoutMs) || this.timeoutMs < 50 || this.timeoutMs > 10000)
      fail("INVALID_PROVIDER_CONFIG");
  }
  private assertContract() {
    const c = this.config;
    if (c.environment !== "production") fail("PRODUCTION_REQUIRED");
    if (!c.merchantContractVerified) fail("MERCHANT_CONTRACT_NOT_VERIFIED");
    if (!id(c.merchantCode, 50) || typeof c.apiKey !== "string" ||
      c.apiKey.length < 16 || c.apiKey.length > 256) fail("MISSING_PROVIDER_CONFIG");
  }
  async createInvoice(order: PopInvoiceOrder) {
    if (!this.config.paymentsEnabled) return fail("PAYMENTS_DISABLED");
    this.assertContract();
    if (!id(order.orderId, 50) || !amountValid(order.amount) || order.currency !== "IDR" ||
      typeof order.productDetails !== "string" || !order.productDetails.trim() ||
      order.productDetails.length > 255 || typeof order.email !== "string" ||
      order.email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) ||
      (order.customerVaName !== undefined && (typeof order.customerVaName !== "string" ||
        order.customerVaName.length > 20))) return fail("INVALID_SERVER_ORDER");
    let origin: URL;
    try { origin = new URL(this.config.coreOrigin); }
    catch { return fail("INVALID_PROVIDER_CONFIG"); }
    if (origin.protocol !== "https:" || origin.username || origin.password ||
      origin.pathname !== "/" || origin.search || origin.hash) return fail("INVALID_PROVIDER_CONFIG");
    const timestamp = String(this.clock());
    const signature = await popRequestSignature(this.config.merchantCode, timestamp, this.config.apiKey);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      // One attempt only. A network timeout after dispatch has UNKNOWN outcome;
      // callers must persist uncertainty and reconcile, never blindly retry.
      const response = await this.transport(POP_PRODUCTION.invoice, {
        method: "POST", redirect: "error", signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-duitku-timestamp": timestamp,
          "x-duitku-merchantcode": this.config.merchantCode,
          "x-duitku-signature": signature,
        },
        body: JSON.stringify({
          paymentAmount: order.amount, merchantOrderId: order.orderId,
          productDetails: order.productDetails, email: order.email,
          ...(order.customerVaName ? { customerVaName: order.customerVaName } : {}),
          callbackUrl: new URL("/api/v1/webhooks/duitku", origin).href,
          returnUrl: new URL("/api/v1/payments/return", origin).href,
          expiryPeriod: 60,
        }),
      });
      if (response.status !== 200) return fail("PROVIDER_OUTCOME_UNKNOWN");
      if (!response.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
        return fail("PROVIDER_INVALID_RESPONSE");
      let body: unknown;
      try { body = JSON.parse(await boundedText(response, 65536)); }
      catch (error) {
        if (error instanceof PopError) throw error;
        return fail("PROVIDER_INVALID_RESPONSE");
      }
      if (!body || typeof body !== "object" || Array.isArray(body))
        return fail("PROVIDER_INVALID_RESPONSE");
      const result = body as Record<string, unknown>;
      if (result.statusCode !== "00" || result.merchantCode !== this.config.merchantCode ||
        !id(result.reference, 255) || typeof result.paymentUrl !== "string" ||
        result.paymentUrl.length > 2048) return fail("PROVIDER_INVALID_RESPONSE");
      let checkout: URL;
      try { checkout = new URL(result.paymentUrl); }
      catch { return fail("PROVIDER_INVALID_RESPONSE"); }
      if (checkout.origin !== POP_PRODUCTION.checkoutOrigin || checkout.username ||
        checkout.password || checkout.pathname !== "/redirect_checkout" || checkout.hash ||
        checkout.searchParams.getAll("reference").length !== 1 ||
        checkout.searchParams.get("reference") !== result.reference)
        return fail("PROVIDER_INVALID_RESPONSE");
      // Return only required fields; discard raw provider messages/customer details.
      const paymentUrl = new URL("/redirect_checkout", POP_PRODUCTION.checkoutOrigin);
      paymentUrl.searchParams.set("reference", result.reference);
      paymentUrl.searchParams.set("lang", "id");
      return { reference: result.reference, paymentUrl: paymentUrl.href, status: "pending" as const };
    } catch (error) {
      if (controller.signal.aborted) return fail("PROVIDER_OUTCOME_UNKNOWN");
      if (error instanceof PopError) throw error;
      return fail("PROVIDER_OUTCOME_UNKNOWN");
    } finally { clearTimeout(timer); }
  }

  async authenticateCallback(request: Request): Promise<PopNotification> {
    // Kill switch disables new invoices, not authentication of already-issued ones.
    this.assertContract();
    if (request.method !== "POST" ||
      request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
        "application/x-www-form-urlencoded") return fail("INVALID_CALLBACK_FORMAT");
    let text: string;
    try { text = await boundedText(request, 16384); }
    catch (error) {
      if (error instanceof PopError) throw error;
      return fail("INVALID_CALLBACK_FORMAT");
    }
    const fields = new URLSearchParams(text);
    fields.forEach((_value, name) => {
      if (fields.getAll(name).length !== 1) fail("INVALID_CALLBACK_SCHEMA");
    });
    if (fields.has("currency") && fields.get("currency") !== "IDR")
      return fail("INVALID_CALLBACK_SCHEMA");
    const merchantCode = fields.get("merchantCode");
    const rawAmount = fields.get("amount");
    const orderId = fields.get("merchantOrderId");
    const reference = fields.get("reference");
    const resultCode = fields.get("resultCode");
    const signature = fields.get("signature");
    if (!id(merchantCode, 50) || !id(orderId, 50) || !id(reference, 255) ||
      !rawAmount || !/^[1-9]\d{0,15}$/.test(rawAmount) || !amountValid(Number(rawAmount)) ||
      (resultCode !== "00" && resultCode !== "01")) return fail("INVALID_CALLBACK_SCHEMA");
    if (merchantCode !== this.config.merchantCode) return fail("CALLBACK_MERCHANT_MISMATCH");
    if (!signature || !/^[0-9a-f]{64}$/.test(signature)) return fail("INVALID_CALLBACK_SIGNATURE");
    const bytes = Uint8Array.from(signature.match(/.{2}/g)!, (pair) => parseInt(pair, 16));
    const valid = await crypto.subtle.verify("HMAC", await signingKey(this.config.apiKey),
      bytes, encoder.encode(merchantCode + rawAmount + orderId));
    if (!valid) return fail("INVALID_CALLBACK_SIGNATURE");
    // POP callback signature does NOT cover resultCode/reference. It also carries no
    // currency/timestamp. Do NOT manufacture freshness or paid-state authority.
    // Require independent provider status + stored-order correlation + durable receipt.
    return { merchantCode, orderId, amount: Number(rawAmount), currency: "IDR",
      reference, resultCode, authority: "authenticated_notification_only" };
  }
}
