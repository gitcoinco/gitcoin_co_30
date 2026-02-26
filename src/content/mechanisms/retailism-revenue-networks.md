---
id: '1740500000003'
slug: retailism-revenue-networks
name: "Retailism / Revenue Networks"
shortDescription: "A funding mechanism where autonomous, immutable treasuries tokenize revenue and programmatically redistribute wealth from newer participants to elder ones — treating investors and customers as alike."
tags:
  - autonomous
  - tokenization
  - revenue
lastUpdated: '2026-02-25'
relatedMechanisms:
  - token-streaming
relatedApps:
  - revnets
  - juicebox
relatedCaseStudies: []
relatedResearch:
  - revnets-retailism-autonomous-public-goods-funding
relatedCampaigns: []
banner: /content-images/mechanisms/retailism-revenue-networks/banner.png
---

**Retailism** is an economic framework where wealth is exchanged programmatically over time from newer participants to elder ones, and where investors and customers are treated as alike participants. Conceived by Jango (jango.eth), the creator of Juicebox Protocol, Retailism is implemented through **Revenue Networks (Revnets)** — autonomous, immutable smart contract treasuries that tokenize revenue and enforce deterministic economic rules without governance or human intervention.

## How It Works

Retailism rejects the traditional distinction between investors and customers. On the internet, investing and consuming are intertwined — the person who pays for a product and the person who funds its development are often the same. Retailism encodes this insight into smart contracts that treat all participants equally under transparent, unchangeable rules.

1. **A project deploys a Revnet** with four immutable properties: a premint (initial token allocation), an entry curve (price ceiling that rises over time), an exit curve (price floor with configurable exit tax), and an optional boost period (temporary token split to fund early development).

2. **Anyone can pay ETH into the Revnet** and receive tokens. The price to mint new tokens increases at a predetermined rate and frequency (e.g., 1% more expensive every 7 days), rewarding earlier participants with lower entry costs.

3. **Anyone can exit by destroying tokens** to reclaim ETH from the treasury. A configurable exit tax means departing holders receive less than the full proportional share — the remainder stays in the treasury, raising the price floor for everyone who stays.

4. **A Uniswap liquidity pool forms**, and tokens trade freely between the price ceiling and price floor. Arbitrage keeps the market price within this band: if the price hits the ceiling, people mint from the treasury and sell; if it hits the floor, people buy from the market and redeem.

5. **The price floor rises over time** as more participants enter and exit taxes accumulate. This creates an "up-only" floor trajectory — the most any participant can lose is the gap between their purchase price and the current floor, and that gap shrinks over time.

6. **No governance is needed or possible**. All rules are locked at deployment. The smart contracts have no owner and will function as long as the blockchain exists.

## Advantages

- **Rug-proof by design**: Immutable rules mean no owner, team, or governance body can change parameters or drain funds after deployment
- **Self-sustaining**: No recurring grant applications, fundraises, or donor dependency — revenue flows autonomously as users participate
- **Aligned incentives**: Early supporters benefit from lower entry prices; exit taxes ensure departing participants strengthen the network for those who remain
- **Deterministic trajectories**: All Revnets with identical parameters follow identical economic paths, making outcomes predictable and modelable
- **No rent-seeking intermediaries**: The mechanism runs entirely on smart contracts with no fiduciary or platform taking a cut (beyond the base Juicebox protocol fee)
- **Composable**: Tokens are ERC-20 and ERC20Votes compatible, enabling integration with DEXes, governance platforms, and DeFi

## Limitations

- **Immutability is a double edge**: If parameters are set poorly at deployment, they cannot be corrected — the Revnet is stuck with its configuration forever
- **Cold start problem**: A Revnet needs initial participants to build treasury value; projects without existing audiences may struggle to attract early capital
- **Exit tax friction**: While exit taxes strengthen the network, they also reduce individual liquidity and may deter participation from risk-averse users
- **Design sensitivity**: Rapid price ceiling increases can cause liquidity issues; large premints or boosts may feel unfair and discourage support
- **No accountability mechanism**: Unlike milestone-based or retroactive funding, there is no way to condition funding on delivered outcomes — the treasury operates regardless of project performance
- **Unaudited contracts**: As of early 2026, the Juicebox V4 contracts powering Revnets have not undergone formal security audits

## Best Used When

- A project wants **self-sustaining funding** without ongoing grant dependency or governance overhead
- The project has a **clear user base** that will continuously pay into the treasury (open source tools, protocols, platforms)
- Founders want to **credibly commit** to not rugging — immutability provides stronger guarantees than any multisig or governance structure
- The goal is to **align investors, users, and contributors** under a single economic framework rather than maintaining separate fundraising and revenue tracks
- A community wants to **fairly launch a token** with transparent, predictable economics and no insider advantages beyond a defined premint/boost

## Examples and Use Cases

### Open Source Software Funding
An open source project deploys a Revnet with a modest premint for initial development and a boost period directing 20% of minted tokens to the core team for the first year. Users who rely on the software pay into the Revnet, receiving tokens that appreciate as the project grows. The team is funded without grants, and users hold real economic stakes in the project's success.

### Protocol Fee Distribution
The $NANA token — the first Juicebox V4 project — is a Revnet that receives protocol fees from all V4 projects. This creates an autonomous revenue-sharing mechanism: as Juicebox V4 usage grows, $NANA's treasury grows, and its price floor rises. Protocol contributors who hold $NANA benefit directly from ecosystem growth.

### Community-Driven Creator Platforms
The Banny Network ($BAN) uses a Croptop-integrated Revnet where users mint NFTs across Ethereum, Arbitrum, Base, and OP Mainnet. Every NFT mint funds the underlying Revnet, and buyers receive $BAN tokens. Creators benefit from distribution while the community benefits from token appreciation — no platform intermediary required.

## Further Reading

- [Retailism Essay by Jango](https://jango.eth.limo/9E01E72C-6028-48B7-AD04-F25393307132/)
- [Retailism for Devs, Investors, and Customers](https://jango.eth.limo/3EB05292-0376-4B7D-AFCF-042B70673C3D/)
- [Modeling Retailism](https://blog.revnet.app/post/modeling/)
- [Revnet Simulator](https://sim.revnet.app/about.html)
- [Revnet Blog FAQ](https://blog.revnet.app/faq/)
- [Revnet Core GitHub](https://github.com/rev-net/revnet-core)
