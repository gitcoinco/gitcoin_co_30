/**
 * Generates Chladni-pattern banners using the real Chladni Particles generator,
 * fully automated via Playwright. Finds all content files missing a banner and
 * generates one for each, then updates the frontmatter automatically.
 *
 * One-time setup: npx playwright install chromium
 *
 * Usage:
 *   npm run generate-banners                   # all content types missing a banner
 *   npm run generate-banners mechanisms        # one content type only
 *   npm run generate-banners mechanisms quadratic-funding  # single item
 */

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const CHLADNI_URL = "https://octaviaan.github.io/Chladni-Particles/";
const CONTENT_DIR = path.join(process.cwd(), "src", "content");

const CONTENT_TYPES: Record<string, string> = {
  mechanisms: "mechanisms",
  apps: "apps",
  research: "research",
  "case-studies": "case-studies",
  campaigns: "campaigns",
};

// How long to wait for particles to settle after randomizing (ms)
const SETTLE_MS = 5000;

interface ContentItem {
  contentType: string;
  slug: string;
  filePath: string;
}

/** Find all .md files in a content directory that don't have a banner set. */
function findMissingBanners(contentType: string): ContentItem[] {
  const dir = path.join(CONTENT_DIR, contentType);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .flatMap((f) => {
      const filePath = path.join(dir, f);
      const content = fs.readFileSync(filePath, "utf-8");
      const hasBanner = /^banner:/m.test(content);
      if (hasBanner) return [];
      return [{ contentType, slug: f.replace(/\.md$/, ""), filePath }];
    });
}

/** Insert banner line into frontmatter, just before the closing ---  */
function addBannerToFrontmatter(filePath: string, publicPath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  // Find the closing --- of the frontmatter block (second occurrence)
  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trimEnd() === "---") {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    console.warn(`  ⚠️  Could not find frontmatter in ${filePath} — skipping update`);
    return;
  }

  lines.splice(closingIndex, 0, `banner: ${publicPath}`);
  fs.writeFileSync(filePath, lines.join("\n"));
}

async function generateBanner(
  page: import("playwright").Page,
  item: ContentItem,
): Promise<string> {
  const { contentType, slug, filePath } = item;
  const outDir = path.join(process.cwd(), "public", "content-images", contentType, slug);
  const outPath = path.join(outDir, "banner.png");
  const publicPath = `/content-images/${contentType}/${slug}/banner.png`;

  fs.mkdirSync(outDir, { recursive: true });

  // Navigate (reuse page across items for speed — only first load is slow)
  if (page.url() !== CHLADNI_URL) {
    await page.goto(CHLADNI_URL, { waitUntil: "networkidle" });
    // Wait for Three.js + initial particle settle
    await page.waitForTimeout(4000);
    // Set aspect to Landscape once per session
    await setLandscape(page);
  }

  // Click canvas to ensure keyboard focus isn't on a Tweakpane input
  const canvas = page.locator("canvas").first();
  await canvas.waitFor({ state: "attached", timeout: 60000 });
  await canvas.click({ timeout: 60000 });

  // Randomize and wait for particles to settle
  await page.keyboard.press("r");
  await page.waitForTimeout(SETTLE_MS);

  // Intercept the download triggered by S
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.keyboard.press("s"),
  ]);

  await download.saveAs(outPath);

  // Update the markdown file's frontmatter
  addBannerToFrontmatter(filePath, publicPath);

  return publicPath;
}

async function setLandscape(page: import("playwright").Page) {
  try {
    // Tweakpane renders the Landscape button as a button with that text
    const btn = page.locator("button", { hasText: "Landscape" }).first();
    await btn.click({ timeout: 3000 });
  } catch {
    // Button not found or already in landscape — continue
  }
}

async function main() {
  const args = process.argv.slice(2);
  const [typeArg, slugArg] = args;

  // Resolve which items to process
  let items: ContentItem[] = [];

  if (typeArg && slugArg) {
    // Single item
    const filePath = path.join(CONTENT_DIR, typeArg, `${slugArg}.md`);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    if (/^banner:/m.test(content)) {
      console.log(`${typeArg}/${slugArg} already has a banner — nothing to do.`);
      process.exit(0);
    }
    items = [{ contentType: typeArg, slug: slugArg, filePath }];
  } else if (typeArg) {
    // One content type
    if (!CONTENT_TYPES[typeArg]) {
      console.error(`Unknown content type: ${typeArg}`);
      console.error(`Valid types: ${Object.keys(CONTENT_TYPES).join(", ")}`);
      process.exit(1);
    }
    items = findMissingBanners(typeArg);
  } else {
    // All content types
    items = Object.keys(CONTENT_TYPES).flatMap(findMissingBanners);
  }

  if (items.length === 0) {
    console.log("✅  All content already has banners — nothing to generate.");
    process.exit(0);
  }

  console.log(`\n🎨  Generating ${items.length} banner(s)...\n`);

  let browser: import("playwright").Browser;
  try {
    browser = await chromium.launch({
      headless: false,
      args: ["--window-size=1600,900", "--window-position=0,0"],
    });
  } catch (err: any) {
    if (
      err.message?.includes("Executable doesn't exist") ||
      err.message?.includes("executable doesn't exist") ||
      err.message?.includes("browserType.launch")
    ) {
      console.error("❌  Playwright browser not installed.");
      console.error("    Run this once to set it up:\n");
      console.error("    npx playwright install chromium\n");
      process.exit(1);
    }
    throw err;
  }

  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
  });
  const page = await context.newPage();

  // Navigate once upfront
  console.log("  Loading Chladni generator...");
  await page.goto(CHLADNI_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(8000);
  await setLandscape(page);

  let succeeded = 0;
  let failed = 0;

  for (const item of items) {
    process.stdout.write(`  ${item.contentType}/${item.slug} ... `);
    try {
      const publicPath = await generateBanner(page, item);
      console.log(`✅  ${publicPath}`);
      succeeded++;
    } catch (err) {
      console.log(`❌  failed`);
      console.error(`     ${err}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\n${succeeded} generated, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
