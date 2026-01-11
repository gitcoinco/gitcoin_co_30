import ContentCard from './ContentCard'
import type { Campaign } from '@/lib/types'

interface CampaignCardProps {
  campaign: Campaign
  featured?: boolean
}

export default function CampaignCard({ campaign, featured = false }: CampaignCardProps) {
  return (
    <ContentCard
      href={`/campaigns/${campaign.slug}`}
      name={campaign.name}
      shortDescription={campaign.shortDescription}
      tags={campaign.tags}
      featured={featured}
      layout="banner"
      banner={campaign.banner}
      bannerHeight="h-48"
    />
  )
}
