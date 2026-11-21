---
id: '1779353916308'
slug: gitcoin-passport
name: "Gitcoin Passport"
shortDescription: "Decentralized identity verification platform for Web3 users to prevent bot abuse and establish trust."
logo: /content-images/apps/gitcoin-passport/logo.png
tags:
  - "identity"
  - "web3"
  - "verification"
  - "gitcoin"
  - "passport"
lastUpdated: '2026-05-21'
relatedMechanisms:
  - sybil-resistance
  - quadratic-funding
relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
banner: /content-images/apps/gitcoin-passport/banner.png
---

**Gitcoin Passport** is a decentralized identity verification platform designed to help users prove their uniqueness and credibility in Web3. It allows users to collect verifiable credentials called "stamps" from various platforms such as social media accounts, developer profiles, and wallet activity.

These stamps contribute to a Passport score, which is used by Web3 projects to determine eligibility for grants, airdrops, governance participation, and bounty programs.

## What This App Does

Gitcoin Passport provides decentralized identity verification and Sybil resistance infrastructure for the Web3 ecosystem.

In practice, it enables:

- **Users** to collect stamps, verify their identity, and increase their Passport score to unlock grants and rewards.
- **Projects and DAOs** to integrate personhood verification to prevent bot rings, Sybil attacks, and multi-accounting.
- **Grants platforms** (like Gitcoin Grants Stack) to verify quadratic funding eligibility and ensure fair distribution.
- **Developers** to query onchain or offchain Passport scores to protect their smart contracts and applications.

## Features

### Sybil Resistance
Gitcoin Passport's primary feature is protecting platforms from bot abuse and duplicate accounts. By aggregating multiple credentials, it makes it extremely expensive for a single attacker to simulate multiple valid human identities.

### Passport Score
Each verified stamp adds to a user's Passport score (on a 100-point scale). Platforms can set a threshold (typically around 20 points) to define who is considered a "trusted human user" for allocations or votes.

### Diverse Stamp Selection
Users can collect stamps by verifying ownership/activity across a wide range of platforms:
- **Web2:** Google, GitHub, Twitter/X, Discord, Facebook, LinkedIn.
- **Web3:** Ethereum transactions, ENS names, Lens profiles, Gitcoin Grant contributions, Civic, Holonym, Gnosis Safe.

### Onchain and Offchain Scores
Passport supports both offchain scores (stored securely via decentralized data networks) and onchain passports (minted as soulbound tokens or verifiable credentials), offering maximum flexibility for dApps.

## Use Cases

### Quadratic Funding Protection
Ensuring that matching pools are divided fairly based on unique community preferences, preventing malicious actors from splitting donations to extract oversized shares of matching funds.

### Governance Curation
Enhancing DAO voting integrity by weighting votes or restricting proposals to users who meet minimum personhood credentials.

### Sybil-Resistant Airdrops
Ensuring token distributions go to real community members and developers rather than automated bots.

## Further Reading

- [**Gitcoin Passport** -- passport.gitcoin.co](https://passport.gitcoin.co)
- [**Gitcoin Passport Documentation** -- Gitcoin Docs](https://docs.passport.gitcoin.co)
- [**Understanding Sybil Resistance in Web3** -- Gitcoin Blog](https://www.gitcoin.co/blog/sybil-resistance)
