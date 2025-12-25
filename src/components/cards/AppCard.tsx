import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import type { App } from '@/lib/types'

interface AppCardProps {
  app: App
  featured?: boolean
}

export default function AppCard({ app, featured = false }: AppCardProps) {
  const categoryLabels: Record<string, string> = {
    platform: 'Platform',
    dao: 'DAO',
    'grant-program': 'Grant Program',
    fund: 'Fund',
    primitive: 'Primitive',
  }

  const statusVariants: Record<string, 'success' | 'warning' | 'default'> = {
    active: 'success',
    upcoming: 'warning',
    deprecated: 'default',
  }

  return (
    <Link href={`/apps/${app.slug}`}>
      <div className={`${featured ? 'card-featured' : 'card'} group h-full flex flex-col`}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {app.logo ? (
            <img
              src={app.logo}
              alt={`${app.name} logo`}
              className="w-12 h-12 rounded-lg object-cover bg-lichenpunk-warmGray"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-lichenpunk-warmGray flex items-center justify-center">
              <span className="text-xl font-bold text-lichenpunk-lichen">
                {app.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary group-hover:text-gitcoin-green transition-colors truncate">
              {app.name}
            </h3>
            <p className="text-sm text-text-secondary truncate">{app.tagline}</p>
          </div>
          {featured && (
            <Badge variant="active" size="sm">Featured</Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
          {app.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>{categoryLabels[app.category]}</Badge>
          <Badge variant={statusVariants[app.status]}>
            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-lichenpunk-warmGray">
          {app.fundingVolume && (
            <span className="text-sm font-medium text-lichenpunk-moss">
              {app.fundingVolume} funded
            </span>
          )}
          <div className="flex items-center gap-2">
            {app.blockchain.slice(0, 2).map((chain) => (
              <span
                key={chain}
                className="text-xs px-2 py-0.5 bg-lichenpunk-warmGray rounded text-text-secondary"
              >
                {chain}
              </span>
            ))}
            {app.blockchain.length > 2 && (
              <span className="text-xs text-text-secondary">
                +{app.blockchain.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
