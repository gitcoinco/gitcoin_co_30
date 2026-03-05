---
id: '1741190400003'
slug: deep-funding
name: "Deep Funding (AI-PGF)"
shortDescription: "AI-powered public goods funding mechanism that uses machine learning to evaluate impact and allocate capital."
tags:
  - ai
  - capital-allocation
  - public-goods
  - automated
lastUpdated: '2026-03-05'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - direct-grants
  - impact-attestations
relatedApps:
  - gitcoin-grants-stack
  - allo-protocol
relatedCaseStudies: []
relatedResearch:
  - deep-funding-visual-guide
relatedCampaigns: []
banner: /content-images/mechanisms/deep-funding/banner.png
---

**Deep Funding** is an AI-powered public goods funding mechanism, conceived by Vitalik Buterin, that uses machine learning models to evaluate the dependency relationships between open-source projects and allocate capital based on upstream impact. Rather than asking the impossibly broad question "how much did project X contribute to humanity?", Deep Funding reframes allocation as a graph problem: "how much of the credit for outcome Y belongs to dependency X?" AI models propose weights across the edges of this dependency graph, and a human jury randomly spot-checks their answers to determine which models are most aligned with human judgment. The winning model's weights then govern how funds are distributed across the entire graph.

This mechanism sits at the frontier of a broader trend toward AI-assisted public goods funding (AI-PGF), which spans a spectrum from AI-augmented human decision-making — where algorithms surface information and recommendations while humans retain final authority — to AI-autonomous allocation, where models make binding funding decisions with minimal human oversight. Deep Funding occupies a specific point on this spectrum: AI models do the computationally intensive work of weighting thousands of dependency relationships, while humans maintain oversight through randomized auditing rather than reviewing every decision individually.

## How It Works

1. **Dependency graph construction:** The mechanism begins by mapping the dependency relationships between projects in an ecosystem. For the initial Ethereum implementation, this involves approximately 40,000 edges connecting open-source repositories to their upstream dependencies. The graph captures which projects rely on which other projects, forming the structural basis for credit attribution.

2. **AI model competition:** An open competition (hosted on platforms like Kaggle) invites anyone to submit AI models that propose weights for the edges of the dependency graph. Each model attempts to answer questions of relative credit: "How much of project A's value should be attributed to dependency B versus dependency C?" Models may use code analysis, usage metrics, community signals, or any other data sources available to them.

3. **Human jury spot-checking:** A panel of human jurors reviews a random subset of the dependency relationships. Jurors are asked simple comparative questions — for instance, "Does dependency A deserve more credit than dependency B for this outcome?" — rather than trying to assign absolute values. This reduces the cognitive burden on humans while still producing a ground-truth signal against which AI models can be evaluated.

4. **Model evaluation and selection:** The AI models are scored based on how well their proposed weights align with the human jury's spot-check answers. Models that best predict human judgment across the sampled edges are considered the most reliable for the full graph. The mechanism may use a single winning model or an ensemble of top-performing models to determine final weights.

5. **Fund distribution:** The winning model's weights are applied to the full dependency graph to determine how available funds are distributed. Projects that are weighted as critical upstream dependencies of many other projects receive proportionally more funding. In the initial round, Vitalik Buterin provided $250,000 in sponsorship, with $170,000 allocated to projects based on the dependency graph weights, $40,000 awarded to the best-performing AI model, and $40,000 reserved for open-source model submissions.

## Advantages

- **Scales human judgment:** Instead of requiring human reviewers to evaluate thousands of projects individually — an infeasible task for large ecosystems — Deep Funding uses AI to extrapolate from a manageable number of human spot-checks to the full dependency graph. This dramatically reduces the cost of high-quality evaluation.
- **Rewards upstream impact:** By structuring allocation around the dependency graph, Deep Funding directs resources to foundational infrastructure projects that enable downstream applications but are typically undervalued in popularity-based systems like quadratic funding. A critical cryptography library used by hundreds of projects would receive credit proportional to its actual influence.
- **Reduces popularity bias:** Traditional grant mechanisms tend to favor projects with strong marketing or large user communities. Deep Funding evaluates impact through structural relationships (who depends on what) rather than social signals (who has the most supporters), producing a different and potentially more accurate allocation signal.
- **Open and competitive model market:** Anyone can submit an AI model, creating a competitive market for allocation intelligence. This encourages innovation in evaluation methodology and prevents any single entity from controlling how impact is assessed.
- **Human-in-the-loop safety:** The spot-check mechanism ensures that AI allocation decisions remain grounded in human values. If a model produces weights that systematically diverge from human judgment, it will be detected and excluded.

## Limitations

- **Dependency graph completeness:** The mechanism is only as good as the underlying dependency graph. If important relationships are missing, misrepresented, or difficult to map (e.g., non-code dependencies like documentation, community building, or research), the resulting allocation will be skewed.
- **Narrow definition of impact:** Framing value exclusively through code dependencies biases the system toward technical infrastructure and away from other forms of public goods contribution — education, governance design, community organizing, and user experience work may be underrepresented.
- **Jury selection and bias:** The quality of the mechanism depends heavily on the composition and competence of the human jury. A small or unrepresentative jury can introduce systematic biases that propagate through the entire allocation via model training.
- **Gameable graph structure:** Projects could attempt to artificially inflate their position in the dependency graph by creating unnecessary dependencies, forking popular projects, or other forms of structural manipulation. The mechanism needs robust defenses against graph gaming.
- **Nascent and unproven at scale:** Deep Funding has completed only its initial rounds as of early 2026. The mechanism's performance across diverse ecosystems, larger funding pools, and repeated rounds remains to be demonstrated.
- **AI model opacity:** Complex machine learning models may produce weights that are difficult for humans to interpret or audit beyond the spot-check samples, creating a trust gap between the mechanism's outputs and community understanding of why specific allocations were made.

## Best Used When

- The ecosystem has a large number of interdependent projects that cannot feasibly be evaluated individually by human reviewers
- Upstream infrastructure and foundational dependencies are systematically underfunded relative to user-facing applications
- A well-structured dependency graph exists or can be constructed from code and package manager data
- The community wants to complement popularity-based mechanisms (like quadratic funding) with impact-based allocation
- There is a pool of qualified jurors willing to perform spot-check evaluations
- The funding entity is willing to experiment with AI-assisted allocation while maintaining human oversight

## Examples and Use Cases

**DeepFunding.org** is the flagship implementation, launched by Vitalik Buterin with an initial $250,000 sponsorship. The first round focused on the Ethereum dependency graph, comprising over 40,000 edges connecting open-source repositories. AI models competed on Kaggle to produce the most jury-aligned dependency weights, with the scoring mechanism supporting both "single-layer" comparisons (where jurors compare many items that contributed to one outcome) and "two-layer" comparisons (where jurors compare dependencies of an outcome and dependencies of each dependency). The project is developed in collaboration with eval.science and maintained as open-source infrastructure for future rounds.

**Optimism RetroPGF** has explored AI-assisted evaluation as a complement to its retroactive public goods funding rounds. While not implementing the full Deep Funding mechanism, Optimism's evolution toward metrics-based voting in Round 4 reflects the same underlying insight: human judgment alone cannot scale to evaluate hundreds of projects, and quantitative methods — including AI-derived signals — are needed to inform allocation decisions at ecosystem scale.

**Drips Protocol** operates a dependency-based funding model where projects can split incoming funds with their upstream dependencies. While Drips uses developer-configured splits rather than AI-determined weights, it addresses the same problem that Deep Funding targets: ensuring that foundational infrastructure receives fair compensation for the value it provides to downstream projects. Deep Funding's AI models could potentially be integrated with Drips' splitting infrastructure to automate dependency-aware fund distribution.

**Open Source Observer** provides the data infrastructure that makes mechanisms like Deep Funding possible. By collecting and standardizing metrics across the Ethereum ecosystem — including code contributions, user activity, dependency relationships, and onchain interactions — Open Source Observer creates the datasets that AI models need to evaluate impact. The relationship between data platforms and AI allocation mechanisms is symbiotic: better data produces better models, and the demand for AI-quality data incentivizes investment in measurement infrastructure.

## Further Reading

- [**Deep Funding** — deepfunding.org](https://www.deepfunding.org/)
- [**Deep Funding: Scaling Human Judgment for Open Source Funding** — Ethereum Zurich 2025](https://cfp.ducttape.events/ethereumzuri-ch-2025/talk/88NMV9/)
- [**A Brief Analysis of Deep Funding** — PANews](https://panewslab.com/en/articledetails/d19fc7vl.html)
- [**Deep Funding Scoring Mechanism** — GitHub](https://github.com/deepfunding/scoring)
- [**Deep Funding Dependency Graph** — GitHub](https://github.com/deepfunding/dependency-graph)
- [**Deep Funding Documentation** — eval.science](https://docs.eval.science/deep-funding)
