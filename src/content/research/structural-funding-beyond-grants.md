---
id: '1741267200003'
slug: structural-funding-beyond-grants
name: "Structural Funding: Why the Grant Model Is Dying and What Replaces It"
shortDescription: "The transition from episodic, charity-based grants to funding embedded in protocol economics -- MEV taxes, staking yield, sequencer revenue, and dependency-based revenue splits."
tags:
  - sustainability
  - protocol-economics
  - MEV
  - staking
  - revenue
  - infrastructure
researchType: Report
lastUpdated: '2026-03-06'
relatedMechanisms:
  - direct-grants
  - token-streaming
  - crowdstaking
  - direct-to-contract-incentives
relatedApps:
  - protocol-guild
  - octant
  - drips
  - sablier
  - optimism-retropgf
relatedCaseStudies: []
relatedResearch:
  - the-wells-are-all-dry-regen-web3-crossroads
  - eip-1890-and-eip-6969-lessons-from-in-protocol-funding
  - revnets-retailism-autonomous-public-goods-funding
relatedCampaigns:
  - protocol-guild-ongoing
  - thedao-security-fund
banner: /content-images/research/structural-funding-beyond-grants/banner.png
---

**Type:** Report
**Authors:** Gitcoin Research
**Published:** March 2026

**TLDR** -- The grant-funding model that sustained Ethereum public goods from 2018 to 2024 depended on flush treasury balances, bull-market enthusiasm, and small enough ecosystems that vibes-based evaluation worked. Those conditions no longer hold. The successor model embeds funding into protocol economics: MEV taxes, staking yield routing, sequencer revenue commitments, and dependency-based revenue splits. These aren't philanthropy -- they're rational infrastructure investment by parties who depend on the infrastructure.

---

## The Three Pillars That No Longer Hold

The first era of Ethereum public goods funding (2018-2024) distributed over $500 million -- a genuine achievement. But it rested on three conditions that are no longer reliable:

**Flush treasury balances from token appreciation.** DAOs and foundations funded public goods from treasuries that swelled during bull markets. When token prices declined, so did funding capacity. Arbitrum, Optimism, Polygon, and others committed hundreds of millions in tokens, but the dollar value of those commitments fluctuated wildly with market conditions. This is not a sustainable funding model -- it's an exposure to crypto market cycles disguised as a public goods program.

**A small enough ecosystem that vibes-based evaluation could work.** In 2019, a handful of reviewers could plausibly evaluate every grant application. By 2024, the Ethereum ecosystem had grown to thousands of active projects across dozens of L2s, and no committee -- no matter how well-intentioned -- could meaningfully assess them all. The result was rational shortcuts: fund familiar names, fund what's visible, fund what has good marketing.

**Enough ideological enthusiasm to paper over misaligned incentives.** The regen movement carried the early era on a combination of genuine idealism and bull-market surplus. But as "The Wells Are All Dry" documented unflinchingly, much of regen web3 operated on vibes, narrative coherence, and speculative exuberance rather than genuine product-market fit. When the surplus dried up, so did the enthusiasm.

## The Structural Alternative

The successor to the grant model is not a better grant model. It is funding that is structurally embedded in the economic design of protocols -- funding that scales automatically with protocol usage, requires no recurring governance decisions, and aligns the incentives of funders with the infrastructure they depend on.

Five models are emerging:

### 1. Yield-Based Funding

**Model:** Stake principal assets; route yield to public goods; preserve principal indefinitely.

**Examples:**
- **Octant** stakes 100,000 ETH (Golem Foundation) and distributes staking yield (~3-4% annually) through community-governed 90-day cycles. Over 2,340 ETH distributed to 80+ projects. The principal remains intact, generating funding in perpetuity.
- **TheDAO Security Fund** stakes 75,000+ ETH ($220M+) from recovered 2016 DAO hack assets, generating ~$8M/year for Ethereum security research. Seven curators including Vitalik Buterin allocate using QF, retroactive funding, and ranked-choice voting.

**Why it works:** Yield-based funding is endowment economics applied to crypto. The principal is preserved, the funding is renewable, and the annual capacity is predictable regardless of market sentiment. It decouples public goods funding from the boom-bust cycle of treasury drawdowns.

### 2. Revenue-Based Funding

**Model:** Protocols commit a percentage of ongoing revenue to public goods, creating funding that scales with usage.

**Examples:**
- **Optimism** commits all sequencer profits to retroactive public goods funding, with 850M OP (20% of total supply) reserved. As L2 usage grows, so does funding capacity.
- **Protocol Guild** receives ongoing revenue splits from protocols that depend on Ethereum L1 infrastructure. Over $100M cumulative donations to ~190 core contributors via 4-year vesting.
- **Obol** directs 1% of distributed validator staking rewards to its Retroactive Active Fund.

**Why it works:** Revenue-based funding aligns incentives structurally. Protocols that benefit from shared infrastructure contribute a percentage back. Funding scales with the thing it's funding -- more L2 usage means more sequencer revenue means more public goods funding. No governance vote needed for each disbursement.

### 3. MEV Redirection

**Model:** Redirect a portion of Maximal Extractable Value -- currently over $1B extracted since the merge -- toward public goods.

**Mechanisms in development:**
- **MEV-Share** allows users to reclaim a portion of the MEV their transactions generate
- **MEV Taxes** enable smart contracts to capture a percentage of MEV from transactions that interact with them
- **Builder auction requirements** condition block-building rights on public goods contributions

**Why it matters:** A 10% MEV tax could exceed Gitcoin's entire historical distribution ($67M) in a single year. MEV is currently extracted as a private good from a public system. Redirecting a portion of it represents one of the largest untapped funding sources in the ecosystem.

### 4. Dependency-Based Coalitional Funding

**Model:** Multiple entities that depend on shared infrastructure coordinate to fund it proportionally to their dependence.

**Examples:**
- **Coalitional funding** modeled on SEMATECH (where semiconductor firms pooled R&D funding) and The Global Fund (where governments pool health funding). Applied to Ethereum, this means L2s, DeFi protocols, and infrastructure projects jointly funding the shared dependencies they all rely on.
- **Drips** enables automatic dependency splitting -- when you fund a project, its upstream dependencies automatically receive a proportional share.
- **Deep Funding** uses AI to map and weight the 40,000+ edge dependency graph of Ethereum infrastructure, enabling allocation proportional to actual dependency relationships.

**Why it works:** Coalitional funding solves the collective action problem at its root. No individual protocol can justify funding the full cost of shared infrastructure. But a coalition of protocols that each contribute proportional to their dependence can collectively fund what none would fund alone -- just as SEMATECH's member firms collectively funded pre-competitive semiconductor research.

### 5. Autonomous Revenue Networks

**Model:** Fully autonomous, immutable treasuries that tokenize revenues with mathematically defined rules -- no governance, no committees, no grants.

**Examples:**
- **Revnets** (built on Juicebox V4) deploy treasuries with rising price floors, ceiling/floor/Uniswap pool interactions, and self-stabilizing markets. Once deployed, rules cannot be changed by anyone.
- **Flows.wtf** uses token-curated registries with AI-powered continuous streaming -- second-by-second distribution to community-approved recipients.

**Why it works:** Autonomous networks remove the governance overhead entirely. Funding flows according to programmatic rules, eliminating the discretionary bottleneck that makes traditional grants slow, political, and inconsistent.

## The Transition Is Not Philanthropy to Business

It's important to be precise about what this transition represents. Structural funding is not the commercialization of public goods. The goods remain public -- open source, permissionless, non-excludable. What changes is the funding relationship:

| | Grant Model | Structural Model |
|---|---|---|
| **Capital source** | Treasury drawdowns, donations | Protocol revenue, yield, MEV |
| **Decision cadence** | Periodic rounds | Continuous or automatic |
| **Scaling** | Linear (more grants = more committee work) | Automatic (scales with protocol usage) |
| **Incentive alignment** | Charitable (funders don't directly benefit) | Rational (funders depend on what they fund) |
| **Sustainability** | Depletes over time | Self-renewing |

The shift from "generous donors give grants" to "protocols fund their own dependencies" is not a retreat from public goods values. It is their most durable instantiation -- funding that persists because it is economically rational, not because it depends on ongoing goodwill.

## What Must Be True

Structural funding is not a panacea. Several conditions must hold for it to work:

**Revenue must exist.** Protocols without meaningful revenue cannot self-fund their public goods. The revenue-based model works for Optimism (sequencer fees) and Protocol Guild (protocol revenue splits) but not for pre-revenue projects. Prospective mechanisms (grants, QF) remain essential for early-stage work.

**Commitments must be credible.** A pledge to dedicate "a percentage of revenue" is only as durable as the governance that can reverse it. Optimism's commitment is encoded in its social contract but not technically irreversible. Revnets solve this with immutability -- once deployed, the rules cannot be changed. The more credible the commitment, the more trust it generates.

**Allocation must still happen.** Structural funding solves the *formation* problem (where does the money come from?) but not the *allocation* problem (who gets it?). Sequencer revenue still needs to be directed to specific projects. Yield still needs to be distributed through some mechanism. The allocation layer -- QF, retroactive funding, AI-assisted evaluation -- remains essential.

## Conclusion

The grant model served its era well and distributed over $500M in public goods funding. But it was powered by conditions -- flush treasuries, small ecosystems, bull-market idealism -- that have expired. The next era of public goods funding will be powered by protocol economics: yield that renews indefinitely, revenue that scales with usage, MEV that flows back to the commons, and dependencies that fund themselves through coalitional coordination.

This is not a betrayal of the public goods mission. It is its maturation. The most durable public goods are the ones funded by the systems that depend on them.
