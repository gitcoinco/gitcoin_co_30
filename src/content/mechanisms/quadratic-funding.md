---
id: '1'
slug: quadratic-funding
name: Quadratic Funding
shortDescription: A democratic funding mechanism that matches community contributions quadratically, amplifying the impact of many small donors over few large ones.
tags:
  - quadratic
  - matching
  - democratic
  - public goods
lastUpdated: '2024-12-01'
relatedApps:
  - gitcoin-grants-stack
  - clr-fund
  - giveth
  - octant
relatedMechanisms:
  - retroactive-funding
  - conviction-voting
---

**Category:** Allocation
**Inventors:** Vitalik Buterin, Zoë Hitzig, E. Glen Weyl
**Origin Year:** 2018

Quadratic Funding (QF) is a mathematically optimal way to fund public goods in a democratic community. It was proposed by Vitalik Buterin, Zoë Hitzig, and E. Glen Weyl in their paper "Liberal Radicalism."

The core insight is that the number of contributors matters more than the total amount contributed. A project supported by 100 people giving $1 each receives more matching funds than a project with 1 person giving $100.

This creates strong incentives for projects to build broad community support rather than just seeking a few large donors.

## How It Works

1. A matching pool is established by sponsors
2. Community members donate to projects they value
3. Matching funds are distributed based on the formula: (√c₁ + √c₂ + ... + √cₙ)²
4. Projects with more unique contributors receive proportionally more matching
5. Results are calculated and funds distributed at round end

## Advantages

- Democratically allocates capital based on community preferences
- Mathematically optimal for funding public goods
- Resistant to plutocracy - one whale can't dominate
- Creates incentives for broad community building
- Transparent and verifiable

## Limitations

- Vulnerable to sybil attacks without identity verification
- Requires a matching pool sponsor
- Complex to explain to newcomers
- Can be gamed through collusion
- Favors well-known projects over new ones

## Best Used For

- Community grants programs
- Open source funding
- Public goods
- Ecosystem development

## Technical Resources

- [Liberal Radicalism Paper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656) - Original academic paper
- [Quadratic Funding Explained](https://wtfisqf.com) - Educational resource
- [Gitcoin's QF Implementation](https://github.com/gitcoinco/grants-stack) - Reference implementation
