---
id: '1741107600000'
slug: deep-funding-visual-guide
name: "Deep Funding: A Visual Guide in 3 Easy Steps"
shortDescription: "A walkthrough of Deep Funding's three-step process—dependency mapping, a market of allocators, and expert verification—for funding open source software at scale."
tags:
  - deep funding
  - open source
  - mechanism design
  - ethereum
  - dependency mapping
  - ai
researchType: Report
lastUpdated: '2026-03-04'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch:
  - reforming-eth-public-goods-funding-2026
  - plural-funding-mechanisms
relatedCampaigns: []
banner: /content-images/research/deep-funding-visual-guide/banner.png
authors:
  - Kevin Owocki
---

> **TLDR:** Deep Funding skips the "evaluate every project" bottleneck by mapping value as a dependency graph, letting competing AI models fill in the weights, then randomly spot-checking with humans. Result: fund entire software ecosystems at scale without lobbying or popularity contests.


**Sources:**
- [Deep Funding Governance Post](https://gov.gitcoin.co/t/deep-funding-a-visual-guide-in-3-easy-steps/19765)
- [deepfunding.org](https://deepfunding.org)

## What is Deep Funding?

Deep Funding is a novel approach to funding open source software, introduced by Vitalik Buterin. Rather than asking human evaluators to individually assess every project, Deep Funding leverages dependency graphs, AI-assisted allocators, and expert spot-checking to distribute funding across an entire software ecosystem.

The core question it seeks to answer: **which open source dependencies are most important to Ethereum?**

The initial pilot allocated $170k in ETH to determine which open source software dependencies of Ethereum most merit funding—plus $80k in prizes for the best allocation models.

## The Scalability Problem

Current public goods funding mechanisms burden funders with evaluating each project individually. This creates a fundamental scaling problem:

- **Large evaluator groups** incentivize public campaigning and popularity contests
- **Small evaluator groups** encourage private lobbying and capture

Deep Funding proposes a way out of this tradeoff by decomposing the evaluation problem into smaller, more tractable pieces.

## Step 1: Dependency Mapping

![Step 1: Map the graph of dependencies](/content-images/research/deep-funding-visual-guide/step1-dependency-mapping.jpeg)

The foundation of Deep Funding is a dependency graph—a data layer that maps open source projects (vertices) and the relationships between them (edges).

For the Ethereum pilot, this means mapping roughly **40,000 dependencies** across the Ethereum software stack. Each edge in the graph represents a dependency relationship: Project A depends on Project B.

The key insight is that software dependencies are already structured as a graph. Rather than evaluating each project in isolation, Deep Funding uses this existing structure to propagate value attribution through the dependency tree.

## Step 2: Market of Allocators

![Step 2: Many human/AI agents decide which parts of the graph to reward](/content-images/research/deep-funding-visual-guide/step2-market-of-allocators.jpeg)

Rather than relying on a single committee or a single vote, Deep Funding creates a **public market of allocators**. Each allocator proposes edge weights that answer the question:

> "What percent of the credit for Project A belongs to its dependency Project B?"

With potentially millions of edge weights needed across the full dependency graph, AI assistance is not just welcomed—it's encouraged. Allocators can build models that analyze code usage, commit history, and other signals to propose weightings at a scale no human committee could achieve.

This step transforms the allocation problem from "evaluate every project" into "build the best model for attributing value through a dependency graph."

## Step 3: Expert Verification

![Step 3: Spot checking jury verifies which AI agents are best](/content-images/research/deep-funding-visual-guide/step3-expert-verification.jpeg)

A jury of domain experts performs **spot-checks** on the graph. Rather than evaluating every edge, they express preferences on randomly selected edges—determining which allocator models most closely align with expert judgment.

This is the elegance of the mechanism: experts don't need to evaluate everything. They only need to evaluate enough random samples to determine which AI-assisted allocators are producing the most credible weightings. The winning models then determine the full allocation.

## Prize Distribution

The pilot distributes funds across three categories:

- **$170k** to repositories based on winning model weightings
- **$40k** to models that best conform with jury spot-check results
- **$40k** for interesting open source model submissions

This incentive structure rewards both accurate allocation *and* open source tooling that the broader ecosystem can build upon.

## Why Deep Funding Matters

Deep Funding represents a significant advance in public goods funding mechanisms for several reasons:

1. **Scalability** — By decomposing evaluation into dependency mapping, AI-assisted allocation, and expert spot-checking, Deep Funding can scale to tens of thousands of projects without requiring proportional growth in human evaluation effort.

2. **Leveraging existing structure** — Software dependencies are already a graph. Deep Funding uses this inherent structure rather than imposing an artificial evaluation framework.

3. **AI-native** — Rather than treating AI as a threat to fair allocation, Deep Funding makes AI-assisted modeling a first-class participant in the mechanism.

4. **Expert efficiency** — Domain experts contribute where they add the most value: verifying the quality of models, not individually rating every project.

## Future Vision

The dependency graph model extends far beyond open source software. Any domain with citation or dependency structures could use this approach:

- **Scientific research** — Citation graphs could propagate funding to foundational papers
- **Music** — Sampling and influence chains could attribute value to source material
- **Legal systems** — Precedent chains could identify foundational jurisprudence
- **Journalism** — Source and investigation dependencies could fund upstream reporting

Deep Funding is one of the most promising frontiers in public goods funding—a mechanism designed for the scale and complexity of modern open source ecosystems.
