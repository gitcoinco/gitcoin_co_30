---
id: '1740500100018'
slug: ranked-choice-voting
name: "Ranked Choice Voting"
shortDescription: "Voting mechanism where participants rank options by preference — the least popular choices are eliminated and votes redistributed until a winner has majority support."
tags:
  - voting
  - consensus
  - democratic
lastUpdated: '2026-02-25'
relatedMechanisms:
  - quadratic-voting
relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

**Ranked Choice Voting (RCV)** lets voters express their full preferences, not just a single choice. Voters rank options (1st, 2nd, 3rd...), and if no option gets a majority, the system eliminates the least popular choices and redistributes those votes — round by round — until one option has majority support.

## How It Works

RCV uses iterative elimination to find the option with broadest support.

1. **Voters rank all options** in order of preference on their ballot
2. **First-choice votes are counted** — if any option has a majority, it wins
3. **If no majority**, the option with the fewest first-choice votes is eliminated
4. **Votes redistribute** — voters who chose the eliminated option have their votes transferred to their next preference
5. **Repeat** until one option achieves majority support

### Variations
- **Instant Runoff Voting (IRV)** — the standard single-winner implementation
- **Single Transferable Vote (STV)** — multi-winner variant for selecting multiple representatives
- **Preferential Voting** — general category for rank-based systems

## Advantages

- Prevents vote-splitting among similar options
- Encourages genuine voting preferences rather than strategic choices
- Produces winners with broad consensus rather than narrow pluralities
- Reduces the spoiler effect

## Limitations

- Not designed for simultaneous multi-project funding allocation
- Struggles with real-time decisions or binary choices
- Low-engagement settings can produce distorted results
- More complex for voters to understand than simple plurality voting

## Best Used When

- Selecting a single proposal, steward, or project from many candidates
- Environments prioritizing broad consensus over plurality wins
- Diverse groups seeking convergence on a shared direction
- Organizations requiring legitimate, well-supported outcomes

## Examples and Use Cases

### Delegate Selection
Protocol DAOs select lead delegates using RCV, ensuring the chosen representative has support beyond a narrow faction.

### Ecosystem Priority Setting
Grant programs use RCV to identify ecosystem funding priorities from a long list of potential focus areas.

### Community Project Selection
Civic networks choose community projects for special support using ranked ballots.

## Further Reading

- [Allo Capital — Ranked Choice Voting](https://www.allo.capital/mechanisms/ranked-choice-voting)