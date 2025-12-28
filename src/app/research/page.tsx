import { Metadata } from 'next'
import { ResearchCard } from '@/components/cards'
import { SearchBar } from '@/components/ui'
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
    <div className="min-h-screen bg-void-black">
      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
            Research & Trends
          </h1>
          <p className="text-lg text-muted-gray max-w-3xl mb-8">
            Deep dives into the funding ecosystem. Analysis of capital flows, mechanism performance,
            and emerging trends shaping the future of public goods funding.
          </p>
          <SearchBar placeholder="Search research..." className="max-w-xl" />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-charcoal border-b border-dark-gray sticky top-16 z-40">
        <div className="container-page py-4">
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter) => (
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

      {/* Research Grid */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-gray">
              Showing <span className="font-medium text-light-white">{research.length}</span> articles
            </p>
            <select className="px-4 py-2 rounded-lg border border-dark-gray bg-charcoal text-light-white text-sm">
              <option>Sort by newest</option>
              <option>Sort by title</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {research.map((r) => (
              <ResearchCard key={r.id} research={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-charcoal">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold text-light-white mb-4">
            Contribute Research
          </h2>
          <p className="text-muted-gray mb-6 max-w-xl mx-auto">
            Have insights to share? Submit analysis, reports, or trend pieces.
            Quality research earns bounties and recognition.
          </p>
          <a
            href="/submit?type=research"
            className="btn-primary inline-flex"
          >
            Submit Research
          </a>
        </div>
      </section>
    </div>
  )
}
