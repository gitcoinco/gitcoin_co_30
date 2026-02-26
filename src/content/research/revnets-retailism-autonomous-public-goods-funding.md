---
id: '8'
slug: revnets-retailism-autonomous-public-goods-funding
name: "Revnets & Retailism: Can Autonomous Treasuries Fund Public Goods?"
shortDescription: "revnets propose a radical idea: deploy an immutable treasury once, and let it fund your project forever. no grants, no governance, no owners. here's how they work and what they mean for public goods funding."
tags:
  - "research"
  - "revnets"
  - "retailism"
  - "autonomous funding"
lastUpdated: "2026-02-25"
relatedMechanisms:
  - retailism-revenue-networks
  - token-streaming
relatedApps:
  - revnets
  - juicebox
relatedResearch:
  - ethereum-public-goods-funding-sources-the-next-era
  - plural-funding-mechanisms
  - eip-1890-and-eip-6969-lessons-from-in-protocol-funding
relatedCaseStudies: []
relatedCampaigns: []
banner: /content-images/research/revnets-retailism-autonomous-public-goods-funding/banner.png
---

**Type:** Analysis
**Authors:** @owocki

**Sources:**
- [Revnet Official Site](https://revnet.eth.limo/)
- [Retailism Essay by Jango](https://jango.eth.limo/9E01E72C-6028-48B7-AD04-F25393307132/)
- [Revnet Simulator](https://sim.revnet.app/about.html)

most public goods funding mechanisms share an assumption: someone decides who gets funded. whether it's a grants committee, a QF round, a retroPGF ballot, or a foundation's discretion — there's always a human in the loop, allocating capital based on judgment.

revnets reject that assumption entirely.

### what is a revnet?

a revnet (revenue network) is a fully autonomous, immutable treasury deployed as a smart contract. once launched, its rules cannot be changed. there is no owner, no multisig, no governance. money flows in and out according to four parameters set at deployment — and those parameters are locked forever.

the idea comes from jango (jango.eth), creator of juicebox protocol. juicebox has been powering programmable treasuries since 2021 — it's the infrastructure behind constitutionDAO ($47M raised) and assangeDAO ($55M raised). revnets are a specific configuration of juicebox V4, designed to be maximally autonomous and maximally trustless.

the underlying philosophy is called **retailism**: a framework where investing and consuming are treated as the same act. on the internet, the person who pays for a product and the person who funds its development are often the same person. retailism encodes that insight into smart contracts.

### how the mechanics work

every revnet has four immutable properties:

**1. premint** — tokens minted at deployment for the deployer. this is the initial development budget.

**2. entry curve (price ceiling)** — anyone can pay ETH into the revnet and receive tokens. the cost to mint new tokens rises at a predetermined rate (e.g., 1% more expensive every 7 days). early supporters get more tokens per ETH.

**3. exit curve (price floor)** — anyone can destroy their tokens to get ETH back from the treasury. a configurable exit tax means you get back less than the proportional share. the remainder stays in the treasury, raising the floor for everyone else.

**4. boost period** — for a set duration, a percentage of newly minted tokens goes to a designated operator (typically the dev team). this funds early development without requiring ongoing governance.

the interaction between ceiling, floor, and a uniswap liquidity pool creates a self-stabilizing market. if the token price hits the ceiling, arbitrageurs mint from the treasury and sell. if it hits the floor, they buy from the market and redeem. the price floor rises over time as more people enter and exit taxes accumulate.

this is the core insight: **the floor only goes up**. as long as people keep participating, the minimum value of each token increases. the most anyone can lose is the gap between their purchase price and the floor — and that gap shrinks over time.

### what this means for public goods

the dominant model for public goods funding today is episodic: apply for grants, run QF rounds, hope for retroPGF. these work, but they require continuous effort, social capital, and institutional access. they also create dependency — if the grants stop, the funding stops.

revnets offer a structurally different approach:

**deploy once, fund forever.** an open source project deploys a revnet with a modest premint and a boost period for the core team. users who depend on the software pay into the revnet and receive tokens. the team is funded through the boost mechanism initially, and through token appreciation long-term. no grant applications. no recurring fundraises.

**exit taxes create sustainability.** when participants leave, the exit tax ensures that remaining holders benefit. this is the opposite of a bank run — departures make the network stronger for those who stay. it's a built-in mechanism for long-term sustainability that doesn't depend on altruism or institutional support.

**immutability creates trust.** the strongest argument for revnets is that they can't be rugged. there's no multisig to compromise, no governance to capture, no foundation to lose its way. the rules are the rules. this is a form of credible commitment that no human institution can match.

### the tradeoffs

revnets are not a universal solution. the mechanism has real limitations:

**no accountability.** unlike milestone-based grants or retroPGF, there's no way to condition funding on actual delivery. a team could deploy a revnet, collect premint tokens, and walk away. the treasury would continue operating, but no one could redirect it.

**parameter sensitivity.** the four properties are locked forever. if the exit tax is too high, no one participates. if the price ceiling rises too fast, liquidity dries up. if the premint is too large, it looks like an insider deal. getting these right requires careful modeling, and there's no way to fix mistakes.

**cold start.** a revnet without participants is just an empty contract. projects need existing audiences or strong narratives to attract initial capital. this favors established projects over unknown builders — the opposite of what most public goods funding tries to achieve.

**unaudited contracts.** as of early 2026, the juicebox V4 contracts powering revnets have not undergone formal security audits. for a system premised on immutability and trustlessness, this is a notable gap.

### where revnets fit in the funding landscape

in [ethereum public goods funding sources - the next era](/research/ethereum-public-goods-funding-sources-the-next-era), i described the shift from episodic grants toward continuous, revenue-based funding. revnets are a pure expression of that shift. they sit at the intersection of revenue-based funding and tokenized economic alignment.

in [the case for plural funding mechanisms](/research/plural-funding-mechanisms), i argued that no single mechanism is optimal. revnets confirm this. they're excellent for projects with clear user bases and continuous demand — protocol infrastructure, developer tools, platforms. they're poorly suited for early-stage research, speculative exploration, or projects that need expert curation.

the comparison to the [EIP 1890 and EIP 6969](/research/eip-1890-and-eip-6969-lessons-from-in-protocol-funding) story is instructive. those EIPs tried to enshrine funding at the protocol level and failed — one because of credible neutrality concerns, the other because of institutional inertia. revnets sidestep both problems: they don't require protocol changes, and they don't need institutional adoption. anyone can deploy one. the mechanism lives at the application layer, not the protocol layer.

### the retailism bet

the deeper bet behind revnets is that the distinction between "investor" and "customer" is dissolving on the internet. when you pay for an open source tool and receive tokens that appreciate as the tool grows, are you a user or an investor? retailism says you're both, and that the economic infrastructure should reflect that.

this is a genuinely novel framing. most public goods funding treats contributors as donors — people who give without expectation of return. retailism treats them as participants — people who benefit directly from the network's growth. the incentive alignment is tighter, but the framing is different from the altruistic norms that have historically driven public goods funding.

whether this framing scales depends on whether enough projects can find the right parameters, attract initial participants, and deliver enough value to sustain continuous inflows. the mechanism is sound. the question is adoption.

### looking forward

revnets represent one of the most interesting experiments in the current funding landscape. they're not a replacement for grants, QF, or retroPGF. they're a new primitive — a way to create autonomous, self-sustaining economic engines for projects that have clear demand signals.

the projects to watch are the early deployments: $NANA (protocol fee revenue sharing), $REV (revnet research funding), and $BAN (creator monetization). if these demonstrate sustainable growth and genuine utility, the model will spread. if they don't, the immutability that makes revnets trustworthy will also make them unforgiving.

either way, the idea that a project can deploy its funding mechanism once and have it run autonomously forever — with no governance, no grants, no human intervention — is worth taking seriously. it's a different answer to an old question: how do you fund things that matter?
