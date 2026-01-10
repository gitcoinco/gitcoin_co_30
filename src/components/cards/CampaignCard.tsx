import Link from 'next/link'
import Badge from '../ui/Badge'
import type { Campaign } from '@/lib/types'

interface CampaignCardProps {
  campaign: Campaign
  featured?: boolean
}

export default function CampaignCard({ campaign, featured = false }: CampaignCardProps) {
  return (
    <Link href={`/campaigns/${campaign.slug}`}>
      <div className={`${featured ? 'card-featured' : 'card'} group h-full flex flex-col`}>
        {/* Banner */}
        {campaign.banner && (
          <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={campaign.banner}
              alt={campaign.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title & Description */}
        <div className="mb-4 flex-grow">
          <h3 className="text-xl font-semibold text-light-white group-hover:text-light-white transition-colors mb-2">
            {campaign.name}
          </h3>
          <p className="text-muted-gray text-sm">{campaign.shortDescription}</p>
        </div>

        {/* Tags */}
        {campaign.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {campaign.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
            {campaign.tags.length > 3 && (
              <span className="text-xs text-muted-gray">
                +{campaign.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
