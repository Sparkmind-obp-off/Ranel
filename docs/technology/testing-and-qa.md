# Testing and Quality Assurance

## Current Phase 1B release suite — 2026-10-02

The preserved built-worker suite remains **24 tests**. Browser suite is now **24 tests**, adding all-topic no-follow redirect checks and explicit configured/unconfigured expectations. `npm ci`, lint, typecheck, unit tests, build, local unconfigured E2E and configured production E2E all ran successfully; `npm audit` reported zero vulnerabilities. Production https://ranel.pages.dev and its immutable deployment passed route/asset/404/redirect smoke checks; production browser checks passed at 320/390/1440 px with no detected axe A/AA violations.

Use `QA_BASE_URL`, `QA_CONTACT_STATE=configured` and privately supplied `QA_EXPECT_WHATSAPP_NUMBER` for production. Do not follow WhatsApp redirects or send real messages during release QA. UI readiness and exact destination are verified, while account registration/message receipt remain untested. Cloudflare blocks a default Python user-agent with error 1010; browser/curl/Playwright checks succeed. Full evidence and commands: [Phase 1B report](../implementation/phase-1b-release-deployment/evidence.md), [README browser QA](../../README.md#browser-qa). No app/dependency/test removal; no Phase 2 work.

## Historical Phase 1 suite — 2026-10-02

`npm run lint`, `npm run typecheck`, `npm test` (build + 24 built-worker tests), and `npm run test:e2e` (21 Playwright/axe tests against an already-running Pages preview) are the current scripts. `npm run build` and `npm audit` also completed successfully. All final runs pass; evidence, initial failures and fixes, and unverified production checks are recorded in [Phase 1 evidence](../implementation/phase-1/evidence.md). [README](../../README.md#browser-qa) documents Chromium dependency installation and preview startup.

Browser viewports: 320×740, 390×664 Chromium mobile emulation, 1440×1000. The site was checked for overflow, routes/assets, links and anchors, metadata, keyboard skip/focus, FAQ, 404, missing-contact behavior, console errors, and axe WCAG A/AA violations. Screenshots reviewed; no remaining clipping/overlap observed. No real operator sessions or Safari/Firefox tests conducted.

There is **no form/API/persistence** in Phase 1, so malformed-form, spam/duplicate storage, auth/tenant/payment, and migration checks below are not applicable to this release. Tests instead cover missing/invalid contact configuration, fixed-host redirect, allowlisted topics, malicious/unknown query parameters, and honest unsent draft copy. Configured WhatsApp behavior is verified only using synthetic fixtures; live recipient ownership, sending, and receipt remain blocked/unverified.

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