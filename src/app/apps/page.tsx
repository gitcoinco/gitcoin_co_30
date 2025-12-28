import { Metadata } from 'next'
import { AppCard } from '@/components/cards'
import { SearchBar, Badge } from '@/components/ui'
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
    <div className="min-h-screen bg-void-black">
      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
            Funding Apps Directory
          </h1>
          <p className="text-lg text-muted-gray max-w-3xl mb-8">
            Explore the platforms, DAOs, grant programs, and funding primitives
            that power Ethereum&apos;s public goods ecosystem.
          </p>
          <SearchBar placeholder="Search apps..." className="max-w-xl" />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-charcoal border-b border-dark-gray sticky top-16 z-40">
        <div className="container-page py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.value === 'all'
                    ? 'bg-light-white text-void-black'
                    : 'bg-dark-gray text-muted-gray hover:bg-muted-gray hover:text-light-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-gray">
              Showing <span className="font-medium text-light-white">{apps.length}</span> apps
            </p>
            <select className="px-4 py-2 rounded-lg border border-dark-gray bg-charcoal text-light-white text-sm">
              <option>Sort by name</option>
              <option>Sort by funding volume</option>
              <option>Sort by newest</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
