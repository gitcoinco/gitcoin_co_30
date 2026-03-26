import { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import {
  ListPageLayout,
  ListPageHeader,
  CTASection,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { caseStudies } from "@/content/case-studies";
import { getSensemakingFor } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = pageSeo.caseStudies;

export default function CaseStudiesPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Case Studies"
        description="Analysis of a funding experiment"
      />

      <SensemakingSection article={getSensemakingFor("case-studies")} />

      <section className="section">
        <div className="container-page">
          <SectionHeader title="All Case Studies" subtitle="" />

          <CategoryContent items={caseStudies} type="case-study" itemLabel="case studies" />
        </div>
      </section>

      <CTASection
        title="Share Your Experience"
        description="Have you run a funding round or received a grant? Your story could help others make better decisions. Only thorough, well-documented case studies are accepted."
        buttonText="Submit a Case Study"
        buttonHref="/submit?type=case-study"
      />
    </ListPageLayout>
  );
}
