import matter from "gray-matter";
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

function ghHeaders(token?: string): Record<string, string> {
  return token ? { Authorization: `token ${token}` } : {};
}

// Resolve local /public paths to raw.githubusercontent.com so images
// show before the branch is deployed.
function toRawUrl(localPath: string | undefined, ref: string): string | undefined {
  if (!localPath) return undefined;
  if (localPath.startsWith("http")) return localPath;
  return `https://raw.githubusercontent.com/${REPO}/${ref}/public${localPath}`;
}

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

async function getPRMeta(pr: string, headers: Record<string, string>) {
  const prRes = await fetch(`https://api.github.com/repos/${REPO}/pulls/${pr}`, {
    headers,
    next: { revalidate: 0 },
  });
  if (!prRes.ok) throw new Error(`GitHub API error: ${prRes.status}`);
  const prData = await prRes.json();

  // Paginate through all PR files (default page size is 30)
  const allFiles: { filename: string }[] = [];
  let page = 1;
  while (true) {
    const filesRes = await fetch(
      `https://api.github.com/repos/${REPO}/pulls/${pr}/files?per_page=100&page=${page}`,
      { headers, next: { revalidate: 0 } },
    );
    if (!filesRes.ok) throw new Error(`GitHub API error: ${filesRes.status}`);
    const batch = await filesRes.json() as { filename: string }[];
    allFiles.push(...batch);
    if (batch.length < 100) break;
    page++;
  }

  const contentFiles = allFiles
    .map((f) => f.filename)
    .filter((f) =>
      /^src\/content\/(apps|mechanisms|research|case-studies|campaigns)\/.+\.md$/.test(f),
    );

  return { ref: prData.head.sha as string, contentFiles };
}

async function parseContentFile(filename: string, ref: string, headers: Record<string, string>) {
  const fileRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filename}?ref=${ref}`,
    { headers, next: { revalidate: 0 } },
  );
  if (!fileRes.ok) throw new Error(`GitHub API error: ${fileRes.status}`);
  const fileData = await fileRes.json();
  const raw = Buffer.from(fileData.content, "base64").toString("utf8").replace(/\r\n/g, "\n");
  const { data, content: description } = matter(raw);

  const relatedAppSlugs: string[] = data.relatedApps ?? [];
  const relatedMechanismSlugs: string[] = data.relatedMechanisms ?? [];
  const relatedCaseStudySlugs: string[] = data.relatedCaseStudies ?? [];
  const relatedResearchSlugs: string[] = data.relatedResearch ?? [];
  const relatedCampaignSlugs: string[] = data.relatedCampaigns ?? [];

  return {
    id: "preview",
    slug: data.slug,
    name: data.name,
    shortDescription: data.shortDescription ?? "",
    description: description.trim(),
    banner: toRawUrl(data.banner, ref),
    logo: toRawUrl(data.logo, ref),
    tags: data.tags ?? [],
    lastUpdated: data.lastUpdated ?? new Date().toISOString().split("T")[0],
    featured: data.featured ?? false,
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
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pr = searchParams.get("pr");
  const issue = searchParams.get("issue");
  const type = searchParams.get("type");
  const ghToken = process.env.GITHUB_TOKEN;

  // --- PR mode: fetch .md file(s) directly from the branch ---
  if (pr) {
    try {
      const headers = ghHeaders(ghToken);
      const { ref, contentFiles } = await getPRMeta(pr, headers);

      if (contentFiles.length === 0) {
        return Response.json({ error: "No content .md files found in this PR" }, { status: 400 });
      }

      const file = searchParams.get("file");

      // If a specific file is requested, return its parsed content
      if (file) {
        const filename = contentFiles.find((f) => f === file || f.endsWith(`/${file}`));
        if (!filename) {
          return Response.json({ error: "File not found in PR" }, { status: 404 });
        }
        const content = await parseContentFile(filename, ref, headers);
        return Response.json(content);
      }

      // If only one file, return it directly
      if (contentFiles.length === 1) {
        const content = await parseContentFile(contentFiles[0], ref, headers);
        return Response.json(content);
      }

      // Multiple files — return the list so the UI can show a picker
      return Response.json({ files: contentFiles });
    } catch (e) {
      return Response.json({ error: (e as Error).message }, { status: 400 });
    }
  }

  // --- Issue mode (existing behaviour) ---
  if (!issue || !type) {
    return Response.json(
      { error: "Missing required params: issue+type or pr" },
      { status: 400 },
    );
  }

  const config = CONTENT_TYPES[type];
  if (!config) {
    return Response.json(
      { error: `Invalid type. Valid: ${Object.keys(CONTENT_TYPES).join(", ")}` },
      { status: 400 },
    );
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${issue}`,
    { headers: ghHeaders(ghToken), next: { revalidate: 0 } },
  );

  if (!res.ok) {
    return Response.json({ error: `GitHub API error: ${res.status}` }, { status: res.status });
  }

  const issueData = await res.json();
  if (!issueData.body) {
    return Response.json({ error: "Issue has no content" }, { status: 400 });
  }

  // Normalize line endings — GitHub issue bodies can use \r\n which breaks section-boundary regexes
  const body = issueData.body.replace(/\r\n/g, "\n");

  const metadata = parseMetadata(body);
  const titlePrefix = new RegExp(`^\\[${config.label}\\]\\s*`, "i");
  const name = issueData.title.replace(titlePrefix, "");
  const slug = metadata.slug || slugify(name);

  const description = parseSection(body, "Description");
  const banner = extractFirstImage(body, "Banner Image");
  const logo = extractFirstImage(body, "Logo");

  const relatedAppSlugs = parseList(body, "Related Apps");
  const relatedMechanismSlugs = parseList(body, "Related Mechanisms");
  const relatedCaseStudySlugs = parseList(body, "Related Case Studies");
  const relatedResearchSlugs = parseList(body, "Related Research");
  const relatedCampaignSlugs = parseList(body, "Related Campaigns");

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
