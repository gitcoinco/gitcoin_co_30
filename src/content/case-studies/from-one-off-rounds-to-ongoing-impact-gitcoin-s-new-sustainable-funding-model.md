---
id: '1778176026419'
slug: from-one-off-rounds-to-ongoing-impact-gitcoin-s-new-sustainable-funding-model
name: "From One-Off Rounds to Ongoing Impact: Gitcoin's New Sustainable Funding Model"
shortDescription: "Gitcoin deploys treasury into Octant v2 vaults, funding grants from yield while preserving principal."
banner: /content-images/case-studies/from-one-off-rounds-to-ongoing-impact-gitcoin-s-new-sustainable-funding-model/banner.png
featured: true
tags:

lastUpdated: '2026-05-07'
authors:
  - "Gitcoin Team"
relatedMechanisms:

relatedApps:
  - octant
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

We're excited to share that Gitcoin has implemented the governance proposal to deploy treasury assets into an [Octant v2 yield-donating vault](https://octant.build/en), routing the generated yield to fund domain-specific funding rounds. This is a meaningful shift in how Gitcoin thinks about matching capital and we think it's worth walking you through what it means, how it works, and why we're excited about it.

## A new kind of funding flywheel

Gitcoin has always depended on the generosity of the community across donors, sponsors, and matching pool contributors who showed up each grant round. That model has worked remarkably well. But it has a structural fragility: it requires fresh capital every cycle.

Yield-powered matching is a different idea. Instead of spending down principal, Gitcoin deploys treasury assets into a vault that generates yield through established DeFi protocols. Only the yield gets routed to matching funds. The principal stays intact, fully under Gitcoin's custody, withdrawable at any time.

The result is a funding source that doesn't deplete and compounds in impact over time. Octant and Gitcoin are joining hands to make this a reality.

## How the vaults work

Octant v2 vaults are built on the [ERC-4626 standard](https://eips.ethereum.org/EIPS/eip-4626) and follow [Yearn v3 architecture](https://docs.yearn.fi/), adapted with a critical twist: instead of returning yield to depositors, all realized yield is automatically routed to a designated allocation address, in this case, the Gitcoin matching pool.

Here's the simple version:

**1. Deposit** — Gitcoin deploys treasury USDC into the vault.  
**2. Earn** — The vault deploys assets into a DeFi yield strategy (Morpho's Steakhouse USDC).  
**3. Route** — Realized yield flows automatically to the Gitcoin matching pool.  
**4. Preserve** — Principal never moves. It stays in Gitcoin's custody and can be withdrawn at any time.

Octant doesn't generate yield itself, it's a coordination and routing layer. The underlying strategies are selected based on Gitcoin's own risk tolerance, and the [vault framework has been audited by Spearbit](https://github.com/golemfoundation/octant-v2-core/tree/develop/audits).

For a deeper technical walkthrough, [Octant's full vault explainer is available here](https://docs.v2.octant.build/docs/capital-providers).

## The structure of this pilot

Here's the detailed set up of the vault:

- **Gitcoin deploys $1M** from gitcoin.eth into an Octant v2 vault.  
- **Octant matches with $1M** into their own vault, sending yield to the same address — bringing total deployed capital to **$2M**.  
- At ~4.5% APY, that translates to roughly **$32,000 per quarter** in accumulated yield flowing into matching.  
- After a 4–6 month pilot, a second tranche of up to $1M (also matched by Octant) will be considered.

The campaigns funded by this yield will carry Gitcoin × Octant co-branding, and Gitcoin governance retains full authority over all allocation decisions. Octant is a co-design partner, not a gatekeeper.

## Why this works for funding campaigns

The Gitcoin–Octant relationship isn't new. We've run [quadratic funding rounds together](https://discuss.octant.app/t/octant-gitcoin-qf-round-results/525), co-curated cohorts, and shared a long-standing commitment to building sustainable funding infrastructure for Ethereum's builder ecosystem. This vault pilot is a natural extension of that collaboration moving from episodic co-grants to structural, yield-powered matching.

Octant's v2 infrastructure was designed precisely for this kind of use case. As described in the [vault overview](https://x.com/OctantApp/status/1945897680732884998), the goal is to transform idle capital into lasting growth, connecting yield generation directly to ecosystem funding, without touching principal or waiting on governance proposals to release each tranche.

Other DAOs are exploring similar paths. Shutter Network's announcement has deployed $1.2M USDC into an Octant vault is one example.

## What success looks like

The [governance proposal](https://gov.gitcoin.co/t/passed-gitcoin-x-octant-yield-powered-matching-pilot/25065) sets clear, honest success criteria for this pilot:

- Principal is preserved — no loss.  
- Yield is successfully harvested and used for matching and beyond.  
- Operational processes (deployment, harvesting, withdrawal) work as expected.  
- Gitcoin governance can clearly assess whether yield-powered matching is worth scaling.

Clear failure signals are also named: loss of principal, excessive operational overhead, or yield that doesn't justify the complexity.

## What's next

As the vault accumulates yield and funds the first campaign, Gitcoin governance will assess the results and decide whether to continue, scale, or adjust the model.

We'll keep the community informed as deployment and harvesting milestones unfold. In the meantime, you can read the [full passed proposal here](https://gov.gitcoin.co/t/passed-gitcoin-x-octant-yield-powered-matching-pilot/25065) and explore [Octant v2's vault documentation](https://docs.v2.octant.build/) to go deeper on the infrastructure.

*Questions or feedback? Join the conversation on the [Gitcoin governance forum](https://gov.gitcoin.co/t/passed-gitcoin-x-octant-yield-powered-matching-pilot/25065).*


### Authors

<!-- One author per line. Format: Name  or  Name | https://social.url -->  
Gitcoin Team
