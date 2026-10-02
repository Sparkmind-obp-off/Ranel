# Security Threat Model

## Assets
Domain/deployment control; source and CI credentials; customer contact details; pilot agreements/business records; payment/order state if introduced; customer files/exports if introduced.

## Trust boundaries
Browser/API; API/database/storage; application/provider; provider webhook/application; operator/workspace; tenant-to-tenant (future); Genspark-generated code/reviewed GitHub code.

## Threats and controls
- Form spam: server validation, rate limits, bounded payloads, spam controls.
- Injection: parameterized queries, context-aware output encoding, safe rendering.
- Broken access control: server-side permission checks and negative tests.
- Cross-tenant exposure: explicit tenant scoping and isolation tests before multi-tenant launch.
- Secret leakage: secret manager, ignore local env files, review diffs, rotate exposed credentials.
- Forged/replayed webhook: signature validation, freshness checks, idempotency/event IDs.
- Supply-chain risk: lock dependencies, review updates, avoid unnecessary packages, run available audits.
- Data loss: tested exports/backups, migration discipline, limited destructive operations.
- Privacy overcollection: minimize data, define purpose, retention, deletion.
- Prompt/code injection: treat external content and generated code as untrusted; never include secrets in prompts; review diffs/tests.

Reassess when accounts, payments, automated messaging, file uploads, or multi-tenant data are introduced.