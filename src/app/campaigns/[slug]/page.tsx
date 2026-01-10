import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui'
import { Markdown } from '@/components/Markdown'
import { DetailPageLayout, Breadcrumb, HeroImage, PageHeader, TwoColumnLayout, TagsSection, MetadataSection } from '@/components/layouts'
import { getCampaignBySlug, campaigns } from '@/content/campaigns'
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

  return (
    <DetailPageLayout>
      <Breadcrumb href="/campaigns" label="Back to Campaigns" />

      {campaign.banner && <HeroImage src={campaign.banner} alt={campaign.name} />}

      <PageHeader>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-2">
                {campaign.name}
              </h1>
              <p className="text-lg text-muted-gray">{campaign.shortDescription}</p>
            </div>

            <div className="flex flex-col gap-3">
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
                <h2 className="text-xl font-semibold text-light-white mb-4">About</h2>
                <Markdown content={campaign.description} />
              </div>
          </div>
        }
        sidebar={
          <div className="space-y-6">
              <TagsSection tags={campaign.tags} />
              <MetadataSection lastUpdated={campaign.lastUpdated} />
          </div>
        }
      />
    </DetailPageLayout>
  )
}
