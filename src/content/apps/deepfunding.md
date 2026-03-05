---
id: '1741168800001'
slug: deepfunding
name: "DeepFunding"
shortDescription: "AI-powered platform for evaluating and funding public goods projects using machine learning and community input."
tags:
  - ai
  - public-goods
  - capital-allocation
  - grants
lastUpdated: '2026-03-05'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - direct-grants
relatedApps:
  - gitcoin-grants-stack
  - allo-protocol
  - optimism-retropgf
relatedCaseStudies: []
relatedResearch:
  - deep-funding-visual-guide
relatedCampaigns: []
banner: /content-images/apps/deepfunding/banner.png
---

**Deep Funding** is a mechanism and platform designed by Vitalik Buterin for allocating resources across complex open source dependency networks. Rather than asking "how much did project X contribute to humanity?" in isolation, Deep Funding reframes the question as "how much of the credit for outcome Y belongs to project X?" It then uses an open market of AI models to propose answers, with a human jury randomly spot-checking them for accuracy. The result is a scalable, transparent system for distributing funding across the thousands of repositories that underpin critical infrastructure like Ethereum.

Vitalik Buterin provided an initial sponsorship of $250,000 to launch the project, with the prize pool split across three categories: $170,000 allocated to open source projects based on their computed dependency weights, $40,000 awarded to the AI model that best aligns with jury spot checks, and $40,000 distributed to the best open source model submissions.

## What This App Does

Deep Funding provides infrastructure for AI-assisted evaluation and allocation of public goods funding across software dependency graphs.

In practice, it enables:

* **Ecosystem foundations** to distribute funds across hundreds or thousands of upstream dependencies without manually evaluating each one
* **AI researchers and data scientists** to compete in building models that accurately predict dependency importance, with prize incentives
* **Human jurors** to provide ground-truth evaluations on randomly sampled edges, steering the overall allocation without reviewing every relationship
* **Open source maintainers** to receive funding proportional to the importance of their projects within the broader dependency network
* **Communities** to explore and understand the Ethereum dependency graph and how value flows through it

## Features

### Value as a Graph

At the core of Deep Funding is a dependency graph representing the relationships between open source repositories. The initial graph is seeded from the primary repositories of Ethereum consensus clients (Prysm, Lighthouse, Teku, Nimbus, Lodestar, Grandine) and execution clients (go-ethereum, Nethermind, Besu, Erigon, Reth). The graph extends two hops from these core repos, capturing over 40,000 edges connecting the libraries, frameworks, and tools that Ethereum depends on.

Each edge in the graph carries a weight representing how much credit flows from one project to another. The challenge is filling in all of these weights accurately, which is where the AI competition comes in.

### AI Model Competition

Deep Funding runs open competitions where participants submit models that propose weights for the dependency graph. These models can use any methodology: machine learning, heuristic analysis, network centrality measures, or hybrid approaches. The models compete to produce weight assignments that best match the evaluations of the human jury.

Competitions are hosted on platforms like Kaggle, making them accessible to data scientists and ML practitioners worldwide. Participants submit detailed write-ups alongside their models, with a $25,000 prize pool available for model submissions to the Ethereum dependency graph challenge.

### Distilled Human Judgment

Rather than requiring humans to evaluate every single edge in a 40,000-edge graph, Deep Funding uses a spot-check approach. A human jury performs detailed analysis of randomly sampled edges, producing ground-truth evaluations. The AI model whose proposed weights are most consistent with the jury's findings determines the final allocation.

This approach scales human judgment efficiently: a small number of carefully evaluated samples can validate an entire graph of AI-generated weights, combining the breadth of machine analysis with the depth of human evaluation.

### Transparent Allocation

All dependency graph data, model submissions, and allocation results are published openly. The project maintains a public GitHub repository with the dependency graph data and documentation, allowing anyone to audit the methodology and verify the results.

## Use Cases

### Funding Ethereum Core Infrastructure Dependencies

The primary use case for Deep Funding is distributing resources across the open source projects that Ethereum depends on. Consensus and execution clients rely on thousands of upstream libraries for cryptography, networking, serialization, and other functions. Deep Funding maps these relationships and allocates funding proportionally, ensuring that critical but overlooked dependencies receive support based on their actual importance to the network.

### Scaling Public Goods Evaluation

Traditional grants programs require manual evaluation of each applicant, which becomes impractical as the number of potential recipients grows into the thousands. Deep Funding demonstrates an alternative: by framing allocation as a graph problem and leveraging AI models validated by human spot-checks, ecosystems can distribute funds across far more recipients than any committee could manually review.

### AI-Assisted Grant Making

Deep Funding serves as a proving ground for AI-assisted decision-making in public goods funding. The open competition format generates a diversity of approaches and creates a benchmark dataset of human evaluations against which models can be measured. Insights from these competitions can inform AI-assisted evaluation in other funding contexts beyond dependency graphs.

### Cross-Ecosystem Dependency Funding

While the initial focus is Ethereum, the methodology is generalizable. Any ecosystem with a software dependency graph can apply the same approach: map the dependencies, run an AI competition to propose weights, validate with human spot-checks, and distribute funds accordingly. This makes Deep Funding a potential template for dependency funding across the broader open source ecosystem.

## Further Reading

* [**Deep Funding Homepage** -- deepfunding.org](https://www.deepfunding.org/)
* [**Deep Funding Dependency Graph** -- GitHub](https://github.com/deepfunding/dependency-graph)
* [**Deep Funding: A Prediction Market for Open Source Dependencies** -- Ethereum Research](https://ethresear.ch/t/deep-funding-a-prediction-market-for-open-source-dependencies/23101)
* [**Vitalik Buterin on Deep Funding** -- X](https://x.com/VitalikButerin/status/1867886974058520820)
* [**Deep Funding: A Visual Guide in 3 Easy Steps** -- Gitcoin Governance](https://gov.gitcoin.co/t/deep-funding-a-visual-guide-in-3-easy-steps/19765)
