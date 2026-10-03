# Ranel — Decision Protocol

**Status: ACTIVE WORKING GOVERNANCE**

## 1. Purpose

Ranel must continue moving even when small or medium decisions are not explicitly specified. This protocol prevents decision ambiguity from becoming a project blocker while preserving human final authority.

## 2. Authority model

### Final Authority — Founder / Human

The founder holds final authority over material business decisions. The founder reviews consolidated recommendations and may approve, modify, reject, or override them.

The founder is **not required to decide every operational or technical detail**.

### Strategy & Decision Layer — ChatGPT

ChatGPT is responsible for proactively making strategic and business decisions that can be reasonably determined from available evidence, constraints, economics, product logic, and the Ranel roadmap.

### Execution & Technical Decision Layer — Genspark

Genspark is responsible for proactively making implementation and technical decisions within the approved business direction, repository constraints, security boundaries, and phase scope.

## 3. Decision classes

| Class | Default owner | Escalate to founder? |
|---|---|---|
| Business direction | Founder | Yes |
| Product strategy | ChatGPT | Only if material/contested |
| Pricing recommendation | ChatGPT | Final approval before commercial lock |
| Market research interpretation | ChatGPT | Only material strategic conflict |
| Product packaging detail | ChatGPT | Normally no |
| UX/content detail | ChatGPT/Genspark | Normally no |
| Architecture detail | Genspark | Normally no |
| Code structure | Genspark | Normally no |
| Test strategy | Genspark | Normally no |
| Documentation structure | ChatGPT/Genspark | Normally no |
| Security-sensitive production activation | Joint recommendation | Yes |
| Legal/regulatory commitment | Research + ChatGPT | Yes |
| Large financial commitment | ChatGPT recommendation | Yes |
| Irreversible brand/business pivot | ChatGPT recommendation | Yes |

## 4. Decision labels

- **DECIDED** — selected by the responsible layer and safe to execute.
- **RECOMMENDED** — preferred option prepared for founder review before a material lock.
- **VALIDATION_REQUIRED** — evidence must be collected before treating the assumption as market truth.
- **FOUNDER_REVIEW** — founder review is required because the decision is materially strategic, financial, legal, reputational, or irreversible.
- **BLOCKED** — execution cannot safely continue without resolving a dependency.

**DECISION_REQUIRED** must not be used merely because an answer is inconvenient or because several reasonable options exist. The responsible layer should choose a default whenever the choice is reversible and low-risk.

## 5. Default decision rule

When ambiguity exists:

1. Check existing canonical documents and constraints.
2. Search for current external evidence when the decision depends on market, pricing, competition, law, or provider behavior.
3. Prefer the simplest option that can be sold, delivered, measured, and reversed.
4. Document the assumption and rationale.
5. Continue the roadmap.
6. Escalate only if the decision crosses the founder-review threshold.

## 6. No decision paralysis

A missing small decision is not a reason to stop a phase. If a safe provisional choice exists, make it and record it.

A decision may later be revised when customer evidence, transaction evidence, operational evidence, or new constraints contradict the original assumption.

## 7. Finality

The founder remains the final authority. AI decisions do not override explicit founder instructions.

However, **silence is not an instruction to stop**. When founder review is not required, the responsible layer should proceed using this protocol.

## 8. Relationship to roadmap gates

This protocol changes decision ownership, not safety gates. Production payment, financial truth, security, legal commitments, and other explicit gates remain gated by their phase acceptance criteria.

**Core principle:**

> Decide what can be decided. Research what must be researched. Escalate what truly requires founder authority. Never turn ordinary ambiguity into permanent project blockage.
