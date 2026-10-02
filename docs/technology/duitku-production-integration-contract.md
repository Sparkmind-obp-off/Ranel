# Ranel — Duitku Production Integration Contract

**Status:** LOCKED target contract.
**Provider:** Duitku
**Environment target:** PRODUCTION / LIVE
**Current Ranel state:** Not yet integrated.

## 1. Environment decision
Ranel's intended Duitku integration target is production/live, not sandbox.
The founder has explicitly confirmed that the existing Duitku merchant/API access is production-ready. This remains a founder-confirmed fact until provider-console evidence is captured.
Do not silently switch the integration to sandbox merely to make testing easier.

Official Duitku documentation distinguishes production and sandbox endpoints. For POP, the documented production create-invoice endpoint is https://api-prod.duitku.com/api/merchant/createInvoice, while sandbox uses a separate hostname. citeturn562344search2turn562344search5

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
For the documented POP API, Duitku requires merchant code, timestamp, and signature headers; the documented signature is HMAC-SHA256 based. citeturn562344search2
Never hardcode signatures or credentials.

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
Duitku's current SNAP documentation specifies production callback source IPs separately from sandbox and explicitly requires signature validation. citeturn562344search3turn562344search4

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