import test from "node:test";
import assert from "node:assert/strict";
import app from "../qa-artifacts/core-build/core.js";
import {
  planPaymentTransition,
  PaymentContractError,
} from "../qa-artifacts/core-build/payment-domain.js";

const request = (path, env = {}, init = {}) =>
  app.fetch(new Request(`https://core.invalid${path}`, init), env, {});
const order = {
  id: "fixture-order", merchant: "fixture-merchant", reference: "fixture-ref",
  amount: 10000, currency: "IDR", state: "pending", fulfillment: "not_started",
};
const event = {
  eventId: "fixture-event", orderId: order.id, merchant: order.merchant,
  reference: order.reference, amount: order.amount, currency: "IDR",
  outcome: "paid", source: "verified_provider",
};
const rejects = (stored, incoming, code) => assert.throws(
  () => planPaymentTransition(stored, incoming),
  (err) => err instanceof PaymentContractError && err.code === code,
);

test("health is minimal; readiness remains unavailable", async () => {
  const health = await request("/health");
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok", service: "ranel-core" });
  const ready = await request("/ready");
  assert.equal(ready.status, 503);
  assert.equal((await ready.json()).paymentsEnabled, false);
});

for (const path of ["/health", "/ready"]) {
  test(`${path} has a GET/HEAD-only contract`, async () => {
    const response = await request(path, {}, { method: "POST" });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "GET, HEAD");
    const head = await request(path, {}, { method: "HEAD" });
    assert.equal(await head.text(), "");
  });
}

for (const env of [{}, { PAYMENTS_ENABLED: "false" }, {
  PAYMENTS_ENABLED: "true", DUITKU_ENV: "production",
  DUITKU_API_KEY: "fictional-test-only-secret", DUITKU_MERCHANT_CODE: "fictional-code",
}]) {
  test(`initiation and callback fail closed with flag ${env.PAYMENTS_ENABLED ?? "missing"}`, async () => {
    for (const path of ["/api/v1/payments", "/api/v1/webhooks/duitku"]) {
      const response = await request(path, env, { method: "POST", body: "{bad-json" });
      assert.equal(response.status, 503);
      assert.equal(response.headers.get("cache-control"), "no-store");
      const body = await response.text();
      assert.doesNotMatch(body, /fictional-test-only-secret|fictional-code|bad-json/);
    }
  });
}

test("forged return result never establishes paid state", async () => {
  const response = await request("/api/v1/payments/return?resultCode=00&paid=true&amount=1");
  assert.equal(response.status, 202);
  assert.equal((await response.json()).status, "unverified");
});

test("unknown lookup is absent, and rejected URLs retain security headers", async () => {
  assert.equal((await request("/api/v1/orders/fixture-order")).status, 404);
  const response = await request(`/health?q=${"x".repeat(2048)}`);
  assert.equal(response.status, 414);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("pure paid plan preserves input, requires manual fulfillment and returns minimal audit", () => {
  const result = planPaymentTransition(order, event);
  assert.equal(result.order.state, "paid");
  assert.equal(result.order.fulfillment, "manual_pending");
  assert.equal(order.state, "pending");
  assert.deepEqual(result.audit, {
    eventId: event.eventId, orderId: order.id, type: "payment.confirmed",
    from: "pending", to: "paid", source: "verified_provider",
  });
});

test("failed plan does not grant fulfillment", () => {
  const result = planPaymentTransition(order, { ...event, outcome: "failed" });
  assert.equal(result.order.state, "failed");
  assert.equal(result.order.fulfillment, "not_started");
});

test("unknown order is rejected", () => rejects(null, event, "ORDER_NOT_FOUND"));
for (const [field, value] of [
  ["orderId", "other-order"], ["merchant", "other-merchant"],
  ["reference", "other-ref"], ["amount", 9999],
]) {
  test(`stored ${field} mismatch is rejected`, () =>
    rejects(order, { ...event, [field]: value }, "PAYMENT_CORRELATION_MISMATCH"));
}
for (const [field, value] of [
  ["amount", 0], ["amount", 1.5], ["amount", Number.MAX_SAFE_INTEGER + 1],
  ["currency", "USD"], ["outcome", "refunded"], ["source", "browser"],
  ["eventId", "x".repeat(129)], ["reference", ""],
]) {
  test(`invalid event ${field}=${String(value).slice(0, 24)} rejected`, () =>
    rejects(order, { ...event, [field]: value }, "INVALID_VERIFIED_EVENT"));
}
for (const state of ["paid", "failed", "fulfilled"]) {
  test(`terminal or invalid state ${state} rejects replay or reversal`, () =>
    rejects({ ...order, state }, event, "ILLEGAL_PAYMENT_TRANSITION"));
}

test("all duplicate callbacks remain unavailable without a durable receipt implementation", async () => {
  for (let i = 0; i < 2; i++) {
    const response = await request("/api/v1/webhooks/duitku", {}, {
      method: "POST", body: "signature=forged&merchantOrderId=fixture-order&resultCode=00",
    });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error.code, "CALLBACK_PROCESSING_UNAVAILABLE");
  }
});
