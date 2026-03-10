import { Metadata } from "next";
import {
  ListPageLayout,
  ListPageHeader,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { AppCard } from "@/components/cards";
import { apps, getFeaturedApps } from "@/content/apps";
import { getSensemakingFor } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.apps;

export default function AppsPage() {
  const featuredApps = getFeaturedApps(3);
  return (
    <ListPageLayout>
      <ListPageHeader title="Apps" description="Funding platforms, DAOs, grant programs"/>

      <SensemakingSection article={getSensemakingFor("apps")} />

      <section className="section container-page">
        <SectionHeader
          title="Featured Apps"
          subtitle="Essential platforms shaping Ethereum funding"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredApps.map((app) => (
            <AppCard key={app.slug} app={app} variant="home" />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <SectionHeader
            title="All Apps"
            subtitle="Explore the complete collection"
          />
          <CategoryContent items={apps} type="app" itemLabel="apps" />
        </div>
      </section>
    </ListPageLayout>
  );
}
