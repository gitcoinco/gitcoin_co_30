---
id: '1740500100029'
slug: dominant-assurance-contracts
name: "Dominant Assurance Contracts"
shortDescription: "Funding mechanism that guarantees a win-win for early supporters — if the project gets funded, the public good is delivered; if it doesn't, funders get refunded with a bonus."
tags:
  - game-theory
  - bootstrapping
  - incentive
lastUpdated: '2026-02-25'
relatedMechanisms:
  - commitment-pooling
relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

**Dominant Assurance Contracts (DACs)** incentivize public goods contributions by guaranteeing a win-win scenario for early supporters. If the project gets funded, the public good is delivered. If it doesn't, funders get refunded with a bonus. Originally proposed by economist Alex Tabarrok, DACs solve the public goods dilemma by removing first-mover risk.

## How It Works

DACs make contributing the dominant strategy regardless of whether the project reaches its goal.

1. **A project sets a funding target** with a defined deadline
2. **A bonus pool is established** — sourced from sponsors, treasuries, or preset contract logic
3. **Contributors pledge funds** — held in smart contract escrow
4. **If the target is met** — funds are released to the project, and the public good is delivered
5. **If the target is NOT met** — all contributors receive their full refund PLUS a share of the bonus pool
6. **Either way, contributors win** — they either get the public good or a financial return

## Advantages

- Overcomes initial traction barriers for high-impact projects
- Substantially reduces risk for early contributors — contributing is always rational
- Solves collective action coordination problems through game-theoretic incentive design
- Creates strong incentives for participation even when outcomes are uncertain

## Limitations

- Not suited for ongoing or long-term funding — only works for discrete, goal-oriented projects
- Requires clearly defined project outcomes and costs
- Needs a secured bonus funding source (someone must fund the bonuses)
- Struggles in low-engagement environments where even bonuses don't attract participation

## Best Used When

- Bootstrapping new initiatives where first-mover hesitation is the main barrier
- Public goods with quantifiable costs and clear deliverables
- Ecosystems experimenting with incentive mechanisms to solve collective action problems
- Protocols offering credible funding commitments via smart contracts

## Examples and Use Cases

### Community Infrastructure
A community needs $50k for a mesh network. A DAC is deployed: if the target is met, the network is built; if not, all contributors get refunded plus 5% from a sponsor's bonus pool.

### DAO Tool Development
A DAO tool needs funding but contributors are uncertain about adoption. A DAC ensures early backers either get the tool or a guaranteed return.

### Regional Mutual Aid Launch
A regional mutual aid project uses a DAC to bootstrap its first funding pool — contributors know they'll either get the community resource or their money back with a bonus.

## Further Reading

- [Allo Capital — Dominant Assurance Contracts](https://www.allo.capital/mechanisms/dominant-assurance-contracts)