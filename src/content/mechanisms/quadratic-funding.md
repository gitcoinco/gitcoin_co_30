---
id: '1770923874925'
slug: quadratic-funding
name: "Quadratic Funding"
shortDescription: "Democratic funding mechanism that amplifies small donors via quadratic matching."
tags:
  - quadratic
  - democratic
  - verification
lastUpdated: '2026-02-12'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Quadratic funding** (QF) is a capital allocation mechanism that distributes a shared matching pool to projects based on how many individual contributors they attract, not just how much money each contributor gives.

The matching amount for each project is calculated by squaring the sum of the square roots of individual contributions — a formula that compresses the influence of large donations while restoring scale through squaring, thereby amplifying projects with broad community support. Originally proposed in a 2018 paper by Vitalik Buterin, Zoë Hitzig, and E. Glen Weyl, QF is the most widely deployed democratic capital allocation mechanism in the Ethereum ecosystem.

QF operates at the decision layer (allocation layer) of the funding stack, determining how a pool of capital gets distributed based on community signal rather than committee judgment or token-weighted voting. It depends on external infrastructure for identity verification, sybil resistance, and fund custody, and is commonly composed with passport-style identity systems and post-round review processes to maintain allocation integrity.

## How It Works

Traditional grant programs concentrate decision-making power in small committees, and conventional crowdfunding rewards projects that already have large, well-resourced audiences. Neither approach reliably surfaces public goods that serve broad communities but lack wealthy patrons.

Quadratic funding addresses this by introducing a matching pool funded by sponsors, protocols, or treasuries. Community members make individual contributions to projects of their choice, and the matching formula distributes the pool proportionally — giving outsized matching to projects that receive many small donations rather than a few large ones.

Because the formula takes the square root of each contribution before summing and squaring, individual donations are converted into weighted preference signals. This weighting partially corrects for the public goods free-rider problem by amplifying broad participation over concentrated spending.

1. **Matching pool formation:** A sponsor, protocol treasury, DAO, or coalition of funders commits capital to a shared matching pool for a defined funding round.  
2. **Project registration:** Eligible projects apply and are vetted against round-specific criteria. A curation process — manual review, registry contract, or community governance — determines which projects participate.  
3. **Contribution window:** During a defined time period, individual community members donate to projects of their choice. Each donation can be any size; identity verification or sybil resistance mechanisms ensure that each contribution represents a unique human participant.  
4. **Quadratic calculation:** At the end of the round, the matching formula is applied. For each project, the square root of every individual contribution is summed, and that sum is squared. The resulting values represent relative allocation weights and are normalized across all projects so that the total matching distributed equals the size of the matching pool. Projects with many contributors receive disproportionately more matching relative to projects with few, large contributors.  
5. **Sybil review and adjustment:** Round operators review contribution data for signs of sybil attacks, collusion, or manipulation. Techniques like Gitcoin Passport scoring, Connection-Oriented Cluster Matching (COCM), and pairwise coordination analysis may reduce, reallocate, or otherwise adjust final allocations.  
6. **Fund distribution:** Matching funds and direct contributions are disbursed to projects, typically onchain. Projects receive both their crowdfunded donations and their calculated share of the matching pool.

## Advantages

- **Democratic capital allocation:** Funding outcomes are determined by the number of contributors rather than the size of individual donations, prioritizing broad participation over concentrated spending.  
- **Grassroots project discovery:** Projects with distributed community support can surface and compete effectively even without large donors or institutional backing.  
- **Correction of public goods free-riding:** By weighting collective participation over individual contribution size, quadratic funding partially mitigates free-rider dynamics described in the theory of Liberal Radicalism.  
- **Meaningful participation at low cost:** Small contributions can meaningfully influence matching outcomes, lowering barriers to participation and enabling wide engagement.  
- **Ecosystem-level signal generation:** Aggregate contribution patterns produce a public signal of community priorities that can inform downstream funding, governance, and coordination decisions.  
- **Composability with identity and infrastructure layers:** Quadratic funding integrates with sybil resistance systems, identity tooling, and multiple blockchain networks without prescribing a specific implementation.  
- **Scalable and repeatable allocation rounds:** The mechanism supports recurring funding rounds operated by protocols, DAOs, or institutions with access to a matching pool.

## Limitations

- **Sybil vulnerability:** Because matching rewards breadth of support, quadratic funding creates incentives to fabricate identities. Effective sybil resistance is essential but introduces friction and remains imperfect.  
- **Collusion and coordination gaming:** Coordinated groups can inflate a project's matching allocation. Pairwise matching adjustments and COCM mitigate but do not eliminate this risk.  
- **Matching pool dependency:** Quadratic funding redistributes sponsor capital rather than generating it, requiring sustained philanthropic, treasury, or institutional funding sources.  
- **Popularity bias:** Projects with existing audiences, brand recognition, or marketing capacity tend to attract more contributors, potentially skewing outcomes toward well-known teams.  
- **Rational ignorance:** Individual contributors have limited incentive to deeply evaluate projects, since each donation has a small marginal effect on outcomes, which can degrade signal quality at scale.  
- **Residual wealth effects:** Although quadratic funding significantly dampens the influence of large donors, contributors with greater resources can still exert cumulative influence by spreading contributions.

These limitations create a core design challenge: maintaining the integrity of democratic signal extraction while operating in adversarial environments where identities and coordination are difficult to verify.

## Best Used When

Quadratic funding works best when:

- Community input is desired for allocating a shared pool of capital  
- Grassroots demand should outweigh expert or committee judgment  
- Sybil resistance is available to validate unique contributors  
- Active participation is sufficient to generate meaningful signal  
- Projects are comparable enough for relative evaluation  
- Post-round review can address manipulation or coordination risks

## Examples and Use Cases

**Gitcoin Grants Program** is the largest and longest-running deployment of quadratic funding, having distributed over $60 million to more than 3,700 projects across open-source software, DeFi infrastructure, climate solutions, and community initiatives. The program introduced key innovations including pairwise coordination matching, Gitcoin Passport-based sybil resistance, and Connection-Oriented Cluster Matching (COCM), and now operates QF alongside retroactive funding and other mechanisms within a multi-mechanism allocation strategy.

**clr.fund** is a permissionless, trust-minimized quadratic funding protocol that integrates MACI (Minimal Anti-Collusion Infrastructure) to prevent bribery and vote-buying through cryptographic privacy. By encrypting contribution data so that contributors cannot prove how they allocated funds, clr.fund addresses core collusion risks inherent in QF, demonstrating an integrity-first approach based on zero-knowledge proofs rather than post-hoc detection.

**Giveth** operates recurring quadratic funding rounds with several mechanism-level extensions, including Superfluid-based streaming donations that qualify for matching, the GIVpower curation system for visibility weighting, and GIVbacks, which return GIV tokens to contributors of verified projects. Giveth also hosts QF rounds for external partners such as Gitcoin, Polygon, and other ecosystem treasuries.

**Ecosystem-operated rounds** demonstrate QF's portability beyond the Ethereum core community. Protocol foundations including Sei and Polygon have allocated treasury capital through QF rounds run in partnership with Gitcoin or Giveth, illustrating the mechanism's adaptability across different L1/L2 ecosystems, community sizes, and funding objectives.


## Further Reading

- [**Liberal Radicalism** — Vitalik Buterin, Zoë Hitzig, E. Glen Weyl](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656)  
- [**Quadratic Payments: A Primer** — Vitalik Buterin](https://vitalik.eth.limo/general/2019/12/07/quadratic.html)  
- [**WTF is Quadratic Funding?** — Gitcoin](https://www.wtfisqf.com/)  
- [**Pairwise Coordination Subsidies** — Vitalik Buterin](https://ethresear.ch/t/pairwise-coordination-subsidies-a-new-quadratic-funding-design/5553)  
- [**Gitcoin Grants 23 Retrospective** — Gitcoin Blog](https://www.gitcoin.co/blog/gitcoin-grants-23-retro)
