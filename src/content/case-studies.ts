import type { CaseStudy } from '@/lib/types'
import { getCaseStudiesFromMarkdown, getCaseStudyFromMarkdown } from '@/lib/markdown'

/**
 * Get all case studies from .md files
 * Server-side only
 */
export function getAllCaseStudies(): CaseStudy[] {
  return getCaseStudiesFromMarkdown()
}

/**
 * Get a single case study by slug from .md files
 * Server-side only
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getCaseStudyFromMarkdown(slug)
}

/**
 * Get featured case studies
 * Server-side only
 */
export function getFeaturedCaseStudies(count: number = 3): CaseStudy[] {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.slice(0, count)
}

/**
 * Get case studies by platform (deprecated - use relatedApps filter)
 */
export function getCaseStudiesByPlatform(platform: string): CaseStudy[] {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.filter((cs) => cs.relatedApps?.includes(platform) || false)
}

// For static params generation in Next.js
export const caseStudies = getAllCaseStudies()
