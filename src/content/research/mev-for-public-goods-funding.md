---
id: '1741169400'
slug: mev-for-public-goods-funding
name: "MEV for Public Goods Funding"
shortDescription: "How Maximal Extractable Value — the hidden tax on every Ethereum transaction — could be redirected to fund public goods infrastructure."
tags:
  - mev
  - public-goods
  - ethereum
  - infrastructure
  - protocol-design
researchType: Report
lastUpdated: '2026-03-05'
relatedMechanisms:
  - auction-based-treasury-funding
  - direct-grants
relatedApps:
  - protocol-guild
  - optimism-retropgf
relatedResearch:
  - revnets-retailism-autonomous-public-goods-funding
  - state-of-public-goods-funding-2024
relatedCaseStudies: []
relatedCampaigns: []
banner: /content-images/research/mev-for-public-goods-funding/banner.png
---

> **TLDR:** Maximal Extractable Value is a hidden tax on every Ethereum transaction — searchers, builders, and validators extract billions annually. Instead of letting it leak into private pockets, MEV could be redirected to fund the public goods infrastructure that makes Ethereum valuable in the first place.

**Type:** Report
**Authors:** Gitcoin Research

**Sources:**
- [Ethereum.org — Maximal Extractable Value](https://ethereum.org/developers/docs/mev/)
- [Flashbots](https://www.flashbots.net)
- [MEV Blocker](https://mevblocker.io/)
- [GreenPill Episode 151 — MEV for Public Goods Funding with Nikete Della Penna](https://sites.libsyn.com/400481/151-mev-for-public-goods-funding-with-nikete-della-penna)

## The Hidden Tax on Every Transaction

Every time someone swaps tokens on Uniswap, borrows from Aave, or mints an NFT on Ethereum, they pay a hidden tax. Not to the protocol. Not to the Ethereum Foundation. To the anonymous operators who sequence transactions into blocks and extract value from the ordering of those transactions.

This hidden tax is called Maximal Extractable Value, or MEV. It represents the total value that can be extracted by reordering, inserting, or censoring transactions within a block. Since Ethereum's transition to proof-of-stake in September 2022, over 500,000 ETH — more than one billion dollars — has been extracted through MEV. Daily MEV extraction has averaged hundreds of thousands of dollars, with spikes reaching tens of millions during periods of high volatility.

MEV is one of the largest sources of unearned revenue in the Ethereum ecosystem. The question is no longer whether MEV exists — it is who captures it, and what they do with it.

This report examines the growing body of proposals, protocols, and experiments aimed at redirecting MEV from private extraction toward public goods funding. The thesis is simple: if MEV is an inevitable byproduct of how blockchains work, it should fund the infrastructure that makes blockchains work.

## How MEV Works

To understand why MEV matters for public goods, you need to understand the mechanics.

### Transaction Ordering as a Source of Value

When a user submits a transaction to Ethereum, it enters a mempool — a waiting area where unconfirmed transactions sit before being included in a block. Block builders (formerly miners, now validators and their delegates) choose which transactions to include and in what order. This ordering power creates extractable value.

Consider a simple example. Alice submits a large swap on a decentralized exchange. Bob, a searcher, sees Alice's pending transaction and realizes he can profit by:

1. **Front-running:** Placing a buy order before Alice's swap, driving the price up, then selling after Alice's trade executes at the higher price.
2. **Back-running:** Placing a trade immediately after Alice's swap to capture the price impact.
3. **Sandwiching:** Combining both — buying before and selling after Alice's trade, extracting value from both sides.

Alice pays more for her swap than she should. The difference is captured by Bob. This is MEV in its most common and most harmful form.

### Beyond Sandwich Attacks

MEV is not limited to predatory strategies. It includes:

- **DEX arbitrage:** Equalizing prices across trading venues. This is generally positive — it improves market efficiency.
- **Liquidations:** Triggering undercollateralized loans in lending protocols. This is necessary for protocol health but creates competition that can be wasteful.
- **JIT (Just-In-Time) liquidity:** Providing liquidity to a pool moments before a large trade, then withdrawing it after. This is a gray area — it benefits the trader but extracts value from passive liquidity providers.

The key insight is that MEV is structural, not behavioral. It exists because transaction ordering matters and because block builders have discretion over that ordering. You cannot eliminate MEV without eliminating the sequential processing of transactions. What you can do is change who captures it and where it flows.

## The Current MEV Supply Chain

The modern MEV supply chain on Ethereum is a multi-layered system:

**Users** submit transactions. **Searchers** scan the mempool for MEV opportunities and construct bundles of transactions designed to capture that value. **Block builders** aggregate bundles from searchers and construct complete blocks. **Proposers** (validators) select the highest-value block to propose to the network.

The key intermediary in this system is **MEV-Boost**, an open-source protocol developed by Flashbots. MEV-Boost separates the roles of block building and block proposing, allowing specialized builders to compete for the right to construct blocks while validators simply select the most profitable one. This separation was designed to prevent the centralization of validator power, but it created a new layer of sophisticated actors — block builders — who capture a significant share of MEV.

The result is a system where MEV flows primarily to searchers, builders, and validators, with users bearing the cost. Public goods see none of it.

## Flashbots and the Mission to Redirect MEV

Flashbots is the most important organization in the MEV ecosystem. Founded in 2020 as a research and development organization, its stated mission is to mitigate the negative externalities of MEV through three principles: illuminate (bring transparency to MEV activity), democratize (open access to MEV extraction), and distribute (redirect MEV to the broader community).

### MEV-Share: Returning Value to Users

MEV-Share is Flashbots' most significant contribution to the redistribution question. The protocol allows users to selectively share transaction data with searchers, who then bid to include those transactions in their bundles. The winning bid is split: 90% goes back to the user, 10% to the validator.

This is a direct mechanism for returning MEV to the parties who created it. If Alice's swap generates $100 in MEV, MEV-Share ensures that $90 flows back to Alice rather than being captured entirely by searchers. The remaining $10 goes to the validator as compensation for including the bundle.

MEV-Share does not fund public goods directly. But it establishes an important principle: MEV is not a natural entitlement of block builders. It is a resource that can be redirected through mechanism design.

### SUAVE: Decentralizing Block Building

Flashbots' more ambitious project is SUAVE — the Single Unifying Auction for Value Expression. SUAVE is designed to decentralize the block builder role itself, creating an Ethereum-native, MEV-aware, privacy-first encrypted mempool that eliminates central points of control, including Flashbots itself.

SUAVE's significance for public goods is structural rather than direct. By decentralizing block building, it removes the possibility of any single actor monopolizing MEV extraction. This creates space for protocol-level mechanisms that redirect MEV toward collective purposes rather than private capture.

## MEV Blocker: Practical Redistribution

MEV Blocker, jointly developed by CoW Protocol, Agnostic Relay, and Beaver Build, takes a more practical approach. It is a specialized RPC (Remote Procedure Call) endpoint that users can add to their wallet. Transactions sent through MEV Blocker are hidden from the public mempool, protecting them from front-running and sandwich attacks.

But MEV Blocker does more than protect — it redistributes. When searchers submit bids to back-run transactions (the non-harmful form of MEV), the winning bid is split between the user (90%) and the validator (10%). Users who route transactions through MEV Blocker do not just avoid paying the MEV tax — they receive a portion of the MEV their transactions generate.

This is the closest existing implementation of "MEV for users," and it demonstrates that redistribution is technically feasible and economically sustainable. The next step is extending the same logic from individual users to collective public goods.

## MEV Taxes: A Protocol-Level Approach

In 2024, Dan Robinson and Dave White of Paradigm proposed a more fundamental mechanism: MEV taxes. The idea is to allow smart contracts to automatically charge fees proportional to the priority fee of a transaction, effectively capturing a percentage of MEV at the application layer.

### How MEV Taxes Work

When a searcher submits a transaction to capture MEV, they set a priority fee that determines how quickly the transaction is included. The higher the priority fee, the more MEV the searcher expects to capture. An MEV tax is a smart contract function that reads the priority fee and charges the searcher a percentage of it.

For example, a DEX contract could impose a 50% MEV tax on any transaction with a priority fee above a certain threshold. If a searcher sets a priority fee of $1,000 (indicating they expect to capture at least $1,000 in MEV), the contract automatically directs $500 to a designated address — which could be a public goods fund, a treasury, or any other collective resource.

### Limitations and Applicability

The MEV tax mechanism relies on "priority ordering" — the assumption that block builders will order transactions strictly by priority fee. This property holds on OP Stack Layer 2 chains (OP Mainnet, Base, Blast) where a single trusted sequencer orders transactions. It does not reliably hold on Ethereum Layer 1, where competitive block building means that builders optimize for total block value rather than ordering by priority fee.

This is a significant limitation. MEV taxes are most viable on Layer 2 networks, not on Ethereum mainnet. But given that transaction volume is increasingly shifting to L2s, this may be less of a constraint than it initially appears.

### Implications for Public Goods

If MEV taxes become standard on L2 networks, they could create a sustained, automatic revenue stream for public goods. Every DEX swap, every lending liquidation, every NFT trade that generates MEV would contribute a percentage to collective infrastructure. This is not a voluntary donation. It is a protocol-level mechanism that captures value at the point of extraction.

The comparison to real-world taxation is instructive but imperfect. MEV taxes are not imposed by a government on unwilling subjects. They are imposed by smart contracts on actors who are extracting value from shared infrastructure. The moral logic is closer to a severance tax on resource extraction: if you are extracting value from a shared system, you should contribute to maintaining that system.

## The Ethical Dimension

The case for redirecting MEV to public goods rests on a straightforward ethical argument: MEV is a negative externality that harms ordinary users. If that negative externality can be captured and redirected toward positive externalities — infrastructure, research, education, security — then the net harm is reduced and the net benefit is increased.

As discussed in GreenPill Episode 151 with Nikete Della Penna, the question of how MEV should be leveraged is not just technical but deeply normative. Della Penna, a mechanism designer with a PhD at the intersection of economics and machine learning, frames markets themselves as a form of collective intelligence. The way MEV flows through the system reflects the values encoded in that system's design. Change the design, and you change the values.

The current design says: MEV belongs to whoever can extract it fastest. A redesigned system might say: MEV belongs to the infrastructure that made it possible.

## Technical Approaches: A Taxonomy

Several technical approaches to redirecting MEV toward public goods are either proposed or in development:

### 1. User-Level Redistribution (MEV-Share, MEV Blocker)
Returns MEV to the users whose transactions generated it. Not directly a public goods mechanism, but establishes the principle that MEV can be redirected.

### 2. Application-Level Taxation (MEV Taxes)
Smart contracts capture a percentage of MEV at the point of extraction. Funds can be directed to any address, including public goods treasuries. Works best on L2 networks with priority ordering.

### 3. Protocol-Level Commitments
Block builders or sequencers commit to directing a percentage of MEV revenue to public goods. This could be implemented through governance (e.g., L2 sequencers voluntarily adopting public goods commitments) or through protocol rules (e.g., requiring sequencers to send a percentage of revenue to a designated contract).

### 4. MEV-Aware Funding Mechanisms
Funding mechanisms that explicitly account for MEV as a revenue source. For example, a quadratic funding round could be partially funded by MEV revenue generated during the round itself — creating a reflexive loop where on-chain activity directly funds the public goods that enable that activity.

### 5. Builder Auctions with Public Goods Requirements
Modifying the block builder auction process to require builders to allocate a percentage of their revenue to public goods as a condition of participation. This could be implemented through MEV-Boost modifications or through new auction protocols.

## Precedents and Parallels

The idea of redirecting economic externalities toward public goods is not new. It has precedents in multiple domains:

**Carbon taxes** capture the negative externality of greenhouse gas emissions and direct revenue toward climate mitigation and adaptation. MEV taxes serve an analogous function for on-chain externalities.

**Spectrum auctions** require telecommunications companies to pay for access to public radio spectrum, with revenue funding public services. Block building auctions could impose similar requirements.

**Severance taxes** charge resource extraction companies for depleting shared natural resources. MEV extraction depletes user value in a shared computational environment.

The key difference is that MEV taxes can be implemented programmatically, without legislation, courts, or enforcement agencies. The smart contract is the judge, jury, and tax collector. This makes the mechanism more credibly neutral but also more rigid — there is no appeals process, no case-by-case discretion, no adaptation to changing circumstances without a protocol upgrade.

## The Scale of the Opportunity

The numbers suggest that MEV-funded public goods could be significant. If total MEV extraction on Ethereum and its L2s reaches several billion dollars annually, even a modest 10% redirection would generate hundreds of millions of dollars per year for public goods — dwarfing current funding levels from grants programs and retroactive funding rounds.

For comparison, Gitcoin has distributed approximately $67 million over its entire history. A 10% MEV tax could generate that amount in a single year.

This does not mean MEV taxes should replace existing funding mechanisms. Quadratic funding, retroactive funding, and direct grants serve distinct functions that MEV revenue cannot replicate — particularly the signal aggregation and community legitimacy that come from participatory allocation. But MEV revenue could provide the matching pools, treasury reserves, and baseline funding that make those mechanisms sustainable.

## Open Questions

Several questions remain unresolved:

**Governance of MEV revenue.** If MEV is redirected to a public goods fund, who decides how it is allocated? A DAO? A multisig? An automated mechanism? The governance question is at least as important as the technical question.

**Competition between L2s.** If one L2 imposes MEV taxes and another does not, economic activity may migrate to the tax-free chain. This is the same dynamic that limits real-world taxation, and it may require cross-chain coordination to address.

**Measurement and transparency.** MEV is difficult to measure precisely. Current estimates vary widely and depend on methodological assumptions. Reliable measurement is a prerequisite for effective taxation.

**Interaction with other funding sources.** How does MEV revenue interact with existing funding mechanisms? Does it complement or crowd out voluntary donations, matching pools, and protocol-level commitments?

**Searcher behavior.** If MEV taxes reduce the profitability of extraction, will searchers find ways to circumvent them? The history of tax avoidance in traditional finance suggests that some degree of cat-and-mouse is inevitable.

## Conclusion

MEV is not going away. It is a structural feature of how blockchains process transactions, and as on-chain economic activity grows, MEV will grow with it. The question is not whether MEV exists but whether it serves private extraction or public infrastructure.

The tools to redirect MEV toward public goods are already being built. MEV-Share and MEV Blocker demonstrate user-level redistribution. MEV taxes demonstrate application-level capture. SUAVE demonstrates protocol-level decentralization. What remains is the political and social will to deploy these tools at scale — and the governance infrastructure to allocate the resulting revenue wisely.

If the Ethereum ecosystem can solve this problem, it will have achieved something that no traditional economy has managed: a self-funding public goods infrastructure, paid for by the economic activity it enables, without requiring legislative authority or coercive enforcement. The hidden tax on every transaction would become a visible investment in the shared infrastructure that makes those transactions possible.

That is a future worth building toward.
