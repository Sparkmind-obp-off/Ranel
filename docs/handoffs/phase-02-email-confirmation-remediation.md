# Ranel — Phase 02 Official Email Confirmation Remediation

Date: 2026-10-03
Status: **CLOSED FOR REQUIRED pages.dev VERIFICATION/REDEPLOY — PASS; CUSTOM-DOMAIN EMAIL ISSUE OPEN; OVERALL PHASE 02 PASS WITH ISSUES**

## Founder decision

The founder explicitly confirmed this as the official Ranel email for public website use:

**farasmuhadzib@gmail.com**

Spelling as confirmed: F-A-R-A-S, M-U-H-A-D-Z-I-B.

Do not substitute another address or change the spelling.

## Source changes already committed to main

Latest code/test commits:
- `d5b0005d30f6268ec3df8d081740df1b6249b4fa` — define official email and publish it in Legal identity/privacy/complaints content.
- `6440a17eb93a231a66bfe2ea1380b4bdb18f630a` — add email to public footer and contact page, add working `mailto:` fallback when WhatsApp is not configured.
- `c2ebebb8768f8674bf2b0c9d38251a421b02deb1` — update worker tests.
- `2b58261ef3af8764688c46f7e024553713fe9dcc` — update browser tests and mailto-link handling.

At handoff these source changes were **committed but not yet test/build/live-deployment verified**. The closure below records subsequent actual verification; this sentence preserves the historical input state. The founder also authorized the AHU reference already used by the founder-controlled SparkMind legal source: `AHU-066746.AH.01.30.Tahun 2025`, registration date 1 December 2025. The current shared Legal identity card source includes this reference. Do not claim an independent live AHU lookup.

## Required execution

1. Inspect current `main` and these changes.
2. Run lint, typecheck, build.
3. Run the complete PUBLIC worker test suite.
4. Run the complete browser/Axe suite at the existing viewports.
5. Run the preserved Core/POP regression suite to prove Core remains unchanged.
6. Check all legal routes render an official email `mailto:` link and the AHU registration reference/date in the shared entity card.
7. Check `/contact` when `INQUIRY_WHATSAPP_NUMBER` is absent:
   - clearly states email is available and WhatsApp is not configured;
   - has a working `mailto:farasmuhadzib@gmail.com` link;
   - has no fake form, false success, or WhatsApp redirect.
8. Check `/contact` with the existing test fixture for WhatsApp:
   - WhatsApp flow remains intact;
   - email is also visible.
9. Confirm privacy/complaints wording no longer says no official email exists.
10. Run secret/privacy scan; do not print sensitive values.
11. Deploy only the current PUBLIC app to the **existing** Cloudflare Pages project `ranel` via the established authorized execution path. Do not change project, billing, DNS, secrets, Core/Control, payment settings, or provider credentials.
12. Smoke-test the new immutable deployment and `https://ranel.pages.dev`; test `https://ranel.biz.id` read-only if reachable, without DNS changes. Do not claim a custom-domain check if it cannot be verified.
13. Update `docs/implementation/phase-02-commerce/evidence.md`, `docs/governance/phase-02-readiness-plan.md`, and README release metadata with actual test/deployment evidence and exact SHAs.

## Scope constraints

Do not:
- activate Duitku;
- create invoice/order/payment/refund;
- build checkout or promo redemption;
- add production credentials;
- alter DNS/Cloudflare billing;
- expose private product bundles;
- change pricing;
- introduce public response-time promises;
- claim payment is live.

## Acceptance criteria

- tests/build are actually run and pass;
- official email appears in public contact/footer/legal pages;
- AHU reference appears in the legal identity card and ownership page without implying independent live AHU verification;
- missing WhatsApp config does not imply there is no contact route;
- no broken links/accessibility regressions;
- production deployment is independently smoke-tested;
- evidence distinguishes current source commit from deployed commit.

## Final report

Return:
- STATUS: PASS / PASS WITH ISSUES / BLOCKED;
- test results;
- deployed commit and deployment ID;
- mutable and immutable URL;
- routes checked;
- custom-domain result, if verified;
- confirmation that payment remains disabled;
- remaining material gaps.

## Verified closure — 2026-10-03

Required immutable/mutable pages.dev release gate **PASS**. Actual source `7b8a1f17ab97e6f5818ba4ff5e995361c3707b7e`; deployment `b0be6036-2a9b-4c51-a880-69dff59bc109`, created `2026-10-03T07:59:53.324803Z`, https://b0be6036.ranel.pages.dev and https://ranel.pages.dev. Lint/typecheck/build, 44 PUBLIC tests, 61 unchanged Core/POP tests, 36 local and 36 production browser/Axe tests PASS. 21 HTTP checks on each required origin PASS. Email/AHU/date render, missing-WhatsApp email fallback and configured inquiry continuity verified without messages or mailbox login/send/receive.

Read-only `ranel.biz.id` statuses/AHU/date pass, but Cloudflare email obfuscation and injected scripts conflict with CSP: formal email/link usability is **ISSUE OPEN**, not a verified equal release. No DNS/zone/CSP/security weakening performed. See [consolidated evidence](../implementation/phase-02-commerce/evidence.md) for scans, failed verification-tool attempts/recovery, metadata and limitations.

Overall Phase02 remains **PASS WITH ISSUES** for regulatory/tax/fulfillment and custom-domain email gates. Explicit user authorization allowed subsequent [Phase03 specification](../technology/commerce-model.md) after required pages.dev gate PASS; no live-commerce/Phase04 activation or new founder material approval.
