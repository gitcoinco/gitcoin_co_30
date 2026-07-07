---
id: 'poidh'
slug: 'poidh'
name: 'poidh'
shortDescription: 'A permissionless bounty protocol where anyone can post a bounty, claim it with proof, and let the community vote on-chain to release funds.'
description: |
  poidh ("pics or it didn't happen") is a permissionless, on-chain bounty protocol
  for coordinating small-scale funding around concrete, verifiable tasks. Instead of
  relying on centralized escrow or off-chain trust, poidh uses smart contracts to
  hold bounty funds and a simple claim-and-vote mechanism to decide who gets paid.

  ## Protocol Mechanics

  poidh's core loop has four steps, all enforced by smart contracts:

  1. **Bounty creation** — Anyone can open a bounty by depositing ETH (or an
     ERC-20 on supported chains) into a bounty contract along with a title and
     description of the task. The funds are locked in the contract itself, not
     held by poidh or any admin, so the bounty poster cannot unilaterally pull
     funds back once claims start coming in.
  2. **Claim submission** — Anyone can submit a claim against an open bounty by
     posting proof of completed work (an image, link, or other evidence attached
     on-chain via metadata). Multiple competing claims can be submitted against
     the same bounty.
  3. **Voting / acceptance** — For solo bounties, the original poster reviews
     claims and accepts the one that satisfies the bounty. For "open" or
     multiplayer bounties, poidh supports on-chain voting where participants who
     contributed to the bounty pool (or hold a stake in the outcome) vote to
     accept a claim, removing the single point of failure of one poster deciding
     unilaterally.
  4. **Fund release** — Once a claim is accepted (by the poster or by vote), the
     smart contract atomically transfers the locked bounty funds to the claimant's
     address. There is no separate withdrawal step or off-chain settlement —
     acceptance and payout happen in the same transaction flow.

  This design means poidh needs no custodian, no dispute-resolution committee, and
  no off-chain escrow service. The trust model is entirely: funds are locked in a
  contract, and only a valid claim + acceptance event can move them.

  ## Use Cases

  - **Micro-bounties for builders** — Small, well-scoped dev tasks (fix a bug, ship
    a feature, write a script) posted with a fixed reward and paid out the moment
    a submitted PR or proof is accepted.
  - **Community challenges** — "Best meme," "best clip," or "first person to do X"
    style bounties where proof is a screenshot or link, and the crowd or poster
    picks a winner.
  - **Crowdfunded group bounties** — Multiple people chip into the same bounty
    (e.g. "$500 to whoever builds a poidh explorer") and collectively vote on
    which claim satisfies the ask, spreading both funding and decision-making
    across contributors.
  - **Local/IRL tasks** — Because proof can be a photo ("pics or it didn't
    happen"), poidh has been used for real-world asks — cleanups, small errands,
    physical deliverables — where a picture is sufficient verification.
  - **Grassroots grants** — Small communities and DAOs use poidh as a lightweight
    alternative to a full grants program when they want to fund a specific,
    narrowly-scoped outcome without standing up review committees or multi-week
    application processes.

  ## Multi-Chain Deployment

  poidh is deployed across multiple EVM chains, and bounty/claim state is scoped
  independently per chain rather than being bridged or aggregated:

  - **Base** — Primary deployment, benefiting from low fees and deep liquidity for
    ETH-denominated bounties.
  - **Degen Chain** — Deployment tailored to the Degen community, allowing bounties
    to be posted and paid in DEGEN, tapping into an existing tipping/rewards culture.
  - **Arbitrum** — Deployment for users who prefer Arbitrum's ecosystem and existing
    liquidity.

  Each chain runs its own instance of the bounty and claim contracts — a bounty
  created on Base is entirely separate from one created on Degen or Arbitrum, with
  its own funds, claims, and vote state. This lets poidh meet users where their
  assets and communities already are, rather than forcing everyone onto a single
  chain or requiring bridging to participate. The frontend lets users switch
  networks and interact with the correct chain-specific contract set, so the UX
  stays consistent even though the underlying bounty pools never mix across chains.
tags:
  - 'bounties'
  - 'public goods'
  - 'on-chain coordination'
  - 'multi-chain'
  - 'base'
  - 'arbitrum'
  - 'degen'
lastUpdated: '2025-06-01'
featured: false
relatedMechanisms:
  - 'quadratic-funding'
---
