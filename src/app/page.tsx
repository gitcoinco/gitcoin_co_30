import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SearchBar, Stats, Button, CategoryIcon } from "@/components/ui";
import {
  AppCard,
  MechanismCard,
  CaseStudyCard,
  CampaignCard,
  ResearchCard,
} from "@/components/cards";
import FeaturedSection from "@/components/FeaturedSection";
import { getFeaturedApps } from "@/content/apps";
import { getFeaturedMechanisms } from "@/content/mechanisms";
import { getFeaturedCaseStudies } from "@/content/case-studies";
import { getFeaturedCampaigns, getActiveCampaigns } from "@/content/campaigns";
import { getFeaturedResearch } from "@/content/research";

const stats = [
  { label: "Apps Documented", value: "50+" },
  { label: "Mechanisms", value: "8" },
  { label: "Case Studies", value: "25+" },
  { label: "Total Funded", value: "$500M+" },
];

const categories = [
  {
    name: "Apps",
    description: "Funding platforms, DAOs, and grant programs",
    href: "/apps",
    icon: "/assets/apps-icon.svg",
  },
  {
    name: "Mechanisms",
    description: "Quadratic funding, retro funding, and more",
    href: "/mechanisms",
    icon: "/assets/mechanisms-icon.svg",
  },
  {
    name: "Case Studies",
    description: "What worked, what didn't, and lessons learned",
    href: "/case-studies",
    icon: "/assets/case-studies-icon.svg",
  },
  {
    name: "Research",
    description: "Analysis, trends, and ecosystem insights",
    href: "/research",
    icon: "/assets/research-icon.svg",
  },
  {
    name: "Campaigns",
    description: "Active and upcoming funding rounds",
    href: "/campaigns",
    icon: "/assets/campaigns-icon.svg",
  },
];

export default function Home() {
  const featuredApps = getFeaturedApps(4);
  const featuredMechanisms = getFeaturedMechanisms(3);
  const featuredCaseStudies = getFeaturedCaseStudies(3);
  const featuredCampaigns = getFeaturedCampaigns();
  const activeCampaigns = getActiveCampaigns();
  const featuredResearch = getFeaturedResearch(3);

  return (
    <div className="bg-void-black">
      {/* Hero Section - Quadratic Lands Style */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-[url('/assets/hero-bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Animated Background: Stars, Moon, Hills */}
        {/* <HeroBackground /> */}

        {/* Content */}
        <div className="container-page py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="heading text-4xl md:text-5xl lg:text-6xl text-light-white mb-4">
              Fund What Matters
            </h1>
            <p className="font-mono text-lg text-light-white/60 mb-8 max-w-xl mx-auto">
              Your home for discovering whats going on in funding infrastructure
              innovation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="card group text-center hover:border-light-white icon-hover-container"
              >
                <div className="w-full h-20 flex items-center justify-center mx-auto mb-4">
                  <div className="h-20 w-30">
                    <CategoryIcon
                      src={category.icon}
                      alt={`${category.name} icon`}
                      className="h-20 w-30 object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-bold font-mono text-light-white mb-2 group-hover:text-muted-gray transition-colors">
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
          <h2 className="heading text-2xl md:text-3xl text-light-white mb-2 max-w-5xl">
            The funding infrastructure of the next internet
          </h2>
          <p className="text-muted-gray mb-12">
            Its being built right now, and its powered by AI, decentralization,
            stablecoins, and open source software.
          </p>
          <Stats stats={stats} />
        </div>
      </section>

      {/* Search bar */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-[url('/assets/search-bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Animated Background: Stars, Moon, Hills */}
        {/* <HeroBackground /> */}

        {/* Content */}
        <div className="container-page py-20 md:py-32 relative flex flex-col items-center justify-center gap-4 z-10">
          <h3 className="heading text-3xl md:text-5xl">Search anything</h3>
          <SearchBar size="lg" className="max-w-5xl mx-auto w-full" />
        </div>
      </section>

      {/* Featured Campaigns */}
      {(activeCampaigns.length > 0 || featuredCampaigns.length > 0) && (
        <section className="section bg-void-black">
          <div className="container-page">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-light-white mb-2">
                  {activeCampaigns.length > 0
                    ? "Active Campaigns"
                    : "Upcoming Campaigns"}
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
              {(activeCampaigns.length > 0
                ? activeCampaigns
                : featuredCampaigns
              )
                .slice(0, 3)
                .map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
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
      <FeaturedSection
        title="Featured Apps"
        description="Leading platforms and programs in the ecosystem"
        href="/apps"
        linkText="View all apps"
        gridClassName="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {featuredApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </FeaturedSection>

      {/* Mechanisms */}
      <FeaturedSection
        title="Funding Mechanisms"
        description="Understand how different approaches to funding work"
        href="/mechanisms"
        linkText="View all mechanisms"
        bgClassName="bg-charcoal border-y border-dark-gray"
      >
        {featuredMechanisms.map((mechanism) => (
          <MechanismCard key={mechanism.id} mechanism={mechanism} />
        ))}
      </FeaturedSection>

      {/* Case Studies */}
      <FeaturedSection
        title="Case Studies"
        description="Learn from real funding experiments and their outcomes"
        href="/case-studies"
        linkText="View all case studies"
      >
        {featuredCaseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </FeaturedSection>

      {/* Research */}
      <FeaturedSection
        title="Research"
        description="Analysis, trends, and ecosystem insights"
        href="/research"
        linkText="View all research"
        bgClassName="bg-charcoal border-y border-dark-gray"
      >
        {featuredResearch.map((research) => (
          <ResearchCard key={research.id} research={research} />
        ))}
      </FeaturedSection>

      {/* CTA Section */}
      <section className="section bg-charcoal border-t border-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-starfield opacity-50" />
        <div className="container-page text-center relative z-10">
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-light-white">★</span>
            <span className="text-light-white">★</span>
            <span className="text-light-white">★</span>
          </div>
          <h2 className="text-2xl md:text-3xl heading text-light-white mb-4">
            Help Build the Funding Library
          </h2>
          <p className="text-muted-gray max-w-2xl mx-auto mb-8  italic"></p>
          <p className="text-muted-gray max-w-xl mx-auto mb-8 ">
            This is a community effort. Contribute case studies, document new
            mechanisms, or add platforms we&apos;ve missed.
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
  );
}
