# Ranel — Phase 02 Product Production Execution Handoff

Date: 2026-10-03
Status: **READY FOR EXECUTION — PRODUCT ASSETS ONLY**

## Authority

ChatGPT has decided the product-definition details that are reversible and within product/operational scope.

Founder review remains pending for material commercial/customer-policy decisions in `docs/governance/phase-02-founder-review.md`.

## Objective

Produce the actual Ranel Barber product source assets that match the canonical Phase 02 specification and make their deliverability independently verifiable.

Canonical inputs:
- `docs/products/phase-02-product-definition.md`
- `docs/products/product-catalog.md`
- `docs/governance/phase-02-readiness-plan.md`

## Required output

Produce source assets for:

### Starter
- `00-README.pdf`
- `01-SOP-Dasar.docx`
- `02-Menu-dan-Daftar-Harga.docx`
- `03-Checklist-Buka-Tutup.docx`
- `04-Follow-Up-Pelanggan-Berizin.docx`
- `MANIFEST.md`

### Growth
Starter assets plus:
- `05-Rekap-Kunjungan.xlsx`
- `06-Tracker-Repeat-Visit.xlsx`
- `07-Review-Bulanan.docx`
- `08-Panduan-Follow-Up-dan-Review.docx`
- updated `MANIFEST.md`

### System
Growth assets plus:
- `09-Peta-Operating-System.docx`
- `10-Peta-Customer-Journey.docx`
- `11-Peta-Retention-dan-Proses.docx`
- `12-Owner-Review-Framework.docx`
- `13-Prioritas-Implementasi.docx`
- updated `MANIFEST.md`

## Content rules

The assets must:
- be practical for Indonesian barber operators;
- use plain Bahasa Indonesia;
- be concise enough to use in daily operations;
- use synthetic/demo data only;
- avoid any real customer personal data;
- avoid medical, legal, tax, or financial advice claims;
- avoid guaranteed revenue/growth/retention outcomes;
- keep formulas simple and auditable;
- clearly distinguish templates from completed business data.

## Tailoring rules

Create templates with clearly marked placeholders for:
- business name;
- services/prices;
- operating days/hours;
- contact channel;
- optional logo.

Do not invent a customer's real business data. Do not request payment credentials, passwords, or customer databases.

## QC requirements

For every artifact:
1. File opens successfully.
2. Filename matches the canonical manifest.
3. Version is `1.0`.
4. Product ID/SKU is present where appropriate.
5. No broken references or placeholder leakage that would make the template misleading.
6. PDF text/layout is readable.
7. DOCX tables/checklists remain editable.
8. XLSX formulas calculate correctly with sample inputs.
9. Sample inputs are synthetic and clearly marked.
10. Bundle contents match the manifest exactly.

Create an evidence record containing:
- generated file list;
- file type;
- version;
- QC result;
- known limitations;
- any item not produced and why.

## Scope prohibition

Do NOT:
- activate Duitku;
- validate or install production credentials;
- create orders/payments/refunds;
- add payment/checkout/webhook logic;
- create or migrate a production database;
- deploy Core/Control;
- change DNS/billing/Cloudflare plans;
- introduce authentication;
- create customer accounts;
- import real customer data;
- mark any product `Available` solely because files were created.

The resulting state should be **ASSET_READY_FOR_REVIEW**, not payment-ready.

## Handoff gate

After execution, report:
- exact commit SHA;
- exact produced asset paths;
- QC results;
- gaps/blockers;
- whether every promised deliverable is actually present.

Then ChatGPT will review the output and issue the next decision package.