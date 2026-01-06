---
id: '7'
slug: attestation-based
name: Attestation-Based Funding
shortDescription: >-
  Using onchain attestations and reputation signals to determine funding
  eligibility and amounts.
heroImage: /images/attestation-hero.jpg
category: trust
howItWorks: |-
  1. Projects or individuals collect relevant attestations
  2. Attestations are verified and stored onchain
  3. Funding algorithms incorporate attestation data
  4. Higher/better attestations improve funding outcomes
  5. Creates reputation systems over time
advantages:
  - Objective, verifiable inputs
  - Reduces reliance on applications
  - Builds persistent reputation
  - Composable across platforms
  - Resistant to some sybil attacks
limitations:
  - Cold start problem for new participants
  - Attestation quality varies
  - Can create oligarchies
  - Privacy concerns
  - Gaming through fake attestations
bestUsedFor:
  - Recurring grants
  - Reputation-gated programs
  - Impact verification
  - Sybil resistance
implementations: []
technicalResources:
  - title: Ethereum Attestation Service
    url: https://attest.sh
    type: article
  - title: Gitcoin Passport
    url: https://passport.gitcoin.co
    type: article
originYear: 2022
relatedMechanisms:
  - retroactive-funding
  - quadratic-funding
tags:
  - attestations
  - reputation
  - trust
  - identity
lastUpdated: '2024-10-01'
---

Attestation-based funding uses onchain attestations (verified claims about identity, actions, or impact) to inform funding decisions. Instead of relying solely on applications or votes, it incorporates objective signals about a project or contributor.

This can include verified impact metrics, peer attestations, or automated oracle data. Ethereum Attestation Service (EAS) and similar protocols enable these verifiable claims.