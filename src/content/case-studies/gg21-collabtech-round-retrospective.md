---
id: '1741300000018'
slug: gg21-collabtech-round-retrospective
name: "GG21 CollabTech Round by RnDAO Retrospective"
shortDescription: "The GG21 CollabTech Round by RnDAO experimented with a Thresholds mechanism that redistributed funds from projects missing minimum targets, funding 29 projects and surfacing important lessons about mechanism education and grantee cultural assumptions."
tags:
  - gitcoin
  - quadratic-funding
  - grants
  - collabtech
  - mechanism-design
lastUpdated: '2024-09-05'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies:
  - gg21-community-led-round-results-retrospective
relatedResearch: []
relatedCampaigns:
  - gitcoin-grants-21-gg21
banner: /content-images/case-studies/gg21-collabtech-round-retrospective/banner.png
---

## Insights & Learning

The CollabTech round allowed us to rapidly test a novel idea for public goods funding and offered valuable learnings in a short period of time thanks to a rapid prototyping approach. This retrospective shares the general outcomes and captures reflections by the team, as well as recommendations for the future.

**Context**

This round included a novel experiment with a Thresholds mechanism, where projects had to declare the minimum amount of funds they needed to deliver value. Projects not reaching the threshold (with donations+matching funds) would see their funds redistributed.

The algorithm used progressively eliminated the projects starting with those further away from their threshold.

## Results Overview

We received over 70 applications, leading to the following results:

![CollabTech results overview](/content-images/case-studies/gg21-collabtech-round-retrospective/01-collabtech-results-overview.png)

![CollabTech funding distribution](/content-images/case-studies/gg21-collabtech-round-retrospective/02-collabtech-funding-distribution.png)

### Overall Data Insights

The top-performing projects were those that had been aligned for a significant period with the community, participating in talks, demos, etc. Notably, RnDAO reached the second spot thanks to the co-marketing effect of organising the round.

The funds recovered provided welcome revenue and reduced RnDAO's operational loss from designing and running the round from $7.5k to about $3.9k.

Out of 29 projects, 16 reached their threshold and saw additional redistribution from the matching funds. While 13 projects received no matching funds.

3 projects would not have reached their threshold without the redistribution. I.e. 10% more projects were sufficiently funded to deliver value thanks to the mechanism.

11 projects (37%) would have received matching funds but didn't as they failed to meet the threshold.

Out of the 13 projects not receiving any funds, 2 had donations but were ruled out by the gitcoin algorithm.

$4.856 (16%) of the funds in the matching pool were redistributed from projects that would not have been sufficiently funded to deliver value to projects that were sufficiently funded. Out of which $909 (3%) went to the 3 projects that would otherwise not have met their threshold.

### Qualitative insights

We found 3 significant challenges in the model:

**Operational complexity**

The mechanism added complexity to the operation of the round, requiring significant education. Although this complexity could be reduced slightly with a better configuration of the round, or even reduced significantly with a UI tailored for the thresholds mechanism, it remains an important concern (see below)

**Cultural assumptions**

The mechanism was designed under the assumption that teams would apply for a specific, bound project. However, the applications show that most teams that applied use Gitcoin rounds to "top up" their funding. As such, there was a mismatch between the regular usage of Gitcoin rounds and the threshold mechanism.

**Assessment requirements**

Due to cultural assumptions about what Gitcoin rounds are for, most teams devised a threshold as an afterthought. This was somewhat discernible in the applications but effective policing would have required managerial resources the team didn't have (i.e. would have required operating like a grant committee with significant due diligence capabilities). We have the impression that most thresholds were at best inaccurate representations of the reality of the projects and, at worst, complete fabrications with no connection to the actual use of funds, but we can't know.

## Conclusions and recommendations

We're excited to see reflected in the data the redistribution of funds in a way that could increase the effectiveness of capital allocation by ecosystems. Showing 16% of funds reallocated, and 3% of funds reallocated having a transformative effect (from allocated to insufficiently funded projects to allocated to now sufficiently funded ones).

However, the qualitative challenges encountered are significant and put into question the validity of the quantitative insights.

Moving forward, we see promise in the use of thresholds as a mechanism if significant resources can be dedicated to both storytelling (i.e. education) and product. As such, we could expect rounds with Thresholds to become a separate product from Gitcoin rounds, both in brand and functionality.

We'd love to know whether the Gitcoin community would like to see us, RnDAO, carry further R&D on this concept.

---

*Source: [Original post on Gitcoin Governance Forum](https://gov.gitcoin.co/t/gg21-retrospective-collabtech-round-by-rndao/19317)*
