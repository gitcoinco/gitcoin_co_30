---
id: '1772304904023'
slug: superfluid
name: "Superfluid"
shortDescription: "Superfluid enables real-time token streaming for DAO payroll, grants, and incentives."
logo: /content-images/apps/superfluid/logo.png
tags:
  - streaming
  - payments
  - multichain
lastUpdated: '2026-02-28'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Superfluid** is an open-source token streaming protocol for EVM-compatible blockchains that enables real-time, per-second payments using programmable smart contracts.

Through its Super Token standard and streaming agreements, Superfluid allows DAOs, protocols, and onchain organizations to automate salaries, grants, token vesting, incentives, subscriptions, and other recurring payments as continuous cash flows.

Founded in 2020 and launched on mainnet in 2021, Superfluid is deployed across multiple EVM networks including Ethereum, Optimism, Polygon, Arbitrum, and Base. The protocol has raised venture funding and is used by ecosystem organizations including ENS DAO, Optimism, and Gitcoin's Allo Protocol for streaming-based funding experiments.

## **What This Protocol Does**

Superfluid enables continuous onchain payment streams across EVM networks.

In practice, it enables:

* **DAOs and organizations** to stream salaries, contributor payments, vesting schedules, and grants in real time without repeated manual transactions  
* **Protocol treasuries** to distribute rewards, airdrops, and incentives continuously to large numbers of recipients through Distribution Pools  
* **Developers** to build streaming-native applications for subscriptions, DCA investing, real-time yield distribution, and programmable financial workflows  
* **Grant programs** to align incentives with grantees by streaming funds over time rather than distributing lump sums, enabling cancellation if deliverables are not met  
* **DeFi protocols** to integrate continuous cash flows into lending, liquidity, and reward distribution mechanisms

The protocol's architecture treats money as a continuous flow to mitigate the need for a series of discrete transfers, enabling new categories of financial applications built around real-time value movement..

## **Features**

Superfluid operates as a token-centric smart contract framework where all functionality revolves around Super Tokens, which are upgraded ERC-20 tokens that enable streaming and distribution capabilities. The protocol is open-source, non-custodial, and permissionless. Funds remain in the sender's wallet and stream continuously instead of being escrowed upfront.

### **Core Components**

* **Money Streaming (Constant Flow Agreements):** Enables continuous, per-second token transfers between two addresses at a defined flow rate. Streams remain active until canceled by either party or until the sender's Super Token balance is depleted. Only the initial stream creation requires an onchain transaction.  
* **Distribution Pools (General Distribution Agreements):** Enables one-to-many token distributions, where a sender can stream to a pool that automatically splits funds among multiple recipients based on assigned shares. A single stream to a pool requires one transaction regardless of the number of recipients, allowing scalable reward and incentive distribution.  
* **Super Tokens:** Standard ERC-20 tokens can be upgraded into Super Tokens to gain streaming capabilities. The protocol also supports natively issued Super Tokens.  
* **Superfluid Dashboard:** A user-facing interface for creating, managing, and monitoring payment streams and distribution pools across supported networks.

### **Protocol Capabilities**

* **Gas-efficient streaming:** After a stream is created, no additional transactions are required for funds to continue flowing. Balance updates occur through protocol-level accounting rather than recurring transfers.  
* **Real-time balance netting:** All incoming and outgoing streams are continuously netted at the protocol level, allowing received streams to be redirected or composed into additional payment flows.  
* **Multichain deployment:** Deployed across multiple EVM-compatible networks including Ethereum, Polygon, Optimism, Arbitrum, Avalanche, Base, and Gnosis Chain.  
* **Programmable and composable:** Streams can be controlled by smart contracts, enabling conditional payments, automated redistribution, and integration with DeFi systems.  
* **Open-source and permissionless:** The full protocol is open-source, and any user or application can create streams, wrap tokens, or build on the framework.

## **Use Cases**

### **DAOs and Organizations Managing Recurring Payments**

DAOs and crypto-native organizations use Superfluid to automate contributor compensation by streaming salaries and grants in real time instead of executing recurring manual transfers. This reduces operational overhead while maintaining continuous payment visibility.

### **Protocol Treasuries Distributing Rewards and Incentives**

Protocol foundations use Distribution Pools to stream token rewards, airdrops, and ecosystem incentives to large recipient groups. Continuous distribution can replace one-time batch transfers and simplify treasury operations.

### **Grant Programs Aligning Funding with Deliverables**

Grant programs use streaming to distribute funds gradually over the lifetime of a project. If milestones are not met, funders can cancel the stream and recover unstreamed funds.

### **Developers Building Real-Time Financial Applications**

Developers use the Superfluid SDK and smart contract framework to build streaming-native applications such as subscriptions, dollar-cost averaging tools, real-time yield distribution systems, and programmable financial workflows. Streams can be composed, redirected, or integrated into broader DeFi systems.

## **Further Reading**

* [**What is Superfluid?** – Superfluid Documentation](https://docs.superfluid.org/docs/concepts/superfluid)  
* [**Superfluid Secures $5.1M to Launch Distribution Pools** – The Defiant](https://thedefiant.io/news/press-releases/superfluid-secures-5-1m-to-launch-distribution-pools-and-unlock-one-to-many-streams)  
* [**Superfluid Protocol Overview** – Superfluid](https://www.superfluid.finance/)
