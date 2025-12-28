import { Metadata } from 'next'
import { CaseStudyCard } from '@/components/cards'
import { SearchBar } from '@/components/ui'
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
    <div className="min-h-screen bg-void-black">
      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-muted-gray max-w-3xl mb-8">
            Learn from real funding experiments across the ecosystem. Discover what worked,
            what didn&apos;t, and the lessons that can guide future initiatives.
          </p>
          <SearchBar placeholder="Search case studies..." className="max-w-xl" />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-charcoal border-b border-dark-gray sticky top-16 z-40">
        <div className="container-page py-4">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter.value === 'all'
                    ? 'bg-light-white text-void-black'
                    : 'bg-dark-gray text-muted-gray hover:bg-muted-gray hover:text-light-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-gray">
              Showing <span className="font-medium text-light-white">{caseStudies.length}</span> case studies
            </p>
            <select className="px-4 py-2 rounded-lg border border-dark-gray bg-charcoal text-light-white text-sm">
              <option>Sort by newest</option>
              <option>Sort by funding amount</option>
              <option>Sort by title</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-charcoal">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold text-light-white mb-4">
            Share Your Experience
          </h2>
          <p className="text-muted-gray mb-6 max-w-xl mx-auto">
            Have you run a funding round or received a grant? Your story could help
            others make better decisions. Earn bounties for quality case studies.
          </p>
          <a
            href="/submit?type=case-study"
            className="btn-primary inline-flex"
          >
            Submit a Case Study
          </a>
        </div>
      </section>
    </div>
  )
}
