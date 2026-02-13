---
id: '1770997148695'
slug: conviction-voting
name: "Conviction Voting"
shortDescription: "Continuous governance mechanism where voting power accumulates over time."
banner: /content-images/mechanisms/conviction-voting/banner.jpg
tags:
  - continuous
  - governance
  - weighted
lastUpdated: '2026-02-13'
relatedMechanisms:

relatedApps:

relatedCaseStudies:

relatedResearch:

relatedCampaigns:

---

**Conviction voting** is a continuous governance and treasury allocation mechanism in which participants stake tokens on proposals to signal support, with voting power — called *conviction* — accumulating over time via an exponential decay function. Rather than relying on time-boxed voting windows, conviction voting treats preference expression as an ongoing process: sustained support increases influence, while withdrawn support decays gradually.

When a proposal's accumulated conviction crosses a dynamic threshold — determined by the proportion of funds requested relative to the total treasury — it passes automatically and funds are disbursed. This design rewards long-term commitment over short-term coordination and makes last-minute vote manipulation costly. Originally derived from Michael Zargham's research on *social sensor fusion* and first implemented by Commons Stack and 1Hive, conviction voting is one of the most mature continuous allocation mechanisms in the Ethereum ecosystem.

## How It Works

Time-boxed voting mechanisms introduce structural vulnerabilities in decentralized communities: low participation due to attention costs, susceptibility to last-minute vote swings by large token holders, and binary outcomes that fail to capture evolving community preferences. Conviction voting replaces discrete voting events with continuous preference signaling, where participants stake tokens on proposals at any time and their influence grows gradually according to a configurable half-life. 

Redirecting stake causes conviction to decay at the same rate, making sudden vote swings capital-intensive and difficult to sustain. Conviction voting operates at the decision layer of the funding stack, determining how a shared treasury distributes capital to competing proposals.

1. **Treasury and parameter configuration:** A community configures a shared funding pool and sets conviction voting parameters: the decay rate (half-life determining how quickly conviction charges and discharges), the maximum ratio of total funds any single proposal can request, and the minimum conviction threshold required for any proposal to pass.  
2. **Proposal submission:** Any token holder can submit a funding proposal at any time, specifying the amount requested and the intended use of funds. Proposals have no explicit expiration — they remain active as long as participants maintain conviction on them.  
3. **Continuous staking and conviction accumulation:** Token holders stake governance tokens on proposals they support, typically allocating their full balance to a single proposal. Once staked, conviction begins accumulating toward an asymptotic maximum, controlled by a configurable half-life. Withdrawing or redirecting stake causes conviction on the previous proposal to decay at the same rate, ensuring influence reflects sustained commitment rather than sudden capital movements.  
4. **Dynamic threshold evaluation:** Each proposal has a passing threshold based on the proportion of funds requested relative to the total treasury. Larger requests require proportionally more conviction. As proposals pass and the treasury balance changes, thresholds for remaining proposals adjust dynamically, creating self-regulating spending behavior.  
5. **Execution and disbursement:** When a proposal's accumulated conviction exceeds its threshold, it passes automatically and funds are disbursed onchain. No separate execution vote is required.

## Advantages

- **Continuous preference expression:** Participants signal support on an ongoing basis rather than during fixed voting windows, reducing coordination overhead and attention costs.  
- **Resistance to last-minute manipulation:** Because conviction accumulates gradually, sudden token influxes cannot immediately override sustained community support, neutralizing a common attack vector in time-boxed systems.  
- **Self-regulating treasury spending:** Dynamic thresholds tied to the ratio of requested funds to available treasury create natural fiscal discipline — as the treasury shrinks, remaining proposals become harder to pass, preventing runaway spending without requiring manual intervention.  
- **Parallel proposal evaluation:** Multiple proposals compete simultaneously for conviction, enabling relative prioritization across many options rather than serial yes/no decisions.  
- **Sustained commitment as signal quality:** Time-weighting filters for considered, durable support rather than impulsive or strategic voting, producing a higher-fidelity signal of community priorities.

## Limitations

- **Speed limitations:** Conviction accumulation is intentionally slow, making the mechanism unsuitable for urgent or time-sensitive decisions without a complementary fast-path process.  
- **Token-weighted influence:** Conviction scales with token holdings, favoring large holders and lacking the contribution-compression effects of quadratic funding.  
- **Participation inertia:** Switching support incurs decay and rebuilding costs, which can discourage preference updates and lead to stale allocations.  
- **Parameter sensitivity:** Decay rates, spending limits, and thresholds significantly affect outcomes; poor calibration can stall or trivialize funding decisions.  
- **Proposal quality fragmentation:** Without stake minimums or curation mechanisms, low-quality proposals can fragment attention and conviction across too many options.

These constraints highlight the core design tension of conviction voting: balancing the benefits of temporal filtering and continuous signaling against the need for timely decisions, broad accessibility, and parameter robustness.

## Best Used When

Conviction voting works best when:

- Funds must be allocated from a shared treasury on a continuous basis  
- Sustained support is a better signal than point-in-time popularity  
- Ongoing preference expression is preferred over time-boxed voting  
- Decisions can be made gradually rather than under time pressure  
- A fast-path mechanism exists for urgent or exceptional cases  
- Token distribution is broad enough to reflect genuine community support

## Examples and Use Cases

**1Hive (Gardens)** is the first production deployment of conviction voting. Built as an Aragon application and deployed on Gnosis Chain, it uses the HNY token to allocate funds from a common pool. The Gardens framework combines conviction voting with covenant-based dispute resolution and decision voting for parameter changes, forming a reusable DAO template with configurable decay rates (defaulting to a 48-hour half-life), spending limits, and minimum thresholds. The implementation's dynamic threshold formula — which ties a proposal's passing requirement to the ratio of requested funds to available treasury — provides a reference model for self-regulating treasury management.

**Token Engineering Commons (TEC)** uses *Disputable Conviction Voting*, integrating conviction voting with the Celeste dispute resolution protocol to allow community members to challenge proposals that violate the community covenant. Parameters such as half-life and spending limits were set collectively during the hatch phase via augmented bonding curve governance. TEC demonstrates conviction voting operating within a polycentric governance stack alongside Snapshot signaling, Tao Voting for technical decisions, and structured proposal development processes.

**Polkadot (OpenGov)** implements a distinct conviction-based model using time-locked token multipliers rather than continuous staking. Voters lock DOT for longer periods to amplify voting power on referenda, with the multiplier doubling for each additional lock period of 28 days. While this serves a different governance function than continuous treasury allocation, it reinforces the same core principle: temporal commitment should increase governance influence. Since launching on Polkadot mainnet in June 2023, OpenGov has seen a reported, order-of-magnitude increase in average votes per referendum compared to the previous governance system.

**Commons Stack** co-developed the original conviction voting model with BlockScience and 1Hive and has deployed it for community fund allocation, including matching fund distribution through the Panvala League. Its work includes the cadCAD simulation model — a digital twin used for parameter testing and governance design prior to deployment — which remains an important reference for communities configuring conviction voting parameters.


## Further Reading

- [**From Ad-Hoc Voting to Continuous Voting** — Jeff Emmett, Giveth](https://blog.giveth.io/conviction-voting-34019bd17b10)  
- [**Conviction Voting** — Michael Zargham, BlockScience](https://github.com/BlockScience/Aragon_Conviction_Voting)  
- [**Conviction Voting cadCAD Model** — Jeff Emmett, Commons Stack](https://medium.com/commonsstack/announcing-the-conviction-voting-cadcad-model-release-8e907ce67e4e)  
- [**Conviction Voting Algorithm Overview** — 1Hive / BlockScience](https://github.com/1Hive/conviction-voting-cadcad/blob/master/algorithm_overview.ipynb)  
- [**Conviction Voting** — Mechanism Institute](https://www.mechanism.institute/library/conviction-voting)
