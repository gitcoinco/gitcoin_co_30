---
id: '1792516928742'
slug: algora
name: "Algora"
shortDescription: "Open-source bounty platform that lets maintainers and sponsors fund GitHub issues and pay contributors when work is merged."
logo: /content-images/apps/algora/logo.png
tags:
  - "bounties"
  - "github"
  - "open-source"
  - "contributor-payments"
  - "issue-rewards"
  - "maintainer-tools"
lastUpdated: '2026-10-20'
authors:
  - "Gitcoin Team"
relatedMechanisms:
  - bounties
  - direct-grants
  - requests-for-proposals
relatedApps:
  - gitcoin-grants-stack
  - poidh
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/apps/algora/banner.png
---

**Algora** is an open-source bounty platform that lets maintainers and sponsors attach a monetary reward to a GitHub issue, so contributors can be paid when their work is merged. A project funds an issue, contributors solve it through ordinary pull requests, and Algora handles the payout and the payment administration behind it.

The public bounty pages work as an open ledger for that funding: open and completed bounties, total awarded amounts, top solvers, and project-level bounty history are visible without an account. That is what makes Algora relevant to the Gitcoin Funding Directory — it is outcome-based funding with a public record attached, rather than a grant committee or an application process.

## What This App Does

Algora adds a funding layer on top of the GitHub workflow that maintainers already use, so a bounty is never a separate project with its own tooling:

1. A project or sponsor chooses a GitHub issue.
2. They fund the issue with a bounty amount.
3. Contributors browse open bounties and submit pull requests.
4. The project reviews and merges the accepted work.
5. Algora administers the payout to the contributor.

In practice this means:

- **Maintainers** can turn a backlog item into a paid task without standing up a grants program, treasury, or review committee.
- **Sponsors** can fund work on the projects they depend on without negotiating a separate contract for each task.
- **Contributors** find paid work by browsing bounty pages and get paid through the same pull request review that governs any other contribution.
- **Readers** can audit who was paid, for what, and by whom, because the bounty pages are public by default.

## Features

### Core Components

- **Bounty pages:** Every funded issue gets a public page showing the amount, the linked issue, the project, and the payout status, with project-level pages aggregating open and completed bounties.
- **GitHub app:** Creates bounties and reward tips on issues and pull requests, so funding lives where the work already happens instead of in a separate portal.
- **Tips:** Smaller rewards that can be attached to a specific issue, pull request, or contribution — used to recognise helpful work that is not a full bounty.
- **Solver leaderboards:** Platform and project totals for awarded amounts, number of bounties solved, and top earners.
- **Payment processing:** Payouts, compliance, and tax reporting are handled by Algora rather than by the maintainer who funded the bounty.

### Platform Capabilities

- **Open source and self-hostable:** The web app, GitHub app, and payment processor are published under AGPL-3.0, so a community can run its own instance instead of joining the hosted platform.
- **No new contributor workflow:** Bounties resolve through ordinary pull requests and merges, which keeps review, licensing, and attribution in the project's existing process.
- **Scales down as well as up:** The same mechanism covers documentation fixes, bug triage, and small maintenance tasks, not only large implementation work.
- **Transparent funding records:** Awarded totals and solver history stay public per project, which makes repeat funders and repeat solvers visible.

## Use Cases

### Maintainers Clearing a Backlog

Maintainers use bounties to convert issues that nobody has time for into paid tasks. The reward signals that the work matters, and the merged pull request keeps the maintainer in control of what actually lands in the codebase.

### Sponsors Funding Their Dependencies

Companies and protocols that depend on open-source infrastructure fund bounties on the projects they rely on. It is a lightweight alternative to a grants program: pay for the specific fix or feature, on the project's own issue tracker, with no application cycle.

### Contributors Finding Paid Open-Source Work

Developers browse bounty pages to find paid work in stacks they already use. Payment is tied to a merged pull request, so the contribution record and the payment record are the same event.

### Teams Trialling Contributors on Real Work

Because a bounty is real work in a real repository, teams have used paid tasks as a low-commitment way to collaborate with contributors before a longer engagement — the project gets the work merged either way.

## Current Status

Algora started in 2022 as "Uber for Coding", an on-demand marketplace for contract work, and relaunched in 2023 around open-source bounties with payments integrated into GitHub. The business became profitable and bootstrapped in 2024. From 2025 the company shifted its focus toward full-time hiring, and today Algora primarily operates as a technical recruiter and hiring platform that sources engineers through their open-source contributions. Project bounty pages remain online and publicly readable, which keeps the historical record of awards and solvers available.

## Further Reading

- [**Algora** — algora.io](https://algora.io/)
- [**Example project bounty page** — algora.io/org/algora/bounties/community](https://algora.io/org/algora/bounties/community)
- [**Source code (AGPL-3.0)** — github.com/algora-io/algora](https://github.com/algora-io/algora)
- [**Show HN: Algora, paid open-source contributions** — news.ycombinator.com](https://news.ycombinator.com/item?id=35412226)

## Overview

- **Category**: Bounties | Contributor Payments | Primitive
- **Status**: Bounty pages active; company focus has shifted toward full-time hiring
- **Entity**: Algora PBC (public benefit corporation)
- **Website**: https://algora.io
- **Launched**: 2022, relaunched around open-source bounties in 2023
- **License**: AGPL-3.0
- **Social Links**: [GitHub](https://github.com/algora-io), [X](https://x.com/algoraio), [LinkedIn](https://linkedin.com/company/algorapbc), [YouTube](https://www.youtube.com/@algora-io)
