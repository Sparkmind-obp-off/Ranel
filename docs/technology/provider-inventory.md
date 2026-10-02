# Ranel — Provider Inventory & Configuration Audit

**Status:** Repository audit complete; founder-confirmed provider status recorded; external console verification pending  
**Audit date:** 2026-10-02  
**Repository:** `Sparkmind-obp-off/Ranel`, branch `main`  
**Purpose:** Establish what the checked-in application actually uses before finalizing the Revenue Engine architecture.

> This is a repository/configuration-file audit plus provider-status statements confirmed by the founder. No API keys, secret values, account settings, billing settings, or live external integrations were inspected through provider dashboards during this audit. The founder confirms Duitku is available as an existing merchant/payment provider, but it has not been integrated into Ranel; Neon, GroqCloud, PostHog, and Resend have not yet been set up for Ranel.

## Executive summary

The current production application is a small Hono + TypeScript + Vite Cloudflare Pages site. Its only runtime package dependency is Hono. It presents the Phase 2 barber catalog and a manually initiated WhatsApp handoff.

The checked-in application does **not** currently implement Ranel Core, a private Control Center, customer accounts, a persistent business database, payments, subscriptions, automated delivery, product analytics, LLM interpretation, or transactional email.

The current Cloudflare Pages project `ranel` and the production `INQUIRY_WHATSAPP_NUMBER` secret are documented as configured. This does not establish that any additional Cloudflare products (Workers API, D1, Hyperdrive, Queues, R2, KV) are provisioned.

## Provider inventory

| Provider/service | Repository evidence | Current status | Recommendation |
|---|---|---|---|
| GitHub | Canonical repository, branch `main`; package/config/docs are checked in | **Present** | Keep as source of truth. |
| Cloudflare Pages | `wrangler.jsonc` names project `ranel`; README/evidence record production deployment at `https://ranel.pages.dev` | **Existing public deployment documented** | Keep. Do not create separate Control/Core deployments until architecture is approved. |
| Cloudflare Workers/API | No Core API app or Worker entry point is present in the current app structure | **Not implemented in repo** | Add as a separate deployment target after architecture lock. |
| Cloudflare D1 | No binding/migration/application use found in the audited configuration and architecture docs | **Not configured in repo** | Do not create yet. Decide whether to keep the existing proposed D1 direction or choose Neon after inspecting current requirements and account limits. |
| Cloudflare Hyperdrive | No binding/configuration/use found in the audited configuration | **Not configured in repo** | Only consider if using an external PostgreSQL database through Workers and connection pooling is useful. It is not a database. |
| Cloudflare KV / R2 / Queues / Durable Objects | No bindings or runtime use found in the audited configuration | **Not configured in repo** | Add only when a concrete workflow requires them. |
| Duitku | No payment SDK, API adapter, webhook route, or payment configuration appears in the current app/package | **Founder-confirmed: existing merchant/provider; not integrated in Ranel** | Before implementation, verify PDS v2 credentials, enabled payment methods, callback/webhook security, sandbox/live configuration, fees, settlement and refund/disbursement requirements in the Duitku console. |
| Neon PostgreSQL | No Neon package, connection binding, schema, or migration found in the audited app | **Founder-confirmed: not yet set up for Ranel; console not inspected** | Do not create a database until the final database decision is approved. |
| GroqCloud API | No Groq SDK, API client, model configuration, or secret binding found | **Founder-confirmed: not yet set up for Ranel; console not inspected** | Candidate for the first LLM experiment after deterministic signals and decision records exist. Create/use a project only after the LLM boundary and budget are approved. |
| PostHog | No SDK, analytics snippet, or server-side event integration found; README says no third-party analytics | **Founder-confirmed: not yet set up for Ranel; console not inspected** | Optional. Define canonical product/checkout events and privacy rules before creating a project. Do not treat analytics as financial truth. |
| Resend | No SDK, email client, or email secret binding found | **Founder-confirmed: not yet set up for Ranel; console not inspected** | Candidate for transactional email once orders and digital fulfillment exist. Verify sending-domain setup and limits first. |
| WhatsApp | The app builds a fixed `wa.me` link from the runtime `INQUIRY_WHATSAPP_NUMBER` binding; visitors manually review/send | **Manual handoff only** | No WhatsApp Business API automation is implemented. Do not confuse the link with an API integration. |
| MCP/connectors | No MCP client/server or connector integration found in the app | **Not integrated in repo** | Defer. Prefer direct APIs/webhooks for production business-critical flows; introduce MCP only for a specific controlled tool-access need. |
| Sentry | No SDK/configuration found | **Not integrated in repo; account status unknown** | Optional; start with Cloudflare logs and health checks, then add if a monitoring gap is demonstrated. |
| Make | No Make scenario/API integration found in the app | **Not integrated in repo; account status unknown** | Optional; use only for an integration whose maintenance/cost is better than a direct adapter. |

## Current runtime and configuration

### Confirmed from repository files
- Runtime: Hono on Cloudflare Pages, built with Vite and Wrangler.
- Runtime application dependency: Hono only.
- Existing runtime binding: `INQUIRY_WHATSAPP_NUMBER`, documented as a production secret.
- Local example: `.dev.vars.example` contains an empty placeholder for that binding.
- No database schema/migrations or persistence layer.
- No customer authentication, commerce checkout, payment callback, subscription, email, LLM, or analytics integration.
- The public website does not persist inquiries and does not send messages automatically.

### Must be checked in provider consoles
- Cloudflare account, current Pages project, deployments, environment bindings, secret names, usage and billing limits.
- Whether any separate Cloudflare projects or Workers already exist outside this repository.
- Whether D1/Hyperdrive/R2/KV/Queues are enabled in the account.
- Duitku merchant status, PDS v2 configuration, enabled methods, callback URL, webhook/signature requirements, settlement/refund/disbursement capabilities and sandbox access.
- Whether Neon, GroqCloud, PostHog, Resend, Sentry, or Make accounts already exist, and their current free-tier/billing state.
- Whether the email sending domain has been verified.
- Current GitHub Actions/secrets/environment settings, if any, and whether deployment is triggered automatically or manually.

Never copy secret values into this inventory or Git. Record only secret **names**, where each secret is configured, the environment it belongs to, and a redacted verification result.

## Recommended provider readiness sequence

1. **Read-only verification:** inspect Cloudflare project/deployments/bindings and Duitku merchant configuration. This requires an authorized Cloudflare/Duitku console connection or a read-only evidence export; the current connected toolset does not expose those consoles. Do not claim this step is complete until actual console evidence is available.
2. **Architecture decision:** select the authoritative database and decide the deployment boundaries: Public Pages, private Control deployment, and Core API Worker. These are not yet implemented by the current application.
3. **Core foundations:** implement canonical event/order/payment states, idempotent webhook processing, audit history, and authorization before connecting payment automation.
4. **LLM:** create/use a GroqCloud project only when the signal and recommendation interfaces are defined. The LLM proposes interpretation; deterministic rules and Core enforce business truth and approval policy.
5. **Analytics:** define first-party event names and consent/privacy policy before enabling PostHog.
6. **Email:** configure Resend only when the order/delivery lifecycle is ready; verify the sending domain and use environment-specific secrets.
7. **MCP/Make/Sentry/other providers:** add only when a documented need remains after the above steps.

## Secret handling requirements

- Never commit API keys, payment secrets, webhook secrets, access tokens, or private connection strings.
- Keep Public, Control, Core, preview, and production secrets separated by environment and least privilege.
- Do not expose provider secrets in client bundles or public Pages variables.
- Verify webhook authenticity and idempotency before marking an order paid.
- Never allow an LLM to directly change prices, spend money, send campaigns, or mutate payment/order truth without a validated command and applicable approval policy.
- Record provider, purpose, required scopes, environment, owner, rotation/revocation procedure, quota, billing alert, and fallback for each secret/integration.

## Audit limitations and gate

The founder confirms Duitku exists as an external merchant/provider but is not integrated into Ranel. The founder also confirms Neon, GroqCloud, PostHog, and Resend have not yet been set up for Ranel. Those are user-confirmed statements, not independently verified console observations.

This audit establishes what is or is not present in the checked-in application/configuration inspected. It does **not** establish the live state of Cloudflare projects, bindings, secrets, DNS, billing, Duitku credentials/callbacks, or account-level features. The available connected tools in this session can inspect and update GitHub, but do not expose Cloudflare or Duitku console APIs. Therefore no console setting, secret, project, payment configuration, or DNS record was changed.

**Gate:** Do not call the external provider stack “configured” until console checks are recorded. Do not start the Revenue Engine implementation until the founder reviews the provider inventory and approves the final architecture.

## Evidence reviewed

- `README.md`
- `package.json`
- `wrangler.jsonc`
- `.dev.vars.example`
- `docs/technology/architecture.md`
- `docs/technology/integration-strategy.md`
- `docs/technology/data-model.md`
- `docs/technology/environments-and-deployment.md`
- `docs/technology/observability-and-incidents.md`
- `docs/technology/auth-and-access-control.md`
- `docs/implementation/phase-2/evidence.md`
- `src/index.tsx`
- `src/inquiry.ts`
