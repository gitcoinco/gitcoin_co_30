import type { CaseStudy } from '@/lib/types'

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'uniswap-grants-protocol-guild',
    title: 'Uniswap\'s $2.5M Contribution to Protocol Guild',
    summary: 'How Uniswap DAO allocated $2.5M to Ethereum core contributors through Protocol Guild, setting a precedent for L2/DeFi contributions to base layer maintenance.',
    content: `## Background

In early 2024, Uniswap DAO passed a governance proposal to contribute $2.5M worth of UNI tokens to Protocol Guild, the collective funding mechanism for Ethereum core protocol contributors.

## The Decision

The proposal recognized that Uniswap's success is built on Ethereum's foundation. By contributing to Protocol Guild, Uniswap directly funded the ~170 active core contributors maintaining and developing the base layer.

Key arguments in favor:
- Ethereum's security and development directly impacts Uniswap
- Sustainable funding for core contributors benefits the entire ecosystem
- Sets precedent for other protocols to contribute

## Implementation

The contribution was structured as a 4-year vesting stream, ensuring long-term commitment to core development. This aligned with Protocol Guild's design of providing predictable, ongoing funding rather than one-time grants.

## Outcomes

- Successfully transferred $2.5M to Protocol Guild
- Inspired similar proposals in other DAOs
- Strengthened narrative around protocols funding their infrastructure
- Demonstrated mature DAO governance in action

## Lessons Learned

1. **Frame contributions as self-interest**: The proposal succeeded by showing how Uniswap benefits from Ethereum development
2. **Use existing infrastructure**: Leveraging Protocol Guild's established mechanism was easier than creating something new
3. **Long-term commitment matters**: Vesting structure showed genuine commitment vs. one-time PR`,
    heroImage: '/images/case-studies/uniswap-pg.jpg',
    project: 'Protocol Guild Contribution',
    platform: 'protocol-guild',
    mechanism: 'streaming',
    fundingAmount: '$2.5M',
    fundingDate: '2024-01-15',
    outcomes: [
      {
        title: 'Direct Impact',
        description: 'Funded ~170 Ethereum core contributors for 4 years',
        metrics: '$2.5M distributed',
      },
      {
        title: 'Ecosystem Effect',
        description: 'Inspired similar contributions from other protocols',
      },
      {
        title: 'Governance Milestone',
        description: 'Demonstrated DAO capability for strategic funding decisions',
      },
    ],
    lessonsLearned: [
      'Frame ecosystem contributions as aligned with self-interest',
      'Leverage existing funding infrastructure when possible',
      'Long-term vesting signals genuine commitment',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'Uniswap Governance Proposal',
        url: 'https://gov.uniswap.org/',
      },
      {
        title: 'Protocol Guild Announcement',
        url: 'https://protocol-guild.readthedocs.io',
      },
    ],
    tags: ['DeFi', 'core protocol', 'streaming', 'governance'],
    publishDate: '2024-03-01',
    lastUpdated: '2024-12-01',
  },
  {
    id: '2',
    slug: 'optimism-retropgf-round-3',
    title: 'Optimism RetroPGF Round 3: 30M OP Distribution',
    summary: 'The largest retroactive funding round in crypto history distributed 30M OP to 501 projects, testing scalable impact evaluation at unprecedented scale.',
    content: `## Background

Optimism's third RetroPGF round in late 2023 was the largest retroactive funding experiment ever conducted in crypto. With 30M OP tokens (~$60M at time of distribution) allocated to reward past contributions to the Optimism Collective.

## The Mechanism

RetroPGF3 used badgeholders (trusted community members) to evaluate and vote on nominated projects. Categories included:
- OP Stack contributions
- Collective governance
- Developer ecosystem
- End user experience

## Scale Challenges

The round faced significant scaling challenges:
- 644 nominated projects
- 146 badgeholders
- Diverse categories requiring different expertise
- Need for nuanced evaluation at scale

## Outcomes

501 projects received funding, with distribution ranging from hundreds to hundreds of thousands of OP tokens.

Top categories:
- Infrastructure and tooling received significant allocation
- Governance contributions rewarded
- User-facing applications funded

## Lessons Learned

1. **Impact measurement is hard**: Comparing across categories proved challenging
2. **Badgeholder bandwidth**: Review burden was significant
3. **Gaming concerns**: Some project profiles optimized for voting vs. impact
4. **Positive feedback**: Created strong incentives for future builders`,
    heroImage: '/images/case-studies/retropgf3.jpg',
    project: 'RetroPGF Round 3',
    platform: 'optimism-retropgf',
    mechanism: 'retroactive-funding',
    fundingAmount: '30M OP (~$60M)',
    fundingDate: '2024-01-01',
    outcomes: [
      {
        title: 'Projects Funded',
        description: 'Largest retro funding round ever',
        metrics: '501 recipients',
      },
      {
        title: 'Categories Covered',
        description: 'Evaluated across four distinct impact areas',
        metrics: '4 categories',
      },
      {
        title: 'Community Participation',
        description: 'Badgeholders evaluated all nominations',
        metrics: '146 evaluators',
      },
    ],
    lessonsLearned: [
      'Cross-category comparison is inherently difficult',
      'Badgeholder bandwidth needs to be considered in round design',
      'Clear impact metrics help evaluation quality',
      'Gaming will occur; design for resilience',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'RetroPGF3 Results',
        url: 'https://round3.optimism.io/results',
      },
      {
        title: 'Optimism Governance',
        url: 'https://gov.optimism.io',
      },
    ],
    tags: ['retroactive funding', 'optimism', 'public goods', 'evaluation'],
    publishDate: '2024-02-15',
    lastUpdated: '2024-12-01',
  },
  {
    id: '3',
    slug: 'gitcoin-gg19-results',
    title: 'Gitcoin Grants 19: Community Rounds at Scale',
    summary: 'GG19 demonstrated the maturation of Gitcoin\'s community rounds program, with multiple independent ecosystems running their own quadratic funding rounds.',
    content: `## Background

Gitcoin Grants 19 (GG19) in late 2023 showcased the evolution of Gitcoin from a single platform to an ecosystem of community-run funding rounds. Multiple independent communities ran their own QF rounds on the Grants Stack.

## The Model

GG19 featured:
- Core Gitcoin-organized rounds (Climate, OSS, etc.)
- Community rounds organized by partners
- Shared infrastructure, independent governance

## Key Rounds

Several notable community rounds:
- Ethereum Infrastructure
- Climate Solutions
- Web3 Community & Education
- Partner ecosystem rounds

## Outcomes

The round demonstrated that QF can scale through decentralization:
- Multiple communities successfully ran rounds
- Matching funds came from diverse sources
- Reduced centralization on Gitcoin core team

## Lessons Learned

1. **Decentralization works**: Communities can run effective rounds
2. **Tooling matters**: Good infrastructure enables independence
3. **Curation challenges**: Each round needed quality control
4. **Sybil resistance**: Shared passport helped across rounds`,
    heroImage: '/images/case-studies/gg19.jpg',
    project: 'Gitcoin Grants 19',
    platform: 'gitcoin-grants-stack',
    mechanism: 'quadratic-funding',
    fundingAmount: '$2M+',
    fundingDate: '2023-11-15',
    outcomes: [
      {
        title: 'Rounds Operated',
        description: 'Multiple independent funding rounds',
        metrics: '10+ rounds',
      },
      {
        title: 'Total Distributed',
        description: 'Combined matching and contributions',
        metrics: '$2M+',
      },
      {
        title: 'Unique Projects',
        description: 'Projects funded across all rounds',
        metrics: '500+',
      },
    ],
    lessonsLearned: [
      'Communities can effectively self-organize funding rounds',
      'Shared infrastructure reduces barriers to running rounds',
      'Quality curation remains essential at each level',
      'Cross-round sybil resistance provides efficiency',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'GG19 Recap',
        url: 'https://gitcoin.co/blog/gg19-recap',
      },
    ],
    tags: ['quadratic funding', 'community rounds', 'gitcoin', 'decentralization'],
    publishDate: '2024-01-10',
    lastUpdated: '2024-11-01',
  },
  {
    id: '4',
    slug: 'arbitrum-stip-analysis',
    title: 'Arbitrum STIP: $50M Incentive Experiment',
    summary: 'Analysis of Arbitrum\'s Short-Term Incentive Program, which distributed 50M ARB to ecosystem projects with mixed but informative results.',
    content: `## Background

In late 2023, Arbitrum DAO launched the Short-Term Incentive Program (STIP), distributing approximately 50M ARB tokens (~$50M) to ecosystem protocols to drive usage and growth.

## The Mechanism

STIP used a grant-based approach:
- Projects applied for incentive allocations
- DAO voted on applications
- Recipients distributed ARB as user incentives
- Metrics tracking required

## Mixed Results

The program showed both successes and challenges:

**Positives:**
- TVL and usage increased during program
- Many protocols gained users
- Created ecosystem coordination

**Challenges:**
- Mercenary capital left after incentives ended
- Some inefficient incentive usage
- High cost per retained user in many cases

## Outcomes

The program provided valuable data on incentive effectiveness, leading to improved designs for future programs including the Long-Term Incentives Program (LTIP).

## Lessons Learned

1. **Retention > Acquisition**: Attracting users is easier than keeping them
2. **Incentive design matters**: Not all distributions are equally effective
3. **Measurement is essential**: Programs need robust analytics
4. **Iteration is key**: STIP informed better LTIP design`,
    heroImage: '/images/case-studies/stip.jpg',
    project: 'Short-Term Incentive Program',
    platform: 'arbitrum-dao-grants',
    mechanism: 'direct-grants',
    fundingAmount: '~$50M in ARB',
    fundingDate: '2023-11-01',
    outcomes: [
      {
        title: 'Tokens Distributed',
        description: 'Total ARB distributed as incentives',
        metrics: '50M ARB',
      },
      {
        title: 'Protocols Funded',
        description: 'Number of recipient protocols',
        metrics: '56 protocols',
      },
      {
        title: 'Learning Value',
        description: 'Informed design of LTIP and future programs',
      },
    ],
    lessonsLearned: [
      'User retention is harder than acquisition with incentives',
      'Incentive mechanism design significantly impacts outcomes',
      'Robust measurement enables iteration',
      'Short-term programs generate long-term learnings',
    ],
    status: 'partial',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'Arbitrum STIP Forum',
        url: 'https://forum.arbitrum.foundation',
      },
    ],
    tags: ['arbitrum', 'incentives', 'grants', 'ecosystem'],
    publishDate: '2024-04-01',
    lastUpdated: '2024-12-01',
  },
  {
    id: '5',
    slug: 'nouns-prop-house-experiment',
    title: 'Nouns Prop House: Permissionless Grants at Scale',
    summary: 'How Nouns DAO\'s Prop House created a permissionless grants infrastructure that funded hundreds of projects through community-driven rounds.',
    content: `## Background

Prop House emerged as Nouns DAO's answer to scalable, permissionless grants. Instead of all funding decisions going through the main DAO, Prop House allowed anyone to propose and vote on smaller grants in themed rounds.

## The Mechanism

Prop House used a unique model:
- Themed funding rounds with fixed prize pools
- Anyone could propose
- Nouns NFT holders voted
- Winners selected by community

## Scale Achieved

Over its operation, Prop House funded hundreds of projects across diverse categories:
- Art and design
- Development tools
- Community initiatives
- Creative experiments

## Outcomes

The system successfully:
- Distributed funding without core team bottleneck
- Encouraged creative proposals
- Built community engagement
- Created many successful Nouns extensions

## Lessons Learned

1. **Permissionless is possible**: Open applications can work at scale
2. **Theming helps**: Focused rounds improve proposal quality
3. **Low stakes enable experimentation**: Small grants reduce risk
4. **NFT voting has tradeoffs**: Can favor known proposers`,
    heroImage: '/images/case-studies/prophouse.jpg',
    project: 'Prop House',
    platform: 'nouns-dao',
    mechanism: 'direct-grants',
    fundingAmount: '$5M+',
    fundingDate: '2022-06-01',
    outcomes: [
      {
        title: 'Proposals Funded',
        description: 'Projects funded through themed rounds',
        metrics: '500+',
      },
      {
        title: 'Community Growth',
        description: 'Expanded Nouns ecosystem significantly',
      },
      {
        title: 'Model Innovation',
        description: 'Inspired similar systems in other DAOs',
      },
    ],
    lessonsLearned: [
      'Permissionless grants can scale effectively',
      'Themed rounds improve proposal quality and evaluation',
      'Lower stakes enable more experimentation',
      'Voting mechanism choice affects outcomes',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'Prop House',
        url: 'https://prop.house',
      },
      {
        title: 'Nouns DAO',
        url: 'https://nouns.wtf',
      },
    ],
    tags: ['nouns', 'permissionless', 'grants', 'nft governance'],
    publishDate: '2024-02-01',
    lastUpdated: '2024-11-01',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getCaseStudiesByPlatform(platform: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.platform === platform)
}

export function getCaseStudiesByMechanism(mechanism: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.mechanism === mechanism)
}

export function getFeaturedCaseStudies(count: number = 3): CaseStudy[] {
  return caseStudies.slice(0, count)
}
