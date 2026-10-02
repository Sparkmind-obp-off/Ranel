# Ranel — AI Operating Model

**Status:** LOCKED  
**Focus:** AI intelligence, demand intelligence, recommendations, and controlled execution.

## 1. AI's role

Ranel uses AI to reduce the distance between:
- raw market/operator signals;
- structured business opportunities;
- useful interpretation;
- practical decisions;
- learning from outcomes.

AI is therefore an **intelligence and interpretation layer**, not an authoritative business database.

## 2. AI system boundary

```
External world
  ↓
Demand / transaction / usage signals
  ↓
Deterministic normalization
  ↓
Opportunity + signal records
  ↓
Scoring / rules
  ↓
AI interpretation
  ↓
Recommendation / decision record
  ↓
Founder or policy gate
  ↓
Authorized command
  ↓
Core business execution
```

AI never bypasses the policy gate.

## 3. Demand Intelligence

Demand Intelligence may ingest or summarize signals from permitted sources such as:
- social discussions;
- search demand;
- operator questions;
- public content;
- customer conversations;
- product usage;
- transaction patterns.

The system should preserve:
- source;
- observed date;
- subject/context;
- evidence excerpt or reference;
- confidence;
- counterevidence;
- privacy/consent boundary.

Public-source discovery must not become a license to collect unnecessary personal data.

## 4. Opportunity Database

Each opportunity should be structured rather than stored as a vague AI note.

Minimum conceptual fields:
- opportunity ID;
- source(s);
- vertical;
- operator problem;
- affected workflow;
- buyer;
- urgency;
- observed frequency;
- current workaround;
- willingness-to-pay signal;
- proposed solution type;
- feasibility;
- estimated delivery complexity;
- strategic fit;
- evidence quality;
- status;
- next action;
- decision history.

## 5. Scoring

Scoring exists to make priorities explicit, not to create false precision.

Candidate dimensions:
- evidence strength;
- repetition/frequency;
- urgency;
- buyer clarity;
- willingness-to-pay;
- ease of delivery;
- margin potential;
- strategic fit;
- reuse potential.

Scores should remain explainable and reviewable.

## 6. Interpretation

AI may:
- cluster similar problems;
- summarize recurring objections;
- identify changes in signal patterns;
- propose hypotheses;
- connect demand with existing products;
- explain trade-offs;
- suggest small experiments;
- translate metrics into operational language.

AI output should always be traceable to source records or deterministic calculations where possible.

## 7. Decision records

A recommendation should contain:
- what was observed;
- what it may mean;
- confidence/uncertainty;
- alternatives considered;
- recommended next action;
- expected evidence;
- reversal/stop condition.

The founder can:
- **approve**;
- **reject**;
- **defer**.

No recommendation becomes an external action merely because an LLM generated it.

## 8. Deterministic truth boundary

The following must be deterministic/core-controlled:
- order status;
- paid/unpaid state;
- entitlements;
- revenue ledger;
- pricing configuration;
- authorization;
- webhook idempotency;
- refund status;
- payout/settlement state;
- audit events.

An LLM may explain these states, never redefine them.

## 9. Automation classes

### AUTO
Low-risk and policy-permitted:
- housekeeping;
- internal classification;
- safe synchronization;
- non-consequential summaries;
- reversible internal organization.

### RECOMMEND
No external state change:
- opportunity prioritization;
- offer suggestions;
- content/topic ideas;
- product hypotheses;
- operational diagnosis.

### APPROVAL REQUIRED
Material external action:
- price changes;
- spending;
- campaigns;
- new paid commitments;
- live payment activation;
- public commercial claims;
- destructive or irreversible changes.

### ALERT
Unexpected:
- payment anomalies;
- security events;
- data integrity problems;
- system availability issues;
- unexpected costs.

## 10. AI provider strategy

Do not choose a model because it is fashionable.

Choose based on:
- latency;
- cost;
- context needs;
- quality on Ranel's real workload;
- privacy/data handling;
- structured-output reliability;
- rate limits;
- operational simplicity;
- fallback availability.

An LLM provider is replaceable. Ranel's structured business data and decision model are not.

## 11. Evaluation loop

Every important AI workflow should eventually have:
1. representative input set;
2. expected output properties;
3. deterministic checks where possible;
4. human review samples;
5. failure taxonomy;
6. cost/latency measurement;
7. regression set.

The AI system improves through observed performance, not through prompt length alone.

## 12. AI implementation sequence

1. deterministic signals and data contracts;
2. opportunity schema;
3. scoring rules;
4. recommendation records;
5. first LLM interpretation workflow;
6. review/approval UI;
7. controlled command execution;
8. evaluation/feedback loop;
9. only then broader automation.

Do not start with an autonomous agent that can mutate commercial state.

## 13. Cost-control principles

To keep execution and AI usage efficient:
- maintain compact canonical context;
- retrieve only task-relevant documents;
- summarize stable facts once;
- avoid repeated whole-repo scans;
- use structured outputs;
- cache stable reference data where appropriate;
- batch similar low-risk interpretation tasks;
- use smaller/cheaper models for classification and routing;
- reserve more capable models for high-value reasoning;
- measure token/cost per successful business decision.

The objective is not “maximum AI usage.” It is **maximum useful decisions per unit of compute and spend**.
