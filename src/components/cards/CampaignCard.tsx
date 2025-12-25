import Link from 'next/link'
import { ArrowRight, Calendar, Users, Coins } from 'lucide-react'
import Badge from '../ui/Badge'
import type { Campaign } from '@/lib/types'

interface CampaignCardProps {
  campaign: Campaign
  featured?: boolean
}

const statusVariants: Record<string, 'active' | 'warning' | 'default'> = {
  active: 'active',
  upcoming: 'warning',
  completed: 'default',
}

const statusLabels = {
  active: 'Live Now',
  upcoming: 'Upcoming',
  completed: 'Completed',
}

export default function CampaignCard({ campaign, featured = false }: CampaignCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const getTimeRemaining = () => {
    const end = new Date(campaign.endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return 'Ended'
    if (days === 0) return 'Ends today'
    if (days === 1) return '1 day left'
    return `${days} days left`
  }

  return (
    <Link href={`/campaigns/${campaign.slug}`}>
      <div className={`${featured ? 'card-featured' : 'card'} group h-full flex flex-col`}>
        {/* Hero Image */}
        {campaign.heroImage && (
          <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={campaign.heroImage}
              alt={campaign.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <Badge variant={statusVariants[campaign.status]}>
                {statusLabels[campaign.status]}
              </Badge>
            </div>
            {campaign.status === 'active' && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {getTimeRemaining()}
              </div>
            )}
          </div>
        )}

        {/* Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-text-primary group-hover:text-gitcoin-green transition-colors mb-1">
            {campaign.name}
          </h3>
          <p className="text-text-secondary">{campaign.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
          {campaign.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {campaign.matchingPool && (
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-lichenpunk-moss" />
              <div>
                <p className="text-xs text-text-secondary">Matching Pool</p>
                <p className="text-sm font-medium text-text-primary">{campaign.matchingPool}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-lichenpunk-moss" />
            <div>
              <p className="text-xs text-text-secondary">Dates</p>
              <p className="text-sm font-medium text-text-primary">
                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Results (for completed campaigns) */}
        {campaign.results && (
          <div className="bg-lichenpunk-offWhite -mx-6 px-6 py-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Projects funded</span>
              <span className="font-medium text-text-primary">{campaign.results.projectsFunded}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total distributed</span>
              <span className="font-medium text-gitcoin-green">{campaign.results.totalDistributed}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-lichenpunk-warmGray">
          <span className="text-sm text-text-secondary">
            {campaign.organizer}
          </span>
          <ArrowRight className="w-4 h-4 text-lichenpunk-moss group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
