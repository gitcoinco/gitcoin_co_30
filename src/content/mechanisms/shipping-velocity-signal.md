---
id: '1772562421044'
slug: shipping-velocity-signal
name: "Shipping Velocity Signal"
shortDescription: "Builder output rate as a predictive allocation signal — continuous measurement of artifact production weighted by artifact type and market impact."
tags:
  - signal-based
  - continuous
  - automated
  - attribution
  - retroactive
lastUpdated: '2026-03-03'
relatedMechanisms:
  - autopgf
  - impact-attestations
  - conviction-voting
  - direct-to-contract-incentives
  - towel-protocol
relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Shipping Velocity Signal (SV)** is a continuous, weighted measurement of a builder's artifact production rate — used as a predictive signal for funding allocation, market valuation, or conviction weighting. Rather than relying on retrospective impact assessment or subjective grant review, SV provides a real-time, auditable metric that correlates with long-term builder output and, empirically, with market-recognized value.

The core hypothesis: the *rate* at which a builder converts attention into artifacts is a stronger predictor of eventual impact than any point-in-time snapshot of their output. SV formalizes this rate as a weighted sum of artifact categories divided by active days, producing a comparable, cross-builder metric that can feed automated allocation mechanisms.

## How It Works

Shipping Velocity is calculated continuously from a builder's verifiable artifact log.

**Formula:**
```
SV = Σ(artifact_count × weight) / days_active
```

**Default artifact weights:**

| Artifact Type | Weight | Rationale |
|--------------|--------|-----------|
| Product (shipped, live) | 3 | Highest signal: something exists that others can use |
| Infrastructure (deployed) | 2 | High signal: other builders depend on it |
| Content (published) | 1 | Moderate signal: demonstrates active thinking, lower barrier |
| Philosophy/Discussion | 0 | Filtered: lowest barrier, weakest predictor |

**Calculation steps:**

1. **Artifact enumeration:** Identify all verifiable artifacts produced by a builder within the measurement window. Artifacts must be independently verifiable (live URLs, on-chain transactions, published commits, timestamped content).

2. **Weighted sum:** Apply category weights to artifact counts and sum.

3. **Time normalization:** Divide by active days in the measurement window to produce a rate rather than a count — preventing longer periods from inflating scores.

4. **Rolling window:** SV is computed over configurable windows (7-day, 30-day, lifetime). Short windows capture momentum; long windows capture consistency.

5. **Signal output:** SV scores can feed directly into allocation mechanisms as a continuous input: triggering AutoPGF distributions, adjusting conviction accumulation rates, or weighting retroactive funding rounds.

## Empirical Basis

In a 24-day live experiment tracking seven AI agent-creator pairs in the MetaSPN cohort (Season 1, February–March 2026), Shipping Velocity demonstrated a **0.72 correlation with market capitalization** across six agents — stronger than any individual artifact category or qualitative assessment.

Key findings:
- The agent with the highest SV (combined creator+agent pair: 15.75/day) significantly outperformed the cohort on coordination speed and artifact quality
- SV proved more predictive than creator credentials, stated intentions, or point-in-time output snapshots
- The correlation held across agents with very different artifact mixes (infrastructure-heavy vs. content-heavy)
- Day 0 prediction accuracy using qualitative assessment alone: **14%**. Adding SV as a signal substantially improved calibration

The 0.72 correlation is a prior, not a proof — the mechanism requires validation across larger cohorts and longer timeframes.

## Advantages

- **Predictive, not just descriptive:** SV measured at Day 7 is a better predictor of Day 30 outcomes than a Day 30 snapshot alone, enabling earlier allocation decisions.

- **Auditable and objective:** Every artifact can be independently verified. The score is a function of verifiable outputs, not reputation assertions.

- **Cross-comparable:** The weighted formula enables fair comparison across builders with different artifact mixes — a builder shipping one product per week scores comparably to a builder shipping three infrastructure tools per week.

- **Resistant to narrative capture:** High-visibility announcements, viral content, or credentialed backgrounds do not inflate SV. Only verified artifacts count.

- **Composable with existing mechanisms:** SV is a signal layer. It can modulate conviction voting weights, adjust AutoPGF thresholds, or feed retroactive funding multipliers without replacing those mechanisms.

## Limitations

- **Gaming via low-quality artifacts:** Builders can inflate SV by producing high volumes of low-weight artifacts (content, discussion). Mitigation requires peer review or quality gates on artifact classification.

- **New builder disadvantage:** Builders with short track records have statistically noisy SV scores. Minimum observation windows (7+ days) reduce noise but delay signal availability.

- **Artifact classification ambiguity:** The boundary between "infrastructure" and "product" is context-dependent. Consistent classification requires either community consensus or automated tooling.

- **Recency bias in rolling windows:** A builder who ships intensively for 30 days then pauses will see SV decay rapidly. Mechanisms that rely solely on rolling-window SV may defund builders who ship in cycles.

- **Does not capture impact magnitude:** SV measures rate, not scale. A builder shipping one widely-adopted protocol scores lower than a builder shipping ten narrow tools, even if the former creates more value.

## Best Used When

- A funding mechanism needs a continuous, real-time input signal that doesn't require governance votes
- Comparing builder output across different artifact types is required
- Early identification of high-output builders (before market recognition) is the goal
- AutoPGF or conviction mechanisms need an objective trigger that correlates with impact
- Retroactive funding rounds want to weight past allocations toward consistently high-velocity contributors

## Examples and Use Cases

### AutoPGF Trigger

A protocol DAO sets SV thresholds as AutoPGF triggers: builders maintaining SV ≥ 5.0 over a 30-day window receive continuous streaming payments from the public goods treasury. Builders who drop below 2.0 for 14+ days are moved to a review queue.

### Conviction Voting Weight

A conviction voting system applies SV as a multiplier on proposal conviction accumulation — proposals from builders with high SV accumulate conviction 20% faster than proposals from builders with no verifiable artifact history.

### Retroactive Funding Multiplier

A retroactive funding round weights allocations by builders' historical SV scores during the measurement period — rewarding consistent output rather than point-in-time reputation.

### Early Talent Identification

Conviction analysts and grant reviewers use SV to surface undiscovered builders before market or community recognition — identifying candidates whose output rate signals future impact while their reputation score remains low.

## Further Reading

### Tags
signal-based · continuous · automated · attribution · retroactive
