import Link from 'next/link'
import Badge from '../ui/Badge'
import type { CaseStudy } from '@/lib/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Banner */}
        {caseStudy.banner && (
          <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
            <img
              src={caseStudy.banner}
              alt={caseStudy.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-light-white group-hover:text-light-white transition-colors mb-2 line-clamp-2">
          {caseStudy.name}
        </h3>

        {/* Summary */}
        <p className="text-muted-gray text-sm mb-4 line-clamp-3 flex-grow">
          {caseStudy.shortDescription}
        </p>

        {/* Tags */}
        {caseStudy.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
            {caseStudy.tags.length > 3 && (
              <span className="text-xs text-muted-gray">
                +{caseStudy.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
