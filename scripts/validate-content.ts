/**
 * Validates content markdown files for required fields, correct slugs,
 * valid enum values, and existence of referenced image/PDF files.
 *
 * Usage: npx tsx scripts/validate-content.ts [files...]
 * If no files are given, validates all content files.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  DATE_REGEX,
  validateResearchType,
  validateSensemakingFor,
  validateCampaignDates,
} from "./content-validators";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content");
const PUBLIC_DIR = path.join(ROOT, "public");

const CONTENT_TYPES = ["apps", "mechanisms", "research", "case-studies", "campaigns"] as const;
type ContentDir = typeof CONTENT_TYPES[number];

interface ValidationError {
  file: string;
  errors: string[];
}

// --- Image dimension helpers (no external dependency) ---

function readPngDimensions(buf: Buffer): { width: number; height: number } | null {
  // PNG: 8-byte signature, then IHDR chunk — width at +16, height at +20
  if (buf.length >= 24 && buf[0] === 0x89 && buf.subarray(1, 4).toString() === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
}

function readJpegDimensions(buf: Buffer): { width: number; height: number } | null {
  let offset = 2; // skip FF D8 SOI marker
  while (offset < buf.length - 8) {
    if (buf[offset] !== 0xff) break;
    const marker = buf[offset + 1];
    // SOF markers: C0-CF, excluding DHT (C4), JPG (C8), DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return null;
}

function readImageDimensions(filePath: string): { width: number; height: number } | null {
  try {
    const fileSize = fs.statSync(filePath).size;
    if (fileSize === 0) return null;
    const buf = Buffer.alloc(Math.min(65536, fileSize));
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    if (buf[0] === 0x89) return readPngDimensions(buf);
    if (buf[0] === 0xff && buf[1] === 0xd8) return readJpegDimensions(buf);
  } catch {
    // best-effort — skip dimension check if unreadable
  }
  return null;
}

// --- Validation helpers ---

function checkPathExists(field: string, val: unknown, errors: string[]): void {
  if (!val) return;
  const str = String(val);
  if (str.toLowerCase().endsWith(".svg")) {
    errors.push(`${field} "${str}" is an SVG — banners and logos must be PNG or JPG (SVGs cannot be used as OG images)`);
    return;
  }
  const localPath = path.join(PUBLIC_DIR, str);
  if (!fs.existsSync(localPath)) {
    errors.push(`${field} "${str}" points to a file that does not exist on disk`);
  }
}

function findDuplicates(arr: unknown[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const item of arr) {
    if (typeof item !== "string") continue;
    if (seen.has(item)) dupes.add(item);
    else seen.add(item);
  }
  return [...dupes];
}

// --- Core validation ---

function validateFile(filePath: string, contentType: ContentDir): string[] {
  const errors: string[] = [];
  const filename = path.basename(filePath, ".md");
  const raw = fs.readFileSync(filePath, "utf8");

  let data: Record<string, unknown>;
  try {
    ({ data } = matter(raw));
  } catch {
    return ["Could not parse frontmatter YAML"];
  }

  // Slug must match filename
  if (!data.slug) {
    errors.push("Missing required field: slug");
  } else if (data.slug !== filename) {
    errors.push(`slug "${data.slug}" does not match filename "${filename}"`);
  }

  // Required base fields
  if (!data.name) errors.push("Missing required field: name");
  if (!data.shortDescription) errors.push("Missing required field: shortDescription");
  if (!data.lastUpdated) {
    errors.push("Missing required field: lastUpdated");
  } else if (!DATE_REGEX.test(String(data.lastUpdated))) {
    errors.push(`lastUpdated "${data.lastUpdated}" is not in YYYY-MM-DD format`);
  }

  // Tags must be an array
  if (data.tags !== undefined && !Array.isArray(data.tags)) {
    errors.push("tags must be an array");
  }

  // Banner and logo must exist on disk if set
  checkPathExists("banner", data.banner, errors);
  checkPathExists("logo", data.logo, errors);

  // Logo must be square
  if (data.logo) {
    const logoPath = path.join(PUBLIC_DIR, String(data.logo));
    if (fs.existsSync(logoPath)) {
      const dims = readImageDimensions(logoPath);
      if (dims && dims.width !== dims.height) {
        errors.push(`logo is not square (${dims.width}×${dims.height} px) — must be 1:1`);
      }
    }
  }

  // Duplicate slugs in related* lists
  const RELATED_FIELDS = [
    "relatedApps",
    "relatedMechanisms",
    "relatedCaseStudies",
    "relatedResearch",
    "relatedCampaigns",
  ] as const;
  for (const field of RELATED_FIELDS) {
    const slugs = data[field];
    if (Array.isArray(slugs)) {
      const dupes = findDuplicates(slugs);
      if (dupes.length > 0) {
        errors.push(`${field} contains duplicate slugs: ${dupes.join(", ")}`);
      }
    }
  }

  // Research-specific validation
  if (contentType === "research") {
    validateResearchType(data.researchType as string | undefined, errors);
    validateSensemakingFor(data.sensemakingFor as string | undefined, errors);

    // Local ctaUrl paths must exist on disk
    if (data.ctaUrl && String(data.ctaUrl).startsWith("/")) {
      checkPathExists("ctaUrl", data.ctaUrl, errors);
    }
  }

  // Campaign-specific validation
  if (contentType === "campaigns") {
    validateCampaignDates(
      data.startDate as string | undefined,
      data.endDate as string | undefined,
      errors,
    );
  }

  return errors;
}

// --- File resolution ---

function resolveFiles(args: string[]): { filePath: string; contentType: ContentDir }[] {
  if (args.length > 0) {
    return args.flatMap((arg) => {
      const abs = path.resolve(arg);
      if (!abs.endsWith(".md")) return [];
      for (const ct of CONTENT_TYPES) {
        if (abs.includes(`/content/${ct}/`) || abs.includes(`\\content\\${ct}\\`)) {
          return [{ filePath: abs, contentType: ct }];
        }
      }
      return []; // ignore files outside known content dirs
    });
  }

  // No args — validate all content files
  return CONTENT_TYPES.flatMap((ct) => {
    const dir = path.join(CONTENT_DIR, ct);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({ filePath: path.join(dir, f), contentType: ct }));
  });
}

// --- Main ---

const files = resolveFiles(process.argv.slice(2));

if (files.length === 0) {
  console.log("No content files found to validate.");
  process.exit(0);
}

const failures: ValidationError[] = [];

for (const { filePath, contentType } of files) {
  const errors = validateFile(filePath, contentType);
  if (errors.length > 0) {
    failures.push({ file: path.relative(ROOT, filePath), errors });
  }
}

if (failures.length === 0) {
  console.log(`✓ All ${files.length} content file(s) are valid.`);
  process.exit(0);
} else {
  console.error(`\n✗ Validation failed for ${failures.length} file(s):\n`);
  for (const { file, errors } of failures) {
    console.error(`  ${file}`);
    for (const err of errors) {
      console.error(`    • ${err}`);
    }
  }
  console.error();
  process.exit(1);
}
