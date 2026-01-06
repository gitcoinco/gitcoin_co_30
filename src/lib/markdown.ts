import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { CaseStudy, App, Mechanism, Research, Campaign } from './types'

const contentDirectory = path.join(process.cwd(), 'src', 'content')
const caseStudiesDirectory = path.join(contentDirectory, 'case-studies')
const appsDirectory = path.join(contentDirectory, 'apps')
const mechanismsDirectory = path.join(contentDirectory, 'mechanisms')
const researchDirectory = path.join(contentDirectory, 'research')
const campaignsDirectory = path.join(contentDirectory, 'campaigns')

// Helper function to read all markdown files from a directory
function readMarkdownFiles<T>(directory: string, parser: (data: any, content: string, slug: string) => T): T[] {
  if (!fs.existsSync(directory)) {
    return []
  }

  const fileNames = fs.readdirSync(directory)
  const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'))

  return markdownFiles.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return parser(data, content.trim(), slug)
  })
}

// Helper function to read a single markdown file
function readMarkdownFile<T>(directory: string, slug: string, parser: (data: any, content: string, slug: string) => T): T | undefined {
  const filePath = path.join(directory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return undefined
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return parser(data, content.trim(), slug)
}

// ============================================
// CASE STUDIES
// ============================================

function parseCaseStudy(data: any, content: string, slug: string): CaseStudy {
  return {
    id: data.id || slug,
    slug: data.slug || slug,
    title: data.title || '',
    summary: data.summary || '',
    content,
    heroImage: data.heroImage,
    project: data.project || '',
    platform: data.platform || '',
    mechanism: data.mechanism || '',
    fundingAmount: data.fundingAmount || '',
    fundingDate: data.fundingDate || '',
    outcomes: data.outcomes || [],
    lessonsLearned: data.lessonsLearned || [],
    status: data.status || 'ongoing',
    author: data.author || data.submittedBy || '',
    sources: data.sources || [],
    tags: data.tags || [],
    publishDate: data.publishDate || data.date || new Date().toISOString().split('T')[0],
    lastUpdated: data.lastUpdated || data.date || new Date().toISOString().split('T')[0],
  } as CaseStudy
}

export function getCaseStudiesFromMarkdown(): CaseStudy[] {
  return readMarkdownFiles(caseStudiesDirectory, parseCaseStudy)
}

export function getCaseStudyFromMarkdown(slug: string): CaseStudy | undefined {
  return readMarkdownFile(caseStudiesDirectory, slug, parseCaseStudy)
}

// ============================================
// APPS
// ============================================

function parseApp(data: any, content: string, slug: string): App {
  return {
    id: data.id || slug,
    slug: data.slug || slug,
    name: data.name || '',
    tagline: data.tagline || '',
    description: content,
    logo: data.logo,
    website: data.website || '',
    category: data.category || 'platform',
    mechanisms: data.mechanisms || [],
    blockchain: data.blockchain || [],
    launchDate: data.launchDate,
    status: data.status || 'active',
    fundingVolume: data.fundingVolume,
    socialLinks: data.socialLinks || {},
    tags: data.tags || [],
    lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
    themeMode: data.themeMode,
  } as App
}

export function getAppsFromMarkdown(): App[] {
  return readMarkdownFiles(appsDirectory, parseApp)
}

export function getAppFromMarkdown(slug: string): App | undefined {
  return readMarkdownFile(appsDirectory, slug, parseApp)
}

// ============================================
// MECHANISMS
// ============================================

function parseMechanism(data: any, content: string, slug: string): Mechanism {
  return {
    id: data.id || slug,
    slug: data.slug || slug,
    name: data.name || '',
    shortDescription: data.shortDescription || '',
    fullDescription: content,
    heroImage: data.heroImage,
    category: data.category || 'allocation',
    howItWorks: data.howItWorks || '',
    advantages: data.advantages || [],
    limitations: data.limitations || [],
    bestUsedFor: data.bestUsedFor || [],
    implementations: data.implementations || [],
    technicalResources: data.technicalResources || [],
    inventors: data.inventors,
    originYear: data.originYear,
    relatedMechanisms: data.relatedMechanisms || [],
    tags: data.tags || [],
    lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
  } as Mechanism
}

export function getMechanismsFromMarkdown(): Mechanism[] {
  return readMarkdownFiles(mechanismsDirectory, parseMechanism)
}

export function getMechanismFromMarkdown(slug: string): Mechanism | undefined {
  return readMarkdownFile(mechanismsDirectory, slug, parseMechanism)
}

// ============================================
// RESEARCH
// ============================================

function parseResearch(data: any, content: string, slug: string): Research {
  return {
    id: data.id || slug,
    slug: data.slug || slug,
    title: data.title || '',
    abstract: data.abstract || '',
    content,
    heroImage: data.heroImage,
    type: data.type || 'analysis',
    dataVisualizations: data.dataVisualizations || [],
    relatedApps: data.relatedApps || [],
    relatedMechanisms: data.relatedMechanisms || [],
    timeframe: data.timeframe,
    authors: data.authors || [],
    sources: data.sources || [],
    tags: data.tags || [],
    publishDate: data.publishDate || new Date().toISOString().split('T')[0],
    lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
  } as Research
}

export function getResearchFromMarkdown(): Research[] {
  return readMarkdownFiles(researchDirectory, parseResearch)
}

export function getResearchItemFromMarkdown(slug: string): Research | undefined {
  return readMarkdownFile(researchDirectory, slug, parseResearch)
}

// ============================================
// CAMPAIGNS
// ============================================

function parseCampaign(data: any, content: string, slug: string): Campaign {
  return {
    id: data.id || slug,
    slug: data.slug || slug,
    name: data.name || '',
    tagline: data.tagline || '',
    description: content,
    heroImage: data.heroImage,
    status: data.status || 'upcoming',
    startDate: data.startDate || '',
    endDate: data.endDate || '',
    organizer: data.organizer || '',
    mechanism: data.mechanism || '',
    fundingPool: data.fundingPool,
    matchingPool: data.matchingPool,
    applicationUrl: data.applicationUrl,
    eligibility: data.eligibility,
    isFeatured: data.isFeatured || false,
    featuredOrder: data.featuredOrder,
    results: data.results,
    caseStudy: data.caseStudy,
    tags: data.tags || [],
    lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
  } as Campaign
}

export function getCampaignsFromMarkdown(): Campaign[] {
  return readMarkdownFiles(campaignsDirectory, parseCampaign)
}

export function getCampaignFromMarkdown(slug: string): Campaign | undefined {
  return readMarkdownFile(campaignsDirectory, slug, parseCampaign)
}
