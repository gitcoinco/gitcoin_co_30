/**
 * Script utilities for publishing content from GitHub issues.
 * Parsing logic lives in src/lib/parse-issue.ts (shared with the web app).
 * This file adds script-specific functions: image downloading and processing.
 */

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import sharp from "sharp";
import { isAllowedImageUrl } from "./image-url-policy";

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

const MAX_REDIRECTS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;   // 10 MB for images


function contentTypeToExt(contentType: string): string {
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  return ".png";
}

function isSvgFile(filepath: string): boolean {
  const fd = fs.openSync(filepath, "r");
  try {
    const header = Buffer.alloc(512);
    const length = fs.readSync(fd, header, 0, header.length, 0);
    return /<(?:\?xml[^>]*>\s*)?svg[\s>]/i.test(header.toString("utf8", 0, length));
  } finally {
    fs.closeSync(fd);
  }
}

/** Download an image from a URL to a local file. Returns the detected content-type. */
export async function downloadImage(
  url: string,
  filepath: string,
  redirectCount = 0,
): Promise<string> {
  if (redirectCount > MAX_REDIRECTS) {
    throw new Error(`Too many redirects (>${MAX_REDIRECTS}) for ${url}`);
  }

  const parsed = new URL(url);
  if (!isAllowedImageUrl(parsed)) {
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
          return downloadImage(
            response.headers.location,
            filepath,
            redirectCount + 1,
          )
            .then((ct) => resolve(ct))
            .catch(reject);
        }

        const contentType = response.headers["content-type"] || "";
        if (
          !contentType.startsWith("image/") &&
          !contentType.startsWith("application/octet-stream")
        ) {
          response.resume(); // drain the response
          return reject(
            new Error(`Unexpected content-type "${contentType}" for ${url}`),
          );
        }

        let downloaded = 0;
        const file = fs.createWriteStream(filepath);

        response.on("data", (chunk: Buffer) => {
          downloaded += chunk.length;
          if (downloaded > MAX_FILE_SIZE) {
            response.destroy();
            file.close();
            fs.unlink(filepath, () => {});
            reject(
              new Error(
                `File exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit: ${url}`,
              ),
            );
          }
        });

        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(contentType);
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
    "content-images",
    contentType,
    slug,
  );

  fs.mkdirSync(imagesDir, { recursive: true });

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

    // Download to a separate temporary file: SVG uploads can have a .png URL.
    const tempDir = fs.mkdtempSync(path.join(dir, ".image-"));
    const filepath = path.join(tempDir, "source");
    let filename: string;
    try {
      const detectedType = await downloadImage(img.url, filepath);
      const svg = ext.toLowerCase() === ".svg" || detectedType.toLowerCase().includes("image/svg+xml") || isSvgFile(filepath);
      const finalExt = svg ? ".png" : ext;
      filename = `${baseFilename}${finalExt}`;
      let counter = 1;
      while (usedFilenames.has(filename) || ["banner.png", "logo.png"].includes(filename)) {
        filename = `${baseFilename}-${counter++}${finalExt}`;
      }
      usedFilenames.add(filename);
      const destination = path.join(dir, filename);
      if (svg) {
        await sharp(filepath, { density: 144 }).png().toFile(destination);
      } else {
        fs.renameSync(filepath, destination);
      }
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    return { filename, publicPath: `${publicPrefix}/${filename}` };
  }

  // Process banner image — saved as {slug}/banner.png (converted from SVG if needed)
  if (bannerImages.length > 0) {
    const img = bannerImages[0];
    const urlExt = img.url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)?.[0];
    const tempPath = path.join(imagesDir, `banner_tmp`);
    const detectedType = await downloadImage(img.url, tempPath);
    let ext = urlExt || contentTypeToExt(detectedType);
    if (ext.toLowerCase() === ".svg" || detectedType.toLowerCase().includes("image/svg+xml") || isSvgFile(tempPath)) {
      await sharp(tempPath, { density: 144 }).png().toFile(path.join(imagesDir, "banner.png"));
      fs.unlinkSync(tempPath);
      ext = ".png";
    } else {
      fs.renameSync(tempPath, path.join(imagesDir, `banner${ext}`));
    }
    banner = `/content-images/${contentType}/${slug}/banner${ext}`;
    console.log(`  ✓ banner${ext} (banner)`);
  }

  // Process logo image — saved as {slug}/logo.png (converted from SVG if needed)
  if (logoImages.length > 0) {
    const img = logoImages[0];
    const urlExt = img.url.match(/\.(png|jpg|jpeg|gif|svg|webp)/i)?.[0];
    const tempPath = path.join(imagesDir, `logo_tmp`);
    const detectedType = await downloadImage(img.url, tempPath);
    let ext = urlExt || contentTypeToExt(detectedType);
    if (ext.toLowerCase() === ".svg" || detectedType.toLowerCase().includes("image/svg+xml") || isSvgFile(tempPath)) {
      await sharp(tempPath, { density: 144 }).png().toFile(path.join(imagesDir, "logo.png"));
      fs.unlinkSync(tempPath);
      ext = ".png";
    } else {
      fs.renameSync(tempPath, path.join(imagesDir, `logo${ext}`));
    }
    logo = `/content-images/${contentType}/${slug}/logo${ext}`;
    console.log(`  ✓ logo${ext} (logo)`);
  }

  // Process description images
  for (let i = 0; i < allImages.length; i++) {
    const img = allImages[i];
    const { filename, publicPath } = await downloadWithFilename(
      img,
      imagesDir,
      `/content-images/${contentType}/${slug}`,
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
