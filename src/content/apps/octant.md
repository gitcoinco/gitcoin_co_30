---
id: '1772308124481'
slug: octant
name: "Octant"
shortDescription: "Public goods funding platform that converts ETH staking rewards into community-governed grants."
banner: /content-images/apps/octant/banner.png
tags:
  - public-goods
  - quadratic
  - grants
lastUpdated: '2026-02-28'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Octant** is a participatory public goods funding platform developed by the Golem Foundation. It converts ETH staking rewards into recurring, community-governed grants. The Golem Foundation stakes 100,000 ETH from its treasury, with a portion of the staking yield allocated to Octant for distribution.

Users participate by locking GLM tokens (the ERC-20 token of the Golem Network) into the Octant smart contract. In return, they earn ETH rewards proportional to their time-weighted GLM lock. During each allocation window, participants choose whether to claim their ETH rewards or donate them to eligible public goods projects. Donations are amplified through a matched rewards pool funded by unclaimed rewards and foundation contributions.

Octant operates on a 90-day epoch cycle. At the end of each epoch, a two-week allocation window opens for reward distribution. Since launching on Ethereum mainnet in August 2023, Octant has completed eight allocation windows, distributing over 2,340 ETH to more than 80 public goods projects. Participants have claimed over 1,357 ETH in personal rewards.

Beginning with Epoch 4 in 2024, Octant integrated quadratic funding into its matched rewards calculation. This change increased weight for projects with broad community support, reducing the influence of large individual allocations and improving allocation fairness.

## **What This Platform Does**

Octant creates a renewable public goods funding model by converting ETH staking yield into recurring, community-directed grants. Instead of relying on one-time philanthropy or treasury drawdowns, funding is generated continuously through staking rewards.

In practice, it enables:

* **GLM holders** to earn ETH rewards by locking tokens and optionally direct those rewards toward public goods, with donations amplified through quadratic matching  
* **Public goods projects** to receive recurring, community-driven funding on a predictable 90-day cycle without applying for traditional grants  
* **Community governance** through participant proposals, project suggestions, eligibility criteria updates, and themed epochs  
* **Mechanism experimentation** via structured experiments testing allocation mechanics, matching formulas, voter participation, and governance design  
* **Sustainable infrastructure** that funds public goods from staking yield rather than depleting principal capital

The model addresses the public goods free-rider problem by aligning incentives. GLM holders earn ETH regardless of donation decisions, while broader participation increases the size and impact of the matched pool.

## **Features**

Octant operates as a web application on Ethereum mainnet. It combines GLM token locking, ETH staking reward generation, and community-directed fund allocation within a structured 90-day epoch cycle.

The Golem Foundation provides the staked ETH that generates the reward pool. Community participants determine how rewards are distributed.

### **Core Components**

* **GLM Locking:** Users lock a minimum of 100 GLM in a non-custodial smart contract to participate. Rewards are calculated using a time-weighted average based on the amount locked and duration. Users retain custody of their tokens and may withdraw at any time.  
* **Epoch Cycle:** Each 90-day epoch accumulates staking rewards. A two-week allocation window follows, during which participants choose to claim their ETH rewards or donate them to eligible projects.  
* **Matched Rewards:** User donations are amplified by a matched rewards pool composed of unclaimed user rewards and a portion of the Golem Foundation's staking yield allocation. Since Epoch 4, quadratic funding mechanics determine how matching is distributed, increasing weight for projects with broad contributor support.  
* **Project Curation:** Eligible projects are curated by the Golem Foundation with community input. Participants may propose new projects, recommend eligibility criteria updates, and suggest thematic focus areas for future epochs.

### **Platform Capabilities**

* **Sustainable staking-based funding:** Funding is generated from ETH staking yield rather than treasury drawdowns, creating a renewable funding stream independent of principal depletion.  
* **Quadratic funding integration:** Matched rewards use quadratic funding to amplify projects with broad community support over those backed by a small number of large donors.  
* **Non-custodial design:** GLM locking is non-custodial. Participants maintain ownership and can withdraw tokens at any time.  
* **Governance experimentation:** Each epoch can introduce mechanism experiments, including adjustments to matching formulas, participation rules, or anti-sybil design.  
* **Open-source implementation:** The Octant smart contracts and platform code are open-source and available on GitHub.

## **Use Cases**

### **Public Goods Projects Seeking Sustainable Funding**

Open-source infrastructure teams, governance research organizations, and ecosystem tools use Octant as a renewable funding source. Projects funded through Octant include Protocol Guild, Gitcoin, Giveth, Drips, The Tor Project, rotki, BrightID, and Open Source Observer. Unlike one-time grant rounds, Octant provides a predictable 90-day allocation cycle.

### **GLM Holders Earning Rewards While Supporting Public Goods**

GLM token holders lock tokens to earn ETH rewards generated from the Golem Foundation's 100,000 staked ETH. During each epoch, participants decide whether to claim rewards or allocate them to projects. Quadratic matching increases the impact of donations directed toward broadly supported initiatives.

### **Mechanism Designers Testing Governance Experiments**

Octant functions as a live testing environment for public goods funding mechanisms. Epoch-level experiments may adjust voting mechanics, matching logic, or allocation structures. Participation and allocation data contribute to broader research in decentralized funding design.

### **Ecosystem Organizations Co-Sponsoring Public Goods**

Organizations aligned with Octant's mission may propose themed epochs or collaborate on funding priorities. Through the governance process, external stakeholders can influence project selection and allocation focus areas alongside the Golem Foundation.

## **Further Reading**

* [**Introduction to Octant** – Octant Documentation](https://docs.octant.app/en-EN/)  
* [**Announcing Octant** – Golem Foundation](https://golem.foundation/2023/08/08/announcing-octant.html)  
* [**Octant: GitHub Repository** – Golem Foundation](https://github.com/golemfoundation/octant)
