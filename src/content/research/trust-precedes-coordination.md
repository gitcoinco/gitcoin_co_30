---
id: '1741267200007'
slug: trust-precedes-coordination
name: "Trust Precedes Coordination Precedes Capital Allocation"
shortDescription: "Why small crews of 3-8 people are the irreducible atomic unit of effective coordination, and why mechanisms that skip the trust-building step consistently fail."
tags:
  - trust
  - microsolidarity
  - coordination
  - governance
  - community
  - organizational-design
researchType: Report
lastUpdated: '2026-03-06'
relatedMechanisms:
  - gift-circles
  - mutual-aid-networks
  - guilds
  - cookie-jar
  - commitment-pooling
relatedApps:
  - protocol-guild
  - coordinape
relatedCaseStudies: []
relatedResearch:
  - plural-funding-mechanisms
  - what-nature-can-teach-us-about-allocating-capital
relatedCampaigns:
  - protocol-guild-ongoing
banner: /content-images/research/trust-precedes-coordination/banner.png
---

**Type:** Report
**Authors:** Gitcoin Research
**Published:** March 2026

**TLDR** -- The most practically important insight in the entire public goods funding literature is also the most frequently ignored: trust precedes coordination, and coordination precedes capital allocation. You cannot skip the trust step. Mechanisms deployed among strangers consistently underperform mechanisms deployed within trusted communities. Small crews of 3-8 people are the irreducible atomic unit of effective coordination, and programs that invest in relational infrastructure outperform programs that invest only in mechanism design.

---

## The Sequence That Cannot Be Skipped

Richard Bartlett's microsolidarity framework articulates a sequence that appears across every successful coordination effort in the ecosystem:

1. **Trust** -- People develop genuine relationships, shared context, and mutual accountability
2. **Coordination** -- Trust enables effective joint action, resource sharing, and conflict resolution
3. **Capital allocation** -- Coordination enables intelligent, accountable distribution of resources

This sequence is not optional. DAOs that jump straight to capital allocation -- deploying sophisticated mechanisms among strangers with no relational foundation -- reliably fail. The mechanism works on paper. The math is sound. The smart contracts execute correctly. And the outcomes are mediocre, gamed, or abandoned.

The reason is that capital allocation is a high-trust activity. It requires:
- **Shared context** about what matters and why
- **Mutual accountability** for how resources are used
- **Conflict resolution** when disagreements arise (and they always arise)
- **Information sharing** that goes beyond what's visible on-chain
- **Forgiveness** when things don't go as planned

No mechanism design provides these. They emerge from relationships.

## Evidence from the Ecosystem

### Protocol Guild: Trust at the Foundation

Protocol Guild is the most successful public goods funding program in the Ethereum ecosystem by almost any metric: $100M+ cumulative donations, ~190 contributors, 4-year vesting, self-curated membership. It works because it is built on an existing foundation of trust.

Ethereum core developers are a community before they are a funding recipient. They work together across ~30 teams. They review each other's code, attend the same calls, share context about protocol development. The social bonds that make Protocol Guild's self-curation credible were built over years of collaborative work, not through a smart contract deployment.

Protocol Guild's allocation mechanism (longevity-weighted, self-curated membership) is simple to the point of being crude compared to QF or retroactive funding. But it works because the trust layer is extraordinarily strong. The community knows who belongs, who is contributing, and who deserves what. The mechanism's job is to encode trust that already exists, not to substitute for trust that doesn't.

### Gift Circles: Dialogue Before Distribution

Gift circles -- participatory gatherings where community members distribute shared funds through dialogue and relational trust -- represent the most trust-intensive funding mechanism in the ecosystem. There are no algorithms, no quadratic formulas, no smart contracts. People sit together, share needs, and decide collectively who receives what.

Gift circles consistently produce outcomes that participants describe as more satisfying and more accurate than algorithmic allocation. Not because the outcomes are objectively "better" by some metric, but because the process builds and reinforces the relational infrastructure that makes all future coordination more effective.

The lesson is not that we should replace QF with gift circles. It's that the relational capacity gift circles build is the foundation on which all other mechanisms depend.

### DAOs That Skipped Trust

The counter-evidence is equally instructive. The 2021-2022 DAO boom produced hundreds of organizations that deployed governance tokens, multisig treasuries, and sophisticated voting mechanisms -- among strangers who had met on Discord weeks earlier.

The pattern was predictable:
1. Launch with enthusiasm and a treasury
2. Make initial allocation decisions through voting
3. Encounter disagreements that require trust to resolve
4. Discover that voting cannot substitute for relationships
5. Fragment, stagnate, or centralize around a small trusted group

The DAOs that survived and thrived were invariably the ones where a core group had pre-existing trust relationships. MolochDAO worked because Ethereum developers already knew and trusted each other. Nouns DAO's most productive period involved a relatively small group of aligned builders who had developed relationships through shared creative work.

## The Dunbar Layers

Robin Dunbar's research on social group size provides the neurological basis for why trust matters at specific scales:

- **5 (intimate)** -- Deep trust, high bandwidth, emotional support
- **15 (sympathy group)** -- Close collaboration, shared goals, mutual accountability
- **50 (band)** -- Effective working groups, shared norms, peer recognition
- **150 (clan)** -- Maximum stable social network, shared identity, cultural coherence
- **500-1500 (tribe/mega-band)** -- Institutional coordination, formal rules required

Microsolidarity maps these to coordination structures:

- **Dyads** (2 people) -- The minimum unit of trust
- **Crews** (3-8 people) -- The minimum unit of coordination. Small enough for deep trust, large enough for diverse skills and perspectives.
- **Congregations** (30-200 people) -- The maximum unit of direct trust. Beyond this, coordination requires formal mechanisms.

The critical insight: **crews of 3-8 are the atomic unit of effective coordination.** They are where trust is built, maintained, and deployed. Programs that invest in crew formation -- through residencies, working groups, pair programming, shared meals, regular check-ins -- build the relational infrastructure that makes larger-scale coordination possible.

## Implications for Mechanism Design

### The Trust Gradient

Different mechanisms require different trust levels, and should be deployed accordingly:

**High trust required:**
- Gift circles, cookie jars, mutual aid
- Self-curated registries (Protocol Guild)
- Coordinape (peer-based allocation)
- Direct grants (committee trust)

**Moderate trust required:**
- Conviction voting (sustained engagement signals trust)
- Milestone-based funding (trust but verify)
- Retroactive funding (trust evaluators)

**Lower trust required (but identity needed):**
- Quadratic funding
- Quadratic voting
- Participatory budgeting
- Bounties

**Minimal trust required:**
- Token streaming (programmatic)
- AutoPGF (algorithmic)
- Bonding curves (mathematical)
- Revnets (autonomous)

The mistake is deploying high-trust mechanisms in low-trust contexts, or assuming that low-trust mechanisms can substitute for high-trust ones. QF among strangers with good Sybil resistance can work. Gift circles among strangers cannot.

### Investing in Relational Infrastructure

If trust precedes coordination, then programs should explicitly invest in trust-building as infrastructure:

**Co-location.** Zuzalu demonstrated that two months of physical co-location produces qualitatively different coordination than two-day conferences. The pop-up city generated Zupass (ZK identity), Daimo (crypto payments), and Edge City (a self-sustaining organization) -- all from relationships that formed through shared daily life.

**Small group formation.** Programs that actively form crews -- through cohort-based onboarding, working groups, mentorship pairs -- build the relational substrate that makes subsequent capital allocation more effective.

**Regular cadence.** Trust degrades without maintenance. Programs that maintain regular interaction cadences (weekly calls, monthly retrospectives, quarterly retreats) preserve the relational capital that episodic programs lose between rounds.

**Conflict resolution capacity.** Trust is not the absence of conflict but the ability to navigate it. Programs that invest in explicit conflict resolution processes (mediation, restorative justice, structured dialogue) maintain trust through disagreements rather than fragmenting.

### The Domain Allocator Pattern

GG24's domain allocator model -- where community-appointed operators independently run rounds within thematic domains -- is a trust-aware design. Rather than asking the entire ecosystem to evaluate everything (low trust, high cognitive load), it delegates allocation authority to trusted domain specialists who have the context and relationships to make informed decisions.

This is the same pattern that makes Protocol Guild effective: a trusted community evaluating within its domain of expertise. The trust is scoped and specific, not global and generic.

## The Organizational Implication

The sequence trust → coordination → capital allocation implies a specific organizational strategy:

1. **Start with people, not mechanisms.** Before selecting an allocation mechanism, invest in the community that will use it. Form crews, build relationships, develop shared context.

2. **Match mechanism to trust level.** Deploy high-trust mechanisms (gift circles, self-curation) within established communities. Deploy lower-trust mechanisms (QF, bounties) for broader participation. Don't mix them up.

3. **Build trust infrastructure alongside funding infrastructure.** For every dollar spent on allocation algorithms and smart contracts, spend a comparable amount on community building, conflict resolution, and relational maintenance.

4. **Expect trust to take time.** Protocol Guild's trust was built over years of collaborative development. Zuzalu's trust was built over months of co-location. Crews form over weeks of regular interaction. There are no shortcuts.

## Conclusion

The public goods funding field has invested enormously in mechanism design -- 76 documented approaches and counting. It has invested comparatively little in the relational infrastructure that makes mechanisms effective.

This is backwards. A simple mechanism deployed within a trusted community will outperform a sophisticated mechanism deployed among strangers, every time. The most practically important thing the field can do is not invent another allocation algorithm but invest in the conditions that make existing algorithms work: small groups, shared context, mutual accountability, and the patient work of building trust.

The sequence is non-negotiable: trust first, then coordination, then capital allocation. Skip a step, and the mechanism will fail no matter how elegant its mathematics.
