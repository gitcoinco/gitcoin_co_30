import { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import { CaseStudyCard } from "@/components/cards";
import {
  ListPageLayout,
  ListPageHeader,
  FilterBar,
  ResultsBar,
  ItemsGrid,
  CTASection,
  SensemakingSection,
} from "@/components/layouts";
import { caseStudies } from "@/content/case-studies";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = pageSeo.caseStudies;

const statusFilters = [
  { value: "all", label: "All" },
  { value: "success", label: "Success" },
  { value: "partial", label: "Partial Success" },
  { value: "ongoing", label: "Ongoing" },
  { value: "failed", label: "Failed" },
];

export default function CaseStudiesPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Case Studies"
        description="Analysis of a funding experiment"
      />

      <SensemakingSection category="case-studies" />

      <section className="section">
        <div className="container-page">
          <SectionHeader title="All Case Studies" subtitle="" />

          <ItemsGrid>
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </ItemsGrid>
        </div>
      </section>

      <CTASection
        title="Share Your Experience"
        description="Have you run a funding round or received a grant? Your story could help others make better decisions. Earn bounties for quality case studies."
        buttonText="Submit a Case Study"
        buttonHref="/submit?type=case-study"
      />
    </ListPageLayout>
  );
}
