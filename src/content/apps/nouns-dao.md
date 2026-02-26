---
id: '1740000794002'
slug: nouns-dao
name: "Nouns DAO"
shortDescription: "Perpetual NFT auction DAO deploying capital through governance proposals, Prop House rounds, and continuous streaming via Flows.wtf."
tags:
  - governance
  - nft
  - auction
  - cc0
  - public goods
lastUpdated: '2026-02-25'
relatedMechanisms:
  - auction-based-treasury-funding
  - token-curated-registry
  - direct-grants
relatedApps:
  - flows-wtf
relatedCaseStudies:

relatedResearch:
  - nouns-dao-governance-evolution
relatedCampaigns:

banner: /content-images/apps/nouns-dao/banner.png
---

**Nouns DAO** is an Ethereum-based decentralized autonomous organization that generates and auctions one unique 32x32 pixel NFT every 24 hours, with 100% of proceeds flowing to a community-governed treasury. Launched on August 17, 2021, by a group of ten co-founders (known as Nounders, including Vine founder Dom Hofmann), Nouns pioneered a perpetual auction model that creates sustainable, ongoing funding for community-directed initiatives without relying on token sales or external donors.

The DAO uses a fork of Compound Governance where each Noun NFT grants one vote. All artwork is generative and stored fully onchain using custom run-length encoding. Nouns are released under CC0 (Creative Commons Zero), placing all IP in the public domain and enabling an ecosystem of derivative projects, real-world applications, and brand proliferation without permission requirements.

## What This Platform Does

Nouns DAO operates as a self-sustaining public goods funding engine that has deployed capital through three evolving models:

- **Direct governance proposals** for large strategic decisions, requiring two Nouns to propose and three to sponsor, with a multi-stage lifecycle including community review, voting, and onchain execution
- **Prop House competitive rounds** for mid-tier grants, where the lot is ETH and the bids are proposals — each Noun is worth ten votes, allowing holders to spread support across multiple proposals per round
- **Flows.wtf continuous streaming** for ongoing builder support, using token curated registries (TCRs) to enable community-curated, second-by-second fund distribution

This layered approach enables the DAO to fund everything from Super Bowl commercials and animated films to developer tooling and prescription glasses for children.

## Features

### Daily Perpetual Auctions

The Nouns Auction Contract mints and auctions one Noun every 24 hours, forever. Settlement of each auction triggers minting of the next Noun and a new auction cycle. The system operates trustlessly as long as Ethereum is running — anyone can trigger settlement, though winning bidders are most incentivized to do so. Every tenth Noun during the first five years is allocated to the Nounders as founder compensation, without disrupting the auction cadence.

### Onchain Governance

Nouns DAO uses a fork of Compound Governance with a proposal lifecycle spanning approximately 9 days: an editable stage (2.5 days), pending stage (0.5 days), active voting (4 days), and queueing/execution (2 days). The Nouns Foundation — an "ownerless" Cayman Foundation Company — retains veto power over proposals introducing existential legal or structural risks.

### Prop House

Funded through NounsDAO Proposals #23, #62, and #105 (totaling 555 ETH for builder grants and 695 ETH for development), Prop House introduced competitive funding rounds where community members vote on which proposals receive funding. Round types include open rounds, retroactive rewards for completed work, and infinite rounds for ongoing grant operations. Close to 85% of round winners completed their proposed work. Prop House was later opened as public infrastructure for any community.

### Fork Mechanism

Implemented as part of the V3 upgrade in 2023, the fork mechanism allows Noun holders to call for a fork when 20% of community-held Nouns join. Forkers separate with their proportional share of treasury assets into a fork DAO where members can exit and claim funds at any time. Fork #0 resulted in significant treasury outflow but established exit rights as core governance infrastructure.

### DUNA Legal Framework

Proposal 727 established Nouns DUNA — a Wyoming Decentralized Unincorporated Nonprofit Association — providing limited liability protection, the ability to hold assets and enter contracts, and legal standing, all while maintaining fully decentralized onchain governance.

### CC0 and Open IP

All Nouns art and branding is released under CC0. This has enabled derivative NFT collections (Lil' Nouns, NounPunks, 3D Nouns), consumer products, the first DAO-funded animated film (*The Rise of Blus*), fashion collections, and real-world charitable initiatives — all without requiring permission from the DAO.

## Use Cases

### Ecosystem Grant-Making

Communities and DAOs seeking to fund ecosystem development use Nouns' layered model as a reference architecture: high-value strategic proposals through governance, mid-tier competitive grants through rounds, and ongoing builder support through streaming. The Prop House model was adopted by communities including ENS and ApeCoin.

### Public Goods and Brand Proliferation

Nouns' CC0 strategy enables anyone to build on the brand, creating network effects that increase Noun auction prices and treasury value. The DAO has funded prescription glasses for children, public art installations, and open-source software — demonstrating that public domain IP can create a positive feedback loop between brand building and public goods funding.

### Governance Experimentation

Nouns serves as a live testbed for onchain governance innovations including fork-based exit mechanisms, delegation markets (via Nouns Agora), AI-assisted governance (GoverNoun), and broader participation tokens ($NOGS) that extend voting influence beyond Noun holders.

## Further Reading

- [**Nouns DAO**](https://nouns.wtf/) — Primary governance interface
- [**Nouns DAO Governance Explained** — Nouns.com](https://www.nouns.com/learn/nouns-dao-governance-explained)
- [**Nouns and the Philosophy of Governance** — Stanford Blockchain Review](https://review.stanfordblockchain.xyz/p/nouns-dao-and-the-philosophy-of-governance)
- [**WTF is Nouns Prop House** — Tally Newsletter](https://newsletter.tally.xyz/p/wtf-is-nouns-prop-house)
- [**What Are Nouns?** — Decrypt](https://decrypt.co/resources/what-are-nouns-the-nft-dao-building-open-source-ip)
- [**A Stroll Through the History of the Nouns DAO Treasury** — Coinmonks](https://medium.com/coinmonks/a-stroll-through-the-history-of-the-nouns-dao-treasury-13991b5c8743)
