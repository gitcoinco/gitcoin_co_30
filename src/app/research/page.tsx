import { Metadata } from 'next'
import { ResearchCard } from '@/components/cards'
import { ListPageLayout, ListPageHeader, FilterBar, ResultsBar, ItemsGrid, CTASection } from '@/components/layouts'
import { research } from '@/content/research'

export const metadata: Metadata = {
  title: 'Research & Trends',
  description: 'Analysis of capital flows, mechanism performance, and ecosystem shifts in Ethereum funding.',
}

const typeFilters = [
  { value: 'all', label: 'All' },
  { value: 'report', label: 'Reports' },
  { value: 'analysis', label: 'Analysis' },
  { value: 'trend', label: 'Trends' },
  { value: 'opinion', label: 'Opinion' },
  { value: 'data', label: 'Data' },
]

export default function ResearchPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Research & Trends"
        description="Deep dives into the funding ecosystem. Analysis of capital flows, mechanism performance, and emerging trends shaping the future of public goods funding."
        searchPlaceholder="Search research..."
      />

      <FilterBar filters={typeFilters} />

      <section className="section">
        <div className="container-page">
          <ResultsBar
            count={research.length}
            itemType="articles"
            sortOptions={['Sort by newest', 'Sort by title']}
          />
          <ItemsGrid>
            {research.map((r) => (
              <ResearchCard key={r.id} research={r} />
            ))}
          </ItemsGrid>
        </div>
      </section>

      <CTASection
        title="Contribute Research"
        description="Have insights to share? Submit analysis, reports, or trend pieces. Quality research earns bounties and recognition."
        buttonText="Submit Research"
        buttonHref="/submit?type=research"
      />
    </ListPageLayout>
  )
}
