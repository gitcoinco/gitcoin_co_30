import { MetadataRoute } from "next";
import { mechanisms } from "@/content/mechanisms";
import { apps } from "@/content/apps";
import { research } from "@/content/research";
import { caseStudies } from "@/content/case-studies";
import { campaigns } from "@/content/campaigns";

const BASE_URL = "https://gitcoin.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,             changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/mechanisms`,   changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/apps`,         changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/research`,     changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/campaigns`,    changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/contribute`,   changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/submit`,       changeFrequency: "monthly", priority: 0.5 },
  ];

  return [
    ...staticPages,
    ...mechanisms.map((m) => ({
      url: `${BASE_URL}/mechanisms/${m.slug}`,
      lastModified: m.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...apps.map((a) => ({
      url: `${BASE_URL}/apps/${a.slug}`,
      lastModified: a.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...research.map((r) => ({
      url: `${BASE_URL}/research/${r.slug}`,
      lastModified: r.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((cs) => ({
      url: `${BASE_URL}/case-studies/${cs.slug}`,
      lastModified: cs.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...campaigns.map((c) => ({
      url: `${BASE_URL}/campaigns/${c.slug}`,
      lastModified: c.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
