# Testing and Quality Assurance

## Test layers
1. Static checks: formatting, lint, typecheck.
2. Unit tests: validation, calculations, state transitions, consent.
3. Integration tests: API handlers, database constraints/migrations, provider adapters with mocks/sandbox.
4. End-to-end tests: critical visitor/operator journeys.
5. Security tests: authorization, input handling, rate limits, secrets, tenant isolation when relevant.
6. Manual acceptance: responsive layout, accessibility, error states, deployed smoke tests.

## Minimum release suite
- Public routes render with correct metadata.
- Form handles empty, malformed, oversized, and valid submissions.
- Spam/duplicate behavior is safe.
- Errors do not leak stack traces or personal information.
- Unauthorized requests cannot access internal records.
- Consent is distinct and honored.
- Migrations run from a clean database if applicable.
- No secrets or real customer data are committed.
- Core flows work in preview and production; rollback is documented.

Report actual commands, test counts/failures, deployment URL, smoke-test outcome, and known gaps. Distinguish local from production checks. Never claim a test ran unless its output was observed. Data exposure, unauthorized access, incorrect payment state, data loss, or a broken core journey blocks release.