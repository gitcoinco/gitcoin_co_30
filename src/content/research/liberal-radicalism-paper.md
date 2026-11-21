---
id: '4131662984'
slug: liberal-radicalism-paper
name: "Liberal Radicalism: Formal Rules for a Society Neutral among Communities (2018)"
shortDescription: "The seminal paper by Buterin, Hitzig, and Weyl that introduced quadratic funding and helped shape modern public-goods funding."
tags:
  - "research"
  - "quadratic-funding"
  - "liberal-radicalism"
  - "economics"
  - "public-goods"
lastUpdated: '2026-05-11'
authors:
  - "GBOYEE"
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies:
relatedResearch:
  - quadratic-funding-sybil-resistance
  - plural-funding-mechanisms
relatedCampaigns:
researchType: Report
ctaUrl: 'https://arxiv.org/abs/1809.06421'
banner: /content-images/research/liberal-radicalism-paper/banner.png
---

**Category**: Research
**Status**: Active
**Publication Date**: 2018-09-17
**Authors**: Vitalik Buterin, Zoe Hitzig, and E. Glen Weyl
**DOI/URL**: https://doi.org/10.1287/mnsc.2019.3337

## Overview

"Liberal Radicalism: Formal Rules for a Society Neutral among Communities" presents the mechanism now widely known as **quadratic funding**. The paper asks how a plural society can fund public goods without collapsing every community into a single majority preference, centralized budget, or donor-dominated marketplace.

The core idea is that public funding should respond to both contribution size and contributor breadth. A project supported by many contributors receives a larger match than a project supported by only a few large donors. This lets communities reveal shared demand while still allowing individual contributors to express preference intensity.

## Core Proposition

For a project with individual contributions `c1, c2, ..., cn`, the idealized funding amount is proportional to:

```text
(sum(sqrt(ci)))^2
```

This square-root structure rewards broad participation. Ten contributors giving a small amount can signal more public value than a single contributor giving the same total amount alone. In practice, this requires a matching pool that can be distributed after contributions are collected.

The paper connects this formula to welfare optimization under idealized assumptions, then discusses practical constraints such as budgets, collusion, and identity. Those constraints are why real-world quadratic funding systems need round rules, eligibility checks, Sybil resistance, and fraud review.

## Why This Research Matters

Public goods are hard to fund. Markets underfund them because people can benefit without paying directly. Centralized grants can help, but they can also overfit to institutional priorities or a narrow definition of what counts as valuable.

Liberal Radicalism offers a third path. It combines voluntary contributions with a matching rule that amplifies broadly shared support. The mechanism is especially relevant for open-source software, Ethereum infrastructure, local communities, education, civic technology, and other goods whose value is distributed across many people.

Gitcoin Grants became one of the clearest implementations of this idea. The paper helps explain why Gitcoin rounds emphasize contributor participation, matching pools, public-goods legitimacy, and anti-capture design.

## Key Contributions

### A Formal Basis for Quadratic Funding

The paper turns matching into a mechanism that can be analyzed formally. Instead of treating donor matching as a discretionary grantmaking choice, it derives a rule that connects individual contributions to collective welfare.

### Neutrality Among Communities

The phrase "society neutral among communities" is central. The mechanism does not require one authority to decide which community matters most. It lets overlapping communities coordinate around the goods they value.

### Breadth of Support as a Funding Signal

Quadratic funding makes participation breadth visible. It dampens pure wealth dominance while preserving room for people to contribute more when they care more.

### A Bridge Between Markets and Democracy

The mechanism sits between one-person-one-vote democracy and one-dollar-one-vote markets. It is more expressive than simple voting and more pluralistic than donor patronage.

## Real-World Adoption

Gitcoin Grants adopted quadratic funding in 2019 and helped turn the paper's theory into a repeatable public-goods funding practice. Since then, quadratic funding has influenced:

- Gitcoin Grants rounds
- CLR.fund experiments
- Ethereum public-goods funding programs
- Allo Protocol allocation tooling
- DAO and nonprofit grantmaking experiments

The mechanism has also inspired adjacent designs, including retroactive public-goods funding, plural funding stacks, and identity-aware allocation systems.

## Limitations and Design Challenges

The mechanism is powerful, but real deployments face constraints:

- **Sybil resistance**: If one person can appear as many contributors, the matching rule can be manipulated.
- **Collusion**: Groups can coordinate contributions to maximize matching rather than reveal genuine public value.
- **Matching pool governance**: A sponsor, DAO, or community still needs to decide the size and scope of the pool.
- **Eligibility decisions**: Rounds need clear rules for what counts as a public good.
- **User comprehension**: The square-root formula is not obvious to all contributors, so interfaces must explain matching clearly.

These limitations do not weaken the paper's importance. They define the design space that Gitcoin and other funding systems continue to explore.

## Why This Research Matters for Builders

Builders can use Liberal Radicalism as a reference point for designing allocation mechanisms. It provides:

- A mathematical foundation for matching pools
- A reason to value contributor breadth
- A framework for thinking about public-goods legitimacy
- A cautionary map of Sybil, collusion, and governance risks
- A bridge from economic theory to usable funding infrastructure

For anyone building funding rounds, DAO grant programs, public-goods dashboards, or allocation protocols, this paper remains one of the foundational texts.

## Sources

- Original paper: https://arxiv.org/abs/1809.06421
- Management Science publication: https://doi.org/10.1287/mnsc.2019.3337
- SSRN abstract: https://ssrn.com/abstract=3243656
- Vitalik Buterin's quadratic payments post: https://vitalik.ca/general/2019/01/01/quadratic.html
- Gitcoin quadratic funding repository: https://github.com/gitcoinco/quadratic-funding
