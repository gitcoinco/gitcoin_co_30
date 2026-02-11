import { Metadata } from "next";
import { AppCard } from "@/components/cards";
import {
  ListPageLayout,
  ListPageHeader,
  FilterBar,
  ResultsBar,
  ItemsGrid,
  SensemakingSection,
} from "@/components/layouts";
import { apps } from "@/content/apps";

export const metadata: Metadata = {
  title: "Apps Directory",
  description:
    "Explore funding platforms, DAOs, grant programs, and primitives in the Ethereum ecosystem.",
};

export default function AppsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Apps"
        description="Explore the platforms, DAOs, grant programs, and funding primitives that power Ethereum's public goods ecosystem."
        searchPlaceholder="Search apps..."
        icon="/assets/apps-icon.svg"
      />

      <SensemakingSection category="apps" />

      <section className="section">
        <div className="container-page">
          <ResultsBar count={apps.length} itemType="apps" />
          <ItemsGrid>
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </ItemsGrid>
        </div>
      </section>
    </ListPageLayout>
  );
}
