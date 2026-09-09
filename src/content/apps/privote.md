---
id: '1788964500001'
slug: privote
name: "Privote"
shortDescription: "MACI frontend for private on-chain polls and quadratic-funding ballots, used as the voting UI for Gitcoin’s GG24 Privacy round."
logo: /content-images/apps/privote/logo.png
tags:
  - privacy
  - voting
  - quadratic
lastUpdated: '2026-09-09'
relatedMechanisms:
  - quadratic-funding
relatedApps: []
relatedCaseStudies:
  - gg24-privacy-round-retrospective
relatedResearch:
  - quadratic-funding-sybil-resistance
relatedCampaigns:
  - gitcoin-grants-24-gg24
banner: /content-images/apps/privote/banner.png
---

**Privote** is a public web app for creating and running **private on-chain polls** on Ethereum using [MACI](https://maci.pse.dev/) (Minimal Anti-Collusion Infrastructure). It is not a matching pool, a grants explorer, or a new allocation formula. It is the ballot box: encrypt votes, hide the graph, publish a provable tally.

The live site is [privote.live](https://privote.live). Source lives under [PriVote-Project](https://github.com/PriVote-Project) (frontend, contracts, coordinator, a `maci-docker` image, and a fork of PSE’s archived `maci-platform`). Contact on the org profile is `privote.live@gmail.com` / [@0xlord_forever](https://x.com/0xlord_forever).

This directory already has a GG24 Privacy **case study** that says the round used MACI via Privote. It did not have an **app** page for that UI.

## What This Platform Does

Plain Ethereum votes are public transactions. That makes bribery cheap: a buyer can demand a tx hash. MACI encrypts the ballot and lets the voter overwrite it, so a receipt is untrustworthy. Privote wraps that protocol in a poll product with gates in front (Passport, Anon-Aadhaar, NFTs, tokens, and similar).

In practice it lets:

* **Round operators** (Gitcoin domain teams, DAO poll-makers) stand up a private poll with a start/end window and an eligibility rule
* **Voters** cast an encrypted ballot from a browser instead of running MACI CLI
* **Observers** see that a poll exists and, after tally, a public result — not a public vote graph

Fetched 2026-09-09, the homepage “Trending Polls” list still shows **Gitcoin - Privacy**, ended, Passport-gated, **10/14/2025–10/29/2025**, four options. The path is `/polls/dummy-poll-1/`. Treat that slug as a product quirk, not as proof the round was fake: those dates match the GG24 Privacy window in this directory’s retrospective.

## Features

* **MACI ballot box:** votes are encrypted on-chain; tally is proven with zk-SNARKs. Same coordinator model as the protocol: an honest coordinator is required for collusion resistance; a dishonest one can still read ballots and can refuse to publish a tally.
* **Operator-run coordinator:** Privote’s own README says they deploy `maci-docker` on a server so the frontend can “publish votes on-chain directly.” That is a UX win. It is also a centralized coordinator. Do not read “decentralized voting” on the marketing headline as “no operator.”
* **Eligibility plugins, not identity:** Anon-Aadhaar, Gitcoin/Human Passport, NFTs, tokens, Worldcoin-style checks. MACI does not decide who is a unique human; the gate does.
* **Onboarding shortcuts:** the org profile mentions [Porto](https://porto.sh) email/passkey flows so voters are not limited to a seeded wallet. That is product, not a change to MACI’s trust assumptions.

## Limitations

* **Trusted coordinator, in production.** The docker-on-a-server design makes the coordinator a real machine Privote (or the round operator) runs. PSE’s MACI docs already say collusion resistance fails if that party colludes. GG24’s retrospective still recommended “latest Privote frontend and MACI V3” for UX, not because the cryptography was the failure mode.
* **Identity remains the hard part.** Passport and Aadhaar gates sit *in front* of MACI. Sybils with many keys still break QF if the gate is weak.
* **Homepage is a thin SPA.** The Gitcoin Privacy poll is linked as `dummy-poll-1`. Do not scrape that URL for live matching math; use the case study / gov forum numbers.
* **Not a grants stack.** Privote does not hold a matching pool, review applications, or pay grantees. Capital still moved through the GG24 Privacy domain’s own rails (WETH, 35.41 WETH raised per the retrospective).
* **Upstream platform drift.** PSE archived `maci-platform` (read-only as of 2026-08-19) and told operators to fork it. Privote’s fork exists; treat “complete MACI Platform” claims as historical unless you check the live contracts for the poll you care about.

## Use Cases

### Gitcoin GG24 Privacy round (Oct 2025)

The Privacy domain used MACI private voting via Privote, with Human Passport as the gate. Directory numbers from the retrospective: 121 applications, 93 accepted, 7,427 QF votes, 35.41 WETH raised, ~$13k community donations. Operators credited hidden ballots with reducing manipulation; they also listed matching-pool size, last-minute contract redeploys, and frontend UX as what did *not* work.

### Private DAO / community polls

The same UI can run a non-QF poll (yes/no, N options) when the community wants a public result without a public voter graph. Coordinator and gate still apply.

## Further Reading

* [privote.live](https://privote.live)
* [PriVote-Project on GitHub](https://github.com/PriVote-Project)
* [MACI documentation (PSE)](https://maci.pse.dev/docs/introduction)
* [GG24 Privacy Round Retrospective (this directory)](/case-studies/gg24-privacy-round-retrospective)
