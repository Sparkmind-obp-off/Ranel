# Ranel — Master Blueprint

**Status:** LOCKED — canonical strategic and system blueprint  
**Scope:** Ranel only  
**Authority:** Founder retains final decision authority. Routine technical execution may follow the documented operating model.  
**Canonical repository:** `Sparkmind-obp-off/Ranel`

## 1. Purpose

This document is the shortest complete description of what Ranel is, what it is building toward, how the business makes money, how the software is layered, how AI is used, and how work is gated.

It is intended to prevent repeated rediscovery by humans or execution agents. A task should begin here, then open only the specific layer document it needs.

## 2. Master definition

**Ranel is a digital revenue engine for practical business systems and commerce for local operators.**

Ranel begins with real operating problems in small/local businesses, turns proven needs into practical products and systems, distributes them through a public revenue surface, and uses private operational intelligence to continuously improve what is offered.

Ranel is not:
- a generic AI agency;
- a barbershop-only software brand;
- an enterprise ERP at launch;
- a generic template marketplace;
- a technology showcase detached from customer demand.

## 3. Mission and vision

### Mission
Make good business operations more accessible to independent and small businesses by turning messy daily work into clear, repeatable, measurable systems.

### Vision
Build a durable digital business that compounds operator knowledge, reusable products, software, distribution, and intelligence across local-business verticals.

### Working promise
**Practical systems for better-run businesses.**

The brand should feel calm, clear, precise, useful, mature, and evidence-led. Premium comes from order, care, and clarity rather than luxury positioning.

## 4. Business architecture lock

Ranel is organized into three commercial layers:

### Kits
Low-friction products that package practical knowledge:
- SOPs
- checklists
- calculators
- templates
- playbooks
- starter packs

Kits are the learning and entry layer.

### Systems
Operational capabilities that become useful when a repeated workflow justifies them:
- reporting
- customer/visit history
- retention workflows
- inquiry/booking
- loyalty
- reminders
- workflow automation

Systems should be introduced from demonstrated recurring needs, not from feature ambition.

### Supply
Relevant tools, products, services, or partner/affiliate distribution:
- operational tools
- business supplies
- curated recommendations
- affiliate/referral products
- later private-label or inventory where economics justify it

Supply follows demonstrated need and verified sourcing.

## 5. Revenue Engine lock

The core growth loop is:

**Demand → Opportunity → Product → Distribution → Transaction → Fulfillment → Outcome → Learning**

Learning feeds the next Demand cycle. Intelligence, scoring, evidence, and improvement are cross-cutting work/activities, not extra primary system layers or extra canonical cycle stages. This wording follows the latest explicit founder instruction and ADR-010.

Detailed operating loop:

1. **Demand** identifies recurring operator problems, questions, purchase intent, and workflow gaps.
2. **Opportunity** structures observations and evaluates frequency, urgency, buyer clarity, willingness-to-pay evidence, delivery feasibility, margin, and fit.
3. **Product** selects the smallest testable offer or workflow intervention, within Kits → Systems → Supply.
4. **Distribution** puts the approved offer where relevant demand exists.
5. **Transaction** records verified commercial events through deterministic Core rules; a redirect or AI/UI assertion is not payment evidence.
6. **Fulfillment** delivers the verified entitlement or agreed service promise.
7. **Outcome** records actual use, objections, support load, repeat purchase, and economics with attributable evidence.
8. **Learning** proposes improvements to products, positioning, distribution, and the next opportunity queue under founder policy and Core authorization.

A live catalog is not proof of demand. A software build is not proof of revenue.

## 6. Technical architecture lock

Ranel has exactly three primary system layers:

1. PUBLIC LAYER
2. CONTROL LAYER
3. CORE LAYER

AI is cross-cutting intelligence across these three layers, not a fourth primary layer.

```
PUBLIC
  ↓
CONTROL
  ↓
CORE
```

### 1. Public Layer
Customer-facing:
- brand/landing pages
- catalog
- digital products
- tools/templates
- checkout later
- software entry points
- membership later
- commerce/supply
- content/SEO demand entry points

Public surfaces should expose only what is safe and intentionally public.

### 2. Control Layer
Founder/operator-facing:
- revenue overview
- orders
- customers
- products
- subscriptions/entitlements
- demand signals
- interpretations
- recommendations
- task/automation status
- integration health
- system health
- audit/activity history

The Control Center is a decision environment, not merely a CRUD dashboard.

### 3. Core Layer
Authoritative backend:
- order/payment state
- entitlement state
- revenue ledger
- business rules
- authorization
- idempotent event processing
- commands
- provider adapters
- audit history

The Core is the only layer allowed to establish authoritative commercial truth.

## 7. AI architecture lock

AI is **cross-cutting intelligence across PUBLIC, CONTROL, and CORE**, operating on deterministic business truth, not an additional primary layer or the source of truth.

AI responsibilities:
- classify and normalize external demand signals;
- summarize observations;
- identify patterns and contradictions;
- generate opportunity hypotheses;
- interpret deterministic metrics;
- propose product/distribution experiments;
- suggest priorities;
- explain why a recommendation exists;
- assist with operational knowledge retrieval;
- improve internal workflows.

AI must not independently:
- invent financial truth;
- mark an order paid;
- alter the revenue ledger;
- change prices;
- spend money;
- send campaigns;
- change payment configuration;
- bypass authorization;
- override business rules.

Decision loop:

```
REAL WORLD
   ↓
RAW DATA / EVENTS
   ↓
CORE BUSINESS TRUTH
   ↓
DETERMINISTIC SIGNALS
   ↓
AI INTERPRETATION
   ↓
RECOMMENDATION / DECISION RECORD
   ↓
FOUNDER APPROVE / REJECT / DEFER
   ↓
AUTHORIZED COMMAND
   ↓
CORE EXECUTION
   ↓
REAL-WORLD OUTCOME
   ↓
DATA / LEARNING
```

## 8. Data and trust model

Use this evidence hierarchy:

**Provider evidence > deployed-system evidence > repository evidence > founder-confirmed status > assumption**

Never upgrade an assumption merely because a document sounds complete.

Operational states:
- BUILT = code exists.
- TESTED = a named check actually ran.
- DEPLOYED = target deployment succeeded and was checked.
- INTEGRATED = real provider interaction/callback/etc. was verified.
- VALIDATED = attributable real-world customer/business evidence exists.

## 9. Execution governance

Decision classes:
- **AUTO:** safe, routine, reversible, already permitted.
- **RECOMMEND:** analysis only.
- **APPROVAL REQUIRED:** material external/cost/commercial action.
- **ALERT:** security, payment, integrity, availability, or unexpected-cost issue.

ChatGPT is the primary analysis/implementation layer.
Genspark is the external execution/capability layer when ChatGPT lacks access or suitable execution capability.

Use the shortest safe path. Never duplicate work merely to involve both systems.

## 10. Current state

The currently shipped Ranel implementation is a public Phase 2 barber pilot/catalog surface with manual inquiry handoff. The long-term three-layer Revenue Engine is **architecturally locked but not fully implemented**.

Current production:
- `https://ranel.pages.dev`
- Cloudflare Pages project: `ranel`
- current documented immutable release: `https://68793aeb.ranel.pages.dev`
- application deployment SHA: `a4915bad908268acc6df1efce4f0e2e2707e0c6a`

Current gaps:
- private Control Center not implemented;
- Core business API/truth layer not implemented;
- persistent database not selected/implemented for production;
- payments not integrated;
- automated fulfillment not implemented;
- AI runtime not integrated;
- product analytics/transactional email not integrated;
- real demand validation remains pending.

## 11. What is locked vs what is still evidence-gated

**LOCKED**
- Ranel master brand direction.
- Kits → Systems → Supply business model.
- Public → Control → Core architecture.
- AI as intelligence/recommendation layer, not business truth.
- demand → opportunity → action → outcome learning loop.
- evidence-gated expansion.
- modular-monolith-first implementation philosophy.
- one canonical repository/source of truth.
- Ranel remains separate from Bozq One System and Tolvey/Tolva.

**EVIDENCE-GATED**
- exact production database choice;
- provider/account availability and limits;
- payment implementation details;
- custom-domain routing;
- exact AI provider/model configuration;
- analytics/email/automation activation;
- timing and scope of private Control Center/Core implementation;
- commercial prices and market validation.

The lock defines the destination and rules. Evidence determines the concrete implementation choices inside that boundary.

## 12. Production readiness controls

The strategic lock is complemented by explicit operational standards:
- `docs/production/production-readiness-standard.md`
- `docs/production/release-runbook.md`
- `docs/production/business-continuity-and-disaster-recovery.md`
- `docs/production/operational-security-checklist.md`
- `docs/technology/data-governance-and-retention.md`
- `docs/technology/api-and-event-contract.md`
- `docs/foundation/ranel-ai-production-grade-checklist.md`

These documents define release evidence and safety controls. They do not convert unimplemented subsystems into production-ready systems.

## 13. Agent instruction

When receiving a Ranel task:
1. Read this master blueprint.
2. Identify the affected layer.
3. Open only that layer's document(s).
4. Inspect the exact repository files required.
5. Perform the smallest bounded task.
6. Run only relevant verification, expanding for a release.
7. Record evidence.
8. Return a compact report.
9. Do not reopen settled architecture unless new evidence creates a concrete conflict.

## 14. Access and production control

External AI/software execution follows `docs/governance/access-and-permission-model.md` and `docs/handoffs/genspark-execution-profile.md`. Duitku is a production/live integration target under `docs/technology/duitku-production-integration-contract.md`. Production credentials are handled only through secure secret mechanisms; live payment creation or customer transactions are separately gated actions.
