---
id: '1741168800003'
slug: coordinape
name: "Coordinape"
shortDescription: "Peer-based compensation tool where DAO contributors allocate tokens to each other based on perceived value."
tags:
  - peer-allocation
  - compensation
  - dao
  - governance
lastUpdated: '2026-03-05'
relatedMechanisms:
  - gift-circles
  - direct-grants
  - sourcecred
relatedApps:
  - giveth
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
banner: /content-images/apps/coordinape/banner.png
---

**Coordinape** is a decentralized compensation and grants platform that enables DAO contributors to allocate rewards to each other based on perceived value. Originally built to solve Yearn Finance's challenge of distributing a $40,000 monthly community grants budget without centralized management, Coordinape has grown into one of the most widely adopted tools for peer-based compensation in Web3. Hundreds of DAOs -- including BanklessDAO, Index Coop, Seed Club, and DAOhaus -- use Coordinape to decentralize their payroll and reward processes.

The core mechanism is simple: within a Circle (a group of DAO contributors), each member receives a fixed number of non-transferable GIVE tokens at the start of an Epoch (a time period). Members distribute their GIVE to peers they believe contributed the most value during that period. At the end of the Epoch, each person's share of total GIVE received determines their share of the Circle's budget. This approach eliminates the need for managers, compensation committees, or top-down salary decisions.

## What This App Does

Coordinape provides tools for decentralized peer-based compensation and reputation building within DAOs and other digital organizations.

In practice, it enables:

* **DAOs and working groups** to distribute budgets to contributors through peer evaluation rather than top-down decisions
* **Contributors** to recognize and reward each other's work in a transparent, game-theoretic process
* **Organizations** to surface compensation maps that reflect the community's collective assessment of value
* **Individuals** to build onchain work history and reputation through participation in Circles
* **Teams** to run recurring compensation cycles with minimal administrative overhead

## Features

### Gift Circles

The Gift Circle is Coordinape's foundational mechanism. A Circle represents a group of DAO participants who wish to distribute funds through decentralized gifting. Circle admins set the parameters: the number of GIVE tokens per member (100 by default), the Epoch duration, and the total budget. During an Epoch, members freely distribute their GIVE to peers. At the end, all allocated GIVE becomes locked (renamed GET tokens), unallocated GIVE is burned, and the budget is distributed proportionally based on each member's share of total GET received.

Circle admins can configure various parameters including opt-in/opt-out policies, whether members can give to themselves, and how new members are onboarded. Multiple Circles can operate within the same organization for different teams or workstreams.

### CoVaults

CoVaults are smart contracts that allow DAOs to pay contributors with ERC-20 tokens directly through Coordinape. Rather than requiring a separate treasury management step after each Epoch, CoVaults hold the funds and distribute them automatically based on allocation results. This reduces the administrative burden of running recurring compensation cycles and ensures that contributors receive their rewards promptly.

### CoSoul

CoSoul is a free-to-mint, soulbound NFT on Optimism that records a holder's work history across Coordinape Circles. Each CoSoul aggregates participation data, accolades, and contribution records onchain. The NFT's visual representation -- a unique snowflake-like geometric pattern -- evolves monthly as new work history is synced, becoming more complex as the holder participates across different types of work (marketing, development, design, operations). Because CoSoul is soulbound, it cannot be transferred, making it a verifiable reputation credential tied to actual peer-evaluated contributions.

### GIVE Token

GIVE is Coordinape's native allocation unit. Within a Circle, GIVE tokens are non-divisible and non-transferable between Epochs. The act of distributing GIVE -- sometimes called "Coordinaping" -- has become a recognized community ritual in many DAOs. GIVE allocations serve as both a compensation mechanism and a social signal, revealing the informal value networks within organizations.

### Notes and Feedback

Alongside GIVE allocations, members can leave notes for each other explaining why they allocated tokens. This qualitative feedback layer adds context to the quantitative allocation, helping contributors understand what the community values and where they can improve.

## Use Cases

### DAO Contributor Compensation

The primary use case is decentralized payroll. Yearn Finance pioneered this approach, using Coordinape to distribute its monthly community grants budget across dozens of contributors without a human resources department. Contributors self-report their work at the start of each Epoch, peers evaluate each other's contributions through GIVE allocation, and the budget is distributed accordingly. This model has been adopted by hundreds of DAOs as an alternative to traditional salary structures.

### Working Group Budget Distribution

Within larger DAOs, individual working groups use Coordinape Circles to distribute their allocated budgets. Each working group runs its own Epoch with its own parameters, allowing teams to customize the process for their specific context. A development team might run monthly Epochs, while a marketing team might run bi-weekly cycles.

### Grants and Bounty Distribution

Beyond recurring compensation, Coordinape is used for one-time grant distributions. A DAO can create a Circle for a specific initiative -- such as a hackathon, community event, or research project -- and let participants allocate rewards among themselves based on their contributions to the effort.

### Onchain Reputation Building

Through CoSoul, contributors build a verifiable onchain record of their work across multiple DAOs and Circles. This reputation credential can serve as a signal for future employment, grant applications, or governance participation, providing a Web3 alternative to traditional resumes and reference letters.

## Further Reading

* [**Coordinape Documentation** -- docs.coordinape.com](https://docs.coordinape.com/)
* [**GIVE in Gift Circles** -- Coordinape Docs](https://docs.coordinape.com/get-started/give)
* [**Yearn Finance Reveals Coordinape** -- Cointelegraph](https://cointelegraph.com/news/yearn-finance-reveals-coordinape-decentralized-grant-distribution-platform)
* [**CoSoul: Onchain Web3 Reputation** -- The Defiant](https://thedefiant.io/news/defi/coordinape-brings-web3-reputation-on-chain-with-cosoul)
* [**We Used Coordinape to Pay Our DAO** -- DAO Masters](https://daomasters.mirror.xyz/jGHj7-85fhgnXMlwa8FMR4zoKTwkgKxOPJi-HP6tFd4)
