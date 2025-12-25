import Link from 'next/link'
import { ArrowRight, BarChart3, FileText, TrendingUp, MessageSquare, Database } from 'lucide-react'
import Badge from '../ui/Badge'
import type { Research } from '@/lib/types'

interface ResearchCardProps {
  research: Research
}

const typeIcons = {
  analysis: BarChart3,
  report: FileText,
  trend: TrendingUp,
  opinion: MessageSquare,
  data: Database,
}

const typeLabels: Record<string, string> = {
  analysis: 'Analysis',
  report: 'Report',
  trend: 'Trend',
  opinion: 'Opinion',
  data: 'Data',
}

export default function ResearchCard({ research }: ResearchCardProps) {
  const Icon = typeIcons[research.type]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <Link href={`/research/${research.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Hero Image */}
        {research.heroImage && (
          <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={research.heroImage}
              alt={research.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Type Badge & Date */}
        <div className="flex items-center justify-between mb-3">
          <Badge size="sm">
            <Icon className="w-3 h-3 mr-1" />
            {typeLabels[research.type]}
          </Badge>
          <span className="text-xs text-text-secondary">
            {formatDate(research.publishDate)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-gitcoin-green transition-colors mb-2 line-clamp-2">
          {research.title}
        </h3>

        {/* Abstract */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">
          {research.abstract}
        </p>

        {/* Authors */}
        <div className="flex items-center justify-between pt-4 border-t border-lichenpunk-warmGray">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">
              By {research.authors.join(', ')}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-lichenpunk-moss group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
