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

## Current status — Phase 1
- **Gate: PARTIAL. Production deployment: BLOCKED.** The public website is implemented and tested locally; inquiry cannot reach a business contact until the founder configures an approved destination.
- Existing baseline was documentation only, at `bef5456` on `main`. No framework, package manager, application, or adapter existed to preserve. Existing strategy documents remain in place.
- One lightweight Hono/TypeScript application now lives in this repository, as explicitly requested in the Phase 1 implementation prompt. See [decision log](docs/governance/decision-log.md) for the change from the older documentation-only/separate-codebase wording.
- Trademark/company clearance, product-market fit, prices, kit deliverability, demand, and business results are **not verified**.
- Kits are **in development**, not ready to buy. Systems/Supply are not available.
- No production release, live WhatsApp recipient, or customer inquiry delivery is claimed.
- [Phase 1 evidence and acceptance checklist](docs/implementation/phase-1/evidence.md).

## URLs and entry points
- Repository: https://github.com/Sparkmind-obp-off/Ranel (`main`).
- Local Pages preview: `http://localhost:3000`.
- Temporary sandbox preview: https://3000-iy1qof0t6pdsmm8bh8q31-82b888ba.sandbox.novita.ai — verified HTTP 200 for homepage/barber; not a production URL and may expire.
- Intended domain per latest prompt: `ranel.biz.id`. Its Cloudflare zone is active in the connected account, but site DNS/TLS/hosting and canonical redirects are **not verified**.
- Production URL: **none verified**. `runnel` and `ranel` Pages project lookups returned HTTP 404 in the connected account. No new project was created and no existing site was overwritten.

| Route | Purpose |
|---|---|
| `/` | Indonesian-first brand overview and Kits → Systems → Supply status |
| `/barber` | Audience, possible problem areas, three development-stage offer categories, proposed process, FAQ |
| `/barber#rencana-kit` | Jump to the proposed kit catalog |
| `/contact` | Contact availability and a read-only, unsent message draft |
| `/contact?offer=operations\|retention\|tracking` | Select a proposed kit and adapt the draft |
| `/inquiry?offer=operations\|retention\|tracking` | HTTP 303 to WhatsApp only if configuration is valid; otherwise back to contact |
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

`npm test` builds first and runs the Node test runner against the **built Pages worker** (24 tests at the recorded execution). `npm run build` writes `dist/_worker.js`, `_routes.json`, and static assets. `npm run dev` is the Vite content-development entry; it is **not** the verification environment for Cloudflare runtime bindings.

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

21 browser tests cover 320px, 390px (Chromium mobile emulation), and 1440px viewports: route rendering, overflow, metadata, assets, navigation, keyboard focus, FAQ, 404, inquiry-unconfigured state, and axe WCAG A/AA checks. `QA_BASE_URL` optionally selects another already-running preview. Screenshots are generated under `qa-artifacts/` and ignored by Git. Passing automated checks is not a full accessibility certification, physical-device test, or usability/market study.

## Inquiry configuration
**No business number was found in repository configuration.** Never infer one from GitHub or Cloudflare account identity.

| Name | Purpose |
|---|---|
| `INQUIRY_WHATSAPP_NUMBER` | Founder-approved **public business** WhatsApp destination, held in runtime configuration |
| `CLOUDFLARE_API_TOKEN` | BYOK deployment credential; never a browser variable or committed value |
| `CF_PAGES_PROJECT` | Operator's shell variable selecting the verified existing project during deployment |
| `QA_BASE_URL` | Optional browser-test origin; not production application configuration |

Local configuration: copy `.dev.vars.example` to `.dev.vars` and set the approved number there. The value must be international digits only, with country code, no `+`, spaces, or leading zero; 8–15 digits, starting 1–9. Restart the **Pages** preview after changing it. Blank/invalid configuration fails closed. Format validation does **not** prove account ownership or WhatsApp registration; the founder must verify both.

Production configuration: after verifying the correct existing Pages project, use `npx wrangler pages secret put INQUIRY_WHATSAPP_NUMBER --project-name "$CF_PAGES_PROJECT"` or the project's production secret settings. Supply the value privately, never in source, chat evidence, `wrangler.jsonc`, or a committed environment file. Set preview separately only if explicitly approved. Deploy/redeploy and verify the handoff with the real business recipient.

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
- Data model: three static proposed offer records (`id`, labels, description, draft contents) in `src/inquiry.ts`. Runtime contact configuration is separate from the catalog.
- No D1, KV, R2, database, in-memory lead store, forms, accounts, CRM, payments, booking, or messaging automation.
- Application pages have CSP, anti-framing, content-type, referrer, and permissions headers. No application cookies or personal-data logging. Platform hosting may process technical request information.

## Cloudflare BYOK deployment — existing project only
The authorized path is **`cf-byok-deploy`**, not Genspark Hosted Deploy. The skill was activated and BYOK authentication verified, but production deployment is **BLOCKED**: no matching existing Pages project was found. There is a naming conflict between the earlier `runnel.biz.id`/`runnel.page.dev` message and the newer Ranel/`ranel.biz.id` prompt. Pages default hostnames use `pages.dev`; do not invent a target or create a suffixed/new project.

When the founder identifies the exact existing project/account:
1. In Genspark, load the token from Deploy panel using `setup_cloudflare_api_key`, then run `npx wrangler whoami`. Never use `wrangler login` here.
2. Read project metadata (`cloudflare_project_name`) and list existing projects with `npx wrangler pages project list`. Confirm name, account, production branch, current domains, and permission to update that specific site. Record the verified name through `meta_info`; do not set a guessed default.
3. Set `CF_PAGES_PROJECT` to that verified existing name in the shell. Add the verified name to `wrangler.jsonc` if desired. Current config intentionally omits it to avoid mis-targeting. **Do not run `pages project create`.**
4. Stop preview, review diff/secrets, then run actual lint/typecheck/tests/build. Configure the approved inquiry secret separately as above.
5. Push reviewed commits to `origin/main`, then deploy with explicit target:
   ```sh
   npx wrangler pages deploy dist --project-name "$CF_PAGES_PROJECT" --branch main
   ```
6. Verify the actual returned deployment URL, all public routes/assets, 404, contact availability, and real WhatsApp handoff. A link test is not evidence of receipt. Persist final verified metadata and update phase evidence with SHA/time/URL.
7. Attach a custom domain **only after founder resolves the hostname conflict** and verifies account/DNS authorization. Use Pages custom-domain settings, inspect required DNS records, then verify HTTPS, certificate, and canonical redirects. An active zone alone does not establish a live site.

Rollback after a future release: use the existing Pages project's deployment history to roll back to its previous known-good deployment, or build a known-good Git revision and redeploy to the same verified project. No database rollback is needed. **Production deployment/rollback has not been exercised.**

## Known gaps and next necessary action
- Inquiry delivery: blocked until an approved business destination is configured and actually tested.
- Production project and intended hostname: founder confirmation needed; no deploy attempted to a guessed target.
- Custom-domain DNS/TLS/canonical behavior: not verified.
- Real-device Safari/Firefox testing, full manual accessibility assessment, legal/privacy operations, and 3–5 operator usability sessions: not completed.
- Kit contents, pilot pricing, support window, delivery/refund terms, and evidence of value: must be agreed later; website completion is not validation.
- `/products`, `/about`, `/terms`, and every Phase 2+ feature are intentionally not implemented or linked in this narrow release.

**Next:** identify the exact existing Cloudflare Pages project/account and resolve the intended hostname, while supplying the approved public business inquiry destination. Do not begin Phase 2.

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
