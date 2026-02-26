---
id: '1770997163535'
slug: allo-protocol
name: "Allo Protocol"
shortDescription: "Open-source smart contracts for programmable onchain capital allocation and modular funding strategies."
logo: /content-images/apps/allo-protocol/logo.png
tags:
  - protocol
  - modular
  - grants
lastUpdated: '2026-02-13'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/apps/allo-protocol/banner.png
---

**Allo Protocol** is an open-source framework of EVM-compatible smart contracts for **programmable onchain capital allocation**. It allows communities, DAOs, and developers to create funding pools and distribute capital using modular, customizable allocation strategies.

Developed by Gitcoin, Allo abstracts the core primitives of capital allocation — **recipient registration, fund pooling, allocation logic, and distribution** — into composable building blocks that can be reused across funding programs and governance contexts.

Originally created as the smart contract backend for Gitcoin's quadratic funding rounds, Allo was later generalized into a standalone protocol capable of supporting a wide range of allocation mechanisms, including direct grants, RFPs, retroactive funding, and experimental mechanisms. From 2023 through May 2025, Allo served as the underlying protocol for Gitcoin Grants Stack and dozens of ecosystem funding programs.

Following the wind-down of Gitcoin Labs and Grants Stack in May 2025, Allo entered maintenance mode. While active development has ceased, the smart contracts remain deployed, open-source, and forkable, and historical data remains available via Open Source Observer.

## What This Protocol Does

Allo Protocol provides a **standardized onchain infrastructure for capital allocation**. It enables the creation of funding pools and the distribution of capital using programmable allocation strategies, without requiring custom smart contract development for each program.

In practice, it enables:

- **Custom funding applications** built on shared, audited allocation primitives  
- **DAOs and communities** to deploy funding pools with configurable eligibility, voting, and payout logic  
- **Grant programs** to run multiple allocation mechanisms through a single protocol layer  
- **Projects and builders** to maintain persistent onchain identities across funding programs  
- **Mechanism designers** to deploy and test new allocation strategies using a common interface

Allo's architecture treats capital allocation as a composable stack, separating pool management, recipient identity, allocation logic, and fund distribution into modular components that can be independently extended or replaced.

## Features

Allo Protocol provides a modular, open-source smart contract framework for programmable onchain capital allocation. It separates pool management, allocation logic, and recipient identity into distinct layers that can be configured, extended, or replaced independently.

### Core Components

- **Allo Core Contract (Allo.sol):** The central pool manager responsible for creating and managing funding pools, accepting deposits, and coordinating interactions with allocation strategies. Pools can be funded at creation or over time and are permanently associated with a specific strategy deployment.  
- **Allocation Strategies:** Modular smart contracts that define how capital is allocated and distributed within a pool. Allo includes reference strategies such as donation voting (quadratic funding), direct grants, and RFP-based allocation, and supports custom strategies built against a standard interface. Strategies govern recipient registration, allocation, and fund distribution.  
- **Project Registry:** An onchain registry of projects and contributors identified by persistent profile IDs. Profiles store metadata, membership information, and associated addresses, and generate Anchor contracts that can receive funds or interact with external systems. The Registry enables reusable onchain identity across funding programs.  
- **SDK and Developer Tooling:** A JavaScript/TypeScript SDK that simplifies interaction with Allo contracts, providing typed interfaces for pool creation, strategy deployment, and fund management.

### Protocol Characteristics

- **Mechanism-agnostic design:** Allocation logic is decoupled from pool management, allowing new mechanisms to be added without modifying core contracts.  
- **Multichain deployment:** Deployed across Ethereum mainnet and multiple L2s using consistent contract deployments.  
- **Open-source and forkable:** MIT-licensed and fully open-source, enabling independent audits, forks, and extensions.  
- **Identity and sybil-resistance integrations:** Supports integrations with Gitcoin Passport and other attestation systems for eligibility gating and allocation weighting.  
- **Permissionless pool creation:** Any address can create a funding pool and assign an allocation strategy without centralized approval.

## Use Cases

### Ecosystem Foundations Running Grants Programs

Foundations and DAOs use Allo as the onchain execution layer for structured grants programs. Program operators configure allocation strategies and distribute funds with transparent, verifiable settlement, while application logic and governance remain offchain or application-specific. Through Grants Stack, this pattern powered dozens of ecosystem partner rounds operated by Gitcoin, Sei, Polygon, and other L1/L2 communities.

### Developers Building Custom Funding Applications

Developers use Allo as a shared smart contract layer for building funding and allocation tools, deploying grants platforms, treasury tools, and experimental mechanisms without writing bespoke allocation contracts. Applications built on Allo include EasyRetroPGF (retroactive funding tooling used by Filecoin and Celo), Grant Ships (a competitive allocation model used in Arbitrum governance), and privacy-preserving voting mechanisms using zk-SNARKs.

### DAOs and Communities Allocating Treasury Capital

DAOs use Allo to deploy onchain treasury allocation programs with configurable strategies and auditable fund flows. Permissionless pool creation enables experimentation across allocation models — from simple direct grants to multi-stage programs — without maintaining custom smart contract infrastructure.

### Mechanism Researchers and Experimenters

Researchers use Allo's strategy interface to prototype and deploy new capital allocation mechanisms against a standard contract spec. Base strategy templates and a community-contributed strategy library lower the cost of experimentation while enabling comparative evaluation across mechanisms and ecosystems.

## Further Reading

- [**Allo Protocol Documentation** — Gitcoin](https://docs.allo.gitcoin.co/)  
- [**Introducing Allo v2** — Gitcoin Blog](https://www.gitcoin.co/blog/introducing-allo-v2)  
- [**Grants Stack Winds Down** — Gitcoin Blog](https://www.gitcoin.co/blog/grants-stack-winds-down--heres-whats-changing-and-what-to-expect)
