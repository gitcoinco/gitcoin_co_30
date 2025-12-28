import Link from 'next/link'
import { ArrowRight, Zap, Vote, Droplets, Shield, Layers } from 'lucide-react'
import Badge from '../ui/Badge'
import type { Mechanism } from '@/lib/types'

interface MechanismCardProps {
  mechanism: Mechanism
}

const categoryIcons = {
  allocation: Zap,
  voting: Vote,
  streaming: Droplets,
  trust: Shield,
  hybrid: Layers,
}

const categoryLabels: Record<string, string> = {
  allocation: 'Allocation',
  voting: 'Voting',
  streaming: 'Streaming',
  trust: 'Trust-based',
  hybrid: 'Hybrid',
}

export default function MechanismCard({ mechanism }: MechanismCardProps) {
  const Icon = categoryIcons[mechanism.category]

  return (
    <Link href={`/mechanisms/${mechanism.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Icon & Category */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-light-white/10 border border-light-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-light-white" />
          </div>
          <Badge size="sm">{categoryLabels[mechanism.category]}</Badge>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-light-white group-hover:text-light-white transition-colors mb-2">
          {mechanism.name}
        </h3>

        {/* Description */}
        <p className="text-muted-gray text-sm mb-4 line-clamp-3 flex-grow">
          {mechanism.shortDescription}
        </p>

        {/* Best Used For */}
        {mechanism.bestUsedFor.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-gray mb-2">Best for:</p>
            <div className="flex flex-wrap gap-1">
              {mechanism.bestUsedFor.slice(0, 2).map((use) => (
                <span
                  key={use}
                  className="text-xs px-2 py-0.5 bg-dark-gray border border-muted-gray/30 rounded text-muted-gray"
                >
                  {use}
                </span>
              ))}
              {mechanism.bestUsedFor.length > 2 && (
                <span className="text-xs text-muted-gray">
                  +{mechanism.bestUsedFor.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-gray">
          <span className="text-sm text-muted-gray">
            {mechanism.implementations.length} implementation{mechanism.implementations.length !== 1 ? 's' : ''}
          </span>
          <ArrowRight className="w-4 h-4 text-light-white group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
