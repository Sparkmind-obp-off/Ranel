# Ranel — Data Governance & Retention

**Status:** LOCKED baseline; concrete retention values activate when persistence is introduced.

## 1. Data classes

### Public
Published product and content information intended for visitors.

### Operational
Business records needed to run Ranel: leads, offers, pilots, orders, support records, and internal decisions.

### Sensitive operational
Credentials, payment-related secrets, private exports, recovery material, and highly restricted internal records.

Never store credentials or secret values in ordinary business tables.

## 2. Data minimization

For every stored field define:
- purpose;
- source;
- lawful/authorized basis;
- owner;
- access scope;
- retention period;
- deletion/export behavior.

Do not collect a field merely because it may be useful later.

## 3. Consent separation

Keep service/contact consent, marketing consent, and case-study/testimonial permission as separate concepts.

Withdrawal of marketing permission must not erase required transactional records automatically.

## 4. Access

Use least privilege:
- public content is public;
- internal records require authenticated access;
- sensitive operational data requires explicit permission;
- support/admin access is limited and auditable.

UI hiding is never an authorization control.

## 5. Storage

When persistence is introduced:
- separate environments;
- use provider-supported encryption;
- use parameterized queries;
- avoid raw payment-card storage;
- protect backups/exports;
- test restoration.

## 6. Retention lifecycle

Every dataset follows:
**collect → use → retain → review → delete/anonymize/export**.

Default to the shortest practical retention period consistent with business and legal purpose. Exact periods must be chosen for the real data and applicable obligations.

## 7. Export and deletion

Provide an operator process to:
- export required records;
- correct inaccurate data;
- delete/anonymize when appropriate;
- revoke access;
- document completion.

Exports containing personal or business data are controlled artifacts and must not enter Git.

## 8. Logging

Never log:
- passwords;
- API keys/tokens;
- session cookies;
- payment secrets;
- full sensitive payloads.

Prefer correlation IDs and minimal event metadata.

## 9. Third-party sharing

Before sending data to a provider document:
- provider;
- purpose;
- fields shared;
- legal/contractual basis as applicable;
- retention;
- location/region where relevant;
- security control;
- removal/exit method.

## 10. Incident trigger

Unauthorized access, accidental exposure, data loss, or incorrect deletion triggers incident handling and evidence preservation under the incident runbook.
