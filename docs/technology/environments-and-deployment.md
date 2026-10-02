# Environments and Cloudflare Deployment

## Current release — Phase 2, 2026-10-02

**Deployment: VERIFIED.** Project exactly **`ranel`**, production branch **`main`**, production **https://ranel.pages.dev**. The newest founder instruction authorizes creating that exact Pages project if absent; it supersedes Phase 1's earlier existing-project-only restriction. Authenticated discovery found one authorized account and no `ranel` project; creation succeeded without account switching or project-name substitution.

- Scaffold preserved: Hono + TypeScript + Vite Pages advanced-mode output in `dist/`, `_worker.js`, `_routes.json`, native static assets.
- Runtime configuration: `INQUIRY_WHATSAPP_NUMBER` is encrypted in **production**, read through `c.env`; preview contact configuration remains unset. No number inserted into application source, assets, or `wrangler.jsonc`; no new backend/database.
- Deployed application SHA: `a4915bad908268acc6df1efce4f0e2e2707e0c6a`.
- Deployment ID: `68793aeb-029c-40a1-b0e2-8b3ca55c224b`.
- Immutable URL: https://68793aeb.ranel.pages.dev.
- Cloudflare creation time: `2026-10-02T05:53:00.871959Z`; final stage `success`, environment `production`, trigger SHA verified.
- Project metadata `cloudflare_project_name` and Wrangler config both select `ranel`.

[Actual setup/QA/contact/release commands](../../README.md#cloudflare-byok-deployment) · [Phase 1B release evidence](../implementation/phase-1b-release-deployment/evidence.md) · [Original Phase 1 checkpoint](../implementation/phase-1/evidence.md).

## Reproducible BYOK workflow

1. Use `cf-byok-deploy`; in Genspark call `setup_cloudflare_api_key` before Wrangler, then `npx wrangler whoami`. Never print tokens or use `wrangler login` here. Stop if account selection is ambiguous or permissions fail.
2. Inspect Git HEAD/remote/working tree, `package.json`, Vite/Wrangler config, metadata, and `npx wrangler pages project list`. Routine redeploys target existing `ranel` only; do not create a second project.
3. First creation was executed only after absence and founder authorization were verified:
   ```sh
   npx wrangler pages project create ranel --production-branch main --compatibility-date 2025-09-20
   ```
4. Set/update `INQUIRY_WHATSAPP_NUMBER` privately via `npx wrangler pages secret put INQUIRY_WHATSAPP_NUMBER --project-name ranel`. Supply approved normalized digits through a masked prompt/secure stdin. `secret list` reveals names/encrypted status only; never dump project environment values or redirect destinations into general logs. Contact is public business information, not an API credential, but stays consistently runtime-configured.
5. Stop local preview before rebuilding. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit`; restart Pages preview through PM2, then `npm run test:e2e`. Review source/diff/secret handling and commit/push to `origin/main`.
6. Deploy reviewed built output with explicit provenance:
   ```sh
   npx wrangler pages deploy dist --project-name ranel --branch main --commit-hash "$(git rev-parse HEAD)"
   ```
7. Verify immutable URL plus production hostname, homepage/barber/contact/privacy, CSS/SVG, HTTP 404, and `/inquiry` general/all kit/unknown-topic redirects. Use `maxRedirects: 0` to check WhatsApp destination/message without contacting WhatsApp. Confirm the configured contact state and approved destination privately. A redirect is not proof of sending/receipt.
8. Run live browser QA with `QA_BASE_URL=https://ranel.pages.dev`, `QA_CONTACT_STATE=configured`, and privately exported `QA_EXPECT_WHATSAPP_NUMBER`. Compare destination without printing it. The same suite defaults to unconfigured local behavior; no automatic inference or removed tests.
9. Verify Cloudflare project/account/environment/stage/SHA without dumping secret fields. Persist metadata and record release ID/time/SHA/outcomes in evidence. Documentation-only follow-up commits are distinct from the deployed SHA.

## Custom domain — deferred, no DNS changes

This release agent performed **no DNS creation/update/deletion, custom-domain attachment, or canonical redirect**. Initial post-deploy lookup listed only `ranel.pages.dev`. A final read-only lookup at `2026-10-02T04:41:33Z` found `ranel.biz.id` added, status **active**, created `2026-10-02T04:32:09.411016Z`. The actor is unknown; the deployment ID/SHA and `pages.dev` health stayed unchanged. This is an observed concurrent state change, not custom-domain work performed by this agent. Its live DNS/TLS/redirect/browser behavior was not tested.

Optional read-only DNS-record snapshot received HTTP 403, so no before/after DNS record comparison is claimed; the release never required DNS-write privileges. Do not undo or repeat the observed attachment without a separate authorized request.

A later separately authorized task must inspect current records, ownership/account permission, Pages domain setup, certificate/HTTPS, and redirects before declaring the custom domain live. An active zone alone does not establish site routing or TLS.

## Environments and rollback

- Local: built Pages preview, no production secrets. Vite dev is for content work, not binding verification.
- Preview: separate settings; production contact not copied there automatically. The immutable **production deployment** URL is not a preview environment.
- Production: public site and approved manual WhatsApp handoff; no persistence, provider form, accounts, payments, or automation.

Rollback remains **NOT TESTED**: use `ranel` deployment history to restore a prior known-good release, or rebuild/redeploy a known-good Git revision to the same project. No database rollback is applicable. Application launch does not establish demand, kit readiness, legal clearance, or WhatsApp account registration/message delivery.

## Future approved phases only

Cloudflare D1/R2 or other services remain proposed only when actual requirements justify them. Separate environments/data, commit/test migrations, use platform secrets, review deployment diff, verify core journeys/logs, and record release evidence. Application rollback does not roll back future database changes; prefer compatible migrations and tested restore/export procedures. No such services were provisioned in Phase 1 or Phase 1B.

## Documentation sync rule

This file is the deployment runbook, while the latest deployed release provenance is authoritative in `docs/implementation/phase-2/evidence.md`. When a later release occurs, update this section in the same change set as the release evidence.
