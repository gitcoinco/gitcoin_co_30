---
id: '1771762005006'
slug: gitgig
name: "GitGig"
shortDescription: "GitHub-integrated bounty tool for funding issues and paying merged contributors with USDC on Base."
tags:
  - bounties
  - github
  - usdc
  - base
  - open-source
  - contributor-payments
lastUpdated: '2026-05-25'
authors:
  - "hollis-che"
relatedMechanisms:
  - bounties
  - direct-grants
  - requests-for-proposals
relatedApps:
  - algora
  - gh-bounty
  - poidh
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

# GitGig

GitGig is a GitHub-integrated bounty tool for funding open-source issues and rewarding contributors with USDC on Base. It lets sponsors add a bounty to a GitHub issue through a comment, creates a funding page through its bot, and connects merged pull request work with contributor payout.

The app is relevant to the Gitcoin Funding Directory because it provides a lightweight issue-level funding mechanism for open-source projects. Instead of running a grant round, a sponsor can fund a specific bug, feature, documentation task, or integration request and let contributors claim the reward through the normal GitHub pull request workflow.

## What This App Does

GitGig connects GitHub issue activity with onchain USDC bounty payments.

In practice, it enables:

* **Sponsors** to create bounties on GitHub issues through a comment
* **Projects** to install a GitHub App and add bounty flows to existing repositories
* **Contributors** to link pull requests to funded issues
* **Maintainers** to keep review and merge decisions in GitHub
* **Communities** to transparently fund open-source work with onchain payments

## Features

### Comment-Based Bounty Creation

GitGig uses GitHub comments to create bounties. A sponsor can add a bounty amount on an issue, and the bot creates the associated funding flow. This keeps the funding signal visible where contributors already discuss the work.

### USDC on Base

The platform uses USDC on Base for bounty funding and payout. This gives sponsors and contributors a transparent onchain payment trail while keeping transaction costs low compared with mainnet settlement.

### Merge-Linked Payout Flow

GitGig describes a workflow where contributors reference the issue in their pull request, and payout can be connected to merged work. This makes it suitable for concrete, reviewable tasks where GitHub is the source of truth for completion.

## Use Cases

**Small Open-Source Bounties**

Projects can fund bug fixes, documentation updates, dependency work, and small features without creating a full grant process.

**Community Funding for Specific Issues**

Users and sponsors can financially prioritize the issues they care about while leaving maintainers in control of review and merge decisions.

**Transparent Contributor Rewards**

Because payments use USDC on Base, contributors and funders can inspect payment activity onchain.

## Further Reading

* GitGig homepage: https://gitgig.dev/
* GitGig GitHub App: https://github.com/apps/gitgig-base
* Base: https://www.base.org/

## Overview

- **Category**: Bounties | Open Source | Contributor Payments
- **Status**: Active
- **Website**: https://gitgig.dev/
- **Primary workflow**: GitHub issues and pull requests
- **Payment rail**: USDC on Base
