import ContentCard from './ContentCard'
import type { Mechanism } from '@/lib/types'

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
      layout="logo"
      logo={mechanism.logo}
    />
  )
}
