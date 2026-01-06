---
id: '1'
slug: quadratic-funding
name: Quadratic Funding
shortDescription: >-
  A democratic funding mechanism that matches community contributions
  quadratically, amplifying the impact of many small donors over few large ones.
heroImage: /images/qf-hero.jpg
category: allocation
howItWorks: >-
  1. A matching pool is established by sponsors

  2. Community members donate to projects they value

  3. Matching funds are distributed based on the formula: (√c₁ + √c₂ + ... +
  √cₙ)²

  4. Projects with more unique contributors receive proportionally more matching

  5. Results are calculated and funds distributed at round end
advantages:
  - Democratically allocates capital based on community preferences
  - Mathematically optimal for funding public goods
  - Resistant to plutocracy - one whale can't dominate
  - Creates incentives for broad community building
  - Transparent and verifiable
limitations:
  - Vulnerable to sybil attacks without identity verification
  - Requires a matching pool sponsor
  - Complex to explain to newcomers
  - Can be gamed through collusion
  - Favors well-known projects over new ones
bestUsedFor:
  - Community grants programs
  - Open source funding
  - Public goods
  - Ecosystem development
implementations:
  - gitcoin-grants-stack
  - clr-fund
  - giveth
  - octant
technicalResources:
  - title: Liberal Radicalism Paper
    url: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656
    type: paper
  - title: Quadratic Funding Explained
    url: https://wtfisqf.com
    type: article
  - title: Gitcoin's QF Implementation
    url: https://github.com/gitcoinco/grants-stack
    type: repo
inventors:
  - Vitalik Buterin
  - Zoë Hitzig
  - E. Glen Weyl
originYear: 2018
relatedMechanisms:
  - retroactive-funding
  - conviction-voting
tags:
  - quadratic
  - matching
  - democratic
  - public goods
lastUpdated: '2024-12-01'
---

Quadratic Funding (QF) is a mathematically optimal way to fund public goods in a democratic community. It was proposed by Vitalik Buterin, Zoë Hitzig, and E. Glen Weyl in their paper "Liberal Radicalism."

The core insight is that the number of contributors matters more than the total amount contributed. A project supported by 100 people giving $1 each receives more matching funds than a project with 1 person giving $100.

This creates strong incentives for projects to build broad community support rather than just seeking a few large donors.