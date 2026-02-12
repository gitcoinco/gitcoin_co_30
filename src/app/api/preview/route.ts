import {
  parseMetadata,
  parseSection,
  parseList,
  extractFirstImage,
  slugify,
} from "@/lib/parse-issue";
import { getAppBySlug } from "@/content/apps";
import { getMechanismBySlug } from "@/content/mechanisms";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { getResearchBySlug } from "@/content/research";
import { getCampaignBySlug } from "@/content/campaigns";

const REPO = "gitcoinco/gitcoin_co_30";

const CONTENT_TYPES: Record<string, { label: string }> = {
  mechanism: { label: "Mechanism" },
  app: { label: "App" },
  research: { label: "Research" },
  "case-study": { label: "Case Study" },
  campaign: { label: "Campaign" },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const issue = searchParams.get("issue");
  const type = searchParams.get("type");

  if (!issue || !type) {
    return Response.json(
      { error: "Missing required params: issue and type" },
      { status: 400 },
    );
  }

  const config = CONTENT_TYPES[type];
  if (!config) {
    return Response.json(
      {
        error: `Invalid type. Valid: ${Object.keys(CONTENT_TYPES).join(", ")}`,
      },
      { status: 400 },
    );
  }

  const ghToken = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${issue}`,
    {
      headers: ghToken ? { Authorization: `token ${ghToken}` } : {},
      next: { revalidate: 0 },
    },
  );

  if (!res.ok) {
    return Response.json(
      { error: `GitHub API error: ${res.status}` },
      { status: res.status },
    );
  }

  const issueData = await res.json();

  if (!issueData.body) {
    return Response.json({ error: "Issue has no content" }, { status: 400 });
  }

  const metadata = parseMetadata(issueData.body);
  const titlePrefix = new RegExp(`^\\[${config.label}\\]\\s*`, "i");
  const name = issueData.title.replace(titlePrefix, "");
  const slug = metadata.slug || slugify(name);

  const description = parseSection(issueData.body, "Description");
  const banner = extractFirstImage(issueData.body, "Banner Image");
  const logo = extractFirstImage(issueData.body, "Logo");

  // Parse related slugs
  const relatedAppSlugs = parseList(issueData.body, "Related Apps");
  const relatedMechanismSlugs = parseList(
    issueData.body,
    "Related Mechanisms",
  );
  const relatedCaseStudySlugs = parseList(
    issueData.body,
    "Related Case Studies",
  );
  const relatedResearchSlugs = parseList(issueData.body, "Related Research");
  const relatedCampaignSlugs = parseList(issueData.body, "Related Campaigns");

  // Resolve slugs to full content objects (strip description to keep payload small)
  function resolve<T extends { description: string }>(
    slugs: string[],
    getter: (slug: string) => T | undefined,
  ) {
    return slugs
      .map((s) => getter(s))
      .filter((item): item is T => item !== undefined)
      .map(({ description: _, ...rest }) => rest);
  }

  const content = {
    id: "preview",
    slug,
    name,
    shortDescription: metadata.shortDescription || "",
    description,
    banner,
    logo,
    tags: metadata.tags || [],
    lastUpdated: new Date().toISOString().split("T")[0],
    featured: metadata.featured || false,
    relatedApps: relatedAppSlugs,
    relatedMechanisms: relatedMechanismSlugs,
    relatedCaseStudies: relatedCaseStudySlugs,
    relatedResearch: relatedResearchSlugs,
    relatedCampaigns: relatedCampaignSlugs,
    resolvedApps: resolve(relatedAppSlugs, getAppBySlug),
    resolvedMechanisms: resolve(relatedMechanismSlugs, getMechanismBySlug),
    resolvedCaseStudies: resolve(relatedCaseStudySlugs, getCaseStudyBySlug),
    resolvedResearch: resolve(relatedResearchSlugs, getResearchBySlug),
    resolvedCampaigns: resolve(relatedCampaignSlugs, getCampaignBySlug),
  };

  return Response.json(content);
}
