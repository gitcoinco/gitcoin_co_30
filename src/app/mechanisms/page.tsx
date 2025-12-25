import { Metadata } from 'next'
import { MechanismCard } from '@/components/cards'
import { SearchBar } from '@/components/ui'
import { mechanisms } from '@/content/mechanisms'

export const metadata: Metadata = {
  title: 'Funding Mechanisms',
  description: 'Learn about quadratic funding, retroactive funding, conviction voting, and other funding mechanisms.',
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'allocation', label: 'Allocation' },
  { value: 'voting', label: 'Voting' },
  { value: 'streaming', label: 'Streaming' },
  { value: 'trust', label: 'Trust-based' },
  { value: 'hybrid', label: 'Hybrid' },
]

export default function MechanismsPage() {
  return (
    <div className="min-h-screen bg-lichenpunk-offWhite">
      {/* Header */}
      <section className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Funding Mechanisms
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mb-8">
            Understand the different approaches to capital allocation. From quadratic funding
            to retroactive rewards, explore how each mechanism works and when to use it.
          </p>
          <SearchBar placeholder="Search mechanisms..." className="max-w-xl" />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-lichenpunk-warmGray sticky top-16 z-40">
        <div className="container-page py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.value === 'all'
                    ? 'bg-gitcoin-green text-text-primary'
                    : 'bg-lichenpunk-warmGray text-text-secondary hover:bg-lichenpunk-slateGray hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanisms Grid */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-secondary">
              Showing <span className="font-medium text-text-primary">{mechanisms.length}</span> mechanisms
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mechanisms.map((mechanism) => (
              <MechanismCard key={mechanism.id} mechanism={mechanism} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Know a mechanism we&apos;re missing?
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            Help us document the full landscape of funding mechanisms. Submit new mechanisms
            or suggest improvements to existing documentation.
          </p>
          <a
            href="/submit?type=mechanism"
            className="btn-primary inline-flex"
          >
            Submit a Mechanism
          </a>
        </div>
      </section>
    </div>
  )
}
