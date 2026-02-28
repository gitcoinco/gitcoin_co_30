---
id: '1772310789324'
slug: drips
name: "Drips"
shortDescription: "Ethereum protocol for funding open source software through streaming and dependency splits."
logo: /content-images/apps/drips/logo.png
tags:
  - streaming
  - grants
  - infrastructure
lastUpdated: '2026-02-28'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Drips** is an Ethereum-based protocol and application for funding open source software through curated funding lists, token streaming, and automatic dependency splitting. Built by Drips Org within the Radworks ecosystem (alongside Radicle), Drips addresses the sustainability challenges of free and open source software (FOSS) by enabling structured, transparent funding flows across the software supply chain.

At the center of the system is the **Drip List**: a curated list of up to 200 GitHub repositories, Ethereum addresses, or other Drip Lists, each assigned a percentage share of incoming funds. Supporters can send ERC-20 tokens through one-time donations or continuous per-second streams. Accumulated funds are split across recipients monthly.

When maintainers claim funds, they can configure their own dependency lists and forward a percentage of earnings upstream. Over time, this creates a composable funding graph in which deeply nested dependencies receive funding indirectly from projects built on top of them.

In addition to dependency funding, Drips provides integrated infrastructure for retroactive public goods funding (RetroPGF). Ecosystems can manage nomination, voting, and automated onchain payouts within the platform. Filecoin uses Drips for FIL-RetroPGF distribution, and the protocol has supported dependency funding and ecosystem grants in collaboration with the Ethereum Foundation, ENS, UNICEF, and Scroll.

## **What This Protocol Does**

Drips provides permissionless infrastructure for open source funding through token streaming, curated funding lists, and automated dependency propagation.

In practice, it enables:

* **Protocols and organizations** to fund open source dependencies by creating Drip Lists and streaming tokens to projects they rely on, with automatic propagation to nested dependencies  
* **Project maintainers** to claim funds tied to their GitHub repositories, configure dependency splits, and forward earnings upstream  
* **Ecosystem foundations** to run RetroPGF rounds, from nomination through community voting to automated onchain distribution  
* **Individuals and communities** to create public Drip Lists that function as transparent funding signals  
* **Hackathon organizers** to manage submissions, voting, and prize distribution through Drips infrastructure

Drips is non-custodial and operates autonomously on Ethereum. Once configured, fund flows execute according to smart contract logic without centralized control.

## **Features**

Drips is implemented as a set of Ethereum smart contracts supporting token streaming, fund splitting, and identity management, with an application layer that integrates directly with GitHub.

### **Core Components**

* **Drip Lists:** Curated collections of up to 200 GitHub repositories, Ethereum addresses, or other Drip Lists. Each entry receives a defined percentage of incoming funds. Lists are public, composable, and shareable.  
* **Dependency Splitting:** Maintainers configure upstream dependencies when claiming funds. Splits execute monthly on the last Thursday of each month, propagating funds through the global dependency graph.  
* **Streaming:** Supporters stream ERC-20 tokens with per-second accounting. Streams can be modified or stopped at any time.  
* **RetroPGF Tooling:** Infrastructure for retroactive public goods funding, including nomination, voting, and automated token distribution. Used by Filecoin for FIL-RetroPGF rounds.  
* **Waves:** Recurring bounty cycles that convert merged pull requests into onchain rewards, supporting ecosystem growth and maintenance.

### **Protocol Capabilities**

* **GitHub integration:** Funds can be sent directly to public GitHub repositories using a Chainlink-powered oracle identity system. Maintainers claim funds by adding a FUNDING.json file to their repository's default branch, without requiring prior Ethereum experience.  
* **Composable funding graph:** Drip Lists can include other Drip Lists, creating nested funding structures. Contributors can amplify community-curated lists by streaming to them.  
* **Flexible token support:** Any ERC-20 token can be streamed or donated, with automatic splitting applied uniformly.  
* **Decentralized architecture:** Smart contracts govern fund flows without centralized custody.  
* **Open source:** All protocol contracts and application code are open source and available on GitHub.

## **Use Cases**

### **Protocols and DAOs Funding Their Software Dependencies**

Protocols and DAOs use Drip Lists to fund the open source infrastructure they depend on. Radworks allocated $1M over one year to 30 dependencies across Radicle, Drips, and Grants. The Ethereum Foundation distributed $30,000 to key dependencies. ENS streamed $50,000 USDC over six months to seven projects. This model enables structured, low-overhead funding of critical infrastructure.

### **Ecosystem Foundations Running RetroPGF Rounds**

Ecosystem foundations use Drips to operate retroactive public goods funding programs without building custom tooling. Filecoin has used Drips for multiple rounds, including FIL-RetroPGF-3, which distributed over 580,000 FIL. The platform supports project intake, community voting, and automated distribution.

### **Open Source Maintainers Receiving and Redistributing Funds**

Maintainers claim funds linked to their GitHub repositories and configure dependency splits to forward earnings upstream. This creates cascading funding flows that reach deeply nested libraries and infrastructure projects. UNICEF has piloted Drip Lists to support digital public goods, using dependency splitting to route funding to foundational open source libraries.

### **Community-Driven Funding Curation**

Individuals and working groups create public Drip Lists to curate collections of projects. Scroll used a Collaborative Drip List for community voting during its Level Up hackathon in Argentina. These lists function as transparent funding signals that others can follow or contribute to.

## **Further Reading**

* [**Drips Documentation** – Drips Network](https://docs.drips.network/)  
* [**Dependency Funding with Drips** – Drips Blog](https://www.drips.network/blog/posts/dependency-funding-with-drips)  
* [**Radworks Gives $1M to FOSS Dependencies with Drips** – Radworks](https://radworks.mirror.xyz/qopF06RBjKSEhi7HKQgYiyGGfidDAadES4bPXc8xTpE)
