import { Metadata } from "next";
import {
  ListPageLayout,
  ListPageHeader,
  ItemsGrid,
  CTASection,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { CampaignCard } from "@/components/cards";
import { campaigns, getFeaturedCampaigns } from "@/content/campaigns";
import { getSensemakingFor } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.campaigns;

export default function CampaignsPage() {
  const featuredCampaigns = getFeaturedCampaigns(2);
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Funding Campaigns"
        description="Active or upcoming funding rounds"
      />

      <SensemakingSection article={getSensemakingFor("campaigns")} />

      <section className="section container-page">
        <SectionHeader
          title="Featured Campaigns"
          subtitle="What's happening now in Ethereum funding

"
        />
        <ItemsGrid columns={2}>
          {featuredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.slug}
              campaign={campaign}
              variant="home"
            />
          ))}
        </ItemsGrid>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader title="All Campaigns" subtitle="" />
          <CategoryContent items={campaigns} type="campaign" columns={2} itemLabel="campaigns" />
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
