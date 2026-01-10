import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui'
import { CaseStudyCard, MechanismCard } from '@/components/cards'
import { Markdown } from '@/components/Markdown'
import { DetailPageLayout, Breadcrumb, PageHeader, TwoColumnLayout, TagsSection, MetadataSection } from '@/components/layouts'
import { getAppBySlug, apps } from '@/content/apps'
import { getCaseStudiesByPlatform } from '@/content/case-studies'
import { getMechanismBySlug } from '@/content/mechanisms'
import { generateDetailPageMetadata } from '@/lib/metadata'

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

  const caseStudies = getCaseStudiesByPlatform(app.slug)
  const relatedMechanisms = app.relatedMechanisms?.map(slug => getMechanismBySlug(slug)).filter((m): m is NonNullable<typeof m> => m !== undefined) || []

  return (
    <DetailPageLayout>
      <Breadcrumb href="/apps" label="Back to Apps" />

      <PageHeader>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo & Basic Info */}
            <div className="flex items-start gap-6">
              {app.logo ? (
                <img
                  src={app.logo}
                  alt={`${app.name} logo`}
                  className="w-20 h-20 rounded-2xl object-cover bg-dark-gray"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-dark-gray flex items-center justify-center">
                  <span className="text-3xl font-bold text-light-white">
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-2">
                  {app.name}
                </h1>
                <p className="text-lg text-muted-gray">{app.shortDescription}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="md:ml-auto flex flex-col gap-3">
              <Button
                href={`https://github.com/gitcoinco/gitcoin_co_30/issues`}
                variant="ghost"
                size="sm"
              >
                <Edit className="w-4 h-4 mr-2" />
                Suggest Edit
              </Button>
            </div>
          </div>
      </PageHeader>

      <TwoColumnLayout
        content={
          <div className="space-y-8">
              {/* Description */}
              <div className="card">
                <h2 className="text-xl font-semibold text-light-white mb-4">
                  About
                </h2>
                <Markdown content={app.description} />
              </div>

              {/* Related Mechanisms */}
              {relatedMechanisms.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-light-white mb-4">
                    Mechanisms
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {relatedMechanisms.map((m) => (
                      <MechanismCard key={m.id} mechanism={m} />
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {caseStudies.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-light-white mb-4">
                    Case Studies
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseStudies.map((cs) => (
                      <CaseStudyCard key={cs.id} caseStudy={cs} />
                    ))}
                  </div>
                </div>
              )}
          </div>
        }
        sidebar={
          <div className="space-y-6">
              <TagsSection tags={app.tags} />
              <MetadataSection lastUpdated={app.lastUpdated} />
          </div>
        }
      />
    </DetailPageLayout>
  );
}
