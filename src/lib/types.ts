// Content Types for Gitcoin.co Funding Directory

export type ThemeMode = 'lichenpunk' | 'solarpunk' | 'lunarpunk'

export type AppCategory = 'platform' | 'dao' | 'grant-program' | 'fund' | 'primitive'
export type AppStatus = 'active' | 'deprecated' | 'upcoming'

export interface SocialLinks {
  twitter?: string
  discord?: string
  github?: string
  telegram?: string
  website?: string
  ens?: string
}

export interface App {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  logo?: string
  website: string
  category: AppCategory
  mechanisms: string[] // slugs of mechanisms
  blockchain: string[]
  launchDate?: string
  status: AppStatus
  fundingVolume?: string
  socialLinks: SocialLinks
  tags: string[]
  lastUpdated: string
  themeMode?: ThemeMode
}

export type MechanismCategory = 'allocation' | 'voting' | 'streaming' | 'trust' | 'hybrid'

export interface TechnicalResource {
  title: string
  url: string
  type: 'paper' | 'repo' | 'article' | 'video'
}

export interface Mechanism {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: string
  heroImage?: string
  category: MechanismCategory
  howItWorks: string
  advantages: string[]
  limitations: string[]
  bestUsedFor: string[]
  implementations: string[] // app slugs
  technicalResources: TechnicalResource[]
  inventors?: string[]
  originYear?: number
  relatedMechanisms: string[] // mechanism slugs
  tags: string[]
  lastUpdated: string
}

export type CaseStudyStatus = 'success' | 'partial' | 'failed' | 'ongoing'

export interface CaseStudyOutcome {
  title: string
  description: string
  metrics?: string
}

export interface Source {
  title: string
  url: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  heroImage?: string
  project: string
  platform: string // app slug
  mechanism: string // mechanism slug
  fundingAmount: string
  fundingDate: string
  outcomes: CaseStudyOutcome[]
  lessonsLearned: string[]
  status: CaseStudyStatus
  author: string
  sources: Source[]
  tags: string[]
  publishDate: string
  lastUpdated: string
}

export type ResearchType = 'analysis' | 'report' | 'trend' | 'opinion' | 'data'

export interface DataVisualization {
  title: string
  type: 'chart' | 'graph' | 'table' | 'infographic'
  embed?: string
  image?: string
}

export interface Research {
  id: string
  slug: string
  title: string
  abstract: string
  content: string
  heroImage?: string
  type: ResearchType
  dataVisualizations: DataVisualization[]
  relatedApps: string[]
  relatedMechanisms: string[]
  timeframe?: string
  authors: string[]
  sources: Source[]
  tags: string[]
  publishDate: string
  lastUpdated: string
}

export type CampaignStatus = 'upcoming' | 'active' | 'completed'

export interface CampaignResults {
  projectsFunded: number
  totalDistributed: string
  uniqueDonors?: number
  highlights: string[]
}

export interface Campaign {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  heroImage?: string
  status: CampaignStatus
  startDate: string
  endDate: string
  organizer: string
  mechanism: string // mechanism slug
  fundingPool?: string
  matchingPool?: string
  applicationUrl?: string
  eligibility?: string[]
  isFeatured: boolean
  featuredOrder?: number
  results?: CampaignResults
  caseStudy?: string // case study slug
  tags: string[]
  lastUpdated: string
}

export interface Contributor {
  id: string
  slug: string
  name: string
  avatar?: string
  bio?: string
  role?: string
  organization?: string
  socialLinks: SocialLinks
  contributions: number
  joinDate: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

// Search types
export interface SearchResult {
  type: 'app' | 'mechanism' | 'case-study' | 'research' | 'campaign'
  slug: string
  title: string
  description: string
  tags: string[]
}
