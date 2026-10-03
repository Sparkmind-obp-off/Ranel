import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { DuitkuPop, popRequestSignature, POP_PRODUCTION } from "../qa-artifacts/core-build/duitku-pop.js";
import { POP_SCRIPT_URL, launchPopCheckout, loadProductionPop } from "../qa-artifacts/core-build/pop-checkout.js";
import app from "../qa-artifacts/core-build/core.js";

// Fictional fixtures only. Never load production credential files in a test.
const key = "fictional-fixture-key-not-live";
const config = {
  merchantCode: "FIXTURE", apiKey: key, environment: "production",
  merchantContractVerified: true, paymentsEnabled: true,
  coreOrigin: "https://core.invalid", timeoutMs: 100,
};
const order = { orderId: "fixture-order", amount: 10000, currency: "IDR",
  productDetails: "Fictional test product", email: "fixture@example.invalid" };
const invoice = { merchantCode: config.merchantCode, reference: "fixture-reference",
  paymentUrl: "https://app-prod.duitku.com/redirect_checkout?reference=fixture-reference", statusCode: "00" };
const jsonResponse = (data = invoice) => new Response(JSON.stringify(data), {
  headers: { "content-type": "application/json" },
});
const rejection = (promise, code) => assert.rejects(promise, {
  name: "PopError", message: code,
});
const sign = (text) => createHmac("sha256", key).update(text).digest("hex");
const callbackFields = () => ({
  merchantCode: config.merchantCode, merchantOrderId: order.orderId,
  amount: "10000", reference: invoice.reference, resultCode: "00",
  signature: sign(config.merchantCode + "10000" + order.orderId),
});
const callback = (fields = callbackFields(), extra = "") => new Request("https://core.invalid/callback", {
  method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams(fields).toString() + extra,
});

test("POP request HMAC uses merchant + exact millisecond timestamp with key separately", async () => {
  const timestamp = "1700000000000";
  assert.equal(await popRequestSignature(config.merchantCode, timestamp, key),
    sign(config.merchantCode + timestamp));
  await rejection(popRequestSignature(config.merchantCode, "1700000000", key), "INVALID_SIGNING_INPUT");
  await rejection(popRequestSignature(config.merchantCode, timestamp, ""), "MISSING_PROVIDER_CONFIG");
});

test("POP invoice dispatch is production-only, signed, single-attempt and remains pending", async () => {
  let calls = 0;
  const adapter = new DuitkuPop(config, async (url, init) => {
    calls++;
    assert.equal(url, POP_PRODUCTION.invoice);
    assert.equal(init.redirect, "error");
    assert.equal(init.headers["x-duitku-signature"], sign(config.merchantCode + "1700000000000"));
    const body = JSON.parse(init.body);
    assert.equal(body.paymentAmount, order.amount);
    assert.equal(body.merchantOrderId, order.orderId);
    assert.equal(body.callbackUrl, "https://core.invalid/api/v1/webhooks/duitku");
    assert.equal(body.returnUrl, "https://core.invalid/api/v1/payments/return");
    assert.equal("apiKey" in body, false);
    return jsonResponse();
  }, () => 1700000000000);
  const result = await adapter.createInvoice(order);
  assert.equal(calls, 1);
  assert.deepEqual(result, { reference: invoice.reference,
    paymentUrl: invoice.paymentUrl + "&lang=id", status: "pending" });
});

for (const [patch, code] of [
  [{ paymentsEnabled: false }, "PAYMENTS_DISABLED"],
  [{ environment: "sandbox" }, "PRODUCTION_REQUIRED"],
  [{ merchantContractVerified: false }, "MERCHANT_CONTRACT_NOT_VERIFIED"],
  [{ apiKey: "" }, "MISSING_PROVIDER_CONFIG"],
  [{ coreOrigin: "http://core.invalid" }, "INVALID_PROVIDER_CONFIG"],
]) {
  test(`invoice config failure ${code} makes no network request`, async () => {
    let calls = 0;
    const adapter = new DuitkuPop({ ...config, ...patch }, async () => { calls++; return jsonResponse(); });
    await rejection(adapter.createInvoice(order), code);
    assert.equal(calls, 0);
  });
}

for (const patch of [{ amount: -1 }, { amount: 1.2 }, { currency: "USD" },
  { orderId: "" }, { email: "invalid" }, { productDetails: "x".repeat(256) }]) {
  test(`invalid persisted-order field ${Object.keys(patch)[0]} is rejected before dispatch`, async () => {
    let calls = 0;
    const adapter = new DuitkuPop(config, async () => { calls++; return jsonResponse(); });
    await rejection(adapter.createInvoice({ ...order, ...patch }), "INVALID_SERVER_ORDER");
    assert.equal(calls, 0);
  });
}

for (const patch of [
  { paymentUrl: "https://attacker.invalid/redirect_checkout?reference=fixture-reference" },
  { paymentUrl: "https://user@app-prod.duitku.com/redirect_checkout?reference=fixture-reference" },
  { paymentUrl: "https://app-prod.duitku.com/redirect_checkout?reference=other" },
  { paymentUrl: invoice.paymentUrl + "&reference=other" },
  { reference: "" }, { merchantCode: "OTHER" }, { statusCode: "01" },
]) {
  test(`malformed provider ${Object.keys(patch)[0]} cannot yield checkout`, async () => {
    const adapter = new DuitkuPop(config, async () => jsonResponse({ ...invoice, ...patch }));
    await rejection(adapter.createInvoice(order), "PROVIDER_INVALID_RESPONSE");
  });
}

test("non-JSON and oversized provider responses fail without reflecting content", async () => {
  const invalid = new DuitkuPop(config, async () => new Response(key));
  await rejection(invalid.createInvoice(order), "PROVIDER_INVALID_RESPONSE");
  const oversized = new DuitkuPop(config, async () => new Response("x".repeat(65537), {
    headers: { "content-type": "application/json" },
  }));
  await rejection(oversized.createInvoice(order), "BODY_TOO_LARGE");
});

test("HTTP error and network failure have unknown outcome and are never retried", async () => {
  for (const failure of [() => new Response(key, { status: 500 }), () => { throw new Error(key); }]) {
    let calls = 0;
    const adapter = new DuitkuPop(config, async () => { calls++; return failure(); });
    await rejection(adapter.createInvoice(order), "PROVIDER_OUTCOME_UNKNOWN");
    assert.equal(calls, 1);
  }
});

test("bounded timeout has unknown outcome and exactly one dispatch", async () => {
  let calls = 0;
  const adapter = new DuitkuPop({ ...config, timeoutMs: 50 }, async (_url, init) => {
    calls++;
    return new Promise((_resolve, reject) => init.signal.addEventListener("abort", () => reject(new Error("abort"))));
  });
  await rejection(adapter.createInvoice(order), "PROVIDER_OUTCOME_UNKNOWN");
  assert.equal(calls, 1);
});

test("POP callback HMAC is independent of request signing; disablement leaves authentication available", async () => {
  const adapter = new DuitkuPop({ ...config, paymentsEnabled: false });
  const result = await adapter.authenticateCallback(callback());
  assert.equal(result.authority, "authenticated_notification_only");
  assert.equal("outcome" in result, false);
  assert.equal("signature" in result, false);
  const fields = callbackFields();
  fields.signature = sign(config.merchantCode + "1700000000000");
  await rejection(adapter.authenticateCallback(callback(fields)), "INVALID_CALLBACK_SIGNATURE");
});

for (const patch of [{ signature: "" }, { signature: "0".repeat(64) }, { amount: "9999" },
  { merchantOrderId: "other-order" }]) {
  test(`callback forged ${Object.keys(patch)[0]} rejected`, async () => {
    await rejection(new DuitkuPop(config).authenticateCallback(callback({ ...callbackFields(), ...patch })),
      "INVALID_CALLBACK_SIGNATURE");
  });
}

test("callback merchant mismatch, duplicates, oversized body and invalid type rejected", async () => {
  const adapter = new DuitkuPop(config);
  await rejection(adapter.authenticateCallback(callback({ ...callbackFields(), merchantCode: "OTHER" })), "CALLBACK_MERCHANT_MISMATCH");
  await rejection(adapter.authenticateCallback(callback(callbackFields(), "&%61mount=10000")), "INVALID_CALLBACK_SCHEMA");
  await rejection(adapter.authenticateCallback(callback(callbackFields(), "&currency=USD")), "INVALID_CALLBACK_SCHEMA");
  await rejection(adapter.authenticateCallback(callback(callbackFields(), "&ignored=" + "x".repeat(16384))), "BODY_TOO_LARGE");
  await rejection(adapter.authenticateCallback(new Request("https://core.invalid/callback", {
    method: "POST", headers: { "content-type": "application/json" }, body: "{}",
  })), "INVALID_CALLBACK_FORMAT");
});

test("unsigned callback result/reference tampering still never creates payment authority", async () => {
  const adapter = new DuitkuPop(config);
  for (const patch of [{ resultCode: "01" }, { reference: "other-reference" }]) {
    const result = await adapter.authenticateCallback(callback({ ...callbackFields(), ...patch }));
    assert.equal(result.authority, "authenticated_notification_only");
    assert.equal("outcome" in result, false);
  }
});

test("Core verifies configured fixture callback, rejects invalid signature, never acknowledges paid/duplicate success", async () => {
  const env = { DUITKU_API_KEY: key, DUITKU_MERCHANT_CODE: config.merchantCode,
    DUITKU_ENV: "production", DUITKU_API_FAMILY: "pop", DUITKU_CONTRACT_VERIFIED: "true",
    DUITKU_SIGNING_PROFILE: POP_PRODUCTION.profile, PAYMENTS_ENABLED: "false" };
  for (let i = 0; i < 2; i++) {
    const req = callback();
    const res = await app.fetch(new Request("https://core.invalid/api/v1/webhooks/duitku", req), env, {});
    assert.equal(res.status, 503);
  }
  const req = callback({ ...callbackFields(), signature: "0".repeat(64) });
  const response = await app.fetch(new Request("https://core.invalid/api/v1/webhooks/duitku", req), env, {});
  assert.equal(response.status, 401);
  assert.doesNotMatch(await response.text(), /fictional-fixture-key|fixture-order/);
});

test("production POP browser bridge ignores all client outcome claims and refreshes server status", async () => {
  assert.equal(POP_SCRIPT_URL, POP_PRODUCTION.script);
  let options;
  let refreshes = 0;
  let errors = 0;
  const checkout = { process: (reference, passed) => {
    assert.equal(reference, "fixture-reference"); options = passed;
  } };
  launchPopCheckout("fixture-reference", checkout, async () => { refreshes++; }, () => { errors++; });
  for (const name of ["successEvent", "pendingEvent", "errorEvent", "closeEvent"])
    options[name]({ paid: true, resultCode: "00" });
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(refreshes, 4);
  assert.equal(errors, 0);
  assert.throws(() => launchPopCheckout("<script>", checkout, async () => {}, () => {}), /INVALID_PAYMENT_REFERENCE/);
});

test("browser refresh failure cannot become payment success", async () => {
  let options;
  let errors = 0;
  launchPopCheckout("fixture-reference", { process: (_reference, passed) => { options = passed; } },
    async () => { throw new Error("offline"); }, () => { errors++; });
  options.successEvent();
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(errors, 1);
});

test("production script loader handles an existing module or denied script without logging", async () => {
  const existing = { process: () => {} };
  assert.equal(await loadProductionPop({ defaultView: { checkout: existing } }), existing);
  let script;
  const document = { defaultView: {}, createElement: () => (script = { remove: () => {} }),
    head: { appendChild: () => { assert.equal(script.src, POP_SCRIPT_URL); script.onerror(); } } };
  await assert.rejects(loadProductionPop(document), /POP_SCRIPT_UNAVAILABLE/);
});
