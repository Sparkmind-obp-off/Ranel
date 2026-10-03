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
Ranel provider integration: NOT IMPLEMENTED; bounded provider-neutral Core seam built/tested locally on 2026-10-03 (see below)
Live transaction test: NOT AUTHORIZED by this document

## 11. Bounded Core seam execution — 2026-10-03

**Result: PARTIAL. Core seam BUILT/TESTED, provider adapter NOT IMPLEMENTED, Core NOT DEPLOYED, secrets NOT PROVISIONED, provider connection NOT VERIFIED.** No customer payment readiness claim.

### Access and credential handling

- Canonical clean `main` fast-forwarded from `b1f7661` to `1e7ca648a2d8bf5dd87af83d063803ff1c7bbc51`; incoming handoffs preserved. Authenticated GitHub configured for the existing repository. Cloudflare BYOK skill and credential setup used before Wrangler.
- Founder explicitly requested file consumption despite exposure. Uploaded credential file was parsed in memory programmatically without emitting values, signatures or raw file contents. Expected two labeled fields passed shape validation. This is not provider authentication or assurance that the already-exposed credential is safe. File was not copied into repository/build, committed or provisioned. No replacement/rotation performed.
- Cloudflare `whoami` verified the sole connected account. Read-only account API `/workers/scripts` returned 200: no Ranel Core Worker present. `/d1/database` returned 200: no Ranel database present. Other projects' resources were not opened/reused/changed.
- `/subscriptions` returned **403**: plan/billing/cost cannot be verified with available token scope. `/workers/subdomain` returned 200. Existing Pages `ranel` read returned 200, production binding names only `INQUIRY_WHATSAPP_NUMBER`, preview binding names empty, no D1 binding names. No Duitku secrets present on PUBLIC at the time of this audit. Evidence was printed as metadata only, never binding values.
- Audit completed around `2026-10-03T02:38:36Z`; no provider console/MFA session available. API metadata is not a console/billing audit.

### API family and credential check

The current public [classic API documentation](https://docs.duitku.com/api/id/) was read. It describes production Get Payment Method at `https://passport.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod` as non-invoice POST and shows HMAC-SHA256 for the documented operation. Its request and callback signing field order differs by operation. Public documentation establishes neither the merchant's enabled API family nor a credential's validity. Do not select classic from key/merchant format or silently mix current examples with older MD5, POP or SNAP contracts.

**Merchant family/version: NOT VERIFIED. Credential authentication check: NOT RUN — API family prerequisite unresolved.** No Duitku network request, invoice, payment, refund, payout or sandbox request performed. No signature adapter implemented from an unverified family.

### Implemented boundary

- `src/core.ts` is a separate proposed Core Worker, not imported into PUBLIC. `/health` returns minimal liveness; `/ready` returns 503 with generic not-ready state. Payment initiation and callback routes always return 503 without parsing/logging bodies or invoking a provider. Browser return remains `unverified` (202). No order query, auth bypass or financial mutation endpoint.
- `core.wrangler.jsonc` proposes exact `ranel-core` in the verified account with `DUITKU_ENV=production` and `PAYMENTS_ENABLED=false`. No database, DNS route or credential value included. `npm run build:core` is a **dry-run only**; it does not create the target.
- `src/payment-domain.ts` defines provider adapter and atomic durable-store ports, a pure stored-order correlation planner and deterministic pending-to-paid/failed transitions. Paid plans leave manual fulfillment pending and return a minimal audit plan. These are types/pure calculations, not authoritative persisted payment state. Only a future audited adapter may construct verified events. Terminal-state replays are rejected by the planner; duplicate receipt handling and conflicting reused event IDs must be implemented atomically in a real durable store.
- No in-memory/file production storage, signature verification, source-IP filter, provider HTTP client, timeout/retry handling, reconciliation query, durable idempotency, ledger, entitlement or fulfillment executor is implemented. Those remain gated by family/persistence/auth evidence, rather than being falsely represented by fixtures. Changing the flag alone cannot activate this seam.

### Actual checks

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run test:core`: **27 passed, 0 failed**. Covers unavailable initiation/callback with missing/false/true flag, no secret reflection, unverified return, no lookup, HTTP/header bounds, stored merchant/order/reference/amount correlation, event validation, terminal-state rejection, manual-pending fulfillment and minimal pure audit planning.
- `npm run build:core`: PASS, dry-run upload bundle **58.82 KiB / 15.11 KiB gzip**. No deployment ID or URL generated.
- `npm test`: PUBLIC build PASS (**53 modules, 67.37 kB**) and **33 passed, 0 failed** built-worker regression tests. PUBLIC source, Pages configuration and assets unchanged. Preview stopped before build, restored with PM2 afterward and checked HTTP 200.
- Browser E2E/live release suite not rerun: no PUBLIC source change and no production deployment. Signature known-answer, authentic callback, provider timeout/malformed-response and durable replay tests are **NOT RUN / NOT IMPLEMENTED**, not covered by the 27 seam tests.

### Recovery and smallest next gates

No production state changed, so no production rollback or secret replacement needed for this execution. Keep initiation disabled. Do not return callback success without verified durable processing. Once real transactions exist, disablement must stop only new initiation; preserve callback processing/audit records and unresolved transactions for authorized reconciliation.

Before deployment/provisioning, obtain: (1) merchant-console evidence for exact family/version; (2) scoped account-plan/cost evidence or explicit bounded cost approval, since subscriptions read failed; (3) Ranel-specific approved durable persistence and migration/recovery design. Provision safe credentials only into that verified Core target using encrypted provider secrets; never PUBLIC Pages. Keep commercial pricing/terms/deliverability separately gated. No new price or customer commitment approved in this execution.