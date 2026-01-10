import Link from 'next/link'
import Badge from '../ui/Badge'
import type { Mechanism } from '@/lib/types'

interface MechanismCardProps {
  mechanism: Mechanism
}

export default function MechanismCard({ mechanism }: MechanismCardProps) {
  return (
    <Link href={`/mechanisms/${mechanism.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Banner */}
        {mechanism.banner && (
          <div className="relative h-32 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={mechanism.banner}
              alt={mechanism.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-light-white group-hover:text-light-white transition-colors mb-2">
          {mechanism.name}
        </h3>

        {/* Description */}
        <p className="text-muted-gray text-sm mb-4 line-clamp-3 flex-grow">
          {mechanism.shortDescription}
        </p>

        {/* Tags */}
        {mechanism.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mechanism.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
            {mechanism.tags.length > 3 && (
              <span className="text-xs text-muted-gray">
                +{mechanism.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
