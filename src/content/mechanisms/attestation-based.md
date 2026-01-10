---
id: '7'
slug: attestation-based
name: Attestation-Based Funding
shortDescription: >-
  Using onchain attestations and reputation signals to determine funding
  eligibility and amounts.
banner: /images/attestation-hero.jpg
tags:
  - attestations
  - reputation
  - trust
  - identity
lastUpdated: '2024-10-01'
relatedMechanisms:
  - retroactive-funding
  - quadratic-funding
---

**Category:** Trust
**Origin Year:** 2022

Attestation-based funding uses onchain attestations (verified claims about identity, actions, or impact) to inform funding decisions. Instead of relying solely on applications or votes, it incorporates objective signals about a project or contributor.

This can include verified impact metrics, peer attestations, or automated oracle data. Ethereum Attestation Service (EAS) and similar protocols enable these verifiable claims.

## How It Works

1. Projects or individuals collect relevant attestations
2. Attestations are verified and stored onchain
3. Funding algorithms incorporate attestation data
4. Higher/better attestations improve funding outcomes
5. Creates reputation systems over time

## Advantages

- Objective, verifiable inputs
- Reduces reliance on applications
- Builds persistent reputation
- Composable across platforms
- Resistant to some sybil attacks

## Limitations

- Cold start problem for new participants
- Attestation quality varies
- Can create oligarchies
- Privacy concerns
- Gaming through fake attestations

## Best Used For

- Recurring grants
- Reputation-gated programs
- Impact verification
- Sybil resistance

## Technical Resources

- [Ethereum Attestation Service](https://attest.sh) - Attestation platform
- [Gitcoin Passport](https://passport.gitcoin.co) - Identity verification