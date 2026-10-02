# Phase 2 — Pilot Product & Demand Validation evidence

## STATUS
**PARTIAL — local implementation/QA verified; Phase 2 production release pending.** This is one complete phase, not a set of sub-phases. No actual demand, sales, users or product-market fit claimed. Final production outcome is appended only after deployment/verification.

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
- Build through `npm test`: success, 53 modules, Worker **66.75 kB** (reported uncompressed bundle).
- `npm audit`: **0 vulnerabilities**.
- PM2 Pages preview built before restart; readiness polled instead of assuming PM2 status. Initial curl connection retries preceded readiness, then HTTP 200.
- `npm run test:e2e` local default-unconfigured state: **27 passed, 0 failed**, reported 1.1 min; no retries configured. 320×740, 390×664 Chromium mobile emulation, 1440×1000. Three product visibility/deliverables/expandable how-use-boundaries/CTAs, whole journey, safe canonical+legacy redirects and unknown fallback verified.
- Four public pages at three viewports passed axe WCAG 2/2.1 A/AA checks with zero detected violations; keyboard/focus/FAQ/404, metadata, links/anchors, CSS/SVG, no page/console errors checked.
- Desktop/mobile catalog screenshots reviewed: three scopes/status/deliverables/CTAs distinguishable, no clipping/overlap/overflow observed. Artifacts ignored, not customer evidence.
- Production configured tests and final credential/Git/link review are recorded at release completion, not inferred from local success.

Tests never send messages or follow WhatsApp redirects. Synthetic unit contact remains fictitious; production expected destination is supplied privately, never printed or copied into code/assets/new docs. No tests removed merely for green results.

## DEPLOYMENT
Target is existing https://ranel.pages.dev using activated **cf-byok-deploy**, no project creation/renaming, secret rotation or domain/DNS change. Phase 2 deployment ID/deployed SHA and live verification pending at this local checkpoint. Phase 1B production remains the existing release until actual redeploy.

## GIT
No reset/history rewrite/force push. Local implementation is reviewed then committed/pushed before deployment; documentation-only release follow-up can differ from deployed SHA. Final HEAD, remote match and working-tree cleanliness are recorded after the actual final push.

## DEMAND VALIDATION
[Blank evidence template](../../templates/demand-evidence.md) captures date, source, anonymous operator/type, product, stated problem, capability request, objection, follow-up permission/status/next action and outcome/evidence basis. Copy privately to ignored `demand-records/` or an already-approved restricted store. No real records are automatically created, committed, collected, or backed up by the website.

[Operating method](implementation-notes.md): real inquiry → permission-based conversation → anonymized manual entry → weekly evidence review → continue/narrow/revise/defer/stop decision. Deduplicate operators, record counterevidence and unknowns, distinguish curiosity/next step/scope agreement/verified payment/actual use. Existing discovery thresholds are working hypotheses, not proof. **No real demand evidence was supplied/created by this implementation; readiness is not validated demand.**

## LIMITATIONS
Actual kit production/fulfillment, pilot price/support/timing/refund agreements, WhatsApp registration/send/receipt, operator sessions, legal review, physical devices/Safari/Firefox and production rollback remain unverified or require later manual work. System is not an engineered app. Default Python user-agent was blocked by Cloudflare 1010 in Phase 1B; curl/browser release checks are used, no security weakening. Custom-domain state is preserved, not reconfigured. No CRM/auth/database/admin/booking/loyalty/payment/automation added.

## NEXT PHASE
Next business action: obtain real operator conversations, record evidence privately, choose **one** narrow deliverable pilot, agree scope/commercial boundaries and prepare the actual materials before accepting payment. Recommend a separately approved paid-pilot/manual-delivery phase only when evidence justifies it. Do not start Phase 3 automatically.
