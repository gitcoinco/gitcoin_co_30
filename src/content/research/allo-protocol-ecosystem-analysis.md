---
id: '5'
slug: allo-protocol-ecosystem-analysis
name: "Allo Protocol: Correct Licensing (AGPL-3.0) + Update Current Status (v2 mainnets / 2.1 preview)"
shortDescription: "Correct Allo Protocol licensing claim (core contracts are AGPL-3.0), add current status (Allo v2 mainnets / Allo 2.1 Sepolia preview), and replace unsourced adoption figures with citable statements + primary sources."
tags:
  - "allo protocol"
  - "grants stack"
  - "infrastructure"
  - "capital allocation"
lastUpdated: '2026-05-21'
authors:
  - "Gitcoin Research"
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

banner: /content-images/research/allo-protocol-ecosystem-analysis/banner.png
---

**Type:** Analysis  
**Authors:** Gitcoin Research (community update)

**Primary Sources (specific + verifiable):**  
  * Allo Protocol Docs (Overview + Current Status + Grants Stack relationship): https://docs.allo.gitcoin.co/  
  * Allo v2 core contracts repository (License shown as AGPL-3.0): https://github.com/allo-protocol/allo-v2  
  * Allo Protocol GitHub org (SDK + docs + strategy starter repos): https://github.com/allo-protocol

## What is Allo Protocol?

Allo Protocol is a set of smart contracts for allocating and distributing capital. According to the official docs, it was developed by Gitcoin to power Grants Stack, but is useful beyond grants and quadratic funding.

## Architecture

### Core Components

1. **Registry**: Project/profile management  
2. **Pools**: Funding pools with configurable strategies  
3. **Strategies**: Pluggable allocation logic (quadratic, direct, milestone-based, etc.)

### Key Features (Updated)

* **Modular**: Mix and match components and strategies  
* **Multi-network**: Allo v2 is live on mainnets (see Allo docs for supported networks)  
* **Open source (Corrected)**: Core contracts (Allo v2) are open source and licensed under **AGPL-3.0** (not MIT)  
* **Ecosystem tooling**: The Allo GitHub org includes the core contracts, an SDK, documentation, and a strategy-starter template for building custom strategies

## Current Status (New Section)

* **Allo v2**: live on mainnets (supported networks referenced in docs)  
* **Allo 2.1**: preview on Sepolia (docs reference)

## Adoption / Usage (Updated to remove unsourced figures)

### Grants Stack

The Allo docs describe Grants Stack as a product layer built on Allo for operating grants programs. It powers self-serve funding rounds and supports a variety of mechanisms.

### Builder Ecosystem

The Allo Protocol GitHub org maintains multiple public repositories, including the core Allo v2 contracts, an SDK, documentation, and a strategy starter template—making it easier for third parties to integrate or extend the protocol.

## Strategy Library (examples)

Common strategy patterns enabled by Allo-style modularity include:  
* Quadratic Funding  
* Direct Grants / Committee allocation  
* Milestone-based / tranche release  
* RFP / request-for-proposal style rounds  
* Quadratic Voting (preference-based allocation)

## Lessons Learned

1. **Infrastructure enables innovation**: modular primitives reduce reinvention  
2. **Modularity matters**: different programs need different allocation logic  
3. **Multi-network support is practical**: programs operate across multiple chains  
4. **Developer experience drives adoption**: docs + SDK + templates matter
