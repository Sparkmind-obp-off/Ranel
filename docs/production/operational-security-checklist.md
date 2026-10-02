# Ranel — Operational Security Checklist

**Status:** LOCKED baseline; apply before each meaningful production activation.

## Identity and access
- [ ] Unique accounts; no shared admin credentials.
- [ ] MFA enabled where supported.
- [ ] Least-privilege roles.
- [ ] Former/unused access removed.
- [ ] Recovery methods documented and protected.
- [ ] Provider account identity unambiguous before mutation.

## Secrets
- [ ] Secrets exist only in provider secret management.
- [ ] No secret values in Git, prompts, screenshots, logs, or client bundles.
- [ ] Environment separation verified.
- [ ] Rotation/revocation owner known.
- [ ] Secret names and scope documented without values.

## Application
- [ ] Server-side authorization for protected operations.
- [ ] Input validation and payload limits.
- [ ] Safe error handling.
- [ ] Rate limits for public/sensitive endpoints.
- [ ] Security headers appropriate to the deployment.
- [ ] Dependency lock and security audit reviewed.

## Data
- [ ] Data inventory and purpose defined.
- [ ] Retention/deletion behavior defined.
- [ ] Sensitive exports controlled.
- [ ] Logs minimized.
- [ ] Tenant isolation tested before multi-tenant launch.

## Payments/integrations
- [ ] Provider account eligibility verified.
- [ ] Webhook authenticity verified.
- [ ] Idempotency verified.
- [ ] Failure/retry behavior tested.
- [ ] Refund/cancellation path documented.
- [ ] Manual fallback available.

## AI
- [ ] External content treated as untrusted input.
- [ ] Prompt/code injection controls.
- [ ] Structured output validation.
- [ ] AI cannot bypass business authorization.
- [ ] Cost/rate limits known.
- [ ] Evaluation/regression set passes before release.

## Operations
- [ ] Deployment evidence recorded.
- [ ] Rollback reference known.
- [ ] Monitoring/incident path known.
- [ ] Backup/restore tested for stateful systems.
- [ ] No unexplained production configuration changes.

A failed security checkbox blocks the affected production activation until resolved or explicitly accepted by the proper decision authority.
