---
id: '1770997172052'
slug: gitcoin-grants-22-gg22
name: "Gitcoin Grants 22"
shortDescription: "Gitcoin Grants 22 reinstated dedicated OSS funding, distributing $1.7M across 12 rounds."
featured: false
tags:
  - quadratic
  - grants
  - verification
lastUpdated: '2026-02-13'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

externalUrl: 'https://grants.gitcoin.co'
matchingPoolUsd: '$1.4M'
projectsCount: '290'
startDate: '2024-10-23'
endDate: '2024-11-06'
---

**Gitcoin Grants 22 (GG22)** was the 22nd Gitcoin Grants round, held from October 23 to November 6, 2024. The round marked the return of dedicated Open Source Software (OSS) funding after GG21's community-only structure, while retaining the community-led rounds model introduced in GG20. This restored a dual-track structure combining centralized OSS funding with decentralized community-led rounds.

GG22 distributed approximately $1.4M in matching funds across four OSS Program rounds and seven Community Rounds, alongside $294,972 in crowdfunded contributions from over 28,000 unique donors. Matching support included $1M allocated to the OSS Program and $125K provided by Gitcoin for Community Rounds, supplemented by approximately $264K in externally raised community matching pools.

The round represented a strategic recommitment to Gitcoin's core mission of funding open-source software and digital public goods. Following a significant decline in crowdfunding participation during GG21, GG22 reinstated OSS funding as the primary program track while refining governance and eligibility requirements for Community Rounds to improve accountability and round quality.

GG22 also introduced stricter requirements for Community Round operators, including a minimum $5K self-raised matching threshold, and consolidated OSS rounds onto Arbitrum for operational consistency. New product features — Quick Bridge for cross-chain donations and Mint Attestations for onchain donation proofs — were launched alongside continued use of COCM and Passport Model-Based Detection for sybil resistance.

## How It Works

GG22 used quadratic funding across all rounds, with distinct application and governance processes for the OSS Program and Community Rounds.

1. **Application and review:** OSS projects applied to one of four category-specific rounds. Eligibility required permissive open-source licensing, demonstrated development activity, and alignment with round criteria. Applications were reviewed using a combination of automated checks (Gitcoin AI Checker) and manual evaluation.

2. **Community round selection:** Community Round operators submitted proposals to the governance forum. The elected GG Community Council reviewed proposals and allocated matching support based on mission alignment, operator experience, funding plans, and demonstrated capacity to execute a round.

3. **Contribution window:** From October 23 to November 6, donors contributed to projects across all active rounds. Contributions functioned as weighted preference signals under the quadratic funding formula, emphasizing broad community support over large individual donations.

4. **Sybil resistance:** COCM applied social-graph-based adjustments to reduce coordinated matching manipulation. Passport Model-Based Detection analyzed onchain behavior to identify likely sybil accounts without adding friction to the donor experience.

5. **Review and distribution:** OSS matching results were published for a five-day community review period, followed by a pre-ratification governance vote. Matching funds and crowdfunded donations were distributed to grantees via Grants Stack on Arbitrum.

All OSS Program rounds operated on Arbitrum. Community Rounds ran on Arbitrum or Celo depending on round configuration.

## Eligibility

Eligibility requirements in GG22 differed between the OSS Program and Community Rounds, reflecting the distinct goals and governance models of each track. Baseline ethical and open-source standards applied across all rounds.

### OSS Program

OSS Program eligibility focused on open-source compliance and demonstrated development activity.

Projects were required to use permissive open-source licenses. Projects using non-permissive licenses were reviewed on a case-by-case basis rather than automatically excluded.

To establish baseline project maturity, applicants were expected to meet at least three of the following four development activity criteria:

- A first commit more than 90 days prior to application  
- At least one commit within the previous 30 days  
- Development activity on more than 20 days in the preceding 90-day period  
- Contributions from more than one individual

OSS applicants were limited to submitting to a single funding round, selecting the category most aligned with their project's primary mission.

Projects applying to the Hackathon Alumni round were additionally required to provide proof of participation in a recognized hackathon within the preceding 18 months.

### Community Rounds

Community Round eligibility centered on operator capacity, accountability, and alignment with Gitcoin's stated intents.

Round operators were required to include at least one experienced Grants Stack round operator, raise a minimum of $5K in self-sourced matching funds, and submit a detailed round plan covering scope, execution, and marketing.

Community Round proposals were submitted through the governance forum and reviewed by the elected GG Community Council, which selected seven rounds and allocated matching funds based on proposal quality, mission alignment, and demonstrated ability to run a successful round.

## Results

**Funding outcomes**

- **Projects funded:** 283 OSS Program projects, plus additional grantees across 7 Community Rounds  
- **Total funding distributed:** $1.7M across OSS Program and Community Rounds, including ~$1.4M in matching funds and $294,972 in crowdfunded contributions

**Participation**

- **Unique donors:** 28,000+ across all 12 rounds, including 25,688 OSS Program donors  
- **OSS crowdfunding:** $215K raised for OSS Program projects

### Highlights

The OSS Program distributed $1M in matching across four categories: Developer Tooling & Libraries ($300K), Web3 Infrastructure ($300K), dApps & Apps ($300K), and Hackathon Alumni ($100K). Top matching recipients included L2BEAT, eth.limo, Dappnode, and Ethereum Attestation Service (each receiving up to $30K in Web3 Infrastructure), as well as DefiLlama and Passport XYZ (each receiving up to $30K in Developer Tooling & Libraries).

Among Community Rounds, the ENS Ecosystem Round supported 42 projects and attracted 1,995 unique donors. The Regen Citizen Genesis Round funded 60 projects with strong participation despite a smaller donor base. The Ma Earth Grants Round raised over $30K in crowdfunding and distributed a $200K matching pool supported by Biome Trust, Naia Trust, and Gitcoin.

### What Changed

GG22 demonstrated that OSS Program rounds and Community Rounds could operate effectively in parallel, establishing the dual-track structure that carried forward into GG23. The round also validated the combined use of COCM and Passport Model-Based Detection as a default sybil resistance approach for future Gitcoin Grants rounds. Feedback from GG22 highlighted persistent challenges around donor onboarding and quadratic funding comprehension, directly informing the expanded education and UX improvements introduced in GG23.

## Further Reading

- [**GG22 Results & Recap** — Gitcoin](https://www.gitcoin.co/blog/gg22-results-recap)  
- [**GG22 OSS Program Results** — Gitcoin Governance Forum](https://gov.gitcoin.co/t/gg22-oss-program-matching-results/19645)  
- [**Announcing: Gitcoin Grants 22** — Gitcoin](https://www.gitcoin.co/blog/announcing-gitcoin-grants-22)
