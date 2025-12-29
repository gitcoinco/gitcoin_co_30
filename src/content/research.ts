import type { Research } from '@/lib/types'

export const research: Research[] = [
  {
    id: '1',
    slug: 'state-of-public-goods-funding-2024',
    title: 'State of Public Goods Funding 2024',
    abstract: 'A comprehensive analysis of how public goods are funded across the Ethereum ecosystem, tracking capital flows, mechanism adoption, and emerging trends through 2024.',
    content: `## Executive Summary

The Ethereum ecosystem distributed over $500M to public goods in 2024 through various mechanisms. This report analyzes the landscape, trends, and opportunities.

## Key Findings

### Capital Flows by Mechanism

Estimated public goods funding in 2024:
- **Retroactive Funding**: ~$150M (Optimism RetroPGF 5 & 6, OP Stack incentives)
- **Quadratic Funding**: ~$50M (Gitcoin rounds, clr.fund, Octant)
- **Direct Grants**: ~$200M (EF ESP, Arbitrum LTIP, protocol treasuries)
- **Streaming**: ~$50M (Protocol Guild distributions)
- **DAO Treasuries**: ~$50M (Nouns, ENS, other DAOs)

### Mechanism Trends

1. **Retroactive funding maturing**: Optimism's RetroPGF has become a major force, with rounds 5 and 6 distributing over 10M OP tokens
2. **QF decentralizing**: Community rounds expanding beyond Gitcoin core with 15+ independent rounds per season
3. **Streaming gaining traction**: Protocol Guild's $92.9M success inspiring adoption
4. **Hybrid approaches emerging**: Combining mechanisms for different needs

### Notable Programs

- **Protocol Guild**: $92.9M+ pledged for 187 core devs
- **Optimism RetroPGF**: 100M+ OP distributed across all rounds
- **Arbitrum Incentives**: 117M+ ARB through STIP and LTIP
- **Gitcoin Grants**: $60M+ total since 2019

## Recommendations

1. More investment in impact measurement infrastructure
2. Better coordination between major funders
3. Focus on sustainability beyond one-time grants
4. Support for mechanism research and experimentation`,
    heroImage: '/images/research/sopgf-2024.svg',
    type: 'report',
    dataVisualizations: [
      {
        title: 'Funding by Mechanism 2024',
        type: 'chart',
      },
      {
        title: 'Capital Flow Trends',
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
      { title: 'Protocol Guild Dashboard', url: 'https://dune.com/protocolguild/protocol-guild' },
    ],
    tags: ['public goods', 'funding', 'analysis', 'trends', '2024'],
    publishDate: '2024-12-01',
    lastUpdated: '2024-12-25',
  },
  {
    id: '2',
    slug: 'quadratic-funding-sybil-resistance',
    title: 'Sybil Resistance in Quadratic Funding: 2024 Approaches',
    abstract: 'An analysis of how Gitcoin Passport, MACI, and other approaches address sybil attacks in quadratic funding rounds.',
    content: `## The Sybil Problem

Quadratic funding's power comes from its democratic weighting - more unique contributors means more matching. But this creates strong incentives for creating fake identities (sybils) to game the matching formula.

## Current Approaches

### Gitcoin Passport

Gitcoin's approach uses a "stamp" system where users collect verifiable credentials:
- **Social accounts**: Twitter, GitHub, Discord, LinkedIn
- **Onchain activity**: NFTs, transaction history, ENS
- **Biometric**: BrightID verification
- **Financial**: Coinbase verification, bank connections
- **Civic**: Holonym, ID verification

Each stamp adds to a "passport score" that determines matching eligibility and weight.

**2024 Improvements:**
- Model-based score using ML for better detection
- Onchain Passport for gasless verification on L2s
- Improved stamp rotation to counter farming
- ~60% reduction in suspicious activity in GG23

### MACI (clr.fund)

Minimal Anti-Collusion Infrastructure uses zero-knowledge proofs:
- Voters can't prove how they voted (prevents bribery)
- Votes are encrypted and processed privately
- Prevents coordination attacks
- Doesn't directly prevent sybils but removes incentive

**2024 Updates:**
- MACI 2.0 with improved performance
- Deployed on multiple L2s
- Better integration with identity solutions

### Proof of Humanity / Gitcoin Passport Integration

Video verification and social vouching:
- High assurance of unique humans
- Privacy concerns limit adoption
- Being integrated as a Passport stamp

## Effectiveness Data

Based on GG23 data:
- Gitcoin Passport reduced flagged addresses by ~60%
- ML-based detection caught patterns humans missed
- Community flagging complemented automated detection
- Some sophisticated attacks still succeed

## Recommendations

1. **Layer multiple approaches**: No single solution is sufficient
2. **Invest in privacy-preserving identity**: Users need better options
3. **Accept tradeoffs**: Some accessibility loss for integrity
4. **Continuous iteration**: Attackers evolve, defenses must too`,
    heroImage: '/images/research/sybil.svg',
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
    lastUpdated: '2024-12-25',
  },
  {
    id: '3',
    slug: 'retropgf-impact-measurement-evolution',
    title: 'Impact Measurement in Retroactive Funding: Evolution Through RetroPGF 3-6',
    abstract: 'How Optimism has evolved its impact measurement approaches across four RetroPGF rounds, with lessons for the broader ecosystem.',
    content: `## The Measurement Challenge

Retroactive funding promises to reward demonstrated impact, but measuring "impact" for public goods is notoriously difficult. Optimism has iterated significantly across rounds.

## Evolution Across Rounds

### RetroPGF 3 (January 2024)

30M OP to 501 projects
- **Approach**: Badgeholder voting with minimal structure
- **Categories**: OP Stack, Governance, Dev Ecosystem, End Users
- **Challenges**:
  - 644 projects too many to evaluate thoroughly
  - Cross-category comparison difficult
  - Some gaming of profile presentation

### RetroPGF 4 (June 2024)

10M OP with focused scope
- **Approach**: Narrowed to specific impact areas
- **Improvements**: Better category definition, clearer criteria
- **Results**: More consistent evaluation, still some subjectivity

### RetroPGF 5 (Fall 2024)

8M OP with refined process
- **Focus**: Dev tooling and infrastructure
- **Innovations**:
  - Impact metrics framework
  - Badgeholder training
  - Clearer evaluation rubrics

### RetroPGF 6 (Active)

2.4M OP focused on governance
- **Scope**: Governance contributions only
- **Approach**: Narrow focus allows depth
- **New**: Algorithmic initial ranking

## Key Learnings

1. **Scope matters**: Narrower scope enables better evaluation
2. **Training helps**: Badgeholder preparation improves consistency
3. **Metrics + judgment**: Neither purely quantitative nor qualitative works alone
4. **Iteration required**: Each round informs the next

## Recommendations for Other Programs

1. Start with narrow scope and expand
2. Invest in evaluator training and support
3. Build impact measurement infrastructure
4. Plan for multi-round iteration`,
    heroImage: '/images/research/impact.svg',
    type: 'analysis',
    dataVisualizations: [],
    relatedApps: ['optimism-retropgf'],
    relatedMechanisms: ['retroactive-funding', 'attestation-based'],
    authors: ['Gitcoin Research'],
    sources: [
      { title: 'Optimism RetroPGF', url: 'https://retrofunding.optimism.io' },
      { title: 'OP Governance Forum', url: 'https://gov.optimism.io' },
    ],
    tags: ['impact measurement', 'retroactive funding', 'evaluation', 'optimism'],
    publishDate: '2024-11-01',
    lastUpdated: '2024-12-25',
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

- **Early-stage projects** need grants, not retro funding
- **Infrastructure** benefits from streaming
- **Community projects** suit QF
- **Research** often needs expert evaluation

### Risk Distribution

- Multiple mechanisms reduce single points of failure
- Gaming one mechanism doesn't compromise all funding
- Experimentation can happen in parallel

### Knowledge Generation

- Different mechanisms produce different learnings
- Competition improves each mechanism
- Cross-pollination of ideas

## Ecosystem Examples

### Ethereum's Plurality
- EF ESP for direct grants
- Gitcoin for QF
- Protocol Guild for streaming
- RetroPGF for retroactive

### Optimism's Evolution
- RetroPGF for retroactive
- Partner Fund for direct
- Governance Fund for ecosystem

## Recommendations

1. Don't pick a single "best" mechanism
2. Match mechanisms to use cases
3. Invest in mechanism research
4. Enable interoperability between systems
5. Fund the infrastructure for plurality`,
    heroImage: '/images/research/plural.svg',
    type: 'opinion',
    dataVisualizations: [],
    relatedApps: [],
    relatedMechanisms: ['quadratic-funding', 'retroactive-funding', 'direct-grants', 'streaming'],
    authors: ['Kevin Owocki'],
    sources: [],
    tags: ['mechanism design', 'plurality', 'public goods'],
    publishDate: '2024-08-15',
    lastUpdated: '2024-12-25',
  },
  {
    id: '5',
    slug: 'allo-protocol-ecosystem-analysis',
    title: 'Allo Protocol: Building the Rails for Capital Allocation',
    abstract: 'Analysis of how Allo Protocol enables customizable funding mechanisms and its adoption across the ecosystem.',
    content: `## What is Allo Protocol?

Allo Protocol is open-source infrastructure for capital allocation built by Gitcoin. It provides modular building blocks that developers can use to create any type of funding mechanism.

## Architecture

### Core Components

1. **Registry**: Project and profile management
2. **Pools**: Funding pools with configurable strategies
3. **Strategies**: Pluggable allocation logic (QF, direct, milestone, etc.)

### Key Features

- **Modular**: Mix and match components
- **Multi-chain**: Deployed on 10+ networks
- **Open source**: MIT licensed, forkable
- **Gas efficient**: Optimized for L2s

## Adoption Data (2024)

### Gitcoin Grants Stack
- Powers all GG rounds (GG20-23)
- 15+ community rounds per season
- $3M+ distributed per major round

### Community Implementations
- Karma GAP for milestone tracking
- OpenQ for bounties
- Various DAO grant programs

## Strategy Library

Available allocation strategies:
- **Quadratic Funding**: Democratic matching
- **Direct Grants**: Committee-based
- **Milestone-based**: Tranche releases
- **RFP**: Request for proposal
- **Quadratic Voting**: Preference allocation

## Lessons Learned

1. **Infrastructure enables innovation**: Others can build without starting from scratch
2. **Modularity matters**: Different use cases need different strategies
3. **Multi-chain is essential**: Users are everywhere
4. **Developer experience drives adoption**: Good docs and SDKs matter`,
    heroImage: '/images/research/allo.svg',
    type: 'analysis',
    dataVisualizations: [],
    relatedApps: ['allo-protocol', 'gitcoin-grants-stack'],
    relatedMechanisms: ['quadratic-funding', 'direct-grants', 'milestone-based'],
    authors: ['Gitcoin Research'],
    sources: [
      { title: 'Allo Protocol Docs', url: 'https://docs.allo.gitcoin.co' },
      { title: 'Allo GitHub', url: 'https://github.com/allo-protocol' },
    ],
    tags: ['allo protocol', 'infrastructure', 'capital allocation'],
    publishDate: '2024-09-15',
    lastUpdated: '2024-12-25',
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
