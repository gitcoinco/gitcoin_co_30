import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit, ExternalLink, BarChart3, FileText, TrendingUp, MessageSquare, Database, Calendar, User } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { getResearchBySlug, research } from '@/content/research'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const r = getResearchBySlug(slug)
  if (!r) return { title: 'Research Not Found' }

  return {
    title: r.title,
    description: r.abstract,
  }
}

const typeConfig = {
  analysis: { icon: BarChart3, label: 'Analysis' },
  report: { icon: FileText, label: 'Report' },
  trend: { icon: TrendingUp, label: 'Trend' },
  opinion: { icon: MessageSquare, label: 'Opinion' },
  data: { icon: Database, label: 'Data' },
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params
  const r = getResearchBySlug(slug)

  if (!r) {
    notFound()
  }

  const typeInfo = typeConfig[r.type]
  const TypeIcon = typeInfo.icon

  return (
    <div className="min-h-screen bg-lichenpunk-offWhite">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-4">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge>
                <TypeIcon className="w-3 h-3 mr-1" />
                {typeInfo.label}
              </Badge>
              {r.timeframe && (
                <span className="text-sm text-text-secondary">{r.timeframe}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {r.title}
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              {r.abstract}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {r.authors.join(', ')}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(r.publishDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
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
            <div className="lg:col-span-2">
              <article className="card">
                <div className="prose prose-slate max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-li:text-text-secondary">
                  <div className="whitespace-pre-line text-text-secondary">
                    {r.content}
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Topics */}
              {(r.relatedApps.length > 0 || r.relatedMechanisms.length > 0) && (
                <div className="card">
                  <h3 className="font-semibold text-text-primary mb-4">Related Topics</h3>
                  {r.relatedApps.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-text-secondary mb-2">Apps</p>
                      <div className="flex flex-wrap gap-2">
                        {r.relatedApps.map((app) => (
                          <Link
                            key={app}
                            href={`/apps/${app}`}
                            className="text-sm px-2 py-1 bg-lichenpunk-warmGray rounded hover:bg-lichenpunk-slateGray hover:text-white transition-colors"
                          >
                            {app}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {r.relatedMechanisms.length > 0 && (
                    <div>
                      <p className="text-sm text-text-secondary mb-2">Mechanisms</p>
                      <div className="flex flex-wrap gap-2">
                        {r.relatedMechanisms.map((mech) => (
                          <Link
                            key={mech}
                            href={`/mechanisms/${mech}`}
                            className="text-sm px-2 py-1 bg-lichenpunk-warmGray rounded hover:bg-lichenpunk-slateGray hover:text-white transition-colors"
                          >
                            {mech}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sources */}
              {r.sources.length > 0 && (
                <div className="card">
                  <h3 className="font-semibold text-text-primary mb-4">Sources</h3>
                  <ul className="space-y-2">
                    {r.sources.map((source, i) => (
                      <li key={i}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group"
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
                  {r.tags.map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="card">
                <Button href={`/submit?edit=research/${r.slug}`} variant="ghost" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Suggest Edit
                </Button>
              </div>

              {/* Metadata */}
              <p className="text-sm text-text-secondary text-center">
                Published: {new Date(r.publishDate).toLocaleDateString()}<br />
                Updated: {new Date(r.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
