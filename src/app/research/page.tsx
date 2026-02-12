import { Metadata } from "next";
import { ResearchCard } from "@/components/cards";
import {
  ListPageLayout,
  ListPageHeader,
  FilterBar,
  ResultsBar,
  ItemsGrid,
  CTASection,
  SensemakingSection,
} from "@/components/layouts";
import { research } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Research & Trends",
  description:
    "Analysis of capital flows, mechanism performance, and ecosystem shifts in Ethereum funding.",
};

export default function ResearchPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Research & Trends"
        description="Analysis, reports, or trend pieces"
      />

      <SensemakingSection category="research" />

      <section className="mb-16 md:mb-24 mt-3">
        <div className="container-page">
          <SectionHeader title="All Research" subtitle="" />
          <ItemsGrid>
            {research.map((r) => (
              <ResearchCard key={r.id} research={r} />
            ))}
          </ItemsGrid>
        </div>
      </section>

      <CTASection
        title="Contribute Research"
        description="Have insights to share? Submit analysis, reports, or trend pieces. Quality research earns bounties and recognition."
        buttonText="Submit Research"
        buttonHref="/submit?type=research"
      />
    </ListPageLayout>
  );
}
