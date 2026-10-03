# Ranel — Commercial & Legal Page Architecture

Date: 2026-10-03
Status: **DECIDED STRUCTURE — LEGAL/TAX APPLICABILITY VALIDATION REQUIRED BEFORE LIVE SALE**

## Purpose

Create a clear customer-facing information structure for pricing, terms, refund/remedy, privacy, licensing, and complaints without publishing unsupported legal claims.

## Recommended public structure

### /legal
Legal & policies hub. Links to all customer-facing policies and identifies the version/update date of each policy.

### /legal/terms
Terms of Service / Terms of Sale:
- who Ranel is / seller identity;
- product description and scope;
- price and currency;
- order/agreement formation;
- payment requirements;
- preparation/delivery;
- customer responsibilities;
- support boundaries;
- intellectual-property/licence terms;
- cancellation/refund/remedy rules;
- complaint and dispute route;
- changes/versioning;
- applicable law where appropriate.

### /legal/refund-policy
Refund, cancellation & remedy:
- how to submit a request;
- order/reference information required;
- non-delivery;
- missing/corrupt/inaccessible files;
- material mismatch with agreed scope;
- duplicate/incorrect payment;
- customer-requested cancellation/change;
- remedy options;
- refund decision/execution record;
- statutory-rights preservation;
- escalation path.

Do not publish a blanket “no refund” rule. Do not promise automatic full refunds for every circumstance.

### /legal/pricing-payment
Pricing & Payment:
- base prices: Starter Rp39.000, Growth Rp79.000, System Rp149.000;
- one-time IDR model;
- promo-code rules;
- whether any payment/provider fee is absorbed or separately charged;
- applicable tax treatment once seller tax status is verified;
- final payable amount shown before payment.

### /legal/privacy
Privacy / Personal Data:
- data categories collected;
- purpose and legal basis;
- minimum-data principle;
- third-party processing;
- retention/deletion;
- data-subject contact mechanism;
- customer data handling for support and fulfillment.

The current privacy page is only a Phase 01 website disclosure. It must be upgraded before real customer/order data is collected.

### /legal/license
Product licence:
- buyer may use purchased templates for its own business;
- no resale, sublicensing, public redistribution, or repackaging of Ranel templates;
- buyer retains rights to its own business information;
- reusable Ranel template/IP remains Ranel's unless a later written agreement says otherwise;
- updates/revisions are governed by the product's published terms.

Trademark registration is not claimed by this policy.

### /legal/complaints
Customer complaints & support:
- support channel;
- complaint submission procedure;
- required transaction reference;
- acknowledgement/response target;
- escalation;
- refund/remedy route;
- privacy note.

Primary support channel decision: **1:1 WhatsApp**. Formal complaint/refund handling should use an official email when an official mailbox exists. Do not publish an unconfigured/fake address.

## Support/community architecture

### Primary — 1:1 WhatsApp
Use for:
- pre-sale questions;
- product-specific support;
- delivery coordination;
- refund/complaint intake.

Reason: lowest friction for the initial Indonesian barber operator market and already consistent with the current Ranel inquiry flow.

### Secondary — Official email
Use for:
- formal complaints;
- refund documentation;
- licence/IP questions;
- records that should not live only in chat.

The address must be real and controlled before publication.

### Future community — WhatsApp Community or Group
Use only later for:
- product education;
- release/update announcements;
- shared tips;
- optional community discussion.

Community is not the support system. Order/payment/refund/customer-specific information must stay in private channels.

### Not primary for support
Discord, Telegram, Facebook Groups, and Instagram DMs can support community/discovery later, but adding them now would fragment support and create extra retention/permission work.

## Regulatory basis checked

- PP No. 80 Tahun 2019 remains listed as in force.
- Permendag No. 19 Tahun 2026 is in force from 8 June 2026 and replaced Permendag No. 31 Tahun 2023.
- Current Kemendag guidance states PMSE involves online commerce including e-commerce and digital platforms; its current FAQ also describes business-permit requirements for relevant PMSE actors.
- Permendag 19/2026 addresses complaint mechanisms and transparent information; applicability depends on the exact role/model of the Ranel business.
- UU No. 27 Tahun 2022 on Personal Data Protection is in force and requires transparent, purpose-limited and secure processing of personal data.

Sources:
- PP No. 80 Tahun 2019 — JDIH Kemendag: https://jdih.kemendag.go.id/peraturan/download/2599/2
- Permendag No. 19 Tahun 2026 — JDIH/BPK: https://peraturan.bpk.go.id/Details/351720/permendag-no-19-tahun-2026
- Permendag No. 19 Tahun 2026 — JDIH Kemendag PDF: https://jdih.kemendag.go.id/pdf/Regulasi/2026/PERMENDAG%2019%20TAHUN%202026.pdf
- Kemendag PMSE FAQ: https://ditjenpdn.kemendag.go.id/index.php/faq
- UU No. 27 Tahun 2022 — JDIH Kemkomdigi: https://jdih.komdigi.go.id/produk_hukum/view/id/832/t/undangundang%20nomor%2027%20tahun%202022

## Tax applicability rule

Do not hard-code “PPN 11%” as a universal Ranel tax rate.

Current DJP guidance states:
- nominal PPN is 12%;
- for non-luxury transactions subject to the relevant mechanism, DPP 11/12 produces an effective 11%;
- an entrepreneur generally must register as PKP when annual gross turnover exceeds Rp4.8 billion, while a smaller entrepreneur may voluntarily register as PKP.

Therefore the checkout specification must contain a tax-policy slot rather than assume applicability.

Required pre-live validation:
1. confirm Ranel seller legal/tax identity;
2. confirm PKP/non-PKP status;
3. confirm classification of each product/transaction for PPN purposes;
4. determine whether listed prices are tax-inclusive;
5. implement invoice/tax-document treatment accordingly.

Until this validation is complete:
- no production tax amount is hard-coded;
- no claim that Ranel is PKP is published;
- no tax line is fabricated.

## Status

**DECIDED:** page structure, support channel architecture, no-hidden-fee principle, controlled promo policy.

**VALIDATION_REQUIRED:** seller licensing/PMSE role, PKP status, exact tax classification/treatment, final legal wording, official support email, and any mandatory regulatory contact blocks applicable to Ranel's final business model.
