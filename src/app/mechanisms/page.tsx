import { Metadata } from "next";
import { MechanismCard } from "@/components/cards";
import {
  ListPageLayout,
  ListPageHeader,
  FilterBar,
  ResultsBar,
  ItemsGrid,
  CTASection,
  SensemakingSection,
} from "@/components/layouts";
import { mechanisms } from "@/content/mechanisms";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Funding Mechanisms",
  description:
    "Learn about quadratic funding, retroactive funding, conviction voting, and other funding mechanisms.",
};

const categories = [
  { value: "all", label: "All" },
  { value: "allocation", label: "Allocation" },
  { value: "voting", label: "Voting" },
  { value: "streaming", label: "Streaming" },
  { value: "trust", label: "Trust-based" },
  { value: "hybrid", label: "Hybrid" },
];

export default function MechanismsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader title="Funding Mechanisms" />

      <SensemakingSection category="mechanisms" />

      <section className="section">
        <div className="container-page">
          <SectionHeader
            title="All Mechanisms"
            subtitle=""
          />

          <ItemsGrid>
            {mechanisms.map((mechanism) => (
              <MechanismCard key={mechanism.id} mechanism={mechanism} />
            ))}
          </ItemsGrid>
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
