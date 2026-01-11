import { Metadata } from 'next'
import { CampaignCard } from '@/components/cards'
import { ListPageLayout, ListPageHeader, ItemsGrid, CTASection, ResultsBar } from '@/components/layouts'
import { campaigns } from '@/content/campaigns'

export const metadata: Metadata = {
  title: 'Campaigns',
  description: 'Discover funding rounds across the Ethereum ecosystem.',
}

export default function CampaignsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Funding Campaigns"
        description="Discover funding rounds. Apply for grants, participate in quadratic funding, or learn from past campaigns."
      />

      {/* All Campaigns */}
      <section className="section">
        <div className="container-page">
          <ResultsBar count={campaigns.length} itemType="campaigns" />
          <ItemsGrid>
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </ItemsGrid>
        </div>
      </section>

      <CTASection
        title="Running a Funding Round?"
        description="Get your campaign featured in our directory. Reach the Ethereum funding community and increase participation."
        buttonText="Submit a Campaign"
        buttonHref="/submit?type=campaign"
      />
    </ListPageLayout>
  )
}
