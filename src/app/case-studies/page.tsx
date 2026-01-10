import { Metadata } from 'next'
import { CaseStudyCard } from '@/components/cards'
import { ListPageLayout, ListPageHeader, FilterBar, ResultsBar, ItemsGrid, CTASection } from '@/components/layouts'
import { caseStudies } from '@/content/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Learn from real funding experiments. Explore what worked, what didn\'t, and the lessons learned.',
}

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'success', label: 'Success' },
  { value: 'partial', label: 'Partial Success' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'failed', label: 'Failed' },
]

export default function CaseStudiesPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Case Studies"
        description="Learn from real funding experiments across the ecosystem. Discover what worked, what didn't, and the lessons that can guide future initiatives."
        searchPlaceholder="Search case studies..."
      />

      <FilterBar filters={statusFilters} />

      <section className="section">
        <div className="container-page">
          <ResultsBar
            count={caseStudies.length}
            itemType="case studies"
            sortOptions={['Sort by newest', 'Sort by funding amount', 'Sort by title']}
          />
          <ItemsGrid>
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </ItemsGrid>
        </div>
      </section>

      <CTASection
        title="Share Your Experience"
        description="Have you run a funding round or received a grant? Your story could help others make better decisions. Earn bounties for quality case studies."
        buttonText="Submit a Case Study"
        buttonHref="/submit?type=case-study"
      />
    </ListPageLayout>
  )
}
