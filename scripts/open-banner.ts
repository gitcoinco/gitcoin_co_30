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

function focusTerminal() {
  if (process.platform !== "darwin") return;
  const termProgram = process.env.TERM_PROGRAM ?? "";
  let appName = "Terminal";
  if (termProgram === "iTerm.app") appName = "iTerm2";
  else if (termProgram === "WarpTerminal") appName = "Warp";
  else if (termProgram === "vscode") appName = "Visual Studio Code";
  exec(`osascript -e 'tell application "${appName}" to activate'`);
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
  const mdPath = path.join(process.cwd(), "src", "content", contentType, `${slug}.md`);

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
  console.log("  3. When happy, press S to save — terminal will return automatically\n");
  console.log("Watching ~/Downloads... (Ctrl+C to cancel)");

  const srcPath = await waitForDownload(existing);

  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(srcPath, outPath);
  fs.unlinkSync(srcPath);

  focusTerminal();
  console.log(`\n✅  Saved: public${publicPath}`);

  // Auto-patch frontmatter if the markdown file exists
  if (fs.existsSync(mdPath)) {
    const content = fs.readFileSync(mdPath, "utf-8");
    if (!/^banner:/m.test(content)) {
      const lines = content.split("\n");
      let closingIndex = -1;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trimEnd() === "---") {
          closingIndex = i;
          break;
        }
      }
      if (closingIndex !== -1) {
        lines.splice(closingIndex, 0, `banner: ${publicPath}`);
        fs.writeFileSync(mdPath, lines.join("\n"));
        console.log(`✅  Frontmatter updated in ${contentType}/${slug}.md`);
      }
    } else {
      // Replace existing banner line
      const updated = content.replace(/^banner:.*$/m, `banner: ${publicPath}`);
      fs.writeFileSync(mdPath, updated);
      console.log(`✅  Frontmatter updated in ${contentType}/${slug}.md`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
