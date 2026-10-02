# Observability and Incident Response

## Minimum observability
Application error logs with request/correlation ID; deployment/migration history; counts of successful/failed form submissions without full payloads; basic availability checks where practical; actionable alerts; private incident log.

## Logging rules
Never log passwords, tokens, API keys, session cookies, payment secrets, full form bodies, or unnecessary contact details. Sanitize user-supplied values and limit log retention/access.

## Incident procedure
1. Identify affected service, time window, and user impact.
2. Stop harm: disable route/integration or roll back.
3. Preserve relevant safe evidence.
4. Assess whether personal data, credentials, or payments were affected.
5. Notify the responsible operator and follow applicable requirements.
6. Restore service and verify core journeys.
7. Record cause, corrective action, owner, and deadline.
8. Add a regression test/control.

Document who controls Cloudflare, GitHub, registrar, and provider accounts. Enable account security/recovery. Periodically verify exports/backups can be restored. Start with platform logs and smoke tests before buying a large monitoring stack.