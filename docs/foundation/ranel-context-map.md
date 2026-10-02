# Ranel — Layered Context Map

**Status:** LOCKED context architecture  
**Purpose:** Give any human or AI agent the minimum context needed for a Ranel task.

## Layer 0 — Master

**Read first:** [Master Blueprint](ranel-master-blueprint.md)

Answers:
- What Ranel is.
- Mission/vision.
- Locked business model.
- Locked three-layer technical architecture.
- AI boundary.
- Revenue engine.
- Locked vs evidence-gated decisions.
- Agent operating rule.

## Primary system architecture

Ranel has exactly three primary system layers.

### System Layer 1 — Public
Customer-facing revenue surface.

Read for public-site/product-entry work:
- `README.md`
- `docs/products/product-catalog.md`
- exact `src/*` / asset files needed.

### System Layer 2 — Control
Private founder/operator decision center.

Read when implementing:
- internal workspace;
- revenue/order/customer views;
- demand signals;
- recommendations;
- automation/system health;
- audit/activity.

Use:
- `docs/technology/backend-api-specification.md`
- `docs/technology/auth-and-access-control.md`
- `docs/technology/data-model.md`
- `docs/technology/testing-and-qa.md`

### System Layer 3 — Core
Authoritative business truth and execution.

Read when implementing:
- orders/payments;
- entitlements;
- revenue ledger;
- business rules;
- idempotent events;
- commands;
- provider adapters;
- audit history.

Use:
- `docs/technology/api-and-event-contract.md`
- `docs/technology/data-model.md`
- `docs/technology/integration-strategy.md`
- `docs/technology/security-threat-model.md`

**AI is cross-cutting intelligence across Public, Control, and Core. It is not a fourth primary layer.**

## Context domains

### Business
Read for product, offer, vertical, pricing, demand, distribution, and gates:
- [Business Architecture](ranel-business-architecture.md)
- [Revenue Engine](ranel-revenue-engine.md)
- [Roadmap & Gates](ranel-roadmap-and-gates.md)

### AI
Read for demand intelligence, opportunity discovery, scoring, recommendations, AI implementation, evaluation:
- [AI Operating Model](ranel-ai-operating-model.md)
- [AI Production-Grade Checklist](ranel-ai-production-grade-checklist.md)

### Provider / Infrastructure
Read only when touching external infrastructure:
- `docs/technology/provider-inventory.md`
- `docs/technology/duitku-production-integration-contract.md`
- `docs/technology/environments-and-deployment.md`
- relevant Genspark handoff

### Governance / Evidence
Read when touching access, safety, execution, production release, or evidence:
- `docs/governance/decision-capability-execution-model.md`
- `docs/governance/access-and-permission-model.md`
- `docs/technology/genspark-execution-protocol.md`
- `docs/production/production-readiness-standard.md`

## Agent loading rule

**Never load all layers by default.**

Use:

```
Layer 0
  ↓
one affected layer
  ↓
exact files
  ↓
targeted tests/evidence
```

Only cross into another layer when the task creates a real dependency.

## Context compression rule

Stable facts belong in Layer 0.
Layer-specific rules belong in their layer document.
Implementation details belong in technical documents/code.
Temporary evidence belongs in phase/provider evidence.

Do not copy stable context into every task prompt when a canonical document already contains it.

## Change rule

When a foundational decision changes:
1. update the relevant foundation document;
2. update the Master Blueprint if the change affects the system-wide lock;
3. record an ADR when technically material;
4. update the Context Map only if routing changes;
5. do not leave contradictory “locked” and “proposed” statements across documents.

## Genspark rule

Genspark should normally receive:
- the task objective;
- this map or the Context Pack;
- the single affected foundation document;
- exact file/scope;
- acceptance criteria;
- evidence return format.

It should not receive the entire Ranel history unless the task explicitly depends on unresolved historical context.
