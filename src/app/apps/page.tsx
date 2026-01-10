import { Metadata } from 'next'
import { AppCard } from '@/components/cards'
import { ListPageLayout, ListPageHeader, FilterBar, ResultsBar, ItemsGrid } from '@/components/layouts'
import { apps } from '@/content/apps'

export const metadata: Metadata = {
  title: 'Apps Directory',
  description: 'Explore funding platforms, DAOs, grant programs, and primitives in the Ethereum ecosystem.',
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'platform', label: 'Platforms' },
  { value: 'dao', label: 'DAOs' },
  { value: 'grant-program', label: 'Grant Programs' },
  { value: 'fund', label: 'Funds' },
  { value: 'primitive', label: 'Primitives' },
]

export default function AppsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Funding Apps Directory"
        description="Explore the platforms, DAOs, grant programs, and funding primitives that power Ethereum's public goods ecosystem."
        searchPlaceholder="Search apps..."
      />

      <FilterBar filters={categories} />

      <section className="section">
        <div className="container-page">
          <ResultsBar
            count={apps.length}
            itemType="apps"
            sortOptions={['Sort by name', 'Sort by funding volume', 'Sort by newest']}
          />
          <ItemsGrid>
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </ItemsGrid>
        </div>
      </section>
    </ListPageLayout>
  )
}
