import type { Mechanism } from '@/lib/types'

export const mechanisms: Mechanism[] = [
  {
    id: '1',
    slug: 'quadratic-funding',
    name: 'Quadratic Funding',
    shortDescription: 'A democratic funding mechanism that matches community contributions quadratically, amplifying the impact of many small donors over few large ones.',
    fullDescription: `Quadratic Funding (QF) is a mathematically optimal way to fund public goods in a democratic community. It was proposed by Vitalik Buterin, Zoë Hitzig, and E. Glen Weyl in their paper "Liberal Radicalism."

The core insight is that the number of contributors matters more than the total amount contributed. A project supported by 100 people giving $1 each receives more matching funds than a project with 1 person giving $100.

This creates strong incentives for projects to build broad community support rather than just seeking a few large donors.`,
    heroImage: '/images/qf-hero.jpg',
    category: 'allocation',
    howItWorks: `1. A matching pool is established by sponsors
2. Community members donate to projects they value
3. Matching funds are distributed based on the formula: (√c₁ + √c₂ + ... + √cₙ)²
4. Projects with more unique contributors receive proportionally more matching
5. Results are calculated and funds distributed at round end`,
    advantages: [
      'Democratically allocates capital based on community preferences',
      'Mathematically optimal for funding public goods',
      'Resistant to plutocracy - one whale can\'t dominate',
      'Creates incentives for broad community building',
      'Transparent and verifiable',
    ],
    limitations: [
      'Vulnerable to sybil attacks without identity verification',
      'Requires a matching pool sponsor',
      'Complex to explain to newcomers',
      'Can be gamed through collusion',
      'Favors well-known projects over new ones',
    ],
    bestUsedFor: [
      'Community grants programs',
      'Open source funding',
      'Public goods',
      'Ecosystem development',
    ],
    implementations: ['gitcoin-grants-stack', 'clr-fund', 'giveth', 'octant'],
    technicalResources: [
      {
        title: 'Liberal Radicalism Paper',
        url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3243656',
        type: 'paper',
      },
      {
        title: 'Quadratic Funding Explained',
        url: 'https://wtfisqf.com',
        type: 'article',
      },
      {
        title: 'Gitcoin\'s QF Implementation',
        url: 'https://github.com/gitcoinco/grants-stack',
        type: 'repo',
      },
    ],
    inventors: ['Vitalik Buterin', 'Zoë Hitzig', 'E. Glen Weyl'],
    originYear: 2018,
    relatedMechanisms: ['retroactive-funding', 'conviction-voting'],
    tags: ['quadratic', 'matching', 'democratic', 'public goods'],
    lastUpdated: '2024-12-01',
  },
  {
    id: '2',
    slug: 'retroactive-funding',
    name: 'Retroactive Public Goods Funding',
    shortDescription: 'Rewards projects after they\'ve demonstrated impact, rather than funding promises. "It\'s easier to agree on what was useful than what will be useful."',
    fullDescription: `Retroactive Public Goods Funding (RetroPGF) is a mechanism that rewards projects based on demonstrated impact rather than promised outcomes.

The core philosophy is that it's easier to agree on what was useful than to predict what will be useful. By funding retroactively, we create better incentives for building genuinely useful public goods.

Optimism has pioneered this approach with their RetroPGF rounds, distributing over $100M to projects that have contributed to the ecosystem.`,
    heroImage: '/images/retropgf-hero.jpg',
    category: 'allocation',
    howItWorks: `1. Projects build and ship public goods
2. After a period of time, evaluators assess what was built
3. Impact is measured through various metrics and qualitative review
4. Funding is distributed proportionally to demonstrated impact
5. Creates incentive for future builders to focus on real value`,
    advantages: [
      'Funds proven value, not promises',
      'Reduces risk of funding failures',
      'Creates strong incentives for impact',
      'Less susceptible to marketing/hype',
      'Easier to evaluate outcomes than predictions',
    ],
    limitations: [
      'Doesn\'t help bootstrap new projects',
      'Requires upfront capital from builders',
      'Complex impact measurement',
      'May favor established teams',
      'Evaluation can be subjective',
    ],
    bestUsedFor: [
      'Ecosystem rewards',
      'Developer incentives',
      'Infrastructure funding',
      'Research grants',
    ],
    implementations: ['optimism-retropgf'],
    technicalResources: [
      {
        title: 'Optimism RetroPGF Docs',
        url: 'https://community.optimism.io/docs/governance/retropgf-3/',
        type: 'article',
      },
      {
        title: 'RetroPGF Experiment Design',
        url: 'https://vitalik.ca/general/2021/11/16/retro1.html',
        type: 'article',
      },
    ],
    inventors: ['Vitalik Buterin', 'Karl Floersch'],
    originYear: 2021,
    relatedMechanisms: ['quadratic-funding', 'attestation-based'],
    tags: ['retroactive', 'impact', 'optimism', 'evaluation'],
    lastUpdated: '2024-12-01',
  },
  {
    id: '3',
    slug: 'conviction-voting',
    name: 'Conviction Voting',
    shortDescription: 'A continuous voting mechanism where support accumulates over time, allowing preferences to be expressed without discrete voting periods.',
    fullDescription: `Conviction Voting is a novel decision-making process where tokens continuously accumulate voting weight behind proposals over time. The longer you support something, the stronger your conviction signal.

Unlike traditional voting, there are no discrete rounds. Proposals pass automatically when they accumulate enough conviction. This removes the gaming around voting deadlines and allows for more authentic preference expression.

It was pioneered by the Commons Stack and implemented by 1Hive and other DAOs.`,
    heroImage: '/images/conviction-hero.jpg',
    category: 'voting',
    howItWorks: `1. Community members stake tokens on proposals they support
2. Conviction (voting weight) accumulates over time
3. The longer you stake, the more conviction builds
4. Proposals pass when conviction crosses a threshold
5. Moving tokens resets conviction, preventing quick gaming`,
    advantages: [
      'No voting deadlines to game',
      'Continuous preference expression',
      'Rewards genuine long-term support',
      'Resistant to last-minute vote swings',
      'More natural decision making',
    ],
    limitations: [
      'Slower than traditional voting',
      'Can be confusing to newcomers',
      'Favors patient participants',
      'Complex to implement correctly',
      'Threshold setting is tricky',
    ],
    bestUsedFor: [
      'DAO treasury allocation',
      'Grants programs',
      'Community governance',
      'Resource allocation',
    ],
    implementations: [],
    technicalResources: [
      {
        title: 'Conviction Voting Paper',
        url: 'https://medium.com/giveth/conviction-voting-a-novel-continuous-decision-making-alternative-to-governance-aa746cfb9475',
        type: 'article',
      },
      {
        title: 'Gardens Documentation',
        url: 'https://1hive.gitbook.io/gardens/',
        type: 'article',
      },
    ],
    inventors: ['Commons Stack', '1Hive'],
    originYear: 2019,
    relatedMechanisms: ['quadratic-funding', 'direct-grants'],
    tags: ['voting', 'continuous', 'conviction', 'governance'],
    lastUpdated: '2024-11-01',
  },
  {
    id: '4',
    slug: 'direct-grants',
    name: 'Direct Grants',
    shortDescription: 'Traditional grant-making where a committee or individual directly allocates funds to selected projects based on applications and evaluation.',
    fullDescription: `Direct Grants represent the traditional approach to funding allocation, where a committee, foundation, or individual reviews applications and directly awards funds to selected projects.

While less "Web3 native" than other mechanisms, direct grants remain highly effective for certain use cases, particularly when domain expertise is needed for evaluation or when rapid decision-making is required.

Most foundations and DAOs use some form of direct grants alongside more experimental mechanisms.`,
    heroImage: '/images/direct-grants-hero.jpg',
    category: 'allocation',
    howItWorks: `1. Call for proposals is announced
2. Projects submit applications
3. Committee reviews and evaluates submissions
4. Selected projects receive funding
5. Often includes milestones and reporting requirements`,
    advantages: [
      'Fast decision making when needed',
      'Expert evaluation of complex projects',
      'Flexible funding amounts',
      'Can fund unpopular but important work',
      'Simple to understand',
    ],
    limitations: [
      'Centralized decision making',
      'Potential for bias',
      'Less community involvement',
      'Can lack transparency',
      'Gatekeeper dynamics',
    ],
    bestUsedFor: [
      'Technical infrastructure',
      'Research grants',
      'Emergency funding',
      'Large strategic initiatives',
    ],
    implementations: ['ethereum-foundation-grants', 'arbitrum-dao-grants', 'giveth', 'nouns-dao'],
    technicalResources: [
      {
        title: 'ESP Grants Process',
        url: 'https://esp.ethereum.foundation/applicants',
        type: 'article',
      },
    ],
    originYear: 1900,
    relatedMechanisms: ['milestone-based', 'retroactive-funding'],
    tags: ['grants', 'committee', 'traditional', 'evaluation'],
    lastUpdated: '2024-12-01',
  },
  {
    id: '5',
    slug: 'streaming',
    name: 'Token Streaming',
    shortDescription: 'Continuous, real-time transfer of tokens from sender to recipient, enabling salary streams, subscriptions, and ongoing funding flows.',
    fullDescription: `Token streaming enables continuous, real-time transfer of tokens. Instead of lump sum payments, funds flow constantly from sender to recipient at a defined rate per second.

This enables new financial primitives like real-time salary payments, continuous subscriptions, and streaming grants. Recipients can access their earned funds at any moment, improving cash flow and reducing trust requirements.

Protocols like Superfluid and Drips have pioneered this approach.`,
    heroImage: '/images/streaming-hero.jpg',
    category: 'streaming',
    howItWorks: `1. Sender creates a stream with token and flow rate
2. Tokens continuously transfer in real-time
3. Recipient can withdraw accumulated funds anytime
4. Stream continues until stopped or funds depleted
5. Can be combined with other DeFi primitives`,
    advantages: [
      'Improved cash flow for recipients',
      'Real-time compensation',
      'Reduced counterparty risk',
      'Composable with DeFi',
      'Automatic, requires no manual transactions',
    ],
    limitations: [
      'Requires consistent sender balance',
      'Gas costs for modifications',
      'Complex accounting',
      'Limited to compatible tokens',
      'Learning curve for users',
    ],
    bestUsedFor: [
      'Ongoing salaries and compensation',
      'Subscription services',
      'Continuous grants',
      'Vesting schedules',
    ],
    implementations: ['superfluid', 'drips', 'protocol-guild'],
    technicalResources: [
      {
        title: 'Superfluid Documentation',
        url: 'https://docs.superfluid.finance',
        type: 'article',
      },
      {
        title: 'Drips Protocol',
        url: 'https://docs.drips.network',
        type: 'article',
      },
    ],
    originYear: 2020,
    relatedMechanisms: ['direct-grants', 'milestone-based'],
    tags: ['streaming', 'real-time', 'continuous', 'compensation'],
    lastUpdated: '2024-12-01',
  },
  {
    id: '6',
    slug: 'milestone-based',
    name: 'Milestone-Based Funding',
    shortDescription: 'Funding released in tranches as projects complete predefined milestones, reducing risk and ensuring accountability.',
    fullDescription: `Milestone-based funding releases capital in stages as projects complete agreed-upon deliverables. This approach balances the needs of funders (reduced risk, accountability) with grantees (sufficient capital to execute).

It's particularly common in larger grants where the funder wants to ensure progress before releasing additional funds. Smart contracts can automate milestone verification and fund release.`,
    heroImage: '/images/milestone-hero.jpg',
    category: 'allocation',
    howItWorks: `1. Project and funder agree on milestones and amounts
2. Initial tranche released to start work
3. Project completes and reports on milestone
4. Evaluator verifies completion
5. Next tranche released, process repeats`,
    advantages: [
      'Reduces funder risk',
      'Ensures accountability',
      'Provides clear checkpoints',
      'Aligns incentives',
      'Can be automated with smart contracts',
    ],
    limitations: [
      'Milestone definition is challenging',
      'Less flexible for exploratory work',
      'Administrative overhead',
      'Can slow down fast-moving projects',
      'Evaluation bottlenecks',
    ],
    bestUsedFor: [
      'Large development projects',
      'Infrastructure builds',
      'Long-term initiatives',
      'Higher-risk projects',
    ],
    implementations: ['arbitrum-dao-grants', 'ethereum-foundation-grants', 'allo-protocol'],
    technicalResources: [
      {
        title: 'Allo Milestone Strategies',
        url: 'https://docs.allo.gitcoin.co',
        type: 'article',
      },
    ],
    originYear: 1950,
    relatedMechanisms: ['direct-grants', 'streaming'],
    tags: ['milestones', 'tranches', 'accountability', 'risk'],
    lastUpdated: '2024-11-01',
  },
  {
    id: '7',
    slug: 'attestation-based',
    name: 'Attestation-Based Funding',
    shortDescription: 'Using onchain attestations and reputation signals to determine funding eligibility and amounts.',
    fullDescription: `Attestation-based funding uses onchain attestations (verified claims about identity, actions, or impact) to inform funding decisions. Instead of relying solely on applications or votes, it incorporates objective signals about a project or contributor.

This can include verified impact metrics, peer attestations, or automated oracle data. Ethereum Attestation Service (EAS) and similar protocols enable these verifiable claims.`,
    heroImage: '/images/attestation-hero.jpg',
    category: 'trust',
    howItWorks: `1. Projects or individuals collect relevant attestations
2. Attestations are verified and stored onchain
3. Funding algorithms incorporate attestation data
4. Higher/better attestations improve funding outcomes
5. Creates reputation systems over time`,
    advantages: [
      'Objective, verifiable inputs',
      'Reduces reliance on applications',
      'Builds persistent reputation',
      'Composable across platforms',
      'Resistant to some sybil attacks',
    ],
    limitations: [
      'Cold start problem for new participants',
      'Attestation quality varies',
      'Can create oligarchies',
      'Privacy concerns',
      'Gaming through fake attestations',
    ],
    bestUsedFor: [
      'Recurring grants',
      'Reputation-gated programs',
      'Impact verification',
      'Sybil resistance',
    ],
    implementations: [],
    technicalResources: [
      {
        title: 'Ethereum Attestation Service',
        url: 'https://attest.sh',
        type: 'article',
      },
      {
        title: 'Gitcoin Passport',
        url: 'https://passport.gitcoin.co',
        type: 'article',
      },
    ],
    originYear: 2022,
    relatedMechanisms: ['retroactive-funding', 'quadratic-funding'],
    tags: ['attestations', 'reputation', 'trust', 'identity'],
    lastUpdated: '2024-10-01',
  },
  {
    id: '8',
    slug: 'quadratic-voting',
    name: 'Quadratic Voting',
    shortDescription: 'A voting mechanism where the cost of additional votes increases quadratically, allowing for nuanced preference expression.',
    fullDescription: `Quadratic Voting allows participants to express the intensity of their preferences, not just direction. Each voter has a budget of "voice credits" and can allocate them across options, with the cost of votes increasing quadratically.

To cast 1 vote costs 1 credit. To cast 2 votes costs 4 credits (2²). To cast 3 votes costs 9 credits (3²). This makes it expensive to strongly influence any single decision while allowing nuanced preference expression.`,
    heroImage: '/images/qv-hero.jpg',
    category: 'voting',
    howItWorks: `1. Each voter receives equal voice credits
2. Votes are purchased with credits at quadratic cost
3. n votes = n² credits
4. Voters allocate across multiple issues
5. Results tabulated based on total votes`,
    advantages: [
      'Allows preference intensity expression',
      'More nuanced than 1-person-1-vote',
      'Mathematically robust',
      'Prevents tyranny of the majority',
      'Efficient collective decision making',
    ],
    limitations: [
      'Complex to explain',
      'Credit allocation is challenging',
      'Can still be gamed with money',
      'Requires trust in credit distribution',
      'User experience challenges',
    ],
    bestUsedFor: [
      'Budget allocation',
      'Multi-issue voting',
      'Governance decisions',
      'Prioritization exercises',
    ],
    implementations: [],
    technicalResources: [
      {
        title: 'Quadratic Voting Paper',
        url: 'https://www.aeaweb.org/articles?id=10.1257/aer.p20171033',
        type: 'paper',
      },
      {
        title: 'RadicalxChange QV',
        url: 'https://www.radicalxchange.org/concepts/quadratic-voting/',
        type: 'article',
      },
    ],
    inventors: ['E. Glen Weyl'],
    originYear: 2017,
    relatedMechanisms: ['quadratic-funding', 'conviction-voting'],
    tags: ['voting', 'quadratic', 'governance', 'preferences'],
    lastUpdated: '2024-10-01',
  },
]

export function getMechanismBySlug(slug: string): Mechanism | undefined {
  return mechanisms.find((m) => m.slug === slug)
}

export function getMechanismsByCategory(category: string): Mechanism[] {
  return mechanisms.filter((m) => m.category === category)
}

export function getFeaturedMechanisms(count: number = 4): Mechanism[] {
  return mechanisms.slice(0, count)
}
