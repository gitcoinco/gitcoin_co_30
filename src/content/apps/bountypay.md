---
id: '1771762005007'
slug: bountypay
name: "BountyPay"
shortDescription: "GitHub-native crypto bounty app that escrows USDC or MUSD and pays contributors after pull requests merge."
tags:
  - bounties
  - github
  - usdc
  - escrow
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
  - gitgig
  - lightning-bounties
  - poidh
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

# BountyPay

BountyPay is a GitHub-native bounty app for funding open-source issues with crypto rewards. Sponsors attach a bounty to a GitHub issue, fund the reward, and contributors are paid when their pull request merges and closes the issue.

The app is relevant to the Gitcoin Funding Directory because it gives maintainers a focused way to fund small, reviewable tasks without launching a full grant round or moving coordination away from GitHub. It turns an issue into a funded work package while keeping review, discussion, and merge decisions in the repository.

## What This App Does

BountyPay connects GitHub issues, escrowed bounty funding, and contributor wallet payouts.

In practice, it enables:

* **Sponsors** to create and fund bounties for specific GitHub issues
* **Maintainers** to keep acceptance criteria and review decisions in GitHub
* **Contributors** to solve funded issues through pull requests
* **Projects** to use escrow instead of informal payment promises
* **Communities** to make task-level funding visible and trackable

## Features

### GitHub-Native Workflow

BountyPay is built around GitHub issues and pull requests. Sponsors select an issue, set bounty terms, and fund the reward. Contributors then work through the normal pull request process, so maintainers do not need a separate project management workflow for small bounties.

### Escrowed Crypto Rewards

The platform emphasizes escrow for funded bounties. This can increase contributor confidence because the sponsor has already committed funds before work is reviewed. BountyPay currently describes support for USDC on Base and MUSD on Mezo.

### Automatic Payout After Merge

BountyPay is designed to pay contributors when the relevant pull request is merged and the issue is closed. This reduces manual follow-up after review and keeps completion tied to the repository's source of truth.

### Refund Protection

The platform includes refund protection for sponsors if work is not completed by the bounty deadline. That makes it more practical for maintainers and sponsors who want to fund concrete issues while limiting idle capital risk.

## Use Cases

**Small Open-Source Fixes**

Projects can fund bugs, documentation updates, integration work, and small features without setting up a broad grants process.

**Escrowed Issue Funding**

Sponsors can signal that a bounty is actually funded before contributors spend time on implementation.

**Contributor Rewards**

Developers can receive stablecoin rewards for merged pull requests while staying in the normal GitHub contribution flow.

## Further Reading

* BountyPay homepage: https://bountypay.luccilabs.xyz/
* Lucci Labs GitHub: https://github.com/luccilabs
* Base: https://www.base.org/

## Overview

- **Category**: Bounties | Open Source | Escrow
- **Status**: Active
- **Website**: https://bountypay.luccilabs.xyz/
- **Primary workflow**: GitHub issues and pull requests
- **Payment rail**: USDC on Base and MUSD on Mezo
