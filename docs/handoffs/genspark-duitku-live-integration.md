# Ranel — Duitku Production Integration & Secret Provisioning Handoff

**Status:** READY FOR BOUNDED EXECUTION
**Environment target:** PRODUCTION / LIVE
**Canonical repo:** `Sparkmind-obp-off/Ranel`
**Architecture:** PUBLIC → CONTROL → CORE; AI is cross-cutting, not a fourth layer.
**Important:** Current public offers have no fixed approved prices and fulfillment is still manual. Implement the Core integration safely, but keep customer-facing payment initiation disabled until commercial readiness is explicitly established.

## 0. Read minimum context
Read first:
1. `docs/handoffs/genspark-context-pack.md`
2. `docs/handoffs/genspark-execution-profile.md`
3. `docs/foundation/ranel-master-blueprint.md`
4. `docs/governance/access-and-permission-model.md`
5. `docs/technology/duitku-production-integration-contract.md`
6. `docs/technology/api-and-event-contract.md`
Then inspect only the exact code/config files necessary. Do not scan the full repository.

## 1. Credential-file security gate — mandatory
The founder may attach a file containing Duitku production credentials. Treat it as highly sensitive.
Before reading it, establish whether the execution environment provides a secure way to consume the file without echoing its contents into prompts, logs, screenshots, reports, Git, or generated code.
- Never print, `cat`, dump, or otherwise display credential values.
- Never quote any part of the credentials in the report.
- Never commit or copy the credential file into the repository.
- Never put the credential file into build output or public assets.
- If the platform automatically injects uploaded file contents into model context, logs, or shareable artifacts and this cannot be prevented/verified, STOP. Ask the founder to provision secrets through Cloudflare's secure secret input/dashboard instead.
- If any key was previously exposed in chat or a file that may be broadly accessible, treat it as compromised and require the founder to rotate/revoke it with Duitku before using a replacement.
- If safely consumable, read the file programmatically without output, validate expected fields, and use the values only to provision production secrets and make a safe non-transactional authentication check.

Expected fields must be identified from the exact API family selected. Do not assume the merchant uses a particular Duitku API solely because a previous draft mentions POP or PDS.

## 2. Determine the exact Duitku API family
Use merchant-console evidence and official documentation to identify the actual enabled product/API family (for example, Duitku POP createInvoice API versus classic webapi endpoints or SNAP).
Official documentation references:
- POP API: `https://docs.duitku.com/pop/id/`
- General API (includes Get Payment Method): `https://docs.duitku.com/api/id/`
- SNAP API: `https://docs.duitku.com/snap-api/id/`
Do not mix endpoints, credential names, signature formulas, payload schemas, callback validation, or SDKs across API families.

## 3. Validate production credential safely
First inspect the chosen API family's official docs for a non-transactional, read-only validation operation.
For the classic Duitku API, the official documentation describes Get Payment Method at production endpoint `https://passport.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod`, which returns active payment methods and does not create a payment invoice. Use this only if the merchant actually uses that API family and the current account supports it.
For POP's `createInvoice` endpoint, do not call it merely to check whether credentials are valid: it is a transaction/invoice-creation request. If the selected API family has no safe non-transactional auth-check endpoint, report credential validity as NOT VERIFIED WITHOUT A LIVE-SIDE EFFECT and proceed only with code/configuration checks. Do not create a live invoice unless the founder separately authorizes that exact action.
Keep output minimal and redacted: pass/fail, HTTP status/response code, API family, endpoint hostname/path (no secret query parameters), timestamp, and non-sensitive enabled payment method names if useful. Do not include signatures, sensitive headers, raw responses with sensitive fields, or credential values.

## 4. Identify the correct Cloudflare Core target
Cloudflare production credential placement must follow the locked three-layer architecture:
- PUBLIC: existing Pages project `ranel` (`https://ranel.pages.dev`). No Duitku credentials here.
- CONTROL: private interface; no need for Duitku secrets unless a demonstrated server-side use requires them.
- CORE: server-side Worker/API; this is the only intended home for Duitku production credentials.
Inspect the Cloudflare account, current projects, plan/usage/billing, and existing Ranel Worker/API resources read-only first.
- If a verified Core Worker already exists, use that exact target.
- If no Core Worker exists, check whether creating/deploying the agreed Core target (working name `ranel-core`) is supported within the existing plan and known limits, with no unknown/non-trivial cost and no DNS change. If yes, create/deploy only the minimal Core API needed within this task. If cost, account, project, or target is ambiguous, stop and report the blocker rather than guessing.
- Do not put payment secrets on the public Pages project `ranel`.
- Do not attach/change `ranel.biz.id` or DNS as part of this task.

## 5. Secret provisioning
Use Cloudflare BYOK / authenticated Wrangler in the authorized account. Verify identity and exact Core target before setting secrets.
Production secret names should match the chosen adapter's contract, preferably `DUITKU_MERCHANT_CODE` and `DUITKU_API_KEY`. Add a separate callback/merchant-key secret only if the chosen API family requires it; document the purpose, never the value.
Use the provider's secure masked input/secret mechanism. Do not pass a secret as a literal CLI argument, echo it, write it to a tracked file, or include it in command history. Record only secret names, target Worker, environment, and success/failure.
Keep `PAYMENTS_ENABLED=false` until pricing, deliverability, legal/terms, and commercial launch readiness are approved. The API target is production/live; do not silently set sandbox.

## 6. Integration scope
Implement the narrowest production-safe Core-side adapter for the selected Duitku API family:
- server-side request signing from current official docs;
- runtime secret access only in Core;
- payload validation and safe errors;
- explicit timeout and bounded retry behavior;
- never blindly retry invoice-creation calls;
- callback/webhook signature verification and current official source-IP control where applicable;
- event/order correlation and idempotency;
- deterministic payment state machine;
- auditable transitions;
- manual reconciliation/fallback;
- fail-closed handling for missing config or invalid signatures.
Do not add customer checkout for the current public catalog because approved fixed prices and automated fulfillment are not ready. Do not invent prices or promise that current pilot offers can be paid by checkout.
Do not add a database or provision paid resources without confirming requirements and known plan/cost. If durable persistence is required for safe idempotent payment/order state and no approved database exists, implement the bounded integration seam/tests and report the exact blocker; do not fake durable production payment handling.

## 7. Testing and live-side-effect rules
Use mocks/fixtures for ordinary CI/unit/integration tests covering signing vectors, malformed provider responses, timeout/network failure, invalid/missing signature, callback replay/duplicates, mismatched amount/order/merchant, illegal state transitions, disabled payment flag, missing secrets, and safe logging.
Allowed only if the selected API family has a safe read-only endpoint: one minimal production credential-validation call. Do not print the request signature or credentials.
Not authorized by this task:
- creating a live invoice/payment;
- collecting money;
- refunding;
- payout/disbursement;
- sending a live customer transaction;
- enabling public payment checkout;
- changing prices;
- changing DNS/domain;
- changing billing plan.

## 8. Deployment and verification
- Run checks relevant to the code change, then the full release suite if deploying code.
- Review diff and scan for secrets before commit.
- Deploy only the Core target; no public Pages deployment unless a public code change is separately necessary and justified.
- Verify Worker/API deployed revision/status and safe health/readiness route without exposing configuration.
- Verify secret names exist on the Core target without reading their values.
- Verify public Pages project `ranel` has not gained Duitku secrets.
- Keep `PAYMENTS_ENABLED=false`.
- Record deployed SHA, deployment ID/URL, checks, API family, credential-check result category, secret target/name metadata, and known limitations.

## 9. Required stop conditions
Stop affected work if:
- credential-file handling cannot be kept out of model context/logs/artifacts;
- credential was exposed and has not been rotated;
- API family/signature contract is ambiguous;
- the only available credential check would create a live invoice;
- Cloudflare target/account is ambiguous;
- provisioning entails unknown/non-trivial costs;
- safe payment persistence/idempotency cannot be guaranteed;
- any secret value is emitted or committed.

## 10. Return format
STATUS
ACCESS
API FAMILY
CREDENTIAL CHECK (redacted)
COMPLETED
TESTS
DEPLOYMENT
SECRET PROVISIONING (names/target only)
NOT VERIFIED
SAFETY
CHANGES
COMMIT
NEXT ACTION

Do not report payment production-ready unless required persistence, callback/security, order state, commercial pricing/fulfillment, end-to-end evidence, and appropriate release gates actually pass.