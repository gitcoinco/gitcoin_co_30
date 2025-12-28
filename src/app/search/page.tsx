'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { AppCard, MechanismCard, CaseStudyCard, ResearchCard, CampaignCard } from '@/components/cards'
import { Badge, EmptyState } from '@/components/ui'
import { apps } from '@/content/apps'
import { mechanisms } from '@/content/mechanisms'
import { caseStudies } from '@/content/case-studies'
import { research } from '@/content/research'
import { campaigns } from '@/content/campaigns'

const filters = [
  { value: 'all', label: 'All' },
  { value: 'apps', label: 'Apps' },
  { value: 'mechanisms', label: 'Mechanisms' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'research', label: 'Research' },
  { value: 'campaigns', label: 'Campaigns' },
]

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [activeFilter, setActiveFilter] = useState('all')

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return { apps: [], mechanisms: [], caseStudies: [], research: [], campaigns: [] }

    const matchedApps = apps.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tagline.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )

    const matchedMechanisms = mechanisms.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.shortDescription.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
    )

    const matchedCaseStudies = caseStudies.filter(
      (cs) =>
        cs.title.toLowerCase().includes(q) ||
        cs.summary.toLowerCase().includes(q) ||
        cs.project.toLowerCase().includes(q) ||
        cs.tags.some((t) => t.toLowerCase().includes(q))
    )

    const matchedResearch = research.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    )

    const matchedCampaigns = campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    )

    return {
      apps: matchedApps,
      mechanisms: matchedMechanisms,
      caseStudies: matchedCaseStudies,
      research: matchedResearch,
      campaigns: matchedCampaigns,
    }
  }, [query])

  const totalResults =
    results.apps.length +
    results.mechanisms.length +
    results.caseStudies.length +
    results.research.length +
    results.campaigns.length

  const hasResults = totalResults > 0
  const showApps = activeFilter === 'all' || activeFilter === 'apps'
  const showMechanisms = activeFilter === 'all' || activeFilter === 'mechanisms'
  const showCaseStudies = activeFilter === 'all' || activeFilter === 'case-studies'
  const showResearch = activeFilter === 'all' || activeFilter === 'research'
  const showCampaigns = activeFilter === 'all' || activeFilter === 'campaigns'

  return (
    <>
      {/* Search Header */}
      <section className="bg-charcoal border-b border-dark-gray sticky top-16 z-40">
        <div className="container-page py-6">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-gray" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps, mechanisms, case studies..."
              className="w-full py-3 pl-12 pr-12 rounded-xl border border-dark-gray bg-charcoal text-light-white placeholder:text-muted-gray/60 focus:outline-none focus:ring-2 focus:ring-light-white focus:border-transparent"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-gray hover:text-light-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? 'bg-light-white text-void-black'
                    : 'bg-dark-gray text-muted-gray hover:bg-muted-gray hover:text-light-white'
                }`}
              >
                {filter.label}
                {filter.value !== 'all' && query && (
                  <span className="ml-1 opacity-75">
                    ({filter.value === 'apps' ? results.apps.length :
                      filter.value === 'mechanisms' ? results.mechanisms.length :
                      filter.value === 'case-studies' ? results.caseStudies.length :
                      filter.value === 'research' ? results.research.length :
                      results.campaigns.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="container-page">
          {!query ? (
            <EmptyState
              icon={Search}
              title="Start searching"
              description="Enter a search term to find apps, mechanisms, case studies, and more."
            />
          ) : !hasResults ? (
            <EmptyState
              icon={Search}
              title="No results found"
              description={`We couldn't find anything matching "${query}". Try different keywords or browse our directories.`}
              action={{ label: 'Browse Apps', href: '/apps' }}
            />
          ) : (
            <div className="space-y-12">
              {/* Results count */}
              <p className="text-muted-gray text-center">
                Found <span className="font-medium text-light-white">{totalResults}</span> results for &quot;{query}&quot;
              </p>

              {/* Apps */}
              {showApps && results.apps.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-light-white mb-4 flex items-center gap-2">
                    Apps
                    <Badge size="sm">{results.apps.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.apps.map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </div>
              )}

              {/* Mechanisms */}
              {showMechanisms && results.mechanisms.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-light-white mb-4 flex items-center gap-2">
                    Mechanisms
                    <Badge size="sm">{results.mechanisms.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.mechanisms.map((mechanism) => (
                      <MechanismCard key={mechanism.id} mechanism={mechanism} />
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {showCaseStudies && results.caseStudies.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-light-white mb-4 flex items-center gap-2">
                    Case Studies
                    <Badge size="sm">{results.caseStudies.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.caseStudies.map((cs) => (
                      <CaseStudyCard key={cs.id} caseStudy={cs} />
                    ))}
                  </div>
                </div>
              )}

              {/* Research */}
              {showResearch && results.research.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-light-white mb-4 flex items-center gap-2">
                    Research
                    <Badge size="sm">{results.research.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.research.map((r) => (
                      <ResearchCard key={r.id} research={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Campaigns */}
              {showCampaigns && results.campaigns.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-light-white mb-4 flex items-center gap-2">
                    Campaigns
                    <Badge size="sm">{results.campaigns.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.campaigns.map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-void-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-light-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-gray">Loading search...</p>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-void-black">
      <Suspense fallback={<SearchLoading />}>
        <SearchContent />
      </Suspense>
    </div>
  )
}
