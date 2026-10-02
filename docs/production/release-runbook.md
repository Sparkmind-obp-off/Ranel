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
