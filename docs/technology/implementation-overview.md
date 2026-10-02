# Technical Implementation Overview

**Status:** Proposed baseline. Genspark.ai is the implementation assistant; GitHub is the source of truth; Cloudflare is the intended runtime.

## Build sequence
1. Public website and inquiry form.
2. Sell and deliver the first barber offer manually.
3. Build internal workflow only if manual work becomes a proven bottleneck.
4. Build customer-facing software after paid pilots establish repeated needs.
5. Add multi-tenancy only when multiple paying businesses need the same workflows.

## Layers
- Experience: public pages/forms; later authenticated workspace.
- Frontend: routes, reusable UI, validation, accessibility, responsive layouts.
- Backend/API: server validation, authorization, business rules, rate limits.
- Domain services: inquiries, offers, pilots, consent, reminders, reporting.
- Data: relational records and migrations when persistence is needed.
- Integrations: payment, email, WhatsApp, analytics, commerce adapters.
- Operations: tests, deployments, logs, backups, incident response.
- Governance: privacy, secrets, permissions, auditability, release gates.

## Proposed baseline
Prefer one modular full-stack application. TypeScript and a Cloudflare-compatible framework are proposed, but confirm the actual scaffold and deployment adapter before locking the stack. Use Workers for server-side logic and D1 only when structured persistence is needed. R2, KV, Queues, Durable Objects, and external services are optional, not default requirements.

No enterprise ERP, microservices, autonomous AI agent, unverified payment integration, automated WhatsApp API, or unnecessary personal-data collection in the first release.
