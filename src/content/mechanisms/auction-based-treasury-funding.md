---
id: '1740000794004'
slug: auction-based-treasury-funding
name: "Auction-Based Treasury Funding"
shortDescription: "Perpetual NFT auction mechanism that generates sustainable, ongoing treasury revenue through daily asset sales."
tags:
  - auction
  - treasury
  - nft
  - perpetual
lastUpdated: '2026-02-25'
relatedMechanisms:
  - direct-grants
  - conviction-voting
relatedApps:
  - nouns-dao
relatedCaseStudies:

relatedResearch:
  - nouns-dao-governance-evolution
relatedCampaigns:

banner: /content-images/mechanisms/auction-based-treasury-funding/banner.png
---

**Auction-based treasury funding** is a capital formation mechanism in which a protocol continuously generates and auctions digital assets — typically NFTs — on a fixed schedule, with 100% of proceeds flowing to a community-governed treasury. Unlike token sales, fundraising rounds, or protocol fee extraction, this model creates a perpetual, self-sustaining funding engine that operates trustlessly as long as the underlying blockchain functions and there are interested bidders.

The mechanism was pioneered by Nouns DAO in August 2021, which auctions one generative NFT every 24 hours with all ETH proceeds deposited directly into the DAO treasury. This slow-growth model introduces opportunity cost to rapid accumulation, distributes ownership over time, and generates ongoing revenue without relying on external donors, token inflation, or one-time capital events.

## How It Works

Most DAOs and onchain communities face a fundamental funding challenge: they raise capital through a one-time event (token sale, NFT drop, or fundraise) and then spend down a finite treasury. This creates urgency around capital preservation, fear of depletion, and pressure to generate returns on treasury assets. Auction-based treasury funding replaces this model with perpetual revenue generation, where the treasury is continuously replenished through ongoing asset sales.

1. **Asset generation:** A smart contract generates a new digital asset — typically a generative NFT with algorithmically combined traits — on a fixed schedule (e.g., daily). The generation process is deterministic and fully onchain, requiring no human intervention. In Nouns' implementation, artwork is stored directly onchain using custom run-length encoding rather than IPFS, ensuring permanent availability.

2. **Auction execution:** Each newly generated asset is immediately placed into a time-boxed auction (e.g., 24 hours). The auction contract accepts ETH bids, with each new bid extending the auction if placed near the deadline. When the auction closes, the settlement transaction simultaneously transfers the asset to the winner, deposits 100% of proceeds into the DAO treasury, mints the next asset, and starts the next auction cycle.

3. **Trustless perpetuation:** The system is designed to operate indefinitely without manual intervention. While the winning bidder is most incentivized to settle each auction, anyone can trigger settlement, ensuring the cycle continues as long as Ethereum is operational. This trustless perpetuation distinguishes the mechanism from grant programs or fundraising campaigns that require ongoing human coordination.

4. **Governance-linked ownership:** Each auctioned asset carries governance rights — typically one vote per asset in a DAO governance framework. This creates a direct link between capital contribution and governance influence, where buying an asset at auction simultaneously funds the treasury and grants decision-making power over how that treasury is deployed.

5. **Treasury deployment:** The accumulated treasury is governed by asset holders through an onchain governance mechanism (typically a fork of Compound Governance). Holders propose, vote on, and execute treasury allocations — from direct grants and competitive rounds to continuous streaming and strategic investments.

## Advantages

- **Perpetual funding:** Unlike one-time fundraising events, daily auctions generate ongoing revenue indefinitely, eliminating treasury depletion as a structural concern and enabling long-term planning horizons.
- **Distributed ownership over time:** The slow-growth model — one asset per day rather than a batch sale — introduces opportunity cost to rapid accumulation by any single actor, naturally distributing governance power across a broader set of participants over time.
- **Full treasury alignment:** Because 100% of proceeds flow to the community treasury (rather than a team, foundation, or investors), there is no structural tension between treasury growth and insider enrichment.
- **Trustless operation:** The auction contract operates autonomously without requiring human coordination, legal entities, or fundraising infrastructure. This reduces operational overhead and eliminates single points of failure.
- **Market-driven pricing:** Daily auctions provide continuous price discovery, creating a real-time signal of community interest and market valuation that can inform governance decisions about spending velocity and treasury management.
- **Governance acquisition cost:** The auction mechanism sets a market price for governance influence, making governance capture economically costly and transparent — a buyer must outbid others in a public auction to gain each incremental vote.

## Limitations

- **Revenue volatility:** Auction proceeds fluctuate with market conditions, NFT sentiment, and community momentum. Bear markets or declining interest can dramatically reduce daily revenue, creating budget uncertainty for funded projects.
- **Whale concentration risk:** Despite the one-per-day cadence, wealthy participants can accumulate governance power by winning successive auctions, especially during low-interest periods when competition is reduced.
- **Cold start dependency:** The mechanism requires sufficient initial interest and bidding competition to generate meaningful treasury revenue. Without a compelling brand, community, or utility proposition, auctions may settle at minimal prices.
- **Governance overhead:** As the treasury grows, the governance surface area expands — more proposals, more diverse stakeholder interests, more complex spending decisions. The mechanism generates capital but does not inherently scale the community's capacity to deploy it wisely.
- **NFT market correlation:** Treasury revenue is tightly coupled to NFT market conditions, which have shown extreme cyclicality. A sustained NFT bear market can reduce revenue to near zero while governance costs remain constant.
- **Founder compensation constraints:** Reserving a percentage of generated assets for founders (as Nouns does with every tenth Noun for five years) dilutes governance and creates perceived insider advantage, even though it avoids direct treasury extraction.

These limitations highlight the mechanism's core dependency: auction-based treasury funding works well when there is sustained demand for the auctioned asset, and struggles when that demand declines. Pairing it with complementary revenue sources or treasury management strategies may be necessary for long-term sustainability.

## Best Used When

Auction-based treasury funding works best when:

- A community needs perpetual, sustainable treasury revenue rather than a one-time capital event
- The auctioned asset carries meaningful utility (governance rights, identity, community membership) beyond speculative value
- Slow, distributed ownership growth is preferred over rapid token distribution
- Full alignment between capital formation and community governance is a design goal
- The community has sufficient brand, cultural, or functional appeal to sustain ongoing auction demand
- Treasury deployment mechanisms exist to match the pace of capital accumulation

## Examples and Use Cases

**Nouns DAO** is the canonical implementation, auctioning one generative 32x32 pixel NFT every 24 hours since August 2021. The treasury accumulated tens of millions of dollars, funding initiatives ranging from Super Bowl commercials and animated films to developer tooling and charitable programs (including thousands of prescription glasses for children). The model proved that perpetual auctions could generate meaningful, ongoing public goods funding. Nouns' CC0 licensing further amplified the model's impact by enabling permissionless derivative creation.

**Lil Nouns** adapted the Nouns model with a faster auction cadence (one Lil Noun every 15 minutes) and lower price points, targeting broader participation and more frequent governance engagement. The experiment demonstrated that the auction-based treasury model could be parameterized for different community sizes and price ranges.

**Purple DAO** applied the Nouns-style daily auction mechanism to the Farcaster ecosystem, funding community development and ecosystem growth for the decentralized social protocol. Purple demonstrated the model's portability across different community contexts beyond Nouns' specific cultural identity.

**Builder DAO** used a Nouns-fork auction mechanism focused on funding builders and developers in the web3 ecosystem, adapting the perpetual auction model for a more technically focused community with different spending priorities.

## Further Reading

- [**Nouns DAO**](https://nouns.wtf/) — The canonical implementation of auction-based treasury funding
- [**Nouns: A Structure for DAOs** — Amberdata](https://blog.amberdata.io/nouns-a-structure-for-daos)
- [**Nouns DAO Governance Explained** — Nouns.com](https://www.nouns.com/learn/nouns-dao-governance-explained)
- [**What Are Nouns?** — Decrypt](https://decrypt.co/resources/what-are-nouns-the-nft-dao-building-open-source-ip)
- [**A Stroll Through the History of the Nouns DAO Treasury** — Coinmonks](https://medium.com/coinmonks/a-stroll-through-the-history-of-the-nouns-dao-treasury-13991b5c8743)
