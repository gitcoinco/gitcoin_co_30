---
id: '1741171219'
slug: donation-mining
name: "Donation Mining"
shortDescription: "Rewarding donors with tokens for contributing to public goods — creating dual incentives where contributors receive both impact satisfaction and economic upside."
tags:
  - public goods
  - incentive
  - token-engineering
lastUpdated: '2026-03-05'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - impact-certificates-hypercerts
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch:
  - dopamine-driven-web3
  - exploring-the-capital-allocation-design-space
relatedCampaigns: []
banner: /content-images/mechanisms/donation-mining/banner.png
---

**Donation Mining** is a mechanism that rewards contributors to public goods with tokens, creating dual incentives — donors support projects they care about while simultaneously earning tokens that may appreciate in value. The term draws an analogy to proof-of-work mining: instead of expending compute power, participants "mine" by donating to public goods.

## How It Works

1. **A token reward pool is established** — a protocol or DAO allocates tokens for distribution to donors
2. **Donors contribute to eligible projects** — through grants rounds, direct donations, or other channels
3. **Contributions are verified** — onchain or through attestation systems
4. **Tokens are distributed** — proportional to donation amounts, sometimes with additional weighting (quadratic, reputation-based, etc.)
5. **Donors receive dual value** — the public good they funded plus tokens with potential future value

## Advantages

- Bootstraps public goods funding by adding financial incentives to altruistic motivation
- Creates a positive feedback loop — token value grows as the ecosystem of funded projects grows
- Can attract participants who wouldn't donate purely for altruistic reasons
- Generates verifiable onchain records of public goods contributions

## Limitations

- Can attract mercenary donors who game the system for token rewards without genuine support
- Token rewards may attract Sybil attacks — fake identities to multiply rewards
- If token value declines, the incentive collapses and may leave funded projects without ongoing support
- Blurs the line between donation and investment, raising regulatory questions
- Risk of creating speculative bubbles around donation activity

## Best Used When

- Bootstrapping participation in a new public goods funding ecosystem
- The community wants to align financial incentives with prosocial behavior
- Sybil resistance mechanisms are in place to prevent gaming
- Token rewards are designed for long-term alignment rather than short-term extraction

## Examples and Use Cases

**Gitcoin** has explored donation mining through GTC token distributions to past donors, rewarding those who contributed to grants rounds.

**Optimism's RetroPGF** functions as a form of retroactive donation mining — projects that received community support may later receive OP token rewards.

**Various DeFi protocols** have used similar mechanics where providing liquidity to public goods or commons-oriented pools earns governance tokens.
