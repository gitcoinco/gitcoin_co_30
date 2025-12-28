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
  },
  {
    name: 'Mechanisms',
    description: 'Quadratic funding, retro funding, and more',
    href: '/mechanisms',
    icon: Vote,
  },
  {
    name: 'Case Studies',
    description: 'What worked, what didn\'t, and lessons learned',
    href: '/case-studies',
    icon: BookOpen,
  },
  {
    name: 'Research',
    description: 'Analysis, trends, and ecosystem insights',
    href: '/research',
    icon: BarChart3,
  },
  {
    name: 'Campaigns',
    description: 'Active and upcoming funding rounds',
    href: '/campaigns',
    icon: Calendar,
  },
]

export default function Home() {
  const featuredApps = getFeaturedApps(4)
  const featuredMechanisms = getFeaturedMechanisms(3)
  const featuredCaseStudies = getFeaturedCaseStudies(3)
  const featuredCampaigns = getFeaturedCampaigns()
  const activeCampaigns = getActiveCampaigns()

  return (
    <div className="bg-void-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-starfield">
        <div className="container-page py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Decorative stars */}
            <div className="flex justify-center gap-3 mb-6 text-muted-gray">
              <span className="animate-twinkle">☆</span>
              <span className="animate-twinkle" style={{ animationDelay: '0.5s' }}>☆</span>
              <span className="animate-twinkle" style={{ animationDelay: '1s' }}>☆</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-white mb-6">
              Fund What Matters
            </h1>

            <SearchBar size="lg" className="max-w-2xl mx-auto mb-10" />
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="card group text-center hover:border-light-white"
              >
                <div className="w-12 h-12 rounded-xl bg-light-white/10 border border-light-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-light-white/20 transition-colors">
                  <category.icon className="w-6 h-6 text-light-white" />
                </div>
                <h3 className="font-semibold text-light-white mb-2 group-hover:text-light-white transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-gray">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-dark-gray bg-charcoal">
        <div className="container-page py-12">
          <Stats stats={stats} />
        </div>
      </section>


      {/* Featured Campaigns */}
      {(activeCampaigns.length > 0 || featuredCampaigns.length > 0) && (
        <section className="section bg-void-black">
          <div className="container-page">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-2">
                  {activeCampaigns.length > 0 ? 'Active Campaigns' : 'Upcoming Campaigns'}
                </h2>
                <p className="text-muted-gray">
                  Funding rounds happening now and coming soon
                </p>
              </div>
              <Link
                href="/campaigns"
                className="hidden md:flex items-center gap-2 text-light-white hover:text-muted-gray transition-colors font-medium"
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
              className="md:hidden flex items-center justify-center gap-2 mt-6 text-light-white hover:text-muted-gray transition-colors font-medium"
            >
              View all campaigns
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Featured Apps */}
      <section className="section bg-void-black">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-2">
                Featured Apps
              </h2>
              <p className="text-muted-gray">
                Leading platforms and programs in the ecosystem
              </p>
            </div>
            <Link
              href="/apps"
              className="hidden md:flex items-center gap-2 text-light-white hover:text-muted-gray transition-colors font-medium"
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
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-light-white hover:text-muted-gray transition-colors font-medium"
          >
            View all apps
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Mechanisms */}
      <section className="section bg-charcoal border-y border-dark-gray">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-2">
                Funding Mechanisms
              </h2>
              <p className="text-muted-gray">
                Understand how different approaches to funding work
              </p>
            </div>
            <Link
              href="/mechanisms"
              className="hidden md:flex items-center gap-2 text-light-white hover:text-muted-gray transition-colors font-medium"
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
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-light-white hover:text-muted-gray transition-colors font-medium"
          >
            View all mechanisms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section bg-void-black">
        <div className="container-page">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-2">
                Case Studies
              </h2>
              <p className="text-muted-gray">
                Learn from real funding experiments and their outcomes
              </p>
            </div>
            <Link
              href="/case-studies"
              className="hidden md:flex items-center gap-2 text-light-white hover:text-muted-gray transition-colors font-medium"
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
            className="md:hidden flex items-center justify-center gap-2 mt-6 text-light-white hover:text-muted-gray transition-colors font-medium"
          >
            View all case studies
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-charcoal border-t border-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-starfield opacity-50" />
        <div className="container-page text-center relative z-10">
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-light-white">★</span>
            <span className="text-light-white">★</span>
            <span className="text-light-white">★</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-4">
            Help Build the Funding Library
          </h2>
          <p className="text-muted-gray max-w-2xl mx-auto mb-8 font-serif italic">
          </p>
          <p className="text-muted-gray max-w-2xl mx-auto mb-8">
            This is a community effort. Contribute case studies, document new mechanisms,
            or add platforms we&apos;ve missed. 
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/submit" variant="primary">
              Submit Content
            </Button>
            <Button href="/contribute" variant="secondary">
              Contribution Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
