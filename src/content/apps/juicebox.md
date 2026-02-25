---
id: '1740500000001'
slug: juicebox
name: "Juicebox"
shortDescription: "Programmable treasury protocol on Ethereum enabling transparent, code-governed fundraising and treasury management for DAOs, projects, and communities."
tags:
  - treasury
  - fundraising
  - dao
lastUpdated: '2026-02-25'
relatedMechanisms:
  - retailism-revenue-networks
relatedApps:
  - revnets
relatedCaseStudies: []
relatedResearch:
  - revnets-retailism-autonomous-public-goods-funding
relatedCampaigns: []
---

**Juicebox** is a programmable treasury management protocol on Ethereum that enables transparent, code-governed fundraising through smart contracts. Created by Jango (jango.eth) and launched in July 2021, it lets projects raise ETH, issue tokens to contributors, and manage treasuries without intermediaries or platform discretion.

## What This App Does

1. Enables projects to create on-chain treasuries with programmable funding cycles and configurable payout rules
2. Issues project tokens to contributors at configurable exchange rates, with optional decay over time
3. Allows token holders to redeem tokens for a proportional share of the treasury (subject to configurable redemption rates)
4. Supports multi-chain deployment across Ethereum, Arbitrum, Base, and OP Mainnet (V4)
5. Powers Revnets — fully autonomous, immutable revenue networks — as a core primitive in V4

## Features

### Core Components
- **Programmable Funding Cycles**: Projects define rules for how funds are received, distributed, and redeemed — all enforced by smart contracts
- **Token Issuance**: Contributors receive project tokens when they pay into a treasury, creating economic alignment between funders and projects
- **Redemption Mechanism**: Token holders can burn tokens to reclaim a proportional share of the treasury, providing a built-in exit
- **Custom Hooks (V4)**: Data hooks, pay hooks, and cash-out hooks enable NFT rewards, token buybacks, and complex distribution models
- **Cross-Chain Bridging**: JBSucker contracts handle bridging project tokens and funds across EVM chains

### Platform Capabilities
- DAO-governed via the $JBX token
- 2.5% fee on payouts, returned as JBX governance tokens
- ERC-721 project ownership (projects are NFTs)
- Supports ETH and ERC-20 token terminals

## Use Cases

### DAO Fundraising
Juicebox became the go-to platform for high-profile DAO fundraises. ConstitutionDAO raised ~$47M (11,613 ETH) from 17,000+ contributors to bid on a first-edition U.S. Constitution. AssangeDAO raised over $55M (16,593 ETH) to support Julian Assange's legal defense — the largest Juicebox project in history.

### Open Source Project Funding
Open source projects deploy Juicebox treasuries to accept ongoing contributions with transparent, programmable rules. Contributors receive tokens representing their stake, creating sustainable funding without recurring grant applications.

### Autonomous Revenue Networks
With V4, Juicebox powers Revnets — immutable, ownerless treasuries that tokenize revenues. Once deployed, a Revnet's rules cannot be changed, making rug pulls impossible and enabling trustless public goods funding.

## Further Reading

- [Juicebox Official Site](https://juicebox.money/)
- [Juicebox V4 Architecture Docs](https://docs.juicebox.money/dev/v4/learn/architecture/)
- [Revnet App](https://www.revnet.app/)
- [Juicebox GitHub](https://github.com/Bananapus/nana-core)
