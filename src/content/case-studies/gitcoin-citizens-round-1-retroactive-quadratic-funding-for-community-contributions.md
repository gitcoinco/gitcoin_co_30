---
id: '1770923882268'
slug: gitcoin-citizens-round-1-retroactive-quadratic-funding-for-community-contributions
name: "Gitcoin Citizens Round 1: Retroactive Quadratic Funding for Community Contributions"
shortDescription: "Case study of Gitcoin’s first retroactive quadratic funding round, rewarding past contributions and achieving a record 4× matching multiplier."
tags:

lastUpdated: '2026-02-12'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

The Gitcoin Citizens Round 1 was the inaugural deployment of **retroactive quadratic funding** designed to reward non-technical community contributions with demonstrated impact. Running for two weeks in June 2023 with a 20,000 DAI matching pool, the round attracted over 17,000 donors and generated approximately 82,968 DAI in direct contributions—resulting in a roughly 4× amplification of matching funds.

By allocating funds based on community donation behavior rather than prospective proposals, the round tested whether retroactive QF could surface meaningful signal about past contributions. The results suggest that even modest matching pools can catalyze significant participation and crowdfunding when impact is observable and legible to the community.

## Background

Gitcoin's ecosystem relies heavily on non-technical contributions such as governance participation, community coordination, education, and ecosystem stewardship. While these activities generate real value, they are often underfunded due to the difficulty of evaluating them prospectively and the lack of clear compensation pathways.

Discussions during a Gitcoin governance retreat, along with community forum posts and governance proposals in early 2023, surfaced an opportunity to apply Gitcoin's own funding mechanisms internally. Although Gitcoin was a leading implementer of quadratic funding externally, it had not yet used QF to retroactively reward its own community contributors.

The Citizens Round was launched to explore whether **retroactive quadratic funding** could address this gap by rewarding demonstrated contributions rather than proposed work. It also served as a practical test of Gitcoin Grants Stack as an operational tool for running retroactive funding programs.

## The Mechanism / Program

The Citizens Round adapted quadratic funding for retroactive allocation. Rather than soliciting proposals for future work, the round rewarded individuals and projects that had already delivered observable value to the Gitcoin ecosystem.

The program was deployed on Optimism using Gitcoin Grants Stack and configured with a 20,000 DAI matching pool. From 60 applications, 33 grantees were accepted based on eligibility criteria emphasizing non-technical contributions such as governance participation, community organizing, education, and ecosystem development.

During a two-week contribution window, community members donated to grantees of their choice. The quadratic funding formula amplified allocations to grantees that attracted broad participation, using donation patterns as a proxy for community assessment of impact. Gitcoin Passport was used for Sybil resistance, gating participation through identity verification scores.

The round was operated by community program managers rather than a centralized grants committee. Three objectives guided its design: gaining operational experience with retroactive QF, experimenting with a less bureaucratic budgeting process, and increasing community engagement across contribution and governance.

## Outcomes

The Citizens Round generated approximately 102,968 DAI in total funding against a 20,000 DAI matching pool, representing a roughly 4× crowdfunding-to-matching ratio—the highest such multiplier recorded in a Gitcoin round at the time.

More than 17,000 donors participated, far exceeding initial expectations of community contribution volume. The top three recipients were Karma (approximately 13,600 DAI), Biteye (approximately 10,400 DAI), and BanklessDAO's Gitcoin Citizens initiative (approximately 10,300 DAI).

The round demonstrated that retroactive quadratic funding can mobilize substantial participation and capital even with limited matching funds, provided contributors have visibility into past impact.

## Challenges & Solutions

**Over- and undercompensation**  
Some allocation outcomes diverged from expectations of which contributions had delivered the most value. Visibility and social dynamics appeared to influence results, raising concerns that retroactive quadratic funding can resemble a popularity contest when impact information is uneven.

*Proposed response:* Introduce clearer evaluation thresholds and contribution metrics to improve voter context and better align funding with demonstrated impact.

**Eligibility clarity**  
Unclear communication about eligibility led some potential applicants to self-exclude, believing the round targeted a narrower category of contributions than intended.

*Proposed response:* Improve pre-round communication through multiple channels and publish clearer, more explicit eligibility criteria well in advance of future rounds.

**Grant setup friction**  
Even experienced community members found the multi-step grant creation and round application process cumbersome.

*Proposed response:* Provide additional onboarding resources, including runbooks, documentation, and live Q&A sessions, to reduce friction and improve applicant confidence.

**Airdrop farming**  
Post-round analysis indicated that over 50% of donors participated with speculative motives related to potential future token distributions, distorting participation metrics and community signal.

*Proposed response:* Identify and filter airdrop-motivated donations from analysis to better isolate genuine community signal in retroactive allocation outcomes.

## Lessons Learned

- **Retroactive QF can generate strong community signal.** Rewarding demonstrated contributions attracted substantially more donor participation than anticipated, suggesting that observable impact lowers the cognitive and coordination costs of engagement.  
- **Modest matching pools can catalyze outsized participation.** A relatively small matching pool produced significant crowdfunding volume, indicating that matching funds function as a coordination signal rather than merely a subsidy.  
- **Voter context is critical for allocation quality.** Without structured information about grantee contributions, funding outcomes may reflect visibility and social capital rather than impact, undermining retroactive design goals.  
- **Sybil resistance must account for speculative participation.** Identity verification alone may not distinguish between genuine community donors and speculative actors, requiring additional filtering or analysis to preserve signal integrity.  
- **Decentralized round operations are viable but require support.** Community-managed program execution proved feasible, though improved tooling, communication, and onboarding are necessary to reduce friction and improve participation quality.

## Conclusion

The Gitcoin Citizens Round demonstrated that retroactive quadratic funding can be used to reward non-technical community contributions at scale, while generating meaningful participation and funding outcomes. By shifting allocation from speculative proposals to demonstrated impact, the round surfaced both the strengths and limitations of donation-based retroactive signaling.

As an early case study, the Citizens Round highlights key design considerations for future retroactive funding programs, including the importance of voter context, identity design, and signal quality. These insights are relevant to DAOs, protocols, and communities exploring retroactive funding mechanisms as a complement to prospective grants and committee-based allocation.

## Sources

- [**GCP-004 Governance Proposal** — Gitcoin Governance Forum](https://gov.gitcoin.co/t/gcp-004-passed-gitcoin-citizens-round/13462)  
- [**Citizens Round 1 Results** — Gitcoin Governance Forum](https://gov.gitcoin.co/t/gitcoin-citizens-round-1-results/16302)  
- [**Rewarding the Community** — Gitcoin Governance Forum](https://gov.gitcoin.co/t/rewarding-the-community-gitcoin-citizen-round-1/14905)  
- [**Citizens Round Explorer** — Gitcoin](https://explorer.gitcoin.co/#/round/10/0x984e29dcb4286c2d9cbaa2c238afdd8a191eefbc)
