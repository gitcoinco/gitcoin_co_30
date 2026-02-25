---
id: '1740500100015'
slug: bonding-curves
name: "Bonding Curves"
shortDescription: "Algorithmic token pricing mechanisms where a mathematical function governs the relationship between supply and price — enabling continuous, self-regulating token issuance and liquidity."
tags:
  - algorithmic
  - tokenization
  - liquidity
lastUpdated: '2026-02-25'
relatedMechanisms:
  - retailism-revenue-networks
relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

**Bonding Curves** are algorithmic token pricing mechanisms where a mathematical function governs the relationship between token supply and its cost. When someone buys a token, the price goes up; when they sell, the price goes down. This enables continuous, self-regulating token issuance without intermediaries, creating perpetual liquidity for any token.

## How It Works

Bonding Curves replace traditional market-making with deterministic, smart-contract-enforced pricing.

1. **Deploy a bonding curve contract** with a defined pricing formula (linear, exponential, sigmoid, etc.) and backing assets (ETH, stablecoins)
2. **Buyers mint tokens** by sending backing assets to the contract — the curve determines the price based on current supply
3. **Price increases with supply** — each new token costs more than the last, rewarding early participants
4. **Sellers burn tokens** by returning them to the contract — the curve determines the redemption price
5. **Reserve ratio** determines how much of the backing asset is held in reserve vs. distributed

## Advantages

- Creates real-time market mechanisms reflecting actual demand
- Provides early supporter upside potential with shared risk
- Enables organic community ownership development
- Offers continuous price discovery based on genuine belief and usage

## Limitations

- Less suited for fixed-price or grant-based funding models
- Can attract speculation in environments without genuine utility
- Requires sustained user/community engagement to maintain healthy dynamics
- Supply predictability depends on curve design — some curves create volatile price action

## Best Used When

- Token-engineered DAOs want dynamic capital flows tied to genuine usage
- Public goods builders want to create economic alignment between funders and users
- Projects need perpetual liquidity without relying on centralized exchanges
- Communities want to bootstrap shared ownership with transparent, deterministic pricing

## Examples and Use Cases

### Public Goods Token Launch
A public goods project launches a bonding curve selling governance tokens — early backers fund development at lower prices and gain exposure to future appreciation as adoption increases.

### Reputation and Access Tokens
Bonding curve logic manages staking and access rights — the cost to join a community or access a service increases as more participants join, creating natural scarcity.

### Augmented Bonding Curves
Augmented bonding curves add a funding pool that captures a percentage of each purchase — this pool funds the project directly, creating a built-in revenue stream alongside the token market.

## Further Reading

- [Allo Capital — Bonding Curves](https://www.allo.capital/mechanisms/bonding-curves)