# Phase 2 — Pilot product & demand validation

## Decision and scope
Newest founder execution prompt overrides the older proposed Phase 2 “Lead Handling & Sales Workflow” sequence. Execute **one complete Phase 2**, no sub-phases: define → present → inquire → record evidence → learn → only then consider building. The three products are Starter, Growth and System; prices remain unset. See [current catalog](../../products/product-catalog.md).

Preserve Phase 1B Hono/TypeScript/numeric runtime destination, security headers, Pages project `ranel`, production hostname and existing domains. No secret rotation or domain/DNS changes. No auth, CRM, customer database, admin, booking/loyalty engine, payments, analytics, automation or external SaaS dependency.

## Implementation boundaries
- `src/inquiry.ts`: shared three-product definitions; documented deliverables/use/exclusions/status and product-specific draft intent. Old `operations`, `retention`, `tracking` topics keep their original exact messages for bookmarks; unknown/malicious topics retain general safe fallback.
- `/barber`: existing cards/layout extended with a concise comparison path, target/problem/contents/receives, expandable how/use/exclusions/status, honest pilot price label and product CTA. System consistently marked conceptual/unavailable.
- `/contact`: same runtime readiness and manual handoff; extra System scope notice. No new contact channel or storage. `/inquiry` fixed-host 303 and absent/invalid-config fallback preserved. No test sends or follows WhatsApp requests.
- Home copy points to the current pilot catalog; privacy/router/security boundaries preserved.
- Existing unit/E2E tests updated for the changed catalog, not removed for green results. Add canonical-product and forbidden-route checks; retain legacy, invalid config, unknown-topic, security and no-form checks.

## Operating demand collection (manual)
1. When a **real** inquiry arrives in the existing business WhatsApp or authorized direct conversation, ask permission for relevant follow-up. Identify the operator's current workflow/recent problem before pitching.
2. Copy [blank template](../../templates/demand-evidence.md) into ignored `demand-records/` locally or an already-approved private store. Use anonymous operator/evidence IDs; keep any needed contact separate/restricted. Do not fill the committed template or put real customer data in Git/public assets. Local records are not automatically shared or backed up.
3. Record date/source/operator type/product/problem/requested capability/objection/follow-up/outcome. Mark unknowns, distinguish customer statements from interpretation, include next action/owner/date, deduplicate operators. No fabricated records or illustrative customer claims.
4. Follow up only within permission; close declined/no-response with actual basis. “Next step agreed,” “pilot scope agreed,” “payment verified,” and “used” are separate outcomes. A click/compliment is not payment or demand validation.
5. Review weekly: repeated problems, differences, objections, concrete commitments, usage/payment evidence if any, and delivery/support effort. Record evidence IDs, counterevidence and a continue/narrow/revise/defer/stop decision.
6. Existing [customer discovery](../../business/customer-discovery.md) proposes three independent similar problem reports and two concrete next steps as working pilot thresholds, **not** statistical validation. Apply cautiously; do not claim product-market fit or start engineering from interest alone.
7. Before any paid pilot, complete [pilot SOP](../../verticals/barber/pilot-sop.md): agree deliverables, exclusions, inputs, price, timing, support/revisions/cancellation and data boundaries. Product materials still require manual preparation; System concepts do not authorize a software build.

## Release and evidence
Use existing scripts: `npm ci`, lint, typecheck, built-worker tests/build, audit, then Pages preview via PM2 and browser E2E. Review mobile/desktop/screenshots, axe, all public routes and product context. Commit/push main without force, deploy CF BYOK to existing `ranel`, verify canonical/immutable origins and live configured E2E without following redirects. Capture deployed SHA/ID/date and actual results in [Phase 2 evidence](evidence.md); final docs-only HEAD can differ from deployed SHA.

## Phase boundary
Phase 2 completion means **catalog and evidence collection readiness**, not manufactured kit files, confirmed demand, a paid customer, validated outcomes, legal clearance, or usable System software. Next necessary work is real operator interaction and choosing one narrow manual pilot from evidence. Any later phase requires separate authorization; do not start Phase 3 automatically.
