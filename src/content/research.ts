import type { Research } from '@/lib/types'

export const research: Research[] = [
  {
    id: '1',
    slug: 'state-of-public-goods-funding-2024',
    title: 'State of Public Goods Funding 2024',
    abstract: 'A comprehensive analysis of how public goods are funded across the Ethereum ecosystem, tracking capital flows, mechanism adoption, and emerging trends.',
    content: `## Executive Summary

The Ethereum ecosystem distributed over $500M to public goods in 2024 through various mechanisms. This report analyzes the landscape, trends, and opportunities.

## Key Findings

### Capital Flows

Total public goods funding in 2024:
- **Retroactive Funding**: ~$150M (Optimism RetroPGF, OP Stack incentives)
- **Quadratic Funding**: ~$50M (Gitcoin, clr.fund, Octant)
- **Direct Grants**: ~$200M (EF, Arbitrum, protocol treasuries)
- **Streaming**: ~$50M (Protocol Guild, Drips)
- **DAO Treasuries**: ~$100M (various DAOs)

### Mechanism Trends

1. **Retroactive funding maturing**: Optimism's RetroPGF has become a major force
2. **QF decentralizing**: Community rounds expanding beyond Gitcoin core
3. **Streaming gaining traction**: Protocol Guild's success inspiring adoption
4. **Hybrid approaches emerging**: Combining mechanisms for different needs

### Geographic Distribution

Funding remains concentrated but spreading:
- North America: 45%
- Europe: 30%
- Asia: 15%
- Other: 10%

## Recommendations

1. More investment in impact measurement infrastructure
2. Better coordination between major funders
3. Focus on sustainability beyond one-time grants
4. Support for mechanism research and experimentation`,
    heroImage: '/images/research/sopgf-2024.jpg',
    type: 'report',
    dataVisualizations: [
      {
        title: 'Funding by Mechanism',
        type: 'chart',
      },
      {
        title: 'Capital Flow Sankey',
        type: 'infographic',
      },
    ],
    relatedApps: ['gitcoin-grants-stack', 'optimism-retropgf', 'protocol-guild'],
    relatedMechanisms: ['quadratic-funding', 'retroactive-funding', 'streaming'],
    timeframe: '2024',
    authors: ['Gitcoin Research'],
    sources: [
      { title: 'Gitcoin Data', url: 'https://gitcoin.co' },
      { title: 'Optimism Governance', url: 'https://gov.optimism.io' },
      { title: 'DeepDAO', url: 'https://deepdao.io' },
    ],
    tags: ['public goods', 'funding', 'analysis', 'trends'],
    publishDate: '2024-12-01',
    lastUpdated: '2024-12-01',
  },
  {
    id: '2',
    slug: 'quadratic-funding-sybil-resistance',
    title: 'Sybil Resistance in Quadratic Funding: Current Approaches',
    abstract: 'An analysis of how different platforms approach sybil resistance in quadratic funding rounds, comparing techniques and their effectiveness.',
    content: `## The Sybil Problem

Quadratic funding's power comes from its democratic weighting - more unique contributors means more matching. But this creates strong incentives for creating fake identities (sybils) to game the matching.

## Current Approaches

### Gitcoin Passport

Gitcoin's approach uses a "stamp" system where users collect verifiable credentials from various sources:
- Social accounts (Twitter, GitHub, Discord)
- Onchain activity (NFTs, transactions)
- Biometric (BrightID)
- Financial (Coinbase, bank verification)

Each stamp adds to a "passport score" that determines matching eligibility.

**Pros**: Non-binary, privacy-preserving, composable
**Cons**: Can exclude legitimate users, stamps can be farmed

### MACI (clr.fund)

Minimal Anti-Collusion Infrastructure uses zero-knowledge proofs to make votes private while ensuring validity:
- Voters can't prove how they voted
- Prevents bribery and coercion
- Doesn't directly prevent sybils but removes coordination incentive

**Pros**: Strong anti-collusion, cryptographic guarantees
**Cons**: Complex UX, doesn't solve sybil directly

### Proof of Humanity

Uses video verification and social vouching:
- Submit video speaking phrase
- Get vouched by existing members
- Bonds create cost for false vouching

**Pros**: High assurance of unique humans
**Cons**: High friction, privacy concerns

## Effectiveness Analysis

Based on data from recent rounds:
- Gitcoin Passport reduced suspicious activity ~60%
- MACI rounds show less coordination patterns
- PoH rounds have lowest sybil rates but lowest participation

## Recommendations

1. Layer multiple approaches
2. Invest in privacy-preserving identity
3. Accept some sybil resistance loss for accessibility
4. Continue mechanism research`,
    heroImage: '/images/research/sybil.jpg',
    type: 'analysis',
    dataVisualizations: [],
    relatedApps: ['gitcoin-grants-stack', 'clr-fund'],
    relatedMechanisms: ['quadratic-funding'],
    authors: ['Gitcoin Research'],
    sources: [
      { title: 'Gitcoin Passport', url: 'https://passport.gitcoin.co' },
      { title: 'MACI Documentation', url: 'https://maci.pse.dev' },
    ],
    tags: ['sybil resistance', 'identity', 'quadratic funding', 'security'],
    publishDate: '2024-10-15',
    lastUpdated: '2024-10-15',
  },
  {
    id: '3',
    slug: 'retropgf-impact-measurement',
    title: 'Impact Measurement in Retroactive Funding',
    abstract: 'How do you measure the unmeasurable? An exploration of impact measurement approaches in retroactive public goods funding.',
    content: `## The Measurement Challenge

Retroactive funding promises to reward demonstrated impact, but measuring "impact" for public goods is notoriously difficult.

## Current Approaches

### Optimism's Framework

RetroPGF uses multiple signals:
- **Onchain metrics**: Transactions, users, TVL
- **Developer activity**: GitHub commits, contributors
- **Ecosystem impact**: Dependencies, forks, integrations
- **Qualitative assessment**: Badgeholder judgment

### Challenges Observed

1. **Quantitative gaming**: Metrics can be inflated
2. **Qualitative inconsistency**: Different evaluators, different judgments
3. **Category comparison**: How do you compare a tool to a governance contribution?
4. **Timeframe effects**: When should impact be measured?

## Emerging Solutions

### Attestations

Using onchain attestations to capture impact claims that can be verified:
- Peer attestations from other builders
- User attestations of value received
- Automated attestations from protocol data

### Impact Certificates

Tradeable claims on past impact that create markets for impact assessment:
- Projects issue certificates
- Funders can buy/sell based on assessed impact
- Prices become signal of perceived value

### Continuous Evaluation

Moving from point-in-time to ongoing assessment:
- Track metrics over time
- Multiple evaluation points
- Reduce gaming through unpredictability

## Recommendations

1. Invest in impact measurement infrastructure
2. Combine quantitative and qualitative
3. Embrace plurality in evaluation approaches
4. Build reputation systems for evaluators`,
    heroImage: '/images/research/impact.jpg',
    type: 'analysis',
    dataVisualizations: [],
    relatedApps: ['optimism-retropgf'],
    relatedMechanisms: ['retroactive-funding', 'attestation-based'],
    authors: ['Gitcoin Research'],
    sources: [
      { title: 'Optimism RetroPGF', url: 'https://community.optimism.io' },
    ],
    tags: ['impact measurement', 'retroactive funding', 'evaluation'],
    publishDate: '2024-09-01',
    lastUpdated: '2024-09-01',
  },
  {
    id: '4',
    slug: 'plural-funding-mechanisms',
    title: 'The Case for Plural Funding Mechanisms',
    abstract: 'Why no single funding mechanism is optimal, and how ecosystems benefit from mechanism diversity.',
    content: `## The Plurality Thesis

No single funding mechanism is optimal for all situations. Different mechanisms have different strengths, and a healthy ecosystem uses multiple approaches.

## Mechanism Comparison

| Mechanism | Best For | Weaknesses |
|-----------|----------|------------|
| Quadratic Funding | Democratic allocation | Sybil vulnerable |
| Retroactive Funding | Proven impact | Doesn't bootstrap |
| Direct Grants | Expert evaluation | Centralized |
| Streaming | Ongoing support | Setup complexity |
| Milestone-Based | Accountability | Overhead |

## Why Plurality Matters

### Different Needs

- Early-stage projects need different support than mature ones
- Research differs from development differs from community
- Some work needs expert evaluation, some community voice

### Risk Distribution

- Multiple mechanisms reduce single points of failure
- Gaming one mechanism doesn't compromise all funding
- Experimentation can happen in parallel

### Knowledge Generation

- Different mechanisms produce different learnings
- Competition improves each mechanism
- Cross-pollination of ideas

## Recommendations

1. Don't pick a single "best" mechanism
2. Match mechanisms to use cases
3. Invest in mechanism research
4. Enable interoperability between systems`,
    heroImage: '/images/research/plural.jpg',
    type: 'opinion',
    dataVisualizations: [],
    relatedApps: [],
    relatedMechanisms: ['quadratic-funding', 'retroactive-funding', 'direct-grants', 'streaming'],
    authors: ['Owocki'],
    sources: [],
    tags: ['mechanism design', 'plurality', 'public goods'],
    publishDate: '2024-08-15',
    lastUpdated: '2024-08-15',
  },
]

export function getResearchBySlug(slug: string): Research | undefined {
  return research.find((r) => r.slug === slug)
}

export function getResearchByType(type: string): Research[] {
  return research.filter((r) => r.type === type)
}

export function getFeaturedResearch(count: number = 3): Research[] {
  return research.slice(0, count)
}
