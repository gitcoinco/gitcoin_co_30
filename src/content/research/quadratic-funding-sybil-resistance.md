---
id: '2'
slug: quadratic-funding-sybil-resistance
name: 'Sybil Resistance in Quadratic Funding: 2024 Approaches'
shortDescription: An analysis of how Gitcoin Passport, MACI, and other approaches address sybil attacks in quadratic funding rounds.
banner: /og-default.png
tags:
  - sybil resistance
  - identity
  - quadratic funding
  - security
lastUpdated: '2024-12-25'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
  - clr-fund
---

**Type:** Analysis
**Authors:** Gitcoin Research

**Sources:**
- [Gitcoin Passport](https://passport.gitcoin.co)
- [MACI Documentation](https://maci.pse.dev)

## The Sybil Problem

Quadratic funding's power comes from its democratic weighting - more unique contributors means more matching. But this creates strong incentives for creating fake identities (sybils) to game the matching formula.

## Current Approaches

### Gitcoin Passport

Gitcoin's approach uses a "stamp" system where users collect verifiable credentials:
- **Social accounts**: Twitter, GitHub, Discord, LinkedIn
- **Onchain activity**: NFTs, transaction history, ENS
- **Biometric**: BrightID verification
- **Financial**: Coinbase verification, bank connections
- **Civic**: Holonym, ID verification

Each stamp adds to a "passport score" that determines matching eligibility and weight.

**2024 Improvements:**
- Model-based score using ML for better detection
- Onchain Passport for gasless verification on L2s
- Improved stamp rotation to counter farming
- ~60% reduction in suspicious activity in GG23

### MACI (clr.fund)

Minimal Anti-Collusion Infrastructure uses zero-knowledge proofs:
- Voters can't prove how they voted (prevents bribery)
- Votes are encrypted and processed privately
- Prevents coordination attacks
- Doesn't directly prevent sybils but removes incentive

**2024 Updates:**
- MACI 2.0 with improved performance
- Deployed on multiple L2s
- Better integration with identity solutions

### Proof of Humanity / Gitcoin Passport Integration

Video verification and social vouching:
- High assurance of unique humans
- Privacy concerns limit adoption
- Being integrated as a Passport stamp

## Effectiveness Data

Based on GG23 data:
- Gitcoin Passport reduced flagged addresses by ~60%
- ML-based detection caught patterns humans missed
- Community flagging complemented automated detection
- Some sophisticated attacks still succeed

## Recommendations

1. **Layer multiple approaches**: No single solution is sufficient
2. **Invest in privacy-preserving identity**: Users need better options
3. **Accept tradeoffs**: Some accessibility loss for integrity
4. **Continuous iteration**: Attackers evolve, defenses must too