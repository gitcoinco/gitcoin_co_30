---
id: '1741171218'
slug: augmented-bonding-curve
name: "Augmented Bonding Curve"
shortDescription: "Enhanced bonding curve with built-in funding for commons — a portion of every buy/sell transaction is directed to a shared funding pool governed by the community."
tags:
  - bonding-curves
  - public goods
  - token-engineering
  - commons
lastUpdated: '2026-03-05'
relatedMechanisms:
  - bonding-curves
  - conviction-voting
  - quadratic-acceleration
relatedApps: []
relatedCaseStudies: []
relatedResearch:
  - exploring-the-capital-allocation-design-space
  - assembly-theory-x-onchain-capital-allocation
relatedCampaigns: []
banner: /content-images/mechanisms/augmented-bonding-curve/banner.png
---

**Augmented Bonding Curves (ABCs)** extend the standard bonding curve model by embedding a funding mechanism for commons directly into the token's economic design. When participants buy tokens along the curve, a configurable portion of each transaction is diverted to a communal funding pool. This pool is then governed by the community — typically through conviction voting — creating a self-funding commons that grows with adoption.

## How It Works

1. **A bonding curve is deployed** — defining the mathematical relationship between token supply and price
2. **Buy transactions split funds** — a portion goes to the reserve (backing the curve) and a portion goes to the common pool
3. **The common pool accumulates** — as more participants buy tokens, the community funding pool grows
4. **Community governance** — token holders allocate common pool funds through conviction voting or other mechanisms
5. **Sell transactions** — tokens can be sold back to the curve, with the price determined by the reserve ratio
6. **Exit tribute** — a percentage of sell transactions may also flow to the common pool

## Advantages

- Self-funding commons — the community funding pool grows automatically with adoption
- Aligned incentives — token holders benefit from a healthy, well-funded commons
- Continuous liquidity — the bonding curve provides always-available buy/sell functionality
- Combines financial sustainability with community governance
- Exit tribute discourages short-term speculation

## Limitations

- Complex tokenomics that can be difficult for participants to understand
- Parameter sensitivity — reserve ratio, entry/exit tributes, and curve shape significantly affect outcomes
- Requires active governance of the common pool
- Susceptible to front-running and MEV extraction
- Early participants take on more risk with less community funding established

## Best Used When

- A community wants to create a self-sustaining funding mechanism for shared goods
- Token-based coordination is appropriate and participants understand the model
- Continuous, growing funding for commons is needed
- The community has governance capacity to allocate common pool funds

## Examples and Use Cases

**Token Engineering Commons (TEC)** launched with an augmented bonding curve, using conviction voting to govern its common pool. The ABC funded the TEC's grants, research, and community programs while providing continuous liquidity for TEC token holders.

**Commons Stack** developed the ABC model as part of its toolkit for building commons-based economies, combining it with conviction voting and other governance primitives.

## Further Reading

- [Augmented Bonding Curves — Commons Stack](https://commonsstack.org/abc)
- [Deep Dive: Augmented Bonding Curves — Jeff Emmett](https://blog.giveth.io/deep-dive-augmented-bonding-curves-3f1f7c1d23398)
