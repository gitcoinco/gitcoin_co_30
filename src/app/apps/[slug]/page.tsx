import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Github, Twitter, MessageCircle, ArrowLeft, Edit, Calendar, Coins } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { MechanismCard, CaseStudyCard } from '@/components/cards'
import { getAppBySlug, apps } from '@/content/apps'
import { getMechanismBySlug } from '@/content/mechanisms'
import { getCaseStudiesByPlatform } from '@/content/case-studies'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const app = getAppBySlug(slug)
  if (!app) return { title: 'App Not Found' }

  return {
    title: app.name,
    description: app.tagline,
  }
}

const categoryLabels: Record<string, string> = {
  platform: 'Platform',
  dao: 'DAO',
  'grant-program': 'Grant Program',
  fund: 'Fund',
  primitive: 'Primitive',
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params
  const app = getAppBySlug(slug)

  if (!app) {
    notFound()
  }

  const mechanisms = app.mechanisms
    .map((m) => getMechanismBySlug(m))
    .filter(Boolean)

  const caseStudies = getCaseStudiesByPlatform(app.slug)

  return (
    <div className="min-h-screen bg-lichenpunk-offWhite">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-4">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Apps
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-6">
              {app.logo ? (
                <img
                  src={app.logo}
                  alt={`${app.name} logo`}
                  className="w-20 h-20 rounded-2xl object-cover bg-lichenpunk-warmGray"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-lichenpunk-warmGray flex items-center justify-center">
                  <span className="text-3xl font-bold text-lichenpunk-lichen">
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  {app.name}
                </h1>
                <p className="text-lg text-text-secondary mb-4">{app.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>{categoryLabels[app.category]}</Badge>
                  <Badge variant={app.status === 'active' ? 'success' : 'default'}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="md:ml-auto flex flex-col gap-3">
              <Button href={app.website} external variant="primary">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
              <Button href={`/submit?edit=apps/${app.slug}`} variant="ghost" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Suggest Edit
              </Button>
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
              {/* Description */}
              <div className="card">
                <h2 className="text-xl font-semibold text-text-primary mb-4">About</h2>
                <p className="text-text-secondary whitespace-pre-line">{app.description}</p>
              </div>

              {/* Mechanisms */}
              {mechanisms.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">
                    Mechanisms Used
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mechanisms.map((mechanism) => (
                      mechanism && <MechanismCard key={mechanism.id} mechanism={mechanism} />
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
              {/* Stats */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Key Stats</h3>
                <dl className="space-y-4">
                  {app.fundingVolume && (
                    <div>
                      <dt className="text-sm text-text-secondary">Total Funded</dt>
                      <dd className="text-lg font-semibold text-gitcoin-green flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        {app.fundingVolume}
                      </dd>
                    </div>
                  )}
                  {app.launchDate && (
                    <div>
                      <dt className="text-sm text-text-secondary">Launch Date</dt>
                      <dd className="text-text-primary flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(app.launchDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-text-secondary">Blockchains</dt>
                    <dd className="flex flex-wrap gap-1 mt-1">
                      {app.blockchain.map((chain) => (
                        <span
                          key={chain}
                          className="px-2 py-0.5 bg-lichenpunk-warmGray rounded text-sm text-text-secondary"
                        >
                          {chain}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Social Links */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Links</h3>
                <div className="space-y-3">
                  {app.socialLinks.twitter && (
                    <a
                      href={app.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                      Twitter
                    </a>
                  )}
                  {app.socialLinks.github && (
                    <a
                      href={app.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </a>
                  )}
                  {app.socialLinks.discord && (
                    <a
                      href={app.socialLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Discord
                    </a>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="card">
                <h3 className="font-semibold text-text-primary mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {app.tags.map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <p className="text-sm text-text-secondary text-center">
                Last updated: {new Date(app.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
