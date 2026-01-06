import { Suspense } from 'react'
import { SearchClient } from './search-client'
import { apps } from '@/content/apps'
import { mechanisms } from '@/content/mechanisms'
import { getAllCaseStudies } from '@/content/case-studies'
import { research } from '@/content/research'
import { campaigns } from '@/content/campaigns'

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
  // Server-side: load all data including case studies from .md files
  const caseStudies = getAllCaseStudies()

  return (
    <div className="min-h-screen bg-void-black">
      <Suspense fallback={<SearchLoading />}>
        <SearchClient
          apps={apps}
          mechanisms={mechanisms}
          caseStudies={caseStudies}
          research={research}
          campaigns={campaigns}
        />
      </Suspense>
    </div>
  )
}
