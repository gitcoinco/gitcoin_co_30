---
id: '1740500100011'
slug: sourcecred
name: "SourceCred"
shortDescription: "Contribution tracking system that builds a reputation graph from community activity and distributes treasury rewards proportionally based on measured contributions."
tags:
  - reputation
  - automated
  - contribution-tracking
lastUpdated: '2026-02-25'
relatedMechanisms:

relatedApps: []
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

**SourceCred** is a mechanism for tracking community contributions and distributing rewards proportionally. It builds a "contribution graph" mapping people, projects, and interactions, then assigns "cred" scores based on measurable activity to allocate treasury funds. Contributors are paid based on what they actually did, not what they said they'd do.

## How It Works

SourceCred automates the connection between contribution and compensation.

1. **Integrate data sources** — plugins connect to GitHub, Discourse, Discord, and other platforms where work happens
2. **Build the contribution graph** — the system maps all interactions, contributions, and connections across integrated platforms
3. **Assign cred scores** — reputation scores are calculated based on tracked activities, with customizable weights for different contribution types
4. **Distribute rewards** — treasury funds are distributed weekly or in rounds, proportional to each contributor's cred score
5. **Communities tune weights** — teams can adjust how much weight goes to technical work vs. community engagement vs. documentation

## Advantages

- Makes visible who contributes what, with transparent attribution
- Recognizes diverse work — technical, social, and narrative contributions all count
- Reduces governance overhead for grants by automating allocation
- Compensates invisible labor and long-tail contributors who'd be missed by traditional grants

## Limitations

- Struggles with qualitative or creative work that lacks clear metrics
- Less effective in small or inactive communities
- Poorly suited for rapidly shifting priorities
- No longer actively maintained — though it pioneered the category and influenced modern tools like Coordinape and Karma

## Best Used When

- Open source communities with high contributor volume need fair, automated compensation
- DAOs want impact-based treasury distribution without committee overhead
- Teams need to recognize and reward diverse contribution types
- Projects want to build reputation-based allocation systems

## Examples and Use Cases

### Protocol DAO Contributor Rewards
A protocol DAO streams weekly contributor rewards based on cred scores calculated from GitHub commits, forum participation, and governance activity.

### Documentation and Moderation Recognition
Communities weight Discord moderation and documentation work alongside code contributions, ensuring non-technical labor is compensated fairly.

### Research Group Allocation
Research groups allocate stablecoin bonuses based on cred accumulation from peer reviews, publications, and mentorship activity.

## Further Reading

- [Allo Capital — SourceCred](https://www.allo.capital/mechanisms/sourcecred)
- [SourceCred Documentation](https://sourcecred.io/docs/)