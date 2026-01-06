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
 * Get case studies by platform
 * Server-side only
 */
export function getCaseStudiesByPlatform(platform: string): CaseStudy[] {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.filter((cs) => cs.platform === platform)
}

/**
 * Get case studies by mechanism
 * Server-side only
 */
export function getCaseStudiesByMechanism(mechanism: string): CaseStudy[] {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.filter((cs) => cs.mechanism === mechanism)
}

/**
 * Get featured case studies
 * Server-side only
 */
export function getFeaturedCaseStudies(count: number = 3): CaseStudy[] {
  const allCaseStudies = getAllCaseStudies()
  return allCaseStudies.slice(0, count)
}

// For static params generation in Next.js
export const caseStudies = getAllCaseStudies()
