---
id: '1741171229'
slug: aqueduct
name: "Aqueduct"
shortDescription: "Infrastructure for routing continuous funding flows between DAOs, protocols, and projects — programmable capital pipelines that connect funding sources to recipients."
tags:
  - infrastructure
  - capital allocation
  - streaming
  - DAOs
lastUpdated: '2026-03-05'
relatedMechanisms:
  - token-streaming
  - direct-grants
  - proposal-inverter
relatedApps: []
relatedCaseStudies: []
relatedResearch:
  - onchain-capital-allocation-neural-networks-allonets
  - exploring-the-capital-allocation-design-space
relatedCampaigns: []
banner: /content-images/mechanisms/aqueduct/banner.png
---

**Aqueduct** refers to programmable infrastructure for routing continuous funding flows between organizations, protocols, and projects. Like the Roman aqueducts that transported water across vast distances through engineered channels, funding aqueducts create persistent capital pipelines connecting funding sources to recipients — enabling automated, ongoing resource distribution without repeated manual intervention.

## How It Works

1. **Funding sources are connected** — protocol revenue, treasury allocations, or designated funding pools
2. **Distribution rules are defined** — smart contracts specify how funds flow: amounts, recipients, conditions, and timing
3. **Capital streams continuously** — rather than one-time grants, funds flow as continuous streams to recipients
4. **Routing logic handles distribution** — funds can split, merge, redirect, and cascade through multiple recipients
5. **The system operates autonomously** — once configured, aqueducts run without manual intervention

## Advantages

- Eliminates repetitive grant administration for ongoing funding needs
- Creates predictable, reliable income streams for recipients
- Enables complex multi-party funding arrangements through programmable routing
- Reduces coordination overhead between funding sources and recipients
- Composable — aqueducts can be chained and combined with other mechanisms

## Limitations

- Requires upfront design of routing logic that may not anticipate future needs
- Continuous flows lock up capital that might be better deployed dynamically
- Smart contract complexity introduces security risks
- Difficult to adjust or redirect flows once established without governance overhead
- May create dependency on specific funding sources

## Best Used When

- Ongoing, predictable funding is needed rather than one-time grants
- Multiple funding sources want to coordinate flows to shared recipients
- Administrative overhead of repeated grant applications is excessive
- The relationship between funders and recipients is long-term and stable

## Examples and Use Cases

**Protocol-to-public-goods pipelines** — L2 sequencer profits can be continuously routed through aqueduct infrastructure to fund ecosystem public goods without manual treasury management.

**DAO-to-DAO funding** — a parent DAO can create aqueducts to sub-DAOs, workstreams, or guilds, ensuring continuous funding without repeated proposal cycles.

**Superfluid streams** provide building blocks for aqueduct patterns, enabling continuous token flows between addresses with programmable logic.
