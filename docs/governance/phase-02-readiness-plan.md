# Ranel — Phase 02 Readiness Plan

Date: 2026-10-03
Status: PREPARED — execution starts only after the applicable Phase 01 business choices are approved.

## Objective
Turn one approved Ranel Barber Starter candidate into a concrete, sale-ready product definition without activating payment or production commerce prematurely.

## Execution order
1. Product identity — Product ID, SKU, canonical name, version and availability state.
2. Deliverables — exact PDF/editable files, structure, required inputs, compatibility and versioning.
3. Preparation boundary — define what is standard, what is manually tailored, and what is out of scope.
4. Customer experience — inquiry → agreement → payment requirement → preparation → delivery → acceptance/defect path.
5. Commercial truth — approved price, currency, fee/tax treatment, discount rules and payable amount calculation.
6. Terms — cancellation, refund/remedy, support, licence, revisions and updates.
7. Evidence of deliverability — ensure the actual files can be produced and delivered within the promised boundary.
8. Catalog handoff — update the public product representation only after the commercial truth is internally consistent.
9. Commerce handoff — provide the exact product/price/terms contract to the later commerce phases; do not implement payment merely because the product is defined.

## Required Phase 02 outputs
- canonical product specification
- approved SKU/product identifier
- approved price/currency/payable rules
- product contents/version manifest
- delivery/support/acceptance rules
- cancellation/refund/remedy policy
- licence/ownership/update/revision policy
- customer-facing product facts suitable for later PUBLIC copy
- evidence checklist showing every promised deliverable is actually available
- Phase 02 decision record and explicit gate result

## Non-goals
Phase 02 must not silently become payment activation, production credential validation or rotation, order/database implementation, checkout implementation, webhook financial truth, fulfillment automation, auth rollout, Cloudflare billing/DNS changes, or live transaction testing.

## Current blocker
The canonical Phase 01 business lock still records BUSINESS_LOCK_APPROVED=false and D01–D08 as decision-required. The plan is therefore prepared but not executed as an approved commercial change.

## Decision principle
ChatGPT decides ordinary product/technical details and presents only material commercial choices for founder approval. Genspark handles implementation details after an approved execution brief and reports exact verification evidence back to ChatGPT.