---
id: '51'
slug: mechanism-cartography-from-discovery-to-coalitional-funding
name: "Mechanism Cartography: From Discovery to Coalitional Funding"
shortDescription: "A product vision for turning mechanism discovery into a reflexive loop of funding what matters, coalition formation, and round creation — cartography as coordination infrastructure."
tags:
  - mechanism design
  - coalitional funding
  - cartography
  - coordination
  - public goods
  - d/acc
researchType:
  - Perspective
lastUpdated: '2026-03-06'
relatedMechanisms:
  - coalitional-funding
  - quadratic-funding
  - conviction-voting
  - retroactive-funding
  - direct-grants
relatedApps:
  - gitcoin-grants
  - allo-protocol
sensemakingFor: "mechanisms"
banner: /content-images/research/mechanism-cartography-from-discovery-to-coalitional-funding/banner.png
---

**Type:** Perspective
**Authors:** Kevin Owocki, owockibot

## Overview

The coordination ecosystem has a possibility problem. Dozens of funding mechanisms exist — [quadratic funding](/mechanisms/quadratic-funding), [conviction voting](/mechanisms/conviction-voting), [retroactive public goods funding](/mechanisms/retroactive-funding), [direct grants](/mechanisms/direct-grants), and more — but most funders don't even know what's possible. They have capital and conviction but no map of the solution space. And even when they discover what's possible, they lack the resources to turn funding into action — they need to delegate the operational details to people who can execute.

Mechanism cartography solves this by creating a reflexive feedback loop between **expanding what funders know is possible**, **forming coalitions around shared problems**, and **connecting capital with operators who can deploy it**. It turns a static reference tool into living coordination infrastructure — not just discovery, but delegation and execution.

## The Problem: Funders Don't Know What's Possible

The deepest problem isn't that funders can't pick between QF and retroPGF. It's that most funders **don't know what's possible in the first place**. They have capital and conviction — they care about watershed monitoring or AI safety or regenerative agriculture — but they have no map of the solution space. They don't know that conviction voting exists, that impact certificates are being experimented with, that coalitional funding can amplify their capital 10x through matching.

And even when they discover what's possible, there's a second gap: **turning funding into action**. A funder shouldn't need to become a round operator to deploy capital effectively. They need to find the right mechanism, find the right people to execute it, and **delegate the operational details** — while retaining meaningful oversight and voice in how their capital is allocated.

Today's landscape fails on both counts:

- A **funder** with $50K for watershed monitoring doesn't know what mechanisms exist, let alone which platforms support them. Even if they figure it out, they'd need to run the round themselves or find someone who will.
- A **builder** creating open-source soil sensors has to apply to 15 different rounds and hope one matches — with no visibility into where funders are gathering or what's even possible beyond traditional grants.
- A **round operator** wants to run a climate funding round but has no way to signal "I'm ready to operate this if the capital shows up" — and no visibility into whether enough funders and builders exist to make it viable.

Each actor operates in isolation. The information that would connect them — what's possible, where capital is gathering, who can execute — doesn't flow between them.

This is the coordination failure that mechanism cartography addresses. Not just "which mechanism?" but **"what's possible, who's in, and who runs it?"**

## The Reflexive Loop

The core insight is that mechanism discovery, coalition formation, and funding deployment are not separate activities. They form a reflexive loop where each stage generates signal for the next:

**Stage 1: Discover** — A funder describes their problem ("I want to fund watershed monitoring in the Colorado River Basin"). The tool recommends a mechanism stack based on their context: community size, trust level, capital available, time horizon.

**Stage 2: Coalesce** — The tool reveals that 47 other people have searched for watershed funding this month. Three of them have pledged capital. Two builder teams have registered matching projects. A coalition is forming.

**Stage 3: Fund** — When enough interest converges (funders, builders, capital), the proto-coalition graduates to a live round. Capital deploys through the recommended mechanism — perhaps [quadratic funding](/mechanisms/quadratic-funding) for broad community signal, followed by [conviction voting](/mechanisms/conviction-voting) for ongoing allocation.

**Stage 4: Learn** — After the round completes, outcomes feed back into the system. Did QF work well for hardware public goods? Did conviction voting maintain engagement? These learnings improve recommendations for the next user.

**Each loop iteration makes the map smarter.** Usage generates demand signal. Coalition formation reveals which problems have energy. Funding outcomes reveal which mechanisms work for which contexts. The tool is not a static reference — it's a living cartography that improves through use.

## From Mechanism Finder to Mechanism Cartographer

The [Mechanism Finder](https://mechanism-finder.vercel.app) already answers the first question: "What mechanism fits my problem?" It uses parameter sliders (community size, trust level, capital scale) and natural language intent parsing to recommend mechanism stacks.

The evolution from Finder to Cartographer adds three capabilities:

### 1. Demand Mapping

Anonymous aggregation of search queries surfaces what people are trying to fund. When hundreds of people search for "climate" + "hardware" + "public goods," that's a live signal that a climate hardware round would find participants.

This demand map becomes a **force-directed graph** of the funding landscape — clusters of interest, gaps in coverage, emerging domains. Round operators can see where to launch. Funders can see where their capital has the most leverage.

### 2. Coalition Formation via Attractors

An "attractor" is a proto-round — a gravitational center where interest gathers before formal commitment. Any user can create an attractor around a problem domain and mechanism stack:

- **Funders** pledge capital conditionally ("I'll put in $5K if this round launches with at least $50K total")
- **Builders** register projects that match the domain
- **Operators** signal willingness to run the round

When an attractor hits critical mass — enough funders, enough builders, enough pledged capital — it graduates to a live round. The threshold is transparent and pre-defined: no gatekeeping, just coordination.

This is [coalitional funding](/mechanisms/coalitional-funding) made legible. Instead of ad-hoc Telegram groups and Twitter threads trying to assemble funding coalitions, the cartography tool makes coalition formation a first-class primitive.

### 3. Outcome Intelligence

After rounds complete, the tool tracks what worked:

- Which mechanisms produced the most unique contributors?
- Which problem domains had the best builder retention?
- Did stacked mechanisms (QF → retro) outperform single mechanisms?
- What's the minimum viable coalition size for different mechanism types?

Over time, this creates a **mechanism effectiveness database** — the first empirical, cross-round dataset on what coordination tools actually work in practice.

## d/acc as a Filter

Every recommendation passes through a [d/acc](https://www.wtfisdacc.com/) lens: does this mechanism centralize or decentralize power? Does it preserve human agency? Does it create defensible alternatives to centralized control?

This makes the cartography opinionated. It doesn't just show options — it steers toward mechanisms that distribute power, resist capture, and maintain censorship resistance. A mechanism that concentrates allocation decisions in a small committee scores lower than one that distributes signal across a broad community, all else being equal.

This matters because the tools we build for capital allocation encode values. A cartography tool that treats all mechanisms as equivalent ignores that some concentrate power and others distribute it. d/acc filtering makes these tradeoffs visible and pushes the ecosystem toward defensive, decentralizing structures.

## Architecture: Four Phases

### Phase 1: Cartography Layer
Add demand mapping and interest signaling on top of the existing Mechanism Finder. Log anonymized queries, visualize domain clusters, let wallet-connected users signal interest ("I care about this"). Ship the map.

### Phase 2: Coalition Formation
Introduce attractors, conditional pledging, builder registration, and threshold-based graduation to live rounds. The tool now facilitates coordination, not just discovery.

### Phase 3: Onchain Funding Rails
Integrate with [Allo Protocol](/apps/allo-protocol) to deploy rounds programmatically. Coalition members pool into a Safe or Allo pool. Multi-mechanism rounds become possible — QF for discovery, conviction for ongoing, retro for outcomes, all in one campaign.

### Phase 4: Intelligence Layer
Mechanism effectiveness scoring, cross-round learning, demand forecasting, and d/acc scoring. The tool becomes genuinely intelligent about what works, not just what exists.

## Why This Matters Now

Three things converge to make mechanism cartography viable in 2026:

**The mechanism landscape is mature enough to map.** Five years ago, the ecosystem had QF and direct grants. Today there are dozens of mechanisms with real deployment history — enough variety to make cartography useful and enough data to make recommendations empirical.

**AI makes intent parsing tractable.** Natural language input ("I want to fund local water monitoring for my bioregion") can be reliably mapped to mechanism parameters. This was impractical before large language models.

**The funding landscape is fragmented enough to need a map.** Gitcoin, Optimism RetroPGF, Arbitrum STIP, Protocol Guild, Giveth, Clr.fund, Octant — dozens of platforms, each with different mechanisms and communities. Without cartography, funders and builders waste enormous effort navigating this landscape.

The first credible cartography of coordination mechanisms will become essential infrastructure — the way block explorers became essential for understanding blockchain state.

## The Bigger Picture

Mechanism cartography is a building block toward what Owocki has called [bioregional swarms](/research/bioregional-swarms) — networks of human and machine agents that sense, analyze, and coordinate within a bioregion. The cartography tool is the coordination layer's interface:

- **Bioregional financing facilities** use the cartography to match local problems with appropriate funding mechanisms
- **AI swarm coordination** uses demand signals to prioritize sensing and analysis
- **Knowledge commons** feed outcome data back into the cartography for collective learning

If we build the reflexive loop correctly, the cartography becomes a coordination substrate — not just showing you where funding goes, but actively helping capital flow to where it creates the most value for the commons.

---

*This article describes a product vision evolving from the [Mechanism Finder](https://mechanism-finder.vercel.app). The reflexive loop between discovery, coalition formation, and funding is the core thesis — mechanism discovery should be the entry point to coalitional action, not a standalone reference tool.*
