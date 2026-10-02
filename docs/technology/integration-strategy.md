# Integration Strategy

Add integrations only when they solve a demonstrated customer problem or remove necessary manual work. Document cost, permissions, failure modes, and exit path.

## Stages
- **Stage 0 — Manual:** manual contact, delivery, and payment confirmation for small pilots.
- **Stage 1 — Web basics:** contact endpoint and low-noise analytics/error monitoring if needed. A WhatsApp link is not automated messaging.
- **Stage 2 — Payments:** verify merchant eligibility, methods, fees, settlement, refunds, webhook signatures, sandbox, and production credentials. Make processing idempotent.
- **Stage 3 — Messaging:** verify provider access, templates, cost, opt-in/consent, stop handling, delivery status, retries, and retention. Keep manual fallback.
- **Stage 4 — Commerce tools:** integrate marketplaces, affiliate programs, accounting, or POS only after workflow/access are verified.

For every adapter, document provider/API version, scopes and secret storage, mapping, timeouts/retries/idempotency, webhook validation, costs, data shared and purpose, monitoring/fallback, sandbox evidence, and disconnect procedure.

Never store card data, hardcode credentials, blindly retry non-idempotent payment actions, treat redirects as payment proof, or send marketing messages without appropriate consent.