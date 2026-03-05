---
id: '1741193600002'
slug: filecoin-retropgf-retroactive-funding-beyond-optimism
name: "Filecoin RetroPGF — Retroactive Funding Beyond Optimism"
shortDescription: "How the Filecoin ecosystem adopted retroactive public goods funding using Drips infrastructure, distributing over 580,000 FIL across multiple rounds."
tags:
  - retroactive
  - filecoin
  - grants
  - cross-ecosystem
lastUpdated: '2026-03-05'
relatedMechanisms:
  - retroactive-funding
  - direct-grants
relatedApps:
  - drips
  - optimism-retropgf
relatedCaseStudies:
  - optimism-from-plasma-group-research-to-a-2b-layer-2-ecosystem
relatedResearch:
  - retropgf-impact-measurement-evolution
relatedCampaigns: []
banner: /content-images/case-studies/filecoin-retropgf-retroactive-funding-beyond-optimism/banner.png
---

Filecoin's FIL-RetroPGF program is the most ambitious adoption of retroactive public goods funding outside the Optimism Collective. Across three rounds between early 2024 and late 2025, the program grew from 200,000 FIL in Round 1 to 585,000 FIL in Round 3, funding nearly 200 unique projects that maintain the decentralized storage network's infrastructure, tooling, and community. By Round 3, the program had migrated its full application and distribution pipeline to the Drips protocol on Filecoin Virtual Machine (FVM), demonstrating that retroactive funding can be ported across ecosystems with the right tooling.

## Background

Retroactive public goods funding was pioneered by the Optimism Collective, which ran its first RetroPGF experiment in 2022 and has since distributed hundreds of millions of dollars to Ethereum public goods. The core insight -- that it is easier to agree on what was useful than to predict what will be useful -- resonated well beyond Optimism's boundaries.

Filecoin, the decentralized storage network launched by Protocol Labs, faced a familiar challenge: critical infrastructure dependencies, developer tools, documentation, and community resources were chronically underfunded relative to their importance. Traditional grant programs required applicants to propose future work, creating a bias toward legible, short-term deliverables over the steady maintenance and ecosystem stewardship that keeps a protocol running.

Protocol Labs' public goods funding (PL PGF) team recognized that Optimism's retroactive model could be adapted for Filecoin's distinct ecosystem. The result was FIL-RetroPGF, designed to reward contributions that had already delivered measurable value to the network.

## The Mechanism / Program

### Round 1 (Early 2024)

FIL-RetroPGF-1 allocated 200,000 FIL to retroactively fund contributions to the Filecoin ecosystem. The round used a badgeholder voting model adapted from Optimism: a curated group of ecosystem participants assessed nominated projects across seven categories including Infrastructure & Dependencies, Tooling & Utilities, Education & Outreach, Protocol R&D, Governance, and Product & UX.

Over 150 projects were nominated, 106 were deemed eligible, and 99 ultimately received funding. The distribution was notably flat: the mean allocation was 1,860 FIL, the median was 1,883 FIL, and the top-scoring project received 4,635 FIL. The top 5 projects captured only about 10.5% of total funding, a stark contrast to winner-take-most dynamics common in many grant programs.

### Round 2 (Fall 2024)

Round 2 increased the pool to 270,000 FIL and focused on contributions made between April and September 2024. It funded 97 projects, with 77 returning applicants from Round 1 (of whom 60 received funding, accounting for approximately 248,000 FIL or 92% of the total pool). The distribution shifted toward a power-law pattern: the top 2% of projects received 10% of funding, and the top 24% received half.

Categories were refined to six: Infrastructure & Dependencies, Tooling & Utilities, Education & Outreach, Protocol R&D, Governance, and Product & UX.

### Round 3 (2025)

Round 3 was the most ambitious yet, allocating 585,000 FIL -- nearly doubling the combined funding of the first two rounds. Applications opened in late September 2025, with voting and allocation running through October and November. Critically, Round 3 migrated the full end-to-end pipeline to the **Drips protocol on FVM**: Drips handled application intake, badgeholder voting, and fund streaming, creating a seamless, onchain system.

Fund distribution via Drips allowed for streaming payouts rather than lump-sum transfers, providing recipients with predictable revenue while keeping funds recoverable in case of disputes.

## Outcomes

- **Total FIL distributed**: Over 1,055,000 FIL across three rounds (200K + 270K + 585K).
- **Unique projects funded**: Nearly 200 across all rounds, spanning infrastructure, tooling, education, governance, and UX.
- **Returning contributors**: 77 projects applied in both Rounds 1 and 2, indicating that retroactive funding supported sustained rather than one-off contributions.
- **Infrastructure prioritized**: The Infrastructure & Dependencies category received the most funding per project on average, aligning with the stated goal of supporting critical but invisible ecosystem dependencies.
- **Drips integration**: Round 3's migration to Drips on FVM demonstrated that retroactive funding infrastructure can be deployed natively on non-Ethereum L1 chains.

## Challenges and Solutions

**Challenge: Flat distribution in Round 1 diluted impact signal**
The extremely flat allocation in Round 1 (minimal difference between median and top-funded projects) raised questions about whether badgeholder voting was capturing meaningful differences in impact.

***Solution:*** Round 2 introduced refined categories and adjusted voting mechanics, resulting in a distribution that better differentiated high-impact projects while still maintaining a long tail of funding for smaller contributors.

**Challenge: High returning-applicant dominance**
In Round 2, 92% of funding went to projects that had applied in Round 1, potentially creating incumbency bias and reducing opportunities for new contributors.

***Solution:*** Round 3 expanded the pool size substantially and broadened outreach to ensure new projects were aware of and could participate in the program.

**Challenge: Cross-ecosystem tooling gaps**
Early rounds relied on off-chain or forked tools for nominations and voting. Filecoin lacked native infrastructure equivalent to Optimism's purpose-built RetroPGF platform.

***Solution:*** The Drips integration in Round 3 provided a native, onchain solution for the full pipeline -- from applications through voting to fund streaming -- demonstrating that composable Web3 tooling can bridge ecosystem gaps.

**Challenge: Defining and measuring impact across diverse categories**
Comparing the impact of a core protocol dependency against an educational resource or a governance tool is inherently difficult.

***Solution:*** Category-specific voting with dedicated badgeholders and the use of Open Source Observer data for quantitative metrics helped provide structured context for voters.

## Lessons Learned

- **Retroactive funding is portable.** Filecoin proved that the Optimism RetroPGF model can be adapted for a fundamentally different ecosystem (decentralized storage vs. L2 scaling) with appropriate tooling.
- **Flat distributions may not reflect impact variance.** While egalitarian allocations reduce risk of excluding worthy projects, they can also fail to meaningfully reward the highest-impact work.
- **Streaming payments align incentives better than lump sums.** Drips-based streaming in Round 3 created ongoing accountability and predictable revenue for recipients.
- **Progressive scaling builds legitimacy.** Growing from 200K to 585K FIL over three rounds allowed the program to build operational experience and community trust incrementally.
- **Composable infrastructure accelerates adoption.** Drips' ability to serve as the backbone for a non-Ethereum ecosystem's RetroPGF program illustrates how modular Web3 tooling lowers barriers to adoption.

## Conclusion

FIL-RetroPGF represents the most developed cross-ecosystem adoption of retroactive public goods funding to date. By iterating across three rounds, increasing funding commitments, and migrating to onchain infrastructure via Drips, the program demonstrated that retroactive funding is not exclusive to Optimism but a generalizable pattern. The lessons around distribution design, returning-applicant dynamics, and composable tooling are directly relevant to any ecosystem considering retroactive funding, from L2s and alt-L1s to application-specific chains.

## Sources

- [Unveiling FIL-RetroPGF-1: Retroactively Funding Filecoin Public Goods -- Filecoin Blog](https://filecoin.io/blog/posts/unveiling-fil-retropgf-1-retroactively-funding-filecoin-public-goods/)
- [A Deepdive into FIL-RetroPGF-1 Results -- CryptoEconLab / Medium](https://medium.com/cryptoeconlab/a-deepdive-into-fil-retropgf-1-results-7e5a0bcdba08)
- [Reflections on Filecoin's First Round of RetroPGF -- Open Source Observer](https://docs.oso.xyz/blog/fil-retropgf-1/)
- [Announcing FIL-RetroPGF-2 -- Filecoin Blog](https://filecoin.io/blog/posts/announcing-fil-retropgf-2-continuing-to-fund-filecoin-public-goods/)
- [A Deepdive into FIL-RetroPGF-2 Results -- CryptoEconLab / Medium](https://medium.com/cryptoeconlab/a-deepdive-into-fil-retropgf-2-results-880234699fe4)
- [Filecoin RetroPGF Round 3: Powering Proven Impact with 585K FIL -- Filecoin Blog](https://filecoin.io/blog/posts/filecoin-retropgf-round-3-powering-proven-impact-with-585k-fil/)
- [FIL-RetroPGF-3 on Drips](https://filecoin.drips.network/app/rpgf/rounds/fil-retropgf-3)
- [The Future of Public Goods Funding in Filecoin -- Filecoin Blog](https://filecoin.io/blog/posts/the-future-of-public-goods-funding-in-filecoin-scaling-the-pl-pgf-vision)
