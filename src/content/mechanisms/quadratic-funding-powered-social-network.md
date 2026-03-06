---
id: '1741193409'
slug: quadratic-funding-powered-social-network
name: "Quadratic Funding Powered Social Network"
shortDescription: "A mechanism that replaces social media likes with micro-tips amplified by quadratic funding matching pools, incentivizing prosocial behavior and rewarding value creation."
tags:
  - quadratic
  - social
  - micropayments
  - sybil-resistance
  - public goods
lastUpdated: '2021-12-18'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies:
  - quadraticlenster-launch-wrap-up
relatedResearch:
  - pluralistic-civilizational-scale-infrastructure-funding-public-goods
relatedCampaigns: []
banner: /content-images/mechanisms/quadratic-funding-powered-social-network/banner.png
---

**Source:** [Gitcoin Governance Forum](https://gov.gitcoin.co/t/a-quadratic-funding-powered-social-network/9462)

A **Quadratic Funding Powered Social Network** replaces traditional social media "likes" with micro-tips that are amplified through quadratic funding matching pools. Instead of zero-value engagement signals, users send small payments to content creators, and those payments are matched from a pool — making each tip worth far more than its face value and fundamentally changing the incentive structure of social platforms.

## The Problem: Bootstrapping Prosocial Networks

Traditional social networks optimize for attention and engagement, often incentivizing outrage and polarization. Creators generate enormous value but capture only a fraction of it. The "like" button is an infinite-supply token with no real utility — people like something when it creates a visceral reaction, but people tip someone when they feel they've truly been provided value.

![Bootstrapping network effects in social networks](/content-images/mechanisms/quadratic-funding-powered-social-network/network-effects-bootstrapping.png)

## How It Works

![Gitcoin Townsquare activity feed](/content-images/mechanisms/quadratic-funding-powered-social-network/townsquare-newsfeed.png)

1. **Micro-tips replace likes** — Users send small payments (e.g., 0.001 ETH / ~$0.30) to valuable posts instead of clicking a like button
2. **Quadratic matching amplifies tips** — A matching pool (e.g., $200/week) distributes funds quadratically, meaning many small tips create larger matches than a few large ones
3. **Leaderboards drive participation** — Top contributors gain visibility, creating a class of community members who earn by being helpful and providing value
4. **Sybil resistance testing** — Weekly rounds allow rapid detection of attack patterns, informing broader anti-fraud strategies

![Tipping interface with Ethereum symbol on the newsfeed](/content-images/mechanisms/quadratic-funding-powered-social-network/tipping-interface.png)

![Tip amount selection dialog](/content-images/mechanisms/quadratic-funding-powered-social-network/tip-amount-dialog.png)

![Mini CLR Rounds leaderboard](/content-images/mechanisms/quadratic-funding-powered-social-network/mini-clr-leaderboard.png)

## Gitcoin Townsquare Experiment

Gitcoin tested this mechanism with its "Townsquare" activity feed in early 2020, running 14 successive weekly QF rounds:

![Tip and matching statistics across rounds](/content-images/mechanisms/quadratic-funding-powered-social-network/tip-matching-statistics.png)

- **2,348 contributions** and **1,085 matching payouts**
- Median tip: 0.001 ETH ($0.30), median match: 0.005 ETH ($1.50)
- Daily active users increased substantially
- Community members shifted from passively ignoring help requests to actively problem-solving — directing support requests to relevant resources, answering questions about the network

![Distribution of tip amounts by number of tips](/content-images/mechanisms/quadratic-funding-powered-social-network/tip-amounts-distribution.png)

![Summary of contributions and matching payouts](/content-images/mechanisms/quadratic-funding-powered-social-network/contributions-summary.png)

The leaderboard created what the author calls "a class of community member that earned by being helpful + providing value." Users competed to climb rankings, fundamentally changing platform culture toward cooperation.

![Tweet documenting observed behavior changes in the community](/content-images/mechanisms/quadratic-funding-powered-social-network/behavior-change-tweet.jpeg)

The experiment also served as a sybil resistance honeypot — weekly rounds allowed rapid detection of attack patterns, informing broader anti-fraud strategies for Gitcoin Grants.

![Sybil resistance honeypot concept](/content-images/mechanisms/quadratic-funding-powered-social-network/sybil-resistance-honeypot.jpeg)

## Example Posts That Received Tips

Here are a few examples of posts from 2020 that received substantial tips, illustrating the kinds of helpful, prosocial content the mechanism incentivized:

![Example post that received tips on Gitcoin Townsquare](/content-images/mechanisms/quadratic-funding-powered-social-network/example-post-1.jpeg)

![Example post that received tips on Gitcoin Townsquare](/content-images/mechanisms/quadratic-funding-powered-social-network/example-post-2.jpeg)

![Example post that received tips on Gitcoin Townsquare](/content-images/mechanisms/quadratic-funding-powered-social-network/example-post-3.png)

![Example post that received tips on Gitcoin Townsquare](/content-images/mechanisms/quadratic-funding-powered-social-network/example-post-4.jpeg)

![Example post that received tips on Gitcoin Townsquare](/content-images/mechanisms/quadratic-funding-powered-social-network/example-post-5.png)

## Why It Ended

Rising Ethereum gas fees during "DeFi Summer" (mid-2020) made transactions uneconomical. Organizational priorities simultaneously shifted toward Layer 2 integration, bulk checkout features, GitcoinDAO formation, and the Consensys spinout. The experiment was shelved, though it contained "the kernel of a great idea."

## The Vision

What if we replaced likes with micro-tip subsidies across social media? Would we close the asymmetry between value created and value captured for creators? The mechanism addresses well-documented problems with web2 networks: polarization, extractive creator economics, and non-forkability.

## Subsequent Implementations

- **QuadraticLenster.xyz** — integrated QF matching into Lens Protocol's social feed (2023)
- **Matter.News** and **GoodMicroGrants** — implemented similar micro-tipping with matching pools
- Layer 2 networks now make gas fees feasible for micropayments, reviving the model's viability

## Key Insight

Quadratic funding transforms social network incentives from zero-sum attention competition to positive-sum value creation. By matching community-validated tips, platforms can systematically upregulate helpful, prosocial content while creating sustainable income for creators.
