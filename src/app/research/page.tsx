import { Metadata } from "next";
import {
  ListPageLayout,
  ListPageHeader,
  CTASection,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { research, getSensemakingFor } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSeo } from "@/lib/page-seo";
import { RESEARCH_TYPES } from "@/lib/types";

export const metadata: Metadata = pageSeo.research;

export default function ResearchPage() {
  const filterOptions = RESEARCH_TYPES
    .filter((type) => research.some((r) => r.researchType === type))
    .map((type) => ({ value: type, label: type }));

  return (
    <ListPageLayout>
      <ListPageHeader
        title="Research & Trends"
        description="Analysis, reports, or trend pieces"
      />

      <SensemakingSection article={getSensemakingFor("research")} />

      <section className="mb-16 md:mb-24 mt-3">
        <div className="container-page">
          <SectionHeader title="All Research" subtitle="" />
          <CategoryContent
            items={research}
            type="research"
            itemLabel="articles"
            filters={filterOptions.length > 0 ? { key: 'researchType', options: filterOptions } : undefined}
          />
        </div>
      </section>

      <CTASection
        title="Contribute Research"
        description="Have insights to share? Submit original analysis, reports, or trend pieces. We maintain a high bar — only well-researched submissions are accepted."
        buttonText="Submit Research"
        buttonHref="/submit?type=research"
      />
    </ListPageLayout>
  );
}
