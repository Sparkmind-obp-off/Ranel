# Ranel — Duitku Read-Only Verification & Core Contract Handoff

**Status:** READY FOR EXECUTION  
**Repository:** `Sparkmind-obp-off/Ranel`  
**Branch:** `main`  
**Scope:** Read-only provider verification plus documentation-only deterministic contract design.  
**Not authorized:** Application implementation, payment initiation, live financial actions, secret changes, or deployment.

## 1. Mission

Close the specific gap identified by the latest PUBLIC release: determine what the existing Duitku merchant is actually enabled to use, then pin a deterministic proposed contract for Core authorization, orders, payment callbacks, idempotency, and recovery using verified provider evidence.

This is not a payment integration phase. Do not write application/runtime code.

## 2. Load context efficiently

1. Read `docs/handoffs/genspark-context-pack.md`.
2. Read:
   - `docs/foundation/ranel-master-blueprint.md`
   - `docs/foundation/ranel-revenue-engine.md`
   - `docs/technology/duitku-production-integration-contract.md`
   - `docs/technology/api-and-event-contract.md`
   - `docs/technology/auth-and-access-control.md`
   - `docs/technology/data-model.md`
   - `docs/technology/provider-inventory.md`
   - `docs/technology/architecture-decisions.md`
   - `docs/production/release-runbook.md`
3. Inspect current `main` HEAD and only the relevant existing files. Preserve history and unrelated work. Do not rescan the whole repository.

Canonical architecture remains **PUBLIC → CONTROL → CORE**, with AI cross-cutting, business model **KITS → SYSTEMS → SUPPLY**, and cycle **DEMAND → OPPORTUNITY → PRODUCT → DISTRIBUTION → TRANSACTION → FULFILLMENT → OUTCOME → LEARNING**. Do not reopen or rename these.

## 3. Read-only Duitku merchant verification

Use only the official authenticated merchant/provider console and official documentation available to the authorized operator.

Record, where visible:
- merchant/account identity in a non-secret form and account status;
- exact API product/family and version enabled for this merchant (do not infer POP/PDS/SNAP from generic docs);
- production/live capability and status;
- configured payment methods and relevant limits/expiry behavior;
- credential presence/state only (present/missing/unknown), never values, screenshots of values, prefixes, or hashes;
- callback/webhook configuration state and configured URL as metadata only, redacting sensitive query strings;
- official documentation URL/version/date for request signature and callback signature separately;
- callback fields, timestamp/freshness rules, IP/source controls where documented, acknowledgement semantics, retry behavior, status-query/reconciliation capability;
- fees, refund/cancellation/settlement capabilities and material account eligibility blockers, if visible.

For every finding, label it exactly one of:
- `VERIFIED_PROVIDER_CONSOLE`
- `VERIFIED_OFFICIAL_DOCUMENTATION`
- `FOUNDER_CONFIRMED`
- `NOT_FOUND`
- `BLOCKED`
- `UNKNOWN`

Separate account-console evidence from public documentation. If the console is inaccessible or scope is ambiguous, stop that check and mark it BLOCKED/UNKNOWN. Do not guess or use a different merchant/account.

### Prohibited actions

- Do not create an invoice or payment request, even if an amount is small.
- Do not accept/collect funds, issue refunds, initiate disbursements/payouts, change settlement, or trigger a customer transaction.
- Do not switch the target to sandbox. Production/live remains the intended target, but live actions are not authorized.
- Do not create/rotate/reveal API keys, change callbacks, change payment methods, change account settings, or alter billing.
- Do not place credential values in chat, terminal logs, screenshots, GitHub, or documentation.
- Do not change Cloudflare, DNS, secrets, production app, or deployment.

## 4. Pin the deterministic Core contract — documentation only

Using verified provider evidence where available, write a proposal/contract that is explicit enough to implement later. Anything not backed by evidence must remain `PENDING`; do not fill gaps with assumptions.

### 4.1 Actors and authorization

Define actors and permissions for at least:
- anonymous visitor;
- authenticated Ranel operator;
- future tenant/business owner;
- future staff;
- provider callback service.

For each privileged command, specify actor, permission, target scope, preconditions, audit event, and denial behavior. Every protected read/write must authorize server-side. Public HTTP method/header hardening is not identity or Core authorization. Provider callbacks authenticate as a provider integration, not as a human operator. AI can propose commands but cannot grant itself authority or set financial truth.

Do not choose or implement an authentication vendor without evidence and a separate implementation decision.

### 4.2 Order and payment state

Specify canonical entities and relationships without prematurely choosing a production database:
- order;
- payment attempt;
- provider event/callback receipt;
- entitlement/delivery instruction;
- audit record;
- optional ledger entry only where a justified accounting contract exists.

Define integer minor-unit money representation and currency explicitly; never use floating-point for money. Define order IDs, internal correlation IDs, provider references, uniqueness constraints, and which system owns each identifier.

Provide an allowed transition table. At minimum consider:
- order: `draft`, `pending_payment`, `paid`, `cancelled`, `expired`, `refunded`, `fulfillment_pending`, `fulfilled`, `fulfillment_failed` as distinct concepts where appropriate;
- payment attempt: `created`, `pending`, `succeeded`, `failed`, `expired`, `cancelled`, `refund_pending`, `refunded`, `unknown/reconciliation_required`.

Do not assume every listed state belongs in one enum. Separate order, payment, and fulfillment state machines and explain the mapping. No arbitrary transitions. Define handling for late success after expiry/cancellation, partial/duplicate callbacks, mismatched amount/currency/order reference, unknown provider status, and refund events.

### 4.3 Callback verification and idempotency

Pin request signing and callback signing as separate contracts. Specify only what verified documentation supports:
- exact signed fields and byte/string concatenation order;
- character encoding, casing, timestamp units and freshness window;
- HMAC/hash algorithm and key selection;
- constant-time signature comparison;
- payload schema and amount/currency/order correlation;
- event deduplication key and uniqueness boundary;
- replay handling;
- transaction/atomicity requirement for event receipt + state transition + audit;
- acknowledgement response and retry policy;
- safe handling of invalid signature, malformed body, stale timestamp, unknown status, and temporary internal failure.

If the enabled API family or signature vector cannot be verified, do not invent a signing formula. Record the missing evidence and the exact official documentation or provider answer needed. Do not claim an IP allowlist unless authoritative evidence identifies the relevant addresses and update policy.

Define deterministic duplicate/replay behavior: repeated identical event must not double-transition state, double-credit revenue, or grant duplicate entitlement. Conflicting events must be retained for reconciliation, not silently overwritten.

### 4.4 Reconciliation, recovery, and disablement

Specify:
- how an ambiguous payment is marked unresolved;
- whether a safe read-only status query exists and under what constraints;
- manual reconciliation steps and evidence;
- retries and dead-letter/manual-review path;
- disablement of new payment initiation without deleting historical records;
- recovery/restore assumptions and which steps remain manual.

Do not invent monitoring, backups, a database, or an implemented recovery path. Label these as contract requirements, implementation tasks, or unknown capabilities.

### 4.5 Deterministic tests to require later

Add a future acceptance matrix (documentation only) for:
- valid/invalid request signature;
- valid/invalid callback signature;
- stale/replayed callback;
- duplicate callback;
- same event ID with conflicting payload;
- unknown order/provider reference;
- amount/currency mismatch;
- out-of-order callback;
- late success after expiry/cancellation;
- concurrent duplicate processing;
- unauthorized operator command;
- cross-tenant read/write denial;
- provider timeout and reconciliation;
- fulfillment never starting before verified entitlement;
- AI/UI/return URL cannot mark paid.

Tests must use synthetic fixtures and known-answer vectors from the verified API family. No real transaction is needed or authorized.

## 5. Documentation changes allowed

Update only what is necessary:
1. `docs/technology/duitku-production-integration-contract.md` — keep production/live target, add dated verification results and explicitly unresolved items.
2. `docs/technology/api-and-event-contract.md` and/or a new focused contract document under `docs/technology/` — document the deterministic state/authorization/callback proposal and acceptance matrix.
3. `docs/technology/provider-inventory.md` — record only relevant verified Duitku evidence.
4. `docs/README.md` — index a new document if one is created.
5. `docs/governance/decision-log.md` — add a decision only if actual evidence changes a decision; do not manufacture a decision.

Do not modify app code, package manifests, lockfiles, Wrangler configuration, production secrets, DNS, live merchant settings, or any unrelated documentation. Preserve prior records rather than silently rewriting historical evidence.

## 6. Evidence and acceptance

Record timestamps/time zone, source type, official URLs, visible non-secret identifiers, and the exact verification performed. Do not include personal data or secrets.

Status:
- **PASS:** exact API family/account capability evidenced; deterministic contract is complete wherever provider evidence exists; gaps are explicitly marked; no mutation occurred.
- **PARTIAL:** useful evidence collected, but merchant/API/signature/callback facts remain blocked or unknown.
- **BLOCKED:** official console access cannot be safely established.
- **FAIL:** unintended mutation, secret exposure, invented evidence, or unsupported production-ready claim.

Never label Duitku `INTEGRATED` or payment production-ready from console/document review alone. The app currently has no payment integration.

## 7. Commit and final report

If documentation changes are justified, commit to `main` with a focused message such as `docs: pin Duitku and Core payment contract`. Do not reset/force-push. If concurrent changes moved `main`, fast-forward/rebase safely and preserve them.

Return exactly:

### STATUS
PASS / PARTIAL / BLOCKED / FAIL

### ACCESS
Which official console/docs were accessible and the access limits.

### VERIFIED
Provider-console facts separately from official-documentation facts; identify every unknown.

### CONTRACT
Files and state/authorization/signature/idempotency/recovery rules documented; list any decisions intentionally left pending.

### CHANGES
Files changed and why.

### EVIDENCE
Source URLs, timestamps, non-secret IDs, and test/inspection evidence.

### SAFETY
Confirm no invoice/payment/refund/payout, no secret disclosure/change, no callback/configuration/DNS/deployment mutation.

### COMMIT
Commit SHA and URL, or explain why no commit was warranted.

### REMAINING
Concrete evidence gaps only.

### NEXT ACTION
Smallest next action enabled by the findings. Do not implement payment code or start another phase automatically.
