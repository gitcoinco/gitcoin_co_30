---
id: '1740500000002'
slug: revnets
name: "Revnets"
shortDescription: "Fully autonomous, immutable revenue networks that tokenize revenues and fundraises — deployed once, no owner, no governance, no rug pulls."
logo: /content-images/apps/revnets/logo.png
tags:
  - autonomous
  - revenue
  - tokenization
lastUpdated: '2026-02-25'
relatedMechanisms:
  - retailism-revenue-networks
relatedApps:
  - juicebox
relatedCaseStudies: []
relatedResearch:
  - revnets-retailism-autonomous-public-goods-funding
relatedCampaigns: []
---

**Revnets** (Revenue Networks) is a platform for deploying fully autonomous, rule-based, immutable treasuries that share tokenized revenues with their users. Created by Jango (jango.eth) and built on Juicebox V4, Revnets let anyone fairly launch a token for their project, company, or community — backed by a shared treasury that cannot be changed or rugged once deployed.

## What This App Does

1. Deploys autonomous treasuries with immutable rules — no owner, no multisig, no governance can alter parameters after launch
2. Tokenizes revenue: anyone can pay ETH into a Revnet and receive tokens; the price to mint new tokens rises over time (price ceiling)
3. Provides a built-in exit: token holders can destroy tokens to reclaim ETH from the treasury (price floor), with a configurable exit tax
4. Creates self-stabilizing token markets via ceiling/floor/Uniswap pool interaction
5. Supports multi-chain deployment across Ethereum, Arbitrum, Base, and OP Mainnet

## Features

### Core Properties (Set Once at Deployment)
- **Premint**: Tokens minted at deployment for the deployer — used for early development budgets, staking rewards, or airdrops
- **Entry Curve (Price Ceiling)**: The cost to mint new tokens, which increases at a configurable rate and frequency (e.g., 1% more expensive every 7 days)
- **Exit Curve (Price Floor)**: The amount of ETH recoverable by destroying tokens, governed by a configurable exit tax — remaining ETH stays in the Revnet, raising the floor for everyone else
- **Boost Period**: A configurable percentage of newly minted tokens sent to a designated operator wallet for a set duration, funding early development without governance

### Market Dynamics
- Before a market exists, the Revnet mints tokens at the price ceiling
- Once a Uniswap pool forms, tokens trade on the open market between ceiling and floor
- If the pool price hits the ceiling, arbitrageurs mint from treasury and sell to market
- If the pool price hits the floor, arbitrageurs buy from market and redeem from treasury
- This creates a self-stabilizing band with an "up-only" price floor over time

### Token Standard
- ERC-20 compatible (usable on Uniswap and other DEXes)
- ERC20Votes compatible (usable for on-chain governance via Tally)

## Use Cases

### Open Source Project Funding
Open source projects deploy a Revnet once and receive continuous, autonomous funding as users pay in. No grant applications, no recurring fundraises, no governance overhead. The exit tax ensures that even when participants leave, remaining holders benefit from a rising price floor.

### Community Token Launches
Communities can fairly launch tokens with transparent, immutable rules. Early supporters benefit from lower entry prices, and the boost mechanism funds initial development — all without the trust assumptions of traditional token launches.

### Creator Monetization
Via the Croptop integration, creators connect websites to blockchains for easy sales. Anyone can post collectibles onto NFT collections, and every mint funds the underlying Revnet. The $BAN (Banny Network) token demonstrates this model across multiple chains.

### Protocol Revenue Sharing
Protocols can deploy Revnets to share revenue with their users and contributors autonomously. The $NANA token (the first Juicebox V4 project) receives fees from all V4 projects, aligning the protocol's success with its participants.

## Deployed Examples

- **$NANA** (Bananapus): First Juicebox V4 project, receives fees from V4 projects
- **$REV** (Revnet Research Network): Funds development of Revnet tools and resources
- **$BAN** (Banny Network): Earned by minting Banny NFTs across chains via Croptop

## Further Reading

- [Revnet Official Site](https://revnet.eth.limo/)
- [Revnet App](https://www.revnet.app/)
- [Revnet Blog & FAQ](https://blog.revnet.app/faq/)
- [Revnet Simulator](https://sim.revnet.app/about.html)
- [Retailism Essay by Jango](https://jango.eth.limo/9E01E72C-6028-48B7-AD04-F25393307132/)
- [Revnet Core GitHub](https://github.com/rev-net/revnet-core)
