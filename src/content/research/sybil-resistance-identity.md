---
id: '1743667200016'
slug: sybil-resistance-identity
name: "Sybil Resistance & Identity"
shortDescription: "Every democratic funding mechanism faces the fundamental challenge of ensuring one person equals one vote without a central authority, making sybil resistance the primary defense for quadratic funding and community-driven mechanisms."
tags:
  - sybil-resistance
  - identity
  - passport
  - maci
  - cocm
  - decentralized-identity
researchType: Report
lastUpdated: '2026-04-03'
authors:
  - "Kevin Owocki"
relatedMechanisms:
  - decentralized-identity
  - decentralized-validators
  - impact-attestations
  - impact-certificates-hypercerts
relatedApps:
  - gitcoin-grants-stack
relatedResearch:
  - quadratic-funding-sybil-resistance
relatedCaseStudies: []
relatedCampaigns: []
---

## Overview

Every democratic funding mechanism faces the same fundamental challenge: how do you ensure one person equals one vote (or one donation) without a central authority verifying identities? Sybil attacks -- where a single actor creates many fake identities to game a system -- are the primary threat to quadratic funding, conviction voting, and other community-driven mechanisms.

The Ethereum public goods ecosystem has developed several complementary approaches, forming a layered defense.

## Gitcoin Passport

Gitcoin Passport aggregates identity signals from multiple sources (social accounts, onchain activity, biometric verification) into a composite trust score. It became the primary sybil defense for Gitcoin Grants rounds from GG15 onward. Rather than requiring any single proof, it uses a "weight of evidence" approach where multiple weak signals combine into a strong identity claim.

## MACI (Minimum Anti-Collusion Infrastructure)

MACI uses zero-knowledge proofs to make votes private while keeping results publicly verifiable. If voters can't prove how they voted, bribery and collusion become impractical. GG24's Privacy domain used MACI via Privote, processing 7,427 private votes.

## COCM (Connection-Oriented Cluster Matching)

Gitcoin's most sophisticated approach adjusts quadratic matching based on social graph analysis. If a cluster of donors appears suspiciously coordinated (all connected, all funding the same projects), their collective matching is reduced. This addresses collusion without rejecting individual identities.

## Decentralized Identity Infrastructure

Beyond sybil defense, the broader decentralized identity stack enables self-sovereign credentials, portable reputation, and user-controlled data. This infrastructure supports not just funding mechanisms but also attestation-based systems, validator networks, and web3 social protocols.

## Impact Attestations as Identity

A complementary approach: rather than proving who you are, prove what you've done. Impact attestations and hypercerts create a reputation layer based on verified contributions, enabling trust without traditional identity verification.
