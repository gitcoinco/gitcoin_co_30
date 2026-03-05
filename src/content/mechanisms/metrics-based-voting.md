---
id: '1741190400006'
slug: metrics-based-voting
name: "Metrics-Based Voting"
shortDescription: "Voting mechanism where allocation decisions are informed by quantitative impact metrics rather than subjective assessment alone."
tags:
  - metrics
  - evaluation
  - voting
  - impact-measurement
  - retroactive
lastUpdated: '2026-03-05'
relatedMechanisms:
  - retroactive-funding
  - quadratic-voting
  - impact-attestations
  - impact-certificates-hypercerts
relatedApps:
  - optimism-retropgf
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch:
  - deep-funding-visual-guide
  - state-of-public-goods-funding-2024
relatedCampaigns: []
banner: /content-images/mechanisms/metrics-based-voting/banner.png
---

**Metrics-based voting** is an allocation mechanism in which voters distribute funding by weighting quantitative impact metrics rather than evaluating individual projects directly. Instead of reviewing hundreds of project applications and making subjective assessments of each one's value, voters express preferences over a set of predefined metrics — such as active users, transaction volume, developer activity, or gas fees generated — and the resulting allocation is computed by applying those metric weights uniformly across all eligible projects. This transforms the voting task from "how much should each project receive?" to "which dimensions of impact matter most?", dramatically reducing cognitive load while producing more consistent and auditable outcomes.

The approach emerged from a practical problem: as public goods funding programs scaled to hundreds of projects and tens of millions of dollars, purely subjective evaluation by human voters produced noisy, inconsistent, and gameable outcomes. Carl Cervone's research at Open Source Observer, conducted in collaboration with the Optimism Collective, demonstrated that voter attention could be more productively channeled toward selecting and weighting impact metrics than toward evaluating individual project applications. Optimism's Retro Funding Round 4 was the first large-scale implementation of this approach, marking a significant evolution in how retroactive public goods funding operates at scale.

## How It Works

1. **Metric design and curation:** A data team — such as Open Source Observer for the Optimism ecosystem — develops a set of candidate impact metrics from publicly available, independently verifiable data sources. Metrics are designed to capture different dimensions of impact: user engagement (monthly active users, recurring users), developer activity (commits, contributors), economic impact (gas fees generated, transaction volume), and ecosystem contribution (downstream dependencies, integrations). The initial set for Optimism RF4 included 16 metrics applied to roughly 200 projects.

2. **Metric validation and transparency:** Each metric is published with its methodology, data sources, and query logic, all open source. This allows the community to audit, reproduce, and challenge metrics before they are used in voting. Metrics must be based on public data — no proprietary data sources or private APIs — ensuring that any community member can independently verify the results. This transparency is critical for legitimacy: voters need to understand what they are weighting.

3. **Voter ballot construction:** Rather than reviewing individual project applications, voters construct a ballot by assigning relative weights to the available metrics. A voter who believes user adoption is the most important signal of impact might weight "trusted monthly active users" at 40%, while a voter who prioritizes developer ecosystem health might weight "active developer count" at 30%. Each voter's ballot represents their theory of impact — what dimensions of contribution they believe matter most.

4. **Aggregation and allocation:** Individual voter ballots are aggregated (typically through averaging or median calculation) to produce a community-wide metric weighting. This weighting is then applied as a formula to all eligible projects, producing a funding allocation proportional to each project's performance across the weighted metrics. The formula-driven approach ensures that allocation is consistent, auditable, and explainable — every project's funding amount can be traced back to its metric scores and the community's metric weights.

5. **Distribution and retrospective analysis:** Funds are distributed according to the computed allocation. After each round, the data team publishes ballot box analysis showing the distribution of voter preferences, metric correlations, and allocation outcomes. This retrospective analysis informs metric design for future rounds, creating an iterative improvement cycle.

## Advantages

- **Scales voter attention:** By shifting the voting task from project-level evaluation to metric weighting, the mechanism allows a manageable number of voters to produce informed allocation decisions across hundreds of projects. Voters only need to understand and compare 10-20 metrics rather than evaluate 200 individual applications.
- **Consistency and auditability:** Formula-based allocation eliminates the noise and inconsistency of subjective project-by-project voting. Every allocation decision can be traced to specific metric scores and voter weights, making the process transparent and reproducible.
- **Reduces narrative bias:** In subjective voting, projects with compelling stories, strong marketing, or personal connections to voters tend to receive disproportionate funding. Metrics-based voting anchors allocation in observable outcomes rather than narrative persuasion, potentially producing a more merit-based distribution.
- **Encourages measurable impact:** When projects know that allocation will be driven by specific metrics, they have clear incentives to focus on producing measurable impact rather than optimizing for voter attention. This aligns project behavior with community-defined values.
- **Iterative improvement:** Because metrics are explicit and outcomes are auditable, the community can systematically identify and correct problems — adjusting metrics that are easily gamed, adding new metrics that capture underrepresented forms of impact, and refining the aggregation methodology based on observed outcomes.

## Limitations

- **Goodhart's Law:** When a measure becomes a target, it ceases to be a good measure. If projects know that "trusted monthly active users" drives funding, they will optimize for that metric — potentially through airdrops, incentive programs, or other tactics that inflate the number without producing genuine value. The mechanism must continuously evolve its metrics to stay ahead of gaming.
- **Metric coverage gaps:** Not all forms of impact are easily quantifiable. Community building, governance design, educational content, developer experience improvements, and cultural contributions are difficult to capture in metrics, creating a systematic bias toward projects with easily measured outputs.
- **Data infrastructure dependency:** The mechanism requires robust, reliable, and timely data pipelines. If the data infrastructure produces incorrect metrics — due to bugs, incomplete data sources, or delayed indexing — the resulting allocation will be systematically wrong, and the error may not be apparent until after funds are distributed.
- **Voter competence requirements:** While simpler than evaluating individual projects, weighting metrics still requires voters to understand what each metric measures, how it can be gamed, and what forms of impact it fails to capture. Uninformed metric weighting can produce outcomes as poor as uninformed project voting.
- **Reductionism risk:** Reducing impact to a weighted sum of quantitative metrics necessarily loses information. The richness of qualitative context — why a project matters, who it serves, what unique role it plays — is compressed into numbers, and voters who rely solely on metrics may make systematically worse decisions than well-informed qualitative evaluators in some cases.
- **Incumbency advantage:** Metrics based on historical performance (users, transactions, developer activity) inherently favor established projects over newer ones that have not yet had time to generate measurable impact. This can create a Matthew effect where the funded get more funded.

## Best Used When

- The funding program must allocate capital across a large number of projects (50+) where individual evaluation by voters is infeasible
- Robust, publicly available data infrastructure exists for the relevant ecosystem
- The community values consistency, auditability, and transparency in allocation decisions
- The mechanism is used for retroactive funding where impact has already occurred and can be measured
- Metrics-based allocation is complemented by qualitative processes for edge cases, new projects, and impact dimensions that resist quantification
- The community is willing to invest in iterative metric design and anti-gaming measures

## Examples and Use Cases

**Optimism Retro Funding Round 4** was the first large-scale deployment of metrics-based voting for public goods funding. In this round, voters compared 16 impact metrics — including trusted monthly active users, power user addresses, trusted recurring users, gas fees, and developer activity measures — and used their ballots to construct weighting functions applied consistently to approximately 200 projects on the Superchain. Open Source Observer built the first-of-its-kind data pipeline for the Superchain, with all source code, query logic, and infrastructure publicly available. Analysis of the anonymous ballots revealed that "trusted monthly active users" correlated most strongly with overall allocation, followed by "power user addresses" and "trusted recurring users" — notably, these are among the hardest metrics to game, while transaction count metrics had the lowest correlation, suggesting voters demonstrated sophisticated judgment about metric quality.

**Open Source Observer (OSO)** provides the data infrastructure that makes metrics-based voting possible in the Ethereum ecosystem. Carl Cervone and the OSO team have developed standardized impact metrics, published open-source data pipelines, and conducted extensive research on metric design principles. Their work on RF4 established key guidelines: metrics should be based on public data that can be independently verified, should be easy to reproduce, simulate, and audit, and should not rely on proprietary data sources. OSO's ballot box analyses — which reveal how voters weighted metrics, how metric weights correlated with allocations, and where the mechanism succeeded or failed — have become essential reading for mechanism designers working on metrics-informed allocation.

**Gitcoin Grants** has experimented with metrics-informed approaches in its fraud detection and grant evaluation processes. While Gitcoin's primary allocation mechanism remains quadratic funding (where individual donors express preferences directly), the Grants Stack team has incorporated onchain activity metrics, passport scores, and behavioral analysis to flag potentially fraudulent contributions and assess project legitimacy. This represents a lighter-touch application of metrics-based methodology — using quantitative signals to augment rather than replace human judgment.

**Carl Cervone's "Levels of the Game" Framework** provides theoretical grounding for understanding how metrics-based voting reshapes participant incentives. In his research, Cervone identifies multiple "levels" at which participants can engage with metrics-based systems — from naively optimizing for visible metrics (Level 1) to understanding and exploiting the meta-game of metric design (Level 3+). This framework helps mechanism designers anticipate gaming behaviors and build more robust metric sets that reward genuine impact across multiple levels of strategic sophistication.

## Further Reading

- [**A Deep Dive on Impact Metrics for Retro Funding 4** — Carl Cervone](https://mirror.xyz/cerv1.eth/0s05D8YqJwezhJpOn9PEx_jLihvTqtFxw0R4_6nFl5I)
- [**A Deeper Dive on the Impact Metrics for Optimism Retro Funding 4** — Open Source Observer](https://docs.oso.xyz/blog/impact-metrics-rf4-deep-dive/)
- [**Opening up the Ballot Box Again (RF4 Edition)** — Open Source Observer](https://docs.oso.xyz/blog/rf4-ballot-box/)
- [**Levels of the Game: The Psychology of RetroPGF** — Carl Cervone](https://cerv.one/essays/levels_of_the_game.html)
- [**What Builders Can Learn from RetroPGF 3** — Carl Cervone](https://mirror.xyz/cerv1.eth/CGS5QsqoX9k5_puYopug4SWODm06OAGwOPWiEil2v0U)
- [**Retroactive Public Goods Funding** — Open Source Observer](https://docs.opensource.observer/blog/tags/retroactive-public-goods-funding/)
