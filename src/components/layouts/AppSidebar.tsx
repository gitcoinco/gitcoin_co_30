import { research } from "@/content/research";
import { apps } from "@/content/apps";
import { mechanisms } from "@/content/mechanisms";
import { caseStudies } from "@/content/case-studies";
import { campaigns } from "@/content/campaigns";
import { RESEARCH_TYPES } from "@/lib/types";
import { AppSidebarClient } from "./AppSidebarClient";

export function AppSidebar({ defaultCollapsed }: { defaultCollapsed?: boolean } = {}) {
  const sections = [
    {
      label: "Campaigns",
      href: "/campaigns",
      items: campaigns.map((c) => ({ label: c.name, href: `/campaigns/${c.slug}` })),
    },
    {
      label: "Research",
      href: "/research",
      groups: RESEARCH_TYPES
        .filter((type) => research.some((r) => r.researchType === type))
        .map((type) => ({
          label: type,
          href: `/research?type=${type}`,
          items: research
            .filter((r) => r.researchType === type)
            .map((r) => ({ label: r.name, href: `/research/${r.slug}` })),
        })),
      items: research
        .filter((r) => !r.researchType)
        .map((r) => ({ label: r.name, href: `/research/${r.slug}` })),
    },
    {
      label: "Apps",
      href: "/apps",
      items: apps.map((a) => ({ label: a.name, href: `/apps/${a.slug}` })),
    },
    {
      label: "Mechanisms",
      href: "/mechanisms",
      items: mechanisms.map((m) => ({ label: m.name, href: `/mechanisms/${m.slug}` })),
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      items: caseStudies.map((cs) => ({ label: cs.name, href: `/case-studies/${cs.slug}` })),
    },
  ];

  return <AppSidebarClient sections={sections} defaultCollapsed={defaultCollapsed} />;
}
