// Content Types for Gitcoin.co Funding Directory

// Base content interface - shared by all content types
export interface BaseContent {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  logo?: string
  banner?: string
  tags: string[]
  lastUpdated: string
  featured?: boolean
  relatedApps?: string[]
  relatedMechanisms?: string[]
  relatedCaseStudies?: string[]
  relatedResearch?: string[]
  relatedCampaigns?: string[]
}

// All content types extend BaseContent with zero additional fields
export interface App extends BaseContent {}
export interface Mechanism extends BaseContent {}
export interface CaseStudy extends BaseContent {}
export interface Research extends BaseContent {
  sensemakingFor?: string
}
export interface Campaign extends BaseContent {
  externalUrl?: string
  matchingPoolUsd?: string
  projectsCount?: string
  startDate?: string
  endDate?: string
}

// Supporting types
export interface SocialLinks {
  twitter?: string
  discord?: string
  github?: string
  telegram?: string
  website?: string
  ens?: string
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
