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

// Generic parser for all BaseContent types
function parseBaseContent(data: any, content: string, slug: string): App | Mechanism | CaseStudy | Research | Campaign {
  return {
    id: data.id || slug,
    slug: data.slug || slug,
    name: data.name || '',
    shortDescription: data.shortDescription || '',
    description: content,
    logo: data.logo,
    banner: data.banner,
    tags: data.tags || [],
    lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
    featured: data.featured || false,
    relatedApps: data.relatedApps || [],
    relatedMechanisms: data.relatedMechanisms || [],
  }
}

// ============================================
// CASE STUDIES
// ============================================

function parseCaseStudy(data: any, content: string, slug: string): CaseStudy {
  return parseBaseContent(data, content, slug) as CaseStudy
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
  return parseBaseContent(data, content, slug) as App
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
  return parseBaseContent(data, content, slug) as Mechanism
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
    ...parseBaseContent(data, content, slug),
    sensemakingFor: data.sensemakingFor,
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
    ...parseBaseContent(data, content, slug),
    externalUrl: data.externalUrl,
    matchingPoolUsd: data.matchingPoolUsd,
    projectsCount: data.projectsCount,
    startDate: data.startDate,
    endDate: data.endDate,
  } as Campaign
}

export function getCampaignsFromMarkdown(): Campaign[] {
  return readMarkdownFiles(campaignsDirectory, parseCampaign)
}

export function getCampaignFromMarkdown(slug: string): Campaign | undefined {
  return readMarkdownFile(campaignsDirectory, slug, parseCampaign)
}
