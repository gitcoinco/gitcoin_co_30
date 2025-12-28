import type { CaseStudy } from '@/lib/types'

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'protocol-guild-ecosystem-funding',
    title: 'Protocol Guild: $92M+ for Ethereum Core Development',
    summary: 'How Protocol Guild became the largest collective funding mechanism for Ethereum core contributors, receiving pledges from Lido, Uniswap, ENS, and dozens of other protocols.',
    content: `## Background

Protocol Guild launched in May 2022 to address a critical gap: Ethereum core protocol contributors were underfunded relative to the value they create. The Ethereum base layer enables billions in DeFi TVL, yet the ~180 developers maintaining it had inconsistent funding.

## The Mechanism

Protocol Guild uses a novel approach:
- Contributors are weighted by tenure and active participation
- Funds vest over 4 years, ensuring long-term commitment
- A simple split contract distributes funds to all members
- Anyone can donate, and major protocols are encouraged to contribute

## Key Contributors

Major pledges include:
- **Lido DAO**: 2% of staking rewards (~$20M+ pledged)
- **Uniswap**: $2.5M in UNI tokens
- **ENS**: 200,000 ENS tokens (~$2.7M)
- **Optimism**: 500,000 OP tokens
- **Arbitrum Foundation**: Significant ARB allocation

## Outcomes

As of late 2024:
- **$92.9M+ in total pledges and donations received**
- **187+ active Ethereum core contributors** receiving funding
- **4-year vesting** ensures long-term alignment
- Major protocols now recognize infrastructure funding as essential

## Lessons Learned

1. **Collective action works**: Individual contributors are hard to fund, but a collective is fundable
2. **Make it easy**: One contract to fund all core devs reduces coordination overhead
3. **Align incentives**: Vesting and tenure weighting reward long-term contribution
4. **Frame as self-interest**: Protocols benefit from a well-funded base layer`,
    heroImage: '/images/case-studies/protocol-guild.jpg',
    project: 'Protocol Guild',
    platform: 'protocol-guild',
    mechanism: 'streaming',
    fundingAmount: '$92.9M+',
    fundingDate: '2022-05-01',
    outcomes: [
      {
        title: 'Total Funding',
        description: 'Pledges and donations from ecosystem',
        metrics: '$92.9M+',
      },
      {
        title: 'Contributors Funded',
        description: 'Active Ethereum core protocol developers',
        metrics: '187+',
      },
      {
        title: 'Ecosystem Adoption',
        description: 'Major protocols contributing to infrastructure',
        metrics: '50+ donors',
      },
    ],
    lessonsLearned: [
      'Collective funding mechanisms enable what individual funding cannot',
      'Simple contribution interfaces increase participation',
      'Long-term vesting aligns contributor and funder incentives',
      'Framing infrastructure funding as self-interest drives adoption',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'Protocol Guild Documentation',
        url: 'https://protocol-guild.readthedocs.io',
      },
      {
        title: 'Dune Analytics Dashboard',
        url: 'https://dune.com/protocolguild/protocol-guild',
      },
    ],
    tags: ['core protocol', 'ethereum', 'streaming', 'collective funding'],
    publishDate: '2024-12-01',
    lastUpdated: '2024-12-25',
  },
  {
    id: '2',
    slug: 'optimism-retropgf-round-3',
    title: 'Optimism RetroPGF 3: 30M OP to 501 Projects',
    summary: 'The largest retroactive funding round in crypto history distributed 30M OP tokens to 501 projects, testing scalable impact evaluation.',
    content: `## Background

Optimism's third RetroPGF round in January 2024 was the largest retroactive funding experiment in crypto history. With 30M OP tokens (~$90M at distribution) allocated to reward past contributions to the Optimism Collective.

## The Mechanism

RetroPGF 3 used badgeholders (trusted community members) to evaluate and vote on nominated projects across four categories:
- OP Stack contributions
- Collective governance
- Developer ecosystem
- End user experience & adoption

**146 badgeholders** evaluated **644 nominated projects**, ultimately funding 501.

## Scale Challenges

The round faced significant scaling challenges:
- Review burden on badgeholders was substantial
- Cross-category comparison proved difficult
- Some projects optimized for voting vs. actual impact
- Evaluation consistency varied across badgeholders

## Outcomes

**501 projects received funding**, with distribution ranging from hundreds to hundreds of thousands of OP tokens.

Top allocations went to:
- Core infrastructure and tooling
- Governance contributions
- Developer experience improvements
- End-user applications

## Lessons Learned

1. **Impact measurement is hard**: Comparing a governance tool to a DeFi protocol requires nuanced evaluation
2. **Badgeholder bandwidth**: 644 projects is too many for thorough evaluation
3. **Gaming concerns**: Some applicants optimized profiles for votes rather than demonstrating real impact
4. **Positive incentives**: Despite challenges, RetroPGF creates strong incentives for future builders`,
    heroImage: '/images/case-studies/retropgf3.jpg',
    project: 'RetroPGF Round 3',
    platform: 'optimism-retropgf',
    mechanism: 'retroactive-funding',
    fundingAmount: '30M OP (~$90M)',
    fundingDate: '2024-01-15',
    outcomes: [
      {
        title: 'Projects Funded',
        description: 'Largest retro funding round ever',
        metrics: '501 recipients',
      },
      {
        title: 'Total Distribution',
        description: 'OP tokens distributed',
        metrics: '30M OP',
      },
      {
        title: 'Badgeholder Participation',
        description: 'Community evaluators',
        metrics: '146 badgeholders',
      },
    ],
    lessonsLearned: [
      'Cross-category comparison requires careful framework design',
      'Badgeholder capacity limits round size',
      'Clear impact metrics improve evaluation quality',
      'Gaming will occur; design for resilience',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'RetroPGF 3 Results',
        url: 'https://round3.optimism.io',
      },
      {
        title: 'Optimism Governance Forum',
        url: 'https://gov.optimism.io',
      },
    ],
    tags: ['retroactive funding', 'optimism', 'public goods', 'evaluation'],
    publishDate: '2024-02-15',
    lastUpdated: '2024-12-25',
  },
  {
    id: '3',
    slug: 'arbitrum-stip-analysis',
    title: 'Arbitrum STIP: 71.4M ARB Incentive Experiment',
    summary: 'Analysis of Arbitrum\'s Short-Term Incentive Program, which distributed 71.4M ARB to 56 protocols with mixed but valuable learnings.',
    content: `## Background

In late 2023, Arbitrum DAO launched the Short-Term Incentive Program (STIP), distributing 71.4M ARB tokens (~$100M at peak) to 56 ecosystem protocols to drive usage and growth.

## The Mechanism

STIP used a grant-based approach:
- Protocols applied for incentive allocations
- DAO voted on applications
- Recipients distributed ARB as user incentives
- Metrics tracking was required but inconsistent

## Mixed Results

The program showed both successes and challenges:

**Positives:**
- TVL increased significantly during the program
- Many protocols gained new users
- Created ecosystem coordination and awareness
- Demonstrated DAO governance at scale

**Challenges:**
- Mercenary capital left after incentives ended
- Some protocols used incentives inefficiently
- High cost per retained user in many cases
- Limited long-term user retention

## Key Metrics

- **71.4M ARB distributed** to 56 protocols
- **TVL peaked** during incentive period
- **User retention** varied significantly by protocol
- **Cost per retained user** ranged from reasonable to very high

## Learnings Applied to LTIP

The STIP experience directly informed the Long-Term Incentive Pilot (LTIP):
- Longer timeframes for sustainability
- Better measurement frameworks
- Focus on retention metrics
- More structured reporting requirements`,
    heroImage: '/images/case-studies/stip.jpg',
    project: 'Short-Term Incentive Program',
    platform: 'arbitrum-dao-grants',
    mechanism: 'direct-grants',
    fundingAmount: '71.4M ARB',
    fundingDate: '2023-11-01',
    outcomes: [
      {
        title: 'Tokens Distributed',
        description: 'Total ARB distributed as incentives',
        metrics: '71.4M ARB',
      },
      {
        title: 'Protocols Funded',
        description: 'Number of recipient protocols',
        metrics: '56 protocols',
      },
      {
        title: 'Learning Value',
        description: 'Informed design of LTIP program',
      },
    ],
    lessonsLearned: [
      'User retention is harder than acquisition with incentives',
      'Incentive mechanism design significantly impacts outcomes',
      'Robust measurement frameworks are essential',
      'Short-term programs generate long-term learnings',
    ],
    status: 'partial',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'Arbitrum STIP Forum',
        url: 'https://forum.arbitrum.foundation',
      },
      {
        title: 'STIP Analysis Report',
        url: 'https://forum.arbitrum.foundation/t/stip-analysis',
      },
    ],
    tags: ['arbitrum', 'incentives', 'grants', 'ecosystem'],
    publishDate: '2024-04-01',
    lastUpdated: '2024-12-25',
  },
  {
    id: '4',
    slug: 'gitcoin-gg20-quadratic-funding',
    title: 'Gitcoin GG20: Community Rounds at Scale',
    summary: 'GG20 demonstrated the maturation of community-run quadratic funding rounds, with multiple ecosystems running independent rounds on Grants Stack.',
    content: `## Background

Gitcoin Grants 20 in April 2024 showcased the evolution of Gitcoin from a single platform to an ecosystem of community-run funding rounds. Multiple independent communities ran their own QF rounds using Grants Stack infrastructure.

## The Model

GG20 featured:
- Core Gitcoin-organized rounds (Web3 OSS, Climate, etc.)
- Community partner rounds with independent matching pools
- Shared sybil resistance via Gitcoin Passport
- Decentralized round management

## Key Rounds

Several notable rounds ran:
- **Web3 Open Source Software**: Core infrastructure funding
- **Climate Solutions**: Environmental impact projects
- **Ethereum Infrastructure**: Protocol-level tooling
- **Community rounds**: Partner-organized thematic rounds

## Outcomes

The round demonstrated that QF can scale through decentralization:
- **Multiple communities** successfully ran independent rounds
- **Diverse funding sources** provided matching pools
- **Reduced centralization** on Gitcoin core team
- **Quality varied** by round operator experience

## Sybil Resistance

Gitcoin Passport provided unified sybil resistance:
- Users collect verifiable credentials
- Passport scores determine matching weight
- Shared across all rounds for efficiency
- Continuously improving detection`,
    heroImage: '/images/case-studies/gg20.jpg',
    project: 'Gitcoin Grants 20',
    platform: 'gitcoin-grants-stack',
    mechanism: 'quadratic-funding',
    fundingAmount: '$2.5M+',
    fundingDate: '2024-04-15',
    outcomes: [
      {
        title: 'Rounds Operated',
        description: 'Core and community rounds',
        metrics: '15+ rounds',
      },
      {
        title: 'Total Distributed',
        description: 'Combined matching and contributions',
        metrics: '$2.5M+',
      },
      {
        title: 'Unique Donors',
        description: 'Contributors across all rounds',
        metrics: '15,000+',
      },
    ],
    lessonsLearned: [
      'Communities can effectively self-organize funding rounds',
      'Shared infrastructure reduces barriers to entry',
      'Quality curation remains essential',
      'Unified sybil resistance improves efficiency',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'GG20 Results',
        url: 'https://gitcoin.co/blog/gg20-results',
      },
      {
        title: 'Grants Stack',
        url: 'https://grants.gitcoin.co',
      },
    ],
    tags: ['quadratic funding', 'community rounds', 'gitcoin', 'decentralization'],
    publishDate: '2024-05-01',
    lastUpdated: '2024-12-25',
  },
  {
    id: '5',
    slug: 'octant-epoch-funding-model',
    title: 'Octant: Staking-Powered Public Goods Funding',
    summary: 'How Octant created a sustainable funding model using staked ETH rewards, distributing millions to public goods across 9 epochs.',
    content: `## Background

Octant, launched by the Golem Foundation, created a novel funding model: stake 100,000 ETH and use the staking rewards to fund public goods. Users lock GLM tokens to participate in allocation decisions.

## The Mechanism

Octant runs 90-day epochs:
1. **100,000 ETH staked** generates rewards
2. **GLM lockers** earn proportional ETH rewards
3. Users choose to **donate or claim** their rewards
4. Donations go to **curated public goods projects**
5. **Quadratic funding** determines final allocations

## 9 Epochs of Funding

Through 9 epochs (as of late 2024):
- **$15M+ total** distributed to public goods
- **$1-2M per epoch** average funding
- **Diverse project portfolio** across categories
- **Growing participation** over time

## Sustainability Model

The model is sustainable because:
- Principal (100,000 ETH) remains intact
- Only staking rewards are distributed
- Creates perpetual funding stream
- User choice between donation and claim

## Key Projects Funded

Notable recipients include:
- Ethereum infrastructure projects
- Developer tooling
- Research and education
- Community initiatives`,
    heroImage: '/images/case-studies/octant.jpg',
    project: 'Octant Epochs 1-9',
    platform: 'octant',
    mechanism: 'quadratic-funding',
    fundingAmount: '$15M+',
    fundingDate: '2023-08-01',
    outcomes: [
      {
        title: 'Total Distributed',
        description: 'Across 9 epochs',
        metrics: '$15M+',
      },
      {
        title: 'Staked Principal',
        description: 'Foundation stake generating rewards',
        metrics: '100,000 ETH',
      },
      {
        title: 'Epochs Completed',
        description: '90-day funding cycles',
        metrics: '9 epochs',
      },
    ],
    lessonsLearned: [
      'Staking rewards can create sustainable funding',
      'User choice between claim and donate drives engagement',
      'Regular epochs create predictable funding',
      'Curation quality affects participation',
    ],
    status: 'success',
    author: 'Gitcoin Research',
    sources: [
      {
        title: 'Octant App',
        url: 'https://octant.app',
      },
      {
        title: 'Golem Foundation',
        url: 'https://golem.network',
      },
    ],
    tags: ['octant', 'staking', 'sustainable funding', 'epochs'],
    publishDate: '2024-10-01',
    lastUpdated: '2024-12-25',
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
