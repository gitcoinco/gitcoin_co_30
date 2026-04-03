---
id: '1743667200010'
slug: impact-measurement
name: "Impact Measurement & Attestations"
shortDescription: "Impact measurement in decentralized ecosystems has evolved from purely subjective badgeholder voting to sophisticated multi-layered systems combining social attestations, onchain analytics, and metrics-based evaluation."
tags:
  - impact
  - measurement
  - attestations
  - hypercerts
  - metrics
  - evaluation
  - accountability
researchType: Report
lastUpdated: '2026-04-03'
authors:
  - "Kevin Owocki"
relatedMechanisms:
  - impact-attestations
  - impact-certificates-hypercerts
  - metrics-based-voting
  - sourcecred
  - praise
  - honour
  - decentralized-validators
relatedApps:
  - opensource-observer
  - karma-gap
relatedResearch:
  - eight-forms-of-capital-beyond-financial-metrics
  - retropgf-impact-measurement-evolution
relatedCaseStudies:
  - greenpill-hypercerts-experiment-impact-certificates-in-practice
relatedCampaigns: []
---

Funding public goods is only half the challenge. The other half is knowing whether the funded work created value -- and for whom. Impact measurement in decentralized ecosystems has evolved from purely subjective badgeholder voting to sophisticated multi-layered systems combining social attestations, onchain analytics, tokenized impact claims, and metrics-based evaluation. The trend is toward composable measurement infrastructure where different signals reinforce each other.

## The Attestation Layer

Impact attestations are social or onchain signals that say: this person or project made a valuable contribution. They function as a legitimacy layer without requiring tokens or money. Contributions are made, attestations are issued by peers or steward councils, and they accumulate into reputational capital that downstream mechanisms consume -- retroactive funding rounds, registries, and grant programs use attestation data as input for allocation decisions.

Attestations create a reputational substrate that compounds over time. A contributor's track record of verified impact informs future funding decisions, creating a flywheel where demonstrated value leads to more resources. Platforms like Ethereum Attestation Service (EAS) provide the onchain infrastructure for issuing, storing, and querying attestations across the ecosystem.

## Hypercerts: Tokenized Impact Claims

Impact certificates (Hypercerts) take attestations further by creating onchain tokens representing completed impactful work. Developed by Protocol Labs and the Hypercerts Foundation, each Hypercert encodes a structured claim: who did what work, during what time period, for whom, and with what scope of impact. They use the ERC-1155 standard, allowing fractionalization, transfer, and secondary market creation.

Hypercerts flip the funding model from paying for promises to rewarding verified contributions. They can be purchased by retroactive funders, creating an impact market where the value of past work is priced by those willing to pay for it. The GreenPill Hypercerts experiment during Gitcoin Grants Round 19 was one of the first real-world tests of this model -- 15+ GreenPill chapters minted hypercerts for their community activities and received funding based on demonstrated contributions. While modest in scale ($552 in donations plus $2,237 in matching), the experiment generated foundational lessons about impact certificate design, minting workflows, and evaluation.

## Open Source Observer: Analytics at Scale

Open Source Observer (OSO) brings rigorous, data-driven evaluation to public goods funding. Built by Kariba Labs and co-founded by Carl Cervone and Raymond Cheng, OSO aggregates data from GitHub repositories, npm packages, onchain deployments, and other sources into a unified analytics layer. It maintains a directory of thousands of open source projects along with their associated artifacts -- git repos, package registries, smart contract deployments -- providing a comprehensive view of how projects are built, adopted, and used.

OSO's metrics were central to metrics-based voting in Optimism's RetroPGF Round 4, where voters distributed funding by weighting quantitative impact metrics (active users, developer activity, gas fees generated) rather than evaluating individual projects subjectively. This transformed the voting task from "how much should each project receive?" to "which dimensions of impact matter most?" -- dramatically reducing cognitive load while producing more consistent, auditable outcomes.

## Karma GAP: Accountability Infrastructure

Karma GAP (Grantee Accountability Protocol) addresses what happens after grants are distributed. The platform provides a structured system where grantees create project profiles, define milestones, and post progress updates -- all stored onchain as attestations through EAS. The result is a verifiable, permanent record of what was promised, what was delivered, and how funded projects evolve over time. Trusted by Arbitrum, Gitcoin, Optimism, Octant, Celo, Scroll, and Lisk, GAP fills a critical gap in the funding stack: the accountability layer between allocation and impact.

## Contribution Tracking: SourceCred and Praise

SourceCred pioneered automated contribution tracking by building a "contribution graph" mapping people, projects, and interactions across platforms like GitHub, Discourse, and Discord. It assigned "cred" scores based on measurable activity to allocate treasury funds proportionally. While no longer actively maintained, SourceCred established the category and influenced modern tools like Coordinape and Karma.

Praise, developed by the Token Engineering Commons and Giveth communities, takes a bottom-up approach: community members publicly acknowledge valuable contributions from others through simple Discord commands. Praise data is collected, quantified through community scoring, and used to inform reward distribution. This captures work that formal systems miss -- emotional labor, mentorship, culture-building -- and creates a positive feedback loop where public recognition encourages more contribution.

Honour extends this further into non-financial recognition, surfacing care, reliability, and relational trust through symbolic signals. These recognition mechanisms build legitimacy infrastructure without requiring capital, creating a social layer that other funding mechanisms can consume.

## Decentralized Verification

Decentralized validators distribute verification power across multiple independent participants who review, verify, or endorse actions within funding systems. Rather than centralizing evaluation in a small committee, this model scales review capacity while maintaining trust through economic incentives and reputation mechanisms.

## Beyond Financial Metrics: Eight Forms of Capital

The Eight Forms of Capital framework, developed by Ethan Roland and Gregory Landua, reveals the blind spots in current measurement approaches. Public goods funding overwhelmingly measures financial capital -- dollars donated, tokens matched, TVL influenced. The framework identifies seven additional forms: intellectual, experiential, social, material, living (ecological), cultural, and spiritual capital. Projects that build community trust, preserve cultural knowledge, or restore ecosystems create value that financial metrics systematically miss. Incorporating these dimensions into impact measurement remains one of the field's most important open challenges.

## Evolution Across RetroPGF Rounds

The evolution of impact measurement through RetroPGF rounds 3-6 demonstrates the field's learning curve. RetroPGF 3 used minimally structured badgeholder voting across 644 projects -- too many to evaluate thoroughly. Round 4 narrowed scope and introduced metrics-based voting. Round 5 added impact metrics frameworks and evaluator training. Round 6 focused narrowly on governance contributions with algorithmic initial ranking. Key lessons: narrower scope enables better evaluation, training improves consistency, neither purely quantitative nor qualitative approaches work alone, and multi-round iteration is essential.
