---
id: '12'
slug: fair-fees-dynamic-formula-value-creation-capture
name: "Fair Fees: A Dynamic Formula for Balancing Value Creation and Value Capture"
shortDescription: "A proposed dynamic fee structure for onchain capital allocation mechanism builders that provides higher returns for smaller pools while decreasing to a minimal percentage for larger ones."
tags:
  - fee structure
  - mechanism design
  - sustainability
  - capital allocation
lastUpdated: '2026-02-25'
relatedMechanisms:
  - quadratic-funding
  - direct-grants
relatedApps: []
sensemakingFor: "mechanisms"
banner: /content-images/research/fair-fees-dynamic-formula-value-creation-capture/banner.png
---

**Type:** Research
**Authors:** Kevin Owocki, Devansh Mehta, inspiration from Vitalik Buterin
**Source:** [Allo Capital Research](https://research.allo.capital/t/fair-fees-a-dynamic-formula-for-balancing-value-creation-and-value-capture/322)
**Spreadsheet:** [Fee Formula Calculator](https://docs.google.com/spreadsheets/d/189KZ2zpFyf18XOV9jWL7mgDiLy9aylS_vVzvCFK_Rlc/edit?gid=1466396196#gid=1466396196)

## TLDR

A sustainable fee structure for onchain capital allocation mechanism builders that addresses a fundamental tension: builders need financial incentives to create and maintain these systems, but excessive fees undermine their effectiveness. The approach provides higher proportional returns for smaller funding pools while gradually decreasing to a minimal percentage for larger ones.

## Problem Statement

Onchain capital allocation mechanisms — public goods funding, private investment vehicles, grants programs, and hybrid models — face a critical challenge:

- **Need for Financial Return:** Building and maintaining capital allocation mechanisms requires significant investment of time, expertise, and resources. Without adequate financial returns, talented builders are less likely to dedicate themselves to creating and improving these systems.
- **Risk of Excessive Extraction:** If the financial incentives are too high (or become too high over time), the system risks being perceived as extractive, undermining trust and reducing effectiveness.

Too little financial incentive and the ecosystem struggles to attract talented builders; too much and the systems risk extracting excessive value from the very projects they aim to support.

## Solution: A Dynamic Fee Structure

The proposed formula balances value created by new onchain capital allocation mechanisms with value captured by builders:

```
if projects get $N, builders get $max(sqrt(1000 * N), N * 0.01)
```

In plain English:

- For **smaller funding amounts**, the fee follows a square root function (`sqrt(1000 * N)`), providing proportionally higher returns to make building mechanisms for smaller pools worthwhile. For example, if the funding pool is $170,000, then `sqrt(1000 * 170,000) = $13,038` or ~7%.
- Once funding exceeds **$10 million**, the fee transitions to a flat **1% rate** (`N * 0.01`).
- This creates a smooth curve that decreases proportionally as the funding amount increases.

This ensures:

- Small-scale allocation mechanisms remain financially viable to build and maintain, boosting experimentation
- As allocation pools grow larger, the proportion directed to fees decreases
- There's a predictable, transparent mechanism for all participants

## Outstanding Questions

- **Formula Decay Speed:** Is the current rate at which the proportional fee decreases appropriate? Should it decrease more rapidly or slowly?
- **Minimum Threshold:** Is 1% the right minimum rate, and is $10 million the appropriate threshold?
- **Fee Distribution:** Should fees go entirely to mechanism builders, or should some portion flow to dependencies? Should the formula be applied fractally down the dependency stack?

## Accrued Fees in a Crowdfunded World

In a more emergent, crowdfunded world, fees are allocated differently than when one big pool is set out upfront.

Example: A pool of $5k is set aside with a 45% fee. Then another $5k is added, reducing the fee to 32%.

- **Basic Methodology:** `$10k * 32% = $3,200`
- **Accrued Methodology:** `$5k * 45% + $5k * 32% = $3,850`

The accrued methodology is more generous to the fee collector in virtually any scenario. The recommendation is to use basic methodology for basic funding pools, and the accrued fee for more crowdfunded pools.

## Next Steps

- Experiment with fee mechanisms in smaller test rounds across different types of capital allocation mechanisms
- Possible pilots: (1) Implement as a fee mechanism for community round organizers in Gitcoin Grants rounds (2) Implement as a fee mechanism for novel capital allocation experiments like Deep Funding
- Consider directing 10-25% of the overhead to funding dependencies of the mechanism itself (underlying smart contracts, open source repos) to transform what might feel like an extractive fee into a constructive experiment

## Further Reading

- [**Fair Fees Forum Discussion** — Allo Capital Research](https://research.allo.capital/t/fair-fees-a-dynamic-formula-for-balancing-value-creation-and-value-capture/322)
- [**Fee Formula Spreadsheet** — Google Sheets](https://docs.google.com/spreadsheets/d/189KZ2zpFyf18XOV9jWL7mgDiLy9aylS_vVzvCFK_Rlc/edit?gid=1466396196#gid=1466396196)
