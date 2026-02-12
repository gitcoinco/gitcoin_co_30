import { Metadata } from "next";
import { CampaignCard } from "@/components/cards";
import {
  ListPageLayout,
  ListPageHeader,
  ItemsGrid,
  CTASection,
  ResultsBar,
  SensemakingSection,
} from "@/components/layouts";
import { campaigns, getFeaturedCampaigns } from "@/content/campaigns";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Discover funding rounds across the Ethereum ecosystem.",
};

export default function CampaignsPage() {
  const featuredCampaigns = getFeaturedCampaigns(2);
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Funding Campaigns"
        description="Active or upcoming funding rounds"
      />

      <SensemakingSection category="campaigns" />

      <section className="section container-page">
        <SectionHeader
          title="Featured Campaigns"
          subtitle="What's happening now in Ethereum funding

"
        />
        <ItemsGrid columns={2}>
          {featuredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              variant="home"
            />
          ))}
        </ItemsGrid>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader title="All Campaigns" subtitle="" />
          <ItemsGrid columns={2}>
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
  );
}
