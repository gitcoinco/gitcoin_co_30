/**
 * Validates a GitHub issue body for a content submission.
 * Checks that required fields are present and correctly formatted.
 *
 * Usage: npx tsx scripts/validate-issue.ts <content-type> <body-file>
 * Content types: mechanism, app, research, case-study, campaign
 */

import fs from "node:fs";
import {
  parseMetadata,
  parseSection,
  parseList,
  extractFirstImage,
  NO_RESPONSE,
} from "../src/lib/parse-issue";
import {
  validateResearchType,
  validateSensemakingFor,
  validateCampaignDates,
} from "./content-validators";

const [contentType, bodyFile] = process.argv.slice(2);

if (!contentType || !bodyFile) {
  console.error("Usage: validate-issue.ts <content-type> <body-file>");
  process.exit(2);
}

const body = fs.readFileSync(bodyFile, "utf8").replace(/\r\n/g, "\n");
const metadata = parseMetadata(body);
const description = parseSection(body, "Description");

const errors: string[] = [];
const warnings: string[] = [];

// Required across all types
if (!metadata.shortDescription) {
  errors.push("**Short Description** is missing or empty");
}
if (!metadata.tags || metadata.tags.length === 0) {
  errors.push("**Tags** are missing or empty");
}
if (!description || description === NO_RESPONSE) {
  errors.push("**Description** section is empty");
}

const bannerUrl = extractFirstImage(body, "Banner Image");
if (!bannerUrl) {
  errors.push(
    "**Banner Image** is missing — go to https://gitcoin.co/generator, generate a PNG, and drag it into the Banner Image field",
  );
} else if (bannerUrl.toLowerCase().endsWith(".svg")) {
  errors.push(
    "**Banner Image** is an SVG — only PNG or JPG is accepted (SVG cannot be used as OG image)",
  );
}

// App-specific: logo required
const logoUrl = contentType === "app" ? extractFirstImage(body, "Logo") : "";
if (contentType === "app") {
  if (!logoUrl) {
    errors.push(
      "**Logo** is missing — drag your white/inverted PNG logo into the Logo field",
    );
  } else if (logoUrl.toLowerCase().endsWith(".svg")) {
    errors.push(
      "**Logo** is an SVG — only PNG or JPG is accepted (SVG cannot be used as OG image)",
    );
  }
}

// Research-specific
if (contentType === "research") {
  validateResearchType(metadata.researchType, errors);
}

// Campaign-specific
if (contentType === "campaign") {
  validateCampaignDates(metadata.startDate, metadata.endDate, errors);
}

// Duplicate slugs in related lists
const RELATED_SECTIONS = ["Related Apps", "Related Mechanisms", "Related Case Studies", "Related Research", "Related Campaigns"] as const;
for (const section of RELATED_SECTIONS) {
  const items = parseList(body, section);
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const item of items) {
    if (seen.has(item)) dupes.add(item);
    else seen.add(item);
  }
  if (dupes.size > 0) {
    errors.push(`**${section}** contains duplicate slugs: ${[...dupes].join(", ")}`);
  }
}

// Warn if team-only fields were set by the submitter
if (metadata.featured) {
  warnings.push(
    "**Featured** is set — this is a team-only field. Remove it unless intentionally featuring this content.",
  );
}
if (metadata.sensemakingFor) {
  warnings.push(
    `**Sensemaking For** is set to \`${metadata.sensemakingFor}\` — this is a team-only field. Remove it unless intentionally setting this.`,
  );
  validateSensemakingFor(metadata.sensemakingFor, errors);
}

/** Read PNG dimensions from the first 24 bytes of the image at url. Returns null on error or non-PNG. */
async function getPngDimensions(url: string): Promise<{ width: number; height: number } | null> {
  try {
    const res = await fetch(url, { headers: { Range: "bytes=0-23" } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    // PNG signature: 89 50 4E 47 0D 0A 1A 0A
    if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    return null;
  } catch {
    return null;
  }
}

async function main() {
  // Logo square check (PNG only — network request, non-blocking)
  if (contentType === "app" && logoUrl) {
    const dims = await getPngDimensions(logoUrl);
    if (dims && dims.width !== dims.height) {
      warnings.push(
        `**Logo** dimensions are ${dims.width}×${dims.height} — logo must be square (1:1 ratio). Expected 256×256 or 512×512.`,
      );
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("✓ All required fields are present and valid.");
    process.exit(0);
  }

  if (warnings.length > 0) {
    console.warn(`⚠️  ${warnings.length} reviewer note(s):\n`);
    for (const w of warnings) {
      console.warn(`  • ${w}`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n✗ ${errors.length} issue(s) found:\n`);
    for (const err of errors) {
      console.error(`  • ${err}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Validation error:", err);
  process.exit(2);
});
