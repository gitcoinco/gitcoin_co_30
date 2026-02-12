---
id: '1770916088484'
slug: tornado-cash-how-quadratic-funding-sustained-ethereum-s-most-important-privacy-tool
name: Tornado Cash: How Quadratic Funding Sustained Ethereum's Most Important Privacy Tool
shortDescription: Quadratic funding case study on how Gitcoin Grants supported Tornado Cash amid debates on sanctions and open-source responsibility.
tags:

lastUpdated: '2026-02-12'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

Tornado Cash, a non-custodial privacy protocol enabling shielded transactions on Ethereum, was selected as the number one technology grant in Gitcoin Grants Round 4 (January 2020), receiving over $31,200 in community contributions and matching. The funding — significant enough to potentially support two developers at $7,800/month each — helped sustain development of a protocol that would go on to process over $7 billion in private transactions. In August 2022, the U.S. Treasury's OFAC sanctioned Tornado Cash, making it illegal for Americans to interact with the protocol and triggering a legal and constitutional debate that remains unresolved. The Tornado Cash case illustrates both the power of quadratic funding to support controversial-but-essential public goods, and the complex questions that arise when community-funded tools become targets of state action.

## Background

Privacy is not the default on Ethereum. Every transaction on the network is publicly visible, linking wallet addresses to financial activity in ways that expose salary information to coworkers, charitable donations to political opponents, and personal spending patterns to anyone monitoring the blockchain. For users in repressive jurisdictions, this transparency can be dangerous.

Tornado Cash, launched in 2019, addressed this gap using zero-knowledge cryptography. The protocol operated as a set of immutable smart contracts that accepted ETH deposits and allowed withdrawals from different addresses, breaking the onchain link between sender and recipient. Users could transact privately without relying on any third-party service — the smart contracts were autonomous, non-custodial, and beyond the control of any individual or entity, including the original developers.

When Tornado Cash appeared in Gitcoin Grants Round 4, privacy tooling for Ethereum was an acknowledged gap in the ecosystem. The community's response — making it the top-funded technology grant — provided both operational funding and a clear signal that financial privacy was a priority for Ethereum's builder and user community.

## The Mechanism / Program

Tornado Cash participated in Gitcoin Grants Round 4 (January 2020), which saw a significant jump from previous rounds: 1,115 unique contributors made 5,936 contributions across 230 projects, nearly doubling Round 3's participation. The Technology Pool distributed $125,000 in matching funds alongside community contributions.

Tornado Cash was the top recipient in the Technology Pool, receiving over $31,200. As Vitalik Buterin noted in his Round 4 retrospective, this amount was significant enough that "if they continue receiving such an amount every two months then this would allow them to pay two people $7,800 per month each — meaning that the hoped-for milestone of seeing the first 'quadratic freelancer' may have already been reached."

The strong community support reflected a distinction between Gitcoin Grants and Ethereum Foundation funding priorities. As Buterin observed, the EF had not given grants to Tornado Cash and generally limited its funding to application-specific tools. Gitcoin's quadratic funding mechanism, by contrast, channeled community preferences without institutional gatekeeping — allowing the ecosystem to fund work that established foundations had not prioritized. This complementarity between QF and institutional grantmaking was an early validation of quadratic funding's ability to surface community priorities that differ from expert-driven allocation.

## Outcomes

Tornado Cash went on to become Ethereum's most widely used privacy tool, processing over $7 billion in private transactions. The protocol enabled use cases ranging from salary privacy and anonymous charitable giving to political donations in hostile environments and support for Ukrainian relief efforts without risk of Russian retaliation.

In August 2022, OFAC sanctioned Tornado Cash, adding over 40 wallet addresses associated with the protocol to its Specially Designated Nationals list. The Treasury Department cited use of the protocol by North Korea's Lazarus Group to launder approximately $625 million stolen from the Ronin Bridge. The sanctions made it illegal for any U.S. person to interact with the protocol in any manner, effectively criminalizing the use of open-source privacy software.

The sanctions triggered immediate consequences across the ecosystem: crypto platforms banned associated accounts, GitHub removed the Tornado Cash repository, and the Gitcoin Grants address that had previously funded Tornado Cash was flagged as potentially subject to sanctions. The case became a flashpoint for fundamental questions about whether immutable code can be sanctioned, whether open-source developers can be held liable for downstream use of autonomous software, and whether financial privacy is a right or a privilege.

Coin Center filed a federal lawsuit against OFAC in October 2022, arguing that sanctioning immutable smart contracts exceeded statutory authority. In a parallel case brought by Tornado Cash users backed by Coinbase, the Fifth Circuit ruled in November 2024 that immutable smart-contract code is not property and cannot be sanctioned. The Treasury removed Tornado Cash from its sanctions lists in March 2025. However, criminal proceedings against developers Roman Storm and Alexey Pertsev remain ongoing, leaving the question of developer liability unresolved.

## Challenges & Solutions

**Funding controversial tools through community mechanisms**  
Tornado Cash's inclusion in Gitcoin Grants raised questions that would become more acute after sanctions: should community funding mechanisms support tools that may be used for illicit purposes alongside legitimate ones? The protocol's legitimate use cases (salary privacy, political donations, humanitarian support) coexisted with documented use by sanctioned entities.

*Proposed response:* Quadratic funding's democratic signal — making Tornado Cash the number one tech grant — accurately reflected that the Ethereum community valued financial privacy as a public good. The mechanism's strength is precisely that it surfaces genuine community preferences without institutional gatekeeping; the tradeoff is that it cannot distinguish between a tool's legitimate and illegitimate uses.

**Sanctions exposure for funding infrastructure**  
After OFAC's August 2022 action, the Gitcoin Grants address that had previously funded Tornado Cash was flagged as potentially sanctions-adjacent, illustrating how retroactive sanctions can create legal uncertainty for funding platforms and their users.

*Proposed response:* This remains an unresolved challenge for decentralized funding infrastructure. The case highlights a structural risk: any permissionless funding mechanism that channels community preferences may end up supporting projects that later face regulatory action, creating potential liability for platform operators, donors, and recipients.

**Loss of open-source repositories and development infrastructure**  
GitHub's removal of Tornado Cash repositories after the sanctions demonstrated that even "decentralized" protocols depend on centralized infrastructure for code hosting, collaboration, and visibility.

*Proposed response:* The Tornado Cash community migrated to independent git instances, and the protocol's immutable smart contracts continued to operate on Ethereum regardless of sanctions. The experience accelerated ecosystem interest in decentralized code hosting and censorship-resistant development infrastructure.

## Lessons Learned

- **Quadratic funding can surface community priorities that institutional funders miss.** The Ethereum Foundation did not fund Tornado Cash; the Gitcoin community made it the top grant. This divergence demonstrated QF's value as a complementary mechanism that channels grassroots preferences distinct from expert-driven allocation, particularly for work in politically sensitive domains.  
- **Community-funded public goods can become targets of state action.** Tornado Cash is the most prominent example of a community-funded open-source project facing government sanctions. The case raises structural questions for all community funding mechanisms about how to navigate the intersection of permissionless funding and regulatory compliance.  
- **Privacy tooling is both a public good and a regulatory surface.** The dual-use nature of privacy technology — serving both legitimate users and illicit actors — creates a persistent tension that community funding mechanisms cannot resolve on their own. The Tornado Cash case demonstrated that funding the development of privacy tools and defending the right to use them are related but distinct challenges.  
- **The "quadratic freelancer" milestone was reached through privacy funding.** Vitalik Buterin's observation that Tornado Cash's GR4 funding could sustain two developers marked an early milestone for QF as a viable funding model for focused protocol development teams — a milestone reached through funding a privacy tool the broader institutional ecosystem had deprioritized.  
- **Legal defense of funded projects requires its own funding infrastructure.** Tornado Cash's legal defense was ultimately mounted not by the project itself but by Coin Center (itself a Gitcoin grantee) and Coinbase-backed plaintiffs. This suggests that community funding ecosystems benefit from supporting both builders and the policy advocacy organizations that defend them.

## Conclusion

The Tornado Cash case study sits at the intersection of quadratic funding's greatest strengths and most difficult challenges. The community's choice to make a privacy protocol the top-funded grant in GR4 demonstrated QF's ability to fund essential-but-controversial public goods that institutional funders avoid. The subsequent sanctions, litigation, and ongoing criminal proceedings illustrate the risks inherent in permissionless community funding — and the ecosystem-level resilience required when state action targets community-funded tools. For funding mechanism designers, the case underscores that supporting the right to build and use open-source software may be inseparable from the mechanisms that fund its development.

## Sources

- [**Tornado Cash Impact Case Study** — Gitcoin](https://impact.gitcoin.co/tornado-cash)  
- [**Review of Gitcoin Quadratic Funding Round 4** — Vitalik Buterin](https://vitalik.ca/general/2020/01/28/round4.html)  
- [**Gitcoin Grants Round 4 Results** — Gitcoin](https://www.gitcoin.co/blog/gitcoin-grants-round-4)  
- [**Coin Center is suing OFAC over its Tornado Cash sanction** — Coin Center](https://www.coincenter.org/coin-center-is-suing-ofac-over-its-tornado-cash-sanction/)  
- [**Tornado Cash Documentation** — Tornado Cash Community](https://docs.tornado.ws/)
