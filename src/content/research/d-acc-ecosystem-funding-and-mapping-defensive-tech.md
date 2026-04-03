---
id: '1743724800006'
slug: d-acc-ecosystem-funding-and-mapping-defensive-tech
name: "d/acc Ecosystem: Funding and Mapping Defensive Tech"
shortDescription: "Defensive accelerationism (d/acc) calls for accelerating technologies that protect rather than threaten. But which defensive technologies actually reduce harm? Building a rigorous framework for funding, mapping, and evaluating the d/acc ecosystem."
tags:
  - d-acc
  - coordination
  - governance
  - safety
  - resilience
  - mechanism-design
researchType: Opinion
lastUpdated: '2026-04-03'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - impact-certificates-hypercerts
  - impact-attestations
relatedApps:
  - gitcoin-grants-stack
  - opensource-observer
  - optimism-retropgf
relatedCaseStudies: []
relatedResearch:
  - d-acc-market-map
  - civilizational-stakes-coordination-capacity
  - antifragile-by-design-lessons-from-decentralized-resilience
  - the-metacrisis
  - mechanism-pluralism-survival-requirement
relatedCampaigns: []
authors:
  - Kevin Owocki
---

**TLDR** — Vitalik Buterin's "d/acc" (defensive or decentralized accelerationism) offers a compelling frame: accelerate technologies that protect, defend, and distribute power rather than concentrate it. But moving from philosophy to practice requires solving hard problems — which technologies actually count as defensive? How do we measure harm reduction? Where are the funding gaps? This piece proposes a framework for mapping the d/acc ecosystem, evaluating what actually reduces harm, and directing capital toward the most impactful defensive technologies.

---

## The d/acc Thesis

The accelerationism debate has largely been a false binary: accelerate everything (e/acc) or slow everything down (decel). Defensive accelerationism offers a third position: accelerate selectively, prioritizing technologies that strengthen defense, distribute power, and improve collective resilience.

The intuition is sound. Not all technologies are equal in their risk profile. Nuclear weapons and bioweapons are offense-dominant — the ability to cause harm scales faster than the ability to prevent it. But some technologies are defense-dominant — encryption, vaccination, water purification, open-source software — where widespread deployment makes everyone safer.

d/acc says: identify the defense-dominant technologies and accelerate them as fast as possible, while being cautious about offense-dominant ones. This is an actionable framework. But operationalizing it requires three capabilities we don't yet have at sufficient maturity: mapping, evaluation, and funding.

## Mapping the d/acc Ecosystem

The first step is a clear taxonomy of what "defensive technology" means. Not everything branded as "safety" or "security" actually reduces net harm. A useful map organizes d/acc technologies into categories based on what they defend against:

**Information defense.** Technologies that protect the integrity of information systems: end-to-end encryption, zero-knowledge proofs, decentralized identity, verifiable credentials, anti-deepfake detection, provenance tracking. These defend against surveillance, censorship, manipulation, and epistemic corruption.

**Biological defense.** Technologies that protect against biological threats: pathogen surveillance networks, rapid vaccine development platforms (mRNA), point-of-care diagnostics, open-source drug development, biosafety monitoring. These defend against pandemics, both natural and engineered.

**Coordination defense.** Technologies that protect and enhance collective decision-making: governance mechanisms (quadratic voting, conviction voting, futarchy), sybil resistance systems, decentralized dispute resolution, transparent resource allocation. These defend against institutional capture, plutocracy, and coordination failure.

**Infrastructure defense.** Technologies that make critical systems resilient: decentralized energy grids, mesh networking, distributed data storage, open hardware, local manufacturing (3D printing). These defend against supply chain disruption, infrastructure attacks, and centralized points of failure.

**Democratic defense.** Technologies that protect democratic processes and individual rights: secure voting systems, whistleblower protection tools, freedom-of-speech platforms, privacy-preserving analytics. These defend against authoritarianism, censorship, and political repression.

## The Evaluation Problem

Mapping is necessary but insufficient. The harder question is: which defensive technologies actually work? "Defense-dominant" is a claim about a technology's net effect on the world — and that claim needs evidence.

Several evaluation challenges make this non-trivial:

**Counterfactual difficulty.** How do you measure the impact of a defense that prevented something from happening? Encryption that stops a surveillance operation, a governance mechanism that prevents capture, a biosurveillance system that enables early pandemic detection — these produce value by making bad things not happen, which is inherently hard to measure.

**Dual-use ambiguity.** Many technologies are simultaneously defensive and offensive. Encryption protects dissidents from authoritarian surveillance; it also protects criminals from law enforcement. AI-powered threat detection can defend against cyberattacks; the same technology can be used for surveillance. Zero-knowledge proofs enable privacy; they also enable illicit financial flows. A useful evaluation framework must grapple with dual-use honestly rather than assuming all privacy/decentralization technology is net positive.

**Timescale mismatch.** Defensive technologies often produce value over long timescales — decades, not quarters. A governance mechanism that prevents institutional capture may take years to demonstrate its value. A biosurveillance network proves itself during a pandemic that may or may not occur. Traditional evaluation frameworks, optimized for near-term measurable outcomes, systematically undervalue defensive technology.

**System-level effects.** The value of defensive technology is often at the system level, not the individual level. One person using encryption is marginally safer. Everyone using encryption changes the security landscape fundamentally. Evaluation must account for these network and system-level effects.

### A Proposed Evaluation Framework

Given these challenges, evaluating d/acc technologies requires a multi-dimensional approach:

1. **Threat model clarity.** What specific threat does this technology defend against? How severe is that threat? How likely? Technologies that address high-severity, high-probability threats should receive priority funding.

2. **Defense-offense ratio.** Does this technology primarily strengthen defense, or does it also meaningfully enhance offense? Pure defense (vaccination, water purification) is straightforward. Dual-use technologies (encryption, AI) require more nuanced assessment of the net balance.

3. **Accessibility and distribution.** Defense-dominant technologies only work if widely deployed. A technology that is technically defensive but available only to wealthy actors or nation-states may increase inequality rather than collective safety. Evaluate for broad accessibility: is it open-source? Affordable? Usable by non-experts?

4. **Systemic resilience contribution.** Does this technology reduce single points of failure? Increase redundancy? Enable graceful degradation? Technologies that make systems more antifragile (stronger under stress) are more valuable than those that are merely robust (resistant to stress).

5. **Retroactive evidence.** Where possible, evaluate based on demonstrated impact rather than projected impact. Retroactive funding mechanisms are particularly well-suited to d/acc because they reward technologies that have already proven their defensive value.

## Funding Gaps and Opportunities

The d/acc ecosystem has significant funding gaps that the public goods funding community is well-positioned to address:

**Open-source security infrastructure.** The tools that millions depend on for security — OpenSSL, GPG, Tor, Signal Protocol — have historically been underfunded relative to their importance. This is a classic public goods problem: everyone benefits, no one wants to pay. Quadratic funding and retroactive funding can direct resources here.

**Governance R&D.** Research into better democratic mechanisms — sybil-resistant voting, deliberation tools, collective intelligence systems — is chronically underfunded because it doesn't produce commercial returns. Yet this research is essential for defending against institutional capture and coordination failure.

**Biosurveillance and open-source health.** Pandemic preparedness infrastructure is a textbook public good: expensive to maintain, invisible when working, catastrophically missed when absent. Decentralized biosurveillance networks and open-source drug development need sustained funding that traditional institutions struggle to provide.

**Decentralized infrastructure.** Mesh networks, distributed energy, open hardware — the physical substrate of resilience is hardware-heavy and capital-intensive. Funding mechanisms need to adapt to support not just software public goods but physical infrastructure.

## From Map to Action

The d/acc ecosystem needs three things to move from philosophy to impact:

1. **A living market map** — continuously updated, rigorously categorized, that shows what exists, what's funded, and where the gaps are. The existing [d/acc market map](/research/d-acc-market-map) is a starting point.

2. **An evaluation framework** — that goes beyond "is this technology defensive?" to "does this technology actually reduce net harm at scale?" with honest assessment of dual-use dynamics and system-level effects.

3. **Dedicated funding streams** — grants rounds, retroactive funding programs, and impact certificates specifically oriented toward defensive technology, with evaluation criteria calibrated to the unique measurement challenges of defense.

The d/acc frame is powerful because it resolves the false binary between acceleration and caution. But frames alone don't reduce harm. What reduces harm is well-funded, well-evaluated defensive technology deployed at scale. Building the infrastructure to fund and evaluate that technology is itself one of the most important d/acc projects we can undertake.
