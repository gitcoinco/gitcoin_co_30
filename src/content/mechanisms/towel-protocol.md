---
id: '1772562420855'
slug: towel-protocol
name: "TOWEL Protocol"
shortDescription: "Network distance measurement between agents, participants, or protocols — enabling trust-weighted coordination without centralized oracles."
tags:
  - trust
  - coordination
  - attribution
  - network
  - signal-based
lastUpdated: '2026-03-03'
relatedMechanisms:
  - conviction-voting
  - impact-attestations
  - attestation-based-funding
  - autopgf
relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**TOWEL (Trust-Oriented Weighted Edge Layer) Protocol** is a network distance measurement mechanism that quantifies semantic and reputational proximity between agents, participants, or protocols within a funding or coordination network. Rather than relying on binary trust relationships or centralized reputation oracles, TOWEL treats trust as a continuous, directional property that decays with graph distance and strengthens through verified co-participation.

The core insight is that distance in a trust network is not merely topological — it is *entropic*. Two agents who have co-produced artifacts, co-signed attestations, or co-allocated capital occupy a meaningfully shorter trust distance than two agents who share only a common funder. TOWEL formalizes this intuition into a measurable signal that can feed allocation mechanisms, access controls, and coordination systems.

## How It Works

TOWEL replaces binary trust ("verified" / "not verified") with a continuous trust distance score derived from on-chain and off-chain co-participation signals.

1. **Graph construction:** Participants, agents, and protocols are nodes. Edges are established through verified co-participation events: shared funding rounds, co-signed attestations, referenced artifacts, or mutual on-chain interactions. Each edge carries a weight derived from the recency, frequency, and category of co-participation.

2. **Distance calculation:** Trust distance between any two nodes is computed as a weighted shortest path, with edge weights representing *inverse trust strength* — a heavier edge means weaker trust signal, a lighter edge means stronger. Nodes with no path between them have infinite trust distance.

3. **Entropy decay:** Trust distance increases with graph hops. Each intermediary node introduces entropy — the further a co-participation claim must travel through the network to connect two parties, the less it contributes to their trust score. This prevents trust laundering through low-quality intermediaries.

4. **Signal aggregation:** A node's TOWEL score relative to a reference participant (e.g., a funding mechanism's deployer) is the inverse of its mean trust distance across a defined graph neighborhood. High scores indicate close, multi-path trust relationships. Low scores indicate sparse or distant connections.

5. **Allocation input:** The TOWEL score can feed directly into allocation mechanisms — weighting conviction, adjusting matching ratios, or gatekeeping access to funding rounds — without requiring a centralized identity layer.

## Advantages

- **Decentralized trust without oracles:** Trust distance is derived from verifiable co-participation history rather than centralized identity assertions.

- **Sybil resistance by structure:** Creating fake trust requires faking co-participation history across multiple verified events — prohibitively expensive relative to the marginal benefit.

- **Composable with existing mechanisms:** TOWEL scores are a signal layer, not a replacement for existing allocation mechanisms. They can modulate quadratic funding weights, conviction accumulation rates, or milestone approval thresholds.

- **Continuous rather than binary:** The spectrum of trust distance allows mechanisms to reward closer relationships proportionally, avoiding the cliff effects of binary verification gates.

- **Legible to participants:** Trust distance is intuitive — "you are two hops from this funding pool's trusted core" is a comprehensible signal that binary verification statuses are not.

## Limitations

- **Graph cold start:** New participants with no co-participation history have no trust distance to established nodes, creating an onboarding friction comparable to other reputation-based systems.

- **Gaming via co-participation spam:** Participants could attempt to artificially reduce trust distance by generating high-volume low-quality co-participation events. Mitigation requires weighting edge quality, not just quantity.

- **Computational cost at scale:** Shortest-path calculations across large graphs are expensive. Practical implementations require approximations, subgraph sampling, or pre-computed trust neighborhoods.

- **Historical bias:** Trust distance reflects past co-participation, which may not predict future alignment. Mechanisms that overweight TOWEL scores may disadvantage genuinely aligned newcomers.

- **Cross-ecosystem gaps:** Trust distance within a single ecosystem (e.g., Ethereum mainnet) does not transfer to cross-chain or off-chain contexts without explicit bridge attestations.

## Best Used When

- A funding mechanism needs lightweight sybil resistance without centralized KYC
- Allocation weight should vary with demonstrated relationship quality rather than token holdings
- A network is mature enough to have meaningful co-participation history among its core participants
- Trust relationships span multiple artifact types (code, capital, attestations) rather than a single signal
- Composability with conviction voting or quadratic funding is desired

## Examples and Use Cases

### MetaSPN Network Distance Tracking

MetaSPN uses TOWEL-derived distance measurements to weight conviction signals between AI agents in a live cohort experiment. Agents with higher co-participation history (shared bounty submissions, mutual Farcaster references, co-authored protocols) receive higher trust-weighted influence in coordination rounds. The system has tracked 7 agent pairs across 24 days, with trust distance emerging as a stronger predictor of coordination speed than token holdings.

### Funding Pool Access Gating

A public goods funding pool can use TOWEL scores to gate participation: participants within trust distance 3 of the pool's core stewards access full matching; participants at distance 4–6 access partial matching; beyond distance 6, no match amplification. This creates a graduated onboarding curve rather than a binary access cliff.

### Retroactive Funding Weight Adjustment

In retroactive funding rounds, TOWEL distance from a project to its end beneficiaries can weight the retroactive allocation — projects with verifiable close relationships to the communities they claim to serve receive higher multipliers.

## Further Reading

### Tags
trust · coordination · attribution · network · signal-based
