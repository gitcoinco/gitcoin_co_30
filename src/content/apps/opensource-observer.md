---
id: '1741168800002'
slug: opensource-observer
name: "Open Source Observer"
shortDescription: "Open analytics platform that measures the impact of open source projects through onchain and offchain data."
tags:
  - metrics
  - impact-measurement
  - open-source
  - analytics
lastUpdated: '2026-03-05'
relatedMechanisms:
  - impact-attestations
  - retroactive-funding
relatedApps:
  - gitcoin-grants-stack
  - optimism-retropgf
  - drips
relatedCaseStudies: []
relatedResearch:
  - retropgf-impact-measurement-evolution
relatedCampaigns: []
banner: /content-images/apps/opensource-observer/banner.png
---

**Open Source Observer** (OSO) is an open source, AI-driven data platform for measuring the impact of open source software projects. Built by Kariba Labs and co-founded by Carl Cervone and Raymond Cheng, OSO aggregates data from GitHub repositories, npm packages, onchain deployments, and other sources into a unified analytics layer. The platform was created to bring rigorous, data-driven evaluation to public goods funding decisions, replacing subjective assessments with verifiable impact metrics.

OSO maintains a directory of thousands of open source projects along with their associated artifacts -- git repos, package registries, smart contract deployments, and more. By indexing both offchain development activity and onchain usage data, OSO provides a comprehensive view of how open source projects are built, adopted, and used across the Ethereum ecosystem and beyond.

## What This App Does

Open Source Observer provides open data infrastructure for measuring and comparing the impact of open source projects.

In practice, it enables:

* **Retroactive funding programs** to evaluate applicants using verifiable impact metrics rather than self-reported narratives
* **Badgeholders and voters** to make data-informed allocation decisions using standardized metrics across all candidates
* **Project maintainers** to understand their project's reach, dependencies, and onchain footprint
* **Researchers and analysts** to query a comprehensive public dataset covering development activity, package dependencies, and onchain usage
* **Grant programs** to track portfolio performance over time and assess the effectiveness of past funding decisions

## Features

### Project Registry and Artifact Tracking

OSO maintains a comprehensive registry where each project is mapped to all of its known artifacts: GitHub repositories, npm packages, smart contract deployments, and other identifiable components. This artifact-level accounting enables precise attribution of activity to specific projects, avoiding the double-counting and misattribution problems that plague simpler metrics approaches.

The registry is community-maintained and open source, with new projects and artifact mappings contributed through the OSO GitHub repository.

### Impact Metrics Pipeline

The core of OSO is its data pipeline, which ingests raw data from multiple sources and transforms it into standardized impact metrics. The pipeline covers:

* **Development activity:** Commits, pull requests, contributors, code reviews, and repository growth from GitHub
* **Package adoption:** Downloads, dependents, and dependency graph position from npm and other package managers
* **Onchain usage:** Contract deployments, transactions, unique users, gas consumption, and TVL across multiple chains
* **Ecosystem participation:** Grant applications, funding received, governance participation, and attestations

All pipeline code is open source, and every model and query can be audited by anyone.

### BigQuery Data Exchange

OSO publishes live, up-to-date datasets on Google BigQuery through the OSO Data Exchange, available free of charge. These datasets include the complete OSO production pipeline output, source data for blocks, transactions, and traces across the OP Superchain (Optimism, Base, Frax, Metal, Mode, PGN, Zora), Gitcoin data, and OpenRank reputation scores. Researchers and analysts can query these datasets directly using SQL.

### GraphQL API

OSO applications are powered by a GraphQL API that provides programmatic access to project data, metrics, and collections. This enables third-party tools and dashboards to build on OSO data without maintaining their own indexing infrastructure.

### Optimism RetroPGF Integration

OSO has been deeply integrated with the Optimism Collective's Retro Funding program since RetroPGF Round 3. The platform developed suites of impact metrics specifically designed for evaluating RetroPGF applicants, working directly with the badgeholder community to refine which metrics matter most. By Season 7, OSO took on a more active role implementing the evaluation algorithms that determine how funding is allocated, moving from a passive data provider to an integral part of the allocation infrastructure.

## Use Cases

### Data-Driven Retroactive Funding

Optimism's Retro Funding program uses OSO to evaluate hundreds of applicant projects. For RetroPGF Round 4, OSO developed onchain impact metrics that measured each project's contribution to the Superchain ecosystem, including contract activity, user growth, and gas fees generated. Badgeholders used these metrics alongside qualitative evaluation to allocate millions of dollars in OP tokens, with OSO providing the quantitative foundation for informed decision-making.

### Cross-Ecosystem Grant Evaluation

Beyond Optimism, OSO has supported evaluation for Filecoin's first RetroPGF round and has received grants from Protocol Labs and Arbitrum. The platform's multi-chain data coverage allows grant programs across different ecosystems to use a common analytical framework, enabling comparisons and knowledge sharing across funding programs.

### Open Source Health Monitoring

Project maintainers and ecosystem stewards use OSO to monitor the health and growth of open source projects over time. By tracking contributor diversity, development velocity, and downstream adoption, OSO surfaces early warning signs of maintainer burnout or declining project health before they become critical.

### Research and Analysis

The open data pipeline and BigQuery access make OSO a resource for researchers studying open source sustainability, public goods funding effectiveness, and ecosystem dynamics. Academic researchers and independent analysts can reproduce OSO's metrics, build custom analyses, and contribute new models back to the platform.

## Further Reading

* [**Open Source Observer** -- opensource.observer](https://www.opensource.observer/)
* [**OSO Documentation** -- docs.opensource.observer](https://docs.opensource.observer/)
* [**Onchain Impact Metrics for Optimism Retro Funding 4** -- OSO Blog](https://docs.oso.xyz/blog/impact-metrics-rf4/)
* [**Open Source, Open Data, Open Infra** -- Raymond Cheng](https://kariba.substack.com/p/open-source-open-data-open-infra)
* [**An Interview with Carl Cervone** -- HackerNoon](https://hackernoon.com/an-interview-with-carl-cervone-on-open-source-digital-public-goods-funding-and-impact-tracking)
