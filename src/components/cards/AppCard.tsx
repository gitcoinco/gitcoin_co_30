import Link from 'next/link'
import Badge from '../ui/Badge'
import type { App } from '@/lib/types'

interface AppCardProps {
  app: App
  featured?: boolean
}

export default function AppCard({ app, featured = false }: AppCardProps) {
  return (
    <Link href={`/apps/${app.slug}`}>
      <div className={`${featured ? 'card-featured' : 'card'} group h-full flex flex-col`}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {app.logo ? (
            <img
              src={app.logo}
              alt={`${app.name} logo`}
              className="w-12 h-12 rounded-lg object-cover bg-dark-gray"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-dark-gray border border-muted-gray/30 flex items-center justify-center">
              <span className="text-xl font-bold text-light-white">
                {app.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-light-white group-hover:text-light-white transition-colors truncate">
              {app.name}
            </h3>
            <p className="text-sm text-muted-gray truncate">{app.shortDescription}</p>
          </div>
          {featured && (
            <Badge variant="active" size="sm">Featured</Badge>
          )}
        </div>

        {/* Tags */}
        {app.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {app.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-dark-gray border border-muted-gray/30 rounded text-muted-gray"
              >
                {tag}
              </span>
            ))}
            {app.tags.length > 3 && (
              <span className="text-xs text-muted-gray">
                +{app.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
