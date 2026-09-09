---
id: '1770997159197'
slug: gitcoin-grants-stack
name: "Gitcoin Grants Stack"
shortDescription: "Gitcoin’s Allo-based grants UI (QF, direct grants, retro). Wound down May 2025; Allo contracts remain in maintenance."
logo: /content-images/apps/gitcoin-grants-stack/logo.png
tags:
  - quadratic
  - grants
  - multichain
lastUpdated: '2026-09-09'
relatedMechanisms:
  - quadratic-funding
  - direct-grants
  - retroactive-funding
relatedApps:
  - allo-protocol
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/apps/gitcoin-grants-stack/banner.png
---

**Gitcoin Grants Stack** was the application layer on **Allo Protocol** for running grants programs: quadratic funding, direct grants, and retroactive funding, without writing custom allocation contracts.

Gitcoin wound it down in **May 2025** (see [Grants Stack Winds Down](https://www.gitcoin.co/blog/grants-stack-winds-down--heres-whats-changing-and-what-to-expect)). This directory’s [Allo Protocol](/apps/allo-protocol) profile already says Allo then entered **maintenance**: contracts stay deployed and forkable, active product development does not. This page still `lastUpdated` **2026-02-13** and described Grants Stack in the present tense (“provides a no-code toolkit,” “program managers create and deploy rounds”) as if operators should launch new rounds on it today.

They should not. Use this page as history of the 2023–2025 stack, not as a current grants product.

## What This App Did

Grants Stack sat on Allo’s primitives (recipient registration, pools, strategies, distribution) and exposed them as Manager, Explorer, and Builder apps.

In practice it let:

* **Program managers** configure rounds (QF, direct grants, retro) without writing Solidity
* **Projects** keep an onchain profile and apply across rounds
* **Donors** browse Explorer and check out across rounds/chains
* **Operators** gate or weight matching with **Gitcoin Passport** / Connection-Oriented Cluster Matching (COCM)

It was the UI for Gitcoin Grants and partner rounds from 2023 through May 2025, including branded ecosystem rounds on several L2s.

## Features (historical)

Allo was the contract layer. Grants Stack was the UI:

* **Manager** — create rounds, eligibility, timelines, applications
* **Explorer** — public round/project discovery and donations; multi-round checkout
* **Builder** — persistent project profiles and application history
* **Passport / COCM** — sybil resistance and matching weights

It ran on Ethereum mainnet plus L2s commonly used for Gitcoin rounds (Optimism, Arbitrum, Base, Polygon, Celo, zkSync, Scroll, Avalanche). The application layer was open-source and forkable.

## What the wind-down is not

* Not a claim that Allo contracts were deleted. They remain deployed; this directory’s Allo profile is the current protocol status.
* Not a claim that quadratic funding disappeared. Other apps (for example Octant v2) run QF on their own stack.
* Not an invitation to stand up a new Gitcoin-hosted Grants Stack round in 2026.

## Use Cases (while it ran)

### Protocol foundations

Partner rounds used shared Manager/Explorer instead of bespoke grant UIs.

### OSS maintainers

A single Builder profile could apply across Gitcoin and partner rounds and keep donation history.

### DAOs allocating treasury

QF or direct-grant rounds without custom contracts.

Those workflows ended as a Gitcoin-hosted product in May 2025.

## Further Reading

* [Grants Stack Winds Down](https://www.gitcoin.co/blog/grants-stack-winds-down--heres-whats-changing-and-what-to-expect)
* [Allo Protocol](/apps/allo-protocol) (this directory; maintenance after the wind-down)
* [Introducing Allo v2](https://www.gitcoin.co/blog/introducing-allo-v2)
* [Gitcoin Grants Stack](https://www.gitcoin.co/blog/gitcoin-grants-stack) (historical product post)
