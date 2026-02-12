/**
 * Script utilities for publishing content from GitHub issues.
 * Parsing logic lives in src/lib/parse-issue.ts (shared with the web app).
 * This file adds script-specific functions: image downloading and processing.
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

// Re-export all parsing functions from the shared module
export {
  parseMetadata,
  parseSection,
  parseList,
  extractImages,
  extractImagesBySections,
  formatMarkdown,
  slugify,
} from "../src/lib/parse-issue";

import {
  extractImagesBySections,
  formatMarkdown,
  type ParsedImage,
} from "../src/lib/parse-issue";

const ALLOWED_HOSTS = [
  "github.com",
  "user-images.githubusercontent.com",
  "raw.githubusercontent.com",
  "objects.githubusercontent.com",
  "avatars.githubusercontent.com",
];
const MAX_REDIRECTS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/** Download an image from a URL to a local file */
export async function downloadImage(
  url: string,
  filepath: string,
  redirectCount = 0,
): Promise<void> {
  if (redirectCount > MAX_REDIRECTS) {
    throw new Error(`Too many redirects (>${MAX_REDIRECTS}) for ${url}`);
  }

  const parsed = new URL(url);
  if (!ALLOWED_HOSTS.some((h) => parsed.hostname === h || parsed.hostname.endsWith(`.${h}`))) {
    throw new Error(`Blocked download from untrusted host: ${parsed.hostname}`);
  }

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          return downloadImage(response.headers.location, filepath, redirectCount + 1)
            .then(resolve)
            .catch(reject);
        }

        const contentType = response.headers["content-type"] || "";
        if (!contentType.startsWith("image/") && !contentType.startsWith("application/octet-stream")) {
          response.resume(); // drain the response
          return reject(new Error(`Unexpected content-type "${contentType}" for ${url}`));
        }

        let downloaded = 0;
        const file = fs.createWriteStream(filepath);

        response.on("data", (chunk: Buffer) => {
          downloaded += chunk.length;
          if (downloaded > MAX_FILE_SIZE) {
            response.destroy();
            file.close();
            fs.unlink(filepath, () => {});
            reject(new Error(`File exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit: ${url}`));
          }
        });

        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
  });
}

/** Download and process images (banner, logo, and description images) */
export async function processImages(
  issueBody: string,
  descriptionMarkdown: string,
  slug: string,
  contentType: string,
) {
  const { bannerImages, logoImages, descriptionImages } =
    extractImagesBySections(issueBody);
  const allImages = [...descriptionImages];

  if (
    allImages.length === 0 &&
    bannerImages.length === 0 &&
    logoImages.length === 0
  ) {
    return {
      banner: "",
      logo: "",
      updatedMarkdown: formatMarkdown(descriptionMarkdown),
    };
  }

  const imagesDir = path.join(
    process.cwd(),
    "public",
    "images",
    contentType,
    slug,
  );
  const logosDir = path.join(process.cwd(), "public", "logos");

  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(logosDir, { recursive: true });

  let updatedMarkdown = formatMarkdown(descriptionMarkdown);
  let banner = "";
  let logo = "";

  const totalImages =
    bannerImages.length + logoImages.length + allImages.length;
  if (totalImages > 0) {
    console.log(`📸 Downloading ${totalImages} images...`);
  }

  const usedFilenames = new Set<string>();

  async function downloadWithFilename(
    img: ParsedImage,
    dir: string,
    publicPrefix: string,
    defaultBase: string,
    defaultExt: string,
  ) {
    const ext =
      img.url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)?.[0] || defaultExt;
    let baseFilename = img.alt
      ? img.alt.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : defaultBase;

    let filename = `${baseFilename}${ext}`;
    let counter = 1;
    while (usedFilenames.has(filename)) {
      filename = `${baseFilename}-${counter}${ext}`;
      counter++;
    }
    usedFilenames.add(filename);

    const filepath = path.join(dir, filename);
    const publicPath = `${publicPrefix}/${filename}`;

    await downloadImage(img.url, filepath);
    return { filename, publicPath };
  }

  // Process banner image
  if (bannerImages.length > 0) {
    const { filename, publicPath } = await downloadWithFilename(
      bannerImages[0],
      imagesDir,
      `/images/${contentType}/${slug}`,
      "banner",
      ".png",
    );
    banner = publicPath;
    console.log(`  ✓ ${filename} (banner)`);
  }

  // Process logo image
  if (logoImages.length > 0) {
    const { filename, publicPath } = await downloadWithFilename(
      logoImages[0],
      logosDir,
      "/logos",
      slug,
      ".svg",
    );
    logo = publicPath;
    console.log(`  ✓ ${filename} (logo)`);
  }

  // Process description images
  for (let i = 0; i < allImages.length; i++) {
    const img = allImages[i];
    const { filename, publicPath } = await downloadWithFilename(
      img,
      imagesDir,
      `/images/${contentType}/${slug}`,
      `image-${i + 1}`,
      ".png",
    );
    console.log(`  ✓ ${filename}`);
    updatedMarkdown = updatedMarkdown.replace(
      img.markdown,
      `![${img.alt}](${publicPath})`,
    );
  }

  return { banner, logo, updatedMarkdown };
}
