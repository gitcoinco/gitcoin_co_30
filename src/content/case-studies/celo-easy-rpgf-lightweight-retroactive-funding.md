---
id: '1741193600003'
slug: celo-easy-rpgf-lightweight-retroactive-funding
name: "Celo Easy RPGF — Lightweight Retroactive Funding"
shortDescription: "Celo's implementation of simplified retroactive public goods funding, demonstrating how smaller ecosystems can adopt RetroPGF with minimal overhead."
tags:
  - retroactive
  - celo
  - grants
  - accessibility
lastUpdated: '2026-03-05'
relatedMechanisms:
  - retroactive-funding
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
  - optimism-retropgf
relatedCaseStudies:
  - filecoin-retropgf-retroactive-funding-beyond-optimism
relatedResearch:
  - retropgf-impact-measurement-evolution
relatedCampaigns: []
banner: /content-images/case-studies/celo-easy-rpgf-lightweight-retroactive-funding/banner.png
---

CeloRPGF0 was the Celo ecosystem's inaugural retroactive public goods funding round, distributing up to 250,000 CELO to 89 projects that had contributed to the network since its Mainnet launch in 2020. Built on the open-source EasyRetroPGF platform developed by Gitcoin, the program demonstrated that smaller ecosystems can adopt Optimism-style retroactive funding without building custom infrastructure from scratch. By pairing the RPGF round with parallel quadratic funding rounds through Gitcoin Grants Stack, Celo created an integrated H1 2024 public goods funding program that combined retroactive and prospective allocation methods.

## Background

Celo is an EVM-compatible Layer 1 blockchain focused on mobile-first financial applications and regenerative finance (ReFi). By 2024, the ecosystem had matured significantly -- with DeFi protocols, community currencies, climate projects, and onboarding initiatives contributing to a vibrant but diffuse contributor landscape. Like many mid-sized blockchain ecosystems, Celo faced the challenge of rewarding sustained contributions that did not fit neatly into prospective grant proposals.

The Optimism Collective's RetroPGF rounds had by this point demonstrated the viability of retroactive funding at scale, but Optimism's infrastructure was purpose-built and tightly integrated with its governance system. Smaller ecosystems could not easily replicate this stack. Gitcoin's **EasyRetroPGF** -- an open-source fork of the Optimism RetroPGF platform designed for any EVM chain -- changed this calculus by providing a turnkey solution that any community could deploy.

The **Celo Public Goods Stewards**, a group of nine Celo stakeholders committed to supporting public goods development, spearheaded the initiative as part of a broader H1 2024 funding strategy that also included quadratic funding rounds during GG20 and GG21.

## The Mechanism / Program

### CeloRPGF0 Design

CeloRPGF0 offered up to 250,000 CELO to projects and individuals who had created value for the Celo ecosystem. Applications were accepted across three verticals:

1. **ReFi** -- Regenerative finance projects, climate impact initiatives, and environmental public goods.
2. **dApps and Infra** -- Decentralized applications, developer tooling, and infrastructure that strengthened the Celo stack.
3. **Community and Adoption** -- Non-software contributions including community growth, onboarding programs, education, and ecosystem development.

The voting period ran from May 13-20, 2024, with results presented at Celo Gather on May 24, 2024. The Celo Public Goods Stewards served as the badgeholder cohort, evaluating projects based on demonstrated impact rather than future promises.

### EasyRetroPGF Platform

The round was hosted on EasyRetroPGF (easyretropgf.xyz), an open-source toolkit maintained by Gitcoin that empowers any EVM-compatible chain to implement retroactive funding rounds without reinventing the wheel. The platform handled project nominations, application review, badgeholder voting, and results tallying. Its simplified interface reduced the operational burden on the Stewards team, allowing them to focus on evaluation quality rather than tooling logistics.

### Integrated Funding Strategy

CeloRPGF0 was one component of a broader H1 2024 program that allocated a combined 125,000 cUSD and 250,000 CELO through multiple funding channels:

- **GG20 Climate Solutions Round**: 50,000 cUSD in matching, partnering with the Climate Coordination Network for Celo's ReFi projects.
- **GG21 Celo dApp Ecosystem Round**: Matching for decentralized applications and developer tooling.
- **GG21 Celo Community, Education & Adoption Round**: Matching for non-software contributions.
- **CeloRPGF0**: 250,000 CELO in retroactive funding.

This combination meant that contributors could receive prospective funding through QF and retroactive rewards through RPGF, creating complementary incentive layers.

## Outcomes

- **89 projects funded** out of all eligible applicants, spanning all three verticals.
- **Top recipients**: GoodDollar (10,000 CELO), impactMarket (9,587 CELO), and Ubeswap (8,777 CELO) -- a distribution that favored established ecosystem pillars with long track records.
- **250,000 CELO distributed**, fulfilling the program's full allocation.
- **Allo v2 and Grants Stack deployed on Celo** as part of the broader H1 2024 initiative, establishing persistent infrastructure for future rounds.
- **Cross-mechanism participation**: Many projects that received RPGF rewards also participated in the GG20 and GG21 QF rounds, enabling the community to compare retroactive vs. prospective allocation signals.

## Challenges and Solutions

**Challenge: Small badgeholder cohort**
With only nine Stewards serving as badgeholders, the round was more susceptible to individual biases and knowledge gaps than Optimism's larger badgeholder sets.

***Solution:*** The Stewards were selected for diverse ecosystem knowledge, and the three-vertical structure ensured that evaluation was segmented by domain expertise. Future rounds could expand the badgeholder set as the program matures.

**Challenge: Incumbency bias toward established projects**
Top-funded projects were well-known ecosystem fixtures, raising questions about whether newer or smaller contributors were adequately evaluated.

***Solution:*** The three-vertical structure ensured that community and adoption contributions were evaluated separately from infrastructure, preventing high-profile DeFi protocols from absorbing all funding. Future rounds could introduce minimum allocations for emerging contributors.

**Challenge: Defining impact across heterogeneous contributions**
Comparing a universal basic income protocol (GoodDollar) against a DEX (Ubeswap) against community education programs required evaluators to make cross-category judgments.

***Solution:*** Category-specific evaluation within the three verticals and reliance on the EasyRetroPGF platform's structured voting interface helped standardize the process, though qualitative judgment remained central.

**Challenge: Limited community awareness**
As the first RPGF round in the Celo ecosystem, many potential applicants were unfamiliar with the concept of retroactive funding and either did not apply or underrepresented their contributions.

***Solution:*** Results were presented at Celo Gather to build awareness, and the program was explicitly framed as "RPGF0" to signal that it was a first iteration with future rounds planned.

## Lessons Learned

- **EasyRetroPGF dramatically lowers the barrier to entry.** An ecosystem with no prior RetroPGF infrastructure successfully ran a 250,000 CELO round using open-source tooling, validating the thesis that retroactive funding is a replicable pattern, not a platform-specific feature.
- **Combining QF and RPGF in a single program creates complementary signals.** Projects that performed well in both prospective (QF) and retroactive (RPGF) allocation sent a stronger signal of sustained value than either mechanism alone.
- **Small badgeholder cohorts can work for inaugural rounds.** Nine stewards proved sufficient for a first round, but scaling the evaluator set will be important for legitimacy and coverage as the ecosystem grows.
- **Naming the round "RPGF0" set appropriate expectations.** Framing the inaugural round as a beta encouraged participation while signaling that the mechanism and criteria would evolve.
- **Infrastructure deployed for RPGF has lasting value.** The deployment of Allo v2 and Grants Stack on Celo during this program created persistent tooling that future funding initiatives can build on.

## Conclusion

CeloRPGF0 demonstrated that retroactive public goods funding is not limited to large, well-resourced ecosystems like Optimism. By leveraging EasyRetroPGF and combining the RPGF round with parallel QF rounds through Gitcoin Grants Stack, the Celo Public Goods Stewards created an integrated funding program that rewarded both past contributions and ongoing work. The experience provides a practical template for any EVM-compatible ecosystem looking to implement retroactive funding: start with a small badgeholder set, use open-source tooling, frame the first round as an experiment, and pair it with complementary mechanisms.

## Sources

- [Announcing CeloRPGF0 -- Celo Public Goods](https://www.celopg.eco/insights/announcing-celorpgf0)
- [CeloRPGF0 on EasyRetroPGF](https://easyretropgf.xyz/celorpgf0)
- [Introducing Celo Public Goods -- CeloPG](https://www.celopg.eco/insights/introducing-celo-public-goods)
- [Celo Public Goods - QF & RPGF Program for H1 2024 -- Celo Forum](https://forum.celo.org/t/celo-public-goods-qf-rpgf-program-for-h1-2024/7566)
- [Celo Public Goods Funding H1 2024 Updates and Info -- Celo Forum](https://forum.celo.org/t/celo-public-goods-funding-h1-2024-updates-and-info/7407)
- [EasyRetroPGF.xyz -- Run your own Optimism-style RPGF Round -- Gitcoin Governance Forum](https://gov.gitcoin.co/t/easyretropgf-xyz-run-your-own-optimism-style-rpgf-round/17407)
- [GitHub: gitcoinco/easy-retro-pgf](https://github.com/gitcoinco/easy-retro-pgf)
