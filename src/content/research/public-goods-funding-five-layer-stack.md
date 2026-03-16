---
id: '1741267200006'
slug: public-goods-funding-five-layer-stack
name: "The Five-Layer Stack: An Architecture for Public Goods Funding"
shortDescription: "Public goods funding operates as a multi-layer stack -- formation, allocation, execution, attribution, and accountability. Every failed program has a gap in one of these layers."
tags:
  - architecture
  - infrastructure
  - capital-allocation
  - mechanism-design
  - composability
researchType: Report
lastUpdated: '2026-03-06'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - direct-grants
  - token-streaming
  - milestone-based-funding
  - attestation-based-funding
  - impact-attestations
relatedApps:
  - allo-protocol
  - karma-gap
  - open-source-observer
  - sablier
  - superfluid
  - drips
relatedCaseStudies: []
relatedResearch:
  - allo-protocol-ecosystem-analysis
  - plural-funding-mechanisms
  - state-of-public-goods-funding-2024
relatedCampaigns:
  - gg24-upcoming
banner: /content-images/research/public-goods-funding-five-layer-stack/banner.png
---

**Type:** Report
**Authors:** Gitcoin Research
**Published:** March 2026

**TLDR** -- Public goods funding is not a single problem with a single solution. It is a stack of five interdependent layers: formation (where does money come from?), allocation (who decides who gets funded?), execution (how does money move?), attribution (who did what?), and accountability (did it work?). Every failed or underperforming funding program can be diagnosed as having a gap in one of these layers. The most effective programs -- Optimism, Protocol Guild, GG24 -- are the ones that have assembled coherent stacks across all five.

---

## The Insight

When a funding program underperforms, the diagnosis usually focuses on the allocation mechanism: "QF doesn't work for infrastructure," "direct grants are too centralized," "retroactive funding has incumbency bias." These diagnoses are often correct but incomplete. They identify a problem in one layer while ignoring gaps in others.

Consider: quadratic funding without Sybil resistance produces farmed outcomes. This is typically diagnosed as a QF problem, but it's actually an *attribution* problem -- the system can't verify who participants are. Direct grants without milestone tracking produce accountability gaps -- not an allocation problem but an *execution* problem. Retroactive funding without impact data produces popularity contests -- not an allocation problem but an *attribution* problem.

The field needs a diagnostic framework that identifies which layer is failing, not just which mechanism to blame.

## The Five Layers

### Layer 1: Formation

**Question:** Where does the money come from?

This is the capital supply layer. Without it, nothing else matters.

**Mechanisms:** Treasury allocations, protocol fees, staking yield, MEV redirection, bonding curves, auctions, taxes, percent-for-public-goods commitments, crowdfunding, donations.

**Current state:** This layer has seen the most dramatic improvement. L2 treasuries (Arbitrum, Optimism, Polygon, Scroll) have committed hundreds of millions in tokens. Endowment models (Octant, TheDAO Security Fund) generate renewable yield. Protocol Guild receives ongoing revenue splits. The formation layer is no longer the binding constraint for most programs.

**Common gap:** Programs that depend on one-time treasury allocations without renewable sources. When the treasury runs out, the program dies regardless of how well the other layers function.

### Layer 2: Allocation

**Question:** Who decides who gets funded?

This is the decision layer -- the most studied and debated layer in the field.

**Mechanisms:** Quadratic funding, retroactive funding, direct grants, conviction voting, metrics-based voting, AI-assisted evaluation (Deep Funding), participatory budgeting, ranked-choice voting, MACI private voting.

**Current state:** The most mechanism-rich layer, with 76+ documented approaches. The field has more allocation mechanisms than it can effectively deploy. The challenge is not mechanism scarcity but mechanism selection -- matching the right mechanism to the right context.

**Common gap:** Using a single allocation mechanism for all contexts. QF is excellent for grassroots discovery but poor for deep infrastructure. Direct grants are excellent for strategic priorities but poor for democratic legitimacy. The gap is not in any individual mechanism but in the failure to compose multiple mechanisms.

### Layer 3: Execution

**Question:** How does money actually move?

This is the disbursement and delivery layer -- often overlooked in mechanism design discussions but critical for program effectiveness.

**Mechanisms:** Lump-sum grants, milestone-based disbursement, token streaming (Sablier, Superfluid, Drips), vesting schedules (Protocol Guild's 4-year vesting), aqueducts (continuous routing between organizations).

**Current state:** Rapidly maturing. Token streaming protocols (552,000+ streams on Sablier alone, 297,500+ users) have made continuous disbursement technically trivial. Milestone-based tools (Karma GAP) enable conditional release based on verified deliverables. The execution layer is increasingly composable.

**Common gap:** Programs that distribute large lump sums with no milestone tracking or accountability mechanism. The capital leaves the program's control immediately, and there is no feedback loop connecting delivery to funding. Also: programs that use episodic disbursement (quarterly grants) when continuous streaming would better match the contribution pattern.

### Layer 4: Attribution

**Question:** Who are the participants, and what did they do?

This is the identity and impact data layer -- the layer that determines whether the other layers can function correctly.

**Mechanisms:** Decentralized identity (Gitcoin Passport, Worldcoin), attestations (EAS, Karma GAP), impact certificates (hypercerts), impact analytics (Open Source Observer), dependency mapping (Deep Funding, Tea Protocol's teaRank), peer recognition (Praise, SourceCred, Coordinape).

**Current state:** The weakest layer in the stack and the binding constraint for most programs. Identity infrastructure can detect roughly 60% of Sybil activity, leaving significant attack surface. Impact measurement is improving through Open Source Observer and similar tools but remains inadequate for qualitative, creative, and emergent contributions.

**Common gap:** Programs that run sophisticated allocation mechanisms on weak identity and impact data. The allocation algorithm is only as good as the data it operates on. QF without identity verification produces gamed results. Retroactive funding without impact data produces popularity contests. Metrics-based voting without comprehensive metrics produces narrow outcomes.

### Layer 5: Accountability

**Question:** Did the funded work actually happen, and did it matter?

This is the feedback layer -- the one that closes the loop between funding and outcomes.

**Mechanisms:** Onchain milestone attestations (Karma GAP), impact reporting, round retrospectives, outcome evaluation, community feedback loops.

**Current state:** The newest and least mature layer. Karma GAP is adopted across 7+ major programs (Arbitrum, Gitcoin, Optimism, Octant, Celo, Scroll, Lisk), providing the first standardized approach to grantee accountability. But most programs still operate in a "fund and forget" mode with no systematic outcome tracking.

**Common gap:** Programs that invest heavily in allocation (Layer 2) but have no mechanism for evaluating whether funded work was delivered or impactful. Without accountability, there is no feedback loop to improve allocation over time. Each round starts from scratch rather than building on lessons from previous rounds.

## Diagnostic Framework

Any funding program can be analyzed by identifying which layers are present, which are absent, and which are weakest:

| Program | Formation | Allocation | Execution | Attribution | Accountability |
|---------|-----------|------------|-----------|-------------|----------------|
| **Optimism RetroPGF** | Strong (sequencer revenue) | Strong (retro + metrics) | Moderate (lump sum) | Moderate (badgeholders + OSO) | Weak |
| **Protocol Guild** | Strong (revenue splits) | Strong (self-curated) | Strong (4yr vesting) | Strong (core dev verification) | Moderate |
| **GG24** | Moderate (matching pools) | Strong (6 mechanisms) | Moderate (varies by domain) | Moderate (Passport + COCM) | Moderate (Karma GAP) |
| **Typical Foundation** | Variable | Moderate (committee review) | Weak (lump sum) | Weak (application only) | Weak |
| **Typical DAO Treasury** | Strong (token treasury) | Weak (governance voting) | Weak (lump sum) | Weak (address only) | None |

The diagnostic reveals that most programs invest disproportionately in Layer 2 (allocation) while underinvesting in Layers 4 (attribution) and 5 (accountability). The best programs -- Protocol Guild, GG24, Optimism -- have the most balanced coverage across all five layers.

## Composability: The DeFi Analogy

DeFi's breakthrough was not any individual protocol but the composable stack: lending protocols, DEXes, aggregators, and oracles that snap together through shared standards (ERC-20, ERC-721). A yield farming strategy might touch Aave, Uniswap, Yearn, and Chainlink in a single transaction. Each protocol is a module in a larger system.

Public goods funding is building the same composable architecture:

- **Formation:** Octant (yield), Nouns (auctions), Optimism (revenue), Revnets (autonomous)
- **Allocation:** Allo Protocol (modular strategies), Gardens (conviction voting), Deep Funding (AI-assisted)
- **Execution:** Sablier, Superfluid, Drips (streaming); Karma GAP (milestone-based)
- **Attribution:** Gitcoin Passport (identity), EAS (attestations), Open Source Observer (impact data), Tea Protocol (dependency ranking)
- **Accountability:** Karma GAP (milestone tracking), hypercerts (impact certification)

These layers are increasingly open, composable, and permissionless. Any community can assemble a funding program from these components without building from scratch. This is the infrastructure that made GG24's six simultaneous mechanisms possible.

## Implications

**For program designers:** Use the five-layer framework as a checklist. Before launching a funding program, ensure you have a credible answer for each layer. The weakest layer will determine overall program quality, regardless of how strong the others are.

**For infrastructure builders:** Identify which layer has the least mature tooling and build there. Currently, that's attribution (identity + impact data) and accountability (outcome tracking). These are the highest-leverage infrastructure investments.

**For the ecosystem:** Stop debating which allocation mechanism is best. Start building the attribution and accountability infrastructure that makes all mechanisms work better. A mediocre allocation algorithm on excellent identity and impact data will outperform a brilliant allocation algorithm on garbage data.

## Conclusion

Public goods funding is a stack, not a mechanism. The field's long debate about "QF vs. retro vs. direct grants" has been asking the wrong question -- it's like debating whether lending or trading is more important for DeFi. The answer is that both are layers in a stack, and the stack's performance depends on all layers functioning together.

The diagnostic power of the five-layer model is that it directs attention to actual gaps rather than ideological preferences. When a program fails, the question is not "which mechanism should we switch to?" but "which layer is weakest, and how do we strengthen it?" That reframing -- from mechanism selection to stack completion -- is the conceptual shift the field needs.
