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
 * Get mechanisms by category
 */
export function getMechanismsByCategory(category: string): Mechanism[] {
  const allMechanisms = getAllMechanisms()
  return allMechanisms.filter((m) => m.category === category)
}

/**
 * Get featured mechanisms
 */
export function getFeaturedMechanisms(count: number = 4): Mechanism[] {
  const allMechanisms = getAllMechanisms()
  return allMechanisms.slice(0, count)
}

// For static params generation and client components
export const mechanisms = getAllMechanisms()
