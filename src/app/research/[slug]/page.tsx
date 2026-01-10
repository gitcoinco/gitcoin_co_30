import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Markdown } from '@/components/Markdown'
import { DetailPageLayout, Breadcrumb, HeroImage, PageHeader, TwoColumnLayout, TagsSection, MetadataSection, SuggestEditButton } from '@/components/layouts'
import { getResearchBySlug, research } from '@/content/research'
import { generateDetailPageMetadata } from '@/lib/metadata'

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

  return (
    <DetailPageLayout>
      <Breadcrumb href="/research" label="Back to Research" />

      {r.banner && <HeroImage src={r.banner} alt={r.name} />}

      <PageHeader>
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
            {r.name}
          </h1>
          <p className="text-lg text-muted-gray">{r.shortDescription}</p>
        </div>
      </PageHeader>

      <TwoColumnLayout
        content={
          <article className="card p-8 md:p-10">
            <Markdown content={r.description} />
          </article>
        }
        sidebar={
          <div className="space-y-6">
              <TagsSection tags={r.tags} />
              <SuggestEditButton />
              <MetadataSection lastUpdated={r.lastUpdated} />
            </div>
        }
      />
    </DetailPageLayout>
  );
}
