---
id: '1779354185026'
slug: chain-assassin
name: "Chain Assassin Game"
shortDescription: "Open-source real-world elimination game where autonomous on-chain matches run without moderators."
logo: /content-images/apps/chain-assassin/logo.png
featured: true
tags:
  - "gaming"
  - "onchain"
  - "mobile"
  - "web3"
  - "spectator"
  - "base"
  - "arbitrum"
lastUpdated: '2026-05-21'
relatedMechanisms:
  - direct-grants
  - ecosystem-funding
relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
banner: /content-images/apps/chain-assassin/banner.png
---

**Chain Assassin** is an open-source, real-world elimination game that leverages on-chain match coordination and GPS-based validation to run decentralized tournaments. Operating on networks like Base and Arbitrum, the platform enables participants to compete in action-heavy physical matches for crypto prize pools.

Unlike traditional elimination games that rely on manual supervision, Chain Assassin is designed to run autonomously. Once a match is funded by participants paying entry fees or supported through ecosystem grants, the tournament is managed entirely by smart contracts. The web interface acts as a hub for game discovery, registration, and live spectator tracking, while a dedicated mobile experience handles the active physical gameplay.

---

## **What This Game Does**

Chain Assassin provides the permissionless infrastructure to create, fund, and execute real-world elimination tournaments. By replacing human moderators with smart contracts and cryptographic check-ins, it creates a trustless competitive environment.

In practice, it enables:

* **Players** to register for localized matches, pay entry fees, and receive randomly assigned physical targets within a defined GPS zone  
* **Match Creators** to configure game parameters, including boundary coordinates, duration, entry costs, and payout distribution  
* **Ecosystem Contributors** to sponsor match prize pools using direct grants or ecosystem funding to incentivize localized physical engagement  
* **Spectators** to view live match maps, trace player progress, and audit outcomes in real-time through the web interface  
* **Developers** to audit the smart contracts, deploy customized match logic, or integrate third-party mobile or web client experiences

---

## **Features**

Chain Assassin combines a solid smart contract layer with mobile and web components to support location-based gaming without central administration.

### **Core Components**

* **Autonomous Match Engine:** Ethereum-compatible smart contracts handle game logic, registration fees, target distribution, and tournament payouts. Once started, no administrator or third party can halt or alter the match rules.  
* **GPS Boundaries:** Matches are constrained to specific real-world geographic coordinates. Players must operate within these boundaries to remain eligible for the prize pool.  
* **QR Code Elimination:** Eliminating a target requires scanning a physical QR code associated with the target player, verifying physical contact and proximity.  
* **Live Spectator Dashboard:** A web-based map that updates player locations, active counts, and tournament statistics, making match progress transparent and viewable to external observers.

### **Technical Capabilities**

* **Multi-Chain Deployment:** Supports both Base and Arbitrum networks, utilizing low-cost and high-speed execution for frequent location check-ins and state updates.  
* **Non-Custodial Prize Pools:** Entry fees and sponsorship funds are held securely in the match contract. Payouts are distributed to winners automatically upon tournament completion.  
* **Open Source Codebase:** The entire system—from solidity contracts to the client interfaces—is publicly accessible, encouraging community-driven forks and custom integrations.

---

## **Use Cases**

### **Ecosystem Sourced Tournaments**
Web3 ecosystems and local developer communities use Chain Assassin to organize localized physical events. Sponsoring a match using ecosystem grants drives real-world social interaction and showcases the efficiency of on-chain asset coordination and gaming.

### **Decentralized Competitive Gaming**
Competitive players create private or public matches with customized entry requirements and prize distributions. The smart contract-backed structure ensures that rewards are instantly and fairly paid out without relying on manual escrow or tournament platform administrators.

### **Real-World Community Building**
DAOs, NFT communities, and local clubs use localized matches to host engaging offline events. By defining zones near conferences or meetups, organizers can increase community cohesion while tracking all activity transparently on-chain.

---

## **Further Reading**

* [**Chain Assassin Website** – chainassassin.xyz](https://chainassassin.xyz)  
* [**Chain Assassin Repository** – GitHub](https://github.com/kalinbas/chain-assassin)  
* [**Chain Assassin Community** – Discord](https://discord.gg/SayMP2cJsp)  
