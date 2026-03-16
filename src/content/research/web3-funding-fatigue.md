---
id: '1741193404'
slug: web3-funding-fatigue
name: "Web3 Funding Fatigue: A Growing Problem"
shortDescription: "How fragmented funding processes create fatigue for both grantees and funders, and aggregation-based solutions to reduce coordination overhead."
tags:
  - public goods
  - grants
  - coordination
  - funding fatigue
  - aggregation
lastUpdated: '2024-09-24'
researchType: Report
relatedMechanisms:
  - quadratic-funding
  - direct-grants
  - self-curated-registries
  - guilds
relatedApps:
  - gitcoin-grants-stack
  - drips
  - protocol-guild
relatedCaseStudies: []
relatedResearch:
  - guild-guild-locus-of-coordination
  - plural-funding-mechanisms
  - state-of-public-goods-funding-2024
relatedCampaigns: []
banner: /content-images/research/web3-funding-fatigue/banner.png
authors:
  - Vengist
  - Kevin Owocki
---

> **TLDR:** Fragmented funding processes create fatigue for grantees (applying to dozens of rounds) and funders (evaluating endless proposals). Aggregation-based solutions like self-curated registries, guilds, and Protocol Guild reduce coordination overhead by pooling projects and funders.

**Source:** [Gitcoin Governance Forum](https://gov.gitcoin.co/t/web3-funding-fatigue-a-growing-problem/19423)

## Summary

Funding fatigue is a critical challenge in Web3 public goods funding, affecting both grant recipients and funders through fragmented processes and high administrative overhead.

## Core Problems

### Supply-Side (Grantee) Fatigue

Grantees must maintain applications across multiple platforms while continuously promoting their work. This creates significant burden as they combat visibility challenges in a distributed, complicated public goods funding ecosystem.

### Demand-Side (Funder) Fatigue

DAOs receive overwhelming funding requests from worthy causes. The system requires excessive computational overhead for funders to observe, orient, decide, and act across the ecosystem.

## Proposed Solutions

### Aggregation of Supply

- A "common app" enabling grantees to apply to multiple programs simultaneously
- Registry protocol interoperability for transferring grant information between platforms

### Aggregation of Demand

- Weighted lists organizing causes that share responsibilities
- Self-curating registries (SCRs) enabling specialized funding guilds
- Tools like Drips, 0xsplits, and Protocol Guild forks to streamline operations

The solution allows funders to support entire categories of public goods rather than evaluating individual projects, while enabling resource pooling for promotion.

Because SCRs are just a simple address with governance and splitting logic, they can be chained and nested together. For example, an SCR representing Ethereum Public Goods could include various guilds, with funding flowing directly through to contributors based on local context.

![Nested self-curating registry for Ethereum Public Goods](/content-images/research/web3-funding-fatigue/nested-scr-ethereum-public-goods.png)

Envisioning what funding flows look like before and after this fatigue issue is solved:

![Funding flows before aggregation — fragmented supply and demand connections](/content-images/research/web3-funding-fatigue/funding-flows-before.png)

![Funding flows after aggregation — streamlined through guild structures](/content-images/research/web3-funding-fatigue/funding-flows-after.png)

## Key Takeaway

Simplifying the funding process through aggregation tools benefits both sides by reducing complexity and computational requirements. The goal is making it as easy to fund an entire category of public goods as it is to fund a single project.
