import type { Campaign } from '@/lib/types'

export const campaigns: Campaign[] = [
  {
    id: '1',
    slug: 'gg25',
    name: 'Gitcoin Grants 25',
    tagline: 'Funding the next wave of Ethereum public goods',
    description: 'GG25 brings together communities across the Ethereum ecosystem to fund public goods through quadratic funding. Multiple rounds support climate solutions, open source software, Ethereum infrastructure, and community initiatives.',
    heroImage: '/images/campaigns/gg25.jpg',
    status: 'upcoming',
    startDate: '2025-02-01',
    endDate: '2025-02-21',
    organizer: 'Gitcoin',
    mechanism: 'quadratic-funding',
    matchingPool: '$1M+',
    applicationUrl: 'https://grants.gitcoin.co',
    eligibility: [
      'Open source projects',
      'Public goods focus',
      'Active development',
      'Community engagement',
    ],
    isFeatured: true,
    featuredOrder: 1,
    tags: ['gitcoin', 'quadratic funding', 'grants', 'public goods'],
    lastUpdated: '2024-12-15',
  },
  {
    id: '2',
    slug: 'optimism-retropgf-5',
    name: 'Optimism RetroPGF Round 5',
    tagline: 'Rewarding Collective Impact',
    description: 'The fifth round of Optimism\'s Retroactive Public Goods Funding, continuing to reward projects that have demonstrated positive impact on the Optimism Collective and broader Ethereum ecosystem.',
    heroImage: '/images/campaigns/retropgf5.jpg',
    status: 'upcoming',
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    organizer: 'Optimism Collective',
    mechanism: 'retroactive-funding',
    fundingPool: '10M OP',
    applicationUrl: 'https://retrofunding.optimism.io',
    eligibility: [
      'Demonstrated impact on Optimism ecosystem',
      'Projects shipped before cutoff date',
      'Meets Collective values',
    ],
    isFeatured: true,
    featuredOrder: 2,
    tags: ['optimism', 'retroactive funding', 'public goods'],
    lastUpdated: '2024-12-10',
  },
  {
    id: '3',
    slug: 'octant-epoch-5',
    name: 'Octant Epoch 5',
    tagline: 'Participatory public goods funding',
    description: 'The fifth epoch of Octant\'s participatory funding model. GLM stakers earn ETH rewards and choose whether to donate to curated public goods projects or claim personally.',
    heroImage: '/images/campaigns/octant-e5.jpg',
    status: 'active',
    startDate: '2024-12-01',
    endDate: '2025-01-15',
    organizer: 'Octant',
    mechanism: 'quadratic-funding',
    matchingPool: '$1M+',
    applicationUrl: 'https://octant.app',
    eligibility: [
      'Verified public goods project',
      'Active in Ethereum ecosystem',
      'Completed Octant verification',
    ],
    isFeatured: true,
    featuredOrder: 3,
    tags: ['octant', 'staking', 'public goods'],
    lastUpdated: '2024-12-01',
  },
  {
    id: '4',
    slug: 'gg24-results',
    name: 'Gitcoin Grants 24',
    tagline: 'Community-driven funding at scale',
    description: 'GG24 funded hundreds of projects across climate, OSS, Ethereum infrastructure, and community rounds with over $2M in matching funds distributed through quadratic funding.',
    heroImage: '/images/campaigns/gg24.jpg',
    status: 'completed',
    startDate: '2024-10-15',
    endDate: '2024-11-05',
    organizer: 'Gitcoin',
    mechanism: 'quadratic-funding',
    matchingPool: '$2M+',
    isFeatured: false,
    results: {
      projectsFunded: 450,
      totalDistributed: '$2.3M',
      uniqueDonors: 15000,
      highlights: [
        'Largest GG round by project count',
        'Strong climate round participation',
        'New community rounds launched',
      ],
    },
    caseStudy: 'gg24-analysis',
    tags: ['gitcoin', 'quadratic funding', 'completed'],
    lastUpdated: '2024-11-15',
  },
  {
    id: '5',
    slug: 'arbitrum-ltip',
    name: 'Arbitrum LTIP',
    tagline: 'Long-Term Incentive Program',
    description: 'Arbitrum\'s improved incentive program building on learnings from STIP. Focuses on sustainable growth with better measurement and longer time horizons.',
    heroImage: '/images/campaigns/ltip.jpg',
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2025-03-31',
    organizer: 'Arbitrum DAO',
    mechanism: 'direct-grants',
    fundingPool: '45M ARB',
    applicationUrl: 'https://forum.arbitrum.foundation/ltip',
    eligibility: [
      'Active Arbitrum protocol',
      'Proven track record',
      'Detailed incentive plan',
      'Commitment to metrics',
    ],
    isFeatured: false,
    tags: ['arbitrum', 'incentives', 'ecosystem'],
    lastUpdated: '2024-11-01',
  },
  {
    id: '6',
    slug: 'retropgf-4-results',
    name: 'Optimism RetroPGF Round 4',
    tagline: 'Impact = Profit',
    description: 'Round 4 of Optimism\'s retroactive funding distributed 10M OP to projects across onchain builders, governance contributors, and OP Stack development.',
    heroImage: '/images/campaigns/retropgf4.jpg',
    status: 'completed',
    startDate: '2024-06-01',
    endDate: '2024-07-15',
    organizer: 'Optimism Collective',
    mechanism: 'retroactive-funding',
    fundingPool: '10M OP',
    isFeatured: false,
    results: {
      projectsFunded: 207,
      totalDistributed: '10M OP',
      highlights: [
        'Streamlined evaluation process',
        'New impact metrics introduced',
        'Broader category coverage',
      ],
    },
    tags: ['optimism', 'retroactive funding', 'completed'],
    lastUpdated: '2024-08-01',
  },
]

export function getCampaignBySlug(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug)
}

export function getActiveCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.status === 'active')
}

export function getUpcomingCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.status === 'upcoming')
}

export function getCompletedCampaigns(): Campaign[] {
  return campaigns.filter((c) => c.status === 'completed')
}

export function getFeaturedCampaigns(): Campaign[] {
  return campaigns
    .filter((c) => c.isFeatured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99))
}
