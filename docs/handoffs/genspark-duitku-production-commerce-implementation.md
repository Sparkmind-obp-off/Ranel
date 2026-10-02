# Ranel — Duitku Production Commerce Implementation Handoff

**Status:** READY FOR EXECUTION  
**Repository:** `Sparkmind-obp-off/Ranel`  
**Branch:** `main`  
**Target:** Duitku PRODUCTION/LIVE  
**Deployment:** Existing Cloudflare Pages project `ranel`  
**Public origin:** `https://ranel.pages.dev`  
**Scope:** Implement the smallest real commerce/payment path, configure server-side production secrets through the authorized Cloudflare dashboard/secret interface, deploy, and report evidence.  
**Important:** Production integration must not be called complete unless provider facts, server-side verification, persistence, and deployment are evidenced.

## 1. Mission

Implement Ranel's first usable commerce path against the founder's existing Duitku **production/live** merchant access. Keep the work focused: do not reopen the locked Ranel architecture, do not build a broad ERP/CRM, and do not run large redundant test suites when a targeted check proves the requirement.

The founder has stated that their Duitku account/API access is live/production. Treat that as founder-confirmed until verified in the authorized merchant console. Do not silently switch to sandbox. Do not claim the integration is live merely because the site deploys.

Canonical architecture remains **PUBLIC → CONTROL → CORE**, with AI cross-cutting; business model **KITS → SYSTEMS → SUPPLY**; revenue cycle **DEMAND → OPPORTUNITY → PRODUCT → DISTRIBUTION → TRANSACTION → FULFILLMENT → OUTCOME → LEARNING**.

## 2. Load context and inspect current state

1. Check current `main` HEAD and working tree before changes. Preserve concurrent work.
2. Read:
   - `docs/handoffs/genspark-context-pack.md`
   - `docs/foundation/ranel-master-blueprint.md`
   - `docs/foundation/ranel-revenue-engine.md`
   - `docs/technology/architecture.md`
   - `docs/technology/backend-api-specification.md`
   - `docs/technology/data-model.md`
   - `docs/technology/api-and-event-contract.md`
   - `docs/technology/auth-and-access-control.md`
   - `docs/technology/duitku-production-integration-contract.md`
   - `docs/technology/provider-inventory.md`
   - `docs/technology/environments-and-deployment.md`
   - `docs/production/production-readiness-standard.md`
   - `docs/production/release-runbook.md`
3. Inspect the actual app/runtime, bindings, migrations, and deployed project before choosing implementation details. Reuse existing infrastructure where it is genuinely suitable. Do not assume a database, Core, Control, or authentication layer exists just because it is in the blueprint.
4. Verify the exact Duitku API product/family/version enabled for this merchant in the authorized official console/docs before implementing signing. Do not mix POP, legacy, PDS, or SNAP contracts. Pin request signing and callback signing separately using official documentation for the enabled family.

## 3. Implement a narrow end-to-end commerce MVP

Build only what is required to sell a clearly defined first Ranel digital product. Inspect the existing product catalog and use a product already documented there if it is sufficiently specified; otherwise create one small, clearly labeled starter digital product with founder-approved price only if that price is already recorded in the repo. Do not invent a claim of demand, sales, or product validation. Do not make the whole catalog look purchasable if delivery/fulfillment is not implemented.

Required path:
1. Public product detail with clear contents, price/currency, delivery terms, and contact/support route.
2. Server-side order creation with server-owned product/price/currency. Never trust a client-submitted amount, paid status, entitlement, or provider reference.
3. Persistent order/payment-attempt records using the existing approved data layer, if present. If there is no production-capable persistent data layer or migrations cannot be safely deployed, do not substitute in-memory state or local files; stop and report the precise blocker and smallest required decision.
4. Server-side Duitku production invoice/payment initiation using the exact verified API contract.
5. Customer is redirected to the provider checkout URL only after a valid server response.
6. A return/status page shows **pending/being verified** until the server has authoritative provider evidence. A browser return, query parameter, or frontend message must never mark an order paid.
7. HTTPS callback endpoint verifies the exact callback signature, validates schema/order/amount/currency/status, applies an idempotent state transition, records a safe audit/event receipt, and acknowledges according to official provider requirements.
8. A minimal operator-visible order/status lookup may be added only if secure server-side authorization already exists. Do not expose personal data or order records publicly through guessable IDs.
9. Fulfillment/entitlement may be granted only after verified payment. If automated secure digital delivery does not exist, keep the order paid-but-fulfillment-pending and document the manual fulfillment SOP; never fake fulfillment success.
10. Provide a feature flag/configuration switch that disables new payment initiation without deleting records or hiding unresolved orders.

If the current app cannot support the required secure server-side flow, implement the necessary minimal Cloudflare Pages Functions/Worker and approved persistence path consistent with the existing repo. Do not introduce a large new platform or change architecture without documenting the blocker and asking for the minimum decision.

## 4. Production secrets and Cloudflare configuration

Use the existing Cloudflare account/project `ranel` and its authorized deployment path. Do not create a differently named project.

Set production credentials only through the Cloudflare dashboard's **Variables and Secrets** (or the established secure deployment mechanism) as encrypted secrets. Candidate names, adjusted to the verified API family:
- `DUITKU_MERCHANT_CODE`
- `DUITKU_API_KEY`
- any additional credential strictly required by the verified provider contract
- `DUITKU_ENV=production` only if the application uses a non-secret environment selector
- `PAYMENTS_ENABLED=false` until the integration has passed the release gate; enable only after required configuration and verification are evidenced.

Rules:
- Never ask the founder to paste secrets into chat, prompts, source files, GitHub issues, logs, screenshots, or documentation.
- Never print, echo, hash, or commit secret values. Verify presence/name/type only.
- Do not replace existing secrets blindly or rotate them without explicit authorization.
- If a required credential is not already securely available, stop and give the founder the exact secret name to enter in Cloudflare, without asking for the value in chat.
- Keep production secrets server-side; never use `VITE_` or any client-exposed variable for credentials.
- Confirm the secret is available to the actual server runtime, not just a Pages project setting that the function cannot read.
- Do not alter `ranel.biz.id` DNS/custom-domain settings in this task.

## 5. Safe verification — no unnecessary testing

Run only the checks needed to prove the payment path and protect live funds:
- lint/typecheck/build and existing targeted test command(s);
- deterministic unit tests with mocked provider responses and official known-answer signature fixtures;
- invalid signature, duplicate/replayed callback, amount/currency mismatch, unknown order, and browser-return-does-not-mark-paid cases;
- deployment smoke checks for product page, order endpoint validation, callback endpoint behavior, and security headers;
- verify configured secret names/presence without revealing values;
- verify the deployed commit and deployment URL.

Do not run a real payment, create a real invoice, collect funds, refund, payout, or trigger a customer transaction during routine implementation/testing. A live transaction is a separate financial action requiring a separate explicit authorization from the founder. Do not simulate provider success in production or use a fake success to claim integration works.

A read-only provider check is not a substitute for end-to-end payment evidence. Conversely, do not create a live invoice merely to get a green check.

## 6. Release gates and honest status

Report each dimension separately:
- **BUILT:** code exists.
- **TESTED:** focused automated and smoke checks passed.
- **DEPLOYED:** exact commit is running at the production origin.
- **PROVIDER-CONFIGURED:** exact merchant/API family and required secret presence/configuration evidenced without revealing values.
- **INTEGRATED:** production request/callback contract implemented and deployed, with callback verification evidence. Do not use this label if only a mocked test ran.
- **PAYMENT-VERIFIED:** only claim after valid provider evidence has been observed for an authorized transaction. If no real transaction was authorized/performed, mark it NOT VERIFIED.
- **FULFILLMENT-VERIFIED:** only claim if paid entitlement/delivery was actually granted correctly; otherwise report manual/pending fulfillment.
- **PRODUCTION-READY:** only if security, persistence, authorization, callback integrity, idempotency, failure/reconciliation, deployment configuration, rollback/disablement, and operational ownership are all evidenced. If a blocker remains, status is PARTIAL/BLOCKED, not PASS.

If the enabled API family, signature details, secure persistence, authorization, or secret access cannot be verified, do not improvise. Implement only safe, independently useful work and report the exact blocker. No architecture redesign or unrelated features.

## 7. Documentation and commit

Update the minimum relevant files:
- `docs/technology/duitku-production-integration-contract.md`
- `docs/technology/provider-inventory.md`
- `docs/technology/api-and-event-contract.md` or a focused new implementation document
- `docs/production/release-runbook.md`
- `docs/README.md` if new docs are added

Record the exact commit, deployment URL/ID, timestamp/time zone, checks performed, evidence source, configuration status (names/presence only), limitations, recovery/disablement procedure, and remaining blockers. Never write secret values or personal payment data to docs.

Commit focused changes to `main` only if repository permissions and current state allow it. Preserve concurrent work; no force-push/reset. Deploy using the authorized Cloudflare path and verify the deployed commit.

## 8. Final report format

### STATUS
PASS / PARTIAL / BLOCKED / FAIL

### PROVIDER
Merchant/API family verification evidence, source, and unknowns. Keep console facts separate from public documentation and founder-confirmed claims.

### IMPLEMENTED
Routes, server handlers, persistence, order/payment states, callback verification, idempotency, fulfillment, and disable switch.

### CLOUDFLARE
Project name, deployment URL/ID, deployed commit, secret variable names and presence only, and whether runtime access was verified. No secret values.

### VERIFICATION
Only the focused commands/checks actually run and their results.

### PAYMENT / FULFILLMENT
State clearly whether any real transaction occurred (expected: no), whether payment is verified, and whether fulfillment is automatic or manual/pending.

### SECURITY / RECOVERY
Callback verification, duplicate/replay handling, amount/currency checks, access control, logging/redaction, disablement and reconciliation.

### CHANGES
Files changed and commit SHA/URL.

### BLOCKERS
Exact unresolved items and why each prevents a production-ready claim.

### NEXT ACTION
The single smallest next action. Do not start a new phase automatically.
