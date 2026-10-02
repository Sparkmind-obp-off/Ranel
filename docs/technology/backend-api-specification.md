# Backend and API Specification

The backend is the trusted boundary for validation, authorization, business rules, persistence, provider callbacks, and audit events. The frontend must not enforce permissions or pricing alone.

## API conventions
- Use versioned routes when a stable external API is introduced (e.g. `/api/v1`).
- Return consistent errors with a stable code and safe message.
- Validate body, query/path parameters, content type, and payload size.
- Use appropriate status codes; never expose stack traces or raw database errors.
- Paginate/bound list endpoints and rate-limit public forms/authentication/sensitive routes.

## Initial contact form
Proposed endpoint: `POST /api/contact` or equivalent server action. Collect only information needed to respond. Capture contact consent separately from optional marketing consent. Validate/normalize server-side, apply spam controls, avoid logging full message/contact details, and return a safe generic success response.

## Protected endpoints
Define actor/permission, input schema, domain rule, data scope, audit requirement, idempotency behavior, and authorized/unauthorized tests before implementation.

## Security
Use parameterized queries; check ownership/tenant scope on every record access; do not trust browser-supplied tenant IDs; apply CSRF protections where relevant; verify webhook signatures/freshness; store secrets in platform secret management, never in source code.
