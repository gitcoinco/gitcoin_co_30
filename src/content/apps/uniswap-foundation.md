---
id: '1789828578139'
slug: uniswap-foundation
name: "Uniswap Foundation"
shortDescription: "Delaware non-profit that runs Uniswap's ecosystem grants: direct funding, audits, research, and Unichain/v4 builder programs."
logo: /content-images/apps/uniswap-foundation/logo.png
tags:
  - grants
  - dao
  - defi
  - milestone
  - ethereum
lastUpdated: '2026-09-19'
authors:
  - lordjames
relatedMechanisms:
  - direct-grants
  - milestone-based-funding
  - requests-for-proposals
relatedApps:
  - ethereum-foundation-esp
  - arbitrum-dao-grants
  - optimism-retropgf
  - polygon-grants
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/apps/uniswap-foundation/banner.png
---

The **Uniswap Foundation** is a Delaware non-profit, founded in 2022, that funds developers, researchers, security work, and governance tooling around the Uniswap protocol. It is independent of Uniswap Labs. Capital comes from UNI-holder governance, not from a quadratic round or an onchain matching pool. Applications are reviewed by Foundation staff; large awards go through diligence, KYC, milestones, and a public KPI cadence.

It succeeded the community-run Uniswap Grants Program (UGP), which launched in 2021 and deployed about $7 million across 122 grants. The Foundation's own about page records roughly $6.5 million awarded to 99 projects in its first year. A November 2025 Foundation post (Devin Walsh and Ken Ng) puts cumulative grant commitments above $40 million, alongside 180+ Unichain teams and 1.5k+ hook developers onboarded.

This is a **protocol-specific grant program**, not a general public-goods funder. Uniswap's AMM, v4 hooks, and Unichain are in scope; an unrelated Ethereum public good is not, unless it clearly serves Uniswap users or governance.

## What This Program Does

The Foundation turns UNI-governance treasuries into **discretionary, milestone-based grants** for the Uniswap stack.

In practice, it enables:

- **Protocol and app teams** to get non-dilutive funding for v4 hooks, Unichain deployments, liquidity interfaces, and adjacent DeFi integrations — with a documented preference for work that is already live on Unichain and/or v4.
- **Researchers** to run DeFi, routing, MEV, and mechanism work (TLDR, UCRP, Gauntlet routing studies, academic programs) without selling a token.
- **Security vendors and protocols** to tap the Uniswap Foundation Security Fund (UFSF) for subsidized audits (up to 100% of cost for accepted projects) and Immunefi bounties on protocol-fee bugs.
- **Governance contributors** to maintain delegate tooling (Agora), legal-entity work, and experiments such as Butter Conditional Funding Markets.
- **New developers** to enter through the Hook Incubator (Atrium Academy: 1,200+ applicants, 400+ developers onboarded in Foundation reporting) and ETHGlobal hackathon bounties.

It does **not** run quadratic funding, badgeholder voting, or permissionless onchain allocation. A rejected application is a staff decision, not a community score.

## Features

### Core components

- **Open grants intake.** The current builder form lives on Uniswap docs (`Get Funded`) and a HubSpot application. Scope is protocols, tooling, research, governance, and community. Amounts are "based on project scope," not a published min/max. Early prototypes are allowed; a working Unichain/v4 deployment is an explicit advantage.
- **Diligence → KYC → milestones.** The grantee toolkit describes selection, onboarding (KYC and contract), marketing for $250k+ initiatives, then monthly milestone calls and quarterly KPI reviews. This is closer to a foundation grant than to Gitcoin Grants Stack.
- **Audience categories.** After the 2023–24 strategy shift, grants are organized around developers, researchers, governance, and innovation, each with a small set of KPIs reported to Uniswap governance — not around quadratic domains.
- **Security subsidies.** UFSF (Areta) routes projects to a vetted auditor panel. Separate line items have paid OpenZeppelin, Trail of Bits, Cantina/Spearbit, ABDK, Certora, Code4rena, and others for v4 and governance upgrades.
- **Mechanism experiments.** The Foundation has used Butter Conditional Funding Markets to award Unichain lending grants ($100k then two $400k slots, 2025 calendar) instead of a pure RFP. That is still Foundation-designed, not a standing public QF round.

### Program characteristics

- **Governance-funded, foundation-operated.** UNI holders approve treasury transfers (including Uniswap Unleashed, which sent 20.3 million UNI — about $114 million at 2025-12-31 prices — to the Foundation). Day-to-day award decisions sit with staff, not a token vote on each grant.
- **Large-grant bias since 2024.** The Foundation publicly moved from many $20k–$50k, 3–6 month grants (year one: $5.6 million across 99 grants in its own retrospective) toward fewer $250k+ multi-year bets. Small builders still apply; the stated strategy is fewer, larger, longer.
- **Unichain / v4 tilt.** Docs tell applicants to deploy there when they can. That concentrates capital on Uniswap's newest surfaces and leaves older v2/v3-only work harder to justify.
- **Finite runway, post-UNIfication shrinkage.** Unaudited FY2025 financials (gov.uniswap.org, 31 Mar 2026) show $85.8 million in assets at year-end 2025 ($49.9 million cash/stables, 15.1 million UNI, 240 ETH), $26 million newly committed in 2025, $11 million disbursed against prior commitments, $9.7 million opex excluding 0.45 million UNI employee awards, and a then-projected runway through January 2027. The UNIfication proposal (passed 26 Dec 2025) moved most Foundation staff to Labs, created a DUNI legal entity, and left a small grants-focused remainder with **no plan to request more funds from governance**. Treat 2026 capacity as smaller than the 2024 headcount on the About page.

## Use Cases

### Teams shipping Uniswap v4 hooks or Unichain apps

A hook designer or Unichain lending market uses Foundation grants for implementation, audits, and distribution rather than a general Ethereum RFP. The Hook Incubator and UFSF exist specifically for this path. Tradeoff: you are scored on Uniswap-ecosystem KPIs (volume, hook initializations, Unichain TVL), not on public-goods impact outside Uniswap.

### Researchers and analytics groups

Groups such as Gauntlet, Allium, CBER Forum, and TLDR have been funded to publish routing, incentive, and DEX-analytics work that Uniswap governance can cite. This is closer to a domain RFP than to RetroPGF: the Foundation picks the research agenda.

### Security and audit buyers

A protocol that is materially on Uniswap can apply to UFSF instead of paying a full audit invoice. Subsidy can cover up to 100% of cost, but only through the Foundation's provider process — it is not a blank cheque to any auditor.

### Governance delegates and tooling

Agora's delegator app, governance audits, and Govswap events are funded as infrastructure for UNI voting, not as open-ended community grants. If you are building generic DAO tooling with no Uniswap deployment, this is the wrong window (Ethereum Foundation ESP or a DAO's own program is a better fit).

## Strengths

- One of the larger **active** protocol grant books in DeFi, with public FY2025 numbers and a live application form.
- Security and developer onramps (UFSF, Hook Incubator, ETHGlobal) sit next to cash grants, which most DAO grant programs do not operationalize.
- Independent of Labs as a legal matter, with reporting back to UNI governance.
- Willing to try non-RFP allocation (Butter CFMs) without pretending those experiments are quadratic funding.

## Limitations

- **Not a public-goods matching protocol.** No QF, no MACI, no badgeholder ballot. Staff and committee discretion is the mechanism.
- **KYC and contracts** exclude anonymous and many non-US-friendly applicants.
- **Uniswap-centric.** Ecosystem public goods that do not move Uniswap metrics are out of scope by design.
- **Strategy drift toward large incumbents.** The $250k+ multi-year shift plus Unichain/v4 preference raises the floor for first-time grantees relative to UGP-era $20k–$50k checks.
- **Post-UNIfication uncertainty.** FY2025 figures are a pre-reorg snapshot; Q1 2026 reporting was supposed to restate spend after staff moved to Labs. Do not treat the $87.5 million "to be committed" earmark as a guarantee of 2026–27 outlays.
- **Disbursement lag.** 2025 committed $26 million and disbursed $11 million — commitments are not cash in a grantee wallet.

## Further Reading

- [Uniswap Foundation — About](https://www.uniswapfoundation.org/about)
- [Uniswap Foundation — Grants portfolio](https://www.uniswapfoundation.org/grants)
- [Uniswap Foundation — FAQs](https://www.uniswapfoundation.org/faqs)
- [Get Funded — Uniswap builder docs](https://docs.uniswap.org/builder-support/get-funded)
- [Grantee toolkit](https://www.uniswapfoundation.org/grantee-toolkit)
- [FY2025 financials (governance forum, 31 Mar 2026)](https://gov.uniswap.org/t/uniswap-foundation-summary-fy-2025-financials/26068)
- [UNIfication: Uniswap's Next Era — Walsh & Ng, 10 Nov 2025](https://www.uniswapfoundation.org/blog/unification)
- [Grant Funding at the Uniswap Foundation (strategy shift to $250k+)](https://paragraph.com/@uniswap-foundation/part-one-of-series-grant-funding-at-the-uniswap-foundation)
