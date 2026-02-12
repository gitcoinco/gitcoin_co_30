/**
 * Generic content publishing function.
 * Used by all content type-specific publish scripts.
 */

import fs from "node:fs";
import path from "node:path";
import {
  parseMetadata,
  parseSection,
  parseList,
  slugify,
} from "../src/lib/parse-issue";
import { processImages } from "./shared-utils";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = "gitcoinco/gitcoin_co_30";

export const CONTENT_TYPES: Record<
  string,
  { label: string; emoji: string; plural: string; folder: string }
> = {
  mechanism: {
    label: "Mechanism",
    emoji: "⚙️",
    plural: "mechanisms",
    folder: "mechanisms",
  },
  app: {
    label: "App",
    emoji: "📱",
    plural: "apps",
    folder: "apps",
  },
  research: {
    label: "Research",
    emoji: "📊",
    plural: "research",
    folder: "research",
  },
  "case-study": {
    label: "Case Study",
    emoji: "📚",
    plural: "case-studies",
    folder: "case-studies",
  },
  campaign: {
    label: "Campaign",
    emoji: "📢",
    plural: "campaigns",
    folder: "campaigns",
  },
};

async function fetchIssue(issueNumber: string) {
  const url = `https://api.github.com/repos/${REPO}/issues/${issueNumber}`;
  const response = await fetch(url, {
    headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
  });
  return response.json();
}

interface CustomOptions {
  parseCustomFields?: (issueBody: string) => Record<string, unknown>;
  addCustomFrontmatter?: (
    customData: Record<string, unknown>,
    metadata: Record<string, unknown>,
  ) => string;
}

export async function publishContent(
  contentType: string,
  issueNumber: string,
  customOptions: CustomOptions = {},
) {
  const config = CONTENT_TYPES[contentType];

  if (!config) {
    throw new Error(
      `Unknown content type: ${contentType}. Valid types: ${Object.keys(CONTENT_TYPES).join(", ")}`,
    );
  }

  console.log(`📥 Fetching issue #${issueNumber}...`);

  const issue = await fetchIssue(issueNumber);

  if (!issue.body) {
    console.error("❌ Issue has no content");
    return;
  }

  const titlePrefix = new RegExp(`^\\[${config.label}\\]\\s*`, "i");
  const metadata = parseMetadata(issue.body);

  const slug =
    metadata.slug ||
    slugify(issue.title.replace(titlePrefix, ""));

  console.log(`${config.emoji} Creating ${contentType}: ${slug}`);

  const description = parseSection(issue.body, "Description");
  const relatedMechanisms = parseList(issue.body, "Related Mechanisms");
  const relatedApps = parseList(issue.body, "Related Apps");
  const relatedCaseStudies = parseList(issue.body, "Related Case Studies");
  const relatedResearch = parseList(issue.body, "Related Research");
  const relatedCampaigns = parseList(issue.body, "Related Campaigns");

  const customData = customOptions.parseCustomFields
    ? customOptions.parseCustomFields(issue.body)
    : {};

  const contentDir = path.join(
    process.cwd(),
    "src",
    "content",
    config.folder,
  );
  fs.mkdirSync(contentDir, { recursive: true });

  const { banner, logo, updatedMarkdown } = await processImages(
    issue.body,
    description,
    slug,
    config.folder,
  );

  const yamlList = (items: string[]) =>
    items.length > 0 ? items.map((i) => `  - ${i}`).join("\n") : "";

  const tagsYaml = yamlList(metadata.tags || []);

  let frontmatter = `---
id: '${Date.now()}'
slug: ${slug}
name: "${issue.title.replace(titlePrefix, "").replace(/"/g, '\\"')}"
shortDescription: "${(metadata.shortDescription || "").replace(/"/g, '\\"')}"`;


  if (banner) frontmatter += `\nbanner: ${banner}`;
  if (logo) frontmatter += `\nlogo: ${logo}`;
  if (metadata.featured) frontmatter += `\nfeatured: true`;

  frontmatter += `
tags:
${tagsYaml}
lastUpdated: '${new Date().toISOString().split("T")[0]}'
relatedMechanisms:
${yamlList(relatedMechanisms)}
relatedApps:
${yamlList(relatedApps)}
relatedCaseStudies:
${yamlList(relatedCaseStudies)}
relatedResearch:
${yamlList(relatedResearch)}
relatedCampaigns:
${yamlList(relatedCampaigns)}`;

  if (customOptions.addCustomFrontmatter) {
    const customFrontmatter = customOptions.addCustomFrontmatter(
      customData,
      metadata as unknown as Record<string, unknown>,
    );
    if (customFrontmatter) {
      frontmatter += "\n" + customFrontmatter;
    }
  }

  frontmatter += "\n---";

  const mdContent = `${frontmatter}\n\n${updatedMarkdown.trim()}\n`;
  const mdPath = path.join(contentDir, `${slug}.md`);
  fs.writeFileSync(mdPath, mdContent);

  console.log(`\n✅ Published!`);
  console.log(`   📄 ${mdPath}`);
  console.log(`\n👉 Next steps:`);
  console.log(`   1. Review and edit the generated file`);
  console.log(`   2. git add .`);
  console.log(`   3. git commit -m "Add ${contentType}: ${issue.title}"`);
  console.log(`   4. Close issue #${issueNumber} with "approved" label`);
}

// CLI usage
if (process.argv[1]?.includes("publish-content")) {
  const contentType = process.argv[2];
  const issueNumber = process.argv[3];

  if (!contentType || !issueNumber) {
    console.error(
      "Usage: npx tsx scripts/publish-content.ts <content-type> <issue-number>",
    );
    console.error(
      `Valid content types: ${Object.keys(CONTENT_TYPES).join(", ")}`,
    );
    process.exit(1);
  }

  publishContent(contentType, issueNumber).catch(console.error);
}
