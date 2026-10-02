# Environments and Cloudflare Deployment

## Environments
- Local: development and disposable/test data.
- Preview: isolated review environment with non-production data and safe credentials.
- Production: real users/data, protected configuration, controlled releases.

## Domain
Canonical domain intended: `ranel.biz.id` (founder reports it was purchased). Configure DNS/TLS through authorized accounts. Choose one canonical hostname and redirect consistently. Verify DNS, HTTPS, redirects, and certificate before launch. Never commit registrar or Cloudflare credentials.

## Deployment
Use a framework adapter/deployment method verified for the actual repository scaffold. Workers can serve server-side logic and, where supported, frontend assets. D1 is proposed only if persistence is needed. Verify compatibility and account limits before provisioning.

Keep secrets in platform secret management; separate preview/production bindings and data. Release sequence: review diff → checks/tests/build → migration test → preview deploy → smoke test/log review → confirm rollback → production deploy → verify domain/core journeys → record SHA, URL, time, and evidence. Application rollback does not automatically roll back database changes; prefer backward-compatible migrations and a tested restore/export strategy.