---
id: '1740000794001'
slug: nouns-dao-governance-evolution
name: 'From Auction to Incubator: The Evolution of Nouns DAO Capital Deployment'
shortDescription: How Nouns DAO evolved from direct proposals to Prop House to Flows.wtf, revealing broader patterns in onchain capital allocation.
banner: /content-images/research/nouns-dao-governance-evolution/banner.jpg
tags:
  - governance
  - nouns
  - capital allocation
  - prop house
  - token curated registry
lastUpdated: '2026-02-25'
relatedMechanisms:
  - auction-based-treasury-funding
  - token-curated-registry
relatedApps:
  - nouns-dao
  - flows-wtf
relatedCaseStudies:
relatedResearch:
relatedCampaigns:
---

**Type:** Analysis
**Authors:** Gitcoin Research

**Sources:**
- [Nouns DAO](https://nouns.wtf/)
- [Prop House](https://prop.house/)
- [Flows.wtf](https://flows.wtf/)
- [Nouns Agora — Proposal 794](https://www.nounsagora.com/proposals/794)
- [Nouns Camp — Proposal 794](https://www.nouns.camp/proposals/794)
- [WTF is Nouns Prop House — Tally Newsletter](https://newsletter.tally.xyz/p/wtf-is-nouns-prop-house)
- [Prop House: Scaling Ecosystem Funding — nouni.sh](https://nouni.sh/8t35zq839c)

## Summary

Nouns DAO is one of the most instructive experiments in onchain capital allocation. Since launching in August 2021, it has iterated through three distinct capital deployment models — direct proposals, Prop House competitive rounds, and Flows.wtf continuous streaming — each responding to concrete failure modes of its predecessor. This evolution mirrors broader patterns in public goods funding: from high-friction governance to lightweight competitive allocation to continuous, community-curated streaming. Proposal 794, which sought to reframe Flows.wtf as an "onchain Y Combinator" focused on project sustainability, represents the frontier of this trajectory.

## Phase 1: Direct Proposals (2021–2022)

Nouns DAO launched on August 17, 2021, with a deceptively simple mechanism: one generative NFT auctioned every 24 hours, with 100% of ETH proceeds flowing to a community-governed treasury. Each Noun grants one vote in a fork of Compound Governance. A minimum of two Nouns is required to submit a proposal.

This model solved the treasury formation problem elegantly — daily auctions created perpetual, sustainable funding without token sales or one-time drops. Within months, the treasury held tens of millions of dollars. But capital accumulation outpaced the community's capacity to deploy it.

### The Friction Problem

Direct proposals carried significant overhead:
- **Two-Noun minimum** excluded most community members from proposing
- **Multi-week lifecycle** — from candidate to sponsorship (three Nouns required) to a 4-day voting window to a 2-day execution queue — meant ideas took weeks to reach funding
- **Binary yes/no votes** created all-or-nothing dynamics unsuitable for small experimental grants
- **Governance fatigue** set in as volume increased, with voter attention spread thin across proposals of widely varying scope and quality

The DAO had capital but lacked a mechanism to deploy it at the speed and granularity needed for ecosystem building.

## Phase 2: Prop House (2022–2024)

Prop House emerged as a direct response to the friction problem, funded through NounsDAO Proposals #23, #62, and #105, totaling 555 ETH for builder grants and 695 ETH for development.

### The Mechanism Innovation

Prop House reframed capital deployment as an auction: the lot is ETH, the bids are proposals. At the end of each round, Noun holders vote on which proposals receive funding. Each Noun was worth ten votes, allowing holders to spread support across multiple proposals in a single round.

This was a meaningful design shift: it lowered the barrier to proposing (no Noun ownership required), shortened the funding cycle (rounds rather than full governance proposals), and enabled parallel evaluation of multiple small-to-medium-sized projects.

### Round Types and Independent Houses

With Proposal 62, Prop House evolved into a protocol supporting independent "houses" — community-specific funding venues where particular NFT communities could hold their own auctions. Round types diversified:

- **Open rounds** accepting proposals of all types
- **Retroactive rewards** funding completed work based on demonstrated impact
- **Infinite rounds** enabling ongoing grant operations via Prop House infrastructure

Projects like Aave, ENS, and ApeCoin expressed interest in or adopted Prop House-style mechanisms, leading to Proposal 105's mandate to make Prop House public infrastructure available to any project.

### Impact and Limitations

Close to 85% of Prop House round winners completed their proposed work — a strong completion rate by DAO funding standards. Prop House became the primary pipeline through which newcomers moved from passive observers to active builders in the Nouns ecosystem.

But Prop House operated in discrete rounds, each requiring coordination to scope, promote, evaluate, and settle. Funded projects had no structural path to sustainability — they received a one-time grant and then needed to return for more funding or find alternative support. The mechanism scaled capital deployment but did not solve the deeper challenge of building durable, self-sustaining projects.

### The Fork Crisis

In September 2023, Nouns DAO's V3 fork mechanism was activated for the first time. Under the rules, any Noun holder could call for a fork if 20% of community-held Nouns joined. Fork #0 resulted in a massive outflow from the treasury, with most forked assets leaving the project entirely rather than being used to rebuild under a different spending vision. The fork exposed deep tensions around spending velocity and governance philosophy that round-based competitive allocation alone could not resolve.

## Phase 3: Flows.wtf and Continuous Streaming (2024–2025)

Flows.wtf represents the next evolution: from discrete competitive rounds to continuous, community-curated fund streaming. Built as a decentralized grants platform using token curated registries (TCRs), Flows enables second-by-second fund distribution to approved recipients, governed by Nouns holders via L2 proofs.

### How Flows Works

Each "flow" defines a funding stream with a specific focus and budget. The mechanism operates through:

- **Token curated registries:** Each flow has its own ERC20 token. Purchasing tokens makes you a curator for that flow, creating skin-in-the-game evaluation.
- **Continuous streaming:** Funds accrue and distribute second-by-second via `block.timestamp`, claimable at any time through compatible EVM wallets.
- **Curator rewards:** 10% of flow budgets distribute to all token holders, incentivizing active curation.
- **Permissionless participation:** Anyone can become a curator or apply for a grant, regardless of Noun ownership.

By early 2026, the platform reported 605 builders funded across active flows including projects in the Higher, Zora, and Farcaster ecosystems.

### Proposal 794: The Sustainability Turn

Proposal 794 — "Flows.wtf - the Nouns incubator (final)" — was submitted in May 2025 requesting $105,000 USDC over five months. The proposal reframed Flows as "an onchain Y Combinator for grassroots projects," with a critical philosophical shift: funded projects should become self-sustainable through commerce and donations rather than depending on continued DAO grants.

Key elements included:
- **Revenue-backed tokens (revnets)** in partnership with Juicebox, where funded projects commit a minimum 10% of revnet tokens to Nouns DAO
- **$15,000** earmarked for sustainability-focused project distribution
- **Legal and tax consultation** ($10,000) reflecting the maturation of DAO operations

The proposal received 169 For votes against 240 Against and 8 Abstain (quorum: 144), indicating the DAO had not yet reached consensus on this sustainability-focused model. The rejection itself is informative — it suggests the community remains divided on whether capital deployment infrastructure should actively pursue recipient sustainability or simply optimize for volume and quality of funded work.

## Patterns and Lessons

### The Capital Deployment Trilemma

Nouns DAO's evolution reveals a recurring tension among three goals:

1. **Governance legitimacy** — ensuring capital deployment reflects genuine community preferences
2. **Deployment velocity** — getting capital to builders fast enough to matter
3. **Recipient sustainability** — building projects that outlast their initial grants

Direct proposals maximized legitimacy but constrained velocity. Prop House improved velocity but sacrificed sustainability. Flows.wtf attempted to address all three simultaneously through continuous streaming and TCR-based curation, while Proposal 794 pushed further toward sustainability through revnet integration.

### From Discrete to Continuous

The trajectory from time-boxed proposals to competitive rounds to continuous streaming mirrors a broader pattern in public goods funding. Discrete allocation events — whether governance proposals, quadratic funding rounds, or Prop House competitions — create temporal bottlenecks, evaluation fatigue, and funding gaps between rounds. Continuous mechanisms like conviction voting, streaming payments, and TCR-based curation attempt to make capital allocation an always-on process, reducing coordination overhead at the cost of increased complexity and potential for gaming.

### Legal and Structural Maturation

Nouns DAO's establishment of a Wyoming DUNA (Decentralized Unincorporated Nonprofit Association) via Proposal 727 represents a parallel evolution: from purely onchain coordination to hybrid legal-onchain structures. The DUNA enables the DAO to hold assets, enter contracts, and participate in legal actions while maintaining decentralized governance. Challenges remain — Mercury Bank denied the DAO's bank account application, and Nouns submitted formal proposals to Wyoming legislators in May 2025 to amend the DUNA Act.

### CC0 as Ecosystem Strategy

Nouns' commitment to CC0 (Creative Commons Zero) licensing — placing all IP in the public domain — enabled an explosion of derivative projects (Lil' Nouns, NounPunks, 3D Nouns) and real-world applications (fashion collections, a DAO-funded animated film, thousands of prescription glasses for children). This open IP strategy transforms the DAO from a closed governance body into a public goods engine where anyone can build on the brand without permission.

## Implications for Public Goods Funding

Nouns DAO's five-year arc offers several insights for the broader public goods funding ecosystem:

1. **Mechanism stacking over mechanism switching:** Rather than replacing each capital deployment model, the ecosystem layered them — direct proposals for large strategic decisions, competitive rounds for mid-tier grants, continuous streaming for ongoing builder support. The most effective funding ecosystems will likely combine multiple mechanisms across different scales and timeframes.

2. **Sustainability as a design goal, not an afterthought:** Proposal 794's revnet model — where funded projects return value to the DAO through token allocations — represents an attempt to move from extractive grant-making (one-time transfers) to generative funding (creating ongoing value loops). Whether or not this specific approach succeeds, the question it asks is the right one.

3. **Fork mechanisms as pressure valves:** The 2023 fork crisis demonstrated that exit rights, while painful, may be necessary governance infrastructure for DAOs managing significant treasuries. The fork mechanism forced the community to confront spending philosophy disagreements that governance proposals alone could not resolve.

4. **Daily auctions as perpetual funding:** Nouns' core innovation — perpetual daily NFT auctions funding a community treasury — remains one of the few models that generates sustainable, ongoing revenue for public goods without relying on protocol fees, token inflation, or external donors. This model has implications for any community seeking to build a self-sustaining funding engine.

## Further Reading

- [**Nouns DAO**](https://nouns.wtf/) — Primary governance interface
- [**WTF is Nouns Prop House** — Tally Newsletter](https://newsletter.tally.xyz/p/wtf-is-nouns-prop-house)
- [**Prop House: Scaling Ecosystem Funding** — nouni.sh](https://nouni.sh/8t35zq839c)
- [**Flows.wtf**](https://flows.wtf/) — Continuous grants platform
- [**Nouns DAO Governance Explained** — Nouns.com](https://www.nouns.com/learn/nouns-dao-governance-explained)
- [**Building Better Governance: Nouns Agora** — Nouns World](https://explore.nouns.world/building-better-governance-nouns-agora/)
- [**Nouns DAO Treasury History** — DigitalOil, Coinmonks](https://medium.com/coinmonks/a-stroll-through-the-history-of-the-nouns-dao-treasury-13991b5c8743)
- [**Nouns and the Philosophy of Governance** — Stanford Blockchain Review](https://review.stanfordblockchain.xyz/p/nouns-dao-and-the-philosophy-of-governance)
