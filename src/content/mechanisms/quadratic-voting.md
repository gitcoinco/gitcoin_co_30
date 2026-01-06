---
id: '8'
slug: quadratic-voting
name: Quadratic Voting
shortDescription: >-
  A voting mechanism where the cost of additional votes increases quadratically,
  allowing for nuanced preference expression.
heroImage: /images/qv-hero.jpg
category: voting
howItWorks: |-
  1. Each voter receives equal voice credits
  2. Votes are purchased with credits at quadratic cost
  3. n votes = n² credits
  4. Voters allocate across multiple issues
  5. Results tabulated based on total votes
advantages:
  - Allows preference intensity expression
  - More nuanced than 1-person-1-vote
  - Mathematically robust
  - Prevents tyranny of the majority
  - Efficient collective decision making
limitations:
  - Complex to explain
  - Credit allocation is challenging
  - Can still be gamed with money
  - Requires trust in credit distribution
  - User experience challenges
bestUsedFor:
  - Budget allocation
  - Multi-issue voting
  - Governance decisions
  - Prioritization exercises
implementations: []
technicalResources:
  - title: Quadratic Voting Paper
    url: https://www.aeaweb.org/articles?id=10.1257/aer.p20171033
    type: paper
  - title: RadicalxChange QV
    url: https://www.radicalxchange.org/concepts/quadratic-voting/
    type: article
inventors:
  - E. Glen Weyl
originYear: 2017
relatedMechanisms:
  - quadratic-funding
  - conviction-voting
tags:
  - voting
  - quadratic
  - governance
  - preferences
lastUpdated: '2024-10-01'
---

Quadratic Voting allows participants to express the intensity of their preferences, not just direction. Each voter has a budget of "voice credits" and can allocate them across options, with the cost of votes increasing quadratically.

To cast 1 vote costs 1 credit. To cast 2 votes costs 4 credits (2²). To cast 3 votes costs 9 credits (3²). This makes it expensive to strongly influence any single decision while allowing nuanced preference expression.