---
id: '1788962515703'
slug: questbook
name: "Questbook"
shortDescription: "On-chain grants UI for delegated domain allocation: domain allocators review proposals and pay milestones from a program multisig."
logo: /content-images/apps/questbook/logo.png
tags:
  - grants
  - delegation
  - milestone
lastUpdated: '2026-09-09'
relatedMechanisms:
  - dedicated-domain-allocation
  - direct-grants
  - milestone-based-funding
relatedApps:
  - arbitrum-dao-grants
  - ethereum-foundation-esp
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/apps/questbook/banner.png
---

**Questbook** is a grants-and-bounties application for DAOs and foundations. Operators open a program, domain allocators (DAs) review proposals, and payouts are milestone-based from a program wallet. The marketing site frames this as [delegated domain allocation](/mechanisms/dedicated-domain-allocation), a pattern it attributes to the Ethereum Foundation.

The live app is [questbook.app](https://questbook.app/). The marketing site is [questbook.xyz](https://www.questbook.xyz/). Source is on [GitHub](https://github.com/questbook). Questbook is operated by CreatorOS Inc.

This directory already documents DDA as a **mechanism**. It did not have an **app** profile for the tool most Ethereum-adjacent programs actually use to run DDA.

## What This Platform Does

Questbook is not a matching pool and not quadratic funding. It is workflow software: apply → DA review → milestone → payout.

In practice it lets:

* **Foundations and DAOs** run themed tracks with named domain allocators instead of one central grants committee
* **Builders** submit proposals, post milestone updates, and get paid per accepted milestone
* **Communities** read proposals and comments on a public dashboard (program-specific subdomains such as `arbitrum.questbook.app`, `polygon.questbook.xyz`, `circle.questbook.app`)

The homepage (fetched 2026-09-09) claims **60K+ builders**, **7K+ proposals**, and **10M+ paid out**. Those figures are Questbook’s own marketing counters, not an independently audited TVL.

## Features

* **Delegated Domain Allocation:** each track has DAs who source, score, and approve inside a mandate. Parallel tracks avoid a single bottleneck. Accountability is per-domain, not protocol-wide QF.
* **Milestone payouts:** typical flow is proposal → rubric/DA review → (sometimes) a second lab/foundation review → funds on milestone completion. Polygon Community Grants Season 2 documented that pattern publicly.
* **Program instances:** ecosystems run their own Questbook site (Arbitrum, Polygon, ENS, Compound, Aave, Celo, Circle, and others appear as tenants). That is closer to “SaaS for grant ops” than to a single Ethereum public-goods round.
* **Open source / chain config:** Questbook publishes contracts and a `questbook/chains` YAML flow for adding EVM chains. Older posts also describe IPFS + on-chain functions. “Trustless / no rug” on the marketing site means the operator cannot silently rewrite the dapp’s published code path; it does **not** mean DAs are untrusted or that reviews are automatic.

## Limitations

* **Humans still decide.** DAs and foundation reviewers can delay, reject, or stall milestones. This is not Allo QF and not Retro Funding.
* **“Trustless” oversells the product.** Capital still sits in a program multisig; a hostile or captured DA set can starve applicants.
* **Not Ethereum-only.** Solana, TON, and Circle’s Arc program also use the same product. This profile is here because DDA is an EF-pioneered Ethereum funding pattern and several Ethereum/L2 treasuries run on Questbook.
* **Program pages go stale.** Individual cohorts close (Circle 2026 Cohort 1 shows as closed with $120k paid on circle.questbook.app; Cohort 2 was open with $0 paid and hundreds of proposals when fetched). Always read the tenant page, not this directory card, for “can I apply today?”
* **Homepage totals are unverified.** Treat 10M+ paid as a vendor claim.

## Use Cases

### L2 / foundation grant ops

Arbitrum’s D.A.O. domain tracks and similar programs have used Questbook as the public application and milestone surface while the DAO or foundation remains the funder.

### Domain-split treasuries

A protocol that wants DevRel, governance, and research decided by different experts can run three DA tracks instead of one committee.

### Builders hunting open RFPs

The root app lists featured/open programs. Acceptance rates vary wildly (Circle Cohort 2: hundreds of proposals vs a handful accepted).

## Further Reading

* [Questbook app](https://questbook.app/)
* [Delegated Domain Allocation (this directory)](/mechanisms/dedicated-domain-allocation)
* [DDA / min grants DAO, max community participation](https://blog.questbook.xyz/posts/min-grants-dao-max-community-participation/)
* [GitHub: questbook](https://github.com/questbook)
* [Circle Grants on Questbook](https://circle.questbook.app/) (example of a live 2026 tenant)
