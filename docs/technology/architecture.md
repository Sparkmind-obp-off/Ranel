# System Architecture

**Status:** Proposed logical architecture; reconcile with the generated scaffold before implementation.

## Principles
- Start as a modular monolith.
- Keep business rules out of UI components.
- Put provider-specific code behind adapters.
- Enforce authorization server-side for every protected operation.
- Keep secrets server-side and use Cloudflare bindings where appropriate.
- Include data export/backup in the design.

## Logical flow
```text
Visitor / Operator
  -> Frontend (public pages; later authenticated workspace)
  -> Cloudflare Worker routes / API
       -> domain services and validation
       -> D1 (relational data, when needed)
       -> integration adapters (payments, messaging, commerce)
       -> R2 (files, only if needed)
       -> Queues (async work, only if justified)
```

Use one application and primary API boundary initially. Separate preview and production configuration/data. Commit D1 migrations to Git. A provider timeout must not create a confirmed paid order without verified evidence; notification failures must not undo saved records; webhook retries must be idempotent.

Add KV, R2, Queues, Durable Objects, or an external database only when requirements justify them.
