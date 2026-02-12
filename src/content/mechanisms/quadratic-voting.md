---
id: '1770928324276'
slug: quadratic-voting
name: "Quadratic Voting"
shortDescription: "Governance mechanism where votes cost quadratically, enabling nuanced preferences."
tags:
  - quadratic
  - democratic
  - governance
lastUpdated: '2026-02-12'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Quadratic voting** (QV) is a collective decision-making mechanism that allows participants to express not just their preferences but the strength of those preferences. Each participant receives an equal budget of voice credits, which they allocate across issues or proposals on a ballot.

The cost of casting votes follows a quadratic function: one vote costs one credit, two votes cost four credits, three votes cost nine credits, and so on. This escalating cost prevents any single participant from dominating outcomes on a single issue while enabling those who care deeply about a particular question to meaningfully amplify their voice — at the expense of influence elsewhere.

Originally proposed by Steven Lalley and E. Glen Weyl in 2012 and formalized in 2018, QV has been deployed in settings ranging from the Colorado State Legislature and the Taiwan Presidential Hackathon to DAO governance platforms like Snapshot. It is the most mature mechanism for capturing preference intensity in collective decision-making.

## How It Works

Standard one-person-one-vote systems treat every voter's preference as equally intense, allowing an indifferent majority to override a passionate minority. This creates a bias toward median preferences and fails to account for how differently issues affect different people.

In blockchain governance, token-weighted voting concentrates power among large holders, while simple one-address-one-vote systems are trivially sybil attackable. Neither approach reliably captures the nuanced preference landscape of a diverse community. QV introduces a market-like mechanism for expressing preferences: participants receive equal budgets of voice credits and allocate them across a ballot of proposals or candidates, with a quadratic cost function ensuring that each additional vote on a single issue becomes increasingly expensive.

QV operates at the decision layer (allocation layer) of the funding and governance stack, determining which proposals, priorities, or candidates a community selects.

1. **Credit distribution:** Each eligible participant receives an equal budget of voice credits. The absolute size of the budget does not affect outcomes — what matters is equal starting allocation. Common implementations use 99 or 100 credits.  
2. **Ballot design:** A governance process defines the proposals, priorities, or candidates on the ballot. Ballot design is critical, as the available options shape which preferences can be expressed. Proposals may support both positive and negative votes.  
3. **Vote allocation:** Participants distribute voice credits across ballot items during a defined voting window. Casting *n* votes on a single item costs *n²* credits (one vote costs 1, two cost 4, three cost 9). Participants balance depth of conviction against breadth of influence.  
4. **Identity verification:** Because QV depends on one-person-one-budget enforcement, sybil resistance is essential. Implementations range from government ID verification in civic contexts to passport scoring, proof-of-personhood, or membership rolls in onchain and organizational settings. 
5. **Tally and aggregation:** At the close of voting, votes (not credits spent) are summed for each proposal. Outcomes may select a winner or produce a ranked priority list reflecting both direction and intensity of preferences.  
6. **Outcome implementation:** Winning or ranked proposals are enacted through the appropriate governance process — legislation, treasury allocation, grant distribution, or organizational policy.

## Advantages

- **Expression of preference intensity:** Participants signal not just what they support but how strongly they care, producing richer information than binary or equal-weight voting.  
- **Efficient prioritization across many proposals:** A single ballot can generate ranked outcomes across multiple options without requiring serial yes/no votes.  
- **Protection of minority interests:** Groups with strong convictions can concentrate credits to outweigh an indifferent majority, mitigating tyranny-of-the-majority dynamics.  
- **Incentives for moderation:** Escalating vote costs make extreme single-issue concentration expensive, discouraging polarization and encouraging engagement across issues.  
- **Sybil resistant governance:** When paired with identity verification, quadratic voting supports one-person-one-budget governance in onchain contexts.  
- **Welfare-optimal outcomes under standard assumptions:** Under commonly used economic assumptions, the quadratic cost function aligns marginal vote costs with marginal value, enabling welfare-optimal or near-optimal outcomes.  
- **Composability with funding mechanisms:** The same mathematical principle extends to quadratic funding, where monetary contributions replace voice credits.

## Limitations

- **Cognitive complexity:** The quadratic cost function is less intuitive than one-person-one-vote, and misunderstandings can lead to suboptimal credit allocation without adequate onboarding.  
- **Identity dependence:** QV requires strict one-person-one-budget enforcement; sybil resistance remains imperfect in onchain contexts, while identity verification introduces friction and privacy concerns in civic settings.  
- **Collusion vulnerability:** Coordinated groups can distribute influence across participants, and while private voting mitigates this risk, it may conflict with transparency requirements.  
- **Agenda control:** Because participants allocate credits across a fixed menu of options, ballot designers exert significant influence over outcomes.  
- **Wealth effects in monetary variants:** When voice credits are purchased rather than distributed equally, wealthier participants can accumulate disproportionate influence.  
- **Transparency tradeoffs:** Anonymous voting reduces bribery and coercion but can conflict with democratic accountability norms, as demonstrated by legal challenges to legislative QV deployments.

These constraints highlight the central tradeoffs of quadratic voting: balancing rich preference expression against identity, transparency, and operational requirements.

## Best Used When

Quadratic voting works best when:

- Many proposals must be prioritized from a shared, finite resource  
- Preference intensity matters more than simple majority approval  
- Participants can be verified as unique individuals  
- The ballot includes enough options to reward strategic tradeoffs  
- Organizers can support basic participant education  
- The goal is prioritization or governance, not open-ended funding allocation

## Examples and Use Cases

**Colorado State Legislature** used quadratic voting within the Colorado House Democratic Caucus to prioritize spending bills competing for limited appropriations, allocating equal voice-credit budgets to legislators on an anonymous digital ballot. While the approach helped surface intensity-weighted preferences, a January 2024 court ruling found that anonymous voting conflicted with state open meetings laws, highlighting the tension between collusion resistance and democratic transparency.

**Taiwan Presidential Hackathon** uses quadratic voting to select winning civic technology projects in Taiwan's annual national innovation competition, allowing judges and citizens to allocate voice credits across competing teams via the government's Join e-democracy platform. The system replaced conventional judging methods prone to consensus bias and demonstrates quadratic voting operating at national civic scale with institutional support.

**Snapshot (DAO governance)** is the most widely used onchain governance platform supporting quadratic voting-style strategies, with DAOs commonly implementing quadratic voting-equivalent outcomes through square-root weighting of token holdings. This approach reduces the influence of large holders relative to standard token-weighted voting, and integrations with identity tooling such as Gitcoin Passport allow DAOs to strengthen sybil resistance where proof-of-personhood is required.

**Gitcoin Grants Stack (QV rounds)** enables protocol ecosystems to run quadratic voting-based allocation rounds for grants and treasury prioritization without requiring monetary contributions. These deployments use non-monetary voice credits and identity verification infrastructure to support community-directed allocation, illustrating quadratic voting as a portable governance mechanism distinct from donation-based quadratic funding.


## Further Reading

- [**Quadratic Voting** — Steven P. Lalley, E. Glen Weyl](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2003531)  
- [**Radical Markets** — Eric A. Posner, E. Glen Weyl](https://press.princeton.edu/books/hardcover/9780691177502/radical-markets)  
- [**Quadratic Voting: A How-To Guide** — Gitcoin Blog](https://www.gitcoin.co/blog/quadratic-voting-a-how-to-guide)  
- [**Radical Local Democracy** — RadicalxChange Foundation](https://www.radicalxchange.org/media/papers/The_Handbook_for_Radical_Local_Democracy.pdf)  
- [**Quadratic Voting in Colorado** — RadicalxChange](https://www.radicalxchange.org/wiki/colorado-qv/)
