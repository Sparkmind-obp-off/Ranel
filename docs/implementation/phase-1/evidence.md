# Phase 1 — Execution evidence

Recorded: **2026-10-02 (UTC)**. This records actual implementation/verification, not a production launch or market validation.

## 1. Status
**PARTIAL.** Public site implemented and locally verified. **Deployment: BLOCKED.** Real inquiry delivery is blocked by missing founder-approved business contact. The requested existing Pages project cannot be identified in the connected account. No Phase 2 work undertaken.

## 2. Repository baseline
- Repository: https://github.com/Sparkmind-obp-off/Ranel; remote `origin` verified; branch `main`, initially clean and aligned with `origin/main` after fetch.
- Baseline SHA: `bef5456` (`docs: index implementation roadmap and Phase 1 prompt`).
- Baseline files: README + strategy/technical documentation only. **No existing framework, package manager, scripts, app entry points, assets, or Cloudflare config.** There was no application to replace or adapter to preserve.
- Read README/docs index, architecture/ADRs, frontend, UI/UX, deployment, QA, execution protocol, decision log, roadmap, brand identity, catalog, privacy and technical principles; searched documentation for actual contact/deployment references. No approved contact destination found.
- Added one Hono server-rendered JSX app, TypeScript, npm, Vite Pages adapter, Wrangler. Actual installed versions: Hono 4.13.12, Vite 6.4.3, Pages adapter 0.4.3, Wrangler 4.146.0, TypeScript 5.9.3, Playwright 1.63.0, axe adapter 4.13.0, ESLint 10.11.0. Execution environment Node 22.23.2/npm 10.9.8.
- Implementation commit: `b4de527` (`feat: implement Ranel phase 1 public site and configurable inquiry path`). This evidence/docs update is a following commit; consult `git log` for its SHA and remote synchronization.

### Material requirement resolutions
1. The explicit latest Phase 1 instruction to implement in this repository supersedes the older README's suggestion to create future customer code separately. All existing strategy files remain; decision log and ADRs record the change.
2. Broader proposed routes/form API are narrowed to Phase 1 needs. No `/products`, `/about`, `/terms`, or contact submission API is implemented or linked. No complete/purchasable offers exist.
3. Brand copy follows newest **Ranel** prompt. Earlier founder message named `runnel.biz.id`/`runnel.page.dev`; newest prompt names `ranel.biz.id`. Deployment resource/hostname remain unresolved, not silently renamed. Default Pages suffix is `pages.dev`.
4. An existing project is mandatory per founder. Skill's generic create/suffix fallback is **not authorized** for this task and was not used.

## 3. Implemented
- `/`: clear Indonesian overview, practical audience, truthful pilot/development status, Kits → Systems → Supply with future availability distinguished, barber CTA.
- `/barber`: independent/small barber audience, five possible problem areas (not guaranteed pain), three proposed categories, no invented price/result/social proof, process/FAQ, offer-specific inquiry navigation.
- `/contact`: clear configuration-dependent state, offer selection, read-only unsent draft, official-contact status, privacy link; no form, collection, send/save claim, or inactive button.
- `/inquiry`: fixed-host, HTTP 303 external handoff only for syntactically valid configuration; safe contact fallback when missing/invalid. Allowlisted offer topics; no arbitrary redirect or query reflection.
- `/privacy`: no application inquiry persistence/accounts/analytics, manual external handoff, infrastructure disclosure, honest unknown message-retention operations.
- Shared semantic layout/navigation/footer, one H1/page, unique descriptive title/description, OG text metadata, original simple SVG mark, local CSS, visible keyboard focus/skip link, mobile grids, native expandable FAQ, useful 404 and generic safe error page.
- App security headers: CSP/anti-framing, content-type, referrer, permissions policy; no cookies or personal-message logging. Native Pages static routing in generated `_routes.json`.
- No database, authentication, analytics, CRM, payment, scheduling, second vertical, or messaging automation added.

## 4. Files changed and purposes

| Paths | Purpose |
|---|---|
| `src/index.tsx` | Single public app, reusable layout, four pages, redirect, fallbacks, security headers |
| `src/inquiry.ts` | Three proposed offer records and guarded message/destination helpers |
| `public/static/style.css` | Brand palette, responsive layout, focus treatment |
| `public/static/brand-mark.svg` | Original minimal brand/favicon mark; not a legally cleared final logo |
| `package.json`, `package-lock.json` | Actual scripts/dependencies and reproducible npm lock |
| `tsconfig.json` | Strict application typecheck |
| `vite.config.ts` | Pages build + content development adapter, clean output directory |
| `wrangler.jsonc` | Pages output/runtime date; no guessed project/account or storage bindings |
| `ecosystem.config.cjs` | PM2-managed Pages sandbox preview |
| `eslint.config.js` | TypeScript/source/test/config linting |
| `playwright.config.ts` | Three Chromium viewports, one worker, existing-preview origin |
| `tests/app.test.mjs` | 24 built-worker route/content/redirect/config/security tests |
| `tests/browser/public.spec.ts` | 21 browser scenarios, axe checks, screenshots, link/asset/navigation/focus tests |
| `.gitignore`, `.dev.vars.example` | Secret/build/QA exclusions, contact config names/instructions without values |
| `README.md` | Actual setup, commands, entry URIs, data architecture, inquiry, BYOK workflow, status/limits |
| `docs/README.md` | Index implementation evidence and actual application guide |
| `docs/governance/decision-log.md` | Explicit scope/domain/deployment conflict resolutions |
| `docs/technology/architecture-decisions.md` | Small scaffold/inquiry boundary, adapter fallback, blocked resource targeting |
| `docs/technology/environments-and-deployment.md` | Actual Phase 1 deployment path and blockers, preserved broader guidance |
| `docs/technology/testing-and-qa.md` | Actual suite and applicability boundaries |
| `docs/implementation/phase-1/evidence.md` | This report and acceptance record |

## 5. Inquiry flow
No real business destination was present. The founder must approve/verify **a public business WhatsApp** and set `INQUIRY_WHATSAPP_NUMBER` privately in Pages production configuration (local `.dev.vars` for preview testing).

- Missing/invalid: page explicitly says **Kontak belum aktif** and **belum ada cara mengirim inquiry**; no WhatsApp/send CTA, no form/data capture. Draft is selectable/read-only and not stored/sent. Working catalog/privacy/topic links remain.
- Configured: `/inquiry?offer=...` redirects to `https://wa.me/` with a safely encoded, allowlisted initial message. The user must send it manually in WhatsApp. No automatic send, analytics click tracking, or acknowledgment of receipt.
- Unknown/injected `offer` values use a generic draft and are not reflected. Destination validation requires international digits, first digit non-zero, length 8–15; this is **not** ownership/account verification.
- Tests use a synthetic fictional NANP-format fixture; no real recipient is hardcoded or committed. Configured flow is unit-tested; live send/receipt is **NOT VERIFIED**.
- See [README inquiry configuration](../../../README.md#inquiry-configuration) for setup details and names-only environment documentation.

## 6. Verification evidence

### Final successful runs

| Command/check actually executed | Observed outcome |
|---|---|
| `git status`, `git branch --show-current`, `git remote -v`, `git log`, `git fetch origin` | Clean `main` baseline, intended repo/remote, remote aligned |
| `npm install` after dependency correction | Installed; lockfile created; audit zero vulnerabilities |
| `npm ci` | Clean lockfile-based reinstall: 164 packages installed, exit 0; all checks repeated afterwards |
| `npm run lint` | Exit 0; source, tests, config checked |
| `npm run typecheck` | Exit 0; strict application TypeScript |
| `npm test` | Exit 0; builds then **24 passed, 0 failed, 0 skipped** |
| `npm run build` | Exit 0; 53 transformed modules; `_worker.js` **60.13 kB** reported (not gzip); static assets and `_routes.json` generated |
| `npx playwright install chromium` and `npx playwright install-deps chromium` | Browser + required Linux libraries installed successfully |
| `npm run test:e2e` after clean Pages restart | Exit 0; **21 passed, 0 failed**, final full run 48.3 s; no retries configured |
| `npm audit` | **0 vulnerabilities** in observed dependency tree |
| `git diff --check` | Exit 0 |
| Markdown local-file link checker | 40 documentation files; 0 missing local destinations |
| Configured-credential exact-value scan (environment values not printed) | **0 matches in 55 tracked files** at implementation checkpoint; not a formal forensic guarantee |
| `.dev.vars`, `.env`, `node_modules`, `dist`, QA/test outputs ignore checks | PASS; source has no literal business WhatsApp recipient |
| `curl` built Pages preview homepage, CSS, SVG | HTTP 200 after clean startup |
| Public sandbox `curl` `/`, `/barber`, `/contact`, `/privacy`, CSS, SVG | All **HTTP 200** |
| Final PM2 non-streaming logs after clean restart | Empty error log at final check; route/assets requests 200/304 |
| Screenshot content/visual review | Desktop/mobile home and barber layouts: no remaining overlap/clipping/overflow observed; status copy remains honest |

Browser viewports: **320×740**, **390×664** (Chromium iPhone 13 emulation, not actual iOS Safari), **1440×1000**. Axe checks ran on four main pages at each viewport with WCAG 2/2.1 A/AA tags: **no detected violations**. Tests also verify keyboard focus/outline, skip link, FAQ keyboard toggling, HTTP 404, every internal link/anchor/asset, metadata, no console/page errors, contact empty state and full home→barber→offer→contact→privacy journey. Screenshots generated under ignored `qa-artifacts/`.

### Initial failures and fixes (not concealed)
- First `npm install`: ERESOLVE, Workers types 4 incompatible with current Wrangler optional peer 5. Corrected declared Workers types to compatible 5; no `--force`/`--legacy-peer-deps` used.
- First application run: **21/24 passed**, three failures. One metadata test incorrectly required text before `Ranel` in `<title>`; corrected pattern to allow brand at start while retaining substantive checks. Two real 404 tests exposed the Pages adapter/custom not-found incompatibility; explicit final 404 route fixed them. Final same 24 cases all pass.
- First PM2 launcher did not start listening; switched to `npx wrangler` launcher. Verified HTTP after startup rather than trusting PM2 process status.
- First browser attempt: all launch attempts failed due missing `libatk-1.0.so.0`; installed Chromium Linux dependencies and reran.
- Next browser run: **19/21 passed**. Mobile-320 barber hero overflow was caused by hiding a `<br>` that joined words and forced a grid's intrinsic width. Preserved line break, adjusted sidebar heading, and set grid children `min-width:0`; no `overflow:hidden` workaround. Mobile-390 full-height high-DPR screenshot hit capture limits; switched artifact screenshot scale to CSS pixels without reducing viewport/layout/accessibility assertions.
- One formatting run encountered unsupported SVG/env parsers. Supported source/style/test/config files were formatted in a following successful run; SVG/env contents were unaffected.
- Building while preview watched `dist` caused transient `_routes.json` parse warnings and static 500s. Stopped preview, built fully, restarted, and repeated asset smoke + all 21 browser tests successfully. README requires this safe lifecycle. Final logs are clean; no production release attempted.

### Not run / not verified
Production deploy/smoke/rollback, canonical domain DNS/TLS/redirects, actual WhatsApp recipient ownership/send/receipt, physical iOS/Android devices, Safari/Firefox, full human accessibility certification, real operator sessions, legal review, business validation. Form/database/auth/payment/tenant tests are **not applicable** because those features were not implemented.

## 7. Deployment
**BLOCKED — no production deploy performed.** CF BYOK skill `cf-byok-deploy` was activated. `setup_cloudflare_api_key` succeeded before Wrangler commands; `npx wrangler whoami` verified the connected account. `npx wrangler pages project list` succeeded, but contains no matching `ranel`/`runnel` project.

Targeted authenticated REST checks:
- Existing Pages project `ranel`: **HTTP 404**, Cloudflare code **8000007**, “Project not found.”
- Existing Pages project `runnel`: **HTTP 404**, same code/message.
- `ranel.biz.id` zone: **active**, visible in connected account.
- `runnel.biz.id` zone lookup: no result under this token; this does not prove global nonexistence.

Metadata `cloudflare_project_name` was read and was unset. No guessed name saved. No `pages project create`, production deploy, custom-domain attachment, DNS change, or secret with an invented contact was performed. All unrelated Pages projects are untouched.

Temporary **sandbox** preview (not Cloudflare production):
https://3000-iy1qof0t6pdsmm8bh8q31-82b888ba.sandbox.novita.ai

Precise remaining steps: founder identifies authorized existing project/account/hostname → reload correct BYOK token if needed → verify `whoami` and project listing → read/write verified project metadata → configure approved business contact privately → stop preview/run QA/build → `wrangler pages deploy dist --project-name <verified-existing-name> --branch main` → verify returned URL/assets/404/contact and approved domain HTTPS/redirects → record release SHA/time/URL. **Do not create a new project.** See README for commands and rollback plan.

## 8. Acceptance checklist

| Criterion | Result | Evidence/boundary |
|---|---|---|
| Existing framework/deployment setup inspected and preserved | PASS | Baseline had none; strategy docs preserved; one app added |
| Homepage renders and explains Ranel | PASS | Worker + Chromium + screenshot review |
| Barber page explains audience/offer categories | PASS | 3 development-stage cards; tests/render checks |
| Offer status truthful; no fabricated results/proof/prices | PASS | Source/content assertions and copy review |
| Navigation and every published CTA work | PASS | Local browser/worker links, anchors, full journey; contact status not fake-send CTA |
| Real inquiry destination configured **or blocker honestly surfaced** | PASS (blocked state) | Explicit unconfigured state and no send claim; live recipient NOT VERIFIED |
| Working real inquiry delivery | FAIL / BLOCKED | Founder-approved contact missing; no live handoff/receipt test |
| Responsive mobile/desktop checks | PASS | 320/390/1440 px, overflow assertions, screenshots |
| Accessibility basics, metadata and link checks | PASS | axe + keyboard + route/anchor/assets, not full certification |
| Actual lint/typecheck/test/build run | PASS | Exit 0; 24 application + 21 browser tests |
| No accidental secrets or personal contact data committed | PASS within checks | Credential scan/ignore checks/source review; synthetic tests only |
| Setup/inquiry/deploy instructions documented | PASS | README, deployment/QA updates, evidence, ADRs |
| Explicit deployment status recorded | PASS | **BLOCKED**, not production deployed |
| Production URL/core journeys verified | NOT VERIFIED | Target project missing; not attempted to guessed resource |
| Change summary and unresolved issues supplied | PASS | This report |

The blocked contact and production release prevent an overall PASS even though the honest fallback meets the prompt's alternative-contact criterion.

## 9. Known limitations and risks
- Site cannot currently receive inquiries; the draft is not lead capture/storage.
- An active domain zone does not identify a Pages app or verify site routing; hostname conflict needs founder resolution.
- Format-valid WhatsApp configuration alone is insufficient evidence of recipient ownership, registration, or availability. Sending/receiving must be checked with an approved business account.
- Privacy policy is scoped to the website; manual conversation retention/deletion policies and support/refund agreements still need founder definition before collecting more data or selling.
- No canonical tag or host redirect hardcoded while deployment hostname is unresolved.
- App and automated accessibility tests do not establish usability for operators, legal clearance, or market demand.
- Proposed kit content, prices, availability and outcomes remain unvalidated; Systems/Supply are future direction only.
- Clean-build/restart lifecycle matters for preview assets; production rollback is documented but untested.

## 10. Next necessary action
**Resolve release configuration, not Phase 2:** identify the exact existing Cloudflare Pages project and authorized account, confirm the intended hostname, and privately configure the founder-approved public business inquiry destination. Only then deploy via the already-selected BYOK path and verify real contact handoff/receipt.
