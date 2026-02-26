/**
 * Opens the Chladni Particles banner generator in the browser,
 * copies the content name to clipboard, then watches ~/Downloads
 * for the saved PNG and moves it to the right place automatically.
 *
 * Usage:
 *   npm run open-banner <content-type> <slug> [--wide]
 *   npm run open-banner mechanisms quadratic-funding
 *   npm run open-banner research my-sensemaking-article --wide
 *
 * The content name is derived from the slug (e.g. "quadratic-funding" → "Quadratic Funding")
 * and copied to your clipboard so you can paste it into the Text field.
 */

import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const CHLADNI_URL = "https://octaviaan.github.io/Chladni-Particles/";
const DOWNLOADS_DIR = path.join(os.homedir(), "Downloads");

function openUrl(url: string) {
  const cmd =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd);
}

function waitForDownload(existing: Set<string>): Promise<string> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      let files: string[];
      try {
        files = fs.readdirSync(DOWNLOADS_DIR);
      } catch {
        return;
      }
      const newFile = files.find(
        (f) =>
          !existing.has(f) &&
          /\.(png|jpg|jpeg)$/i.test(f) &&
          !f.startsWith(".") &&
          !f.endsWith(".crdownload") &&
          !f.endsWith(".part"),
      );
      if (newFile) {
        clearInterval(interval);
        setTimeout(() => resolve(path.join(DOWNLOADS_DIR, newFile)), 1200);
      }
    }, 600);
  });
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const [contentType, slug] = args;

  if (!contentType || !slug) {
    console.error("Usage: npx tsx scripts/open-banner.ts <content-type> <slug>");
    console.error("  content-type: mechanisms | apps | research | case-studies | campaigns");
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), "public", "content-images", contentType, slug);
  const outPath = path.join(outDir, "banner.png");
  const publicPath = `/content-images/${contentType}/${slug}/banner.png`;

  let existing: Set<string>;
  try {
    existing = new Set(fs.readdirSync(DOWNLOADS_DIR));
  } catch {
    existing = new Set();
  }

  openUrl(CHLADNI_URL);

  console.log("\n🎨  Chladni generator opened in your browser\n");
  console.log("  1. Set Aspect to Landscape (bottom of the panel)");
  console.log("  2. Press R to randomize — repeat until you like it");
  console.log("  3. Press S to save\n");
  console.log("Watching ~/Downloads... (Ctrl+C to cancel)");

  const srcPath = await waitForDownload(existing);

  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(srcPath, outPath);
  fs.unlinkSync(srcPath);

  console.log(`\n✅  Saved: public${publicPath}`);
  console.log(`\nAdd to frontmatter:\n  banner: ${publicPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
