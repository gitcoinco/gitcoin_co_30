import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react'
import Badge from '../ui/Badge'
import type { CaseStudy } from '@/lib/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

const statusIcons = {
  success: CheckCircle,
  partial: AlertCircle,
  ongoing: Clock,
  failed: XCircle,
}

const statusLabels = {
  success: 'Success',
  partial: 'Partial Success',
  ongoing: 'Ongoing',
  failed: 'Failed',
}

const statusVariants: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  success: 'success',
  partial: 'warning',
  ongoing: 'info',
  failed: 'error',
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const StatusIcon = statusIcons[caseStudy.status]

  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Hero Image */}
        {caseStudy.heroImage && (
          <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-light-white group-hover:text-light-white transition-colors mb-2 line-clamp-2">
          {caseStudy.title}
        </h3>

        {/* Summary */}
        <p className="text-muted-gray text-sm mb-4 line-clamp-2 flex-grow">
          {caseStudy.summary}
        </p>

        {/* Status & Amount */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={statusVariants[caseStudy.status]} size="sm">
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusLabels[caseStudy.status]}
          </Badge>
          <span className="text-sm font-medium text-light-white">
            {caseStudy.fundingAmount}
          </span>
        </div>

        {/* Project Info */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-gray">
          <div>
            <p className="text-xs text-muted-gray">Project</p>
            <p className="text-sm font-medium text-light-white">{caseStudy.project}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-light-white group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}
