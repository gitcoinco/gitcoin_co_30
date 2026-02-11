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
 * Get featured apps (items with featured: true in frontmatter)
 */
export function getFeaturedApps(count: number = 6): App[] {
  return apps.filter(a => a.featured).slice(0, count)
}

// For static params generation and client components
export const apps = getAllApps()
