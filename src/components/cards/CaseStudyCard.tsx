import ContentCard from './ContentCard'
import type { CaseStudy } from '@/lib/types'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <ContentCard
      href={`/case-studies/${caseStudy.slug}`}
      name={caseStudy.name}
      shortDescription={caseStudy.shortDescription}
      tags={caseStudy.tags}
      layout="banner"
      banner={caseStudy.banner}
    />
  )
}
