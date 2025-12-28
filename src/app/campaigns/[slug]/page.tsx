import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, Coins, Users, Clock, CheckCircle } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { getCampaignBySlug, campaigns } from '@/content/campaigns'
import { getMechanismBySlug } from '@/content/mechanisms'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const campaign = getCampaignBySlug(slug)
  if (!campaign) return { title: 'Campaign Not Found' }

  return {
    title: campaign.name,
    description: campaign.tagline,
  }
}

const statusConfig = {
  active: { label: 'Live Now', color: 'bg-light-white text-void-black' },
  upcoming: { label: 'Upcoming', color: 'bg-system-warning text-white' },
  completed: { label: 'Completed', color: 'bg-muted-gray text-white' },
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const { slug } = await params
  const campaign = getCampaignBySlug(slug)

  if (!campaign) {
    notFound()
  }

  const mechanism = getMechanismBySlug(campaign.mechanism)
  const status = statusConfig[campaign.status]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getTimeRemaining = () => {
    if (campaign.status === 'completed') return null
    const target = campaign.status === 'upcoming' ? new Date(campaign.startDate) : new Date(campaign.endDate)
    const now = new Date()
    const diff = target.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return null
    if (days === 0) return campaign.status === 'upcoming' ? 'Starts today' : 'Ends today'
    if (days === 1) return campaign.status === 'upcoming' ? 'Starts tomorrow' : '1 day left'
    return campaign.status === 'upcoming' ? `Starts in ${days} days` : `${days} days remaining`
  }

  const timeRemaining = getTimeRemaining()

  return (
    <div className="min-h-screen bg-void-black">
      {/* Breadcrumb */}
      <div className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-4">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-muted-gray hover:text-light-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
        </div>
      </div>

      {/* Hero */}
      {campaign.heroImage && (
        <div className="h-64 md:h-80 bg-charcoal relative overflow-hidden">
          <img
            src={campaign.heroImage}
            alt={campaign.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-page pb-8">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-2xl">
              {!campaign.heroImage && (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.color} mb-4`}>
                  {status.label}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-2">
                {campaign.name}
              </h1>
              <p className="text-lg text-muted-gray mb-4">{campaign.tagline}</p>
              <p className="text-muted-gray">
                Organized by <span className="font-medium text-light-white">{campaign.organizer}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {campaign.applicationUrl && campaign.status !== 'completed' && (
                <Button href={campaign.applicationUrl} external variant="primary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {campaign.status === 'active' ? 'Participate Now' : 'View Details'}
                </Button>
              )}
              {timeRemaining && (
                <div className="flex items-center gap-2 text-light-white">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{timeRemaining}</span>
                </div>
              )}
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
                <h2 className="text-xl font-semibold text-light-white mb-4">About</h2>
                <p className="text-muted-gray whitespace-pre-line">{campaign.description}</p>
              </div>

              {/* Eligibility */}
              {campaign.eligibility && campaign.eligibility.length > 0 && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-light-white mb-4">Eligibility</h2>
                  <ul className="space-y-3">
                    {campaign.eligibility.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-gray">
                        <CheckCircle className="w-5 h-5 text-light-white flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Results */}
              {campaign.results && (
                <div className="card bg-charcoal border-light-white">
                  <h2 className="text-xl font-semibold text-light-white mb-6">Results</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-3xl font-bold text-light-white">{campaign.results.projectsFunded}</p>
                      <p className="text-sm text-muted-gray">Projects Funded</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-light-white">{campaign.results.totalDistributed}</p>
                      <p className="text-sm text-muted-gray">Total Distributed</p>
                    </div>
                    {campaign.results.uniqueDonors && (
                      <div>
                        <p className="text-3xl font-bold text-light-white">{campaign.results.uniqueDonors.toLocaleString()}</p>
                        <p className="text-sm text-muted-gray">Unique Donors</p>
                      </div>
                    )}
                  </div>
                  {campaign.results.highlights.length > 0 && (
                    <>
                      <h3 className="font-medium text-light-white mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {campaign.results.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-gray">
                            <span className="w-1.5 h-1.5 rounded-full bg-light-white mt-2" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Key Info */}
              <div className="card">
                <h3 className="font-semibold text-light-white mb-4">Key Information</h3>
                <dl className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-light-white flex-shrink-0" />
                    <div>
                      <dt className="text-sm text-muted-gray">Dates</dt>
                      <dd className="font-medium text-light-white">
                        {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                      </dd>
                    </div>
                  </div>
                  {(campaign.matchingPool || campaign.fundingPool) && (
                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-light-white flex-shrink-0" />
                      <div>
                        <dt className="text-sm text-muted-gray">
                          {campaign.matchingPool ? 'Matching Pool' : 'Funding Pool'}
                        </dt>
                        <dd className="font-medium text-light-white">
                          {campaign.matchingPool || campaign.fundingPool}
                        </dd>
                      </div>
                    </div>
                  )}
                  {mechanism && (
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-light-white flex-shrink-0" />
                      <div>
                        <dt className="text-sm text-muted-gray">Mechanism</dt>
                        <dd>
                          <Link
                            href={`/mechanisms/${mechanism.slug}`}
                            className="font-medium text-light-white hover:text-light-white transition-colors"
                          >
                            {mechanism.name}
                          </Link>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>

              {/* Tags */}
              <div className="card">
                <h3 className="font-semibold text-light-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Case Study Link */}
              {campaign.caseStudy && (
                <div className="card bg-charcoal border border-light-white">
                  <h3 className="font-semibold text-light-white mb-2">Learn More</h3>
                  <p className="text-sm text-muted-gray mb-3">
                    Read the detailed case study for this campaign.
                  </p>
                  <Link
                    href={`/case-studies/${campaign.caseStudy}`}
                    className="text-light-white hover:text-light-white font-medium text-sm"
                  >
                    View Case Study →
                  </Link>
                </div>
              )}

              {/* Last Updated */}
              <p className="text-sm text-muted-gray text-center">
                Last updated: {new Date(campaign.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
