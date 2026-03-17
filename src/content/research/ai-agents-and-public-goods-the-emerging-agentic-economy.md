---
id: '1741193200002'
slug: ai-agents-and-public-goods-the-emerging-agentic-economy
name: "AI Agents and Public Goods: The Emerging Agentic Economy"
shortDescription: "How AI agents are reshaping public goods funding, from Vitalik's Deep Funding vision to autonomous DAO governance, and what it means for capital allocation at scale."
tags:
  - ai
  - agents
  - public-goods
  - capital-allocation
  - deep-funding
  - web3
lastUpdated: '2026-03-05'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - direct-grants
relatedApps:
  - gitcoin-grants-stack
  - allo-protocol
relatedResearch:
  - deep-funding-visual-guide
  - d-acc-market-map
  - our-choices-our-world-thriving-together
relatedCaseStudies: []
relatedCampaigns: []
researchType: Report
banner: /content-images/research/ai-agents-and-public-goods-the-emerging-agentic-economy/banner.png
authors:
  - "Kevin Owocki"
---


---

## Introduction

The public goods funding problem has always been, at its core, an information problem. Which projects deserve funding? How much impact did they create? Who contributed what to whom? These questions require processing vast amounts of contextual information, exercising nuanced judgment, and doing so at a scale that overwhelms human cognitive capacity.

Enter AI agents.

The convergence of large language models, autonomous AI agents, and on-chain capital allocation infrastructure is creating a new paradigm for how public goods get funded. This is not a distant future scenario. In 2025 and 2026, we have witnessed the launch of Deep Funding, the maturation of agent frameworks like ElizaOS, the Ethereum Foundation's creation of a dedicated AI team, and Vitalik Buterin's sustained articulation of a vision where "AI becomes the engine, humans become the steering wheel."

This article examines how AI agents are entering the public goods funding ecosystem, the mechanisms being developed to harness their capabilities, the risks of getting it wrong, and what an agentic economy might look like when it matures.

## Deep Funding: Vitalik's Vision for AI-Powered Allocation

Deep Funding, launched with $250,000 in initial funding from Vitalik Buterin, represents the most ambitious attempt to date to use AI for public goods capital allocation. The mechanism is elegant in its design and combines two core ideas.

**Value as a graph.** Instead of asking the intractable question "how much did project X contribute to humanity?", Deep Funding asks the more tractable question "how much of the credit for outcome Y belongs to project X?" This reframes value attribution as a graph problem, where contributions flow through dependency chains. The Ethereum ecosystem's dependency graph alone contains over 40,000 edges connecting projects, libraries, tools, and infrastructure.

**Distilled human judgment.** Rather than relying on a single AI model or a single human committee, Deep Funding creates an open market of competing AI models that attempt to fill in the value weights across the dependency graph. A human jury then randomly spot-checks these AI assessments, creating a feedback loop where AI models are incentivized to approximate human judgment accurately.

The practical implementation launched as a Kaggle competition with a $250,000 prize pool: $170,000 allocated to projects based on the dependency graph weights, $40,000 to the best-performing AI model, and $40,000 to the best open-source model. Within two weeks, hundreds of models had been submitted, demonstrating significant interest from the AI and data science communities.

As Vitalik described it: "Deep funding combines two ideas: Value as a graph and distilled human judgment. An open market of AIs fills in all the weights, human jury randomly spot-checks them."

The implications extend far beyond Ethereum. If AI models can accurately approximate human judgment about value attribution in software dependency graphs, the same approach could be applied to scientific research, creative works, policy interventions, or any domain where contribution is distributed and impact is difficult to measure directly.

## The Agent Infrastructure Stack

Deep Funding represents one approach to AI-powered allocation, but a broader infrastructure stack is emerging that enables AI agents to participate in the entire lifecycle of public goods funding.

### ElizaOS and the Open-Source Agent Ecosystem

ElizaOS (formerly ai16z) is a TypeScript-based framework for building and deploying autonomous AI agents. Originally launched as a parody of Andreessen Horowitz's venture capital firm, it quickly evolved into one of the most widely adopted open-source agent frameworks in crypto. ElizaOS agents maintain consistent personalities and knowledge across platforms including X, Discord, Telegram, and on-chain applications.

What makes ElizaOS significant for public goods is its multi-chain support (Solana, Ethereum, Ton) and its capacity to interact with smart contracts, process blockchain data, and execute transactions autonomously. An ElizaOS agent can, in principle, evaluate a grant proposal, assess the applicant's on-chain history, compare it against similar projects, and cast a vote in a DAO governance process, all without human intervention.

The rebranding from ai16z to ElizaOS in January 2025, followed by the November 2025 integration with Chainlink's Cross-Chain Interoperability Protocol (CCIP), signaled a maturation from meme-driven experiment to serious infrastructure. The framework now supports agents operating across Ethereum, Base, BNB Chain, and Solana.

### The Ethereum Foundation's AI Team

In September 2025, the Ethereum Foundation announced the creation of a dedicated AI team with a specific mission: make Ethereum the primary platform for AI agents. The team's focus areas include mechanisms that let AI agents make payments, coordinate actions, and comply with rules without intermediaries, while building open alternatives to prevent AI control by a few corporations.

This institutional commitment represents a recognition that AI agents will be first-class participants in on-chain ecosystems, not just tools used by humans but autonomous actors with their own wallets, reputations, and decision-making capabilities.

### ERC-8004 and Agent Discovery

A key challenge in the agentic economy is trust: how do you know which agents are competent, honest, and aligned with your community's values? The proposed ERC-8004 standard aims to solve this by enabling on-chain agent discovery and reputation. Agents would register their capabilities, track record, and audit history on-chain, allowing DAOs and funding mechanisms to select agents based on verifiable performance data rather than marketing claims.

## AI Agents in DAO Governance

The integration of AI agents into DAO governance is already happening, and the implications for public goods funding are significant.

### Treasury Management

DAOs collectively manage billions of dollars in treasury assets, but manual treasury management costs the average DAO approximately 12.4% in potential yields annually, according to recent analyses. AI-powered treasury management tools like TreasuryGPT analyze on-chain data across multiple networks to identify yield opportunities while adhering to DAO-specified risk parameters.

For public goods-focused DAOs, this means AI agents can optimize treasury yields to maximize the capital available for grants, automatically rebalance portfolios based on market conditions, and execute diversification strategies without requiring governance votes for routine operations.

### Proposal Evaluation

AI agents can analyze grant proposals against a DAO's stated priorities, assess the track record of applicants through on-chain history, compare proposed work against similar projects in the ecosystem, and flag potential Sybil attacks or gaming attempts. Several platforms, including Theoriq and Shinkai, now offer governance tools that integrate AI evaluation into the proposal review process.

### The Shift to Constraint-First Governance

As autonomous agents take on more governance responsibilities, the cultural model of DAO governance is shifting. In 2026, the emerging paradigm is "constraint-first governance," where communities spend less time arguing sentiment and more time setting clear mandates, permissions, and liability frameworks. AI agents operate within these constraints, and human governance focuses on defining and adjusting the constraints rather than making individual allocation decisions.

This represents a meaningful evolution from the early days of DAO governance, where every funding decision required a community vote. In a constraint-first model, the community votes on strategy, risk parameters, and values, and AI agents execute within those boundaries.

## The GreenPill Perspective

The GreenPill podcast has devoted significant attention to the intersection of AI agents and public goods. In Season 10, Episode 10, Austin Griffith and Zak Cole joined Kevin Owocki for a builder-focused conversation on AI agents, OpenClaw, and the emerging agentic economy on Ethereum. The discussion went deep on practical implementation: hardware setups, coordination layers, adversarial review loops, memory systems, and on-chain reputation.

Key insights from the conversation include the importance of giving agents defined roles, audit mechanisms, and social contracts rather than unconstrained autonomy. They explored how ERC-8004 could enable agent discovery and trust, and why Ethereum's settlement guarantees make it a natural coordination layer for autonomous AI agents.

Separate episodes explored Deep Funding with Vitalik Buterin and Devansh Mehta, diving into the technical and philosophical foundations of using AI to scale human judgment for ecosystem funding. The ElizaOS episode with Shaw (the project's creator) examined how open-source agent frameworks can prevent the concentration of AI capabilities in the hands of a few corporations.

## d/acc: The Philosophical Framework

Vitalik Buterin's "d/acc" framework (decentralized, democratic, and differentiated defensive acceleration) provides the philosophical context for understanding AI agents in public goods. The core premise is that AI should be deployed in ways that shift the offense/defense balance toward defense, without concentrating power in centralized authorities.

Applied to public goods funding, d/acc suggests several principles:

**Decentralized AI over centralized AI.** Rather than relying on a single AI model to make allocation decisions, mechanisms like Deep Funding create markets of competing models. This prevents any single model's biases from dominating and creates pressure for continuous improvement.

**AI as amplifier, not replacement.** In his February 2025 essay "AI as the engine, humans as the steering wheel," Vitalik argued that the dystopian scenario is "AI becomes the government," while the empowering scenario is AI used to "push the frontier of democratic and decentralized modes of governance." AI agents should make participation easier and decisions better-informed, not remove humans from the loop.

**Open-source and verifiable.** Deep Funding's prize for open-source models reflects a commitment to AI systems that can be audited, forked, and improved by anyone. This is essential for public goods infrastructure, where trust requires transparency.

**Resilience through diversity.** The "info finance" model Vitalik proposed envisions an open market of competing AI models evaluated by a human jury, providing model diversity and built-in incentives to identify and fix issues. This is antifragile by design: the system gets stronger as more models compete and more failure modes are discovered.

## Risks and Failure Modes

The integration of AI agents into public goods funding is not without significant risks.

### Gaming and Manipulation

Vitalik himself has warned that "if AI is used to allocate funding for projects, people will inevitably start hacking the algorithm and demanding resources by any means." Any AI-powered allocation system creates incentives for applicants to optimize for the AI's evaluation criteria rather than genuine impact. This is the Goodhart's Law problem applied to capital allocation: when a measure becomes a target, it ceases to be a good measure.

Deep Funding's design addresses this partially through randomized human spot-checking, but the arms race between allocation algorithms and gaming strategies is likely to be ongoing.

### Alignment

AI agents that manage public goods funding must be aligned with community values, not just technically competent. An agent optimizing for measurable metrics might systematically undervalue projects with diffuse, long-term, or hard-to-quantify impact, precisely the kinds of projects that public goods funding is supposed to support.

### Concentration of Power

If a small number of AI models or frameworks come to dominate public goods allocation, the result could be a new form of centralization more opaque than the systems it replaced. The emphasis on open-source frameworks and competing models is intended to prevent this, but market dynamics tend toward consolidation.

### Accountability Gaps

When an AI agent makes a bad funding decision, who is responsible? The agent's developers? The DAO that deployed it? The community that set its constraints? The accountability frameworks for autonomous agents in governance are still underdeveloped, and the consequences of errors can be significant.

### Sybil Attacks at Scale

AI agents can generate convincing fake identities, fabricated track records, and synthetic social proof at scale. Without robust identity verification (Proof of Humanity, soulbound tokens, or equivalent), AI-powered Sybil attacks could overwhelm allocation mechanisms that rely on the assumption of unique human participants.

## What the Agentic Economy Looks Like

If these developments continue on their current trajectory, the public goods funding ecosystem of 2027-2028 might look something like this:

**Discovery.** AI agents continuously scan the ecosystem for underfunded public goods, identifying dependency relationships, usage patterns, and impact signals that human evaluators would miss.

**Evaluation.** Multiple competing AI models assess projects against community-defined criteria, with their assessments visible on-chain and subject to human spot-checking.

**Allocation.** Capital flows through programmable mechanisms (quadratic funding, retroactive funding, direct grants) with AI agents handling routine evaluation and humans focusing on edge cases, appeals, and strategic direction.

**Monitoring.** Post-funding, AI agents track project progress, milestone completion, and impact metrics, flagging concerns for human review.

**Iteration.** The entire system improves continuously as models compete, failure modes are discovered, and human juries refine their spot-checking criteria.

This is not a world without human judgment. It is a world where human judgment is applied where it matters most, amplified by AI where scale is needed, and kept honest by competition and transparency.

## Conclusion

The emerging agentic economy represents both an opportunity and a responsibility for the public goods funding community. AI agents can solve the information processing bottleneck that has limited the scale and accuracy of capital allocation. Deep Funding's dependency graph approach, combined with open markets of competing AI models and human spot-checking, offers a template for how to harness AI capabilities without surrendering human agency.

But the design choices being made now will determine whether AI agents become instruments of genuine public benefit or sophisticated tools for gaming and concentration. The principles of d/acc, open-source infrastructure, decentralized competition, and human oversight, are not just philosophical preferences. They are engineering requirements for systems that serve the public good.

The engine is being built. The question is who holds the steering wheel.
