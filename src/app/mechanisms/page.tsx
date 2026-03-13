import { Metadata } from "next";
import {
  ListPageLayout,
  ListPageHeader,
  CTASection,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { mechanisms } from "@/content/mechanisms";
import { getSensemakingFor } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.mechanisms;

export default function MechanismsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Funding Mechanisms"
        description="Funding mechanisms and approaches"
      />

      <SensemakingSection article={getSensemakingFor("mechanisms")} />

      <section className="section">
        <div className="container-page">
          <SectionHeader title="All Mechanisms" subtitle="" />

          <CategoryContent items={mechanisms} type="mechanism" itemLabel="mechanisms" />
        </div>
      </section>

      <CTASection
        title="Know a mechanism we're missing?"
        description="Help us document the full landscape of funding mechanisms. Submit new mechanisms or suggest improvements to existing documentation."
        buttonText="Submit a Mechanism"
        buttonHref="/submit?type=mechanism"
      />
    </ListPageLayout>
  );
}
