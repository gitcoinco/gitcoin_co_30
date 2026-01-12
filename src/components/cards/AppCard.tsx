import ContentCard from './ContentCard'
import type { App } from '@/lib/types'

interface AppCardProps {
  app: App
  featured?: boolean
}

export default function AppCard({ app, featured = false }: AppCardProps) {
  return (
    <ContentCard
      href={`/apps/${app.slug}`}
      name={app.name}
      shortDescription={app.shortDescription}
      tags={app.tags}
      featured={featured}
      layout="logo"
      logo={app.logo}
    />
  )
}
