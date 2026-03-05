---
id: '1741182180000'
slug: fair-fees
name: "Fair Fees"
shortDescription: "A dynamic fee formula for dapps that balances builder incentives with minimizing extraction as funding scales."
tags:
  - fees
  - sustainability
  - incentives
  - dapp-economics
lastUpdated: '2025-04-27'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/mechanisms/fair-fees/banner.png
---

**Fair Fees** is a proposed dynamic fee structure for decentralized applications that balances two competing interests: builders need financial incentives to create and maintain these systems, but excessive fees undermine their effectiveness. The approach provides higher proportional returns for smaller funding flows while gradually decreasing to a minimal percentage for larger ones.

Originally proposed by Kevin Owocki and Devansh Mehta, with inspiration from Vitalik Buterin, on [ethresear.ch](https://ethresear.ch/t/fair-fees-a-dynamic-formula-for-balancing-dapp-value-creation-capture/22225).

> **Note:** This is a proposal for individual apps to think about monetizing their app. It is _not_ a proposal to change any economics at the protocol layer.

## Problem Statement

Dapps face two critical sustainability challenges:

1. **Need for Financial Return:** Building and maintaining these systems requires significant time, expertise, and resources. Without adequate financial returns, talented builders lack motivation to create and improve crucial allocation systems.

2. **Risk of Excessive Extraction:** Conversely, excessive financial incentives can undermine trust in mechanisms and reduce their effectiveness in directing capital to intended purposes, whether that involves public goods, private investments, or hybrid models.

This fundamental tension creates design challenges: insufficient incentives prevent ecosystem growth by failing to attract capable builders, while excessive fees discourage user adoption and undermine mechanisms' core missions.

## Solution: A Dynamic Fee Structure

The proposed formula balances value creation with value capture:

```
if projects get $N, builders get $max(sqrt(1000 * N), N * 0.01)
```

**Plain English explanation:**

- For smaller funding amounts, fees follow a square root function (`sqrt(1000 * N)`), providing proportionally higher returns to justify building mechanisms for modest pools. Example: a $170,000 funding pool yields `sqrt(1000 * 170,000)` = $13,038.40, representing approximately 7% overhead.

- Once funding exceeds $10 million, fees transition to a flat 1% rate (`N * 0.01`).

- This creates a smooth descending curve as funding amounts increase.

![Fee structure visualization](/content-images/mechanisms/fair-fees/01-fee-structure-chart.png)

This approach ensures that:

1. Small-scale dapps remain financially viable to build and maintain, encouraging experimentation
2. As dapps scale, the proportional fee decreases
3. A predictable, transparent mechanism exists for all participants

Readers can experiment with different funding amounts using [this spreadsheet](https://docs.google.com/spreadsheets/d/189KZ2zpFyf18XOV9jWL7mgDiLy9aylS_vVzvCFK_Rlc/edit?gid=699870709#gid=699870709).

## Outstanding Questions

Several questions remain open for community discussion:

1. **Formula Decay Speed:** Is the current proportional fee decrease rate appropriate? Should it decrease more rapidly or slowly?

2. **Minimum Threshold:** Is 1% the correct minimum rate, and is $10 million the appropriate threshold for reaching this minimum?

3. **Fee Distribution:** Should fees go entirely to dapp builders, or should portions flow to project dependencies? Should the formula apply fractally across dependency stacks?

## Next Steps

The authors propose moving from theory to implementation:

1. Begin experimenting with these mechanisms in smaller test rounds across different capital allocation dapp types.

2. Possible specific pilots:
   - Implement as a fee mechanism for community round organizers in the upcoming Gitcoin Grants round (GG24)
   - Implement for novel capital allocation experiments like Deep Funding

3. Direct 10-25% of overhead toward funding the mechanism's own dependencies (such as underlying smart contracts and open source repositories), transforming what might seem extractive into a constructive funding experiment.

## Appendix: Accrued Fees in a Crowdfunded World

In emergent, crowdfunded scenarios, fee mechanisms allocate differently than in single-pool situations.

**Example comparison:**

- Single $10k pool: Fee calculated once at 32% = $3,200
- Two sequential donations ($5k at time 1, then $5k at time 2): First tranche charged 45% fee ($2,250), second at 32% ($1,600) = $3,850 total

The accrued methodology typically generates more revenue for fee recipients than basic methodology across most scenarios.

![Accrued vs. basic methodology comparison](/content-images/mechanisms/fair-fees/02-accrued-vs-basic.png)

Recommendations:
- Use basic methodology for conventional funding pools
- Use accrued fee approach for crowdfunded pools
- Implementers determine the specific methodology

An ['accrued fees' tab in the worksheet](https://docs.google.com/spreadsheets/d/189KZ2zpFyf18XOV9jWL7mgDiLy9aylS_vVzvCFK_Rlc/edit?gid=1466396196#gid=1466396196) supports this methodology.
