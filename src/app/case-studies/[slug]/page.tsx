import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppCard, MechanismCard, CaseStudyCard, ResearchCard, CampaignCard } from '@/components/cards'
import ContentDetailPage from '@/components/templates/ContentDetailPage'
import { getCaseStudyBySlug, caseStudies } from '@/content/case-studies'
import { getAppBySlug } from '@/content/apps'
import { getMechanismBySlug } from '@/content/mechanisms'
import { getResearchBySlug } from '@/content/research'
import { getCampaignBySlug } from '@/content/campaigns'
import { generateDetailPageMetadata } from '@/lib/metadata'

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

  return generateDetailPageMetadata({
    title: caseStudy.name,
    shortDescription: caseStudy.shortDescription,
    slug,
    type: 'case-studies',
    banner: caseStudy.banner,
    logo: caseStudy.logo,
    lastUpdated: caseStudy.lastUpdated,
  })
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  // Get related items
  const relatedApps = caseStudy.relatedApps?.map(slug => getAppBySlug(slug)).filter((app): app is NonNullable<typeof app> => app !== undefined) || []
  const relatedMechanisms = caseStudy.relatedMechanisms?.map(slug => getMechanismBySlug(slug)).filter((m): m is NonNullable<typeof m> => m !== undefined) || []
  const relatedCaseStudies = caseStudy.relatedCaseStudies?.map(slug => getCaseStudyBySlug(slug)).filter((cs): cs is NonNullable<typeof cs> => cs !== undefined) || []
  const relatedResearch = caseStudy.relatedResearch?.map(slug => getResearchBySlug(slug)).filter((r): r is NonNullable<typeof r> => r !== undefined) || []
  const relatedCampaigns = caseStudy.relatedCampaigns?.map(slug => getCampaignBySlug(slug)).filter((c): c is NonNullable<typeof c> => c !== undefined) || []

  return (
    <ContentDetailPage
      item={caseStudy}
      breadcrumbHref="/case-studies"
      breadcrumbLabel="Back to Case Studies"
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
  );
}
