---
id: '1741171217'
slug: molochdao
name: "MolochDAO"
shortDescription: "Minimal viable DAO framework with rage-quit capability — pioneered collective funding for Ethereum public goods through a simple propose/vote/ragequit pattern."
tags:
  - DAOs
  - public goods
  - governance
  - Ethereum
lastUpdated: '2026-03-05'
relatedMechanisms:
  - multisig-treasury
  - direct-grants
  - guilds
relatedApps: []
relatedCaseStudies: []
relatedResearch:
  - 69-trends-in-2025-era-dao-design
  - the-dao-of-daos
  - from-tribes-to-llcs-to-daos
relatedCampaigns: []
banner: /content-images/mechanisms/molochdao/banner.png
---

**MolochDAO** is a minimal viable DAO framework designed for collective funding of public goods. Named after the ancient deity of coordination failure, MolochDAO's key innovation is the *rage quit* mechanism — members who disagree with a funding decision can exit with their proportional share of the treasury before the decision executes, eliminating the need for trust in majority governance.

## How It Works

1. **Members join by tributing assets** — contributing ETH or tokens to the shared treasury in exchange for voting shares
2. **Proposals are submitted** — members propose funding allocations, new member admissions, or other actions
3. **Voting period** — members vote yes/no during a fixed window, with one vote per share
4. **Grace period** — after voting closes, a grace period allows dissenting members to rage quit before the proposal executes
5. **Rage quit** — any member can burn their shares and withdraw their proportional share of the treasury, exiting before an unwanted proposal takes effect
6. **Execution** — if the proposal passes and remaining treasury supports it, funds are disbursed

## Advantages

- Rage quit eliminates the 51% attack problem — minorities can always exit with their fair share
- Minimal attack surface — simple smart contract with few functions
- No token speculation — shares are non-transferable
- Forces genuine consensus — proposals that would trigger mass rage-quit are effectively vetoed by economic pressure
- Pioneered the concept of grant DAOs for public goods

## Limitations

- Slow decision-making due to voting and grace periods
- No delegation or representative voting — every member must participate directly
- Limited to simple proposal/vote patterns — complex governance requires extensions
- Rage quit can drain treasury if contentious proposals are frequent
- Favors wealthy members who can contribute larger tributes

## Best Used When

- A group wants to pool capital for shared goals with strong exit rights
- Trust is limited and members need protection against majority decisions
- The community is small enough for direct participation
- Funding public goods or shared infrastructure is the primary objective

## Examples and Use Cases

**MolochDAO v1** launched in 2019 and distributed over $1M to Ethereum public goods including projects like Tornado Cash, Lodestar, and EthHub. Its success inspired a wave of grant DAOs.

**MolochDAO v2** (via DAOhaus) extended the framework with multi-token treasuries, guild kicks, and loot shares (non-voting economic shares), enabling more complex organizational structures.

**MetaCartel** forked MolochDAO to fund Ethereum application-layer projects, demonstrating the framework's adaptability for different funding mandates.

## Further Reading

- [MolochDAO Whitepaper](https://github.com/MolochVentures/moloch)
- [Slaying Moloch — Ameen Soleimani](https://medium.com/@AmeenSol/moloch-dao-a-simple-yet-unforgiving-dao-b48f00c6cdfa)
