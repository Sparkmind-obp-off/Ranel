# Ranel

**Ranel** is the founder-selected master brand for a practical business-systems and commerce company serving local operators.

> **Working brand line:** Practical systems for better-run businesses.
>
> **Brand promise:** Help small operators run their businesses with more clarity, consistency, and control.

Ranel is designed to grow through three connected layers:
1. **Kits** — templates, SOPs, calculators, checklists, and starter playbooks.
2. **Systems** — lightweight tools for reporting, retention, and workflow when actual needs justify them.
3. **Supply** — relevant tools, products, and business supplies after needs and sourcing are verified.

The first vertical is **barber businesses**. Other verticals are future options, not simultaneous launch commitments.

## Current Phase 2 — Pilot Product & Demand Validation

Three concrete pilot definitions are implemented: **Ranel Barber Starter** (daily foundation), **Ranel Barber Growth** (Starter plus records/retention/review), and **Ranel Barber System** (requirements/flow concept, not available software). Starter/Growth materials are prepared manually after agreement; no ready kit files, fixed prices, subscription, guaranteed growth or engineering commitment claimed.

Local gates pass (28 built-worker tests; 27 browser tests). Production Phase 2 release verification is recorded separately in [Phase 2 evidence](docs/implementation/phase-2/evidence.md); the earlier Phase 1B release remains the baseline until redeploy/verification. [Pilot catalog](docs/products/product-catalog.md) · [Implementation/operating method](docs/implementation/phase-2/implementation-notes.md) · [Blank demand-evidence template](docs/templates/demand-evidence.md).

Only blank templates are committed. Keep real anonymized interaction records in Git-ignored `demand-records/` or an already-approved private store, with restricted contacts separate. Manual entry and follow-up permission are required; no website lead storage or automation exists. No real inquiries/sales are fabricated, and demand is **not validated** by publishing the catalog. Execute one complete Phase 2, no sub-phases; do not start Phase 3 automatically.

## Phase 1B baseline (preserved)
- **Phase 1B gate: PASS. Production deployment: VERIFIED** at https://ranel.pages.dev, released 2026-10-02 via CF BYOK. Public pages and founder-approved runtime WhatsApp handoff are verified; no actual message was sent during QA.
- Existing baseline was documentation only, at `bef5456` on `main`. No framework, package manager, application, or adapter existed to preserve. Existing strategy documents remain in place.
- One lightweight Hono/TypeScript application now lives in this repository, as explicitly requested in the Phase 1 implementation prompt. See [decision log](docs/governance/decision-log.md) for the change from the older documentation-only/separate-codebase wording.
- Trademark/company clearance, product-market fit, prices, kit deliverability, demand, and business results are **not verified**.
- Kits are **in development**, not ready to buy. Systems/Supply are not available.
- Production contact UI is active; links resolve to the approved business destination with the intended draft. WhatsApp registration and actual message delivery/receipt are not independently tested or claimed.
- [Phase 1 historical implementation evidence](docs/implementation/phase-1/evidence.md) · [Phase 1B production release evidence](docs/implementation/phase-1b-release-deployment/evidence.md).

## URLs and entry points
- Repository: https://github.com/Sparkmind-obp-off/Ranel (`main`).
- Local Pages preview: `http://localhost:3000`.
- Temporary sandbox preview: https://3000-iy1qof0t6pdsmm8bh8q31-82b888ba.sandbox.novita.ai — verified HTTP 200 for homepage/barber; not a production URL and may expire.
- Production URL: **https://ranel.pages.dev**; project exactly `ranel`, production branch `main`.
- Immutable deployment: https://a9f812e4.ranel.pages.dev; ID `a9f812e4-3c47-4d2b-9c73-2d8728c6992c`.
- Deployed commit: `9a4989f53a60ef04adebf2633a9dafe836c8359b`; created `2026-10-02T04:29:05.332293Z`, Cloudflare stage `success`. Subsequent documentation-only commits do not change this deployment's provenance.
- Custom-domain observation: initial release lookup listed only `ranel.pages.dev`; final read-only lookup at `2026-10-02T04:41:33Z` also listed `ranel.biz.id`, with Cloudflare status **active** and creation time `2026-10-02T04:32:09.411016Z`. The release agent did **not** attach it or change DNS; the actor is not verified. Its actual DNS/TLS/redirect/browser behavior was not tested in this phase. The Pages deployment ID/SHA did not change.

| Route | Purpose |
|---|---|
| `/` | Indonesian-first brand overview and Kits → Systems → Supply status |
| `/barber` | Three pilot definitions, audience/problems/contents/deliverables/status, comparison, manual process and FAQ |
| `/barber#rencana-kit` | Jump to the proposed kit catalog |
| `/contact` | Contact availability and a read-only, unsent message draft |
| `/contact?offer=starter\|growth\|system` | Select a current product and adapt the draft; System has an explicit concept-only notice |
| `/inquiry?offer=starter\|growth\|system` | HTTP 303 to approved WhatsApp with product context if config valid; otherwise back to contact |
| `/contact` and `/inquiry` with `offer=operations\|retention\|tracking` | Backward-compatible Phase 1B topic names/messages; not silently remapped to new products |
| `/privacy` | Application data handling and external-service disclosure |
| `/static/style.css`, `/static/brand-mark.svg` | Locally served brand assets |
| Other routes/methods | Helpful HTTP 404; no contact submission API |

## Local setup and development
Use Node.js 22.13+ and npm. The lockfile is committed; there was no previous package manager.

```sh
npm ci
npm run lint
npm run typecheck
npm test
```

`npm test` builds first and runs the Node test runner against the **built Pages worker** (28 tests in Phase 2). `npm run build` writes `dist/_worker.js`, `_routes.json`, and static assets. `npm run dev` is the Vite content-development entry; it is **not** the verification environment for Cloudflare runtime bindings.

To check actual Pages behavior, use the built preview:

```sh
npm run build
npm run preview
```

In the coding sandbox, use PM2 instead of starting a blocking service. The included PM2 config's `cwd` is sandbox-specific (`/home/user/webapp`):

```sh
# For a restart, stop the running preview BEFORE building.
pm2 stop ranel-preview   # skip on first start
fuser -k 3000/tcp 2>/dev/null || true
npm run build
pm2 start ecosystem.config.cjs  # use pm2 restart ecosystem.config.cjs for an existing process
curl -f http://localhost:3000/
pm2 logs ranel-preview --nostream
```

Do not rebuild `dist` while Pages preview is serving it: the generated routes file can be observed mid-write. A clean restart after build avoids transient asset errors.

### Browser QA

```sh
npx playwright install --with-deps chromium
# Start the built Pages preview as above, then:
npm run test:e2e
```

27 browser tests cover 320px, 390px (Chromium mobile emulation), and 1440px viewports: route rendering, overflow, metadata, assets, navigation, keyboard focus, FAQ, 404, explicit inquiry state, all topic redirects, and axe WCAG A/AA checks. Local default is unconfigured contact; production is tested with an explicitly configured expectation, not inferred from the UI. Screenshots are generated under ignored `qa-artifacts/` with state-specific filenames. Passing automated checks is not a full accessibility certification, physical-device test, or usability/market study.

For production QA, privately load the approved destination into `QA_EXPECT_WHATSAPP_NUMBER` (for example with a silent shell prompt; do not place its value in scripts/logs/docs), then:

```sh
QA_BASE_URL=https://ranel.pages.dev QA_CONTACT_STATE=configured npm run test:e2e
```

Export `QA_EXPECT_WHATSAPP_NUMBER` before this command and unset it afterward. Tests compare the recipient without printing it and use `maxRedirects: 0` so they never contact WhatsApp. Default local tests retain the unconfigured-state assertions. No tests or assertions were removed to make production pass.

## Inquiry configuration
The founder supplied and approved a public business inquiry number in Phase 1B. It is configured once as the **production runtime secret** `INQUIRY_WHATSAPP_NUMBER`, not embedded in application source/build assets. The public business destination is not itself a secret; encrypted runtime configuration provides one consistent update point. Never infer a replacement number from account identity.

| Name | Purpose |
|---|---|
| `INQUIRY_WHATSAPP_NUMBER` | Founder-approved **public business** WhatsApp destination, held in runtime configuration |
| `CLOUDFLARE_API_TOKEN` | BYOK deployment credential; never a browser variable or committed value |
| `CF_PAGES_PROJECT` | Optional operator shell variable for the verified target; production project is exactly `ranel` |
| `QA_BASE_URL` | Browser-test origin; default local preview, production `https://ranel.pages.dev` |
| `QA_CONTACT_STATE` | `configured` for explicit active-contact QA; omitted for the unconfigured local baseline |
| `QA_EXPECT_WHATSAPP_NUMBER` | Privately supplied expected destination for configured QA only; not application configuration |

Local configuration: copy `.dev.vars.example` to `.dev.vars` and set the approved number there. The value must be international digits only, with country code, no `+`, spaces, or leading zero; 8–15 digits, starting 1–9. Restart the **Pages** preview after changing it. Blank/invalid configuration fails closed. Format validation does **not** prove account ownership or WhatsApp registration; the founder must verify both.

To update the number later, first obtain founder approval and normalize to international digits. Run `npx wrangler pages secret put INQUIRY_WHATSAPP_NUMBER --project-name ranel`; enter it privately through the masked prompt or secure stdin, not as a literal command argument. Wrangler targets production; secret listing shows the name/encrypted status only. Deploy/redeploy the reviewed build, then verify the active contact page and `/inquiry` Location without following it or sending a message. Never print the secret value or put it in source, `wrangler.jsonc`, screenshots, or committed environment files. Cloudflare preview configuration is intentionally unset; the immutable production deployment still uses production configuration.

Behavior:
1. Browse barber offers and open contact for a chosen topic.
2. If unset/invalid: show **Kontak belum aktif**, no send button/WhatsApp link. The draft is selectable/read-only; nothing is sent or saved. A working link returns to the catalog.
3. If configured: **Buka WhatsApp untuk diskusi** follows `/inquiry` to a fixed `https://wa.me/` URL with the allowlisted offer's message. Unknown offer parameters fall back to a general draft. Arbitrary redirects and injected message input are not accepted.
4. The visitor must review and manually send in WhatsApp. The website cannot prove that the visitor sent a message or that Ranel received it; it never shows a sent/saved success notice.

The synthetic phone-format fixture in tests is not production contact configuration.

## Architecture and dependencies
- Single Hono application, server-rendered JSX; shared layout, offer cards, status UI, and inquiry helpers.
- Runtime dependency: **Hono** only. No shipped client JavaScript, external fonts, photos, analytics, or provider SDK.
- Vite + Hono Pages/dev adapters + Wrangler: build and Cloudflare-compatible preview/deployment, chosen because baseline had no scaffold.
- TypeScript + Workers types: static checks. ESLint/typescript-eslint: lint. Playwright/axe: development-only browser/accessibility testing.
- Native Pages static routing via `_routes.json`; assets originate in `public/static`. Explicit catch-all 404 route preserves fallback through the Pages adapter.
- Data model: three pilot definitions (target/problem/contents/deliverables/how/use/status/exclusions/CTA) in `src/inquiry.ts`, plus preserved legacy topic lookup. Runtime contact configuration stays separate. No customer/lead data model or persistence added.
- No D1, KV, R2, database, in-memory lead store, forms, accounts, CRM, payments, booking, or messaging automation.
- Application pages have CSP, anti-framing, content-type, referrer, and permissions headers. No application cookies or personal-data logging. Platform hosting may process technical request information.

## Cloudflare BYOK deployment
The authorized path is **`cf-byok-deploy`**, not Genspark Hosted Deploy. The newest Phase 1B founder instruction supersedes the older existing-project-only restriction: create **exactly `ranel`** if absent and deploy to **https://ranel.pages.dev**. The sole authenticated account was verified, project creation succeeded, production secret was installed, and production was deployed/checked. Never substitute `runnel` or a suffixed project. Metadata `cloudflare_project_name` and `wrangler.jsonc` now both select `ranel`.

For subsequent releases:
1. Load BYOK credentials with `setup_cloudflare_api_key` in Genspark, then verify `npx wrangler whoami`. Never run `wrangler login` or expose the token. Use the authorized account; stop if account selection is ambiguous.
2. Inspect `origin/main`, working tree, verified metadata and `npx wrangler pages project list`. The existing production target is `ranel`, branch `main`; do not create another app/project.
3. Stop local Pages preview before `npm ci`, lint/typecheck/test/build. Restart it and run local E2E; review diff and secrets. Production-only config does not make the local unconfigured fallback disappear.
4. Configure any approved contact update privately using the single runtime secret. No database/build-time contact substitution is needed.
5. Commit/push reviewed release changes, build from the intended clean SHA, and deploy explicitly:
   ```sh
   npx wrangler pages deploy dist --project-name ranel --branch main --commit-hash "$(git rev-parse HEAD)"
   ```
6. Check the returned immutable URL and https://ranel.pages.dev: `/`, `/barber`, `/contact`, `/privacy`, CSS/SVG, 404 and all `/inquiry` topics. Inspect redirects without following them. Run production configured E2E as above; verify account/project/environment/SHA through Cloudflare metadata without logging env values.
7. Persist project metadata and record date, deployment ID, deployed SHA, test outcomes and limitations. Documentation-only follow-up commits need not trigger another production deployment.

First project creation was executed once, after authenticated lookup confirmed absence: `npx wrangler pages project create ranel --production-branch main --compatibility-date 2025-09-20`. Do not re-create it on routine deploys.

**Do not attach `ranel.biz.id` or modify DNS as part of Phase 1B.** Custom-domain work requires a separate authorized follow-up; an active zone alone is not proof of routing/TLS. An optional read-only DNS snapshot attempt received HTTP 403, so no record-diff comparison is claimed.

Rollback: use the `ranel` Pages deployment history to restore a prior known-good deployment, or build a known-good Git revision and redeploy to the same project. No database rollback is needed. Production deployment is verified; **rollback has not been exercised**.

## Known gaps and next necessary action
- Inquiry destination and manual-link behavior are verified. Actual WhatsApp registration, message sending/receipt, and availability are not tested; no real message was sent per founder instruction.
- Custom-domain setup was not performed by this release agent. `ranel.biz.id` appeared active in Cloudflare during final read-only checks, outside the agent's actions; actor and DNS/TLS/redirect/browser behavior remain unverified. Do not undo or reattach it blindly.
- Real-device Safari/Firefox testing, full manual accessibility assessment, legal/privacy operations, and 3–5 operator usability sessions: not completed.
- Kit contents, pilot pricing, support window, delivery/refund terms, and evidence of value: must be agreed later; website completion is not validation.
- `/products`, `/about`, `/terms`, CRM/admin/auth/payments/booking/loyalty/automation remain unimplemented; the current public offer scope is only the Phase 2 catalog and manual inquiry/evidence method.

Actual demand collection and choosing one deliverable manual pilot are the next necessary business actions. Any custom-domain verification/change requires separate authorization. A later phase is conditional on operator evidence and must not start automatically; a live catalog is not demand or market validation.

## Strategy documentation
1. [Brand platform](docs/brand/brand-platform.md)
2. [Visual identity](docs/brand/brand-identity.md)
3. [Business model](docs/business/business-model.md)
4. [Product catalog](docs/products/product-catalog.md)
5. [Barber vertical plan](docs/verticals/barber/vertical-plan.md)
6. [Go-to-market](docs/go-to-market.md)
7. [90-day roadmap](docs/roadmap.md)
8. [Legal and brand clearance](docs/governance/legal-and-brand-clearance.md)
9. [Documentation index](docs/README.md)

This project remains separate from the private Bosku Cukur / Bozq One System. Prefer a narrow paid pilot and manual delivery before substantial software: **discover → sell a small paid pilot → deliver manually → measure → standardize → automate only where justified**. Never present unverified brand clearance, legal status, integrations, domain delivery, or business outcomes as confirmed.

Founder previously reported that `ranel.biz.id` was purchased and a PDKI search returned an empty result/note. The active Cloudflare zone was observed during Phase 1, but that is not trademark registration, legal clearance, or website deployment.
