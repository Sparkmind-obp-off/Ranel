# Authentication and Access Control

## Initial release
A public marketing site and inquiry form do not require customer accounts. Do not add login merely to make the product appear like SaaS.

## Before accounts
Define user types, recovery, session mechanism, data ownership, and support process. Use a maintained authentication solution compatible with the chosen framework/runtime rather than inventing password/session cryptography.

## Roles
- Public visitor: read public content and submit rate-limited inquiry.
- Ranel operator: access internal records needed for their role.
- Business owner (future): access records belonging to their tenant.
- Staff (future): access permitted workflows.
- Support/admin: explicit, limited, auditable privileges.

Enforce authorization server-side on every protected read/write. Use secure session handling, CSRF protection where relevant, rate limits for sign-in/recovery, secure recovery tokens, and session revocation. Never expose secrets in logs, URLs, or analytics. Hiding a button is not authorization.

Before multi-tenant launch, test that one tenant cannot read, update, export, or delete another tenant's records through guessed IDs, filters, jobs, or exports.