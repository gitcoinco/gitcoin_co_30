---
id: '1743667200015'
slug: streaming-and-continuous-funding
name: "Streaming & Continuous Funding"
shortDescription: "The dominant model for funding public goods -- discrete grant rounds with lump-sum payments -- is giving way to continuous, per-second capital flows through token streaming, conviction-based allocation, and autonomous treasury systems."
tags:
  - streaming
  - continuous
  - token-streaming
  - superfluid
  - sablier
  - drips
  - conviction-voting
researchType: Report
lastUpdated: '2026-04-03'
authors:
  - "Kevin Owocki"
relatedMechanisms:
  - token-streaming
  - conviction-voting
  - streaming-quadratic-voting
  - retailism-revenue-networks
  - autopgf
  - aqueduct
relatedApps:
  - sablier
  - superfluid
  - drips
  - protocol-guild
  - flows-wtf
  - revnets
relatedResearch: []
relatedCaseStudies: []
relatedCampaigns: []
banner: /content-images/research/streaming-and-continuous-funding/banner.png
---

The dominant model for funding public goods -- discrete grant rounds with lump-sum payments -- is giving way to continuous, per-second capital flows. Token streaming, conviction-based allocation, and autonomous treasury systems represent a fundamental shift: from funding as an event to funding as an ongoing relationship between capital and the work it supports.

## The Shift from Lump-Sum to Per-Second

Token streaming distributes ERC-20 tokens continuously over time, typically calculated per second, rather than through discrete transfers. A sender deposits tokens into a smart contract that programmatically accrues value to a recipient as time passes. Recipients withdraw earned balances at any time. This solves a core misalignment in traditional grants: upfront payments shift risk to funders, while deferred payments create cash flow uncertainty for contributors. Streaming splits the difference -- capital flows as work happens.

The mechanism is allocation-agnostic: streaming can distribute funds originally allocated through quadratic funding, retroactive funding, direct grants, or DAO governance. It operates at the execution layer of the funding stack, determining *how* capital moves after *what* to fund has already been decided.

## Streaming Infrastructure

Three protocols form the infrastructure backbone of onchain streaming:

**Sablier**, launched in 2019, is the first token streaming protocol in the Ethereum ecosystem. It offers fixed-duration vesting (Lockup), open-ended recurring payments (Flow), and scalable token distribution (Merkle Airdrops) across 28+ chains. By 2024, Sablier reported approximately $250M in median TVL and over 552,800 token streams created. Organizations including Nouns DAO, Uniswap Governance, and Balancer have used the protocol.

**Superfluid** introduces the Super Token standard and streaming agreements, enabling per-second payments through programmable smart contracts. Used by ENS DAO, Optimism, and Gitcoin's Allo Protocol, Superfluid powers streaming-based salary, grants, vesting, and subscription flows across multiple EVM networks.

**Drips**, built within the Radworks ecosystem alongside Radicle, focuses specifically on open source software funding. Its core primitive is the Drip List -- a curated list of up to 200 GitHub repositories or Ethereum addresses, each assigned a percentage share of incoming funds. When maintainers claim funds, they can configure their own dependency lists and forward a percentage upstream, creating composable funding graphs where deeply nested dependencies receive funding indirectly.

## Protocol Guild: Streaming at Scale

Protocol Guild is the most successful demonstration of streaming for public goods. The collective fund supports Ethereum Layer 1 core protocol contributors through long-term onchain token vesting. It maintains a publicly verifiable registry of active contributors and distributes donated assets directly to individuals. Protocol Guild does not evaluate proposals, direct work, or influence governance -- it simply streams capital to the people building Ethereum's core infrastructure. The protocol has received over $100M in donations from projects building on Ethereum, making it a proof point that streaming-based funding can operate at significant scale.

## Continuous Governance: Conviction Voting

Conviction voting extends the continuous paradigm from payments to governance itself. Rather than time-boxed voting windows, participants stake tokens on proposals continuously, with voting power accumulating over time via an exponential decay function. When accumulated conviction crosses a dynamic threshold, proposals pass automatically and funds disburse. Streaming quadratic voting combines this continuous approach with quadratic cost functions, letting participants stream support to proposals and rebalance dynamically as conditions evolve.

## Autonomous Systems: Revnets and AutoPGF

The most radical extension of continuous funding removes human allocation decisions entirely. Revnets (Revenue Networks) are fully autonomous, immutable smart contract treasuries that tokenize revenue and enforce deterministic economic rules. Deployed once with four locked parameters -- premint, entry curve, exit curve, and optional boost period -- Revnets operate without governance, owners, or human intervention. The philosophy of Retailism treats investors and customers as alike, encoding this insight into immutable contracts.

AutoPGF eliminates governance friction by automating capital distribution based on predefined signals -- protocol fees, usage metrics, contribution data, or community votes. Three primary models have emerged: protocol-native PGF (percentage of fees to public goods), signal-based streaming (real-time flows from votes or metrics), and trigger-based allocations (threshold-activated distributions).

## Aqueduct Routing

Aqueduct infrastructure creates programmable capital pipelines connecting funding sources to recipients. Like Roman aqueducts routing water across distances, funding aqueducts enable continuous flows that split, merge, redirect, and cascade through multiple recipients. Combined with Flows.wtf -- where token curated registries govern continuous streaming to approved builders -- these systems point toward a future where public goods funding is always-on infrastructure rather than periodic philanthropic events.
