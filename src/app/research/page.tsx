import { Metadata } from "next";
import {
  ListPageLayout,
  ListPageHeader,
  CTASection,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { AppSidebar } from "@/components/layouts/AppSidebar";
import { research, getSensemakingFor } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSeo } from "@/lib/page-seo";
import { RESEARCH_TYPES } from "@/lib/types";
import type { SortOption } from "@/components/layouts/CategoryContent";

export const metadata: Metadata = pageSeo.research;

const VALID_SORTS = ["newest", "oldest", "alpha", "read-time", "read-time-desc", "author"] as const;

interface PageProps {
  searchParams: Promise<{ type?: string; sort?: string; author?: string }>;
}

export default async function ResearchPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filterOptions = RESEARCH_TYPES
    .filter((type) => research.some((r) => r.researchType === type))
    .map((type) => ({ value: type, label: type }));

  const initialFilter = filterOptions.some((o) => o.value === params.type)
    ? params.type!
    : "all";
  const initialSort: SortOption = VALID_SORTS.includes(params.sort as SortOption)
    ? (params.sort as SortOption)
    : "newest";
  const initialAuthor = params.author ?? "all";

  return (
    <ListPageLayout sidebar={<AppSidebar />}>
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
            filters={filterOptions.length > 0 ? { key: "researchType", options: filterOptions } : undefined}
            initialFilter={initialFilter}
            initialSort={initialSort}
            initialAuthor={initialAuthor}
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
