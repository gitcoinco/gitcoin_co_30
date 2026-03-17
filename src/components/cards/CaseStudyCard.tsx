import ContentCard from './ContentCard'
import type { CaseStudy } from '@/lib/types'
import { calcReadTime } from '@/lib/utils'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const authors = caseStudy.authors ?? []
  return (
    <ContentCard
      href={`/case-studies/${caseStudy.slug}`}
      name={caseStudy.name}
      shortDescription={caseStudy.shortDescription}
      tags={caseStudy.tags}
      layout="banner"
      banner={caseStudy.banner}
      readTime={calcReadTime(caseStudy.description)}
      date={caseStudy.lastUpdated}
      authors={authors}
    />
  )
}
