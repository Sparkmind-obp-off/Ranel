# Ranel — Genspark Execution Profile

**Status:** LOCKED execution profile.

## 1. Start here
For any serious Ranel task:
1. read docs/handoffs/genspark-context-pack.md;
2. read docs/foundation/ranel-master-blueprint.md;
3. use docs/foundation/ranel-context-map.md to choose the smallest next context layer.
Do not load all repository documents.

## 2. Final three-layer architecture
Ranel has exactly three primary system layers:

### PUBLIC LAYER
Customer-facing revenue surface: website/catalog, content/SEO, product entry, and future checkout/software/member/commerce surfaces.

### CONTROL LAYER
Private founder/operator decision center: revenue visibility, orders/customers/products, demand signals, recommendations, automation/system health, and audit/activity.

### CORE LAYER
Authoritative business truth and execution: orders, payments, entitlements, revenue ledger, rules, authorization, idempotent events, provider adapters, commands, and audit history.

**AI is cross-cutting intelligence, not a fourth primary layer.**
It interprets data/signals and proposes recommendations or commands subject to policy and Core authorization.

## 3. Development rule
Use a modular architecture inside the three-layer boundary. Deployment boundaries may separate Public, Control, and Core when justified.
Do not create a fourth AI layer in the primary architecture.

## 4. Access rule
Before using software/desktop/provider access, identify actor, account, environment, permission scope, operation, expected external effect, and evidence required.
Use the minimum permission required.

## 5. Production provider rule
Duitku is a production/live target for the Ranel payment integration. Do not substitute sandbox endpoints or sandbox credentials.
However, ordinary automated tests must not create real transactions. Use fixtures/mocks unless a separately authorized live test is explicitly requested and safely bounded.

## 6. Implementation rule
When coding, inspect exact target files, preserve unrelated work, reuse current test/build scripts, keep secrets server-side, add negative/security tests for material state changes, and record evidence.
When using an external console, audit read-only first, perform only the bounded operation, and return redacted evidence.

## 7. Return format
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

## 8. Cost-control rule
Do not spend context on stable history, unrelated docs, repeated provider searches, or full-repo scans.
Load only: Master → affected layer → exact files → relevant tests/evidence.