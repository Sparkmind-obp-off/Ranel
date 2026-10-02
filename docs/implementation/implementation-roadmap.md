# Ranel Implementation Roadmap

**Status:** PROPOSED implementation plan  
**Owner:** Founder  
**Repository:** Sparkmind-obp-off/Ranel  
**Primary domain:** ranel.biz.id (founder-reported purchase; deployment/DNS not yet verified)  
**Runtime direction:** Cloudflare, subject to scaffold and compatibility verification

This roadmap describes intended work. A phase is complete only when its acceptance criteria and evidence are recorded. A document or generated code is not proof of deployment, integration, sales, or market validation.

## Delivery principles

1. GitHub is the source of truth for requirements, decisions, and implementation evidence.
2. Genspark must inspect the current repository and preserve existing work before editing.
3. Implement the smallest useful scope that tests a real business assumption.
4. Do not add a database, authentication, payment gateway, CRM, analytics platform, or automation merely because it may be useful later.
5. Never invent credentials, contact details, customer evidence, test results, deployment URLs, or integration success.
6. Keep secrets out of source control. Use environment variables/secrets and document required configuration.
7. Report completed, blocked, and unverified items separately.
8. The Ranel project is separate from the private Bosku Cukur / Bozq One System.

## Phase 1 — Public Website & Inquiry Capture

**Goal:** Give Ranel a credible public presence and a simple path for an interested operator to ask about the first barber-business offer.

**Scope**
- Inspect the existing repository, framework, scripts, and deployment configuration before making changes.
- Build or refine the public Ranel homepage.
- Add a barber-vertical landing page that explains the audience, practical problems addressed, and initial offer categories without unsupported claims.
- Show a small, editable catalog of proposed offers (for example: operations/SOP starter kit, customer-retention templates, and a basic business tracking kit). Mark prices as “contact for pilot pricing” unless the founder has approved a real price.
- Add inquiry capture using a clearly configured contact route. Prefer a configurable WhatsApp deep link with a prefilled message if no backend exists. Do not pretend inquiries are stored in a database when they are not.
- Add responsive layouts, accessible navigation, meaningful page titles/descriptions, clear calls to action, and basic error/empty states.
- Add setup and deployment instructions; use the existing project stack where viable.
- Include tests/checks supported by the repository's actual tooling.

**Out of scope**
- Admin dashboard, user accounts, database, CRM, booking engine, loyalty engine, payment gateway, automated WhatsApp messaging, inventory, affiliate tracking, subscription billing, and multi-vertical expansion.
- Fake testimonials, fabricated customer counts, unsupported outcome guarantees, or invented founder/contact details.
- Claiming the domain is live or deployed unless verified.

**Acceptance gate**
- Existing project structure and framework have been identified and preserved where practical.
- Homepage and barber landing page render correctly on mobile and desktop.
- Offer content is understandable and clearly framed as a pilot/proposed offer where applicable.
- Every primary CTA works; inquiry path has a real, documented destination or is explicitly marked blocked pending configuration.
- No placeholder links, dead buttons, fabricated social proof, secrets, or misleading claims.
- Lint/typecheck/build/tests run where scripts exist; results are reported accurately.
- Deployment is verified only if access and configuration permit it; otherwise provide exact blocker and manual steps.
- Genspark returns a file/change summary, test evidence, deployment status, and unresolved issues.

## Current Phase 2 — Pilot Product & Demand Validation

**Scope updated by newest founder execution prompt, 2026-10-02.** Execute one complete phase, without sub-phases: define Starter/Growth/System → extend `/barber` → preserve manual WhatsApp inquiry → establish a private manual evidence method → QA/push/deploy existing `ranel` → verify and report. No prices, customers, sales, product-market fit or digital-feature availability invented. Starter/Growth are manual scoped pilot offers; System is concept definition, not engineering authorization.

[Current pilot catalog](../products/product-catalog.md) · [Implementation/method](phase-2/implementation-notes.md) · [Phase 2 evidence](phase-2/evidence.md) · [Blank demand template](../templates/demand-evidence.md).

Gate: three understandable scopes/targets/deliverables/statuses/CTAs, honest public catalog, backward-compatible inquiry, responsive/accessibility/security checks, documented evidence-readiness and verified production release. Actual demand requires real interactions after release. Later proposed phases below are not authorized automatically.

## Historical proposed Phase 2 — Lead Handling & Sales Workflow

**Goal:** Make inquiry follow-up consistent before introducing a full CRM.

**Scope:** Define lead stages, a lightweight lead log (initially a spreadsheet or existing tool), follow-up SOP, qualification questions, and weekly funnel review. Add software only if manual handling becomes a demonstrated bottleneck.

**Gate:** A real inquiry can be recorded, assigned, followed up, and classified as won/lost/no response with a reason.

## Phase 3 — First Paid Product

**Goal:** Prepare one narrow, deliverable paid offer for barber operators.

**Scope:** Finalize one product specification, contents, usage instructions, delivery format, pilot price hypothesis, support boundary, and manual fulfillment procedure.

**Gate:** A clear offer can be sent to a qualified prospect and delivered without requiring new custom software. Price remains a hypothesis until tested.

## Phase 4 — Paid Pilot & Demand Validation

**Goal:** Test willingness to pay and whether customers use the product.

**Scope:** Conduct customer conversations, make direct offers, deliver to a small pilot cohort, and record objections, payments, usage, delivery time, support load, and feedback.

**Gate:** Founder makes an evidence-based continue/revise/stop decision. Interest and compliments are not counted as sales.

## Phase 5 — Operational Admin & Reporting (conditional)

**Goal:** Reduce operational friction that has been observed in real delivery.

**Scope:** Only after a clear need exists, define the minimum admin workflow and data model for leads/orders/delivery/status/reporting. Evaluate D1 or another persistence option against actual requirements.

**Gate:** A documented manual workflow is demonstrably insufficient, and the smallest implementation has measurable operational value.

## Phase 6 — Commerce & Delivery Integrations (conditional)

**Goal:** Reduce repetitive work in payment confirmation and product delivery.

**Scope:** Evaluate one integration at a time. Verify provider availability, fees, account eligibility, webhooks, failure handling, refunds, and security before implementation.

**Gate:** Sandbox tests and end-to-end evidence pass; manual fallback is documented. No integration is described as live until verified.

## Phase 7 — Retention & Second Vertical

**Goal:** Improve repeat purchase and determine whether the operating model transfers to another local-service vertical.

**Scope:** Measure product usage, support needs, repeat purchase/referrals, and delivery economics. Interview operators in a second vertical before adapting the offer.

**Gate:** Expand only when the barber offer has sufficient evidence and the second vertical has independently validated needs.

## Optional Phase 8 — Scale-up

Possible later work: customer accounts, subscriptions, more automation, a reusable multi-vertical product platform, advanced reporting, and supply/affiliate operations. Each requires a separate business case and acceptance criteria.

## Phase gates and evidence

For each phase, maintain:
- docs/implementation/phase-N/ scope and execution prompt;
- implementation/change summary;
- test commands and actual results;
- screenshots or deployed URL where available;
- environment variables/configuration required (names only, never secret values);
- known limitations and unresolved blockers;
- explicit gate decision: PASS, BLOCKED, or NOT RUN.

A phase cannot be marked PASS solely because code was generated.

## Phase 1B — Release Configuration & Production Deployment

**Status:** In progress after Phase 1 local QA.  
**Goal:** Configure the founder-approved business inquiry destination, create the intended Cloudflare Pages project if absent, deploy the existing app, and verify the live release.

**Fixed decisions:** WhatsApp destination is founder-provided and normalized to international digits for a WhatsApp link; target project is exactly `ranel`, target default hostname `https://ranel.pages.dev`. Do not use `runnel`. Do not change custom-domain DNS in this phase.

**Gate:** Contact configuration is verified without sending a real test message; the intended project exists in the correct authenticated account; deployment and key routes/assets are verified; checks and evidence are recorded; no credentials are exposed. If account permissions or identity are ambiguous, stop before creating resources and report the exact blocker.

**Execution prompt:** [Phase 1B master system prompt](phase-1b-release-deployment/master-system-prompt.md)
