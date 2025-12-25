import Link from 'next/link'
import { ArrowRight, Zap, Vote, BookOpen, BarChart3, Calendar } from 'lucide-react'
import { SearchBar, Stats, Button } from '@/components/ui'
import { AppCard, MechanismCard, CaseStudyCard, CampaignCard } from '@/components/cards'
import { getFeaturedApps } from '@/content/apps'
import { getFeaturedMechanisms } from '@/content/mechanisms'
import { getFeaturedCaseStudies } from '@/content/case-studies'
import { getFeaturedCampaigns, getActiveCampaigns } from '@/content/campaigns'

const stats = [
  { label: 'Apps Documented', value: '50+' },
  { label: 'Mechanisms', value: '8' },
  { label: 'Case Studies', value: '25+' },
  { label: 'Total Funded', value: '$500M+' },
]

const categories = [
  {
    name: 'Apps',
    description: 'Funding platforms, DAOs, and grant programs',
    href: '/apps',
    icon: Zap,
    color: 'bg-gitcoin-green/10 text-gitcoin-green',
  },
  {
    name: 'Mechanisms',
    description: 'Quadratic funding, retro funding, and more',
    href: '/mechanisms',
    icon: Vote,
    color: 'bg-solarpunk-sky/10 text-solarpunk-sky',
  },
  {
    name: 'Case Studies',
    description: 'What worked, what didn\'t, and lessons learned',
    href: '/case-studies',
    icon: BookOpen,
    color: 'bg-solarpunk-orange/10 text-solarpunk-orange',
  },
  {
    name: 'Research',
    description: 'Analysis, trends, and ecosystem insights',
    href: '/research',
    icon: BarChart3,
    color: 'bg-lunarpunk-lavender/10 text-lunarpunk-lavender',
  },
  {
    name: 'Campaigns',
    description: 'Active and upcoming funding rounds',
    href: '/campaigns',
    icon: Calendar,
    color: 'bg-lichenpunk-moss/10 text-lichenpunk-moss',
  },
]

export default function Home() {
  const featuredApps = getFeaturedApps(4)
  const featuredMechanisms = getFeaturedMechanisms(3)
  const featuredCaseStudies = getFeaturedCaseStudies(3)
  const featuredCampaigns = getFeaturedCampaigns()
  const activeCampaigns = getActiveCampaigns()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-lichenpunk-offWhite to-white">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Ethereum&apos;s Funding<br />
              <span className="text-gitcoin-green">App Store</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              The trusted directory and reference library for public goods funding.
              Discover what mechanisms exist, what works, and where capital should flow.
            </p>
            <SearchBar size="lg" className="max-w-2xl mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/apps" variant="primary">
                Explore Apps
              </Button>
              <Button href="/mechanisms" variant="secondary">
                Learn Mechanisms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-lichenpunk-warmGray bg-white">
        <div className="container-page py-12">
          <Stats stats={stats} />
        </div>
      </section>

      {/* Featured Campaigns */}
      {(activeCampaigns.length > 0 || featuredCampaigns.length > 0) && (
        <section className="section bg-lichenpunk-offWhite">
          <div className="container-page">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  {activeCampaigns.length > 0 ? 'Active Campaigns' : 'Upcoming Campaigns'}
                </h2>
                <p className="text-text-secondary">
                  Funding rounds happening now and coming soon
                </p>
              </div>
              <Link
                href="/campaigns"
                className="hidden md:flex items-center gap-2 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
              >
                View all campaigns
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCampaigns.length > 0 ? activeCampaigns : featuredCampaigns).slice(0, 3).map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} featured={campaign.isFeatured} />
              ))}
            </div>
            <Link
              href="/campaigns"
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
            >
              View all campaigns
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Explore the Funding Universe
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Navigate the complete landscape of Ethereum public goods funding
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="card group text-center hover:border-gitcoin-green"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2 group-hover:text-gitcoin-green transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section className="section bg-lichenpunk-offWhite">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Featured Apps
              </h2>
              <p className="text-text-secondary">
                Leading platforms and programs in the ecosystem
              </p>
            </div>
            <Link
              href="/apps"
              className="hidden md:flex items-center gap-2 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
            >
              View all apps
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          <Link
            href="/apps"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
          >
            View all apps
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Mechanisms */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Funding Mechanisms
              </h2>
              <p className="text-text-secondary">
                Understand how different approaches to funding work
              </p>
            </div>
            <Link
              href="/mechanisms"
              className="hidden md:flex items-center gap-2 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
            >
              View all mechanisms
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMechanisms.map((mechanism) => (
              <MechanismCard key={mechanism.id} mechanism={mechanism} />
            ))}
          </div>
          <Link
            href="/mechanisms"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
          >
            View all mechanisms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section bg-lichenpunk-offWhite">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Case Studies
              </h2>
              <p className="text-text-secondary">
                Learn from real funding experiments and their outcomes
              </p>
            </div>
            <Link
              href="/case-studies"
              className="hidden md:flex items-center gap-2 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
            >
              View all case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCaseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
          <Link
            href="/case-studies"
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-lichenpunk-moss hover:text-lichenpunk-lichen transition-colors font-medium"
          >
            View all case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-lichenpunk-lichen text-white">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Help Build the Funding Library
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            This is a community effort. Contribute case studies, document new mechanisms,
            or add platforms we&apos;ve missed. Earn bounties for quality contributions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/submit" className="bg-gitcoin-green text-text-primary hover:bg-gitcoin-softCyan">
              Submit Content
            </Button>
            <Button href="/contribute" className="border-2 border-white text-white hover:bg-white/10">
              Contribution Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
