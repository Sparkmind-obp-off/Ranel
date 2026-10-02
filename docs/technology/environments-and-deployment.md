# Environments and Cloudflare Deployment

## Phase 1 implementation update — 2026-10-02

Actual scaffold: Hono + TypeScript + Vite Cloudflare Pages adapter, npm lockfile, Wrangler Pages advanced-mode output (`dist/_worker.js` and native static assets). No database/services provisioned. Authorized deployment is **CF BYOK, existing project only**, as requested by founder. Authentication/listing was verified; production deployment is **BLOCKED** because neither `ranel` nor `runnel` exists in the connected account's Pages projects. Active `ranel.biz.id` zone is not proof of a deployed website. Earlier `runnel` vs latest `ranel` hostname conflict is pending founder confirmation.

[README actual commands, inquiry secrets, BYOK release and rollback instructions](../../README.md#cloudflare-byok-deployment--existing-project-only) · [Phase 1 evidence](../implementation/phase-1/evidence.md).

Do not create a project or deploy to an unrelated existing project. Read/persist metadata only for a verified target; current `cloudflare_project_name` is unset. Run QA before explicit `wrangler pages deploy dist --project-name <verified-existing-name> --branch main`, then verify returned URL, routes/assets, contact, and custom-domain DNS/TLS. No `wrangler login` in Genspark. Stop Pages preview before rebuilding to avoid observing `_routes.json` mid-write. Production deployment and rollback have not been run.

The broader principles below remain guidance for later approved phases, not evidence of services implemented now.

## Environments
- Local: development and disposable/test data.
- Preview: isolated review environment with non-production data and safe credentials.
- Production: real users/data, protected configuration, controlled releases.

## Domain
Canonical domain intended: `ranel.biz.id` (founder reports it was purchased). Configure DNS/TLS through authorized accounts. Choose one canonical hostname and redirect consistently. Verify DNS, HTTPS, redirects, and certificate before launch. Never commit registrar or Cloudflare credentials.

## Deployment
Use a framework adapter/deployment method verified for the actual repository scaffold. Workers can serve server-side logic and, where supported, frontend assets. D1 is proposed only if persistence is needed. Verify compatibility and account limits before provisioning.

Keep secrets in platform secret management; separate preview/production bindings and data. Release sequence: review diff → checks/tests/build → migration test → preview deploy → smoke test/log review → confirm rollback → production deploy → verify domain/core journeys → record SHA, URL, time, and evidence. Application rollback does not automatically roll back database changes; prefer backward-compatible migrations and a tested restore/export strategy.