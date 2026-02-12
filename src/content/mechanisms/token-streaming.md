---
id: '1770923852020'
slug: token-streaming
name: "Token Streaming"
shortDescription: "Continuous funding mechanism that streams ERC-20 token payments per second instead of lump sums."
tags:
  - payments
  - continuous
  - streaming
lastUpdated: '2026-02-12'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Token streaming** is a payment execution mechanism that distributes ERC-20 tokens continuously over time — typically calculated per second — rather than through discrete lump-sum transfers. A sender deposits tokens (or authorizes ongoing token flows) into a smart contract that programmatically accrues value to a recipient as time passes. Recipients can withdraw earned balances at any time without requiring additional transactions from the sender.

Token streaming operates at the execution layer (payment rails) of the funding stack. It determines how capital moves after allocation decisions are made. The mechanism is allocation-agnostic: streaming can distribute funds allocated through quadratic funding, retroactive funding, direct grants, payroll systems, vesting schedules, or DAO governance decisions. It is commonly used when sustained incentive alignment, treasury risk reduction, or smoother token distribution dynamics are desired.

## **How It Works**

Traditional grant disbursement relies on lump-sum payments — either upfront or at fixed intervals — which can misalign incentives. Upfront payments shift risk to funders, while deferred payments create cash flow uncertainty for contributors. Token streaming replaces discrete transfers with continuous accrual.

1. **Stream creation:** A sender defines the recipient address, token, total amount (for closed-ended streams) or flow rate (for open-ended streams), start time, and duration. In closed-ended models, the full deposit is escrowed in the contract. In open-ended models, funds flow as long as the sender maintains sufficient balance.  
2. **Continuous accrual:** The smart contract calculates the recipient's claimable balance based on elapsed time and the defined rate. No recurring transactions are required; accrual is computed deterministically.  
3. **Recipient withdrawal:** The recipient may withdraw any portion of their accrued balance at any time through a single onchain transaction. Withdrawals do not affect the stream's rate or remaining schedule.  
4. **Stream modification or cancellation:** Depending on configuration, streams may be cancellable (allowing recovery of unaccrued funds) or non-cancellable (guaranteeing full delivery). Some protocols allow extensions or rate adjustments.  
5. **Stream completion:** For fixed-duration streams, accrual ends once the defined duration elapses. Any unwithdrawn balance remains claimable. Open-ended streams continue until cancelled or insolvent.

## **Advantages**

* **Continuous compensation:** Contributors receive funding by the second rather than waiting for periodic disbursements, improving cash flow predictability for grantees.  
* **Funder-side risk reduction:** Senders retain the ability to cancel streams and recover unstreamed funds if a project fails to deliver, changes direction, or a contributor departs.  
* **Smoother token distribution:** Gradual emission reduces volatility and sell pressure associated with large unlock events.  
* **Automated disbursement:** Once a stream is created, no further manual intervention is required from the sender — payments execute autonomously until the stream ends.  
* **Composable distribution:** Streaming outputs can be split and forwarded to downstream recipients, enabling dependency-aware fund flows where a single stream supports an entire project graph.  
* **Transferable payment rights:** Some implementations represent streams as ERC-721 tokens, making payment flows transferable and composable within DeFi systems.

## **Limitations**

* **Upfront capital requirement:** Closed-ended streams require the full deposit at creation, which may exceed a funder's available liquidity for large or long-duration grants.  
* **No performance conditionality:** Standard streaming contracts distribute funds based on time elapsed, not milestone completion — the mechanism itself cannot gate payments on deliverable quality.  
* **Smart contract risk:** All deposited funds are held in onchain contracts; vulnerabilities or exploits could result in loss of funds for both senders and recipients.  
* **Token wrapping friction:** Some implementations require wrapping standard ERC-20 tokens into protocol-specific token standards (e.g., Super Tokens) before streaming, adding a step for users unfamiliar with the process.  
* **Insolvency monitoring:** Open-ended streams that rely on sender balances may require monitoring or liquidation mechanisms to enforce solvency, adding operational complexity.  
* **Limited dispute resolution:** Streaming contracts operate autonomously — if a disagreement arises between sender and recipient, the only recourse is cancellation, with no built-in mediation or arbitration.

These constraints highlight the core design tradeoff of token streaming: it optimizes for time-based incentive alignment and automated execution, but cannot independently enforce performance-based accountability without integration with external evaluation or milestone systems.

## **Best Used When**

Token streaming works best when:

* Ongoing compensation should align with sustained contribution over time  
* Funders want to reduce counterparty risk without requiring milestone review  
* Token distributions should avoid large discrete unlock events  
* Recipients need predictable, continuous cash flow rather than periodic lump sums  
* Disbursement should be automated and require no ongoing sender involvement  
* The payment schedule is known in advance and time-based distribution is appropriate

## **Examples and Use Cases**

**Sablier** is the first token streaming protocol, launched on Ethereum mainnet in 2019. It specializes in closed-ended streams with fixed deposits and durations, supporting linear, exponential, stepped, and custom distribution curves. Each stream is represented as an ERC-721 NFT owned by the recipient, making streams transferable and usable as DeFi collateral. Sablier has processed hundreds of thousands of streams and is widely used for vesting, payroll, and DAO grant distribution.

**Superfluid** is an open-ended streaming protocol launched in 2021 that enables perpetual, per-second token flows using its Super Token standard. Unlike closed-ended models, Superfluid streams run indefinitely until cancelled or the sender's balance is depleted. Superfluid introduced Distribution Pools for scalable one-to-many streams and has been adopted by major DAO ecosystems, including Optimism and ENS, to support retroactive funding distributions and ongoing developer grant programs. The protocol operates across multiple EVM-compatible chains and supports continuous, real-time incentive distribution at ecosystem scale.

**Drips** is a streaming and splitting protocol built on Ethereum that combines per-second fund flows with a dependency-aware splitting graph. Funders create Drip Lists that stream funds to curated sets of open-source GitHub repositories and Ethereum addresses, with funds automatically splitting to each project's declared dependencies on a monthly settlement cycle. Radworks streamed $1M over one year to 30 open-source dependencies, and Filecoin uses Drips to distribute and amplify RetroPGF allocations.

**LlamaPay** provides a simplified open-ended streaming model where sender insolvency accumulates debt rather than triggering liquidation, offset when the sender tops up. This design eliminates the need for an external liquidation network, trading solvency guarantees for operational simplicity. LlamaPay is used by several DAOs for contributor payroll.

## **Further Reading**

* [**An Overview of Token Streaming Models** — Sablier Blog](https://blog.sablier.com/overview-token-streaming-models/)  
* [**What is Superfluid?** — Superfluid Documentation](https://docs.superfluid.org/docs/concepts/superfluid)  
* [**Dependency Funding with Drips** — Drips Blog](https://www.drips.network/blog/posts/dependency-funding-with-drips)
