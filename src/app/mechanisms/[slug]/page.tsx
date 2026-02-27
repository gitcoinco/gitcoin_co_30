import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppCard, MechanismCard, CaseStudyCard, ResearchCard, CampaignCard } from '@/components/cards'
import ContentDetailPage from '@/components/templates/ContentDetailPage'
import { getMechanismBySlug, mechanisms } from '@/content/mechanisms'
import { getAppBySlug } from '@/content/apps'
import { getCaseStudyBySlug } from '@/content/case-studies'
import { getResearchBySlug } from '@/content/research'
import { getCampaignBySlug } from '@/content/campaigns'
import { generateDetailPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd } from '@/lib/json-ld'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return mechanisms.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const mechanism = getMechanismBySlug(slug)
  if (!mechanism) return { title: 'Mechanism Not Found' }

  return generateDetailPageMetadata({
    title: mechanism.name,
    shortDescription: mechanism.shortDescription,
    slug,
    type: 'mechanisms',
    banner: mechanism.banner,
    logo: mechanism.logo,
    lastUpdated: mechanism.lastUpdated,
  })
}

export default async function MechanismDetailPage({ params }: PageProps) {
  const { slug } = await params
  const mechanism = getMechanismBySlug(slug)

  if (!mechanism) {
    notFound()
  }

  // Get related items
  const relatedApps = mechanism.relatedApps?.map(slug => getAppBySlug(slug)).filter((app): app is NonNullable<typeof app> => app !== undefined) || []
  const relatedMechanisms = mechanism.relatedMechanisms?.map(slug => getMechanismBySlug(slug)).filter((m): m is NonNullable<typeof m> => m !== undefined) || []
  const relatedCaseStudies = mechanism.relatedCaseStudies?.map(slug => getCaseStudyBySlug(slug)).filter((cs): cs is NonNullable<typeof cs> => cs !== undefined) || []
  const relatedResearch = mechanism.relatedResearch?.map(slug => getResearchBySlug(slug)).filter((r): r is NonNullable<typeof r> => r !== undefined) || []
  const relatedCampaigns = mechanism.relatedCampaigns?.map(slug => getCampaignBySlug(slug)).filter((c): c is NonNullable<typeof c> => c !== undefined) || []

  const breadcrumb = breadcrumbJsonLd('Mechanisms', '/mechanisms', mechanism.name, `/mechanisms/${slug}`)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mechanism.name,
    description: mechanism.shortDescription,
    image: mechanism.banner
      ? `https://gitcoin.co${mechanism.banner}`
      : "https://gitcoin.co/content-images/placeholder.png",
    datePublished: mechanism.lastUpdated,
    dateModified: mechanism.lastUpdated,
    url: `https://gitcoin.co/mechanisms/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Gitcoin",
      url: "https://gitcoin.co",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ContentDetailPage
        item={mechanism}
        breadcrumbHref="/mechanisms"
        breadcrumbLabel="Back to Mechanisms"
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
    </>
  );
}
