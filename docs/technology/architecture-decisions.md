# Architecture Decision Records

Record material technical decisions here. Add dated entries when decisions change; do not silently rewrite history.

## ADR-001 — Modular monolith before microservices
**Status:** ACCEPTED. One application with explicit modules initially, reducing operational complexity.

## ADR-002 — Validate before building a customer app
**Status:** ACCEPTED. Start with public presence, inquiry capture, and manual paid delivery because demand/workflows are not proven.

## ADR-003 — Cloudflare runtime
**Status:** PROPOSED. Prefer Cloudflare-compatible deployment using Workers/static assets; consider D1 for relational data. Verify framework adapter, bindings, account limits, and deployment before implementation.

## ADR-004 — D1 only when persistence is required
**Status:** PROPOSED. If used, migrations, environment separation, export, and recovery become release requirements.

## ADR-005 — No automated payment/messaging by default
**Status:** ACCEPTED. Use verified manual process until provider and workflow justify automation.

## ADR-006 — Canonical domain
**Status:** FOUNDER-REPORTED. Intended domain is `ranel.biz.id`; founder reports purchase. Verify DNS/TLS and account access before launch; never store credentials in Git.

## ADR-007 — Phase 1 scaffold and inquiry boundary (2026-10-02)
**Status:** IMPLEMENTED; VERIFIED LOCALLY, NOT PRODUCTION-DEPLOYED. Baseline `bef5456` was documentation-only. Add one Hono/TypeScript app, Vite Pages adapter, native Pages assets, npm lockfile, and development-only lint/type/browser QA tools. Shared layout and static catalog stay within one app. No client scripts, database, storage, auth, or provider submission API. This narrows ADR-003 for Phase 1 without approving future services.

Read `INQUIRY_WHATSAPP_NUMBER` from runtime configuration, validate format, and use fixed-host WhatsApp deep links with allowlisted topic messages. Without approved configuration, show a clear unconfigured state and no send CTA. Unit tests use synthetic fixtures, not real contact details. This is a manual external handoff, not stored lead capture, automated messaging, or verified message delivery.

The Pages adapter's fallback handling does not preserve the custom not-found handler with the installed Hono version. Use an explicit final catch-all route returning 404; regression tests exercise the built worker. No dependency monkey-patching.

## ADR-008 — Do not guess deployment resources (2026-10-02)
**Status:** BLOCKED. BYOK authentication succeeds. Existing Pages project listing and direct lookups do not identify `ranel` or `runnel`; direct requests return 404/code 8000007. `ranel.biz.id` zone is active, but its site DNS/TLS/canonical behavior is not verified. No project created, domain changed, or site overwritten. Do not default metadata/config to `webapp` or a suffixed name: the founder explicitly requires the existing target. Resolve account/project/hostname and approved contact before release. See Phase 1 evidence and README for the exact workflow.

## ADR-009 — Phase 1B release authorization and verification (2026-10-02)
**Status:** ACCEPTED; PRODUCTION VERIFIED. New explicit founder instruction supersedes ADR-008's historical existing-project-only blocker: create exactly `ranel` if absent in the authenticated authorized account, deploy via CF BYOK to `https://ranel.pages.dev`, and defer `ranel.biz.id`/DNS. No suffix or `runnel` substitution. Authenticated discovery found one account and no target; creation, deployment, and exact hostname/SHA were verified.

Existing app/source, offer content, runtime secret reader, and synthetic unit tests are unchanged. Store the founder-approved business destination in the production runtime secret only, leaving preview configuration unset. Browser QA now declares expected contact state explicitly and checks all redirect topics using `maxRedirects: 0`; no WhatsApp requests or messages sent. No database/new backend/provider added. Runtime config verification, release metadata, production smoke/browser tests, and remaining limits are recorded in [Phase 1B evidence](../implementation/phase-1b-release-deployment/evidence.md). Original decisions/checkpoints remain historical, not silently rewritten.

## ADR-010 — Ranel master architecture and Revenue Engine lock (2026-10-02)
**Status:** ACCEPTED; LOCKED at strategic/logical level.

The founder locks the Ranel system boundary as **Public Revenue Surface → Private Control Center → Core Business Truth + Execution**, with an AI intelligence layer providing interpretation and recommendations above deterministic signals and Core truth.

The business model is **Kits → Systems → Supply**, connected by the Revenue Engine loop **Demand → Opportunity → Product → Distribution → Transaction → Fulfillment → Outcome → Learning**.

This ADR supersedes any older wording that described the overall architecture as merely proposed, while preserving historical ADRs as historical records. It does not automatically select a production database, provider, model, custom domain configuration, payment integration, or implementation timeline. Those remain evidence-gated implementation decisions inside the locked boundary.

See:
- [Master Blueprint](../foundation/ranel-master-blueprint.md)
- [Business Architecture Lock](../foundation/ranel-business-architecture.md)
- [AI Operating Model](../foundation/ranel-ai-operating-model.md)
- [Revenue Engine](../foundation/ranel-revenue-engine.md)
- [Strategic Roadmap & Gates](../foundation/ranel-roadmap-and-gates.md)
