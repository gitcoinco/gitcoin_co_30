---
id: '1741190400004'
slug: percent-for-public-goods
name: "Percent-for-Public-Goods"
shortDescription: "Protocol-level commitment where a fixed percentage of revenue or issuance is automatically directed to public goods funding."
tags:
  - protocol-funding
  - public-goods
  - infrastructure
  - sustainability
lastUpdated: '2026-03-05'
relatedMechanisms:
  - direct-grants
  - retroactive-funding
  - token-streaming
  - retailism-revenue-networks
  - direct-to-contract-incentives
relatedApps:
  - protocol-guild
  - octant
  - optimism-retropgf
  - drips
relatedCaseStudies: []
relatedResearch:
  - state-of-public-goods-funding-2024
relatedCampaigns: []
banner: /content-images/mechanisms/percent-for-public-goods/banner.png
---

**Percent-for-Public-Goods** is a funding mechanism in which a protocol, network, or organization commits a fixed percentage of its revenue, transaction fees, or token issuance to public goods funding on an ongoing, automatic basis. Rather than relying on discretionary grants, one-time donations, or governance votes for each funding decision, the percentage commitment is embedded at the protocol or organizational level, creating a durable and predictable revenue stream for public goods. The allocation of these funds may flow to a specific recipient (like core protocol developers), to a retroactive funding mechanism, or to a community-governed distribution process.

The concept has clear precedent in the physical world: "percent-for-art" programs in cities like New York and Seattle require that a fixed percentage of construction budgets for public buildings be dedicated to public art. Similarly, many countries direct a percentage of tax revenue to specific public goods like education or infrastructure. In the Ethereum ecosystem, the mechanism has been adopted by protocols at multiple layers of the stack — from L2 sequencer revenue to individual validator rewards — establishing a norm that protocols which benefit from shared infrastructure should contribute a percentage back to the commons that sustains them.

## How It Works

1. **Commitment definition:** A protocol, network, or organization defines the percentage of revenue or issuance that will be directed to public goods. This may be encoded in smart contracts (making it enforceable onchain), established through governance votes, or declared as a social commitment backed by reputation. The percentage is typically between 1% and 20%, depending on the revenue source and organizational context.

2. **Revenue source identification:** The mechanism requires a clearly defined revenue stream from which the percentage is drawn. Common sources include L2 sequencer profits, transaction fees (via mechanisms like EIP-6968 Contract Secured Revenue), staking rewards, protocol fees, token issuance, or corporate revenue. The choice of revenue source determines the scale, predictability, and growth trajectory of the funding stream.

3. **Fund collection and custody:** The designated percentage is collected automatically — either through smart contract logic that splits revenue at the protocol level or through periodic transfers governed by a multisig or DAO. Funds are held in a treasury, split contract, or purpose-built funding mechanism pending distribution.

4. **Allocation mechanism:** Collected funds are distributed through one or more allocation mechanisms, which may include retroactive funding rounds, quadratic funding matching pools, direct grants, protocol guild splits, or community governance votes. The allocation mechanism is typically separate from the collection mechanism, allowing communities to experiment with different distribution approaches while maintaining the stable funding commitment.

5. **Transparency and accountability:** Because the percentage commitment is public and often onchain, the community can verify that funds are being collected and distributed as promised. This transparency creates reputational incentives for compliance and allows stakeholders to hold organizations accountable.

## Advantages

- **Predictable and sustainable funding:** Unlike one-time grants or discretionary donations, a percentage commitment generates ongoing revenue that scales with protocol usage. As the protocol grows, public goods funding grows proportionally, creating a self-reinforcing cycle.
- **Reduces free-rider dynamics:** By embedding contribution into the protocol itself, percent-for-public-goods addresses the classic free-rider problem — protocols that benefit from shared infrastructure automatically contribute to its maintenance, rather than relying on individual goodwill.
- **Low governance overhead for collection:** Once established, the percentage commitment requires no repeated governance decisions to collect funds. This reduces the political friction and attention costs associated with discretionary funding approaches.
- **Norm-setting and social pressure:** Visible percentage commitments create positive social pressure within ecosystems. When prominent protocols commit 1% or more to public goods, it establishes an expectation that others should do the same, building a culture of contribution.
- **Composable with other mechanisms:** The percentage commitment is a funding source, not a complete allocation mechanism. It pairs naturally with quadratic funding, retroactive funding, direct grants, or any other distribution method, adding a stable revenue layer beneath existing allocation infrastructure.

## Limitations

- **Percentage selection is arbitrary:** There is no principled method for determining the "right" percentage. Too low and the contribution is negligible; too high and it may make the protocol uncompetitive. The initial percentage often reflects social norms or negotiation rather than rigorous analysis of public goods needs.
- **Revenue volatility:** In crypto, protocol revenue can be highly volatile. A percentage of sequencer fees during a bull market may be substantial, but the same percentage during low-activity periods may produce minimal funding. This creates uncertainty for recipients despite the structural commitment.
- **Capture and misallocation risks:** The funds collected must still be allocated well. Without robust allocation mechanisms, percent-for-public-goods can concentrate resources in the hands of well-connected insiders or fund projects that do not serve the broader public interest.
- **Competitive disadvantage concerns:** Protocols that commit a percentage to public goods may face higher effective costs than competitors who do not, potentially driving users or validators to less contributory alternatives. This creates a collective action problem that requires either strong norms or protocol-level enforcement.
- **Limited to revenue-generating protocols:** The mechanism requires an identifiable revenue stream. Early-stage protocols, non-commercial projects, and infrastructure that generates no direct revenue cannot implement it without external subsidy or token-based funding.

## Best Used When

- A protocol or network generates meaningful, ongoing revenue from transaction fees, sequencer profits, or staking rewards
- The ecosystem has shared infrastructure dependencies that benefit from sustainable, predictable funding
- The community wants to establish a culture of contribution without requiring repeated governance decisions
- Allocation infrastructure (retroactive funding, quadratic funding, grants programs) already exists and needs a stable funding source
- The protocol benefits directly from public goods (core protocol development, security auditing, open-source tooling) and wants to internalize that externality

## Examples and Use Cases

**Optimism (Sequencer Revenue)** represents the largest-scale implementation of percent-for-public-goods in the Ethereum ecosystem. The Optimism Collective committed all sequencer profits to public goods funding, with 20% of the initial OP token supply allocated to the RetroPGF Reserve. Through multiple rounds of Retroactive Public Goods Funding, Optimism has distributed over $100 million to developers, educators, and tooling providers. The model demonstrates that L2 sequencer revenue can serve as a substantial and growing funding source for ecosystem-wide public goods, with surplus protocol revenue allocated to RetroPGF by default.

**Obol Collective (1% for Decentralisation)** directs 1% of staking rewards from Distributed Validator (DV) clusters to ecosystem projects through its Retroactive Funding (RAF) program. The model creates a positive flywheel: as more validators adopt Obol's distributed validator technology, the 1% contribution grows proportionally, funding projects that strengthen Ethereum's consensus layer infrastructure. Major staking operators including Lido and EtherFi have adopted Obol DVs, providing ongoing funding sources. The first RAF round distributed 1 million OBOL tokens to projects that strengthened the decentralized operator ecosystem.

**Protocol Guild** operates a split contract that distributes funds to Ethereum core protocol contributors — the developers who maintain the execution and consensus layer clients, EIPs, testing infrastructure, and other foundational public goods. While Protocol Guild itself is a recipient mechanism rather than a revenue source, it serves as the primary beneficiary for many percent-for-public-goods commitments across the ecosystem. L2s, DeFi protocols, and other projects that depend on Ethereum's core infrastructure direct a percentage of their revenue or token allocations to Protocol Guild's vesting contract as an ongoing contribution to the commons.

**Octant (Golem Foundation)** implements a novel variation in which the Golem Foundation stakes 100,000 ETH and distributes a portion of the staking rewards to the Octant community every 90 days (one epoch). Community members who lock at least 100 GLM tokens gain governance rights over the distribution of these rewards: they can claim a personal share, donate to community-selected public goods projects, or combine both. Donations are matched by Octant, amplifying their impact. This model effectively converts a percentage of staking yield into participatory public goods funding.

**EIP-6968 (Contract Secured Revenue)** proposes a protocol-level implementation of percent-for-public-goods for EVM-based L2s. Under this proposal, a percentage of the base fee per gas (calculated as `base_fee_per_gas * REVENUE_SHARE_QUOTIENT`) would be automatically allocated to the smart contracts executed during each transaction, proportional to gas consumed. This would create an automatic revenue stream for deployed contracts, allowing developers to fund public goods directly from protocol-level fees without requiring any external commitment or social agreement.

## Further Reading

- [**1% for Decentralisation: A Funding Model for Ethereum** — Obol Blog](https://blog.obol.org/1-percent-for-decentralisation/)
- [**Retroactive Public Goods Funding** — Optimism Blog](https://medium.com/ethereum-optimism/retroactive-public-goods-funding-33c9b7d00f0c)
- [**EIP-6968: Contract Secured Revenue on an EVM-based L2** — Ethereum EIPs](https://eips.ethereum.org/EIPS/eip-6968)
- [**How Octant Works** — Octant Docs](https://docs.octant.app/en-EN/how-it-works.html)
- [**Protocol Guild** — protocolguild.com](https://protocol-guild.readthedocs.io/)
- [**Vitalik Buterin on Funding Public Goods** — Protocol Labs Transcription](https://www.protocol.ai/blog/transcription-vitalik-buterin-funding-the-commons/)
