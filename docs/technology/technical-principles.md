# Ranel — Technical Principles

## Current status
Ranel is currently a business and product strategy/documentation project. This repository does not contain a production application. No integration or security control should be assumed to exist merely because it is described here.

## Build-versus-buy
Use the simplest reliable method: manual workflow, existing spreadsheet/tool, no-code configuration, small custom application, and only later a broader platform if evidence supports it.

## Future system principles
- Solve one workflow before generalizing.
- Keep business rules explicit and testable.
- Separate customer/tenant data.
- Use role-based access and least privilege.
- Use managed authentication.
- Validate inputs server-side.
- Keep secrets out of source control and client bundles.
- Use migrations and backups for persistent data.
- Provide export and deletion paths where appropriate.
- Log operational events without unnecessary personal data.
- Design for failure, retries, and manual fallback.
- Document limits, dependencies, and recovery steps.

## Integrations
Before implementing an integration, confirm demand, official API availability and terms, required plan/cost, data permissions, rate limits, failure behavior, support ownership, and manual fallback. Do not promise an integration until implemented and tested in the relevant environment.

## Release gate
Requirements and acceptance criteria written; critical business rules tested; access control reviewed; secrets/dependency risks checked; backup/recovery documented; monitoring and rollback understood; limitations and support documented.
