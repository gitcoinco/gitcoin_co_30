---
id: '1772309772160'
slug: sablier
name: "Sablier"
shortDescription: "Ethereum token streaming protocol for ERC-20 vesting, payroll, airdrops, and grants across 28+ chains."
logo: /content-images/apps/sablier/logo.png
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

**Sablier** is a decentralized token streaming protocol that enables continuous, by-the-second distribution of ERC-20 tokens across Ethereum, 28+ EVM-compatible blockchains, and Solana. Launched in 2019, Sablier is widely recognized as the first token streaming protocol in the Ethereum ecosystem. It originated from ERC-1620, a proposed standard for streaming payments authored by co-founder Paul Berg in November 2018.

The protocol consists of persistent, non-upgradeable smart contracts that allow organizations to configure token distributions, including vesting schedules, payroll, airdrops, and grants, in a single transaction. Once created, tokens stream automatically according to predefined rules without further intervention.

Sablier includes three product lines: Lockup for fixed-duration vesting and unlock schedules, Flow for open-ended recurring payments such as payroll, and Merkle Airdrops for scalable token distribution campaigns. Since launch, the protocol has supported over 297,500 users and facilitated more than 552,800 token streams. In 2024, it reported a median TVL of approximately $250M. Organizations that have used Sablier include ShapeShift, Nouns DAO, Maple, Balancer, Aragon, Instadapp, Uniswap Governance, and Astaria. All contracts are fully open-source, immutable, and deployed across all supported chains.

## **What This Protocol Does**

Sablier provides onchain infrastructure for distributing ERC-20 tokens over time. It replaces manual payouts and custom vesting contracts with automated, audited, and permissionless token streaming.

In practice, it enables:

* **Token projects and DAOs** to configure vesting schedules for teams, investors, and advisors with second-by-second token release, including cliffs, unlock curves, and optional cancelability  
* **Organizations** to automate payroll and contributor compensation through open-ended streams that recipients can withdraw from at any time  
* **Airdrop campaigns** to distribute tokens gradually through vested claims rather than instant unlocks, reducing sell pressure and encouraging long-term alignment  
* **Grant programs** to stream funds across project timelines, with the ability to cancel and recover unstreamed tokens if milestones are not met  
* **Recipients** to track and withdraw accrued funds in real time through a mobile-friendly interface without relying on sender action

Sablier treats token distribution as a set-once system: the sender configures the stream, and the protocol enforces the distribution logic autonomously onchain.

## **Features**

Sablier operates through a suite of persistent, non-upgradeable smart contracts. The protocol is organized into three product lines (Lockup, Flow, and Merkle Airdrops), each designed for specific distribution use cases. All contracts prioritize security, censorship resistance, and self-custody.

### **Core Components**

* **Lockup:** Time-bound token streams with a fixed duration, defined amount, and programmable distribution curve. Supports linear vesting, cliffs, monthly unlocks, exponential curves, stepped schedules, and fully custom mathematical shapes. Each Lockup stream is represented as a transferable ERC-721 NFT featuring an onchain-generated hourglass SVG.  
* **Flow:** Open-ended token streams designed for recurring payments such as payroll and contractor compensation. Streams have no fixed end date and can be adjusted, paused, or topped up at any time, allowing flexible compensation management.  
* **Merkle Airdrops:** Infrastructure for distributing tokens to up to 1 million recipients per campaign. Supports both instant claims and vested airdrops, where tokens unlock gradually after claim instead of immediately.  
* **Sablier Interface:** A web application for creating, managing, and monitoring streams and airdrops. Supports bulk creation (up to 280 streams per transaction), CSV uploads, distribution simulations, and full Safe multisig integration.

### **Protocol Capabilities**

* **Flexible distribution curves:** Supports linear, cliff-based, exponential, logarithmic, stepped, and fully custom mathematical vesting schedules.  
* **Batch operations:** Create up to 280 streams in a single transaction for efficient team vesting, investor distributions, or contributor onboarding.  
* **NFT-wrapped streams:** Each Lockup stream is minted as an ERC-721 NFT, enabling transferability, potential collateralization, and secondary market trading of vested positions.  
* **Immutable and permissionless:** Smart contracts are persistent and non-upgradeable. Anyone can create token streams using any ERC-20 without requiring protocol-level approval.  
* **Multichain deployment:** Consistent contracts across supported networks, providing unified token distribution infrastructure regardless of chain.  
* **Safe integration:** Fully integrated with Safe multisig, allowing DAOs and treasury managers to deploy and manage vesting programs directly from their organizational wallets.

## **Use Cases**

### **Token Projects Managing Vesting Programs**

Token projects use Sablier Lockup to automate vesting for founders, teams, investors, and advisors. Rather than deploying custom contracts, projects configure streaming schedules directly through Sablier's interface or smart contracts. Tokens release continuously according to predefined rules. Maple has used Sablier for automated vesting since 2021, and Exactly distributed its initial airdrop to over 23,000 recipients through the protocol.

### **DAOs and Organizations Automating Payroll**

DAOs use Sablier Flow to stream compensation to contributors in real time. Contributors withdraw earned tokens at any time, eliminating reliance on fixed payroll cycles. Nouns DAO, ShapeShift, and Astaria have used Sablier for recurring contributor compensation. Cancelable streams allow treasuries to recover unstreamed funds if engagements end.

### **Airdrop Campaigns Reducing Sell Pressure**

Projects use Sablier Merkle Airdrops with vesting to distribute tokens gradually instead of unlocking them all at once. Analysis of more than 500,000 streams created through Sablier indicates that a majority of airdrop campaigns launched on the protocol use vesting. This reflects a shift toward distribution models that reduce immediate sell pressure and promote longer-term alignment.

### **Grant Programs Streaming Funds with Accountability**

Grant programs and protocol treasuries use Sablier to stream grant funding across project timelines. Cancelable streams allow funders to recover unstreamed tokens if deliverables are not met. Uniswap Governance has used Sablier's streaming module to distribute grants to ecosystem participants.

## **Further Reading**

* [**What Is Sablier?** – Sablier Documentation](https://docs.sablier.com/concepts/what-is-sablier)  
* [**Using Sablier For Token Vesting** – Sablier Blog](https://blog.sablier.com/using-sablier-for-token-vesting/)  
* [**Analyzing 500K+ Vesting Streams** – Sablier Blog](https://blog.sablier.com/analyzing-500k-vesting-streams-patterns-and-insights/)
