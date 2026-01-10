import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Markdown } from '@/components/Markdown'
import { DetailPageLayout, Breadcrumb, HeroImage, PageHeader, TwoColumnLayout, TagsSection, MetadataSection, SuggestEditButton } from '@/components/layouts'
import { getCaseStudyBySlug, caseStudies } from '@/content/case-studies'
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

  return (
    <DetailPageLayout>
      <Breadcrumb href="/case-studies" label="Back to Case Studies" />

      {caseStudy.banner && <HeroImage src={caseStudy.banner} alt={caseStudy.name} />}

      <PageHeader>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
              {caseStudy.name}
            </h1>
            <p className="text-lg text-muted-gray">{caseStudy.shortDescription}</p>
          </div>
      </PageHeader>

      <TwoColumnLayout
        content={
          <article className="card p-8 md:p-10">
            <Markdown content={caseStudy.description} />
          </article>
        }
        sidebar={
          <div className="space-y-6">
              <TagsSection tags={caseStudy.tags} />
              <SuggestEditButton />
              <MetadataSection lastUpdated={caseStudy.lastUpdated} />
          </div>
        }
      />
    </DetailPageLayout>
  );
}
