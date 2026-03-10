/**
 * Shared parsing functions for GitHub issue bodies.
 * Used by both the publish scripts and the /api/preview route.
 * Pure functions — no fs, path, or network dependencies.
 *
 * Supports two formats:
 *   - GitHub issue forms (new): ### Heading\n\ncontent
 *   - Legacy markdown templates (old): ## Metadata + - **Key**: value
 */

import { SENSEMAKING_CATEGORIES } from './types';

export interface IssueMetadata {
  slug?: string;
  shortDescription?: string;
  tags?: string[];
  featured?: boolean;
  sensemakingFor?: string;
  researchType?: string;
  ctaUrl?: string;
  matchingPoolUsd?: string;
  projectsCount?: string;
  startDate?: string;
  endDate?: string;
}

export interface ParsedImage {
  alt: string;
  url: string;
  markdown: string;
}

// Placeholder GitHub issue forms write for unfilled optional fields
export const NO_RESPONSE = "_No response_";

// Description can contain user headings and --- horizontal rules, so stop only at known structural sections
const DESC_STOP = "\\n#{2,3} Related|\\n#{2,3} Submission|$";

// --- Forms format helpers (### Heading) ---

function extractFormField(markdown: string, label: string): string {
  const match = markdown.match(
    new RegExp(`(?:^|\\n)### ${label}[ \\t]*\\n+([\\s\\S]*?)(?=\\n### |\\n## |$)`),
  );
  if (!match) return "";
  // Strip HTML comments (used as inline instructions in textarea value: fields)
  const value = match[1].replace(/<!--[\s\S]*?-->/g, "").trim();
  return value === NO_RESPONSE ? "" : value;
}

function parseFormMetadata(markdown: string): IssueMetadata {
  const metadata: IssueMetadata = {};

  const slug = extractFormField(markdown, "Slug");
  if (slug) metadata.slug = slug;

  const desc = extractFormField(markdown, "Short Description");
  if (desc) metadata.shortDescription = desc;

  const tags = extractFormField(markdown, "Tags");
  if (tags) {
    metadata.tags = tags
      .split("\n")
      .flatMap((line) => line.split(","))
      .map((t) => t.trim())
      .filter((t) => t);
  }

  const featured = extractFormField(markdown, "Featured");
  if (featured.includes("[x]")) metadata.featured = true;

  const sensemakingFor = extractFormField(markdown, "Sensemaking For").toLowerCase().trim();
  if (sensemakingFor && (SENSEMAKING_CATEGORIES as readonly string[]).includes(sensemakingFor)) {
    metadata.sensemakingFor = sensemakingFor;
  }

  const researchType = extractFormField(markdown, "Research Type");
  if (researchType) metadata.researchType = researchType;

  const ctaUrl = extractFormField(markdown, "CTA URL");
  if (ctaUrl) metadata.ctaUrl = ctaUrl;

  const matchingPoolUsd = extractFormField(markdown, "Matching Pool USD");
  if (matchingPoolUsd) metadata.matchingPoolUsd = matchingPoolUsd;

  const projectsCount = extractFormField(markdown, "Projects Count");
  if (projectsCount) metadata.projectsCount = projectsCount;

  const startDate = extractFormField(markdown, "Start Date");
  if (startDate) metadata.startDate = startDate;

  const endDate = extractFormField(markdown, "End Date");
  if (endDate) metadata.endDate = endDate;

  return metadata;
}

// --- Legacy format helpers (## Metadata + - **Key**: value) ---

function extractField(content: string, label: string): string {
  // Match both bold (**Key**: value) and plain (Key: value) formats
  const match = content.match(new RegExp(`\\*{0,2}${label}\\*{0,2}:[ \\t]*(.+)`));
  if (!match) return "";
  // For markdown links [text](url), extract the url for URL fields, text otherwise
  const linkMatch = match[1].match(/\[([^\]]*)\]\(([^)]*)\)/);
  if (linkMatch) {
    return /url/i.test(label) ? linkMatch[2].trim() : linkMatch[1].trim();
  }
  return match[1].trim();
}

function parseLegacyMetadata(markdown: string): IssueMetadata {
  const capitalize = (str: string) =>
    str ? str[0].toUpperCase() + str.slice(1) : "";

  const metadata: IssueMetadata = {};

  const metadataSection = markdown.match(/## Metadata\s+([\s\S]*?)(?=\n##|$)/);
  if (!metadataSection) return metadata;

  const content = metadataSection[1];

  const slug = extractField(content, "Slug");
  if (slug) metadata.slug = slug;

  const desc = extractField(content, "Short Description");
  if (desc) metadata.shortDescription = desc;

  const tags = extractField(content, "Tags");
  if (tags) {
    metadata.tags = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
  }

  const featured = extractField(content, "Featured").toLowerCase();
  if (featured === "true") metadata.featured = true;

  const sensemakingFor = extractField(content, "Sensemaking For").toLowerCase().trim();
  if ((SENSEMAKING_CATEGORIES as readonly string[]).includes(sensemakingFor)) metadata.sensemakingFor = sensemakingFor;

  const researchType = extractField(content, "Research Type").toLowerCase();
  if (researchType && typeof researchType === "string")
    metadata.researchType = capitalize(researchType);

  const ctaUrl = extractField(content, "CTA URL");
  if (ctaUrl) metadata.ctaUrl = ctaUrl;

  const matchingPoolUsd = extractField(content, "Matching Pool USD");
  if (matchingPoolUsd) metadata.matchingPoolUsd = matchingPoolUsd;

  const projectsCount = extractField(content, "Projects Count");
  if (projectsCount) metadata.projectsCount = projectsCount;

  const startDate = extractField(content, "Start Date");
  if (startDate) metadata.startDate = startDate;

  const endDate = extractField(content, "End Date");
  if (endDate) metadata.endDate = endDate;

  return metadata;
}

// --- Public API ---

/** Parse metadata from a GitHub issue body. Supports both forms and legacy formats. */
export function parseMetadata(markdown: string): IssueMetadata {
  // GitHub issue forms use ### headings; legacy templates use ## Metadata + **Key**: value
  if (/(?:^|\n)### (?:Short Description|Slug|Tags|Description)/.test(markdown)) {
    return parseFormMetadata(markdown);
  }
  return parseLegacyMetadata(markdown);
}

/** Parse a named ## or ### section from the issue body */
export function parseSection(markdown: string, sectionName: string): string {
  const stop = sectionName === "Description" ? DESC_STOP : "\\n#{2,3} [^#]|---|$";
  const section = markdown.match(
    new RegExp(
      `#{2,3} ${sectionName}\\s+(?:<!--[\\s\\S]*?-->[ \\t]*)?([\\s\\S]*?)(?=${stop})`,
    ),
  );
  return section ? section[1].trim() : "";
}

/** Parse a bullet-point or line-per-item list from a named ## or ### section */
export function parseList(markdown: string, sectionName: string): string[] {
  const section = markdown.match(
    new RegExp(
      `#{2,3} ${sectionName}\\s+(?:<!--[\\s\\S]*?-->[ \\t]*)?([\\s\\S]*?)(?=\\n#{2,3} [^#]|---|$)`,
    ),
  );
  if (!section) return [];

  // Helper: normalize a raw line into zero or more slugs
  const normalizeLine = (line: string): string[] =>
    line
      .replace(/^-\s*/, "") // strip leading "- " or "-"
      .split(",")            // handle comma-separated values
      .map((s) => s.replace(/^`(.*)`$/, "$1").trim())
      .filter((s) => s && s !== "-");

  // Legacy format: bullet points (- slug)
  const bulletPoints = section[1].match(/^-\s+(.+)$/gm);
  if (bulletPoints) {
    return bulletPoints.flatMap((point) =>
      normalizeLine(point.replace(/^-\s+/, "").trim()),
    );
  }

  // Forms format: plain lines, one slug per line (also handles -slug, comma-separated)
  return section[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && l !== NO_RESPONSE && !l.startsWith("#") && !l.startsWith("<!--"))
    .flatMap(normalizeLine);
}

/** Extract all images (markdown and HTML) from a markdown string */
export function extractImages(markdown: string): ParsedImage[] {
  const images: ParsedImage[] = [];

  const markdownRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  let match;
  while ((match = markdownRegex.exec(markdown)) !== null) {
    images.push({ alt: match[1], url: match[2], markdown: match[0] });
  }

  const htmlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlRegex.exec(markdown)) !== null) {
    const imgTag = match[0];
    const src = match[1];
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
    images.push({
      alt: altMatch ? altMatch[1] : "",
      url: src,
      markdown: imgTag,
    });
  }

  return images;
}

/** Extract the first image URL from a named ## or ### section */
export function extractFirstImage(
  markdown: string,
  sectionName: string,
): string {
  const section = markdown.match(
    new RegExp(
      `#{2,3} ${sectionName}\\s+(?:<!--[\\s\\S]*?-->[ \\t]*)?([\\s\\S]*?)(?=\\n#{2,3} [^#]|$)`,
    ),
  );
  if (!section) return "";

  const images = extractImages(section[1]);
  return images.length > 0 ? images[0].url : "";
}

/**
 * Extract images grouped by section (Banner, Logo, Description).
 * Used by publish scripts for downloading images.
 */
export function extractImagesBySections(issueBody: string) {
  const bannerImages: ParsedImage[] = [];
  const logoImages: ParsedImage[] = [];
  const descriptionImages: ParsedImage[] = [];

  const bannerSection = issueBody.match(
    /#{2,3} Banner Image\s+(?:<!--.*?-->[ \t]*)?([\s\S]*?)(?=\n#{2,3} [^#]|$)/,
  );
  if (bannerSection) bannerImages.push(...extractImages(bannerSection[1]));

  const logoSection = issueBody.match(
    /#{2,3} Logo\s+(?:<!--.*?-->[ \t]*)?([\s\S]*?)(?=\n#{2,3} [^#]|$)/,
  );
  if (logoSection) logoImages.push(...extractImages(logoSection[1]));

  const descSection = issueBody.match(
    new RegExp(
      `#{2,3} Description\\s+(?:<!--[\\s\\S]*?-->[ \\t]*)?([\\s\\S]*?)(?=${DESC_STOP})`,
    ),
  );
  if (descSection) descriptionImages.push(...extractImages(descSection[1]));

  return { bannerImages, logoImages, descriptionImages };
}


/** Format markdown content (preserve line breaks, bold headings) */
export function formatMarkdown(content: string): string {
  let formatted = content.replace(/([^\n\s])\n([^\n])/g, "$1  \n$2");
  formatted = formatted.replace(/([^\n])\n(\*\*[^*]+\*\*)\n/g, "$1\n\n$2\n\n");
  return formatted;
}

/** Generate a slug from a title string */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
