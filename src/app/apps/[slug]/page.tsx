import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppCard, CaseStudyCard, MechanismCard, ResearchCard, CampaignCard } from '@/components/cards'
import ContentDetailPage from '@/components/templates/ContentDetailPage'
import { getAppBySlug, apps } from '@/content/apps'
import { getCaseStudiesByPlatform, getCaseStudyBySlug } from '@/content/case-studies'
import { getMechanismBySlug } from '@/content/mechanisms'
import { getResearchBySlug } from '@/content/research'
import { getCampaignBySlug } from '@/content/campaigns'
import { generateDetailPageMetadata } from '@/lib/metadata'
import { breadcrumbJsonLd } from '@/lib/json-ld'

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

  return generateDetailPageMetadata({
    title: app.name,
    shortDescription: app.shortDescription,
    slug,
    type: 'apps',
    logo: app.logo,
    lastUpdated: app.lastUpdated,
  })
}

export default async function AppDetailPage({ params }: PageProps) {
  const { slug } = await params
  const app = getAppBySlug(slug)

  if (!app) {
    notFound()
  }

  // Get related items
  const relatedApps = app.relatedApps?.map(slug => getAppBySlug(slug)).filter((a): a is NonNullable<typeof a> => a !== undefined) || []
  const relatedMechanisms = app.relatedMechanisms?.map(slug => getMechanismBySlug(slug)).filter((m): m is NonNullable<typeof m> => m !== undefined) || []

  // Merge case studies from both relatedCaseStudies and getCaseStudiesByPlatform (backward compatibility)
  const caseStudiesFromPlatform = getCaseStudiesByPlatform(app.slug)
  const caseStudiesFromRelated = app.relatedCaseStudies?.map(slug => getCaseStudyBySlug(slug)).filter((cs): cs is NonNullable<typeof cs> => cs !== undefined) || []
  const allCaseStudies = [...new Map([...caseStudiesFromPlatform, ...caseStudiesFromRelated].map(cs => [cs.id, cs])).values()]

  const relatedResearch = app.relatedResearch?.map(slug => getResearchBySlug(slug)).filter((r): r is NonNullable<typeof r> => r !== undefined) || []
  const relatedCampaigns = app.relatedCampaigns?.map(slug => getCampaignBySlug(slug)).filter((c): c is NonNullable<typeof c> => c !== undefined) || []

  const breadcrumb = breadcrumbJsonLd('Apps', '/apps', app.name, `/apps/${slug}`)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: app.name,
    description: app.shortDescription,
    image: app.banner
      ? `https://gitcoin.co${app.banner}`
      : app.logo
        ? `https://gitcoin.co${app.logo}`
        : "https://gitcoin.co/content-images/placeholder.png",
    datePublished: app.lastUpdated,
    dateModified: app.lastUpdated,
    url: `https://gitcoin.co/apps/${slug}`,
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
        item={app}
        breadcrumbHref="/apps"
        breadcrumbLabel="Back to Apps"
        relatedSections={[
          {
            title: 'Related Apps',
            items: relatedApps.map((a) => <AppCard key={a.id} app={a} />),
          },
          {
            title: 'Related Mechanisms',
            items: relatedMechanisms.map((m) => <MechanismCard key={m.id} mechanism={m} />),
          },
          {
            title: 'Related Case Studies',
            items: allCaseStudies.map((cs) => <CaseStudyCard key={cs.id} caseStudy={cs} />),
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
