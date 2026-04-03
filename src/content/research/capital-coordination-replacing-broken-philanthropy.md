---
id: '1743724800005'
slug: capital-coordination-replacing-broken-philanthropy
name: "Capital Coordination: Replacing Broken Philanthropy"
shortDescription: "Traditional philanthropy and government grants are failing at capital allocation for public goods. Network-based vetting and funding systems offer a fundamentally better model — one that distributes both capital and decision-making authority."
tags:
  - capital-allocation
  - public-goods
  - coordination
  - mechanism-design
  - grants
  - philanthropy
researchType: Opinion
lastUpdated: '2026-04-03'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - conviction-voting
  - direct-grants
  - grants-as-a-service
  - commitment-pooling
  - dominant-assurance-contracts
relatedApps:
  - gitcoin-grants-stack
  - giveth
  - octant
  - protocol-guild
  - optimism-retropgf
  - flows-wtf
relatedCaseStudies:
  - gg24-first-funding-round-of-gitcoin-3-0
relatedResearch:
  - exploring-the-capital-allocation-design-space
  - state-of-public-goods-funding-2024
  - the-great-interregnum-where-capital-flows-after-institutional-breakdown
  - signal-as-important-as-capital
  - web3-funding-fatigue
  - structural-funding-beyond-grants
  - public-goods-funding-five-layer-stack
  - grantee-to-funder-flywheel
  - retroactive-funding-most-scalable-pattern
relatedCampaigns: []
authors:
  - Kevin Owocki
---

**TLDR** — The institutions we rely on to fund public goods — philanthropy and government grants — are structurally broken. Philanthropy centralizes allocation authority in wealthy donors whose priorities may not reflect community needs. Government grants are slow, bureaucratic, and politically captured. Both suffer from the same root problem: the people who have capital are not the people who have information about where capital should go. Network-based funding systems — quadratic funding, retroactive funding, conviction voting — fix this by distributing both capital and decision-making authority to the people closest to the work. The result is not just more efficient allocation, but a fundamentally different power structure for commons funding.

---

## How Philanthropy Broke

Philanthropy was supposed to be capitalism's conscience — the mechanism by which private wealth flows back to public benefit. In practice, it has become something else.

**Donor-directed, not need-directed.** The fundamental structure of philanthropy is that the person with money decides where it goes. This seems natural until you consider the information asymmetry: donors are typically far from the problems they're trying to solve. A Silicon Valley billionaire deciding which education nonprofits deserve funding has less relevant information than the teachers, parents, and students in those communities. Philanthropy solves the capital problem while creating an information problem.

**Tax-advantaged wealth preservation.** In the United States, donor-advised funds (DAFs) now hold over $230 billion — money that has received a tax deduction as "charitable giving" but hasn't actually reached any charity. DAF holders face no mandatory payout timeline. The philanthropic infrastructure has become, in significant part, a tax optimization vehicle for the wealthy.

**Overhead obsession.** The fixation on "low overhead ratios" as a measure of nonprofit effectiveness has perversely pushed organizations to underinvest in their own capacity, staff, and systems. A nonprofit that spends 5% on overhead and fails is rated higher than one that spends 25% on overhead and succeeds. The metric has become the goal, and the goal has become pathological.

**Power concentration without accountability.** Philanthropic foundations are among the least accountable institutions in democratic societies. They are not elected, not market-disciplined, and (beyond minimal legal requirements) not answerable to the communities they serve. Their priorities reflect their founders' worldviews, social networks, and personal interests — which may or may not align with the most pressing public needs.

## How Government Grants Broke

Government-funded grants and public investment were supposed to fill the gaps that private charity couldn't. In many areas, they have. But the system has calcified:

**Bureaucratic overhead.** Federal grant applications routinely require months of preparation, hundreds of pages of documentation, and specialized grant-writing expertise. This selects for large institutions with dedicated grant offices, not for the most promising work. Small organizations and independent researchers — often the most innovative — are systematically excluded.

**Political capture.** Government funding priorities are shaped by political cycles, lobbying, and constituency pressures. Research funding follows political trends rather than research needs. Infrastructure investment follows electoral maps rather than engineering assessments.

**Risk aversion.** Government grant programs are structurally risk-averse because failure is politically costly. This produces a portfolio biased toward incremental, consensus-backed work rather than the high-variance, high-upside experiments that generate breakthroughs.

**Slow adaptation.** Government funding programs take years to establish and reform. By the time a program is funded, staffed, and operational, the landscape may have shifted. In fast-moving fields (AI safety, climate tech, pandemic preparedness), this latency is potentially fatal.

## The Root Problem: Information and Authority Are Misaligned

Both philanthropy and government grants suffer from the same structural deficiency: the entities with capital allocation authority don't have the best information about where capital should go, and the entities with the best information don't have allocation authority.

A donor in New York deciding which climate projects in Southeast Asia to fund has less relevant information than local communities, researchers, and practitioners. A federal program officer deciding which open-source software projects to support has less relevant information than the developers and users of those projects.

The current system attempts to bridge this gap with intermediaries — program officers, consultants, review committees — but these add cost, introduce their own biases, and slow the process further.

## Network-Based Funding: A Different Architecture

Network-based funding systems address the root problem by distributing allocation authority to the people with relevant information. The architecture is fundamentally different:

**Quadratic funding** lets community members signal which public goods they value, then amplifies those signals with matching funds. The key insight is that the *breadth* of support matters more than the *depth* — many small contributions weighted more heavily than a few large ones. This aggregates distributed information about community needs into a coherent funding allocation without requiring any central authority to have that information.

**Retroactive funding** inverts the temporal logic: instead of trying to predict which projects will succeed (a task donors and program officers are bad at), it rewards projects after they've demonstrated impact. This eliminates the need for prediction — the most error-prone part of the current system — and replaces it with evaluation, which is fundamentally easier.

**Conviction voting** allows token holders to signal the intensity of their preferences over time, directing funding streams toward proposals that accumulate sustained community support. This filters for durable priorities rather than momentary enthusiasm.

**Commitment pooling** enables funders to make conditional commitments — "I'll fund this if enough others do too" — solving the coordination problem that prevents many public goods from being funded even when everyone wants them funded.

## What Network-Based Funding Changes

The shift from centralized to network-based funding changes more than efficiency. It changes power.

**From gatekeepers to protocols.** In the current system, access to funding depends on relationships with gatekeepers — foundation program officers, government bureaucrats, well-connected intermediaries. In network-based systems, access depends on community support. The protocol is the gatekeeper, and its rules apply equally to everyone.

**From prediction to evaluation.** The current system forces funders to predict which projects will succeed, then locks in those predictions through multi-year grants. Network-based systems can be more adaptive: smaller allocations, faster feedback loops, retroactive rewards for demonstrated value.

**From donor values to community values.** Quadratic funding doesn't ask "what does the donor want to fund?" It asks "what does the community value?" This is a fundamental shift in whose preferences shape resource allocation.

**From one-shot to continuous.** Traditional grants are discrete events — apply, wait, receive, report. Network-based funding can be continuous: streaming payments, ongoing conviction signals, rolling retroactive evaluations. This matches the continuous nature of public goods production better than the batch processing model of traditional grants.

## The Remaining Challenges

Network-based funding is not a solved problem. Several hard challenges remain:

**Sybil resistance.** If funding allocation is driven by community signals, attackers can create fake identities to manipulate those signals. Sybil resistance is the network-funding equivalent of election integrity — essential, technically difficult, and an active area of innovation.

**Attention and participation.** Distributing allocation authority requires people to actually participate. Voter fatigue, information overload, and the rational ignorance problem (it's not worth my time to research every project) are real. Delegation mechanisms, curation layers, and AI-assisted information aggregation can help.

**Scale.** Quadratic funding rounds on Gitcoin have allocated tens of millions of dollars — meaningful, but small relative to the hundreds of billions in traditional philanthropy and government grants. Scaling network-based funding requires building trust, demonstrating effectiveness, and creating on-ramps for institutional capital.

**Capture resistance.** Any funding system can be captured. Network-based systems are resistant to the forms of capture that plague traditional philanthropy (donor preferences) and government grants (political influence), but they may be vulnerable to new forms: whale manipulation, narrative capture, collusion. Ongoing mechanism design research is essential.

## The Path Forward

The current philanthropic and government grant systems will not be replaced overnight. The transition path is:

1. **Demonstrate effectiveness** at small scale — which Gitcoin Grants, Optimism RetroPGF, and other onchain funding programs are already doing
2. **Build the evidence base** — rigorous evaluation of which mechanisms produce the best outcomes under which conditions
3. **Create on-ramps** for institutional capital — making it easy for foundations, governments, and corporations to deploy capital through network-based mechanisms
4. **Expand the scope** from crypto-native public goods to broader commons: climate, education, health, infrastructure

The goal is not to eliminate philanthropy or government funding, but to rewire their allocation mechanisms. The capital can come from anywhere. The innovation is in how it's directed — and the answer is: by the people who know where it should go.
