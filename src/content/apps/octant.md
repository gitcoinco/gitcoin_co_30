---
id: '1772308124481'
slug: octant
name: "Octant"
shortDescription: "Yield-funded public goods platform: lock community tokens to accrue WETH, then vote in quadratic funding rounds on a separate app."
logo: /content-images/apps/octant/logo.png
tags:
  - public-goods
  - quadratic
  - grants
lastUpdated: '2026-09-09'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - protocol-guild
  - gitcoin-grants-stack
relatedCaseStudies:
  - from-one-off-rounds-to-ongoing-impact-gitcoin-s-new-sustainable-funding-model
relatedResearch:

relatedCampaigns:

banner: /content-images/apps/octant/banner.png
---

**Octant** is a public goods funding stack from the Golem Foundation. It launched on Ethereum mainnet in August 2023 as a 90-day GLM-lock cycle (v1). In 2026 it moved to **Octant v2**: locking and rewards live in one app, funding rounds in another, and matching uses Proper Quadratic Funding (pQF) on new contracts.

This directory page was last written on 2026-02-28, while Epoch 11 — the final v1 allocation window — was still open. It still described a single 90-day app, “eight allocation windows,” and a 2,340 ETH lifetime figure as if that were the live product. Those v1 facts belong in the archive, not in the current product description.

## What This Platform Does

Octant turns staking and DeFi yield into recurring, community-directed grants without spending down the principal that generates the yield.

In practice, it enables:

* **GLM (and other community-token) holders** to lock tokens non-custodially, accrue WETH, and either claim it or commit it as voting power
* **Anyone with WETH** to enter a round without a prior lock, at the cost of a protocol-defined burn
* **Public goods projects** to receive direct contributions plus a quadratic match, with the match **not guaranteed** and not necessarily the full advertised pool
* **Capital providers** (Golem Foundation, and others including Gitcoin’s treasury vault) to route yield into rounds while keeping principal

v1 used a claim-or-donate choice at the end of each 90-day epoch. v2 splits that into continuous reward accrual and discrete voting rounds.

## Features

Octant v2 is two applications plus an archive of v1:

| App | Role |
| --- | --- |
| [glm.octant.app](https://glm.octant.app) / [octant.app](https://octant.app) | Lock community tokens, accrue and claim WETH |
| [epoch.octant.app](https://epoch.octant.app) | Create and vote in funding rounds |
| [v1.octant.app](https://v1.octant.app) | Legacy v1 UI |

v2 rewards began accruing on **1 April 2026**. Epoch 11 (18 Feb–4 Mar 2026) was the last v1 window; it sent donations to Protocol Guild and ran **without** Golem matching so matching capital could move to v2. Epoch 12 was the first full round on the v2 voting app and contracts. Octant’s blog (11 Aug 2026) announced Epoch 13 as a privacy-themed round with a **100 ETH** matching pool.

### Core Components

* **Non-custodial lock:** On the Golem Foundation instance, locking at least **100 GLM** accrues WETH. Tokens can be unlocked at any time. Accrual is shown over rolling **30-day** reward periods, not the old 90-day epoch. v2 accrued rewards do not expire and can be used in any compatible round.
* **Two participation paths (operator-configured):** **Accrued Rewards** — 100% of the committed WETH becomes voting power. **Wallet WETH** — half becomes voting power; the other half is swapped to the round’s burn token and burned. You pick one path per round and cannot switch. The contribution **amount** is set once on-chain for that round; only the split across projects can change.
* **Proper QF matching:** Direct contributions are always kept. The matching pool is an **upper bound**. If quadratic demand is below the pool, unused match returns to the round creator; if demand exceeds it, every project’s subsidy is scaled by `alpha`. A project with a single supporter gets **no** match. App estimates are projections and can fall below the burned amount.
* **Voting UX:** Signup is one on-chain transaction; later votes and revotes are gasless EIP-712 messages to Octant’s sequencer. Simulation is required before submit. In Epoch 12, ballots were **public** — the ZK proof verifies the tally, it does not hide addresses or choices.

### What changed from the previous profile

* Not a single 90-day “claim or donate” app.
* Not “eight windows” — v1 continued through Epoch 11, then v2 rounds.
* Lifetime 2,340 ETH / 1,357 ETH claimed / 80 projects was a v1-era snapshot, not a current official total (this update does not invent a replacement total).
* Matching is pQF with an explicit unused-pool revert, not “the matched pool is always paid out.”
* Gitcoin itself now uses Octant v2 yield-donating vaults for matching capital (see the related case study).

## Use Cases

### GLM holders accruing WETH

Lock ≥100 GLM at glm.octant.app, claim WETH or allocate it in a live round. Reducing the lock can cut future accrual. Safe multisig wallets can use the locking app as a Safe App.

### Voters without GLM

Wallet WETH lets someone enter epoch.octant.app without a lock. The 50% burn is the price of that path; matching is still not guaranteed.

### Projects in themed rounds

v1 funded names such as Protocol Guild, Gitcoin, Giveth, Drips, rotki, and Open Source Observer. v2 rounds are operator-scheduled with a published matching method and project set. Epoch 13 was framed as privacy infrastructure.

### Treasuries that want yield, not spend-down

Octant v2 vaults (ERC-4626 / Yearn v3 style) can send realized yield to an allocation address while the depositor keeps principal. Gitcoin’s May 2026 case study is this directory’s own example.

## Further Reading

* [Getting started with Octant v2](https://docs.octant.app/docs/users/getting-started/)
* [Participating in a funding round](https://docs.octant.app/docs/users/octant-voting-app/participating-in-a-funding-round/)
* [Epoch 11 and migration to v2](https://v1.docs.octant.app/en-EN/epoch11-and-migration-to-v2.html)
* [Gitcoin: From One-Off Rounds to Ongoing Impact](/case-studies/from-one-off-rounds-to-ongoing-impact-gitcoin-s-new-sustainable-funding-model)
* [Octant GitHub](https://github.com/golemfoundation/octant)
