# Ranel

**Ranel** is a digital revenue engine for practical business systems and commerce for local operators. Founder-selected architecture: **PUBLIC → CONTROL → CORE**, with cross-cutting AI subject to policy and deterministic Core authorization—not a fourth primary layer.

> **Working brand line:** Practical systems for better-run businesses.
>
> **Brand promise:** Help small operators run their businesses with more clarity, consistency, and control.

Ranel is designed to grow through three connected layers:
1. **Kits** — templates, SOPs, calculators, checklists, and starter playbooks.
2. **Systems** — lightweight tools for reporting, retention, and workflow when actual needs justify them.
3. **Supply** — relevant tools, products, and business supplies after needs and sourcing are verified.

The first vertical is **barber businesses**. Other verticals are future options, not simultaneous launch commitments.

## Current Commerce Phase 02 — product assets & PUBLIC policy readiness

**ASSET_READY_FOR_REVIEW; payment remains disabled.** Founder-approved one-time IDR prices: Starter Rp39.000, Growth Rp79.000, System Rp149.000. Starter is the default entry; Growth/System remain alternatives without required prior purchase. System is a complete operating-system document package, not software. F01/F02/F04/F05 and pricing/promo directions are approved; tax/legal applicability and live fulfillment readiness are still gates. Older pending/no-price language below is historical, not a reason to reopen approvals.

Actual v1.0 bundles: `products/Ranel-Barber-Starter-v1.0/` (6 files), `products/Ranel-Barber-Growth-v1.0/` (10), `products/Ranel-Barber-System-v1.0/` (15). [Exact registry](products/registry.json) · [31-file QC record](docs/implementation/phase-02-commerce/product-qc.json) · [Execution/release evidence](docs/implementation/phase-02-commerce/evidence.md). No bundles are served publicly; use them for internal review and approved manual tailoring/QC, not automatic customer entitlement or an Available claim.

PUBLIC `/`, `/barber`, `/contact`, `/privacy` synchronize price/status. Added `/legal`, `/legal/ownership`, `/legal/terms`, `/legal/pricing-payment`, `/legal/refund-policy`, `/legal/privacy`, `/legal/license`, `/legal/complaints`, `/legal/payment-provider`. Operator: PT Waskita Cakrawarti Digital, Perseroan Perorangan, from founder-controlled references; AHU number withheld pending document reconciliation/publication. No universal tax rate, active payment, registration certification, fake email or public SLA.

Offline production: `python3 scripts/produce_products.py`, then `python3 scripts/qc_products.py`. Python tools pinned in `scripts/requirements-assets.txt`; QC also requires LibreOffice CLI. All DOCX rendered/opened, PDF text/layout bounded and XLSX recalculated with blank/synthetic/modified QC inputs. Buyer tools: PDF reader, DOCX editor, Excel/LibreOffice; no macros/external data connections. Formula capacity is explicitly 200 rows. No Python/filesystem operations in Cloudflare runtime. Native Microsoft Office and real buyer fulfillment not verified.

Local gates: lint/typecheck PASS; 44 PUBLIC worker tests, 61 preserved Core/POP tests and 36 responsive/Axe browser tests PASS. PUBLIC-only release metadata/live verification are tracked in the execution evidence; no Core/DB/secret/checkout/promo engine/DNS/billing/live transaction change. Stop after review; no automatic Phase 03.

## Historical Commerce Phase 01 — Business Lock

[Canonical Business Lock](docs/business/business-lock.md): **PHASE 01 = PASS WITH DECISIONS REQUIRED**; full `BUSINESS_LOCK_APPROVED=false`. Strategic identity/model/barber vertical are source-backed; Starter is a recommended first-offer candidate, not an approved sale. Founder decisions D01–D08 cover segment/offer, delivery, payment model, cancellation/refund, support/owner and access terms. Price remains `PHASE_02_DECISION`; no validation, production activation or code change. Phase 02 does not start automatically.

## Historical master commerce roadmap — Phase 00 baseline

[**SYSTEM_BASELINE.md**](SYSTEM_BASELINE.md) is the current audited baseline for the founder's Business First → Product → Commerce → Transaction → Fulfillment → Operations roadmap. **Phase 00: PASS for bounded baseline; Phase 01 BUSINESS LOCK and Phase 02 PRODUCT READY: not yet PASS.** Existing POP engineering and PUBLIC are preserved. The new phase numbering does not rename historical catalog releases. No payment, infrastructure, pricing or live pilot activation in this documentation-only checkpoint.

Current source checkpoint audited: `fbaddc4fc1b7fcd144fc81d3f7ae6ca90f124d17`; PUBLIC still runs `c90c1994839e1bee4fa676ed25ea848da66731ad`. Fresh baseline checks: lint/typecheck, 61 Core fixtures, 33 existing PUBLIC built-artifact tests and read-only production smoke. Details, debt, access limitations, component statuses, dependency graph and protected boundaries are in the baseline. The next gate is Business Lock—not further payment implementation or deployment.

## POP production adapter execution — 2026-10-03

**NOT SUCCESS — ACTION REQUIRED.** POP production adapter and browser bridge are implemented/tested locally, but merchant authentication, production Core/persistence/deployment and customer checkout are not verified or activated. Existing PUBLIC catalog/manual inquiry remains the only customer functionality in production.

- `src/duitku-pop.ts`: exact production `createInvoice` client, current-doc HMAC-SHA256 request/callback contracts, bounded input/response bodies, timeout, single-attempt/unknown-outcome handling and fixed checkout-host/reference validation. Tested using fictional transports only; no actual invoice request made.
- `src/pop-checkout.ts`: production script loader and `checkout.process` bridge. Every browser outcome only requests server-status refresh. Not wired into PUBLIC because no approved priced/deliverable offer exists.
- `src/core.ts`: callback authentication can run only for explicitly verified POP configuration; invalid fixture signatures receive 401. Authenticated callbacks still receive 503 because corroborating provider status and durable receipt storage are absent. No paid/fulfilled mutation or false callback acknowledgement.
- Critical source finding: official [browser comparison](https://docs.duitku.com/payment-gateway/api-browser/) separates **Duitku V2** from **Duitku POP**. POP documents the production `duitku.js` URL without a JS v2 version marker. Current POP docs specify HMAC-SHA256, while the pinned official older PHP SDK uses a different request-signing algorithm. Merchant-specific contract/version cannot be inferred from either a name or credential-file shape.
- Checks: 61 Core/POP tests, 33 PUBLIC worker tests, 30 local and 30 production PUBLIC browser tests passed. Lint/typecheck and Core dry-run build passed (69.13 KiB / 17.99 KiB gzip). Production browser regression is not payment E2E proof.
- Rechecked Cloudflare: no Ranel Core Worker/database; subscription read still 403. Account usage model `standard` is not evidence of plan/quota/cost. PUBLIC binding names remain inquiry-only. No new resources, secret provisioning, DNS, billing or live financial actions.

Read [execution evidence / current limitations / operating safeguards](docs/technology/duitku-production-integration-contract.md#12-pop-production-adapter-execution--2026-10-03). Do not activate with an environment flag alone. Merchant contract and safe reconciliation, authorized infrastructure and durable audit/idempotency, plus one approved product/price/terms are required. Never reuse another project's database or mix classic V2/legacy signatures as fallback.

## Historical checkpoint: bounded Core integration seam — 2026-10-03

**BUILT / TESTED locally; NOT DEPLOYED / NOT INTEGRATED.** The Core foundation is separate from the unchanged PUBLIC Pages application. No price, checkout, invoice client, signing adapter, database, authorization system or payment activation has been added.

- `src/core.ts`: proposed Core Worker with minimal `/health` (200), `/ready` (503), disabled `POST /api/v1/payments` (503), unavailable `POST /api/v1/webhooks/duitku` (503), and an unverified browser-return view at `/api/v1/payments/return` (202). No public order lookup, provider requests, body logging or callback-success acknowledgement. Even `PAYMENTS_ENABLED=true` cannot activate an incomplete integration.
- `src/payment-domain.ts`: pure correlation/transition planner, manual-pending fulfillment after a verified payment, minimal audit plan, and adapter/atomic durable-store interfaces. These interfaces are not implemented signature verification, durable idempotency, audit storage or financial truth. Fixtures never become production orders.
- `core.wrangler.jsonc`: proposed `ranel-core`, production target, `PAYMENTS_ENABLED=false`, no secrets/bindings; existing `wrangler.jsonc` remains PUBLIC-only.
- Developer commands: `npm run test:core` compiles to ignored `qa-artifacts/core-build` and runs deterministic tests; `npm run build:core` is explicitly a Wrangler **dry-run**, not deployment.
- Current checks: 27 Core tests and 33 PUBLIC built-worker regression tests passed; lint/typecheck and both builds passed. Browser E2E was not rerun because PUBLIC source was unchanged and no deployment occurred. Preview restored and checked HTTP 200.
- Read-only Cloudflare audit: authenticated sole account; no `ranel-core` Worker or Ranel D1 database observed. Subscription/plan endpoint returned HTTP 403, so cost/plan readiness remains unknown. No unrelated database reused. PUBLIC `ranel` production binding names contained only `INQUIRY_WHATSAPP_NUMBER`; preview names empty.
- Credential file parsed programmatically without displaying values or copying it into the repo. Shape passed, **not authentication**. No Duitku request or secret provisioning occurred because merchant API family/target prerequisites were unresolved. The exposed key still requires containment; founder authorization to use the file does not make it unexposed.

See [Core execution evidence and exact next gates](docs/technology/duitku-production-integration-contract.md#11-bounded-core-seam-execution--2026-10-03). Next: obtain merchant-family evidence and account plan/cost evidence, approve a Ranel persistence design, provision safe credentials only into verified Core, then implement family-specific signing/callback and transactional audit/idempotency. Keep pricing/fulfillment/commercial activation gated. No Core deployment URL or production-ready claim exists.

## Final launcher alignment and bounded PUBLIC hardening

Canonical revenue cycle: **Demand → Opportunity → Product → Distribution → Transaction → Fulfillment → Outcome → Learning**. Business model remains **Kits → Systems → Supply**. The lock defines the destination, not implementation/validation evidence.

**Scoped PUBLIC hardening: DEPLOYED/VERIFIED. Overall engine: PARTIAL.** 33 built-worker, 30 local and 30 production browser tests pass; current reviewed release is recorded in the [release runbook](docs/production/release-runbook.md#9-final-launcher-execution--2026-10-02). Existing catalog/contact/brand look preserved. At that release, CONTROL/CORE, payment, AI and other providers remained unimplemented/not integrated; no full-engine production-ready claim or automatic next-phase build.

PUBLIC request contract: GET/HEAD only on existing pages and `/inquiry`; other methods 405, URL length over 2048 characters including origin 414, duplicate `offer` or decoded topic over 64 characters 400. Short unknown topics retain general fallback. Requests rejected without body parsing/storage or external redirect. Worker pages/redirects/errors and native `/static/*` assets receive mirrored CSP, nosniff, referrer/permissions, X-Frame-Options DENY and host-only HSTS (no preload/includeSubDomains). These are HTTP/input protections, not identity/role admission or Core authorization. No new sensitive submission endpoint or provider activation.

Duitku remains **production/live target, NOT INTEGRATED**. Public official POP references were checked; merchant identity, API family/callback/signature test vectors and credentials are not verified. No sandbox substitution or live financial action. Provider-console MFA/roles/rate policy/billing/recovery and custom-domain live behavior remain unverified. See the runbook for exact access boundaries and subsystem gaps.

## Phase 2 baseline — Pilot Product & Demand Validation

Three concrete pilot definitions are implemented: **Ranel Barber Starter** (daily foundation), **Ranel Barber Growth** (Starter plus records/retention/review), and **Ranel Barber System** (requirements/flow concept, not available software). Starter/Growth materials are prepared manually after agreement; no ready kit files, fixed prices, subscription, guaranteed growth or engineering commitment claimed.

**Phase 2 gate: PASS for catalog/evidence-collection readiness. Production: VERIFIED** at https://ranel.pages.dev, released 2026-10-02 via CF BYOK to existing `ranel`. 28 built-worker tests, 27 local and 27 production browser tests pass; existing contact, legacy topics and domain/config boundaries preserved. Actual results/provenance are in [Phase 2 evidence](docs/implementation/phase-2/evidence.md). [Pilot catalog](docs/products/product-catalog.md) · [Implementation/operating method](docs/implementation/phase-2/implementation-notes.md) · [Blank demand-evidence template](docs/templates/demand-evidence.md).

Only blank templates are committed. Keep real anonymized interaction records in Git-ignored `demand-records/` or an already-approved private store, with restricted contacts separate. Manual entry and follow-up permission are required; no website lead storage or automation exists. No real inquiries/sales are fabricated, and demand is **not validated** by publishing the catalog. Execute one complete Phase 2, no sub-phases; do not start Phase 3 automatically.

## Phase 1B baseline (preserved)
- **Historical Phase 1B gate: PASS.** Its public foundation and approved runtime WhatsApp handoff are preserved in Phase 2; no actual message sent during QA. Current release metadata is below; original Phase 1B evidence remains linked.
- Existing baseline was documentation only, at `bef5456` on `main`. No framework, package manager, application, or adapter existed to preserve. Existing strategy documents remain in place.
- One lightweight Hono/TypeScript application now lives in this repository, as explicitly requested in the Phase 1 implementation prompt. See [decision log](docs/governance/decision-log.md) for the change from the older documentation-only/separate-codebase wording.
- Trademark/company clearance, product-market fit, prices, kit deliverability, demand, and business results are **not verified**.
- Kits are **in development**, not ready to buy. Systems/Supply are not available.
- Production contact UI is active; links resolve to the approved business destination with the intended draft. WhatsApp registration and actual message delivery/receipt are not independently tested or claimed.
- [Phase 1 historical implementation evidence](docs/implementation/phase-1/evidence.md) · [Phase 1B production release evidence](docs/implementation/phase-1b-release-deployment/evidence.md).

## URLs and entry points
- Repository: https://github.com/Sparkmind-obp-off/Ranel (`main`).
- Local Pages preview: `http://localhost:3000`.
- Temporary sandbox preview: https://3000-iy1qof0t6pdsmm8bh8q31-82b888ba.sandbox.novita.ai — verified HTTP 200 for homepage/barber; not a production URL and may expire.
- Production URL: **https://ranel.pages.dev**; project exactly `ranel`, production branch `main`.
- Current immutable deployment: https://a071fcab.ranel.pages.dev; ID `a071fcab-4df7-466d-be7e-68d56274f780`.
- Deployed commit: `c90c1994839e1bee4fa676ed25ea848da66731ad`; created `2026-10-02T10:25:38.112262Z`, Cloudflare stage `success`. Subsequent documentation-only commits do not change this provenance. Previous Phase 2/1B releases remain recorded in their historical evidence; current execution details are in the release runbook.
- Custom-domain observation: initial release lookup listed only `ranel.pages.dev`; final read-only lookup at `2026-10-02T04:41:33Z` also listed `ranel.biz.id`, with Cloudflare status **active** and creation time `2026-10-02T04:32:09.411016Z`. The release agent did **not** attach it or change DNS; the actor is not verified. Its actual DNS/TLS/redirect/browser behavior was not tested in this phase. Phase 2 retained both observed domain names without domain/DNS mutation; it changed only the application deployment, as recorded above.

| Route | Purpose |
|---|---|
| `/` | Indonesian-first brand overview and Kits → Systems → Supply status |
| `/barber` | Three pilot definitions, audience/problems/contents/deliverables/status, comparison, manual process and FAQ |
| `/barber#rencana-kit` | Jump to the proposed kit catalog |
| `/contact` | Contact availability and a read-only, unsent message draft |
| `/contact?offer=starter\|growth\|system` | Select a current product and adapt the draft; System has an explicit concept-only notice |
| `/inquiry?offer=starter\|growth\|system` | HTTP 303 to approved WhatsApp with product context if config valid; otherwise back to contact |
| `/contact` and `/inquiry` with `offer=operations\|retention\|tracking` | Backward-compatible Phase 1B topic names/messages; not silently remapped to new products |
| `/privacy` | Application data handling and external-service disclosure |
| `/static/style.css`, `/static/brand-mark.svg` | Locally served brand assets |
| Unsupported methods on existing PUBLIC routes | HTTP 405, Allow GET/HEAD; no submission/transaction |
| Other routes | Helpful HTTP 404; no contact/private/financial API |

## Local setup and development
Use Node.js 22.13+ and npm. The lockfile is committed; there was no previous package manager.

```sh
npm ci
npm run lint
npm run typecheck
npm test
```

`npm test` builds first and runs the Node test runner against the **built Pages worker** (33 tests after bounded PUBLIC hardening; Phase 2 had 28). `npm run build` writes `dist/_worker.js`, `_routes.json`, and static assets. `npm run dev` is the Vite content-development entry; it is **not** the verification environment for Cloudflare runtime bindings.

To check actual Pages behavior, use the built preview:

```sh
npm run build
npm run preview
```

In the coding sandbox, use PM2 instead of starting a blocking service. The included PM2 config's `cwd` is sandbox-specific (`/home/user/webapp`):

```sh
# For a restart, stop the running preview BEFORE building.
pm2 stop ranel-preview   # skip on first start
fuser -k 3000/tcp 2>/dev/null || true
npm run build
pm2 start ecosystem.config.cjs  # use pm2 restart ecosystem.config.cjs for an existing process
curl -f http://localhost:3000/
pm2 logs ranel-preview --nostream
```

Do not rebuild `dist` while Pages preview is serving it: the generated routes file can be observed mid-write. A clean restart after build avoids transient asset errors.

### Browser QA

```sh
npx playwright install --with-deps chromium
# Start the built Pages preview as above, then:
npm run test:e2e
```

30 browser tests cover 320px, 390px (Chromium mobile emulation), and 1440px viewports: route rendering, overflow, metadata, assets, navigation, keyboard focus, FAQ, 404, explicit inquiry state, all topic redirects, and axe WCAG A/AA checks. Local default is unconfigured contact; production is tested with an explicitly configured expectation, not inferred from the UI. Screenshots are generated under ignored `qa-artifacts/` with state-specific filenames. Passing automated checks is not a full accessibility certification, physical-device test, or usability/market study.

For production QA, privately load the approved destination into `QA_EXPECT_WHATSAPP_NUMBER` (for example with a silent shell prompt; do not place its value in scripts/logs/docs), then:

```sh
QA_BASE_URL=https://ranel.pages.dev QA_CONTACT_STATE=configured npm run test:e2e
```

Export `QA_EXPECT_WHATSAPP_NUMBER` before this command and unset it afterward. Tests compare the recipient without printing it and use `maxRedirects: 0` so they never contact WhatsApp. Default local tests retain the unconfigured-state assertions. No tests or assertions were removed to make production pass.

## Inquiry configuration
The founder supplied and approved a public business inquiry number in Phase 1B. It is configured once as the **production runtime secret** `INQUIRY_WHATSAPP_NUMBER`, not embedded in application source/build assets. The public business destination is not itself a secret; encrypted runtime configuration provides one consistent update point. Never infer a replacement number from account identity.

| Name | Purpose |
|---|---|
| `INQUIRY_WHATSAPP_NUMBER` | Founder-approved **public business** WhatsApp destination, held in runtime configuration |
| `CLOUDFLARE_API_TOKEN` | BYOK deployment credential; never a browser variable or committed value |
| `CF_PAGES_PROJECT` | Optional operator shell variable for the verified target; production project is exactly `ranel` |
| `QA_BASE_URL` | Browser-test origin; default local preview, production `https://ranel.pages.dev` |
| `QA_CONTACT_STATE` | `configured` for explicit active-contact QA; omitted for the unconfigured local baseline |
| `QA_EXPECT_WHATSAPP_NUMBER` | Privately supplied expected destination for configured QA only; not application configuration |

Local configuration: copy `.dev.vars.example` to `.dev.vars` and set the approved number there. The value must be international digits only, with country code, no `+`, spaces, or leading zero; 8–15 digits, starting 1–9. Restart the **Pages** preview after changing it. Blank/invalid configuration fails closed. Format validation does **not** prove account ownership or WhatsApp registration; the founder must verify both.

To update the number later, first obtain founder approval and normalize to international digits. Run `npx wrangler pages secret put INQUIRY_WHATSAPP_NUMBER --project-name ranel`; enter it privately through the masked prompt or secure stdin, not as a literal command argument. Wrangler targets production; secret listing shows the name/encrypted status only. Deploy/redeploy the reviewed build, then verify the active contact page and `/inquiry` Location without following it or sending a message. Never print the secret value or put it in source, `wrangler.jsonc`, screenshots, or committed environment files. Cloudflare preview configuration is intentionally unset; the immutable production deployment still uses production configuration.

Behavior:
1. Browse barber offers and open contact for a chosen topic.
2. If unset/invalid: show **Kontak belum aktif**, no send button/WhatsApp link. The draft is selectable/read-only; nothing is sent or saved. A working link returns to the catalog.
3. If configured: **Buka WhatsApp untuk diskusi** follows `/inquiry` to a fixed `https://wa.me/` URL with the allowlisted offer's message. Unknown offer parameters fall back to a general draft. Arbitrary redirects and injected message input are not accepted.
4. The visitor must review and manually send in WhatsApp. The website cannot prove that the visitor sent a message or that Ranel received it; it never shows a sent/saved success notice.

The synthetic phone-format fixture in tests is not production contact configuration.

## Architecture and dependencies
- Single Hono application, server-rendered JSX; shared layout, offer cards, status UI, and inquiry helpers.
- Runtime dependency: **Hono** only. No shipped client JavaScript, external fonts, photos, analytics, or provider SDK.
- Vite + Hono Pages/dev adapters + Wrangler: build and Cloudflare-compatible preview/deployment, chosen because baseline had no scaffold.
- TypeScript + Workers types: static checks. ESLint/typescript-eslint: lint. Playwright/axe: development-only browser/accessibility testing.
- Native Pages static routing via `_routes.json`; assets originate in `public/static`. Explicit catch-all 404 route preserves fallback through the Pages adapter.
- Data model: three pilot definitions (target/problem/contents/deliverables/how/use/status/exclusions/CTA) in `src/inquiry.ts`, plus preserved legacy topic lookup. Runtime contact configuration stays separate. No customer/lead data model or persistence added.
- No D1, KV, R2, database, in-memory lead store, forms, accounts, CRM, payments, booking, or messaging automation.
- Application pages/redirects/errors and native assets have CSP, nosniff, anti-framing (CSP plus DENY), host-only HSTS, referrer and permissions headers. Native header contract is `public/_headers`; parity is tested. No application cookies or personal-data logging. Platform hosting may process technical request information.

## Cloudflare BYOK deployment
The authorized path is **`cf-byok-deploy`**, not Genspark Hosted Deploy. The newest Phase 1B founder instruction supersedes the older existing-project-only restriction: create **exactly `ranel`** if absent and deploy to **https://ranel.pages.dev**. The sole authenticated account was verified, project creation succeeded, production secret was installed, and production was deployed/checked. Never substitute `runnel` or a suffixed project. Metadata `cloudflare_project_name` and `wrangler.jsonc` now both select `ranel`.

For subsequent releases:
1. Load BYOK credentials with `setup_cloudflare_api_key` in Genspark, then verify `npx wrangler whoami`. Never run `wrangler login` or expose the token. Use the authorized account; stop if account selection is ambiguous.
2. Inspect `origin/main`, working tree, verified metadata and `npx wrangler pages project list`. The existing production target is `ranel`, branch `main`; do not create another app/project.
3. Stop local Pages preview before `npm ci`, lint/typecheck/test/build. Restart it and run local E2E; review diff and secrets. Production-only config does not make the local unconfigured fallback disappear.
4. Configure any approved contact update privately using the single runtime secret. No database/build-time contact substitution is needed.
5. Commit/push reviewed release changes, build from the intended clean SHA, and deploy explicitly:
   ```sh
   npx wrangler pages deploy dist --project-name ranel --branch main --commit-hash "$(git rev-parse HEAD)"
   ```
6. Check the returned immutable URL and https://ranel.pages.dev: `/`, `/barber`, `/contact`, `/privacy`, CSS/SVG, 404 and all `/inquiry` topics. Inspect redirects without following them. Run production configured E2E as above; verify account/project/environment/SHA through Cloudflare metadata without logging env values.
7. Persist project metadata and record date, deployment ID, deployed SHA, test outcomes and limitations. Documentation-only follow-up commits need not trigger another production deployment.

First project creation was executed once, after authenticated lookup confirmed absence: `npx wrangler pages project create ranel --production-branch main --compatibility-date 2025-09-20`. Do not re-create it on routine deploys.

**Do not attach, remove or modify `ranel.biz.id`/DNS as part of this catalog release.** Custom-domain work requires a separate authorized follow-up; an active zone alone is not proof of routing/TLS. An optional read-only DNS snapshot attempt received HTTP 403, so no record-diff comparison is claimed.

Rollback: use the `ranel` Pages deployment history to restore a prior known-good deployment, or build a known-good Git revision and redeploy to the same project. No database rollback is needed. Production deployment is verified; **rollback has not been exercised**.

## Known gaps and next necessary action
- Inquiry destination and manual-link behavior are verified. Actual WhatsApp registration, message sending/receipt, and availability are not tested; no real message was sent per founder instruction.
- Custom-domain setup was not performed by this release agent. `ranel.biz.id` appeared active in Cloudflare during final read-only checks, outside the agent's actions; actor and DNS/TLS/redirect/browser behavior remain unverified. Do not undo or reattach it blindly.
- Real-device Safari/Firefox testing, full manual accessibility assessment, legal/privacy operations, and 3–5 operator usability sessions: not completed.
- Kit contents, pilot pricing, support window, delivery/refund terms, and evidence of value: must be agreed later; website completion is not validation.
- `/products`, `/about`, `/terms`, CRM/admin/auth/payments/booking/loyalty/automation remain unimplemented; the current public offer scope is only the Phase 2 catalog and manual inquiry/evidence method.

Actual demand collection and choosing one deliverable manual pilot are the next necessary business actions. Any custom-domain verification/change requires separate authorization. A later phase is conditional on operator evidence and must not start automatically; a live catalog is not demand or market validation.

## Strategy documentation
1. [Brand platform](docs/brand/brand-platform.md)
2. [Visual identity](docs/brand/brand-identity.md)
3. [Business model](docs/business/business-model.md)
4. [Product catalog](docs/products/product-catalog.md)
5. [Barber vertical plan](docs/verticals/barber/vertical-plan.md)
6. [Go-to-market](docs/go-to-market.md)
7. [90-day roadmap](docs/roadmap.md)
8. [Legal and brand clearance](docs/governance/legal-and-brand-clearance.md)
9. [Documentation index](docs/README.md)
10. [Decision, capability and execution routing](docs/governance/decision-capability-execution-model.md)

This project remains separate from the private Bosku Cukur / Bozq One System. Prefer a narrow paid pilot and manual delivery before substantial software: **discover → sell a small paid pilot → deliver manually → measure → standardize → automate only where justified**. Never present unverified brand clearance, legal status, integrations, domain delivery, or business outcomes as confirmed.

Founder previously reported that `ranel.biz.id` was purchased and a PDKI search returned an empty result/note. The active Cloudflare zone was observed during Phase 1, but that is not trademark registration, legal clearance, or website deployment.
