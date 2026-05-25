---
id: '1771762005002'
slug: gh-bounty
name: "GH Bounty"
shortDescription: "Onchain GitHub bounty platform that uses escrowed SOL rewards and AI-assisted validation for open-source pull request work."
tags:
  - bounties
  - github
  - open-source
  - solana
  - escrow
  - ai-review
lastUpdated: '2026-05-25'
authors:
  - "hollis-che"
relatedMechanisms:
  - bounties
  - direct-grants
relatedApps:
  - poidh
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

# GH Bounty

GH Bounty is an open-source bounty platform for GitHub issues. It lets funders create bounties for repository work, escrow funds onchain, and use AI-assisted validation to help evaluate pull requests before payment is released.

The app is relevant to the Gitcoin Funding Directory because it provides a lightweight, outcome-based funding mechanism for open-source work. Instead of running a broad grant process, a funder can create a bounty for a specific GitHub issue and pay contributors when the work is completed.

## What This App Does

GH Bounty connects GitHub issue work with onchain bounty funding.

In practice, it enables:

* **Funders** to create rewards for specific GitHub issues
* **Contributors** to discover bounties and submit pull requests
* **Projects** to use issue-level incentives for scoped development work
* **Validators** to review submitted work against bounty requirements
* **Agents** to discover and interact with bounties through the project's MCP endpoint

## Features

### Onchain Escrow

GH Bounty uses escrowed funds so contributors can see that a reward has been committed before they start work. This reduces payout uncertainty and gives contributors clearer confidence that a bounty is real.

### GitHub Pull Request Workflow

The platform stays close to standard GitHub contribution flows. Contributors solve issues through pull requests, while maintainers and validators can evaluate whether the submitted work satisfies the bounty requirements.

### AI-Assisted Validation

GH Bounty positions AI validators as a way to help review bounty submissions against scoped requirements. This can be useful for small tasks where requirements are explicit and the contribution can be checked against a clear expected outcome.

### Agent Support

The project exposes an MCP endpoint, making it relevant for agentic contributor workflows. Agents can inspect available bounties and help users identify tasks that match their skills.

## Use Cases

**Scoped Development Bounties**

Maintainers or funders can post rewards for bugs, features, tests, documentation improvements, or integration work that can be completed through pull requests.

**Agent-Assisted Open Source Work**

Because GH Bounty exposes agent-oriented infrastructure, it can support workflows where AI agents help contributors search, triage, and act on bounty opportunities.

**Transparent Contributor Rewards**

Escrowed onchain funding gives contributors a stronger signal that a bounty is funded before they spend time on implementation.

## Further Reading

* GH Bounty homepage: https://www.ghbounty.com/
* GH Bounty MCP endpoint: https://mcp.ghbounty.com/

## Overview

- **Category**: Bounties | Open Source | Contributor Payments
- **Status**: Active
- **Website**: https://www.ghbounty.com/
- **Primary workflow**: GitHub issues and pull requests
- **Payment rail**: Solana / SOL
