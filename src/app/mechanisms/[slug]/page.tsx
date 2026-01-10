import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui'
import { Markdown } from '@/components/Markdown'
import { AppCard, MechanismCard } from '@/components/cards'
import { DetailPageLayout, Breadcrumb, HeroImage, PageHeader, TwoColumnLayout, TagsSection, MetadataSection } from '@/components/layouts'
import { getMechanismBySlug, mechanisms } from '@/content/mechanisms'
import { getAppBySlug } from '@/content/apps'
import { generateDetailPageMetadata } from '@/lib/metadata'

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

  return (
    <DetailPageLayout>
      <Breadcrumb href="/mechanisms" label="Back to Mechanisms" />

      <PageHeader>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
              {mechanism.name}
            </h1>
            <p className="text-lg text-muted-gray max-w-2xl">
              {mechanism.shortDescription}
            </p>
          </div>
          <Button
            href={`https://github.com/gitcoinco/gitcoin_co_30/issues`}
            variant="ghost"
            size="sm"
          >
            <Edit className="w-4 h-4 mr-2" />
            Suggest Edit
          </Button>
        </div>
      </PageHeader>

      {mechanism.banner && <HeroImage src={mechanism.banner} alt={mechanism.name} />}

      <TwoColumnLayout
        content={
          <div className="space-y-8">
            <article className="card p-8 md:p-10">
              <Markdown content={mechanism.description} />
            </article>

            {/* Related Apps */}
            {relatedApps.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-light-white mb-4">
                  Apps Using This Mechanism
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedApps.map((app) => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </div>
              </div>
            )}

            {/* Related Mechanisms */}
            {relatedMechanisms.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-light-white mb-4">
                  Related Mechanisms
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedMechanisms.map((m) => (
                    <MechanismCard key={m.id} mechanism={m} />
                  ))}
                </div>
              </div>
            )}
          </div>
        }
        sidebar={
          <div className="space-y-6">
              <TagsSection tags={mechanism.tags} />
              <MetadataSection lastUpdated={mechanism.lastUpdated} />
          </div>
        }
      />
    </DetailPageLayout>
  );
}
