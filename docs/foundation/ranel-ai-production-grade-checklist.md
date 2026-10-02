# Ranel — AI Production-Grade Checklist

**Status:** LOCKED control standard. AI runtime itself is not yet integrated.

## 1. AI is production-grade only when its surrounding system is production-grade

A strong prompt or model response is not enough.

Required layers:
1. trusted input;
2. deterministic normalization;
3. structured records;
4. explicit prompt/model contract;
5. output schema;
6. validation;
7. human/policy gate;
8. controlled execution;
9. monitoring/evaluation;
10. fallback.

## 2. Input controls

Before AI sees data:
- validate source;
- remove unnecessary personal data;
- identify source/date;
- detect prompt/code-injection risk;
- bound context;
- distinguish trusted system instructions from untrusted external content.

## 3. Output controls

Require structured output where practical:
- classification;
- evidence references;
- confidence;
- uncertainty;
- recommendation;
- rationale;
- suggested next action.

Reject malformed or incomplete outputs.

## 4. Grounding

Important conclusions should reference source records or deterministic metrics where possible. AI must not manufacture missing evidence.

## 5. Decision boundary

### AI may
- classify;
- summarize;
- cluster;
- interpret;
- draft;
- recommend;
- prioritize.

### AI may not independently
- mark payment paid;
- change price;
- spend funds;
- send customer marketing;
- grant/revoke financial entitlement;
- bypass authorization;
- alter audit history.

## 6. Evaluation

Maintain:
- representative evaluation set;
- expected properties;
- failure taxonomy;
- regression examples;
- human review samples;
- cost/latency measurements.

Evaluate after prompt/model/provider changes.

## 7. Reliability

Every AI workflow defines:
- timeout;
- retry policy;
- fallback behavior;
- maximum spend/usage;
- provider outage behavior;
- deterministic alternative where feasible.

Provider outage must not corrupt Core truth.

## 8. Privacy and vendor control

Before production:
- verify provider data-handling terms;
- define what data leaves Ranel;
- define retention behavior;
- restrict secrets;
- log provider/model metadata without unnecessary raw content.

## 9. Model selection

Choose based on measured Ranel workload: quality, latency, cost, context requirements, structured-output reliability, privacy, rate limits, and fallback options.

The model is replaceable; Ranel business records, schemas, policies, and evaluation set are durable assets.

## 10. Release gate

An AI change is production-ready only when:
- regression set passes;
- safety boundary passes;
- cost/latency budget is understood;
- fallback works;
- human/policy approval path works;
- evidence is recorded.
