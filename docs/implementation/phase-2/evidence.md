# Phase 2 — Pilot Product & Demand Validation evidence

## STATUS
**PASS — Phase 2 catalog and demand-evidence readiness; production VERIFIED at https://ranel.pages.dev.** One complete phase, no sub-phases. Actual demand, sales, users and product-market fit are not claimed. Local and live release checks passed; the blank/private recording method is ready for real interaction.

## PHASE
PHASE 2 — PILOT PRODUCT & DEMAND VALIDATION. Newest founder prompt supersedes older roadmap Phase 2 lead-workflow-only scope; original roadmap/history preserved. Starting/synchronized HEAD `64f250023d90684d22750b6678537bea2feaa6f3`, clean `main` matching `origin/main`. Existing Hono/TypeScript/npm/Vite Pages architecture, routes, contact secret and project retained.

Baseline read-only Cloudflare lookup: existing `ranel`, branch `main`, hostname `ranel.pages.dev`, production encrypted contact binding; deployment `a9f812e4-3c47-4d2b-9c73-2d8728c6992c`, deployed SHA `9a4989f53a60ef04adebf2633a9dafe836c8359b`, success. Domains observed `ranel.pages.dev` and `ranel.biz.id`; neither changed by this phase. Baseline four public routes HTTP 200.

## PRODUCT
- **Ranel Barber Starter:** daily foundation for independent/small operators: SOP/customer handling, menu/pricing structure, opening/closing checklists and basic permission-based repeat-customer routine. Defined deliverable: PDF guide + editable document templates, manually prepared after agreement.
- **Ranel Barber Growth:** Starter plus customer/visit records, permission-based retention/promo, service/revenue recap, operational review and small growth actions. Defined deliverable: Starter package + editable spreadsheets and manual follow-up/review guide; no CRM, automated campaigns or outcome guarantee.
- **Ranel Barber System:** conceptual digital requirements: dashboard/reporting, inquiry/booking, database/history, loyalty/automation priorities. Defined discussion deliverable: requirements/flow/priorities/scope document, **not functioning software, demo access or engineering commitment**.

Each exposes target, possible problem, contents, receives, how, use case, pilot status, exclusions and CTA. No approved prices exist in repository; use “Harga pilot — diskusikan kebutuhan.” Pilot price/time/support/revisions/cancellation must be privately agreed before work/payment. Materials are not already-created downloadable products. [Catalog](../../products/product-catalog.md).

## IMPLEMENTATION
- `src/inquiry.ts`: shared three-product definitions and distinct drafts; old operations/retention/tracking topics keep exact Phase 1B intent, not remapped to new tiers.
- `src/index.tsx`: extend existing `/barber` cards/comparison/metadata/manual-process/FAQ; small home alignment and System contact scope notice. `/`, `/contact`, `/privacy`, `/inquiry`, runtime config validation, generic/404 response, CSP and fixed-host redirect preserved. No client scripts/new backend.
- `public/static/style.css`: scoped comparison/detail styles reuse existing palette, cards and mobile rules.
- `tests/app.test.mjs`, `tests/browser/public.spec.ts`: updated current-catalog expectations; additive product/scope checks, retained legacy/invalid/unknown/no-form/security cases. FAQ selectors scoped to actual FAQ after adding product details, rather than accidentally testing an unrelated accordion.
- `.gitignore`: exclude private `demand-records/`.
- Product catalog, blank demand template, implementation notes, README/index, decision log and roadmap updated. No dependency, Wrangler binding, secret, domain/project or architecture replacement.

## TESTS
Actual local execution, 2026-10-02:
- `npm ci`: success; lockfile-based 164 packages, unchanged dependency manifests/lock.
- Scoped Prettier formatting: successful; no new dependency added.
- `npm run lint`: exit 0.
- `npm run typecheck`: exit 0.
- `npm test`: build + **28 passed, 0 failed, 0 skipped**. Legacy drafts strengthened with exact-text assertions; three canonical configured/unconfigured product cases and forbidden-route test added.
- Build through `npm test` and standalone `npm run build` from committed release before deployment: success, 53 modules, Worker **66.75 kB** (reported uncompressed bundle).
- `npm audit`: **0 vulnerabilities**.
- PM2 Pages preview built before restart; readiness polled instead of assuming PM2 status. Initial curl connection retries preceded readiness, then HTTP 200.
- `npm run test:e2e` local default-unconfigured state: **27 passed, 0 failed**, reported 1.1 min; no retries configured. 320×740, 390×664 Chromium mobile emulation, 1440×1000. Three product visibility/deliverables/expandable how-use-boundaries/CTAs, whole journey, safe canonical+legacy redirects and unknown fallback verified.
- Four public pages at three viewports passed axe WCAG 2/2.1 A/AA checks with zero detected violations; keyboard/focus/FAQ/404, metadata, links/anchors, CSS/SVG, no page/console errors checked.
- Desktop/mobile catalog screenshots reviewed: three scopes/status/deliverables/CTAs distinguishable, no clipping/overlap/overflow observed. Artifacts ignored, not customer evidence.
- Production configured `npm run test:e2e`: **27 passed, 0 failed**, **51.8 s**, same 320/390/1440 px viewports. Exact three-product scope/deliverables/CTAs, configured contact state, canonical+legacy/general/unknown drafts, keyboard/FAQ/links/assets/404 and zero detected axe A/AA violations verified live, not inferred from local checks.
- Source/docs/build configured-credential scan: **65 files, 0 matches**; production recipient literal absent from app/public/build/new report. Markdown local-file links: **45 documents, no missing destination**. `git diff --check`: exit 0. Package/lock/Vite/Wrangler diff unchanged; private record path ignored and no record directory/data created.
- No application test failures in this phase. Startup curl connection retries ended after readiness; all final gates passed. Credential history and final remote/clean-tree checks are performed for the closing commit.

Tests never send messages or follow WhatsApp redirects. Synthetic unit contact remains fictitious; production expected destination is supplied privately, never printed or copied into code/assets/new docs. No tests removed merely for green results.

## DEPLOYMENT
Activated **cf-byok-deploy**, authenticated authorized account, read/persisted `cloudflare_project_name=ranel`. Committed/pushed reviewed changes before rebuilding/deploying existing `ranel`, branch `main`; no project creation/renaming, secret update/rotation, domain/DNS or security-setting mutation.

- Production: **https://ranel.pages.dev**.
- Immutable URL: **https://68793aeb.ranel.pages.dev**.
- Deployment ID: **`68793aeb-029c-40a1-b0e2-8b3ca55c224b`**.
- Deployed SHA: **`a4915bad908268acc6df1efce4f0e2e2707e0c6a`**.
- Cloudflare creation: **`2026-10-02T05:53:00.871959Z`**; CLI completion observed `05:53:02Z`.
- Actual command: `npx wrangler pages deploy dist --project-name ranel --branch main --commit-hash "$(git rev-parse HEAD)"`.
- Cloudflare API verified exact project/hostname/main/production, final **success**, trigger SHA and preserved encrypted production contact binding. Observed domain list stayed `ranel.pages.dev`, `ranel.biz.id`, matching the read-only Phase 2 baseline. Existing custom-domain live TLS/redirect/browser behavior not tested or reconfigured.
- Both production and immutable origins: `/`, `/barber`, `/contact`, `/privacy`, CSS/SVG **200**; catalog has exactly named products/statuses, contact active, built assets byte-identical. `/not-a-page`, `/admin`, `/api/customers` **404**. General, three canonical, three legacy and unknown `/inquiry` cases **303**; approved destination unchanged, exact decoded message verified, external redirect never followed.
- Existing secret/runtime config and dependencies were preserved; no WhatsApp message/request sent. Default Python user-agent limitation from Phase 1B was not worked around by weakening Cloudflare security.

## GIT
Source release **`a4915ba`** was committed/pushed to `origin/main` before deployment. No reset/history rewrite/force push. This final evidence/README release update is documentation-only and does not change the deployed SHA; its HEAD is recorded in Git history/final execution report. Final local HEAD equals `origin/main`, with clean working tree checked after the actual closing push.

## DEMAND VALIDATION
[Blank evidence template](../../templates/demand-evidence.md) captures date, source, anonymous operator/type, product, stated problem, capability request, objection, follow-up permission/status/next action and outcome/evidence basis. Copy privately to ignored `demand-records/` or an already-approved restricted store. No real records are automatically created, committed, collected, or backed up by the website.

[Operating method](implementation-notes.md): real inquiry → permission-based conversation → anonymized manual entry → weekly evidence review → continue/narrow/revise/defer/stop decision. Deduplicate operators, record counterevidence and unknowns, distinguish curiosity/next step/scope agreement/verified payment/actual use. Existing discovery thresholds are working hypotheses, not proof. **No real demand evidence was supplied/created by this implementation; readiness is not validated demand.**

## LIMITATIONS
Actual kit production/fulfillment, pilot price/support/timing/refund agreements, WhatsApp registration/send/receipt, operator sessions, legal review, physical devices/Safari/Firefox and production rollback remain unverified or require later manual work. System is not an engineered app. Default Python user-agent was blocked by Cloudflare 1010 in Phase 1B; curl/browser release checks are used, no security weakening. Custom-domain state is preserved, not reconfigured. No CRM/auth/database/admin/booking/loyalty/payment/automation added.

## PASS GATE

| Required group | Verification |
|---|---|
| Product | PASS — three scopes/targets/problems/includes/receives/how/use/status/CTAs; honest price/status and no fabricated results |
| Website | PASS — current catalog, canonical CTAs, old topic compatibility, preserved contact/privacy/routes; mobile/desktop/browser checks |
| Demand method | PASS for readiness only — blank template + private/manual operating procedure; no fabricated demand/records |
| Engineering | PASS — install/lint/typecheck/28 unit tests/build/27 local + 27 live E2E/audit/accessibility and scoped security checks |
| Production | PASS — existing `ranel` success ID/SHA, canonical and immutable smoke, exact new/old inquiry behavior |
| Documentation | PASS — catalog/template/implementation decisions/evidence/README/index; committed GitHub release notes |

## NEXT PHASE
Next business action: obtain real operator conversations, record evidence privately, choose **one** narrow deliverable pilot, agree scope/commercial boundaries and prepare the actual materials before accepting payment. Recommend a separately approved paid-pilot/manual-delivery phase only when evidence justifies it. Do not start Phase 3 automatically.
