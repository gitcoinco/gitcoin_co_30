import Link from 'next/link'
import { ArrowRight, Calendar, Coins } from 'lucide-react'
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
      year: 'numeric',
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
            <div className="absolute inset-0 bg-gradient-to-t from-void-black/70 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant={statusVariants[campaign.status]}>
                {statusLabels[campaign.status]}
              </Badge>
            </div>
            {campaign.status === 'active' && (
              <div className="absolute bottom-4 right-4 bg-void-black/80 text-light-white px-3 py-1 rounded-full text-sm border border-dark-gray">
                {getTimeRemaining()}
              </div>
            )}
          </div>
        )}

        {/* Title & Tagline */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-light-white group-hover:text-light-white transition-colors mb-1">
            {campaign.name}
          </h3>
          <p className="text-muted-gray">{campaign.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-muted-gray text-sm mb-4 line-clamp-2 flex-grow">
          {campaign.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {campaign.matchingPool && (
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-light-white" />
              <div>
                <p className="text-xs text-muted-gray">Matching Pool</p>
                <p className="text-sm font-medium text-light-white">{campaign.matchingPool}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-light-white" />
            <div>
              <p className="text-xs text-muted-gray">Dates</p>
              <p className="text-sm font-medium text-light-white">
                {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Results (for completed campaigns) */}
        {campaign.results && (
          <div className="bg-charcoal border border-dark-gray rounded-lg -mx-2 px-4 py-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-gray">Projects funded</span>
              <span className="font-medium text-light-white">{campaign.results.projectsFunded}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-gray">Total distributed</span>
              <span className="font-medium text-light-white">{campaign.results.totalDistributed}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-gray">
          <span className="text-sm text-muted-gray">
            {campaign.organizer}
          </span>
          <ArrowRight className="w-4 h-4 text-light-white group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
