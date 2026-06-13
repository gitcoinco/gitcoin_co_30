---
id: '2'
slug: quadratic-funding-sybil-resistance
name: "Sybil Resistance in Quadratic Funding: 2024 Approaches"
shortDescription: "An analysis of how Human Passport (formerly Gitcoin Passport), MACI, and other approaches address sybil attacks in quadratic funding rounds."
tags:
  - "sybil resistance"
  - "identity"
  - "quadratic funding"
  - "security"
lastUpdated: '2026-05-21'
authors:
  - "Gitcoin Research"
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
  - clr-fund
relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/research/quadratic-funding-sybil-resistance/banner.png
---

**Type:** Analysis  
**Authors:** Gitcoin Research (community update)  
**Sources:**  
- [Human Passport x Gitcoin Grants: Defending GG23 with model-based Sybil detection](https://human.tech/blog/human-passport-x-gitcoin-grants-defending-gg23-with-model-based-sybil-detection)  
- [Gitcoin Grants 2024 Strategy & Updates](https://www.gitcoin.co/blog/gitcoin-grants-2024-strategy)  
- [Announcing: Gitcoin Grants 20](https://www.gitcoin.co/blog/announcing-gg20)  
- [GG22 Results & Recap](https://www.gitcoin.co/blog/gg22-results-recap)  
- [Passport Stamp Weights (Knowledge Base)](https://support.passport.xyz/passport-knowledge-base/stamps/how-is-gitcoin-passports-score-calculated)  
- [Onchain Passport (Knowledge Base)](https://support.passport.xyz/passport-knowledge-base/using-passport/onchain-passport)  
- [Passport Models: Available Models](https://docs.passport.xyz/building-with-passport/models/available-models)  
- [Gitcoin Passport Onchain Stamps](https://www.gitcoin.co/blog/gitcoin-passport-onchain-stamps)  
- [MACI Documentation](https://maci.pse.dev/)  
- [Projects built with MACI](https://maci.pse.dev/projects)  
- [Gitcoin Grants (GG24)] (https://grants.gitcoin.co/)  
### Terminology note (2024+)  
Gitcoin Passport is now branded as **Human Passport** (formerly Gitcoin Passport / Passport XYZ). Some Gitcoin materials still reference the older “Gitcoin Passport” name, but the product and documentation now live under the Human Passport brand.

## The Sybil Problem  
Quadratic Funding (QF) amplifies broad community support: many small donations can generate more matching than a few large donations.  
This creates strong incentives for attackers to create fake identities (“sybils”) to manipulate the matching formula.

Sybil resistance in QF is not purely “one-person-one-vote”; in practice it’s a spectrum. Round operators often combine:  
- identity / credibility signals (who is likely a real person),  
- graph or cluster analysis (who is coordinating),  
- and operational review / enforcement.

## Current Approaches

### Human Passport (formerly Gitcoin Passport)  
Human Passport uses a **stamp-based** model: users collect verifiable credentials (“Stamps”) issued by identity providers and platforms (web2 + web3).  
Stamps are **weighted**, and the weights roll up into a **Passport Score**.

Examples of stamp/credential sources referenced in Gitcoin materials include providers like Guild, Civic, BrightID, ENS, and Proof of Humanity (among others).  
Partners can set eligibility thresholds; Human Passport’s Knowledge Base notes a **recommended partner threshold of 20** for protecting access to a program.

**How it’s used in Gitcoin Grants (practical integration):**  
- Gitcoin has used Passport as part of its sybil defense, sometimes reducing user friction by running checks “in the background.”  
- Gitcoin’s Grants materials also explicitly describe Passport score as affecting matching weight in QF contexts (higher score → higher weight in matching calculations).

#### 2024-era Improvements & Operational Pattern  
1) **Model-Based Detection (MBD / “Model Based Deduction” in some docs)**  
   - Passport can passively analyze an EVM address’ onchain history and assign a score (0–100), where lower implies higher Sybil likelihood and higher implies higher likelihood of a genuine user.  
   - Passport’s model documentation also describes that some models can return **-1** when an address lacks sufficient transaction history to score, which is a key practical limitation for brand-new wallets.

2) **Lower-friction Grants defense via multi-layer strategy**  
   Gitcoin describes a two-pronged sybil resistance approach rolled out in GG20 and continued later:  
   - **COCM** (Connection-Oriented Cluster Matching) as a matching algorithm enhancement, and  
   - Passport’s **Model-Based Detection** to analyze onchain history without requiring donors to manually collect stamps.

3) **Onchain Passport / Onchain Stamps**  
   - Gitcoin has discussed “Onchain Stamps” built on top of attestation primitives (EAS) to improve interoperability.  
   - Importantly: “Onchain Passport” is **not gasless**. Human Passport’s Knowledge Base describes a **one-time $3 fee plus network gas** (paid in ETH), and recommends using L2s to reduce gas. At the time of that documentation, Optimism Mainnet is explicitly mentioned as supported.

### MACI (clr.fund)  
Minimal Anti-Collusion Infrastructure (MACI) is a private, on-chain voting system that uses encryption and zero-knowledge proofs to make voting **receipt-free** (voters cannot prove how they voted), reducing bribery/collusion risks while keeping results verifiable.

MACI is relevant to funding and governance events where anti-collusion is critical. The MACI project list includes **clr.fund** as a production example built with MACI.

**Key limitation:** MACI reduces bribery/collusion incentives, but does not automatically solve the “unique human” problem by itself—sybil resistance still typically requires additional identity/credibility signals or eligibility constraints.

### Proof of Humanity (as a Passport stamp provider)  
Proof of Humanity has been referenced by Gitcoin in the context of Passport stamps / onchain stamps as one of the identity credential sources. In practice, high-assurance identity signals like PoH can strengthen sybil resistance, but usually introduce onboarding and privacy tradeoffs that operators must balance.

## Evidence & Operational Observations (publicly stated)  
- Gitcoin publicly describes continuing to improve sybil resistance by combining matching-algorithm defenses (COCM) with Passport’s model-based analysis, emphasizing reduced friction and fewer sybils impacting matching outcomes.  
- Human Passport’s team describes MBD + COCM as a complementary pairing: MBD scores wallets, while COCM reduces the influence of tightly coordinated clusters.  
- Passport’s own model documentation includes evaluation metrics by model/threshold (e.g., “% qualifying humans” and “% sybil penetration”), which can help operators choose thresholds—but these are model-dependent and context-dependent.

## Recommendations  
1) **Layer defenses**  
   Combine identity signals (stamps / score / models) with collusion-aware matching (e.g., COCM) and operational review.

2) **Use thresholds + weighting intentionally**  
   Decide whether Passport should be:  
   - a hard eligibility gate (threshold-based), or  
   - a soft signal that changes matching weight.  
   Document your policy clearly to reduce confusion.

3) **Account for false positives / new-wallet friction**  
   If model-based scoring can’t score brand-new wallets (or scores them low), provide an alternative onboarding path (e.g., stamps) or clear guidance.

4) **Treat sybil resistance as an evolving system**  
   Expect attackers to adapt. Re-evaluate thresholds, stamp weights, and detection assumptions over time.
