import type { Research } from '@/lib/types'
import { getResearchFromMarkdown, getResearchItemFromMarkdown } from '@/lib/markdown'

/**
 * Get all research from .md files
 * Server-side only
 */
export function getAllResearch(): Research[] {
  return getResearchFromMarkdown()
}

/**
 * Get a single research item by slug from .md files
 * Server-side only
 */
export function getResearchBySlug(slug: string): Research | undefined {
  return getResearchItemFromMarkdown(slug)
}

/**
 * Get featured research (sorted by most recent)
 */
export function getFeaturedResearch(count: number = 3): Research[] {
  const allResearch = getAllResearch()
  return [...allResearch]
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
    .slice(0, count)
}

/**
 * Get the sensemaking research article for a given category
 */
export function getSensemakingFor(category: string): Research | undefined {
  return research.find(r => r.sensemakingFor === category)
}

// For static params generation and client components
export const research = getAllResearch()
