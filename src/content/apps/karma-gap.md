---
id: '1741168800005'
slug: karma-gap
name: "Karma GAP"
shortDescription: "Grantee accountability platform that tracks milestone completion and impact for grants programs across the Ethereum ecosystem."
tags:
  - accountability
  - grants
  - milestones
  - transparency
lastUpdated: '2026-03-05'
relatedMechanisms:
  - direct-grants
  - impact-attestations
relatedApps:
  - gitcoin-grants-stack
  - optimism-retropgf
  - allo-protocol
relatedCaseStudies: []
relatedResearch:
  - state-of-public-goods-funding-2024
relatedCampaigns: []
banner: /content-images/apps/karma-gap/banner.png
---

**Karma GAP** (Grantee Accountability Protocol) is an onchain protocol and application that brings transparency and accountability to grants programs across the Ethereum ecosystem. Built by Karma and founded by Mahesh Murthy, GAP addresses a persistent problem in decentralized funding: once grants are distributed, communities have limited visibility into whether funded projects deliver on their promises. Information about grantee progress is typically scattered across forum posts, external links, and private communications, making it difficult for grant teams and community members to track outcomes.

GAP solves this by providing a structured platform where grantees create project profiles, define milestones, and post progress updates -- all stored onchain as attestations through the Ethereum Attestation Service (EAS). The result is a verifiable, permanent record of what was promised, what was delivered, and how funded projects evolve over time. GAP is trusted by major ecosystem programs including Arbitrum, Gitcoin, Optimism, Octant, Celo, Scroll, and Lisk.

## What This App Does

Karma GAP provides onchain infrastructure for tracking grantee progress, building project reputation, and improving accountability in grants programs.

In practice, it enables:

* **Grant programs** to monitor the progress of funded projects through structured milestone tracking and progress updates
* **Grantees** to build verifiable onchain reputation by documenting their deliverables and achievements
* **Community members** to evaluate whether funded projects are delivering value and meeting their commitments
* **Ecosystem stewards** to make more informed future funding decisions based on historical grantee performance
* **Third-party developers** to build services on top of the attestation data through the open Karma GAP SDK

## Features

### Onchain Attestations via EAS

All project information, milestones, and progress updates in GAP are stored as attestations on the Ethereum Attestation Service. This means grantee data is not held in a proprietary database but exists as verifiable, permanent onchain records. Attestations can be referenced by other protocols and applications, creating an interoperable layer of grantee reputation data that any ecosystem participant can query and build on.

The attestation-based architecture ensures that project histories persist regardless of whether any single platform or company continues to operate, providing a durable public record of ecosystem funding outcomes.

### Project and Grant Profiles

Grantees create project profiles on GAP that aggregate all of their grants across multiple programs and ecosystems. A single project might receive funding from Gitcoin, Optimism, and Arbitrum -- GAP provides a unified view of all these grants, their associated milestones, and progress updates in one place. This cross-program visibility helps communities understand the full picture of a project's funding history and track record.

### Milestone Tracking

For each grant, grantees define specific milestones with descriptions, deliverables, and timelines. As work progresses, grantees update milestone status and post evidence of completion. Grant program administrators and community members can verify milestone completion, creating a structured accountability loop that goes beyond simple yes/no reporting.

### Progress Updates

Beyond formal milestones, grantees post regular progress updates to keep their communities informed. These updates are timestamped attestations that create a chronological record of project development. Communities can follow specific projects or browse updates across entire grant programs to understand the overall health of their ecosystem's funded portfolio.

### Karma AI

Karma GAP has integrated AI capabilities to assist with grant evaluation and monitoring. Karma AI helps surface patterns across grantee data, identify projects that may need attention, and provide automated analysis of progress reports, reducing the manual overhead of managing large grant portfolios.

### Open SDK

The Karma GAP SDK provides programmatic access to all attestation data, enabling third-party developers to build tools and dashboards on top of the accountability layer. Grant programs can integrate GAP data into their own workflows, and researchers can analyze grantee performance across ecosystems.

## Use Cases

### Multi-Ecosystem Grant Tracking

Major ecosystem programs use GAP as their accountability layer. Arbitrum DAO, one of the largest grant programs in the Ethereum ecosystem, uses GAP to track the progress of funded projects across its various grant streams. Grantees post milestones and updates, and the Arbitrum community can monitor whether funded projects are delivering on their proposals. Similarly, Optimism, Gitcoin, Celo, Scroll, and Lisk have adopted GAP for their respective programs.

### Grantee Reputation Building

For project teams that apply to multiple grant programs, GAP provides a portable reputation record. A team with a strong track record of delivering on milestones across previous grants can point to their GAP profile as evidence of reliability. This is particularly valuable in an ecosystem where pseudonymous teams often lack traditional credentialing, and where past performance is one of the strongest signals of future delivery.

### Grant Program Performance Analysis

Grant program administrators use GAP data to assess the overall effectiveness of their funding programs. By analyzing milestone completion rates, update frequency, and project outcomes across their portfolio, program managers can identify which types of projects tend to deliver the most value and adjust their funding strategies accordingly.

### Community Oversight

Community members and token holders use GAP to exercise informed oversight over ecosystem spending. Rather than relying on periodic reports from grant committees, anyone can browse GAP to see what projects were funded, what they promised to deliver, and whether they followed through. This transparency supports more informed governance participation when communities vote on future funding allocations.

### Integration with Giveth

In early 2025, Karma GAP integrated with Giveth, connecting the accountability protocol with Giveth's donation platform. This integration allows donors on Giveth to see grantee progress data from GAP, helping them make more informed donation decisions based on verified project track records.

## Further Reading

* [**Karma GAP** -- gap.karmahq.xyz](https://gap.karmahq.xyz/)
* [**Why Karma GAP** -- Karma GAP Documentation](https://docs.gap.karmahq.xyz)
* [**Karma GAP SDK** -- GitHub](https://github.com/show-karma/karma-gap-sdk)
* [**Karma GAP for Gitcoin Grantees** -- Gitcoin Governance](https://gov.gitcoin.co/t/karma-gap-for-gitcoin-grantees/16936)
* [**Karma GAP Builder Grant Updates** -- Optimism Governance](https://gov.optimism.io/t/karma-gap-builder-grant-cycle-13-updates/6682)
