# Ranel — Genspark Read-Only Provider Audit Handoff

**Status:** READY FOR EXTERNAL EXECUTION  
**Purpose:** Close provider-console verification gaps without changing production state.  
**Canonical repository:** `Sparkmind-obp-off/Ranel`  
**Branch:** `main`  
**Starting state:** use the current `main` HEAD when executing; do not reset or rewind the branch.  
**Founder authority:** Founder retains final decisions.  
**Execution rule:** Read-only audit. No provisioning or production mutation.

## 0. Cost-efficient context loading

Read `docs/handoffs/genspark-context-pack.md` first. It contains the compact baseline and routing rules. For this audit, then read only this handoff and `docs/technology/provider-inventory.md` unless a specific uncertainty requires another targeted document. Do not rescan the whole repository.

## 1. Objective

Audit the external provider/account state that cannot be verified from the current GitHub-only tooling, then return evidence that lets the canonical Ranel architecture move from assumptions to verified facts.

The goal is **not** to build the Revenue Engine yet. The goal is to establish:

1. What Cloudflare resources already exist for Ranel.
2. What Duitku merchant/payment capabilities are actually available.
3. Whether Neon, GroqCloud, PostHog, and Resend accounts/projects already exist.
4. Which settings are configured, missing, unknown, or blocked.
5. Whether any account/billing/plan constraints materially affect the proposed architecture.

## 2. Canonical context

Read these files before touching any console:

- `README.md`
- `docs/technology/provider-inventory.md`
- `docs/governance/decision-capability-execution-model.md`
- `docs/technology/architecture.md`
- `docs/technology/data-model.md`
- `docs/technology/integration-strategy.md`
- `docs/implementation/phase-2/evidence.md`

Important current facts:

- Public production target is `ranel.pages.dev`.
- Existing Cloudflare Pages project is intended to be exactly `ranel`.
- Phase 2 production release is already documented as verified; do not redeploy merely to repeat the check.
- `ranel.biz.id` was observed in prior Cloudflare domain metadata, but its DNS/TLS/redirect/browser behavior is not treated as verified.
- Existing production inquiry configuration must not be exposed or copied.
- Duitku is founder-confirmed as an existing provider/merchant, but is not integrated into Ranel.
- Neon, GroqCloud, PostHog, and Resend are founder-confirmed as not yet set up for Ranel.
- Current Ranel application does not contain Core, Control Center, database, payments, subscriptions, automated fulfillment, LLM, analytics SDK, or transactional email.

## 3. Cloudflare audit — read only

Inspect the authenticated account and record only non-secret metadata.

### Verify
- Authenticated account identity and whether it is unambiguous.
- Pages project `ranel`.
- Production branch and current/latest deployment metadata.
- Current deployment status and deployed commit SHA where visible.
- Domains attached to the project.
- Environment/configuration names and binding/secret **names only**.
- Whether any separate Ranel-related Workers/Pages projects already exist, especially candidates resembling `ranel-control`, `ranel-core`, `api.ranel.biz.id`, or other obvious Ranel infrastructure.
- Availability/state of D1, Hyperdrive, KV, R2, Queues, Durable Objects, Workers/API resources if visible.
- Usage/billing/plan limits that are relevant to the proposed architecture, without starting or upgrading anything.

### Do not
- Create, delete, rename, attach, detach, or redeploy resources.
- Change DNS or custom-domain routing.
- Change secrets or bindings.
- Rotate credentials.
- Enable paid plans.
- Change billing or spending limits.
- Change security settings.
- Copy any secret value into chat, Git, screenshots, or docs.

## 4. Duitku audit — read only

Inspect the existing merchant/provider console only to determine capability and readiness.

### Verify
- Merchant/account status.
- PDS/API generation available (including PDS v2 if shown).
- Sandbox vs live availability/state.
- Enabled payment methods.
- Callback/webhook configuration state and whether callback/security/signature controls are documented or configurable.
- Webhook/callback URL status as metadata only; do not replace it.
- Payment expiry/status capabilities if documented in the console.
- Refund/disbursement/settlement capabilities.
- Fee structure and any material transaction limits.
- Account eligibility or verification blockers.
- Any visible API credential state: record only that credentials exist/configured/missing; **never record the credential values**.

### Do not
- Create an application/project/merchant.
- Change callback URLs.
- Enable live payment collection.
- Send a real payment.
- Create or alter payout/settlement settings.
- Expose secrets.

## 5. Optional account-state checks

For Neon, GroqCloud, PostHog, and Resend, determine only whether a relevant account/project exists and whether there is a material configuration/billing constraint.

Record:
- account/project existence;
- basic plan/billing state if visible;
- region/domain/project identifiers when non-sensitive;
- whether the service is unused/not configured;
- any clear setup prerequisite.

Do not create projects, start paid plans, add cards, create API keys, verify new domains, or activate integrations.

## 6. Evidence requirements

Return enough evidence for each conclusion:

- concise status table;
- exact provider/project names;
- relevant timestamps;
- deployment/resource identifiers where non-secret;
- redacted screenshots or console evidence where useful;
- distinguish:
  - VERIFIED from provider console,
  - VERIFIED from repository/release evidence,
  - FOUNDER-CONFIRMED,
  - NOT FOUND,
  - BLOCKED,
  - UNKNOWN.

Never turn an inaccessible console into an assumption.

## 7. Repository update

After the read-only audit, update only the provider-audit documentation needed to preserve the evidence.

Primary file:
`docs/technology/provider-inventory.md`

Add/update a dated **External Console Verification** section. Preserve earlier history and clearly separate newly verified facts from founder-confirmed statements.

Also update:
`docs/technology/genspark-execution-protocol.md`
only when a reusable protocol clarification is needed.

Do not modify application code, package manifests, Wrangler deployment configuration, production secrets, DNS configuration, payment integration code, or architecture decisions during this audit.

Commit documentation changes to `main` with a focused message such as:
`docs: record external provider audit`

## 8. Acceptance criteria

The task is PASS when:

- Cloudflare state is evidenced or explicitly marked blocked.
- Duitku state is evidenced or explicitly marked blocked.
- Optional provider account states are recorded where observable.
- No production or billing mutation occurred.
- No secret values were disclosed.
- Repository documentation distinguishes verified evidence from assumptions.
- Commit SHA is returned if documentation was updated.

PARTIAL when only some providers were accessible.

BLOCKED when required console access cannot be established safely.

FAIL when an unintended mutation, secret exposure, or unsupported claim occurs.

## 9. Return format

Return exactly these sections:

### STATUS
PASS / PARTIAL / BLOCKED / FAIL

### ACCESS
Which providers were accessible, and which were not.

### VERIFIED
Concise provider-by-provider findings.

### CHANGES
Files changed and what was recorded.

### EVIDENCE
Screenshots/URLs/IDs/timestamps that prove the findings, excluding secrets.

### SAFETY
Confirm that no secret value, billing change, DNS change, live payment, or production mutation was performed.

### COMMIT
Commit SHA and URL, or state that no repository change was made.

### REMAINING
Only concrete unresolved gaps.

### NEXT ACTION
The smallest next technical action enabled by the evidence. Do not start a new implementation phase automatically.
