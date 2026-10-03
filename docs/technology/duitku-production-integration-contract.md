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
Ranel provider connection: NOT VERIFIED; current-doc POP adapter/browser bridge built/tested locally, not deployed or activated (section 12). Historical seam evidence remains in section 11.
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

## 12. POP production adapter execution — 2026-10-03

**Final gate: NOT SUCCESS — ACTION REQUIRED.** Executed from clean canonical `main` checkpoint `7fd70a29f2c51fb5857e8f1540b304fa9a8d7a84`; fetch confirmed no incoming changes. This is actual adapter work and verification, not activation or a claim of a completed purchase lifecycle.

### Authoritative source findings

1. [Official browser API comparison](https://docs.duitku.com/payment-gateway/api-browser/) explicitly distinguishes **Duitku V2** (custom payment-method selection/classic API) and **Duitku POP** (provider payment selection/popup). "POP JS v2" is not a separately versioned contract in the inspected official sources. Do not silently substitute `/webapi/api/merchant/v2/inquiry` for POP.
2. [Current POP documentation](https://docs.duitku.com/pop/id/) specifies production createInvoice at `https://api-prod.duitku.com/api/merchant/createInvoice` and the production browser module at `https://app-prod.duitku.com/lib/js/duitku.js`. The public module returned HTTP 200 and contained checkout/process code; neither docs nor the checked script marker establish an explicit JS major version 2. Module availability is not merchant authentication.
3. Current documented request signing: HMAC-SHA256, UTF-8 `merchantCode + timestamp`, API key as the HMAC key, lower-case hex, Unix epoch milliseconds (no timezone offset added). Current documented callback signing: HMAC-SHA256 of `merchantCode + amount + merchantOrderId`, key supplied separately. These two inputs are not interchangeable.
4. Official [PHP SDK POP source pinned at `4d490f5728f29d848f87b991a6af7d21688cf633`](https://github.com/duitkupg/duitku-php/blob/4d490f5728f29d848f87b991a6af7d21688cf633/Duitku/Pop.php) uses SHA256 of concatenated merchant/timestamp/key for invoice headers; its transactionStatus uses an older MD5 scheme. This is a demonstrable incompatibility with the current POP HMAC docs. It is not safe to dynamically try several schemes with production credentials or mix its status contract into the current profile without merchant/provider confirmation.
5. Callback signature does **not** cover `resultCode` or `reference`, and no callback timestamp/currency/source-IP requirement is pinned by the inspected POP documentation. Therefore an authenticated notification alone cannot establish paid/reference truth. No fictional currency field, timestamp freshness or SNAP IP allowlist is attributed to POP. IDR is the only supported internal amount profile; a conflicting supplied currency is rejected.

Profile implemented: `pop-docs-hmac-sha256-2026-10-03`. **Founder-selected integration direction is POP production; merchant-enabled contract/version, HMAC migration/support, enabled methods and authentication remain NOT VERIFIED.** Current docs do not document a POP payment-method read API; the older official SDK does, but with a different signing profile. No safe live credential probe was made by borrowing classic/legacy signatures. No invoice creation was used as an authentication check.

### Changes actually implemented

- `src/duitku-pop.ts`: actual server-side POP production client and HMAC callback authenticator, not a placeholder. Invoice method consumes a server-order snapshot, verifies positive integer IDR amount/fields, signs exact documented headers, uses production URL only, enforces HTTPS configured callback/return origin, permits no redirect or blind retry, aborts after a bounded timeout, limits response bytes, checks merchant/reference/status/content type and accepts only matching HTTPS `app-prod.duitku.com/redirect_checkout` references. Returns minimal pending checkout details, never paid. All failures after dispatch require uncertainty/reconciliation rather than assuming no invoice was created.
- Adapter refuses invoice creation when disabled, config/secrets are missing, environment is not production, or merchant contract is not explicitly verified. No production credential values were supplied to the adapter in this execution.
- Callback authenticator validates format, duplicate decoded fields, amount/integer/currency/merchant/order/reference/result structure and separate HMAC through Web Crypto verify. It emits **authenticated_notification_only**, not `VerifiedPaymentEvent`. Merchant-specific source-IP policy is not verified or enforced. It neither deduplicates durably nor mutates a financial record.
- `src/core.ts` now wires callback authentication behind explicit family/signing-profile/contract/environment/secret gates. With fictional verified fixture configuration, invalid signatures return 401; authentic notifications still return 503 (not successful acknowledgement) because provider status corroboration and durable processing are absent. Repeated callbacks cannot create paid/fulfillment state. Initiation stays disabled regardless of flag because no approved commerce/store path exists.
- `src/pop-checkout.ts`: production module loader and `checkout.process` bridge, optional loading timeout/error handling and Indonesian language. Every success/pending/error/close event triggers only a server-status refresh; no client event marks paid. Browser refresh failures remain unavailable, not success. Source is not loaded or exposed on current PUBLIC pages; no checkout promised without an approved product.
- Core config has `DUITKU_API_FAMILY=pop`, the pinned profile, `DUITKU_CONTRACT_VERIFIED=false`, `PAYMENTS_ENABLED=false`, production environment, no credential values or database binding. PUBLIC source/assets/Pages config remain unchanged.

### Rechecked live infrastructure and actual tests

Cloudflare BYOK authentication verified the same sole account. `/workers/scripts` returned 200 with no Ranel Worker. `/d1/database` returned 200 with no Ranel database. `/workers/account-settings` returned 200 with usage model `standard`; **a usage model is not billing plan/cost/quota evidence**. `/subscriptions` again returned 403, so prerequisites for a new production resource's cost remain unavailable. No unrelated resources repurposed. Pages `ranel` metadata still lists only `INQUIRY_WHATSAPP_NUMBER` for production and no preview secret names; latest deployment ID remains `a071fcab-4df7-466d-be7e-68d56274f780`.

- Lint/typecheck: PASS after correcting DOM/Workers type-overlap for URLSearchParams iteration and script append. No safety assertion removed.
- `npm run test:core`: **61 passed / 0 failed** (27 existing domain/seam + 34 POP tests). Node crypto fixture oracle independently checks Web Crypto HMAC inputs; these are fictional cross-implementation fixtures, not merchant/provider-issued known-answer vectors. Tests cover single-attempt production dispatch, config/flag/IDR/order validation, checkout-origin/reference attacks, malformed/oversized responses, HTTP/network failure, timeout, invalid/missing/wrong-input callback signatures, merchant mismatch, duplicate encoded fields, unsigned result/reference tampering, Core rejection/non-acknowledgement and browser-event trust boundaries.
- `npm run build:core`: PASS dry-run only, **69.13 KiB / 17.99 KiB gzip**. No deployment created.
- `npm test`: **33 passed / 0 failed**; PUBLIC build unchanged at 53 modules / 67.37 kB.
- Existing PUBLIC Playwright suite rerun locally: **30 passed** (1.5 minutes), and against `https://ranel.pages.dev`: **30 passed** (1.4 minutes). Recipient sourced privately from the approved existing handoff; no redirect followed to WhatsApp and no message sent. Accessibility, links, topic continuity, layout, metadata and security gates preserved.
- PUBLIC preview stopped before build, restarted via PM2 and checked HTTP 200. These live PUBLIC checks are not Core deployment/payment E2E evidence.
- Final scoped credential scan at `2026-10-03T03:07:34Z`: 22 changed/generated files, zero supplied-credential/token matches. No values, hashes of credentials or raw provider headers emitted. Git diff whitespace check passed.

### Outstanding requirements and operating instructions

No Core Worker/database/migration deployment, secret provisioning, authentication check, durable replay receipt, status reconciliation, price approval, customer checkout or fulfillment occurred. No provider-confirmed transaction, paid state or delivery verified. No live invoice/payment/refund/payout, DNS/domain/billing change or account switch.

Minimum external prerequisites: (a) merchant/provider evidence resolving POP vs classic V2 and confirming the applicable signature/profile/status/auth-check contract, with secrets masked; (b) authorized read access to Cloudflare plan/quota/cost or explicit bounded resource-cost approval; (c) one founder-approved product/price/delivery/support/cancellation scope. No approved numeric price exists in the inspected product catalog or pricing document. Production persistence/callback-audit integration still needs implementation/deployment after infrastructure is authorized; local adapter tests do not replace it.

Owner: keep `PAYMENTS_ENABLED=false` and `DUITKU_CONTRACT_VERIFIED=false`. Do not switch these just to obtain a green readiness response. Current Core is not deployed; no operational order/payment record exists to monitor or fulfill. If any invoice creation is later dispatched and transport/response verification fails, retain the attempt as uncertain and reconcile it under the merchant-verified contract; do not retry blindly. Once durable processing is implemented, disabling new initiation must retain callbacks/records/audit for existing transactions. Do not manually write paid state or fulfill from browser success, unsigned notification fields or AI claims.