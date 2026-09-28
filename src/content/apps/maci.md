---
id: '1789681800000'
slug: maci
name: "MACI"
shortDescription: "Private on-chain voting infrastructure that hides individual ballots and makes vote-buying hard to prove."
logo: /content-images/apps/maci/logo.png
tags:
  - quadratic
  - privacy
  - voting
  - public-goods
lastUpdated: '2026-09-17'
authors:
  - lordjames
relatedMechanisms:
  - quadratic-funding
  - quadratic-voting
relatedApps:
  - giveth
  - gitcoin-grants-stack
  - allo-protocol
relatedCaseStudies:
  - gg24-privacy-round-retrospective
  - gg24-first-funding-round-of-gitcoin-3-0
relatedResearch: []
relatedCampaigns:
  - gitcoin-grants-24-gg24
banner: /content-images/apps/maci/banner.png
---

**Minimal Anti-Collusion Infrastructure (MACI)** is an Ethereum public good for private on-chain voting. It encrypts each ballot, tallies off-chain, and posts a zk-SNARK so anyone can check that the published result matches the set of on-chain messages — without learning how any one person voted.

The design target is the same problem a secret ballot solves in paper elections: **bribery and collusion**. If a voter cannot prove which option they chose, a briber cannot cheaply verify that the bribe was delivered. Vitalik Buterin sketched this requirement in 2019; Privacy & Scaling Explorations (PSE) implemented it as production software.

MACI sits underneath funding rounds rather than replacing them. Quadratic funding and quadratic voting can run on top of MACI so the matching math still works while individual contributions stay hidden. Gitcoin's GG24 Privacy domain (October–November 2025) used MACI v2 via Privote, in partnership with Web3Privacy Now: 121 applications, 93 accepted projects, 7,427 quadratic votes, 35.41 WETH raised.

## What This Platform Does

MACI is infrastructure for running a vote whose *outcome* is public and whose *ballots* are not.

In practice, it enables:

* **Public-goods funding rounds** to collect quadratic or linear votes without publishing a live leaderboard that invites bandwagon voting or last-minute bribes
* **DAO and ecosystem governance** to hide individual choices while still producing an on-chain, verifiable tally
* **Round operators** to gate eligibility with Ethereum keys, NFTs, tokens, or identity systems such as Gitcoin Passport, then tally without revealing the voter-to-choice map
* **Integrators** (clr.fund historically, Allo-style stacks, Privote) to wrap MACI instead of reinventing encrypted voting
* **Researchers** to study receipt-free voting on Ethereum with a real, iterated codebase rather than a paper protocol

## Features

MACI combines Ethereum smart contracts, ECDH encryption of signed votes, and zk-SNARK proofs of correct processing. Votes land on-chain as ciphertext. A coordinator decrypts them off-chain, applies the state machine, and submits proofs that the tally is consistent with every valid message.

### Core Components

* **On-chain message inbox:** Voters publish encrypted, signed commands. Invalid or duplicate messages are ignored by the circuit rules, not by a silent admin edit. Because messages are on Ethereum, a coordinator cannot quietly drop a vote without breaking the public transcript.
* **Coordinator:** A privileged operator who deploys polls and produces the tally. Collusion resistance holds only if this operator does not leak decrypted ballots. A dishonest coordinator still cannot censor or forge the result: the circuits and contracts reject a tally that does not match the on-chain messages.
* **zk-SNARK tally:** Vote counting happens off-chain for cost; a proof is verified on-chain so observers can check correctness without seeing ballots.
* **Key-change / overwrite:** A voter can publish a later message that replaces an earlier one. That is how MACI approximates receipt-freeness: showing someone an old encrypted vote does not prove it was the one that counted.
* **Voting modes:** Quadratic and non-quadratic. Funding rounds typically use the quadratic path so MACI can sit under QF without changing the matching formula.
* **Eligibility hooks:** The protocol assumes one legitimate voter per Ethereum key and lets the application layer add gatekeepers (ERC-20, ERC-721, Gitcoin Passport, custom allowlists).

### Platform Capabilities

* **Privacy of ballots:** Outsiders should not learn individual choices. The coordinator *can* decrypt; this is the main trust assumption, documented by PSE and by the 2026 State of Private Voting review.
* **Collusion resistance (conditional):** Bribes are harder because a voter cannot produce a convincing receipt for a third party, unless the coordinator colludes with the briber.
* **Uncensorability and correctness:** Inherited from Ethereum plus the circuits. The coordinator cannot pretend a valid message was never submitted.
* **Composable with QF:** GG24's Privacy round combined MACI private voting, quadratic funding, and Human Passport sybil resistance.
* **Open source:** Packages (circuits, contracts, CLI, SDK, coordinator, relayer) have been MIT-licensed. Documentation: https://maci.pse.dev/

### Limitations (fair accounting)

* **Trusted coordinator.** Individual ballots are visible to the operator. PSE's own docs and the 2026 private-voting survey both flag this as the primary shortcoming. Long-term designs point at MPC to split that role; that is not what shipped in GG24.
* **Version gap.** GG24 ran MACI v2. The Privacy round retrospective explicitly recommended moving to MACI v3 and a newer Privote frontend after voters hit submission and UX failures. Docs in September 2026 still describe v3.x as current.
* **Operational fragility.** The same retrospective recorded last-minute contract redeploys, duplicate applications, and donation-processing bugs. Anti-collusion math does not cancel deployment risk.
* **Repo status.** The long-running GitHub repo https://github.com/privacy-ethereum/maci was archived on 19 August 2026. The docs site remained up as of 17 September 2026; integrators should confirm which org is the live source of truth before depending on it.
* **Complexity and cost.** Proof generation and setup overhead are real. MACI is a poor fit for casual polls where a snapshot vote is enough.
* **Identity is external.** One-person-one-vote is only as strong as the gatekeeper. Passport, NFTs, and token holdings all have known sybil and plutocracy tradeoffs.

## Use Cases

### Quadratic funding rounds that should not leak a live leaderboard

QF matching rewards breadth of support. A public running tally lets whales and brigades copy whatever is winning. Encrypting ballots until the round closes (GG24 Privacy via Privote) is the reason MACI shows up in Gitcoin's stack rather than only in academic voting papers.

### High-stakes governance where vote-buying is plausible

When a poll moves real treasury or matching capital, proving how you voted becomes an asset a briber can buy. Receipt-freeness is the product. It is weaker than a fully decentralized secret ballot, but stronger than a public ERC-20 vote.

### Protocol integrations (Allo, Privote, historical clr.fund)

MACI is a library, not a consumer app. Funding UIs and round operators embed it so applicants never have to run proof generation themselves.

### Research and standards for private voting on Ethereum

PSE positioned MACI as reusable infrastructure. Independent 2026 surveys still treat it as one of the few production-iterated private-voting designs, while criticizing coordinator centralization and integrator UX — both of which belong in any honest profile.

## Further Reading

* [What is MACI? — official docs (v3.x)](https://maci.pse.dev/docs/introduction)
* [MACI homepage](https://maci.pse.dev/)
* [GG24 Privacy Round Retrospective — Gitcoin](https://gitcoin.co/case-studies/gg24-privacy-round-retrospective)
* [GG24 — The First Funding Round of Gitcoin 3.0](https://gitcoin.co/case-studies/gg24-first-funding-round-of-gitcoin-3-0)
* [Vitalik Buterin, Gitcoin Grants Round 9 retrospective (2021)](https://vitalik.eth.limo/general/2021/04/02/round9.html)
* [State of Private Voting 2026 — PSE](https://pse.dev/articles/state-of-private-voting-2026/state-of-private-voting-2026-v2.pdf)
* [GitHub (archived 19 Aug 2026)](https://github.com/privacy-ethereum/maci)
