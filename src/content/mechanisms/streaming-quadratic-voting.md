---
id: '1740500100028'
slug: streaming-quadratic-voting
name: "Streaming Quadratic Voting"
shortDescription: "Continuous preference expression using quadratic cost principles — voters stream support to projects over time and can dynamically rebalance as conditions evolve."
tags:
  - continuous
  - quadratic
  - adaptive
lastUpdated: '2026-02-25'
relatedMechanisms:
  - quadratic-voting
  - quadratic-funding
relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

**Streaming Quadratic Voting (SQV)** enables community members to allocate continuous support to projects or proposals using quadratic cost principles. Unlike traditional one-time voting, participants stream their preferences over time, enabling fluid, adaptive governance that captures evolving community sentiment.

## How It Works

SQV extends quadratic voting from discrete events into continuous, dynamic allocation.

1. **Participants receive voice credits** — tokens, reputation points, or time-weighted signal credits
2. **Credits are allocated to options** with quadratic cost — the cost of additional votes increases quadratically (1 vote = 1 credit, 2 votes = 4 credits, 3 votes = 9 credits)
3. **Allocation is continuous** — rather than voting once, participants stream support over time
4. **Dynamic rebalancing** — voters can adjust their allocations in real time as conditions, preferences, or project performance change
5. **Rate controls** prevent manipulation and spam while maintaining responsiveness

## Advantages

- Captures evolving community sentiment rather than point-in-time snapshots
- Prevents vote-buying and plutocracy via quadratic cost
- Supports nuanced, expressive inputs that reflect intensity of preference
- Creates responsive decision loops with minimal latency

## Limitations

- Not suited for binary or one-time decisions
- Requires engaged communities — low participation distorts results
- Needs reliable identity verification to prevent sybil attacks
- More complex to implement and understand than simple voting

## Best Used When

- Protocol governance where token holders continuously prioritize features or upgrades
- Grants allocation where supporters stream backing across different domains dynamically
- Civic participation where citizens allocate budget preferences over extended periods
- Any context where preferences evolve and one-time votes are insufficient

## Examples and Use Cases

### Continuous Feature Prioritization
Protocol teams use SQV to let token holders continuously signal which features or upgrades matter most, with priorities shifting in real time.

### Dynamic Grants Allocation
Funding communities stream quadratic votes across grant categories, dynamically rebalancing as new proposals emerge or existing ones deliver results.

### Extended Civic Budgeting
Citizens allocate budget preferences over months using SQV, with the community's evolving priorities reflected in real-time dashboards.

## Further Reading

- [Allo Capital — Streaming Quadratic Voting](https://www.allo.capital/mechanisms/streaming-quadratic-voting)