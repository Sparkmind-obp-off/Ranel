# Technical Implementation Overview

**Status:** LOCKED implementation framework. Concrete provider/database choices and subsystem activation remain evidence-gated. Genspark.ai is an execution assistant; GitHub is the source of truth.

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

## Current implementation baseline
The current public release is a Hono + TypeScript + Vite application on Cloudflare Pages. The long-term system uses separate logical boundaries: Public Revenue Surface, private Control Center, and Core Business Truth + Execution. These may be deployed separately when activated. Do not force all layers into one runtime just for architectural simplicity. Exact infrastructure products remain evidence-gated.

No enterprise ERP, microservices, autonomous AI agent, unverified payment integration, automated WhatsApp API, or unnecessary personal-data collection in the first release.

## Current-state rule

The implementation framework is locked, but the future Control Center/Core are not automatically authorized by this document. Build only the smallest subsystem justified by an evidence gate.
