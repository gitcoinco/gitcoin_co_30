import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit, ExternalLink, Check, X, Lightbulb, BookOpen, Code, Video, FileText } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { AppCard, CaseStudyCard } from '@/components/cards'
import { getMechanismBySlug, mechanisms } from '@/content/mechanisms'
import { getAppBySlug } from '@/content/apps'
import { getCaseStudiesByMechanism } from '@/content/case-studies'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return mechanisms.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const mechanism = getMechanismBySlug(slug)
  if (!mechanism) return { title: 'Mechanism Not Found' }

  return {
    title: mechanism.name,
    description: mechanism.shortDescription,
  }
}

const categoryLabels: Record<string, string> = {
  allocation: 'Allocation',
  voting: 'Voting',
  streaming: 'Streaming',
  trust: 'Trust-based',
  hybrid: 'Hybrid',
}

const resourceIcons: Record<string, typeof BookOpen> = {
  paper: FileText,
  repo: Code,
  article: BookOpen,
  video: Video,
}

export default async function MechanismDetailPage({ params }: PageProps) {
  const { slug } = await params
  const mechanism = getMechanismBySlug(slug)

  if (!mechanism) {
    notFound()
  }

  const implementations = mechanism.implementations
    .map((slug) => getAppBySlug(slug))
    .filter(Boolean)

  const caseStudies = getCaseStudiesByMechanism(mechanism.slug)

  return (
    <div className="min-h-screen bg-lichenpunk-offWhite">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-4">
          <Link
            href="/mechanisms"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Mechanisms
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge>{categoryLabels[mechanism.category]}</Badge>
                {mechanism.originYear && (
                  <span className="text-sm text-text-secondary">
                    Since {mechanism.originYear}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {mechanism.name}
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl">
                {mechanism.shortDescription}
              </p>
              {mechanism.inventors && mechanism.inventors.length > 0 && (
                <p className="mt-4 text-sm text-text-secondary">
                  Pioneered by: {mechanism.inventors.join(', ')}
                </p>
              )}
            </div>
            <Button href={`/submit?edit=mechanisms/${mechanism.slug}`} variant="ghost" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Suggest Edit
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* How It Works */}
              <div className="card">
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-solarpunk-orange" />
                  How It Works
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-text-secondary whitespace-pre-line">{mechanism.howItWorks}</p>
                </div>
              </div>

              {/* Full Description */}
              <div className="card">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Deep Dive
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-text-secondary whitespace-pre-line">{mechanism.fullDescription}</p>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-gitcoin-green" />
                    Advantages
                  </h3>
                  <ul className="space-y-3">
                    {mechanism.advantages.map((advantage, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <Check className="w-4 h-4 text-gitcoin-green mt-1 flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-system-error" />
                    Limitations
                  </h3>
                  <ul className="space-y-3">
                    {mechanism.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <X className="w-4 h-4 text-system-error mt-1 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Implementations */}
              {implementations.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Apps Using This Mechanism
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {implementations.map((app) => (
                      app && <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {caseStudies.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Case Studies
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseStudies.map((cs) => (
                      <CaseStudyCard key={cs.id} caseStudy={cs} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Best Used For */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Best Used For</h3>
                <ul className="space-y-2">
                  {mechanism.bestUsedFor.map((use, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-gitcoin-green" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Resources */}
              {mechanism.technicalResources.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold text-text-primary mb-4">Resources</h3>
                  <div className="space-y-3">
                    {mechanism.technicalResources.map((resource, i) => {
                      const Icon = resourceIcons[resource.type] || BookOpen
                      return (
                        <a
                          key={i}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors group"
                        >
                          <Icon className="w-4 h-4" />
                          <span className="flex-1">{resource.title}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mechanism.tags.map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <p className="text-sm text-text-secondary text-center">
                Last updated: {new Date(mechanism.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
