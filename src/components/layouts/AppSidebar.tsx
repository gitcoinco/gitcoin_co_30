import { research } from "@/content/research";
import { apps } from "@/content/apps";
import { mechanisms } from "@/content/mechanisms";
import { caseStudies } from "@/content/case-studies";
import { campaigns } from "@/content/campaigns";
import { RESEARCH_TYPES } from "@/lib/types";
import type { Campaign } from "@/lib/types";
import { AppSidebarClient } from "./AppSidebarClient";

// Active = no endDate (ongoing) or endDate in the future
function isCampaignActive(c: Campaign): boolean {
  return !c.endDate || new Date(c.endDate) > new Date();
}

// Sort campaigns: active first, then by startDate desc
function sortCampaigns(items: Campaign[]): Campaign[] {
  return [...items].sort((a, b) => {
    const aActive = isCampaignActive(a);
    const bActive = isCampaignActive(b);
    if (aActive !== bActive) return aActive ? -1 : 1;
    return (b.startDate ?? b.lastUpdated).localeCompare(a.startDate ?? a.lastUpdated);
  });
}

// Sort by lastUpdated descending
function sortNewest<T extends { lastUpdated: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
}

export function AppSidebar({ defaultCollapsed }: { defaultCollapsed?: boolean } = {}) {
  const sections = [
    {
      label: "Campaigns",
      href: "/campaigns",
      items: sortCampaigns(campaigns).map((c) => ({ label: c.name, href: `/campaigns/${c.slug}` })),
    },
    {
      label: "Research",
      href: "/research",
      groups: RESEARCH_TYPES
        .filter((type) => research.some((r) => r.researchType === type))
        .map((type) => ({
          label: type,
          href: `/research?type=${type}`,
          type,
          items: sortNewest(research.filter((r) => r.researchType === type))
            .map((r) => ({ label: r.name, href: `/research/${r.slug}` })),
        })),
      items: sortNewest(research.filter((r) => !r.researchType))
        .map((r) => ({ label: r.name, href: `/research/${r.slug}` })),
    },
    {
      label: "Apps",
      href: "/apps",
      items: sortNewest(apps).map((a) => ({ label: a.name, href: `/apps/${a.slug}` })),
    },
    {
      label: "Mechanisms",
      href: "/mechanisms",
      items: sortNewest(mechanisms).map((m) => ({ label: m.name, href: `/mechanisms/${m.slug}` })),
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      items: sortNewest(caseStudies).map((cs) => ({ label: cs.name, href: `/case-studies/${cs.slug}` })),
    },
  ];

  return <AppSidebarClient sections={sections} defaultCollapsed={defaultCollapsed} />;
}
