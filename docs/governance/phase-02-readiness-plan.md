# Ranel — Phase 02 Readiness Plan

Date: 2026-10-03
Status: **PHASE 02 PASS WITH ISSUES — EMAIL SOURCE PATCH COMMITTED; VERIFICATION/REDEPLOY PENDING; TAX/LEGAL/FULFILLMENT GATES OPEN**

## Objective

Turn the approved Ranel Barber price ladder into concrete product specifications and a verifiable fulfillment package without activating payment or production commerce prematurely.

## Current approved commercial baseline

| Package | Approved price | Model |
|---|---:|---|
| Ranel Barber Starter | Rp39.000 | One-time |
| Ranel Barber Growth | Rp79.000 | One-time |
| Ranel Barber System | Rp149.000 | One-time |

Currency: IDR. Price validation remains open.

## Phase 02 work completed by ChatGPT

### 1. Product identity — DECIDED
Stable product IDs and SKU baselines are defined for all three Barber packages.

### 2. Deliverables — DECIDED
Canonical bundle manifest and file naming are defined for Starter, Growth, and System.

### 3. Preparation boundary — DECIDED
Standard reusable content plus bounded business-specific tailoring. Minimum inputs are defined; private customer data and credentials are excluded.

### 4. Customer experience — DECIDED PROVISIONAL
Internal flow is:
**need/scope → selected product → approved commercial terms → verified payment → required inputs → preparation/QC → delivery → acceptance/defect handling → outcome/support record**

The preparation target is internally designed around 2 business days after verified payment and complete required inputs, but it is not a public SLA until support/terms are approved.

### 5. Commercial truth — PARTIAL
Approved prices and one-time IDR model are locked. Controlled promo and no-hidden-surcharge direction are approved; tax applicability is validation-required before live checkout.

### 6. Terms — PARTIAL / FOUNDER REVIEW
Cancellation/refund/remedy and bounded support/revision/licence direction are approved. Final legal applicability and executable fulfillment/support remain review gates; no unlimited support or new public SLA.

### 7. Deliverability evidence — SOURCE BUNDLES PRODUCED / QC PASS; REAL-WORLD FULFILLMENT NOT VALIDATED
The canonical v1.0 sources have been produced: 31 files across three bundles, opened/rendered and formula-recalculated using synthetic/QC inputs. [Per-file QC](../implementation/phase-02-commerce/product-qc.json) and [execution evidence](../implementation/phase-02-commerce/evidence.md). State is ASSET_READY_FOR_REVIEW, not Available. Buyer-specific tailoring, real customer delivery, support load and delivery economics still need a controlled pilot.

### 8. Catalog handoff — COMPLETED
Product catalog now references canonical IDs/SKUs, bundle manifests, preparation boundary, and hold state.

### 9. Commerce handoff — NOT YET AUTHORIZED
No payment, order database, checkout, webhook financial truth, refund executor, or live transaction work is authorized by Phase 02 documentation alone.

## Commercial and tax decisions

F01, F02, F04, and F05 are founder-approved. F03 base pricing/promo operating rules are decided, but tax applicability and seller tax status remain VALIDATION_REQUIRED.

## Founder review packet

See [Phase 02 Founder Review](phase-02-founder-review.md).

Historical material review list (F01/F02/F04/F05 now approved; F03 tax still validation-required):
- F01 initial market/first-sale focus;
- F02 public entry-package sequencing;
- F03 price display + fees/tax/discount rule;
- F04 cancellation/refund/remedy;
- F05 support + revisions + licence/ownership/update policy.

ChatGPT intentionally did not convert these into silent defaults because they create customer-facing commercial commitments or business-direction choices.

## Legal/commerce dependency

Before live selling to Indonesian consumers, customer-facing electronic-contract/PMSE terms must be checked against currently applicable rules. PP No. 80 Tahun 2019 remains listed as in force, while Permendag No. 19 Tahun 2026 is currently in force for PMSE and replaced Permendag No. 31 Tahun 2023. Phase 02 therefore keeps cancellation/refund/contract commitments behind founder/legal review rather than inventing a blanket policy.

## Remaining gates and next actions

1. **Immediate remediation:** run tests/build/browser QA for the founder-confirmed email + AHU identity-card source patch, then redeploy only existing PUBLIC project `ranel`. Current verified deployment remains the earlier Phase 02 release until this is confirmed. See [official email remediation handoff](../handoffs/phase-02-email-confirmation-remediation.md).
2. **Tax:** verify seller PKP/non-PKP status, product tax classification, tax-inclusive/exclusive price treatment and invoice/document requirements before checkout.
3. **Licensing / PMSE:** verify current OSS/NIB/KBLI scope and which PMSE obligations apply to the actual seller/channel model before live online sales. Do not infer coverage merely from PT existence.
4. **Product operations:** dry-run one full manual preparation using synthetic data; set a realistic delivery/support capacity and document defect/remedy handling. The internal two-business-day target is not a public SLA.
5. **Market validation:** begin lawful, permission-based discovery with Indonesian-speaking independent barber operators; record real objections, package preference and willingness to pay. Do not claim market validation from site launch or synthetic QC.
6. **Next roadmap phase:** after email patch review, start Phase 03 Commerce Model as a specification/decision phase. Do not implement payment or create production persistence as a shortcut.

Payment, order, DB, auth, DNS, billing, production credentials, checkout and live transaction gates remain closed.

## Master execution prompt

Canonical Genspark execution prompt: [Master System Prompt — Phase 02](../prompts/master-system-prompt-phase-02.md).

The prompt consolidates approved product, pricing, legal identity, support, promotion, public-page, QC, and scope-prohibition decisions. It is the execution instruction for the remaining Phase 02 work.

## Post-release email correction

Founder confirmed `farasmuhadzib@gmail.com` as the public Ranel email. Source and tests are committed; Genspark must run full verification and redeploy the existing PUBLIC app according to [email remediation handoff](../handoffs/phase-02-email-confirmation-remediation.md). Until then, the verified production deployment is still the previous Phase 02 release.

## Completion condition

Phase 02 becomes **READY FOR REVIEW** when:
- canonical product specifications are committed;
- actual promised files exist and pass QC;
- founder-review commercial decisions are recorded;
- public product facts match internal commercial truth;
- a canonical product/price/terms contract is ready for Phase 03.

Phase 02 does not authorize payment activation.