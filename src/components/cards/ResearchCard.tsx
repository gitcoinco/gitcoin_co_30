import Link from 'next/link'
import Badge from '../ui/Badge'
import type { Research } from '@/lib/types'

interface ResearchCardProps {
  research: Research
}

export default function ResearchCard({ research }: ResearchCardProps) {
  return (
    <Link href={`/research/${research.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Banner */}
        {research.banner && (
          <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={research.banner}
              alt={research.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-light-white group-hover:text-light-white transition-colors mb-2 line-clamp-2">
          {research.name}
        </h3>

        {/* Abstract */}
        <p className="text-muted-gray text-sm mb-4 line-clamp-3 flex-grow">
          {research.shortDescription}
        </p>

        {/* Tags */}
        {research.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {research.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
            {research.tags.length > 3 && (
              <span className="text-xs text-muted-gray">
                +{research.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
