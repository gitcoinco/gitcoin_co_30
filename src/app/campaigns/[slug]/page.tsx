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

  return (
    <ContentDetailPage
      item={campaign}
      breadcrumbHref="/campaigns"
      breadcrumbLabel="Back to Campaigns"
      relatedSections={[
        {
          title: 'Related Apps',
          items: relatedApps.map((app) => <AppCard key={app.id} app={app} />),
        },
        {
          title: 'Related Mechanisms',
          items: relatedMechanisms.map((m) => <MechanismCard key={m.id} mechanism={m} />),
        },
        {
          title: 'Related Case Studies',
          items: relatedCaseStudies.map((cs) => <CaseStudyCard key={cs.id} caseStudy={cs} />),
        },
        {
          title: 'Related Research',
          items: relatedResearch.map((r) => <ResearchCard key={r.id} research={r} />),
        },
        {
          title: 'Related Campaigns',
          items: relatedCampaigns.map((c) => <CampaignCard key={c.id} campaign={c} />),
        },
      ]}
    />
  )
}
