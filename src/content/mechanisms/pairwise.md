---
id: '1741171220'
slug: pairwise
name: "Pairwise"
shortDescription: "A family of preference aggregation methods that build rankings or weights from many simple A-vs-B comparisons."
tags:
  - governance
  - democratic
  - voting
lastUpdated: '2026-05-03'
authors:
  - "Kevin Owocki"
  - "Daniel Kronovet"
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

**Pairwise** methods are a family of preference aggregation techniques in which participants compare two options at a time, and a model converts the resulting binary judgments into a ranking or set of weights. The simplicity of each individual judgment makes the mechanism accessible to large, distributed audiences, while the aggregation step lets it produce richer outputs — orderings, scores, or funding allocations — than single-choice voting.

## Two Modes: Estimation and Aggregation

Pairwise methods are used for two related but distinct purposes:

- **Estimation** — recovering a hidden ground-truth ranking from noisy observations. Voters are treated as imperfect measurements of an underlying reality. Examples: judging competition entries, scoring chess players, evaluating language models.
- **Aggregation** — synthesizing intentional preferences where no ground truth exists. Voters express what they want, and the algorithm combines their judgments into a collective outcome. Examples: prioritizing community proposals, allocating grant funding.

The two modes share the same core mechanic but call for different design choices around aggregation, vote weighting, and pair selection.

## How It Works

1. **Items are submitted** — projects, proposals, or options to be evaluated.
2. **Pairs are surfaced** — the system presents two items at a time. Pair selection can be random, bucketed by category or tier, or actively chosen to maximize information.
3. **Binary judgments are made** — the participant picks one (or skips, or marks them equal).
4. **An aggregation algorithm produces a ranking** — common choices include the Bradley-Terry model, Elo, and spectral methods (eigenvector-based, related to PageRank). Each handles noise, sparsity, and intransitive preferences differently.
5. **The ranking informs allocation** — used as-is for prioritization, or mapped to funding weights, slates, or governance decisions.

## Origins

Pairwise comparison is one of the oldest measurement techniques in psychometrics. L. L. Thurstone's *Law of Comparative Judgment* (1927) established its statistical foundations. Variants have since been used for chess ratings (Elo, 1960s), web search (PageRank, 1998), peer-to-peer trust (EigenTrust), and recommendation systems. The application to public goods funding and online community decision-making is more recent.

## Advantages

- Each judgment is cognitively cheap — choosing between two things is easier than ranking many or assigning numeric scores.
- Accessible to participants without deep context on every option, since each comparison only requires familiarity with two items.
- Produces richer preference data than plurality voting and supports several aggregation algorithms with well-studied properties.
- Random pair surfacing distributes voter attention across the option set, reducing the marketing-driven dynamics that can dominate other allocation mechanisms.
- Resistant to certain forms of strategic voting — manipulating a global ranking through individual A-vs-B choices is harder than burying rivals on a ranked ballot.

## Limitations

- Reliable rankings require many comparisons; with k items, naive approaches need on the order of k² votes, though smart pair selection can reduce this substantially.
- Binary judgments don't capture intensity of preference, though Likert-style inputs (e.g. a 1–5 scale stored as a real-valued score) can recover it at the cost of a slightly heavier interface.
- Voters may fatigue across long sessions, especially without an engaging interface.
- The aggregation algorithm shapes outcomes in ways that may not be transparent to participants, so legitimacy depends on clear communication of how votes become weights.
- Less suited to small expert groups who would prefer to assign weights directly.

## Best Used When

- A large set of options must be ranked or prioritized.
- The audience is broad and distributed, with limited time per voter but at least some baseline familiarity with the domain.
- Discovery is a goal — surfacing items voters wouldn't have sought out on their own.

## Examples and Use Cases

**Optimism Retro Funding** has used pairwise comparison in some rounds to help badgeholders evaluate large slates of projects, with results aggregated using the Bradley-Terry model.

**Deep Funding** (2024), an Ethereum ecosystem initiative supported by Vitalik Buterin, uses pairwise judgments by a human jury to score competing AI-generated weight proposals for allocating funds across a project dependency graph.

**All Our Ideas** (Salganik & Levy, 2015) introduced "pairwise wiki surveys" as a research instrument, used by the New York City Mayor's Office to gather public input for the PlaNYC 2030 sustainability plan.

**LLM evaluation** — pairwise comparison is now the dominant method for ranking large language models, with platforms like Chatbot Arena aggregating millions of human A-vs-B judgments via Bradley-Terry or Elo.

**Sports, recommendation systems, and academic research** have used pairwise methods (Elo ratings, Bradley-Terry models, spectral ranking) for decades to produce rankings from competitive or preferential data.

## Further Reading

- [Pairwise.vote](https://pairwise.vote)
- [Wiki Surveys: Open and Quantifiable Social Data Collection](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0123483) — Salganik & Levy, 2015
- [Decentralized Capital Allocation via Budgeting Boxes](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3317445) — Kronovet, Fischer & du Rose, 2018; the first description of pairwise methods for onchain public goods funding
- [The Pairwise Paradigm](http://kronosapiens.github.io/blog/2025/12/14/pairwise-paradigm) — overview of pairwise methods for capital allocation
