---
id: '1741171220'
slug: pairwise
name: "Pairwise (formerly Budget Box)"
shortDescription: "Pairwise comparison voting where participants choose between two options at a time — building robust preference rankings from simple binary choices."
tags:
  - governance
  - democratic
  - voting
lastUpdated: '2026-03-05'
relatedMechanisms:
  - quadratic-voting
  - ranked-choice-voting
  - star-voting
  - voting
relatedApps: []
relatedCaseStudies: []
relatedResearch:
  - plural-funding-mechanisms
  - practical-pluralism
relatedCampaigns: []
banner: /content-images/mechanisms/pairwise/banner.png
---

**Pairwise** (formerly known as Budget Box) is a preference aggregation mechanism where participants make a series of simple binary comparisons — choosing between two options at a time. These individual pairwise comparisons are then aggregated to produce a robust ranking of all options. The mechanism reduces cognitive load on voters while producing more nuanced preference data than single-choice voting.

## How It Works

1. **Options are submitted** — projects, proposals, or items to be evaluated
2. **Participants receive pairs** — the system presents two options at a time
3. **Binary choices are made** — the participant selects which of the two they prefer (or indicates indifference)
4. **Many comparisons aggregate** — across all participants and pairs, a mathematical model builds a global ranking
5. **Rankings inform allocation** — the resulting preference ordering can drive funding distribution, prioritization, or governance decisions

## Advantages

- Dramatically reduces cognitive load — choosing between two things is easier than ranking many
- Produces richer preference data than simple plurality voting
- Resistant to strategic voting — harder to game when you don't see the full picture
- Handles large option sets gracefully — participants don't need to evaluate everything
- Accessible to participants without deep context on all options

## Limitations

- Requires many comparisons across participants to build reliable rankings
- May produce inconsistent results with small sample sizes
- Participants may fatigue if asked to make too many comparisons
- Doesn't capture intensity of preference — a slight and strong preference look the same
- Aggregation algorithms affect outcomes and may not be transparent to participants

## Best Used When

- A large number of options must be ranked or prioritized
- Voters have limited time or context to evaluate all options
- Simple, accessible participation is a priority
- The goal is relative prioritization rather than absolute scoring

## Examples and Use Cases

**Optimism RetroPGF** used pairwise comparison in certain rounds to help badgeholders evaluate and rank hundreds of projects for retroactive funding allocation.

**General Fund** and other community funding tools have experimented with pairwise interfaces for participatory budgeting.

**Academic and research applications** — pairwise comparison methods (Elo ratings, Bradley-Terry models) are widely used in recommendation systems, sports rankings, and preference learning.

## Further Reading

- [Pairwise.vote](https://pairwise.vote)
