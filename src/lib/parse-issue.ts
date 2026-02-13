/**
 * Shared parsing functions for GitHub issue bodies.
 * Used by both the publish scripts and the /api/preview route.
 * Pure functions — no fs, path, or network dependencies.
 */

export interface IssueMetadata {
  slug?: string;
  shortDescription?: string;
  tags?: string[];
  featured?: boolean;
  sensemakingFor?: string;
  externalUrl?: string;
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

// Description can contain user ## headings, so it stops only at known structural sections
const DESC_STOP = "\\n## Related|\\n## Submission|---|$";

function extractField(content: string, label: string): string {
  const match = content.match(new RegExp(`\\*\\*${label}\\*\\*:\\s*(.+)`));
  if (!match) return "";
  // For markdown links [text](url), extract the url for URL fields, text otherwise
  const linkMatch = match[1].match(/\[([^\]]*)\]\(([^)]*)\)/);
  if (linkMatch) {
    return /url/i.test(label) ? linkMatch[2].trim() : linkMatch[1].trim();
  }
  return match[1].trim();
}

/** Parse the ## Metadata section from a GitHub issue body */
export function parseMetadata(markdown: string): IssueMetadata {
  const metadata: IssueMetadata = {};

  const metadataSection = markdown.match(
    /## Metadata\s+([\s\S]*?)(?=\n##|$)/,
  );
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

  const sensemakingFor = extractField(
    content,
    "Sensemaking For",
  ).toLowerCase();
  if (sensemakingFor) metadata.sensemakingFor = sensemakingFor;

  const externalUrl = extractField(content, "External URL");
  if (externalUrl) metadata.externalUrl = externalUrl;

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

/** Parse a named ## section from the issue body */
export function parseSection(markdown: string, sectionName: string): string {
  const stop =
    sectionName === "Description" ? DESC_STOP : "\\n## [^#]|---|$";
  const section = markdown.match(
    new RegExp(
      `## ${sectionName}\\s+(?:<!--[\\s\\S]*?-->\\s*)?([\\s\\S]*?)(?=${stop})`,
    ),
  );
  return section ? section[1].trim() : "";
}

/** Parse a bullet-point list from a named ## section */
export function parseList(markdown: string, sectionName: string): string[] {
  const section = markdown.match(
    new RegExp(
      `## ${sectionName}\\s+(?:<!--[\\s\\S]*?-->\\s*)?([\\s\\S]*?)(?=\\n## [^#]|---|$)`,
    ),
  );
  if (!section) return [];

  const bulletPoints = section[1].match(/^-\s+(.+)$/gm);
  if (!bulletPoints) return [];

  return bulletPoints
    .map((point) => point.replace(/^-\s+/, "").trim())
    .filter((item) => item && item !== "-");
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

/** Extract the first image URL from a named section */
export function extractFirstImage(
  markdown: string,
  sectionName: string,
): string {
  const section = markdown.match(
    new RegExp(
      `## ${sectionName}\\s+(?:<!--[\\s\\S]*?-->\\s*)?([\\s\\S]*?)(?=\\n## [^#]|$)`,
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
    /## Banner Image\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n## [^#]|$)/,
  );
  if (bannerSection) bannerImages.push(...extractImages(bannerSection[1]));

  const logoSection = issueBody.match(
    /## Logo\s+(?:<!--.*?-->\s*)?([\s\S]*?)(?=\n## [^#]|$)/,
  );
  if (logoSection) logoImages.push(...extractImages(logoSection[1]));

  const descSection = issueBody.match(
    new RegExp(
      `## Description\\s+(?:<!--[\\s\\S]*?-->\\s*)?([\\s\\S]*?)(?=${DESC_STOP})`,
    ),
  );
  if (descSection) descriptionImages.push(...extractImages(descSection[1]));

  return { bannerImages, logoImages, descriptionImages };
}

/** Format markdown content (preserve line breaks, bold headings) */
export function formatMarkdown(content: string): string {
  let formatted = content.replace(/([^\n\s])\n([^\n])/g, "$1  \n$2");
  formatted = formatted.replace(
    /([^\n])\n(\*\*[^*]+\*\*)\n/g,
    "$1\n\n$2\n\n",
  );
  return formatted;
}

/** Generate a slug from a title string */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
