import type { App } from '@/lib/types'
import { getAppsFromMarkdown, getAppFromMarkdown } from '@/lib/markdown'

/**
 * Get all apps from .md files
 * Server-side only
 */
export function getAllApps(): App[] {
  return getAppsFromMarkdown()
}

/**
 * Get a single app by slug from .md files
 * Server-side only
 */
export function getAppBySlug(slug: string): App | undefined {
  return getAppFromMarkdown(slug)
}

/**
 * Get apps by category
 */
export function getAppsByCategory(category: string): App[] {
  const allApps = getAllApps()
  return allApps.filter((app) => app.category === category)
}

/**
 * Get apps by mechanism
 */
export function getAppsByMechanism(mechanism: string): App[] {
  const allApps = getAllApps()
  return allApps.filter((app) => app.mechanisms.includes(mechanism))
}

/**
 * Get featured apps
 */
export function getFeaturedApps(count: number = 6): App[] {
  const allApps = getAllApps()
  return allApps.filter((app) => app.status === 'active').slice(0, count)
}

// For static params generation and client components
export const apps = getAllApps()
