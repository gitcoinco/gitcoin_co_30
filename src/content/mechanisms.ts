import type { Mechanism } from '@/lib/types'
import { getMechanismsFromMarkdown, getMechanismFromMarkdown } from '@/lib/markdown'

/**
 * Get all mechanisms from .md files
 * Server-side only
 */
export function getAllMechanisms(): Mechanism[] {
  return getMechanismsFromMarkdown()
}

/**
 * Get a single mechanism by slug from .md files
 * Server-side only
 */
export function getMechanismBySlug(slug: string): Mechanism | undefined {
  return getMechanismFromMarkdown(slug)
}

/**
 * Get featured mechanisms
 */
export function getFeaturedMechanisms(count: number = 4): Mechanism[] {
  const allMechanisms = getAllMechanisms()
  const featured = allMechanisms.filter(m => m.featured)
  const rest = allMechanisms
    .filter(m => !m.featured)
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
  return [...featured, ...rest].slice(0, count)
}

// For static params generation and client components
export const mechanisms = getAllMechanisms()
