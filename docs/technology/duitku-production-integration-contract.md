# Ranel — Duitku Production Integration Contract

**Status:** LOCKED target contract.
**Provider:** Duitku
**Environment target:** PRODUCTION / LIVE
**Current Ranel state:** Not yet integrated.

## 1. Environment decision
Ranel's intended Duitku integration target is production/live, not sandbox.
The founder has explicitly confirmed that the existing Duitku merchant/API access is production-ready. This remains a founder-confirmed fact until provider-console evidence is captured.
Do not silently switch the integration to sandbox merely to make testing easier.

Official source: [Duitku POP API reference](https://docs.duitku.com/pop/en/) ([Indonesian reference](https://docs.duitku.com/pop/id/)). Read-only documentation verification on 2026-10-02 confirmed POP's production create-invoice URL `https://api-prod.duitku.com/api/merchant/createInvoice`. This URL is a contract reference, **not an authorized operation to execute during routine tests**. No create-invoice or merchant API request was made. The exact API family/version enabled for the Ranel merchant remains unverified; do not mix POP, legacy or SNAP contracts.

## 2. Credential boundary
Production Duitku credentials are secrets.
Recommended secret names include:
- DUITKU_MERCHANT_CODE
- DUITKU_API_KEY
- any additional provider credential explicitly required by the selected Duitku API
Do not commit values, print values, or expose values to the client.

## 3. Integration architecture
The browser/public layer must not call Duitku using privileged credentials.
Expected flow:
PUBLIC → CORE command → Duitku adapter → Duitku production → callback/webhook → CORE verification → order/entitlement state → CONTROL
The Control layer may display authoritative state; it does not become the payment source of truth.

## 4. Production test rule
Because the target is live:
- ordinary CI/unit tests use mocks/fixtures, not real payment transactions;
- integration testing may use safe non-transactional provider checks where appropriate and explicitly scoped;
- creating a real invoice/payment, collecting live funds, refunding, or triggering a real customer transaction requires explicit production-action authorization;
- never use a fake claim of successful payment to pass tests.

## 5. Request/signature controls
Use the current Duitku production API contract for the selected product/API family.
The [official POP reference](https://docs.duitku.com/pop/en/) describes merchant code, timestamp and `x-duitku-signature`, with HMAC-SHA256 wording and family-specific examples. This wording was confirmed through public documentation, **not a merchant-console/credential check**. Before implementing an adapter, pin the enabled API family/version, exact signing input/order, key, timestamp units, encoding/casing and verified known-answer test vectors. The request signature must not be assumed to be the callback or SNAP signature. Never hardcode signatures/credentials or treat the prose label alone as an implemented signing contract.

## 6. Callback/webhook controls
Treat callback data as untrusted until verified.
Required:
1. production callback endpoint is HTTPS;
2. signature validation;
3. source/IP controls where supported and appropriate;
4. payload validation;
5. event/order correlation;
6. idempotency;
7. safe acknowledgement;
8. auditable state transition.
Callback signature algorithm/fields and source-IP controls must be pinned from the selected API family's official documentation and authorized provider evidence before implementation. SNAP-specific callback/IP contracts are **not verified by the POP documentation check**; obtain current references before claiming an allowlist or signature implementation is ready. Never reuse a request-signature rule blindly for callbacks or treat a return URL/UI/AI assertion as a verified payment event.

## 7. Financial truth
Never mark an order paid because a browser returned to Ranel, a payment URL opened, the frontend says success, or an LLM inferred success.
Paid state must be derived from verified provider evidence and Core state rules.

## 8. Production configuration checklist
Before live activation, verify merchant identity, live API credentials, exact Duitku API family/version, production endpoint, enabled payment methods, callback/webhook configuration, signature method, required source/IP controls, payment expiry/status behavior, fees/limits, refund/cancellation behavior, operational fallback, monitoring, and audit evidence.

## 9. Rollback/disablement
The integration must support safe disablement that stops new payment initiation, does not erase historical order/payment records, leaves unresolved transactions explicitly unresolved, and preserves manual reconciliation.

## 10. Current readiness
Architecture target: LOCKED
Production target: LOCKED
Merchant status: FOUNDER-CONFIRMED
Provider console verification: PENDING
Ranel code integration: NOT IMPLEMENTED
Live transaction test: NOT AUTHORIZED by this document