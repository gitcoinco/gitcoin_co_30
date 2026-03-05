---
id: '1741193600006'
slug: pocket-network-retroactive-funding-ecosystem-retropgf
name: "Pocket Network Retroactive Funding — Ecosystem-Specific RetroPGF"
shortDescription: "How Pocket Network implemented retroactive funding for its middleware infrastructure ecosystem, adapting RetroPGF patterns for a specialized community."
tags:
  - retroactive
  - pocket-network
  - grants
  - infrastructure
lastUpdated: '2026-03-05'
relatedMechanisms:
  - retroactive-funding
  - direct-grants
relatedApps:
  - optimism-retropgf
relatedCaseStudies:
  - filecoin-retropgf-retroactive-funding-beyond-optimism
relatedResearch:
  - retropgf-impact-measurement-evolution
relatedCampaigns: []
banner: /content-images/case-studies/pocket-network-retroactive-funding-ecosystem-retropgf/banner.png
---

Pocket Network's Retro POKT Goods Funding (Retro PGF) program launched in mid-2024 as one of the first retroactive funding initiatives purpose-built for a decentralized middleware infrastructure ecosystem. Allocating 750,000 POKT, 60,000 OP, and 70,000 ARB -- roughly $475,000 in total value at the time -- across three categories (Protocol, Ecosystem, and Adoption), the program created a feedback loop: Pocket Network had itself received retroactive rewards from the Optimism ecosystem and chose to redistribute those funds through its own RetroPGF program, demonstrating how retroactive funding can cascade across ecosystems.

## Background

Pocket Network (now also known as Grove) is a decentralized middleware protocol that provides RPC (Remote Procedure Call) infrastructure to blockchain applications. Rather than relying on centralized providers like Infura or Alchemy, developers using Pocket Network route their requests through a decentralized network of node operators. This infrastructure is critical but largely invisible to end users, making it a textbook example of a "public good" that is essential yet chronically underfunded through traditional market mechanisms.

The POKT ecosystem has a long informal history of retroactive recognition. Contributors would complete work and then submit proposals to the DAO for payment after the fact. The GROW grant program had experimented with more structured retroactive approaches. However, these ad-hoc methods lacked the systematic evaluation and community-wide participation that formal RetroPGF programs provide.

The catalyst for a formal program came from an unusual direction: Pocket Network received retroactive funding from the Optimism ecosystem as a recognized contributor. Rather than absorbing these funds into the DAO treasury or the Grove corporate entity, the community decided to pay it forward by establishing its own retroactive funding program -- creating what the team described as a "domino effect" ensuring funds reach the people who create impact.

The program was built using **EasyRetroPGF**, the open-source platform developed by Gitcoin, adapted for the specific needs of a middleware infrastructure community.

## The Mechanism / Program

### Funding Structure

Retro POKT Goods Funding Round 1 allocated three token types, reflecting the multi-chain nature of Pocket Network's contributions:

- **750,000 POKT** -- the native token of Pocket Network.
- **60,000 OP** -- Optimism tokens received through the Optimism RetroPGF program.
- **70,000 ARB** -- Arbitrum tokens from ecosystem grants.

The total value was approximately $475,000 at the time of the proposal, making it a mid-sized retroactive round comparable in scope to CeloRPGF0 and smaller than Filecoin's FIL-RetroPGF rounds.

### Three Categories

The program defined three distinct categories to ensure that different types of contribution were evaluated on their own terms:

1. **Protocol** -- Limited to applicants who contributed directly to the POKT stack itself, including contributions to the core Morse protocol codebase and critical dependencies. This category recognized that core infrastructure work is often the most impactful yet hardest to fund through other mechanisms.

2. **Ecosystem** -- For applicants who delivered impact by creating meaningful tools and applications using the POKT stack. This included developer tooling, monitoring solutions, analytics dashboards, and other infrastructure that made the protocol more usable for operators and application developers.

3. **Adoption** -- For contributions that raised awareness and increased adoption of Pocket Network. This included discussions, referrals, marketing, community support, documentation, and other non-technical work that expanded the network's reach and usability.

### Evaluation and Distribution

Applicants were required to demonstrate past impact -- this was strictly a retroactive round, and no rewards were available for promises of future work. Submissions were open through May 31, 2024, with applicants providing qualitative and quantitative evidence of their contributions.

Badgeholder voting determined allocations, with voters assessing impact based on the evidence provided. The program emphasized that applicants should include as much data as possible to help evaluators make informed decisions.

Rewards were streamed over one month starting from the release date of July 15, 2024, rather than distributed as lump-sum payments. This streaming approach, facilitated through onchain mechanisms, provided a degree of ongoing accountability.

### EasyRetroPGF Integration

The program utilized Gitcoin's EasyRetroPGF platform (impact.pokt.network), which handled the application intake, badgeholder evaluation, and results tallying. This was a deliberate choice to reduce development overhead and benefit from shared tooling improvements across the growing ecosystem of EasyRetroPGF deployments.

## Outcomes

- **Multi-token distribution**: The program successfully managed a complex distribution across three different tokens (POKT, OP, ARB), demonstrating that retroactive funding can accommodate multi-chain treasury structures common in infrastructure DAOs.
- **Retroactive funding cascade**: By redistributing tokens received from Optimism and Arbitrum, Pocket Network created a model for how ecosystem funding can flow downstream to smaller, specialized communities rather than accumulating in intermediary treasuries.
- **Infrastructure-specific evaluation**: The three-category structure provided a framework for evaluating middleware contributions on their own terms, rather than comparing them against consumer-facing applications.
- **Streamed rather than lump-sum distribution**: The one-month streaming period created a more accountable and predictable payout process than one-time transfers.
- **EasyRetroPGF validation**: The program provided another data point confirming that Gitcoin's open-source RetroPGF tooling can be deployed by specialized communities with distinct evaluation needs.

## Challenges and Solutions

**Challenge: Evaluating invisible infrastructure contributions**
Core protocol work and middleware improvements are inherently difficult to evaluate because their impact is measured in reliability, uptime, and absence of failures rather than user-facing metrics.

***Solution:*** The Protocol category was intentionally limited to POKT stack contributions, allowing evaluators to focus on code-level impact metrics (commits, reviews, dependency maintenance) rather than adoption or visibility metrics that would disadvantage infrastructure work.

**Challenge: Multi-token complexity**
Distributing three different tokens across three categories introduced operational complexity around exchange rates, distribution logistics, and tax implications for recipients.

***Solution:*** The streaming distribution mechanism and clear upfront documentation of token amounts per category helped manage complexity, though recipients still needed to handle multi-chain token management.

**Challenge: Small community, potential for capture**
With a relatively small active contributor base compared to ecosystems like Ethereum or Filecoin, the risk of insider capture -- where a small group of well-connected contributors absorbs the majority of funding -- was heightened.

***Solution:*** The three-category structure and badgeholder voting process introduced structural checks. The Adoption category, in particular, ensured that non-technical contributors involved in community growth and awareness could not be crowded out by core protocol developers.

**Challenge: Establishing precedent in a protocol-first culture**
Pocket Network's culture was engineering-centric, and some community members were skeptical that non-technical contributions (marketing, community support, documentation) warranted retroactive rewards.

***Solution:*** The formal PEP-72 governance proposal process legitimized the program through community deliberation, and the Adoption category explicitly validated non-technical work as worthy of retroactive recognition.

## Lessons Learned

- **Retroactive funding can cascade across ecosystems.** Pocket Network's decision to redistribute tokens received from Optimism and Arbitrum rather than accumulate them demonstrates a powerful model for how funding flows can reach specialized communities.
- **Infrastructure DAOs need infrastructure-specific evaluation.** The three-category model (Protocol, Ecosystem, Adoption) provided a useful framework that other middleware and infrastructure-focused communities could adapt.
- **Small ecosystems benefit from shared tooling.** EasyRetroPGF allowed Pocket Network to run a credible round without building custom infrastructure, confirming that the fixed costs of RetroPGF can be amortized across many communities.
- **Streaming payments add accountability.** Distributing rewards over a month rather than as lump sums created a more measured payout process, though the accountability benefits of streaming are more significant for larger amounts or longer durations.
- **Formal governance proposals build legitimacy.** The PEP-72 process ensured that the community debated and endorsed the program before launch, preventing the perception that funds were being allocated by a small group without broader consent.

## Conclusion

Pocket Network's Retro POKT Goods Funding program demonstrated that retroactive public goods funding can be meaningfully adapted for specialized infrastructure ecosystems. By using shared tooling (EasyRetroPGF), defining infrastructure-appropriate evaluation categories, and creating a cascade from Optimism's retroactive funding to its own community, Pocket Network provided a replicable template. The program's most distinctive contribution to the broader RetroPGF movement is the concept of funding cascades: when a protocol receives retroactive rewards, it can amplify impact by redistributing those rewards to its own contributors, extending the reach of retroactive funding deeper into the ecosystem stack.

## Sources

- [Retro POKT Goods Funding -- POKT Network Documentation](https://docs.pokt.network/community/retro-pokt-goods-funding)
- [What is Retro POKT Goods Funding Round 1? -- POKT Network Documentation](https://docs.pokt.network/community/retro-pokt-goods-funding/what-is-retro-pokt-goods-funding-round-1)
- [PEP-72 Retroactive POKT Goods Funding (RPGF) -- Pocket Network Forum](https://forum.pokt.network/t/pep-72-retroactive-pokt-goods-funding-rpgf/5187)
- [Retroactive POKT Goods Funding (Retro PGF) Pre-Proposal -- Pocket Network Forum](https://forum.pokt.network/t/retroactive-pokt-goods-funding-retro-pgf/5076)
- [Submissions Are Now Open for the First Retro POKT Goods Funding -- Pocket Network Blog](https://pocket.network/https-www-pokt-network-blog-submissions-open/)
- [Launching Retro POKT Goods Funding -- POKT Network Blog](https://www.pokt.network/blog/launching-retro-pokt-goods-funding)
- [Retro POKT Goods Funding Impact Hub](https://impact.pokt.network/)
