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
 * Get active campaigns (returns all campaigns for now)
 */
export function getActiveCampaigns(): Campaign[] {
  return getAllCampaigns()
}

/**
 * Get featured campaigns (returns first few campaigns)
 */
export function getFeaturedCampaigns(count: number = 6): Campaign[] {
  const allCampaigns = getAllCampaigns()
  return allCampaigns.slice(0, count)
}

// For static params generation and client components
export const campaigns = getAllCampaigns()
