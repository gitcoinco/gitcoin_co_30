import ContentCard from './ContentCard'
import type { Research } from '@/lib/types'

interface ResearchCardProps {
  research: Research
}

export default function ResearchCard({ research }: ResearchCardProps) {
  return (
    <ContentCard
      href={`/research/${research.slug}`}
      name={research.name}
      shortDescription={research.shortDescription}
      tags={research.tags}
      layout="banner"
      banner={research.banner}
    />
  )
}
