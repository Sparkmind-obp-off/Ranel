# Data Model and Database

**Status:** conceptual model, not a deployed schema or migration.

Do not create a database for a static marketing site unless a workflow needs persistence. If D1 is selected, commit migrations and access rules before storing production data.

## Current Commerce Phase 03 specialization

[Commerce Model](commerce-model.md) is the current specification for product releases/offers/channels, immutable order snapshots, items/attempts/payments/notification vs commercial receipts, reconciliation/refunds/fulfillment/support/audit/idempotency and orthogonal lifecycle rules. It specializes the generic candidates below; neither is a schema or authorization to create storage. Initial money convention is integer whole-rupiah IDR/exponent0 with provider-conversion tests, not an implicit 100× scaling. Minimum fields/retention/access remain evidence-gated.

## Candidate entities
- **Lead:** id, name if needed, contact method/value, business type, bounded request summary, contact-consent timestamp, separate marketing-consent timestamp, optional source, status, timestamps.
- **Offer:** id, slug, title, description, draft/available/retired status, price/currency only when set, delivery method, timestamps.
- **Pilot:** id, offer/customer reference, status, agreed scope, dates, success criteria, restricted delivery notes, timestamps.
- **Audit event:** actor, action, entity type/id, timestamp, minimal safe metadata. Never store secrets or sensitive payloads.
- **Future tenant records:** explicit business membership and tenant scope on every tenant-owned record.

Use keys and constraints; store timestamps consistently in UTC and money as integer minor units plus currency. Document status transitions, retention, deletion/export. Index real query paths. Test migrations from clean and representative databases; make destructive changes explicit.