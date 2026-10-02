# Phase 1B — Production release evidence

Date: **2026-10-02 UTC**. Scope: release configuration, exact Pages project creation, production deployment and verification only. No Phase 2 work, custom-domain attachment/DNS writes by this release agent, or WhatsApp message sending. A concurrent custom-domain addition was observed later and is reported separately below.

## 1. Status

**PASS — Phase 1B release gate. Production: LIVE / VERIFIED at https://ranel.pages.dev.** The founder's latest approval supersedes the historical existing-project-only blocker. This proves public deployment and correctly configured manual inquiry links, not WhatsApp account registration/message receipt, kit availability, market demand, or business results.

## 2. Repository provenance

- Repository: https://github.com/Sparkmind-obp-off/Ranel, branch `main`, intended `origin` verified.
- Local starting HEAD: `ece065f5df95e72d5caf25e8356180ba9f05db59`, clean.
- `git fetch origin` found three new founder documentation commits; reviewed log/diff and fast-forwarded safely to `5638d8c7315122b6be49028dd41a5c75f0cab4dc` before editing. The Phase 1B execution prompt/roadmap/index were preserved.
- Release configuration/test commit: **`9a4989f53a60ef04adebf2633a9dafe836c8359b`**, pushed to GitHub before deployment; this is the **deployed SHA**, also verified in Cloudflare trigger metadata.
- App source, public assets, package manifest/lockfile and synthetic unit tests are unchanged from the synchronized founder baseline. Only exact project config and additive browser QA changed before deployment. No new dependency, backend, database, or app.
- This evidence and other documentation updates are committed afterward. Their final SHA is available in Git history/final report; they do **not** change the deployed SHA or require another deploy.

## 3. WhatsApp configuration

- Used the founder-approved business destination from the Phase 1B prompt, normalized to international digits. Value is **masked/omitted** in release logs, reports and new source/config/docs.
- Existing runtime mechanism preserved: `c.env.INQUIRY_WHATSAPP_NUMBER` → format validation → fixed `https://wa.me/` host → encoded allowlisted topic message.
- Set via `wrangler pages secret put INQUIRY_WHATSAPP_NUMBER --project-name ranel`, supplied privately over stdin, not as a literal command argument. CLI confirmed **production** and success. Secret list displayed only name and **Value Encrypted**.
- Cloudflare project API confirmed production binding type `secret_text`; preview binding remains unset. No environment values dumped.
- `/contact` is now **Jalur WhatsApp tersedia / Lanjutkan di WhatsApp**; no “Kontak belum aktif” in production. Read-only draft and truthful “website does not send/save” copy retained. No form or lead persistence.
- General, operations, retention, tracking and unknown-topic `/inquiry` cases return **303** to the approved normalized recipient, with correctly decoded expected message and no arbitrary destination. Checked both production and immutable URLs without following redirects.
- No WhatsApp request, app opening, automated message or real message sending/receipt test performed. “Manually sendable” means correctly formed deep link and prefilled message, not independently verified WhatsApp registration or delivery.
- Updating later: obtain founder approval, normalize digits, run the same masked/stdin secret update on `ranel`, redeploy the reviewed build, and repeat configured-state/redirect checks. See [README](../../../README.md#inquiry-configuration). Public contact is not an API secret, but remains centralized in runtime configuration.

## 4. Authorized account and project discovery

- `cf-byok-deploy` skill activated; `setup_cloudflare_api_key` succeeded before Wrangler commands; GitHub credential setup succeeded separately.
- `npx wrangler whoami`, authenticated `/accounts`, and Pages listing confirmed **one authorized Cloudflare account** (the already-connected Sparkmind account). No ambiguity, account switching, or unverified account used. No tokens exposed.
- Exact authenticated lookup for `/pages/projects/ranel` returned **404**, confirming absence rather than blocking creation.
- Founder explicitly authorized creation of **exactly `ranel`**, replacing earlier instruction. No `runnel`, suffixed name, default `webapp`, or unrelated project used/modified.

## 5. Creation and deployment

Commands actually executed successfully:

```sh
npx wrangler pages project create ranel --production-branch main --compatibility-date 2025-09-20
npx wrangler pages secret put INQUIRY_WHATSAPP_NUMBER --project-name ranel
npx wrangler pages secret list --project-name ranel
npx wrangler pages deploy dist --project-name ranel --branch main --commit-hash "$(git rev-parse HEAD)"
```

Secret input was private; its value is intentionally not reproduced here.

- Project creation: success; Cloudflare explicitly reported **https://ranel.pages.dev/**.
- Build directory: existing `dist`, verified from package/Vite/Wrangler scaffold. Uploaded two static files, compiled/uploaded Worker and `_routes.json`; deployment completed.
- Production: **https://ranel.pages.dev**.
- Immutable deployment: **https://a9f812e4.ranel.pages.dev**.
- Deployment ID: **`a9f812e4-3c47-4d2b-9c73-2d8728c6992c`**.
- Created: **`2026-10-02T04:29:05.332293Z`**; CLI completion observed at `2026-10-02T04:29:07Z`.
- Deployed SHA: **`9a4989f53a60ef04adebf2633a9dafe836c8359b`**.
- Cloudflare API verified project `ranel`, branch `main`, environment `production`, canonical hostname `ranel.pages.dev`, trigger SHA, and final stage **success**.
- Metadata `cloudflare_project_name` read initially unset, set to `ranel`, then persisted after successful deployment. Wrangler `name` is also exactly `ranel`.
- Initial project domain list: **only `ranel.pages.dev`**. Final read-only check at `2026-10-02T04:41:33Z` also showed `ranel.biz.id`, status **active**, created `2026-10-02T04:32:09.411016Z`. This agent did not attach it or perform any DNS write; the actor is unknown. Production deployment ID/SHA stayed unchanged; custom-domain DNS/TLS/redirect/browser health is not verified here.

## 6. HTTP and browser verification

HTTP smoke passed on **both** production and immutable deployment origins. Playwright API requests never followed external redirects; CSS/SVG response bytes matched the local reviewed build.

| Route | Actual outcome |
|---|---|
| `/` | 200; expected Indonesian Ranel homepage |
| `/barber` | 200; expected pilot/development offer content |
| `/contact` | 200; configured state, working manual CTA, no false sent/saved claim |
| `/privacy` | 200; application/external-handoff disclosure |
| `/static/style.css` | 200; exact built content |
| `/static/brand-mark.svg` | 200; exact built content |
| `/not-a-page` | 404; useful return navigation |
| `/inquiry` | 303; approved recipient + general draft; not followed |
| `/inquiry?offer=operations` | 303; approved recipient + operations draft; not followed |
| `/inquiry?offer=retention` | 303; approved recipient + retention draft; not followed |
| `/inquiry?offer=tracking` | 303; approved recipient + tracking draft; not followed |
| `/inquiry?offer=unknown` | 303; approved recipient + general fallback; not followed |

Production browser suite: **24 passed, 0 failed** on **320×740**, **390×664 Chromium mobile emulation**, **1440×1000**. Verified page renders, metadata, overflow, every internal link/anchor/asset, keyboard skip/focus, FAQ keyboard interaction, 404, configured contact/topic journey and safe all-topic redirects. Four main pages at three viewports passed axe WCAG 2/2.1 A/AA checks with **zero detected violations**. No console/page errors or failed page requests observed in those checks.

Desktop/mobile production contact screenshots reviewed: configured state and honest unsent-draft copy visible, CTA usable, no business number displayed, no permanent clipping/overlap. A focused skip link overlay is intentional keyboard feedback, not a persistent layout element. Screenshots stay in ignored `qa-artifacts/`; no configuration value stored in them.

## 7. Actual commands and outcomes

| Command/check | Result |
|---|---|
| `git fetch`, remote/branch/status/log/diff, `git merge --ff-only origin/main` | Correct repo/main; preserved and synchronized three founder doc commits |
| `npm ci` | Exit 0; lockfile install, 164 packages; no dependency changes |
| `npm run lint` | Exit 0 after release config/test edits |
| `npm run typecheck` | Exit 0 |
| `npm test` | Exit 0; built-worker tests **24/24 passed**, no skipped tests |
| `npm run build` | Exit 0; Worker **60.13 kB**, 53 modules, static assets/routes generated |
| `npm audit` | Exit 0; **0 vulnerabilities** |
| `npm run test:e2e` (local, unconfigured) | Exit 0; **24/24 passed**, 51.5 s |
| Configured production `npm run test:e2e` | Exit 0; **24/24 passed**, reported 1.0 min |
| Project create / production secret put / secret list / deploy | Successful; verified against Cloudflare API and live origins |
| HTTP route/asset/redirect smoke | All expected statuses on both origins; recipient matched privately; no external redirect followed |
| Application/source/asset/dependency preservation diff | Empty; app and dependencies unchanged |
| `git diff --check` | Exit 0 |
| Configured-credential Git-history scan | 73 blobs inspected at release checkpoint; **0 matches**, values not printed |
| Markdown local-file link check | 42 documents, **0 missing destinations** |
| New/changed file contact-value check and ignore checks | No business destination literal scattered into changes; secrets/runtime/build/QA paths excluded |

Configured production test invocation used `QA_BASE_URL=https://ranel.pages.dev`, `QA_CONTACT_STATE=configured`, and the privately supplied `QA_EXPECT_WHATSAPP_NUMBER`; actual value is not printed or committed. The original unconfigured assertions remain in local mode; an additional all-topic test was added. Existing checks were not weakened/removed.

### Initial probes and limitations recorded, not hidden

- Optional DNS read-only baseline: `/dns_records` returned **403**. No DNS writes, token escalation, or custom-domain change attempted; record-diff proof is unavailable and not claimed. This is not needed for Pages default-hostname release.
- First release API-check script encountered `preview.env_vars = null`; handled null as absent and reran successfully. No app or Cloudflare secret change was required.
- A default Python `urllib` homepage probe returned **403 / Cloudflare error 1010**. Recheck reproduced 403 for that user-agent and **200** with a browser user-agent. Independent curl, Chromium, Playwright API smoke, and full production browser suite passed. This is an edge user-agent/security limitation, not falsely reported as a successful Python check; Cloudflare security settings were not weakened.
- Automated/visual checks are not physical-device Safari/Firefox tests, exhaustive accessibility certification, legal review, WhatsApp registration/receipt verification, or business validation.
- Production rollback is documented but not exercised; no storage/migration rollback applies.
- A final provenance assertion expecting an unchanged one-domain list failed because the list had gained `ranel.biz.id` concurrently. Read-only inspection confirmed its active status/creation time, with unchanged `ranel` default hostname, deployment ID/SHA, production environment, success stage and contact secret. Rechecked actual release invariants successfully; no removal/reattachment or DNS writes attempted. Actor and custom-domain live health remain unverified; evidence corrected instead of hiding the changed state.

## 8. Files changed

- `wrangler.jsonc`: exact `name: ranel`; no contact value/credential or storage binding.
- `tests/browser/public.spec.ts`: explicit configured/unconfigured expectations, masked recipient comparison, no-follow redirects, additive all-topic test, state-specific screenshots. No runtime app edits or new dependencies.
- `README.md`: verified release/provenance, contact-update instructions, production QA, exact BYOK redeploy workflow, remaining limits.
- `docs/technology/environments-and-deployment.md`: actual release, safe create/redeploy path, custom-domain deferral, rollback boundary.
- `docs/technology/testing-and-qa.md`: current 24-case local/production browser suite and explicit no-message QA expectations; original Phase 1 checkpoint preserved.
- `docs/governance/decision-log.md`: newest durable creation/hostname/contact/custom-domain decisions appended; old rows preserved.
- `docs/technology/architecture-decisions.md`: Phase 1B resolution added; original blocked checkpoint retained historically.
- `docs/implementation/phase-1/evidence.md`: release addendum linking this evidence; historical failures/gate preserved.
- `docs/README.md`: index this report.
- `docs/implementation/phase-1b-release-deployment/evidence.md`: this release record, acceptance and limitations.

## 9. Acceptance gate

| Criterion | Result |
|---|---|
| Approved WhatsApp destination correctly configured | PASS — encrypted production binding and exact live redirect destination checked privately |
| Inquiry links correctly formed/manual sending path | PASS — encoded intended drafts, fixed WhatsApp host, all topics checked; no message sent |
| Contact UI truthfully configured | PASS — active CTA and unsent/no-storage copy, no inactive-contact notice |
| Exact `ranel` project in intended account | PASS — sole account and exact project verified |
| Deployment completed to that project | PASS — success stage, production/main, deployed SHA verified |
| `https://ranel.pages.dev` reachable and expected app | PASS — curl/HTTP/browser checks |
| Key routes and assets | PASS — 200/303/404 as appropriate, exact asset content |
| Relevant install/lint/typecheck/unit/build/E2E/audit rerun | PASS — all successful final application checks; probe limitations listed separately |
| Release evidence/limits committed to GitHub | PASS — documentation follow-up commit records this evidence and limits; final HEAD/remote SHA confirmation supplied in the release report |
| No custom-domain DNS changes by this release agent | PASS — no domain/DNS write operations; concurrent active domain addition observed and disclosed, not undone |

## 10. Remaining scope and production confirmation

**Production is live and verified at https://ranel.pages.dev.** No Phase 1B release blocker remains. Actual WhatsApp account status/message delivery is not independently tested because founder prohibited real message testing. The user must review/send manually; no fake confirmation, lead persistence or automated messaging.

`ranel.biz.id` was **not configured/attached by this release agent**, and no DNS writes were performed. It nevertheless appeared active in a final read-only Cloudflare lookup, created during the release window by an unverified actor. Its actual TLS/routing/redirect/browser health remains untested and requires a separately authorized inspection; do not undo or reattach it blindly. Kit contents/prices/readiness, operator usability, legal/privacy operations, demand and business outcomes remain unvalidated. No Phase 2 work authorized or started.
