import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppCard, MechanismCard, CaseStudyCard, ResearchCard, CampaignCard } from '@/components/cards'
import ContentDetailPage from '@/components/templates/ContentDetailPage'
import { getCampaignBySlug, campaigns } from '@/content/campaigns'
import { getAppBySlug } from '@/content/apps'
import { getMechanismBySlug } from '@/content/mechanisms'
import { getCaseStudyBySlug } from '@/content/case-studies'
import { getResearchBySlug } from '@/content/research'
import { generateDetailPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd } from '@/lib/json-ld'

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

  return generateDetailPageMetadata({
    title: campaign.name,
    shortDescription: campaign.shortDescription,
    slug,
    type: 'campaigns',
    banner: campaign.banner,
    logo: campaign.logo,
    lastUpdated: campaign.lastUpdated,
  })
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const { slug } = await params
  const campaign = getCampaignBySlug(slug)

  if (!campaign) {
    notFound()
  }

  // Get related items
  const relatedApps = campaign.relatedApps?.map(slug => getAppBySlug(slug)).filter((app): app is NonNullable<typeof app> => app !== undefined) || []
  const relatedMechanisms = campaign.relatedMechanisms?.map(slug => getMechanismBySlug(slug)).filter((m): m is NonNullable<typeof m> => m !== undefined) || []
  const relatedCaseStudies = campaign.relatedCaseStudies?.map(slug => getCaseStudyBySlug(slug)).filter((cs): cs is NonNullable<typeof cs> => cs !== undefined) || []
  const relatedResearch = campaign.relatedResearch?.map(slug => getResearchBySlug(slug)).filter((r): r is NonNullable<typeof r> => r !== undefined) || []
  const relatedCampaigns = campaign.relatedCampaigns?.map(slug => getCampaignBySlug(slug)).filter((c): c is NonNullable<typeof c> => c !== undefined) || []

  const breadcrumb = breadcrumbJsonLd('Campaigns', '/campaigns', campaign.name, `/campaigns/${slug}`)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: campaign.name,
    description: campaign.shortDescription,
    image: campaign.banner
      ? `https://gitcoin.co${campaign.banner}`
      : "https://gitcoin.co/content-images/placeholder.png",
    datePublished: campaign.lastUpdated,
    dateModified: campaign.lastUpdated,
    url: `https://gitcoin.co/campaigns/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Gitcoin",
      url: "https://gitcoin.co",
    },
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const campaignStats = (campaign.matchingPoolUsd || campaign.projectsCount || campaign.startDate) ? (
    <dl className="flex flex-wrap gap-x-10 gap-y-4 py-5 border-b border-gray-700">
      {campaign.matchingPoolUsd && (
        <div>
          <dt className="text-xs text-gray-400 uppercase tracking-wider">Matching Pool</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-25">{campaign.matchingPoolUsd}</dd>
        </div>
      )}
      {campaign.projectsCount && (
        <div>
          <dt className="text-xs text-gray-400 uppercase tracking-wider">Projects</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-25">{campaign.projectsCount}</dd>
        </div>
      )}
      {campaign.startDate && (
        <div>
          <dt className="text-xs text-gray-400 uppercase tracking-wider">Period</dt>
          <dd className="mt-1 text-xl font-semibold text-gray-25">
            {formatDate(campaign.startDate)}
            {campaign.endDate ? ` – ${formatDate(campaign.endDate)}` : " – Ongoing"}
          </dd>
        </div>
      )}
    </dl>
  ) : undefined;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ContentDetailPage
        item={campaign}
        breadcrumbItems={[
          { href: '/', label: 'Home' },
          { href: '/campaigns', label: 'Campaigns' },
          { label: campaign.name },
        ]}
        ctaUrl={campaign.ctaUrl}
        ctaLabel="Visit Campaign"
        contentBefore={campaignStats}
        relatedSections={[
          {
            title: 'Related Apps',
            items: relatedApps.map((app) => <AppCard key={app.slug} app={app} />),
          },
          {
            title: 'Related Mechanisms',
            items: relatedMechanisms.map((m) => <MechanismCard key={m.slug} mechanism={m} />),
          },
          {
            title: 'Related Case Studies',
            items: relatedCaseStudies.map((cs) => <CaseStudyCard key={cs.slug} caseStudy={cs} />),
          },
          {
            title: 'Related Research',
            items: relatedResearch.map((r) => <ResearchCard key={r.slug} research={r} />),
          },
          {
            title: 'Related Campaigns',
            items: relatedCampaigns.map((c) => <CampaignCard key={c.slug} campaign={c} />),
          },
        ]}
      />
    </>
  )
}
