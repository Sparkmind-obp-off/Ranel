# Ranel — Phase 02 Product Definition

Date: 2026-10-03
Status: **IN PROGRESS — PRODUCT DEFINITION DECIDED; MATERIAL COMMERCIAL TERMS PENDING FOUNDER REVIEW**

## 1. Purpose

Turn the founder-approved price ladder into concrete product specifications that can be prepared, versioned, quality-checked, and later connected to commerce.

This document is the canonical Phase 02 product-definition decision record. It does not activate payment, create orders, change financial truth, publish legal terms, or authorize live transactions.

## 2. Decisions made by ChatGPT

### P01 — Canonical product identity

Use stable product IDs and SKU-style identifiers:

| Product | Product ID | SKU | Version baseline | Current state |
|---|---|---|---|---|
| Ranel Barber Starter | `ranel.barber.starter` | `RBS-STARTER-001` | 1.0 | SPEC_DEFINED / PILOT |
| Ranel Barber Growth | `ranel.barber.growth` | `RBS-GROWTH-001` | 1.0 | SPEC_DEFINED / PILOT |
| Ranel Barber System | `ranel.barber.system` | `RBS-SYSTEM-001` | 1.0 | SPEC_DEFINED / PILOT |

The product ID is stable. The SKU identifies the current sellable packaging revision. A substantive packaging change creates a new SKU or version according to the later product registry.

### P02 — Product ladder

Keep the current ladder:

**Starter → Growth → System**

The value progression is:

**Foundation → Measurement & Retention → Operating System**

Do not turn the ladder into software subscriptions. Higher price must correspond to additional concrete deliverables and bounded work.

### P03 — Canonical file packaging

Use a predictable bundle structure for every product:

`/Ranel-Barber-<Product>-v1.0/`

Required top-level files:

**Starter**
1. `00-README.pdf`
2. `01-SOP-Dasar.docx`
3. `02-Menu-dan-Daftar-Harga.docx`
4. `03-Checklist-Buka-Tutup.docx`
5. `04-Follow-Up-Pelanggan-Berizin.docx`
6. `MANIFEST.md`

**Growth**
1. Everything in Starter
2. `05-Rekap-Kunjungan.xlsx`
3. `06-Tracker-Repeat-Visit.xlsx`
4. `07-Review-Bulanan.docx`
5. `08-Panduan-Follow-Up-dan-Review.docx`
6. `MANIFEST.md`

**System**
1. Everything in Growth
2. `09-Peta-Operating-System.docx`
3. `10-Peta-Customer-Journey.docx`
4. `11-Peta-Retention-dan-Proses.docx`
5. `12-Owner-Review-Framework.docx`
6. `13-Prioritas-Implementasi.docx`
7. `MANIFEST.md`

The bundle is the canonical delivery unit; individual files are components, not separate products.

### P04 — Standard versus tailored preparation

Default fulfillment is **standard template + bounded business-specific tailoring**.

Standard content must remain reusable and version-controlled.

Permitted tailoring:
- business name and basic identity fields;
- service names and approved customer-provided prices;
- operating days/hours;
- existing contact channel supplied by the buyer;
- simple local wording;
- optional logo/brand asset supplied by the buyer.

Out of scope:
- new custom software;
- building a new CRM/POS/booking system;
- legal drafting or legal advice;
- unbounded consulting;
- importing private customer databases;
- designing a new business model from scratch;
- inventing performance claims or case-study results.

### P05 — Minimum required buyer inputs

Only collect inputs required to prepare the selected product:

- business/shop name;
- service/menu list;
- current business prices;
- normal operating days/hours;
- preferred customer-contact channel;
- optional logo/brand asset;
- for Growth/System, any operational fields required by the selected workbook/map.

Do not request customer-level data, passwords, payment credentials, or unrelated personal information.

### P06 — Delivery structure

Prepare a versioned bundle, run the product QC checklist, then deliver through an agreed manual channel.

Internal target: the preparation queue should be designed so a complete standard/tailored package can normally be prepared within **2 business days after verified payment and receipt of required inputs**.

The 2-business-day target is an internal operating target, not a public SLA until the founder-approved support/terms policy exists.

### P07 — Acceptance definition

Acceptance means the buyer can:
1. receive the promised bundle;
2. open the listed files with the stated software/file requirements;
3. see that the bundle matches the manifest;
4. use the core checklist/template workflow.

A business result, revenue increase, customer-growth result, or retention increase is **not** an acceptance criterion.

Defects are limited to missing/corrupt/inaccessible files or material mismatch against the agreed product scope. Out-of-scope requests are commercial change requests, not product defects.

### P08 — Version and quality control

Every delivered bundle must contain:
- product name;
- product ID/SKU;
- version;
- included-file manifest;
- preparation date;
- basic usage instructions;
- visible statement that the package is a practical operating aid, not a guarantee of business results.

Before delivery:
- open/test every file;
- check formulas using sample inputs for spreadsheets;
- check links where applicable;
- remove private/demo data;
- compare delivery contents against the canonical manifest.

### P09 — Product availability state

Until all applicable commercial terms are founder-approved and the fulfillment path is executable:

**SELL_STATE = HOLD_PENDING_TERMS**

The product can be described internally as **SPEC_DEFINED / PILOT**, but must not be represented as fully Available merely because a product specification exists.

## 3. Product scope decisions

### Starter — Rp39.000

Purpose: give an operator a simple documented daily operating foundation.

Core use:
- understand the basic routine;
- standardize opening/closing;
- present services/prices consistently;
- use a permission-based repeat-customer follow-up routine.

No software account, automation, dashboard, POS, booking, CRM, loyalty engine, or hosted database.

### Growth — Rp79.000

Purpose: add lightweight measurement and repeat-visit discipline.

Core use:
- record visits/summary information;
- identify repeat-visit patterns;
- maintain a manual follow-up workflow;
- conduct a simple monthly review.

The spreadsheets are operational worksheets, not a hosted CRM.

### System — Rp149.000

Purpose: map the operator's broader workflow before software investment.

Core use:
- map current operating system;
- map customer journey;
- map retention/process flow;
- review owner responsibilities;
- prioritize practical next improvements.

It is a prepared operating-system package, not a software system.

## 4. Decisions intentionally not made by ChatGPT

These are material founder decisions and remain **FOUNDER_REVIEW**:

- first-sale market/geography and exact primary microsegment;
- whether Starter is the public default entry offer for the initial test;
- tax/fee disclosure and whether listed prices are tax-inclusive;
- discount/promotion authority and calculation;
- cancellation policy;
- refund/remedy policy;
- support response policy and included revision allowance;
- licence, resale/redistribution, ownership and update entitlement.

The product specifications above are designed so those decisions can be inserted without redesigning the package architecture.

## 5. Current legal/commerce note

For Indonesian PMSE, current regulation must be reflected in the final customer terms before live selling. PP No. 80 Tahun 2019 remains listed as in force, and it addresses digital goods/services, cancellation/exchange periods and mechanisms for returning consumer funds. Permendag No. 19 Tahun 2026 is currently in force and replaced Permendag No. 31 Tahun 2023 for PMSE. This document therefore does not hard-code a refund/cancellation policy before the applicable legal/terms review.

## 6. Phase 02 completion condition

Phase 02 can reach **READY FOR REVIEW** when:
- product IDs/SKUs and manifests are frozen;
- all promised source files are actually produced and pass QC;
- the founder-review commercial decisions are recorded;
- public product facts match the internal product specification;
- commerce receives one canonical product/price/terms contract.

Phase 02 does not authorize payment activation.