# Ranel — Production Release Runbook

**Status:** LOCKED operational runbook.

## 1. Before release

Confirm:
- exact repository/branch/commit;
- scope and changed files;
- applicable production-readiness gates;
- no unexpected cost or external commitment;
- deployment target/account;
- production secret names/configuration;
- rollback reference.

For docs-only changes, skip application deployment.

## 2. Quality gate

Use the smallest relevant checks first:
- formatting/lint;
- typecheck;
- unit/integration tests;
- build;
- targeted browser/API/security tests.

For a full application release, run the repository release suite and record exact counts.

## 3. Pre-deploy inspection

Review:
- Git diff;
- package/lock changes;
- generated artifacts;
- environment references;
- secret handling;
- domain/redirect changes;
- database migrations;
- provider configuration.

Stop on:
- secret exposure;
- unexplained external resource;
- failed critical test;
- ambiguous target/account;
- unknown material cost;
- destructive migration without tested recovery.

## 4. Deploy

Deploy only to the approved target.

Record:
- deployment command;
- target;
- immutable URL/ID where available;
- deployed SHA;
- environment;
- timestamp;
- reported platform status.

Never rely on a CLI completion message alone.

## 5. Post-deploy verification

Check:
- canonical hostname;
- immutable deployment where available;
- critical routes;
- static assets;
- error/404 behavior;
- authentication boundary if applicable;
- critical API journeys;
- payment callback/state if applicable;
- logging/health signal.

Do not follow external payment or messaging redirects during automated verification when side effects are possible.

## 6. Rollback

Preferred order:
1. Revert to the last known-good deployment without rewriting Git history.
2. Restore a known-good application revision.
3. For stateful systems, follow the compatible migration/restore plan.
4. Verify the critical journey after rollback.
5. Record incident/change evidence.

Application rollback does not automatically roll back database state or external provider configuration.

## 7. Release record

Store in the relevant phase/release evidence:
- STATUS;
- changed scope;
- tests;
- deployment ID/URL;
- commit SHA;
- configuration checks;
- smoke results;
- rollback reference;
- remaining limitations.

## 8. Evidence vocabulary

BUILT = code exists.  
TESTED = a named check actually ran.  
DEPLOYED = successful deployment plus smoke verification.  
INTEGRATED = real provider interaction/callback/etc. was verified.  
VALIDATED = attributable customer/business evidence exists.

## 9. Final launcher execution — 2026-10-02

### Status and bounded scope
**PASS for scoped canonical alignment/PUBLIC hardening; overall engine readiness remains PARTIAL.** Reviewed PUBLIC redeploy and live smoke/browser checks verified. CONTROL/CORE/providers/AI remain gated, not production-ready merely because PUBLIC is live. This does not activate CONTROL, CORE, Duitku, AI, analytics or fulfillment, and is not a full-engine production-ready claim. Starting repo HEAD `9d3aa9780033286cc0fd46a733ca98b54dd1e56c` after a clean fast-forward from `817c105`; incoming changes were documentation only.

### Access actually used
| Access class | Actor/environment/target | Operation and limit |
|---|---|---|
| Repository L1/L2 | Authenticated Sparkmind GitHub connection; canonical Ranel/main | Targeted reads/patches/tests/commit/push; no whole-repo scan/reset/force-push |
| Software/browser | Sandbox Node/npm/PM2/Chromium; local Pages preview | Deterministic fixture tests, no messages or payment requests |
| CLI L3 | Existing Hono/Vite/Wrangler stack | Build/test existing project, no new framework/resources |
| Provider read L4 | One authenticated Cloudflare account; existing `ranel` | Project/main/hostname/deployment/domains and secret binding **name/type** only; not a console/MFA/billing audit |
| Deployment L5 scoped AUTO | Existing user-owned CF BYOK `ranel` / `ranel.pages.dev` | Reviewed routine redeploy only, previous successful deployment is rollback reference; no DNS/plans/secret mutations |
| Production secrets | Existing runtime inquiry binding; CF deploy credential secure mechanism | Values not dumped/copied/rotated. No Duitku credential requested or consumed |
| Duitku/other consoles | NOT USED | No merchant-console claim, live activation, invoice, refund, payout, provider/customer money movement |

Technical access is not L6 authorization. No new paid resource/plan or material public commercial commitment. Token least-privilege/MFA/billing-console review is **not verified**, even though deployed target/account authentication is verified.

### Concrete findings and changes
- Master and Revenue Engine used conflicting cycle strings. Aligned to the founder's explicit eight stages and existing ADR-010; PUBLIC → CONTROL → CORE and Kits → Systems → Supply unchanged. AI terminology consistently cross-cutting.
- Existing dynamic pages had CSP/nosniff but no HSTS/X-Frame fallback; native Pages assets did not mirror CSP/permissions/HSTS. Added host-only `max-age=31536000` (no `includeSubDomains`/preload) and `DENY` on Worker pages/redirects/errors and `/static/*` via `public/_headers`. No domain/DNS configuration change.
- PUBLIC input/protocol contract: request URL at most **2048 characters including origin**, one optional decoded `offer` at most **64 characters**; duplicate/oversized topics **400**, oversized URL **414**, non-GET/HEAD on existing PUBLIC routes **405** with Allow. Short unknown topics retain safe fallback and all canonical/legacy topics retain exact intent. No body parsed/stored.
- These HTTP/input rules are **not visitor identity admission, role authorization, or Core business rules**. No private/financial endpoint added. CONTROL/CORE authorization remains an implementation gap, not simulated through PUBLIC checks.
- Replaced unresolvable Duitku citation markers with [official POP documentation](https://docs.duitku.com/pop/en/). Read-only public documentation confirms production URL and HMAC-SHA256 wording; no merchant API called. Exact enabled family/version, canonical signing vectors, callback/IP rules and account eligibility remain unverified. No sandbox substitution.

### Verification observed at local checkpoint
- `npm ci`: success, 164 locked packages; package/lock/Vite/Wrangler configs unchanged.
- `npm run lint`, `npm run typecheck`: exit 0.
- `npm test`: **33 passed / 0 failed / 0 skipped**, including URL/topic boundaries, encoded duplicate topics, method/HEAD contract, generic 500 secrecy, ignored UI financial assertions and absence of financial endpoints. All synthetic/deterministic, no fake provider payment success.
- Build via `npm test` and standalone `npm run build` from the committed source: **67.37 kB** Worker, 53 transformed modules; native header config copied.
- `npm audit`: **0 vulnerabilities**.
- Local `npm run test:e2e`: **30 passed / 0 failed**, reported 1.2 min, 320/390/1440 px; pages/assets headers, safe negative public requests, full catalog/contact/legacy journey, metadata/keyboard/axe regressions. No external messaging redirect followed.
- Baseline Cloudflare read-only metadata: deployment `68793aeb-029c-40a1-b0e2-8b3ca55c224b`, SHA `a4915bad908268acc6df1efce4f0e2e2707e0c6a`, successful production/main; existing domains `ranel.pages.dev`, `ranel.biz.id`; inquiry encrypted binding present. This is the immediate rollback reference, **not a tested rollback**.
- Initial curl retries during PM2 startup ended at readiness; no application/security test failure in this execution.
- Scoped touched-file/build secret review: **18 files, 0 matches** against configured credentials; changed-document local links valid; no whole-repository scan. Dependencies, deployment config, catalog data and visual assets unchanged. Canonical eight-stage strings match in Master/Revenue Engine/ADR; Duitku contract retains production/live, not-implemented and live-action-not-authorized status with traceable official references.
- Production configured `npm run test:e2e`: **30 passed / 0 failed**, **54.1 s**, same mobile/desktop viewports and axe A/AA checks. Header parity proven on actual Pages assets and Worker routes, native types/content preserved, canonical/legacy manual inquiry intent unchanged; no messaging redirect followed.

### Verified PUBLIC release
- Target: existing `ranel`, `main`, **https://ranel.pages.dev**; CF BYOK under standing routine-deploy AUTO authorization, no new resource/plan/provider.
- Source commit, pushed before deploy: **`c90c1994839e1bee4fa676ed25ea848da66731ad`**.
- Actual command: `npx wrangler pages deploy dist --project-name ranel --branch main --commit-hash "$(git rev-parse HEAD)"`.
- Deployment ID: **`a071fcab-4df7-466d-be7e-68d56274f780`**.
- Immutable URL: **https://a071fcab.ranel.pages.dev**.
- Cloudflare creation: **`2026-10-02T10:25:38.112262Z`**, CLI completion `10:25:42Z`; authenticated API verified exact source SHA, production/main, success stage, unchanged domain list and encrypted inquiry binding type. Secret values not dumped; no secret update/rotation invoked.
- Both origins: `/`, `/barber`, `/contact`, `/privacy`, CSS/SVG **200**, missing route **404**, all checked headers including native assets match; built CSS/SVG bytes match. Negative PUBLIC checks: write-method **405**/Allow, duplicate-topic **400**, long URL **414**, no Location on rejection. Correct canonical/legacy/general/unknown inquiry **303** covered by live E2E with approved destination compared privately and redirects not followed.
- No provider financial endpoint called, no Control/Core application created or falsely certified. No DNS/custom-domain, credentials, prices, paid plan, public commercial promise or campaign mutation. Metadata `cloudflare_project_name=ranel` retained.
- Closing documentation-only commit updates current provenance without another deploy/full QA. Its final HEAD/remote equality and clean tree are returned in the execution report; deployed source SHA above remains authoritative. Immediate rollback reference is the previously verified Phase 2 deployment listed above; rollback **not executed/tested**.

### Remaining subsystem gates (not silently built)
| Subsystem/control | State and smallest required evidence |
|---|---|
| PUBLIC website/catalog/inquiry | DEPLOYED/VERIFIED for this scoped release; not demand/revenue validation or full engine readiness |
| CONTROL | NOT IMPLEMENTED; needs a bounded private workflow and tested identity/role/record contract before activation |
| CORE | NOT IMPLEMENTED; needs approved persistence/authorization, deterministic order/ledger/entitlement/command/event rules and recovery contract |
| Duitku production/live | TARGET LOCKED, NOT INTEGRATED; merchant/account/API family/callback/signature/limits evidence required; real money actions need explicit live-action authorization |
| AI runtime | NOT INTEGRATED; evaluation/cost/policy gates required; cannot establish paid/ledger/price/entitlement/refund/payout/authorization truth |
| Edge rate policy / account MFA / recovery / alert owner | NOT VERIFIED through provider console; no in-memory fake limiter or monitoring-success claim. PUBLIC remains read-only and invokes no privileged provider API; no new sensitive submission endpoint activated |
| Stateful data / DR / fulfillment | NOT IMPLEMENTED; persistence selection/restore/retention/reconciliation required when an approved workflow actually needs it |
| Custom domain / actual demand / commercial results | Domain metadata preserved, live domain TLS/redirect and real demand/outcomes not validated by this hardening |

A failed critical security test would stop production release. Unimplemented subsystems remain gated; this release only improves the already-authorized PUBLIC scope. Next action is one explicitly bounded Core/payment contract and read-only provider verification—not automatic full SaaS/payment/AI rollout.
