import ContentCard from './ContentCard'
import type { Mechanism } from '@/lib/types'
import { calcReadTime } from '@/lib/utils'

interface MechanismCardProps {
  mechanism: Mechanism
}

export default function MechanismCard({ mechanism }: MechanismCardProps) {
  return (
    <ContentCard
      href={`/mechanisms/${mechanism.slug}`}
      name={mechanism.name}
      shortDescription={mechanism.shortDescription}
      tags={mechanism.tags}
      layout="banner"
      banner={mechanism.banner}
      readTime={calcReadTime(mechanism.description)}
      date={mechanism.lastUpdated}
    />
  )
}
