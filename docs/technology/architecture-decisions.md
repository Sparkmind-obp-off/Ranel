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