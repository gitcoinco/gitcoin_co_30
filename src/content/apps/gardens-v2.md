---
id: '1772727452809'
slug: gardens-v2
name: "Gardens"
shortDescription: "Modular community governance platform using conviction voting to allocate resources and signal sentiment across decentralized communities."
logo: /content-images/apps/gardens-v2/logo.png
tags:
  - "governance"
  - "conviction-voting"
  - "DAO"
  - "community"
  - "allo-protocol"
  - "funding-pools"
  - "gnosis"
  - "optimism"
  - "arbitrum"
  - "polygon"
  - "base"
lastUpdated: '2026-03-05'
relatedMechanisms:
  - conviction-voting
  - quadratic-funding
  - direct-grants
relatedApps:
  - allo-protocol
  - gitcoin-grants-stack
  - Tally
  - Snapshot
  - Aragon OSx
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/apps/gardens-v2/banner.png
---

- **Category**: Platform  
- **Status**: Active  
- **Website**: https://app.gardens.fund/  
- **Launch Date**: 2024  
- **Funding Volume**: $200k+ allocated through funding pools  
- **Blockchains**: Gnosis Chain, Polygon, Arbitrum, Optimism, Base, Celo  
- **Social Links**: [Twitter](https://twitter.com/gardens_fund) | [Discord](https://discord.gg/tJWPg69ZWG) | [GitHub](https://github.com/1Hive/gardens-v2) | [Farcaster](https://farcaster.xyz/gardens)

Gardens v2 is a modular governance framework that enables communities to create and manage multiple governance pools with customizable parameters and conviction voting mechanisms. Built on [Allo Protocol v2](https://allo.gitcoin.co/), Gardens is designed for bottom-up decision-making, pairing an enforceable community Covenant with flexible voting pools to securely allocate resources and signal sentiment.

### How It Works

Communities deploy a Garden — a shared governance space anchored by a Covenant that defines community values and norms. Within each Garden, members can create multiple governance pools, each serving a distinct purpose with its own parameters, token requirements, and voting mechanisms. Members stake governance tokens to signal support for proposals, with conviction accumulating over time until a funding threshold is met — no centralized vote required.

### Pool Types

- **Funding Pools**: Allocate funds from a shared token pool to proposals that meet conviction thresholds  
- **Signaling Pools**: Source community sentiment on both onchain and offchain decisions  
- **Streaming Pools**: Stream funds from a shared token pool to proposals based on their conviction.

### Voting Weight Systems

- **Token-weighted**: 1 token = 1 vote  
- **Fixed**: Equal voting power for all members  
- **Quadratic**: Voting weight = √(tokens staked)  
- **Capped**: 1 token = 1 vote up to a maximum threshold

### Architecture

Gardens v2 is built using Diamond Pattern (EIP-2535) smart contract architecture, enabling modular upgrades and unlocking future feature additions without contract size constraints. Contracts are deployed across five networks and integrate with Superfluid Protocol for streaming payment primitives.

### Traction

- 150+ communities created  
- 2,500+ unique community members  
- $200k+ allocated through funding proposals  
- $80k+ TVL across governance pools

### Roadmap

Active development is focused on mobile-first redesign, Streaming Conviction Voting (combining conviction voting with Superfluid streaming primitives), governance pool templates, and deeper ecosystem integrations to support mass adoption.
