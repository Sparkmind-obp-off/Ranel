# System Architecture

**Status:** LOCKED logical architecture; reconcile concrete implementation details with evidence before activation.

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

## Architecture lock

The canonical Ranel architecture is **Public Revenue Surface → Private Control Center → Core Business Truth + Execution**. The AI operating model sits above deterministic signals and Core truth, providing interpretation/recommendations without authority to redefine commercial state. Exact provider, database, and integration choices remain implementation/evidence decisions inside this locked boundary. See [Master Blueprint](../foundation/ranel-master-blueprint.md), [Business Architecture Lock](../foundation/ranel-business-architecture.md), and [AI Operating Model](../foundation/ranel-ai-operating-model.md).
