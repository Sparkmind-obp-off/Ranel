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

## Layer 1 — Business

Read when a task concerns:
- product;
- offer;
- vertical;
- pricing;
- revenue;
- demand;
- distribution;
- roadmap gates.

Documents:
- [Business Architecture](ranel-business-architecture.md)
- [Revenue Engine](ranel-revenue-engine.md)
- [Roadmap & Gates](ranel-roadmap-and-gates.md)

## Layer 2 — Intelligence / AI

Read when a task concerns:
- demand intelligence;
- opportunity discovery;
- scoring;
- recommendation;
- AI prompts/modeling;
- decision records;
- AI evaluation;
- automation policy.

Document:
- [AI Operating Model](ranel-ai-operating-model.md)

## Layer 3 — Product / Public

Read when a task concerns:
- public website;
- catalog;
- landing pages;
- customer entry points;
- content;
- current barber offer.

Start with:
- `README.md`
- `docs/products/product-catalog.md`

Then inspect only the exact `src/*` / asset files needed.

## Layer 4 — Control Center

Long-term private interface for:
- founder/operator visibility;
- orders/revenue;
- customers;
- products;
- signals;
- recommendations;
- automation/system health;
- audit history.

Current status: **architecturally locked, not yet fully implemented**.

When implementation starts, use:
- `docs/technology/architecture.md`
- `docs/technology/backend-api-specification.md`
- `docs/technology/auth-and-access-control.md`
- `docs/technology/data-model.md`
- `docs/technology/testing-and-qa.md`

Do not build this layer merely because it is architecturally defined. Its activation remains evidence-gated.

## Layer 5 — Core Business Truth

Authoritative backend for:
- orders;
- payments;
- entitlements;
- revenue ledger;
- business rules;
- authorization;
- idempotent events;
- commands;
- provider adapters;
- audit history.

Current status: **architecturally locked, implementation pending**.

Never let AI or UI directly redefine Core truth.

## Layer 6 — Provider / Infrastructure

Read only when the task touches external infrastructure:
- [Provider Inventory](../technology/provider-inventory.md)
- [Integration Strategy](../technology/integration-strategy.md)
- [Deployment](../technology/environments-and-deployment.md)
- relevant Genspark handoff.

Current provider facts must be verified from provider evidence before implementation claims are made.

## Layer 7 — Governance / Evidence

Read when the task concerns:
- execution permissions;
- safety;
- evidence;
- phase gates;
- external execution;
- production release.

Documents:
- `docs/governance/decision-capability-execution-model.md`
- `docs/technology/genspark-execution-protocol.md`
- `docs/implementation/phase-2/evidence.md`

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
