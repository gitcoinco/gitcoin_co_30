import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit, ExternalLink, CheckCircle, AlertCircle, Clock, XCircle, BookOpen, Lightbulb } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { getCaseStudyBySlug, caseStudies } from '@/content/case-studies'
import { getAppBySlug } from '@/content/apps'
import { getMechanismBySlug } from '@/content/mechanisms'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  if (!caseStudy) return { title: 'Case Study Not Found' }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
  }
}

const statusConfig = {
  success: { icon: CheckCircle, label: 'Success', color: 'text-gitcoin-green' },
  partial: { icon: AlertCircle, label: 'Partial Success', color: 'text-system-warning' },
  ongoing: { icon: Clock, label: 'Ongoing', color: 'text-system-info' },
  failed: { icon: XCircle, label: 'Failed', color: 'text-system-error' },
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const platform = getAppBySlug(caseStudy.platform)
  const mechanism = getMechanismBySlug(caseStudy.mechanism)
  const status = statusConfig[caseStudy.status]
  const StatusIcon = status.icon

  return (
    <div className="min-h-screen bg-lichenpunk-offWhite">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={caseStudy.status === 'success' ? 'success' : caseStudy.status === 'failed' ? 'error' : 'default'}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              <span className="text-sm text-text-secondary">
                {new Date(caseStudy.fundingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              {caseStudy.summary}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Project:</span>{' '}
                <span className="font-medium text-text-primary">{caseStudy.project}</span>
              </div>
              <div>
                <span className="text-text-secondary">Funding:</span>{' '}
                <span className="font-medium text-gitcoin-green">{caseStudy.fundingAmount}</span>
              </div>
              <div>
                <span className="text-text-secondary">By:</span>{' '}
                <span className="font-medium text-text-primary">{caseStudy.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Article */}
              <div className="card">
                <div className="prose prose-slate max-w-none">
                  <div className="text-text-secondary whitespace-pre-line">
                    {caseStudy.content}
                  </div>
                </div>
              </div>

              {/* Outcomes */}
              <div className="card">
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gitcoin-green" />
                  Outcomes
                </h2>
                <div className="space-y-6">
                  {caseStudy.outcomes.map((outcome, i) => (
                    <div key={i} className="border-l-2 border-gitcoin-green pl-4">
                      <h3 className="font-semibold text-text-primary mb-1">{outcome.title}</h3>
                      <p className="text-text-secondary">{outcome.description}</p>
                      {outcome.metrics && (
                        <p className="mt-2 text-lg font-semibold text-gitcoin-green">
                          {outcome.metrics}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="card bg-solarpunk-lightStone border-none">
                <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-solarpunk-orange" />
                  Lessons Learned
                </h2>
                <ul className="space-y-4">
                  {caseStudy.lessonsLearned.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-solarpunk-orange text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-text-secondary">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Context */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Context</h3>
                <dl className="space-y-4">
                  {platform && (
                    <div>
                      <dt className="text-sm text-text-secondary">Platform</dt>
                      <dd>
                        <Link
                          href={`/apps/${platform.slug}`}
                          className="font-medium text-text-primary hover:text-gitcoin-green transition-colors"
                        >
                          {platform.name}
                        </Link>
                      </dd>
                    </div>
                  )}
                  {mechanism && (
                    <div>
                      <dt className="text-sm text-text-secondary">Mechanism</dt>
                      <dd>
                        <Link
                          href={`/mechanisms/${mechanism.slug}`}
                          className="font-medium text-text-primary hover:text-gitcoin-green transition-colors"
                        >
                          {mechanism.name}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-text-secondary">Funding Amount</dt>
                    <dd className="font-medium text-gitcoin-green">{caseStudy.fundingAmount}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-text-secondary">Date</dt>
                    <dd className="font-medium text-text-primary">
                      {new Date(caseStudy.fundingDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Sources */}
              {caseStudy.sources.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Sources
                  </h3>
                  <ul className="space-y-2">
                    {caseStudy.sources.map((source, i) => (
                      <li key={i}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group"
                        >
                          {source.title}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="card">
                <Button href={`/submit?edit=case-studies/${caseStudy.slug}`} variant="ghost" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Suggest Edit
                </Button>
              </div>

              {/* Metadata */}
              <p className="text-sm text-text-secondary text-center">
                Published: {new Date(caseStudy.publishDate).toLocaleDateString()}<br />
                Updated: {new Date(caseStudy.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
