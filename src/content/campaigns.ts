import type { Campaign } from '@/lib/types'
import { getCampaignsFromMarkdown, getCampaignFromMarkdown } from '@/lib/markdown'

/**
 * Get all campaigns from .md files
 * Server-side only
 */
export function getAllCampaigns(): Campaign[] {
  return getCampaignsFromMarkdown()
}

/**
 * Get a single campaign by slug from .md files
 * Server-side only
 */
export function getCampaignBySlug(slug: string): Campaign | undefined {
  return getCampaignFromMarkdown(slug)
}

/**
 * Get campaigns by status
 */
export function getCampaignsByStatus(status: string): Campaign[] {
  const allCampaigns = getAllCampaigns()
  return allCampaigns.filter((c) => c.status === status)
}

/**
 * Get active campaigns
 */
export function getActiveCampaigns(): Campaign[] {
  return getCampaignsByStatus('active')
}

/**
 * Get upcoming campaigns
 */
export function getUpcomingCampaigns(): Campaign[] {
  return getCampaignsByStatus('upcoming')
}

/**
 * Get completed campaigns
 */
export function getCompletedCampaigns(): Campaign[] {
  return getCampaignsByStatus('completed')
}

/**
 * Get featured campaigns
 */
export function getFeaturedCampaigns(): Campaign[] {
  const allCampaigns = getAllCampaigns()
  return allCampaigns
    .filter((c) => c.isFeatured)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999))
}

// For static params generation and client components
export const campaigns = getAllCampaigns()
