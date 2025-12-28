import { Metadata } from 'next'
import { CampaignCard } from '@/components/cards'
import { campaigns, getActiveCampaigns, getUpcomingCampaigns, getCompletedCampaigns } from '@/content/campaigns'

export const metadata: Metadata = {
  title: 'Campaigns',
  description: 'Discover active and upcoming funding rounds across the Ethereum ecosystem.',
}

export default function CampaignsPage() {
  const activeCampaigns = getActiveCampaigns()
  const upcomingCampaigns = getUpcomingCampaigns()
  const completedCampaigns = getCompletedCampaigns()

  return (
    <div className="min-h-screen bg-void-black">
      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
            Funding Campaigns
          </h1>
          <p className="text-lg text-muted-gray max-w-3xl">
            Discover active and upcoming funding rounds. Apply for grants, participate
            in quadratic funding, or learn from past campaigns.
          </p>
        </div>
      </section>

      {/* Active Campaigns */}
      {activeCampaigns.length > 0 && (
        <section className="section bg-charcoal">
          <div className="container-page">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 bg-light-white rounded-full animate-pulse" />
              <h2 className="text-2xl font-bold text-light-white">
                Live Now
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Campaigns */}
      {upcomingCampaigns.length > 0 && (
        <section className="section">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-light-white mb-8">
              Upcoming
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Completed Campaigns */}
      {completedCampaigns.length > 0 && (
        <section className="section bg-charcoal">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-light-white mb-8">
              Past Campaigns
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-charcoal text-light-white">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold mb-4">
            Running a Funding Round?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Get your campaign featured in our directory. Reach the Ethereum funding
            community and increase participation.
          </p>
          <a
            href="/submit?type=campaign"
            className="inline-flex items-center px-6 py-3 bg-light-white text-void-black font-medium rounded-lg hover:bg-muted-gray transition-colors"
          >
            Submit a Campaign
          </a>
        </div>
      </section>
    </div>
  )
}
