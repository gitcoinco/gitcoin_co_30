---
id: '1743667200000'
slug: ai-and-autonomous-funding
name: "AI & Autonomous Funding"
shortDescription: "Artificial intelligence is entering the public goods funding stack at multiple layers, from augmenting human evaluators to fully autonomous systems that allocate capital without human intervention."
tags:
  - ai
  - autonomous
  - funding
  - deep-funding
  - governance
  - evaluation
researchType: Perspective
lastUpdated: '2026-04-03'
authors:
  - "Kevin Owocki"
relatedMechanisms:
  - deep-funding
  - retailism-revenue-networks
  - autopgf
  - direct-to-contract-incentives
relatedApps:
  - deepfunding
  - flows-wtf
relatedResearch:
  - deep-funding-visual-guide
  - revnets-retailism-autonomous-public-goods-funding
  - 69-trends-in-2025-era-dao-design
  - d-acc-market-map
relatedCaseStudies: []
relatedCampaigns: []
banner: /content-images/research/ai-and-autonomous-funding/banner.png
---

Artificial intelligence is entering the public goods funding stack at multiple layers -- from augmenting human evaluators with data-driven insights to fully autonomous systems that allocate capital without human intervention. This represents a spectrum: at one end, AI surfaces information while humans retain final authority; at the other, models make binding funding decisions with minimal oversight. The frontier is defining where on this spectrum each type of funding decision belongs.

## Deep Funding: AI-Powered Evaluation in Three Steps

Deep Funding, conceived by Vitalik Buterin, is the most ambitious implementation of AI-powered public goods funding. Rather than asking the impossibly broad question "how much did project X contribute to humanity?", Deep Funding reframes allocation as a graph problem: "how much of the credit for outcome Y belongs to dependency X?"

The mechanism works in three steps, as detailed in the Deep Funding visual guide:

1. **Dependency graph construction** -- mapping the approximately 40,000 edges connecting open source repositories to their upstream dependencies in the Ethereum ecosystem.
2. **AI model competition** -- an open competition (hosted on platforms like Kaggle) invites anyone to submit models that propose weights for the dependency graph edges. Models compete to answer questions of relative credit using code analysis, usage metrics, and community signals.
3. **Human jury spot-checking** -- a panel of jurors reviews a random subset of relationships with simple comparative questions. Models are scored by how well they align with human judgment across the sampled edges.

The Deep Funding platform launched with $250,000 in initial sponsorship from Vitalik -- $170,000 to open source projects based on computed dependency weights, $40,000 to the best AI model, and $40,000 to the best open source model submissions. This design scales human judgment: instead of reviewing thousands of projects individually, humans spot-check a manageable sample while AI extrapolates to the full graph.

## Autonomous Treasury Systems

Revnets represent the opposite end of the autonomy spectrum -- removing AI and humans alike from allocation decisions. These immutable treasuries operate on purely deterministic rules set at deployment, with no owner, no governance, and no possibility of parameter changes. The Revnets research frames this as a radical departure from the assumption shared by most funding mechanisms: that someone decides who gets funded.

AutoPGF occupies a middle ground, automating distribution based on predefined signals (protocol fees, usage metrics, contribution data) while retaining governance hooks for parameter adjustment. Direct to contract incentives take this further by routing capital directly to smart contracts based on onchain usage and performance -- reframing funding from "who should we fund?" to "what code created the value?"

## AI Agents in Governance

The 69 trends in 2025-era DAO design survey identifies multiple AI integration patterns emerging in DAO governance: AI delegates that participate in governance decisions on behalf of token holders, AI governance assistants that provide data-driven insights into voting patterns, AI circuit breakers that automatically pause or limit AI actions based on safety triggers, and AI for information routing that helps community members navigate complex proposal landscapes.

These patterns suggest a future where AI agents are not just tools used by human governors but active participants in governance processes -- raising fundamental questions about accountability, alignment, and the boundaries of autonomous decision-making in systems that manage shared resources.

## The d/acc Ecosystem

The d/acc market map contextualizes AI-powered funding within the broader defensive acceleration ecosystem. Organized across two axes -- atoms vs. bits (physical vs. digital systems) and survive vs. thrive (baseline defense vs. positive-sum coordination) -- the map reveals how AI-powered capital allocation sits within a larger stack that includes biosecurity, cryptography, decentralized identity, governance tooling, and civic technology. AI funding mechanisms are one piece of a comprehensive approach to building systems that distribute rather than concentrate power.

## The Frontier: Machine Learning for Impact Assessment

The convergence of AI evaluation and continuous funding infrastructure points toward a future where impact assessment happens in real-time, informed by AI models that continuously evaluate dependency relationships, usage patterns, and contribution signals. Flows.wtf already incorporates AI-powered elements into its continuous streaming platform. The challenge ahead is ensuring these systems remain aligned with human values -- that the efficiency gains of AI allocation do not come at the cost of the pluralism and community voice that make public goods funding legitimate.
