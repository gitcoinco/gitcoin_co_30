import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppCard, MechanismCard, CaseStudyCard, ResearchCard, CampaignCard } from '@/components/cards'
import ContentDetailPage from '@/components/templates/ContentDetailPage'
import { getResearchBySlug, research } from '@/content/research'
import { getAppBySlug } from '@/content/apps'
import { getMechanismBySlug } from '@/content/mechanisms'
import { getCaseStudyBySlug } from '@/content/case-studies'
import { getCampaignBySlug } from '@/content/campaigns'
import { generateDetailPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd } from '@/lib/json-ld'

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

  return generateDetailPageMetadata({
    title: r.name,
    shortDescription: r.shortDescription,
    slug,
    type: 'research',
    banner: r.banner,
    logo: r.logo,
    lastUpdated: r.lastUpdated,
  })
}

export default async function ResearchDetailPage({ params }: PageProps) {
  const { slug } = await params
  const r = getResearchBySlug(slug)

  if (!r) {
    notFound()
  }

  // Get related items
  const relatedApps = r.relatedApps?.map(slug => getAppBySlug(slug)).filter((app): app is NonNullable<typeof app> => app !== undefined) || []
  const relatedMechanisms = r.relatedMechanisms?.map(slug => getMechanismBySlug(slug)).filter((m): m is NonNullable<typeof m> => m !== undefined) || []
  const relatedCaseStudies = r.relatedCaseStudies?.map(slug => getCaseStudyBySlug(slug)).filter((cs): cs is NonNullable<typeof cs> => cs !== undefined) || []
  const relatedResearch = r.relatedResearch?.map(slug => getResearchBySlug(slug)).filter((res): res is NonNullable<typeof res> => res !== undefined) || []
  const relatedCampaigns = r.relatedCampaigns?.map(slug => getCampaignBySlug(slug)).filter((c): c is NonNullable<typeof c> => c !== undefined) || []

  const breadcrumb = breadcrumbJsonLd('Research', '/research', r.name, `/research/${slug}`)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: r.name,
    description: r.shortDescription,
    image: r.banner
      ? `https://gitcoin.co${r.banner}`
      : "https://gitcoin.co/content-images/placeholder.png",
    datePublished: r.lastUpdated,
    dateModified: r.lastUpdated,
    url: `https://gitcoin.co/research/${r.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Gitcoin",
      url: "https://gitcoin.co",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ContentDetailPage
        item={r}
        breadcrumbHref="/research"
        breadcrumbLabel="Back to Research"
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
          items: relatedResearch.map((res) => <ResearchCard key={res.id} research={res} />),
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
