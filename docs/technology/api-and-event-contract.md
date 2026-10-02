# Ranel — API & Event Contract

**Status:** LOCKED conceptual contract; implementation follows when Core/Control is activated.

## 1. Principle

API and event contracts are part of the business boundary. UI, automation, and AI clients must not invent business truth.

## 2. API rules

- Version stable external APIs.
- Validate all input server-side.
- Apply payload limits.
- Return stable machine-readable error codes.
- Do not expose stack traces, SQL errors, provider credentials, or internal topology.
- Use idempotency keys for retryable commands.
- Use pagination and bounded filters.
- Authorize every protected operation.
- Audit material state changes.

## 3. Command vs query

### Query
Read-only view of authoritative Core state.

### Command
Explicit request to change state.

Every command defines:
- actor;
- permission;
- target;
- preconditions;
- idempotency behavior;
- expected state transition;
- audit event;
- failure behavior.

## 4. Event principles

Events represent facts that occurred.

Examples:
- order.created
- payment.initiated
- payment.confirmed
- payment.failed
- entitlement.granted
- delivery.completed
- refund.completed

Events include:
- event ID;
- event type/version;
- occurred-at;
- source;
- entity/aggregate ID;
- correlation ID;
- minimal safe metadata.

Never put secrets or unnecessary personal data into event payloads.

## 5. State machine rule

Do not allow arbitrary status transitions.

Example:
created → pending → paid → fulfilled

with explicit exception or terminal states for failed, cancelled, and refunded.

The valid transition table must exist in domain code/tests before production activation.

## 6. Webhook handling

1. Authenticate/signature-check.
2. Validate timestamp/freshness where supported.
3. Validate payload schema.
4. Deduplicate by provider/event ID.
5. Map to deterministic internal state.
6. Persist/audit.
7. Acknowledge safely.
8. Retry only idempotent processing.

A browser redirect is not payment proof.

## 7. AI boundary

AI may request a recommendation or propose a command.

AI does not directly write:
- paid state;
- revenue ledger;
- entitlement;
- refund status;
- pricing;
- payout state.

Core validates and authorizes any resulting command.

## 8. Contract testing

Before production:
- schema tests;
- authorization tests;
- negative tests;
- idempotency tests;
- replay tests;
- provider fixture/sandbox tests;
- migration compatibility tests where applicable.
