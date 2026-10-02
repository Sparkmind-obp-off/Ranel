# Ranel — Production Readiness Standard

**Status:** LOCKED control standard.  
**Important:** This defines production readiness; it does not claim every Ranel subsystem currently meets it.

## 1. Production readiness is subsystem-specific

Ranel may have a verified public release while the future Control Center, Core, payments, AI, and automation remain not implemented or not integrated.

A subsystem is production-ready only when its required evidence gate passes.

## 2. Release gates

### Gate P0 — Source integrity
- Canonical repository and branch identified.
- Reviewable diff.
- No unintended files or secrets.
- Dependency lock is consistent.
- Commit SHA recorded.

### Gate P1 — Application quality
- Relevant lint/typecheck/tests/build pass.
- Security-sensitive paths have negative tests.
- Critical user journey verified.

### Gate P2 — Configuration
- Production target/account is unambiguous.
- Environment separation exists.
- Required secret names are present.
- No secret values appear in source/build/logs.
- Cost/billing state is understood.

### Gate P3 — Data
When persistence exists:
- Schema/migrations reviewed.
- Constraints/indexes documented.
- Backup/export path exists.
- Restore procedure has been tested.
- Retention/deletion rules exist.
- Tenant isolation tested where multi-tenant data exists.

### Gate P4 — Integration
For each external provider:
- Account eligibility verified.
- Sandbox/production mode verified.
- Authentication verified.
- Webhook/callback authenticity verified.
- Idempotency verified.
- Failure/retry behavior tested.
- Refund/cancellation/disablement path documented.
- Manual fallback documented.

### Gate P5 — Security/privacy
- Access control tested.
- Secrets handled by platform secret management.
- Input/payload limits enforced.
- Logging is privacy-minimized.
- Threat model reviewed.
- Incident response ownership established.

### Gate P6 — Operations
- Health/smoke checks defined.
- Deployment and rollback steps documented.
- Alert/incident path known.
- Backup/restore path known for stateful components.
- Change owner and evidence location defined.

### Gate P7 — Business truth
For commercial functionality:
- Price source is authoritative.
- Order/payment state is deterministic.
- Entitlement follows verified transaction state.
- Revenue ledger is reconciled.
- Refunds/cancellations are auditable.
- AI cannot override business truth.

### Gate P8 — Customer validation
Production deployment does not equal validation. A product is commercially validated only when attributable real-world evidence exists.

## 3. Current Ranel readiness matrix

| Area | Current state |
|---|---|
| Public Pages release | VERIFIED |
| Public catalog | IMPLEMENTED / READY for current scope |
| Manual inquiry handoff | VERIFIED |
| Control Center | NOT IMPLEMENTED |
| Core business truth | NOT IMPLEMENTED |
| Production database | NOT SELECTED |
| Payment integration | NOT INTEGRATED |
| Automated fulfillment | NOT IMPLEMENTED |
| AI runtime | NOT INTEGRATED |
| Analytics | NOT INTEGRATED |
| Transactional email | NOT INTEGRATED |
| Custom-domain behavior | NOT VERIFIED |
| Real demand validation | NOT VALIDATED |
| Legal/brand clearance | PENDING |

## 4. Blocking rule

A missing required gate is a release blocker for the affected subsystem. Do not use a broad production-ready label to hide subsystem gaps.

## 5. Required evidence package

Every production release should record:
- source commit;
- deployment ID/URL;
- target/environment;
- test commands/results;
- configuration verification;
- critical smoke journey;
- rollback reference;
- known limitations;
- business validation status.
