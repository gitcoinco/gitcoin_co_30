---
id: '1741171230'
slug: staking-slashing
name: "Staking/Slashing"
shortDescription: "Economic security mechanism where participants lock capital as a guarantee of good behavior — misbehavior triggers automatic penalties, aligning incentives through skin in the game."
tags:
  - consensus
  - security
  - incentive
  - Ethereum
lastUpdated: '2026-03-05'
relatedMechanisms:
  - proof-of-work
  - decentralized-validators
  - crowdstaking
relatedApps: []
relatedCaseStudies: []
relatedResearch:
  - the-networked-firm
  - networks-vs-hierarchies
relatedCampaigns: []
banner: /content-images/mechanisms/staking-slashing/banner.png
---

**Staking/Slashing** is a coordination mechanism where participants lock capital (stake) as a guarantee of honest behavior, with misbehavior triggering automatic penalties (slashing). The mechanism aligns incentives through skin in the game — participants who act in the network's interest earn rewards, while those who act maliciously or negligently lose capital.

## How It Works

1. **Participants lock capital** — validators or participants deposit tokens into a smart contract
2. **Duties are performed** — stakers fulfill their role (validating transactions, providing data, etc.)
3. **Good behavior is rewarded** — honest, reliable participants earn yield on their staked capital
4. **Bad behavior is punished** — protocol violations, double-signing, downtime, or other infractions trigger slashing (partial or total loss of staked capital)
5. **Slashed funds are burned or redistributed** — removed from circulation or directed to a treasury

## Advantages

- Creates strong economic incentives for honest behavior without centralized enforcement
- Quantifiable security — the cost of attacking the network equals the staked capital at risk
- Permissionless participation — anyone with sufficient capital can become a staker
- Self-enforcing — smart contracts execute slashing automatically without human judgment
- Generates yield for participants, attracting capital to secure the network

## Limitations

- Capital-intensive — excludes participants who can't afford minimum stake
- Plutocratic — wealthy stakers have more influence and earn more rewards
- Slashing conditions must be precisely defined — false positives destroy trust
- Capital lockup reduces liquidity and creates opportunity costs
- Can centralize around large staking pools and liquid staking protocols

## Best Used When

- Economic security guarantees are needed for a decentralized network
- Participant behavior must be verifiable onchain or through cryptographic proofs
- The cost of misbehavior should be quantifiable and automatic
- Permissionless participation in network security is desired

## Examples and Use Cases

**Ethereum Proof of Stake** requires validators to stake 32 ETH, with slashing for double-signing or prolonged downtime. This secures hundreds of billions of dollars in value through economic incentives.

**EigenLayer** extends staking/slashing to additional services through restaking — staked ETH secures not just Ethereum consensus but also oracle networks, data availability layers, and other infrastructure.

**Dispute resolution** — Kleros and other decentralized courts use staking/slashing for jurors, ensuring honest adjudication through economic penalties.
