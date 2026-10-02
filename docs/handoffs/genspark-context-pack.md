# Ranel — Genspark Context Pack

**Purpose:** Minimize repeated repo reading, prompt size, and execution cost for Genspark while preserving correctness.

## READ THIS FIRST

This file is the compact operating context for Genspark tasks in Ranel.

**Do not read the entire repository by default.**
Use the routing table below and open only the documents needed for the current task.

Canonical source of truth:
- Repository: `Sparkmind-obp-off/Ranel`
- Branch: `main`
- Founder retains final decision authority.
- GitHub documents/code are canonical.
- Genspark is an execution/capability layer; its reports are not accepted as proof until evidence is returned and reviewed.

## CURRENT VERIFIED BASELINE

### Product / phase
- Current business direction: **Ranel — Digital Revenue Engine**.
- First vertical: barber.
- Current public implementation is **Phase 2 — Pilot Product & Demand Validation**.
- Phase 2 is **PASS for catalog/evidence-readiness** and production is documented as **VERIFIED**.
- Actual demand, sales, product-market fit, and customer outcomes are **not validated**.
- Do not start the next implementation phase automatically.

### Current production
- Production: `https://ranel.pages.dev`
- Cloudflare Pages project: `ranel`
- Production branch: `main`
- Current documented immutable deployment: `https://68793aeb.ranel.pages.dev`
- Deployment ID: `68793aeb-029c-40a1-b0e2-8b3ca55c224b`
- Deployed application SHA: `a4915bad908268acc6df1efce4f0e2e2707e0c6a`
- Later docs-only commits do not change the deployed application provenance.
- `ranel.biz.id` has been observed in Cloudflare metadata, but DNS/TLS/redirect/browser behavior is not treated as independently verified.
- Do not mutate the custom domain/DNS unless a separate scope explicitly authorizes it.

### Current application
- Hono + TypeScript + Vite on Cloudflare Pages.
- Runtime dependency is Hono only.
- Public routes include `/`, `/barber`, `/contact`, `/privacy`, and inquiry redirects.
- Existing inquiry is a **manual WhatsApp handoff** using runtime configuration.
- No website inquiry database.
- No CRM, customer account, booking, loyalty, payment, subscription, automated messaging, LLM, analytics SDK, transactional email, or private Control Center/Core implementation yet.
- Ranel must remain separate from the private Bosku Cukur / Bozq One System and from Tolvey/Tolva.

## BUSINESS TRUTH

Ranel's intended long-term architecture is:

**Public Revenue Surface**
→ store/catalog, digital products, tools, templates, software, membership, commerce, content/SEO

**Private Control Center**
→ revenue, orders, customers, products, subscriptions, signals, interpretation, recommendations, automation, system health

**Core Business Truth / Execution**
→ orders, payments, entitlements, revenue ledger, business rules, idempotent events, commands, integrations, audit history

Decision loop:
real-world data → core → signals → interpretation/recommendation → founder decision → command → core execution → outcome → data.

LLM must interpret/recommend. It must not become the financial or payment source of truth and must not directly mutate pricing, spending, payment state, or campaigns without policy/approval.

## PROVIDER STATUS — IMPORTANT

The repository audit currently says:
- **Cloudflare:** public Pages target exists; broader account/resource state needs console verification.
- **Duitku:** founder-confirmed existing merchant/provider; **not integrated in Ranel**.
- **Neon:** founder-confirmed not yet set up for Ranel.
- **GroqCloud:** founder-confirmed not yet set up for Ranel.
- **PostHog:** founder-confirmed not yet set up for Ranel.
- **Resend:** founder-confirmed not yet set up for Ranel.
- **Make / Sentry / MCP / other integrations:** not part of the current application implementation.

Never convert a founder-confirmed status into a provider-console fact unless direct evidence exists.

## EXECUTION POLICY

### AUTO
Routine, low-risk, reversible work already covered by documented policy; reviewed deployment to an existing approved Ranel target may proceed when checks and target/configuration are verified.

### RECOMMEND
Analysis/documentation with no external state change.

### APPROVAL REQUIRED
Unknown/non-trivial cost, new paid account/plan, production DNS change, credential exposure/replacement, live payment/payout activation, price change, customer campaign, or new material public commercial commitment.

### ALERT
Security, payment, data-integrity, production-availability, or unexpected-cost issue.

### Never
- invent credentials, users, sales, demand, metrics, testimonials, prices, deployment evidence, integrations, or customer outcomes;
- expose secrets;
- weaken security checks to obtain a green result;
- silently replace framework/database/auth/domain architecture;
- overwrite unrelated work;
- claim “deployed/integrated/validated” from a local build or a generated report alone.

## TOKEN/CREDIT EFFICIENCY RULES

1. **Read this file first.**
2. Do not run a whole-repository semantic search unless the task genuinely requires it.
3. Do not reread documents already summarized here.
4. Use the routing table below to select only relevant documents.
5. Inspect exact files directly when the task names a file/path.
6. Read only the smallest useful line/page range first; expand only when needed.
7. For implementation, inspect current code/config first, then edit only files in scope.
8. Reuse existing tests/scripts; do not invent a new test harness.
9. Do not regenerate docs that already exist; patch the canonical document instead.
10. For external console work, capture evidence once and reuse it in the repository record.
11. Do not rerun deployment or full QA when a docs-only change is the only change.
12. Return compact evidence: exact commands, pass/fail counts, identifiers, URLs, and blockers. Avoid long narrative.

## TASK ROUTER

| Task | Read first | Then only as needed |
|---|---|---|
| External provider audit | `docs/handoffs/genspark-provider-audit.md` | `docs/technology/provider-inventory.md` |
| Public website/content | `README.md` | `docs/products/product-catalog.md`, relevant `src/*`, Phase 2 evidence |
| New product / pilot | `docs/products/product-requirements-template.md` | `docs/products/product-catalog.md`, barber vertical docs |
| Architecture | `docs/technology/architecture.md` | `data-model.md`, `integration-strategy.md`, ADRs |
| Database | `docs/technology/data-model.md` | backend/API, architecture, security |
| Auth/access | `docs/technology/auth-and-access-control.md` | security threat model, backend/API |
| Payments | `docs/technology/integration-strategy.md` | provider inventory, Duitku handoff if present |
| Deployment | `README.md` | `docs/technology/environments-and-deployment.md`, phase evidence |
| QA/release | `docs/technology/testing-and-qa.md` | MVP checklist, relevant phase evidence |
| Security/privacy | `docs/governance/privacy-and-security.md` | threat model, auth/access control |
| Genspark execution rules | `docs/technology/genspark-execution-protocol.md` | this context pack |

## PHASE 2 PRODUCT FACTS

Current public barber offers:
- **Ranel Barber Starter:** daily foundation; SOP/customer handling, menu/pricing structure, opening/closing checklists, basic permission-based repeat-customer routine. Manual deliverable: PDF + editable templates after agreement.
- **Ranel Barber Growth:** Starter + customer/visit records, permission-based retention/promo, service/revenue recap, operational review and small growth actions. Manual deliverable: Starter + editable spreadsheets + follow-up/review guide.
- **Ranel Barber System:** requirements/flow/priorities/scope concept only; not functioning software, demo access, or engineering commitment.

Prices are not fixed in the repo. Public language uses pilot/discussion framing.

## STANDARD VERIFICATION COMMANDS

For ordinary code changes, prefer the repository's existing commands:
```
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Do not run every command blindly. Select the smallest set justified by the change, then run the broader release gate when preparing a production deployment.

## DOCUMENTATION / EVIDENCE RULES

Use these meanings:
- **BUILT:** code exists.
- **TESTED:** a named test actually ran.
- **DEPLOYED:** the deployment system reported success and the target was checked.
- **INTEGRATED:** real provider connection/callback/payment/etc. was actually verified.
- **VALIDATED:** real attributable customer/business evidence exists.

A successful build is not deployment.
A deployment is not integration.
A catalog is not demand validation.

When evidence is unavailable:
- say **BLOCKED** or **UNKNOWN**;
- state exactly what access/evidence is missing;
- do not replace uncertainty with assumptions.

## GIT SAFETY

- Preserve unrelated changes.
- Do not force-push or rewrite history.
- Keep commits focused.
- Before editing a shared file, fetch its current version.
- Do not make conflicting parallel writes to the same path.
- Report the commit SHA after a successful commit.

## HANDOFF RETURN CONTRACT

For Genspark tasks, return:
1. STATUS — PASS / PARTIAL / BLOCKED / FAIL
2. ACCESS — what was accessible
3. COMPLETED — concrete changes/actions
4. VERIFIED — tests/evidence
5. NOT VERIFIED — remaining uncertainty
6. CHANGES — files/resources touched
7. EVIDENCE — URLs/IDs/timestamps/screenshots, excluding secrets
8. SAFETY — confirm no forbidden mutation
9. COMMIT — SHA/URL if Git changed
10. NEXT ACTION — smallest enabled next step

## FINAL PRINCIPLE

**One repo, one source of truth, one bounded task at a time.**
Genspark should execute from this context pack and targeted documents, not rediscover Ranel from zero on every task.
