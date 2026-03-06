---
id: '1741168800004'
slug: tea-protocol
name: "Tea Protocol"
shortDescription: "Protocol for funding open source software through staking on packages, rewarding maintainers based on community support."
tags:
  - open-source
  - staking
  - dependencies
  - infrastructure
lastUpdated: '2026-03-05'
relatedMechanisms:
  - token-streaming
  - impact-attestations
relatedApps:
  - drips
  - protocol-guild
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
banner: /content-images/apps/tea-protocol/banner.png
---

**Tea Protocol** is a decentralized protocol that rewards open source software developers for their contributions by allowing community members to stake tokens on the packages they depend on. Created by Max Howell -- the original creator of Homebrew, one of the most widely used package managers in the world -- Tea addresses the fundamental sustainability problem in open source: the software that powers the modern internet is overwhelmingly maintained by unpaid volunteers with no systematic way to capture the value their work creates.

Tea's approach is built on a novel consensus mechanism called Proof of Contribution, which quantifies the impact of every open source project in the ecosystem by analyzing its position within the global software dependency graph. Each project receives a dynamic score called its **teaRank**, analogous to Google's PageRank but applied to software packages. Community members stake TEA tokens on projects they trust and rely on, and the protocol distributes rewards to both maintainers and stakers proportional to teaRank and stake contributions.

## What This App Does

Tea Protocol provides infrastructure for sustainable open source funding through staking, reputation scoring, and automated reward distribution.

In practice, it enables:

* **Open source maintainers** to register their packages and receive ongoing rewards based on the measured impact of their software
* **Developers and users** to stake TEA tokens on packages they depend on, signaling trust and sharing in reward flows
* **The ecosystem** to quantify the relative importance of open source projects through the teaRank algorithm
* **Package consumers** to contribute to the sustainability of their software supply chain by staking on upstream dependencies
* **Security researchers** to identify and report vulnerabilities through an integrated bug bounty system

## Features

### Proof of Contribution

Proof of Contribution is Tea's consensus mechanism for measuring the impact of open source projects. It assigns each registered project a teaRank score based on the project's position within the software dependency graph -- how many other projects depend on it, how widely those downstream projects are adopted, and how the project's usage evolves over time. teaRank is dynamic, updating as the dependency landscape changes, ensuring that projects receive credit proportional to their current importance rather than historical reputation alone.

The algorithm analyzes relationships across multiple package managers, building a comprehensive cross-ecosystem graph of how software components depend on each other.

### Cross-Ecosystem Package Integration

Tea integrates with major package managers including npm, Homebrew, PyPI, RubyGems, Crate (Rust), APT (Debian/Ubuntu), and pkgx (a cross-platform package manager also created by Max Howell). This broad integration allows Tea to map dependencies across programming languages and ecosystems, creating a unified view of the open source software supply chain rather than being limited to a single language or platform.

Maintainers register their packages on the Tea Protocol by linking their package registry identities, and the protocol automatically indexes their dependency relationships.

### Staking and Rewards

TEA is an ERC-20 token that serves as the staking and reward mechanism for the protocol. Token holders stake TEA on specific open source projects to signal trust and support. The protocol distributes rewards to both maintainers (based on their project's teaRank) and stakers (proportional to their stake), creating aligned incentives: stakers are rewarded for identifying and supporting impactful projects, while maintainers receive funding correlated with their software's actual usage and importance.

Staking also functions as a reputation signal. Projects with more stake carry a stronger community endorsement, which can inform dependency decisions and security assessments.

### Layer 2 Infrastructure

Tea Protocol operates on its own purpose-built Layer 2 network on Ethereum, enabling high-throughput reward distribution without the gas costs of mainnet transactions. The L2 includes a GPG/PGP precompile that embeds cryptographic identity verification directly into the network, enabling maintainers to prove ownership of their packages using their existing GPG keys.

### Security and Bug Bounties

Tea includes an integrated bug bounty system where security researchers can report vulnerabilities in registered packages. This creates a financial incentive for proactive security review of open source dependencies, addressing one of the most critical challenges in software supply chain security.

## Use Cases

### Maintainer Sustainability

Individual open source maintainers register their packages on Tea and receive ongoing rewards based on their teaRank. A maintainer of a widely-used cryptography library that appears deep in the dependency chains of thousands of projects would receive rewards reflecting that position, even if the library itself has limited public visibility. This addresses the "invisible infrastructure" problem where critical low-level libraries are chronically underfunded.

### Corporate Dependency Support

Companies that depend on open source software can stake TEA tokens on the packages in their dependency tree, providing financial support to maintainers while earning staking rewards. This creates a more sustainable alternative to one-time donations or sponsorships, establishing an ongoing funding relationship tied to actual dependency usage.

### Supply Chain Security Incentives

By tying staking reputation to package quality and security, Tea creates market incentives for maintaining secure software. Projects with unresolved vulnerabilities may see stakers withdraw, providing an economic signal that complements traditional security auditing. The integrated bug bounty system further incentivizes the security research community to proactively review registered packages.

### Cross-Language Dependency Mapping

Tea's integration across multiple package managers enables analysis of cross-language dependency relationships that are typically invisible. A Python data science library might depend on C extensions, which depend on system-level packages -- Tea maps these relationships across ecosystem boundaries, providing a more complete picture of the software supply chain.

## Further Reading

* [**Tea Protocol** -- tea.xyz](https://tea.xyz/)
* [**Tea White Paper** -- docs.tea.xyz](https://docs.tea.xyz/tea-white-paper/white-paper)
* [**Proof of Contribution** -- Tea Blog](https://tea.xyz/blog/proof-of-contribution)
* [**The TEA Token: Unlocking OSS Rewards** -- tea.xyz](https://tea.xyz/tea-token)
* [**Tea Protocol Tokenomics** -- Tea Blog](https://tea.xyz/blog/the-tea-protocol-tokenomics)
