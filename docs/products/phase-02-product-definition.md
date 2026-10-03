# Ranel — Phase 02 Product Definition

Date: 2026-10-03
Status: **PRODUCT_READY_FOR_COMMERCE_INTEGRATION — STANDARD SELF-SERVICE ASSETS/ZIP/PREVIEWS QC PASS; SALE HOLD_PENDING_COMMERCE; PAYMENT/SECURE DELIVERY INACTIVE**

Current founder instruction (Product Maturation, 2026-10-03) supersedes the prior bounded-tailoring delivery model: all three approved products are standard digital kits that the buyer fills in, without founder customization included in price. Product IDs/SKUs/version1.0/prices/file hierarchy remain unchanged. Revision `self-service-maturation-2026-10-03` is hash-distinguished from historical v1.0 sources; no delivered customer release is claimed. Prior Phase02/03 evidence remains historical, not rewritten.

## 1. Purpose

Turn the founder-approved price ladder into concrete product specifications that can be prepared, versioned, quality-checked, and later connected to commerce.

This document is the canonical Phase 02 product-definition decision record. It does not activate payment, create orders, change financial truth, publish legal terms, or authorize live transactions.

## 2. Decisions made by ChatGPT

### P01 — Canonical product identity

Use stable product IDs and SKU-style identifiers:

| Product | Product ID | SKU | Version baseline | Current state |
|---|---|---|---|---|
| Ranel Barber Starter | `ranel.barber.starter` | `RBS-STARTER-001` | 1.0 | CONTENT_READY / SALE_HOLD |
| Ranel Barber Growth | `ranel.barber.growth` | `RBS-GROWTH-001` | 1.0 | CONTENT_READY / SALE_HOLD |
| Ranel Barber System | `ranel.barber.system` | `RBS-SYSTEM-001` | 1.0 | CONTENT_READY / SALE_HOLD |

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

### P04 — Standard self-service product

Current fulfillment contract: **one complete standard ZIP; buyer copies/fills/uses templates independently**. No founder tailoring, data-entry service or custom preparation is included in listed prices. Previous bounded-tailoring model is superseded by the latest user instruction.

Buyer may edit their own copy: business name, menu/services/prices, days/hours, contact, local wording and optional logo. Instructions/examples/blank worksheets are supplied; no need to send these inputs to Ranel. Standard reusable content and versioning are preserved.

Out of scope:
- new custom software;
- building a new CRM/POS/booking system;
- legal drafting or legal advice;
- unbounded consulting;
- importing private customer databases;
- designing a new business model from scratch;
- inventing performance claims or case-study results.

### P05 — Minimum required buyer inputs

The buyer fills these only in their own local files, as relevant to the selected product; Ranel does not require collecting them to customize the kit:

- business/shop name;
- service/menu list;
- current business prices;
- normal operating days/hours;
- preferred customer-contact channel;
- optional logo/brand asset;
- for Growth/System, any operational fields required by the selected workbook/map.

Do not request customer-level data, passwords, payment credentials, or unrelated personal information.

### P06 — Delivery structure

Delivery unit: `Ranel-Barber-{Starter,Growth,System}-v1.0.zip`, containing the exact corresponding product folder/files, quick-start PDF and MANIFEST.md with component hashes. No dependency on a founder preparation queue.

Future journey: product facts → actual checkout → verified payment → recipient-bound private ZIP download → extract/copy/fill/use. Checkout, payment verification, entitlement/storage and secure delivery must be implemented/tested separately; not operational now. Previous internal 2-business-day tailoring target is historical, not a promise or prerequisite for these standard products.

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

**SELL_STATE = HOLD_PENDING_COMMERCE**

Content readiness is independently **PRODUCT_READY_FOR_COMMERCE_INTEGRATION** only after source, render/formula, ZIP/extraction/manifest/hash and preview QC. Availability still requires a working purchasing/private-delivery path, commercial/legal/tax/support prerequisites and release verification.

The product can be described internally as **CONTENT_READY / SALE_HOLD**, but must not be represented as fully Available merely because a product specification exists.

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

## 4. Founder-approved commercial decisions

F01, F02, F04, and F05 are approved as recorded in the Founder Review Packet. F03 operational promotion rules are decided with a 40% maximum controlled promo-code discount; tax applicability remains validation-required.

## 5. Decisions intentionally not made by ChatGPT

Historical review list below is superseded by the 2026-10-03 Founder Review Packet and master execution prompt: F01/F02/F04/F05 and base pricing/promo are approved. Tax applicability and final legal/live fulfillment readiness remain validation gates; do not reopen settled directions. Historical items:

- first-sale market/geography and exact primary microsegment;
- whether Starter is the public default entry offer for the initial test;
- tax/fee disclosure and whether listed prices are tax-inclusive;
- discount/promotion authority and calculation;
- cancellation policy;
- refund/remedy policy;
- support response policy and included revision allowance;
- licence, resale/redistribution, ownership and update entitlement.

The product specifications above are designed so those decisions can be inserted without redesigning the package architecture.

## 6. Current legal/commerce note

For Indonesian PMSE, current regulation must be reflected in the final customer terms before live selling. PP No. 80 Tahun 2019 remains listed as in force, and it addresses digital goods/services, cancellation/exchange periods and mechanisms for returning consumer funds. Permendag No. 19 Tahun 2026 is currently in force and replaced Permendag No. 31 Tahun 2023 for PMSE. This document therefore does not hard-code a refund/cancellation policy before the applicable legal/terms review.

## 7. Phase 02 completion condition

Phase 02 can reach **READY FOR REVIEW** when:
- product IDs/SKUs and manifests are frozen;
- all promised source files are actually produced and pass QC;
- the founder-review commercial decisions are recorded;
- public product facts match the internal product specification;
- commerce receives one canonical product/price/terms contract.

Phase 02 does not authorize payment activation.

## 8. Produced v1.0 assets

Historical Phase02 sources remain under `products/Ranel-Barber-*-v1.0/` with [original QC](../implementation/phase-02-commerce/product-qc.json) and [historical evidence](../implementation/phase-02-commerce/evidence.md). Repository visibility is PUBLIC; these earlier sources are already in Git history and not confidential.

Current matured sources live at Git-ignored `private-products/Ranel-Barber-*-v1.0/`; private release ZIPs at `private-products/releases/`. [Current registry](../../products/registry.json) contains metadata/file list/hash/state only, never contents. [Maturation QC](product-maturation-qc.json) and [current evidence](../implementation/product-maturation/evidence.md) record complete 31-file, three-ZIP, actual cropped-preview verification. New sources/ZIPs are not in Git, build or PUBLIC download routes. Current content ready, sale hold; no payment or secure-delivery claim.