# Ranel — Phase 02 Commercial Policy & Legal UI Handoff

Date: 2026-10-03
Status: **READY FOR EXECUTION — PUBLIC INFORMATION ARCHITECTURE ONLY**

## Objective

Prepare the PUBLIC layer for accurate commercial/legal information without activating checkout, payment, order persistence, or live sales.

## Canonical inputs

- `docs/products/phase-02-product-definition.md`
- `docs/products/product-catalog.md`
- `docs/governance/phase-02-founder-review.md`
- `docs/business/promotion-policy.md`
- `docs/legal/commercial-legal-page-architecture.md`

## Required public navigation

Add a clear footer/legal navigation group:

**Legal & Policies**
- Terms
- Pricing & Payment
- Refund & Cancellation
- Privacy
- Product Licence
- Complaints & Support

Add a visible link to **Legal & Policies** from relevant product/purchase/inquiry surfaces.

## Page states

Until legal/tax applicability is verified, the pages must not claim:
- Ranel is PKP;
- a specific PPN amount applies to every buyer;
- a registered trademark;
- that payment is currently available;
- that refunds are automatic in every circumstance;
- an official support email that has not been configured.

The pages may state the approved product prices and the controlled promo-code policy.

## Pricing page requirements

Show:
- Starter Rp39.000;
- Growth Rp79.000;
- System Rp149.000;
- one-time IDR model;
- no default discount;
- promo codes are controlled and may have product/date/redemption restrictions;
- no hidden surcharge by default;
- final payable amount will be shown before payment when checkout is enabled.

Tax block:
- use neutral wording such as "Pajak yang berlaku akan dihitung/ditampilkan sesuai status perpajakan dan ketentuan yang berlaku";
- do not hard-code 11% or 12% as a universal Ranel tax rate before validation.

## Refund page requirements

Explain:
- how customers can submit cancellation/refund/remedy requests;
- required order/reference evidence once an order system exists;
- non-delivery;
- corrupt/missing/inaccessible file;
- material mismatch with agreed scope;
- duplicate/incorrect payment;
- customer-requested cancellation/change;
- remedy-first handling where appropriate;
- applicable statutory rights are preserved;
- exact operational timeframes only after they are approved and can actually be met.

Do not publish "no refund" as a blanket rule.

## Terms page requirements

Include:
- seller/business identity once verified;
- product scope and exclusions;
- pricing;
- agreement/order formation;
- payment;
- preparation/delivery;
- customer responsibilities;
- support/revision boundaries;
- licence/IP;
- cancellation/refund/remedy;
- complaints/dispute mechanism;
- changes/versioning.

## Privacy page requirements

The current `/privacy` page is an early website disclosure. Keep it accurate for the present implementation, but prepare the structure for:
- actual order/customer data;
- purposes and lawful basis;
- third-party providers;
- retention/deletion;
- data-subject rights;
- support/refund records.

Do not collect new data merely to populate the policy.

## Complaints page requirements

Provide:
- primary 1:1 WhatsApp support path;
- official email placeholder/state until configured;
- complaint procedure;
- expected acknowledgement/response target once approved;
- escalation path;
- refund/remedy link;
- privacy reminder.

When the final business role is confirmed, add any mandatory government consumer-complaint contact blocks applicable to Ranel.

## Licence page requirements

State:
- buyer's use is limited to its own business;
- no resale/redistribution/repackaging of Ranel templates;
- buyer retains rights in buyer-supplied business information;
- reusable Ranel template/IP remains Ranel's unless another written agreement applies;
- update/revision rules are product-specific.

Do not claim trademark registration.

## UI / UX rule

Keep these pages simple and readable. No popups or dark patterns. Use plain Bahasa Indonesia, effective-date labels, and visible links from the footer.

## Scope prohibition

Do NOT:
- enable payment/checkout;
- add production keys;
- create order/payment/refund persistence;
- activate promo-code redemption;
- implement financial calculations beyond read-only displayed policy facts;
- publish unverified tax or legal claims;
- claim legal compliance has been independently certified.

## Verification

After implementation, verify:
- each route returns expected status;
- footer links are reachable from mobile and desktop;
- current approved prices match canonical product catalog;
- no stale "harga dibahas" copy remains on customer-facing surfaces where approved prices are shown;
- no unsupported tax rate appears;
- no false "available now" or "checkout" state appears;
- privacy content matches actual data handling.

Report exact commit, routes, and verification evidence.