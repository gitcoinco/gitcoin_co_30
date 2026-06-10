---
id: '1771762005007'
slug: collaborators
name: "Collaborators"
shortDescription: "GitHub bounty marketplace for earning escrowed USDC rewards from merged open-source pull requests."
tags:
  - bounties
  - github
  - usdc
  - solana
  - open-source
  - contributor-reputation
lastUpdated: '2026-05-25'
authors:
  - "hollis-che"
relatedMechanisms:
  - bounties
  - direct-grants
  - reputation
relatedApps:
  - algora
  - gh-bounty
  - gitgig
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

# Collaborators

Collaborators is a GitHub bounty marketplace for open-source contributors. It lets users discover GitHub issues with USDC rewards, submit pull requests, and receive payment when the pull request is merged and verified.

The app is relevant to the Gitcoin Funding Directory because it provides a task-level funding mechanism for open-source work. It is designed around GitHub issues and pull requests, with rewards escrowed upfront and released through an automated verification flow.

## What This App Does

Collaborators connects GitHub contribution activity with USDC rewards and onchain contributor reputation.

In practice, it enables:

* **Contributors** to log in with GitHub, link a wallet, and browse rewarded issues
* **Sponsors** to add USDC bounties to public GitHub issues
* **Maintainers** to keep normal pull request review and merge workflows
* **Projects** to attract contributors to scoped bugs, features, and improvements
* **Contributors** to build reputation from verified open-source work

## Features

### GitHub Bounty Marketplace

Collaborators lets contributors browse GitHub issues across public repositories and find funded work. This gives contributors a more direct way to discover issues that have committed rewards attached.

### Escrowed USDC Rewards

The platform describes rewards as escrowed upfront and paid in USDC. This gives contributors a clearer signal that a bounty is funded before they begin work.

### Automatic Pull Request Tracking

Collaborators uses a GitHub bot to track issue status, pull request merges, and solution verification. When a pull request closes a bounty issue, the bot can verify completion and release payment.

### Developer Reputation

The platform positions itself as an onchain developer reputation system. This makes it relevant not only as a bounty rail, but also as an identity and reputation layer for open-source contributors.

## Use Cases

**Small Open-Source Fixes**

Funders can attach rewards to concrete bugs, documentation gaps, tests, or small feature work.

**Public Repository Bounties**

Collaborators supports public GitHub repositories, so bounties can be attached without requiring every repository to run a custom program.

**Contributor Track Records**

By linking rewards and merged pull requests, contributors can build a public record of completed paid open-source work.

## Further Reading

* Collaborators homepage: https://collaborators.build/

## Overview

- **Category**: Bounties | Open Source | Contributor Payments
- **Status**: Active / Experimental
- **Website**: https://collaborators.build/
- **Primary workflow**: GitHub issues and pull requests
- **Payment rail**: USDC, Solana wallet connection
