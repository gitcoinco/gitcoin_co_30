---
id: '1771762005008'
slug: ubounty
name: "uBounty"
shortDescription: "GitHub issue bounty platform using x402 so sponsors can pay developers in USDC after pull requests merge."
tags:
  - bounties
  - github
  - x402
  - usdc
  - open-source
  - developer-rewards
lastUpdated: '2026-05-25'
authors:
  - "hollis-che"
relatedMechanisms:
  - bounties
  - direct-grants
  - requests-for-proposals
relatedApps:
  - bountypay
  - gitgig
  - lightning-bounties
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

# uBounty

uBounty is a GitHub bounty platform powered by x402. It helps sponsors attach USDC rewards to GitHub issues and pay developers after the associated pull request is merged.

The app is relevant to the Gitcoin Funding Directory because it is a task-based funding tool for open-source software. It sits between informal issue comments and larger grant programs: sponsors can fund one concrete issue, contributors can see a scoped reward, and payment can be coordinated through a crypto-native flow.

## What This App Does

uBounty connects GitHub issues with USDC bounty payments.

In practice, it enables:

* **Sponsors** to create bounties for GitHub issues
* **Developers** to identify paid work attached to concrete repository tasks
* **Maintainers** to keep review and merge decisions in GitHub
* **Projects** to use USDC rewards for scoped contributions
* **Communities** to make funding signals visible beside issue discussion

## Features

### x402-Based Payment Flow

uBounty uses x402 as part of its payment flow. A sponsor can signal intent with a small upfront payment and then release the larger bounty after a pull request is merged. This keeps the bounty process internet-native and aligned with wallet-based settlement.

### GitHub Webhook Automation

The workflow relies on GitHub events to connect issue funding, pull request activity, and merge status. That makes uBounty suitable for tasks where completion can be evaluated through repository review.

### USDC Rewards

The platform focuses on USDC rewards, which helps reduce volatility compared with token-denominated bounties. Stablecoin payments can make the value of a small task clearer for both sponsors and contributors.

### Lightweight Task Funding

uBounty is designed for issue-level funding rather than broad grant administration. This makes it useful for bugs, documentation updates, integrations, and other tasks that have clear acceptance criteria.

## Use Cases

**Issue-Level Funding**

Sponsors can put a stablecoin reward behind a specific GitHub issue and attract contributors who want clearly scoped paid work.

**Open-Source Contributor Payments**

Projects can reward merged pull requests without building a custom bounty workflow.

**Crypto-Native Funding Experiments**

Communities can test x402-based funding flows for small software tasks before adopting more complex grant or retroactive funding programs.

## Further Reading

* uBounty homepage: https://ubounty.ai/
* x402: https://www.x402.org/

## Overview

- **Category**: Bounties | Open Source | Contributor Payments
- **Status**: Active
- **Website**: https://ubounty.ai/
- **Primary workflow**: GitHub issues and pull requests
- **Payment rail**: USDC via x402
