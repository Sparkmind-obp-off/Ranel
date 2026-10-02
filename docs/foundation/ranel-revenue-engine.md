# Ranel — Revenue Engine Blueprint

**Status:** LOCKED  
**Purpose:** Canonical model of how Ranel turns demand into durable revenue.

## 1. Engine definition

Ranel is not just a storefront and not just SaaS.

It is a loop that connects:

**Demand → Intelligence → Opportunity → Offer → Distribution → Transaction → Fulfillment → Outcome → Learning**

The public interface sells. The private system learns and controls. The Core protects business truth.

## 2. Engine components

### Demand layer
Collect recurring signals from:
- operator conversations;
- social discussions;
- search;
- product usage;
- transaction behavior;
- customer feedback;
- market observations.

### Intelligence layer
Transform signals into:
- normalized observations;
- opportunities;
- clusters;
- scoring;
- recommendations;
- experiments.

### Product layer
Translate validated opportunities into:
- kits;
- services/setup;
- systems;
- supply/commerce.

### Distribution layer
Potential channels:
- own website/store;
- social content;
- search/SEO;
- marketplaces;
- partner/referral channels;
- affiliate distribution;
- later additional commerce networks.

The channel is selected according to where relevant demand actually exists.

### Transaction layer
Authoritative events:
- order created;
- payment initiated;
- payment confirmed;
- entitlement created;
- fulfillment started/completed;
- refund/cancellation;
- subscription state.

### Learning layer
Measure:
- conversion;
- objections;
- fulfillment effort;
- support;
- usage;
- repeat purchase;
- refunds;
- margin;
- channel quality.

## 3. Revenue streams

Ranel may monetize through:
1. one-time digital products;
2. paid setup/implementation;
3. recurring systems/services;
4. onboarding/training;
5. affiliate/referral commerce;
6. distribution margin;
7. later private-label or supply economics.

No revenue stream is “active” merely because the architecture supports it.

## 4. Revenue integrity

Business truth must remain internally consistent.

Required rules:
- money is represented deterministically;
- payment callbacks are authenticated;
- webhook processing is idempotent;
- duplicate events do not create duplicate entitlements;
- a provider redirect is not payment proof;
- delivery follows verified entitlement state;
- refund/cancellation states are auditable;
- financial values do not depend on LLM output.

## 5. Customer lifecycle

Conceptual lifecycle:

```
Discover
  ↓
Evaluate
  ↓
Inquire
  ↓
Buy
  ↓
Receive
  ↓
Use
  ↓
Get value
  ↓
Repeat / expand / refer
```

The system should eventually observe where customers stop, why they stop, and what intervention is justified.

## 6. Distribution strategy

Use distribution as an experiment, not as vanity reach.

For each channel record:
- source;
- offer;
- audience;
- impressions/traffic where meaningful;
- inquiries;
- transactions;
- fulfillment burden;
- margin;
- repeat behavior.

A high-traffic channel with poor economics is not automatically useful.

## 7. Unit economics

For any paid offer, eventually track:

```
Revenue
- payment/platform fees
- refunds/cancellations
- delivery costs
- support cost
- fulfillment time/value
- acquisition/distribution cost
= contribution
```

For founder-operated early work, founder time must be treated as an economic input even when no payroll line exists.

## 8. Scale rule

Scale only the parts that are:
- repeatedly demanded;
- repeatably delivered;
- economically viable;
- measurable;
- supportable.

Automation follows repetition.
Distribution follows evidence.
Inventory follows demand.
Software follows workflow.
AI follows structured data.
