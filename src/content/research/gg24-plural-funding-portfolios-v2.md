---
id: '1779291298245'
slug: gg24-plural-funding-portfolios-v2
name: "From Single-Mechanism Grants to Plural Funding Portfolios: Lessons from Gitcoin Grants 24"
shortDescription: "An analysis of how Gitcoin Grants 24 matched quadratic funding, Deep Funding, MACI, retroactive funding, conviction voting, and milestone grants to different public-goods evaluation problems."
banner: /content-images/research/gg24-plural-funding-portfolios-v2/banner.png
tags:
  - "gitcoin"
  - "gg24"
  - "quadratic-funding"
  - "plural-funding"
  - "public-goods"
  - "retroactive-funding"
  - "maci"
  - "deep-funding"
lastUpdated: '2026-05-20'
authors:
  - "wognsdl2.bnb"
relatedMechanisms:
  - quadratic-funding
  - deep-funding-ai-pgf
  - retroactive-funding
  - conviction-voting
  - impact-certificates-hypercerts
relatedApps:
  - gitcoin-grants-stack
  - giveth
  - karma-gap
  - optimism-retropgf
relatedCaseStudies:
  - gg24-the-first-funding-round-of-gitcoin-3-0
  - gg24-oss-qf-on-giveth-retrospective
  - gg24-interop-round-retrospective
  - gg24-solutions-development-grants-retrospective
  - gg24-privacy-round-retrospective
relatedResearch:
  - mechanism-pluralism-why-no-single-funding-model-works
  - retroactive-funding-the-most-scalable-new-pattern-in-public-goods
relatedCampaigns:
  - gitcoin-grants-24
researchType: Analysis
---

## Summary

Gitcoin Grants 24 (GG24) is useful because it did not merely run another quadratic funding round. It tested a portfolio of funding mechanisms across different public-goods domains: Quadratic Funding, Deep Funding, MACI private voting, Conviction Voting, Retroactive Funding, and peer-reviewed Hypercerts. This makes GG24 a strong case study for a practical question facing Ethereum public-goods funders: when should a funding program use one mechanism, and when should it combine several mechanisms?

The main lesson is that plural funding should not be treated as a fashionable bundle of tools. It works best when each mechanism is matched to a specific evaluation problem. Quadratic Funding is useful for surfacing broad community preference. Metrics-based or retroactive methods are better when the impact already exists and can be observed. Expert review is useful when the work is technically important but difficult for ordinary donors to evaluate. Private voting is useful where social pressure or collusion could distort choices. A plural funding portfolio is strongest when these differences are explicit before the round begins.

## Why GG24 Matters

Earlier Ethereum grants rounds often centered on one dominant mechanism. That simplicity made participation easier, but it also compressed very different funding problems into one process. Developer tooling, privacy infrastructure, interop analytics, climate-related work, public-goods research, and adoption programs do not all have the same evaluation needs.

GG24 moved toward a domain allocator model. Funding was organized around six domains rather than a single undifferentiated pool. According to Gitcoin's campaign page, GG24 distributed about $1.8 million across six domains, with $1.175 million from Gitcoin and $632.5 thousand from external partners. The round also separated the primary QF donation window from longer building and evaluation phases, which allowed different mechanisms to operate on different timelines.

This matters because public-goods funding is not only a capital allocation problem. It is also an information problem. Funders need to know what work exists, who benefits, whether the work is technically credible, and whether the reported impact is real. No single mechanism solves all of these problems well.

## Mechanism Fit by Evaluation Problem

### 1. Quadratic Funding: broad preference discovery

In GG24, the Developer Tooling and Infrastructure QF round funded 55 projects from 1,028 unique donors and 2,361 donations, with $29,739 in direct contributions and a $200,000 USDC matching pool. The Interop Standards, Infrastructure, and Analytics QF round funded 23 projects from 328 unique donors and 681 donations, with $6,918 in direct contributions and a $100,000 matching pool.

These numbers show QF doing what it is meant to do: turning many small donor signals into a matching allocation. The strength is breadth. Projects with many genuine supporters can surface even when individual donations are small.

The limitation is also visible. QF is less reliable when the relevant public good is technically deep, under-visible, or hard for donors to compare. Gitcoin's own GG24 summary notes that in the Interop domain, capital clustered around analytics and visibility tools while QF was less effective at surfacing deeper infrastructure work. That does not mean QF failed. It means QF answered a specific question: "What does the visible donor community recognize and support?" It should not be mistaken for a complete technical review.

### 2. Deep Funding and expert review: hard-to-evaluate technical work

The Developer Tooling and Infrastructure domain combined QF with Deep Funding through Seer prediction markets. Gitcoin reports that Deep Funding evaluated 98 eligible repositories through roughly 500 evaluations from 50 evaluators.

This mechanism is better suited to work where ordinary donors may not have enough context. Repository quality, maintainability, dependency importance, and long-term ecosystem value are difficult to assess through small donations alone. A prediction-market or expert-evaluation layer can add information that QF does not capture.

The tradeoff is complexity. Expert and market-based systems need clear evaluation criteria, credible evaluators, and transparency about how scores translate into funding. Otherwise, participants may understand the donor side of the round but not the evaluator side.

### 3. MACI private voting: reducing pressure and collusion

The Privacy domain used MACI private voting through Privote. Gitcoin reports 93 accepted projects, 7,427 QF votes, 35.41 WETH raised, and about $13,000 in community donations.

Private voting fits privacy funding especially well. Privacy projects can be socially sensitive, and visible voting can create pressure, coordination games, or reputational signaling. MACI does not automatically make outcomes better, but it protects the voting process from some forms of coercion and post-vote retaliation.

The limitation is usability. Private voting mechanisms are harder for casual participants to understand than a normal donation interface. Future rounds should measure not only vote count, but also user drop-off, failed interactions, and participant comprehension.

### 4. Retroactive funding: rewarding observed impact

GG24 included Retroactive Funding through Karma and related tooling in public-goods R&D and targeted development domains. Retroactive funding is attractive because it pays for demonstrated impact rather than promises.

This makes it useful for public-goods work with visible outputs: shipped tools, documented adoption, measurable usage, or completed research. It is weaker for early-stage work that has not yet produced measurable impact, and for infrastructure whose value is indirect.

Optimism's Retro Funding 4 provides a helpful comparison. RF4 explicitly experimented with metrics-based voting. Optimism's documentation frames the thesis as using quantitative metrics to help badgeholders express preferences and judge delivered impact more accurately. That experiment shows both the promise and risk of retroactive funding: metrics can reduce guesswork, but they can also narrow attention to what is easiest to measure.

### 5. Conviction Voting and milestone grants: sustained support

GG24's Solutions Development Grants Program approved 19 projects with grants ranging from $2.5 thousand to $20 thousand. This type of structure fits work that needs ongoing coordination, milestones, and review.

Milestone funding is less open-ended than QF and less retrospective than retro funding. Its strength is accountability. Its weakness is administrative overhead. A good plural funding portfolio should reserve milestone grants for work where execution risk is high and funders need checkpoints.

## What GG24 Suggests for Future Rounds

### Lesson 1: Start with the evaluation problem, not the mechanism

Funding rounds should first define what they need to learn:

- Does this domain need broad community preference?  
- Does it need expert technical evaluation?  
- Does it need private voting?  
- Does it need proof of already-delivered impact?  
- Does it need milestone accountability?

Only then should the mechanism be chosen. GG24's strongest design move was matching multiple domains with different tools rather than forcing one mechanism across all domains.

### Lesson 2: QF should be paired with complementary review in technical domains

QF is still valuable, but it should not carry the full evaluation burden for deep infrastructure. Donor preference can be one signal among several. For developer tooling, client infrastructure, security tooling, and interop standards, a combined model is likely healthier:

- QF for community recognition  
- expert or market-based evaluation for technical depth  
- retroactive assessment for observed adoption

This reduces the chance that only visible, easy-to-understand projects win.

### Lesson 3: Plural funding needs explainability

A plural funding round can be fairer than a single-mechanism round, but it can also be harder to understand. Participants need to know:

- why their domain uses a specific mechanism  
- what actions affect funding  
- how sybil resistance works  
- how matching or scoring is calculated  
- when results become final

If the process is too complex, trust can shift from the mechanism to the organizers. That weakens the credibility that mechanisms are supposed to provide.

### Lesson 4: Partner co-funding is a mechanism design constraint

GG24's external partners contributed 54% of total non-Gitcoin funding. That is not just a fundraising detail. Co-funders bring priorities, constraints, and definitions of impact. A plural funding portfolio must make those preferences visible without letting them silently distort the process.

Future reports should distinguish between:

- Gitcoin-funded allocations  
- partner-funded allocations  
- community-donation signals  
- mechanism-specific matching or scoring effects

That would make it easier to evaluate whether plural funding improves allocation quality or simply aggregates several funder agendas.

## Practical Framework

Based on GG24, a funding program can use this simple decision framework:

| Funding need | Best-fit mechanism | Main risk |  
| --- | --- | --- |  
| broad community preference | Quadratic Funding | visibility bias |  
| technical quality assessment | expert review or Deep Funding | evaluator opacity |  
| sensitive preference aggregation | MACI private voting | usability friction |  
| observed impact | Retroactive Funding | metric overfitting |  
| long execution cycle | milestone grants | admin overhead |  
| sustained community conviction | Conviction Voting | slow capital movement |

The point is not to use every mechanism. The point is to use the smallest set of mechanisms that covers the round's information needs.

## Conclusion

GG24 shows that Ethereum public-goods funding is moving from single-mechanism grant rounds toward funding portfolios. This is a healthy direction, but only if mechanism choice remains disciplined.

Plural funding should improve allocation by matching evaluation tools to domain-specific uncertainty. It should not become a confusing stack of governance experiments. GG24's numbers suggest that QF remains effective for broad preference discovery, while technical and impact-heavy domains benefit from complementary mechanisms. The next frontier is explainability: making plural funding understandable enough that builders, donors, evaluators, and co-funders can all see why a given project received support.

If future rounds publish clearer mechanism-level diagnostics, Ethereum funders will be able to compare not only which projects were funded, but which funding mechanisms were actually fit for purpose.

## Sources

- Gitcoin, "Gitcoin Grants 24": https://gitcoin.co/campaigns/gitcoin-grants-24-gg24  
- Gitcoin Governance, "GG24 OSS Quadratic Funding Results": https://gov.gitcoin.co/t/gg24-oss-quadratic-funding-results/24782  
- Gitcoin Governance, "GG24 OSS QF on Giveth Retrospective": https://gov.gitcoin.co/t/gg24-oss-qf-on-giveth-retrospective/24890  
- Optimism Docs, "RetroPGF Round 4": https://community.optimism.io/citizens-house/rounds/retropgf-4  
- Optimism Governance, "Retro Funding 4: Learnings and Reflections": https://gov.optimism.io/t/retro-funding-4-learnings-and-reflections/9271

### Authors

wognsdl2.bnb | https://bscscan.com/address/0xa7171310Be4f3a3541b5cf71A198949b9Ce7E5d2
