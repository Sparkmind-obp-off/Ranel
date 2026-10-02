# Ranel — Genspark Final Execution Launcher

**Status:** LOCKED launch document
**Purpose:** Start serious Ranel execution with minimum context and explicit access boundaries.

## 1. Canonical architecture
Ranel has exactly three primary system layers:

**PUBLIC → CONTROL → CORE**

- **PUBLIC:** customer-facing revenue surface.
- **CONTROL:** private founder/operator decision center.
- **CORE:** authoritative business truth and execution.

**AI is cross-cutting intelligence, not a fourth primary layer.**

## 2. Access model
Before execution, establish:
- software/account;
- authenticated identity;
- environment;
- permission level;
- target resource;
- operation scope;
- external side effect;
- evidence required.
Use the minimum permission needed.
Reference: docs/governance/access-and-permission-model.md

## 3. Production provider rule
Duitku target is **PRODUCTION/LIVE**.
Do not substitute sandbox credentials or endpoints.
Production credentials may be consumed through secure runtime/secret handling when the implementation requires them. They must never appear in prompts, Git, logs, screenshots, browser bundles, or reports.
Reference: docs/technology/duitku-production-integration-contract.md

## 4. Important test distinction
Production-targeted integration does not mean every test should create live money movement.
Use mocks/fixtures for CI and deterministic tests; safe non-transactional live checks only when explicitly scoped; real payment/invoice/refund/customer transactions only with explicit live-action authorization.
Never fake a successful payment to make a test pass.

## 5. Context loading
Read first:
1. docs/handoffs/genspark-context-pack.md
2. docs/foundation/ranel-master-blueprint.md
3. docs/handoffs/genspark-execution-profile.md

Then read only the affected layer and exact implementation files.

### AI task
Add:
- docs/foundation/ranel-ai-operating-model.md
- docs/foundation/ranel-ai-production-grade-checklist.md

### Payment task
Add:
- docs/technology/duitku-production-integration-contract.md
- docs/technology/api-and-event-contract.md

### Access/permission task
Add:
- docs/governance/access-and-permission-model.md

## 6. Execution sequence
Understand → Inspect → Plan → Implement → Verify → Review → Commit → Deploy only when authorized by policy → Smoke-test → Evidence

## 7. Stop conditions
Stop the affected task if:
- target account is ambiguous;
- credentials are exposed;
- unexpected paid cost appears;
- production DNS is implicated without scope;
- destructive data migration lacks recovery;
- live payment action is requested without explicit authorization;
- security/authorization test fails;
- required provider capability is unavailable or materially different from the documented contract.

## 8. Return format
STATUS
ACCESS
COMPLETED
VERIFIED
NOT VERIFIED
CHANGES
EVIDENCE
SAFETY
COMMIT
NEXT ACTION

Keep the report factual and compact.

## 9. Final rule
**One repo. Three primary layers. One canonical source of truth. Minimum required context.**
Do not reopen locked architecture without new evidence showing a real conflict.