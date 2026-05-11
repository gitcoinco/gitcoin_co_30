---
id: '1770997175093'
slug: peter-todd-hash-collision-bounties
name: "Peter Todd's Hash-Collision Bounties"
shortDescription: "How Bitcoin Script funded public cryptographic breakage proofs without relying on an intermediary."
banner: /content-images/case-studies/peter-todd-hash-collision-bounties/banner.jpg
featured: false
tags:
  - "bounty"
  - "mechanism-design"
  - "bitcoin-script"
  - "cryptography"
  - "security-disclosure"
lastUpdated: '2026-05-11'
authors:
  - "GBOYEE"
relatedMechanisms:
  - bounties
  - dominant-assurance-contracts
relatedApps:
relatedCaseStudies:
  - tornado-cash-how-quadratic-funding-sustained-ethereum-s-most-important-privacy-tool
  - coin-center-defending-cryptocurrency-rights-through-community-funded-advocacy
relatedResearch:
  - trust-precedes-coordination
relatedCampaigns:
---

In 2013, Bitcoin developer Peter Todd published a set of onchain bounties for breaking major cryptographic hash functions. The bounties used Bitcoin Script rather than a trusted escrow: anyone who could reveal two different messages with the same digest for a targeted hash function could spend the coins locked to that challenge.

The experiment is a compact example of a crypto-native funding mechanism. It did not fund a research proposal, require a grant committee, or ask a sponsor to judge whether a disclosure was valid. The validation condition was encoded directly into the spending path. If the claimant could satisfy the script, the bounty paid out.

The most famous payout came after the 2017 SHAttered result, when researchers publicly demonstrated a practical SHA-1 collision. A Bitcoin transaction then spent Todd's SHA-1 bounty, claiming roughly 2.48 BTC. The payout proved that a small script-based challenge created years earlier could remain live until the relevant cryptographic event happened.

## The Problem

Cryptographic hash functions underpin digital signatures, content addressing, proof systems, Merkle trees, and many blockchain protocols. When a widely used hash function becomes vulnerable to collisions, ecosystems need clear public evidence, fast disclosure, and incentives for researchers to reveal concrete proofs rather than keep them private.

Traditional bug bounties can help, but they depend on institutional trust:

- A sponsor decides whether the submitted evidence satisfies the bounty.
- Funds may depend on a company, foundation, or escrow agent still being active.
- Researchers must trust that the sponsor will pay after disclosure.
- The public may not be able to independently verify why a payout occurred.

Todd's hash-collision bounties replaced that social adjudication layer with a cryptographic condition. The "judge" was the Bitcoin network's script interpreter.

## How It Worked

The bounties locked bitcoin in scripts that could be spent only by presenting a valid collision for a chosen hash function. Conceptually, the claimant had to provide two distinct byte strings that produced the same hash digest under the target algorithm.

The structure turned a research milestone into a spend condition:

1. **Fund the script.** Coins were sent to addresses representing specific hash-collision challenges.

2. **Wait for a public break.** The bounty could remain unclaimed indefinitely until someone found and published a qualifying collision.

3. **Claim with proof.** A claimant constructed a transaction revealing the colliding messages and satisfying the script.

4. **Let the network verify.** Full nodes verified the script and accepted the spend if the collision proof was valid.

This made the bounty self-executing in a narrow but powerful sense. No one had to decide whether a PDF, email, or private report was persuasive. The transaction either satisfied the script or it did not.

## The SHA-1 Payout

SHA-1 had been considered weakened for years, but a practical public collision remained a major milestone. In February 2017, Google and CWI Amsterdam announced SHAttered, the first public collision attack against the full SHA-1 function.

Shortly after that announcement, Todd's SHA-1 bounty was claimed onchain. The spend demonstrated the collision in the form Bitcoin Script required and moved the locked funds. Contemporary coverage reported the payout at roughly 2.48 BTC to 2.5 BTC, depending on fee accounting and exchange-rate framing.

The amount was not large compared with the research cost of producing SHAttered. Its importance was not that it fully financed the cryptanalytic work. Its importance was that it showed a fully public, automatically verifiable reward path for a specific kind of security milestone.

## Why It Matters

Peter Todd's hash-collision bounties illustrate a design pattern for public-goods funding:

- **Objective success conditions:** The payout condition was clear before the work was done.
- **No discretionary reviewer:** Claim validity was checked by consensus rules, not by a committee.
- **Durable funding:** The bounty could remain live for years without an active administrator.
- **Public verification:** The successful claim was visible onchain and independently auditable.
- **Disclosure alignment:** Researchers had a reason to make the collision public in a form others could verify.

This differs from many bounties that reward subjective effort, private reports, or ongoing maintenance. It works best when the desired outcome can be reduced to a crisp predicate: "produce two different messages with the same hash." That narrowness is a limitation, but it is also what made the mechanism robust.

## Limits and Tradeoffs

The model does not generalize to every security problem.

First, many vulnerabilities require context, severity assessment, and coordinated disclosure. A script cannot easily judge whether a web application bug is exploitable, whether a protocol flaw is mitigated elsewhere, or whether public disclosure would create unacceptable user risk.

Second, payout size may be symbolic rather than sufficient. The SHA-1 bounty was claimed after a large institutional research project, not because the bounty alone financed the discovery. Script-based bounties can create public incentives and proof-of-validity, but they may not fully fund expensive research programs.

Third, the mechanism rewards proof of breakage, not prevention. It is excellent for recognizing the moment a cryptographic assumption fails, but it does not directly pay for migration planning, education, standards work, or remediation.

The lesson is not that all security funding should be onchain and automatic. The lesson is that some security milestones have objective predicates, and those predicates can become programmable funding conditions.

## Lessons for Funding Design

Peter Todd's experiment is useful far beyond Bitcoin Script.

For bounty designers, it shows the value of making reward criteria precise before work begins. Ambiguity creates adjudication cost; objective predicates reduce it.

For public-goods funders, it shows how small pools of capital can create durable signals. Even if the reward is not the main research budget, the open bounty communicates that the ecosystem values public proof of important security events.

For mechanism designers, it shows a boundary between programmable and social allocation. Some funding decisions can be verified by code. Others require human judgment. Good funding systems should know which is which.

## Further Reading

- [**BitcoinTalk: Peter Todd's hash collision bounties**](https://bitcointalk.org/index.php?topic=293382.0)
- [**SHAttered: the first collision for full SHA-1** — Google Security Blog](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html)
- [**SHAttered technical site** — Google Research and CWI Amsterdam](https://shattered.io/)
- [**SHA-1 collision bounty claimed** — Bitcoin Magazine](https://bitcoinmagazine.com/technical/sha1-collision-bounty-claimed-2-48-btc-paid-out)
- [**Peter Todd: Announcing hash collision security bounties** — bitcoin-dev archive](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2013-September/003258.html)
