/**
 * Sync content markdown files and PDFs to an OpenAI vector store for RAG-based chat.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... OPENAI_VECTOR_STORE_ID=vs_... npx tsx scripts/sync-docs.ts
 *
 * If OPENAI_VECTOR_STORE_ID is not set, a new vector store will be created
 * and its ID will be printed so you can add it to your .env.local.
 *
 * Sources synced:
 *   - src/content/**\/*.md          — all content markdown files
 *   - src/content/research/greenpill-books/*.pdf  — Greenpill book PDFs
 *   - public/content-images/research/**\/*.pdf    — research article PDFs
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { glob } from "node:fs/promises";
import OpenAI from "openai";
import matter from "gray-matter";

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");
const GREENPILL_DIR = path.resolve(process.cwd(), "src/content/research/greenpill-books");
const PUBLIC_RESEARCH_DIR = path.resolve(process.cwd(), "public/content-images/research");
const MANIFEST_PATH = path.resolve(process.cwd(), "scripts/.vector-manifest.json");
const VECTOR_STORE_NAME = "gitcoin-funding-directory";

interface ManifestEntry {
  fileId: string;
  hash: string;
}

type Manifest = Record<string, ManifestEntry>;

function sha256Buffer(content: Buffer): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function sha256(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

function loadManifest(): Manifest {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveManifest(manifest: Manifest) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

function contentTypeFromPath(filePath: string): string {
  const relative = path.relative(CONTENT_DIR, filePath);
  return relative.split(path.sep)[0]; // e.g. "apps", "mechanisms"
}

type SyncResult = "uploaded" | "unchanged";

async function syncFile(
  client: OpenAI,
  vectorStoreId: string,
  manifestKey: string,
  fileName: string,
  fileContent: Buffer | string,
  mimeType: string,
  oldManifest: Manifest,
  newManifest: Manifest,
  oldPaths: Set<string>,
): Promise<SyncResult> {
  const hash =
    typeof fileContent === "string"
      ? sha256(fileContent)
      : sha256Buffer(fileContent);

  oldPaths.delete(manifestKey);

  const existing = oldManifest[manifestKey];
  if (existing && existing.hash === hash) {
    newManifest[manifestKey] = existing;
    return "unchanged";
  }

  if (existing) {
    try {
      await client.vectorStores.files.delete(existing.fileId, { vector_store_id: vectorStoreId });
      await client.files.delete(existing.fileId);
    } catch {
      // File may already be deleted, continue
    }
  }

  const blobPart = typeof fileContent === "string" ? fileContent : new Uint8Array(fileContent);
  const file = await client.files.create({
    file: new File([blobPart], fileName, { type: mimeType }),
    purpose: "assistants",
  });

  await client.vectorStores.files.create(vectorStoreId, {
    file_id: file.id,
  });

  newManifest[manifestKey] = { fileId: file.id, hash };
  console.log(`  ↑ ${manifestKey}`);
  return "uploaded";
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Error: OPENAI_API_KEY environment variable is required.");
    process.exit(1);
  }

  const client = new OpenAI({ apiKey });
  let vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

  // Create vector store if not provided
  if (!vectorStoreId) {
    console.log("No OPENAI_VECTOR_STORE_ID set. Creating a new vector store...");
    const store = await client.vectorStores.create({ name: VECTOR_STORE_NAME });
    vectorStoreId = store.id;
    console.log(`Created vector store: ${vectorStoreId}`);
    console.log(`Add this to your .env.local:\n  OPENAI_VECTOR_STORE_ID=${vectorStoreId}\n`);
  }

  // Collect files
  const mdFiles: string[] = [];
  for await (const entry of glob(path.join(CONTENT_DIR, "**/*.md"))) {
    mdFiles.push(entry);
  }
  mdFiles.sort();

  const greenpillPdfs: string[] = [];
  for await (const entry of glob(path.join(GREENPILL_DIR, "*.pdf"))) {
    greenpillPdfs.push(entry);
  }
  greenpillPdfs.sort();

  const researchPdfs: string[] = [];
  for await (const entry of glob(path.join(PUBLIC_RESEARCH_DIR, "**/*.pdf"))) {
    researchPdfs.push(entry);
  }
  researchPdfs.sort();

  console.log(`Found ${mdFiles.length} markdown files, ${greenpillPdfs.length} greenpill PDFs, ${researchPdfs.length} research PDFs.\n`);

  const oldManifest = loadManifest();
  const newManifest: Manifest = {};
  const oldPaths = new Set(Object.keys(oldManifest));
  const md = { uploaded: 0, unchanged: 0, deleted: 0 };
  const books = { uploaded: 0, unchanged: 0, deleted: 0 };

  // Sync markdown files
  for (const filePath of mdFiles) {
    const relativePath = path.relative(CONTENT_DIR, filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const contentType = contentTypeFromPath(filePath);
    const slug = path.basename(filePath, ".md");

    const pageUrl = `/${contentType}/${slug}`;
    const { data: fm } = matter(content);
    const authors = Array.isArray(fm.authors) && fm.authors.length
      ? ` [Authors: ${fm.authors.join(", ")}]`
      : "";
    const enrichedContent = `[Content Type: ${contentType}] [Slug: ${slug}] [Page URL: ${pageUrl}]${authors}\n\n${content}`;

    const result = await syncFile(
      client, vectorStoreId,
      `md:${relativePath}`,
      `${contentType}--${slug}.md`,
      enrichedContent, "text/markdown",
      oldManifest, newManifest, oldPaths,
    );
    result === "uploaded" ? md.uploaded++ : md.unchanged++;
  }

  // Sync greenpill PDFs — upload PDF + a metadata companion so the bot knows what it is
  for (const filePath of greenpillPdfs) {
    const fileName = path.basename(filePath);
    const baseName = path.basename(filePath, ".pdf");
    const content = fs.readFileSync(filePath);

    // PDF binary
    const r1 = await syncFile(
      client, vectorStoreId,
      `greenpill:${fileName}`,
      `greenpill--${fileName}`,
      content, "application/pdf",
      oldManifest, newManifest, oldPaths,
    );
    r1 === "uploaded" ? books.uploaded++ : books.unchanged++;

    // Metadata companion so the bot can identify and describe the book
    const meta = `[Content Type: greenpill-books] [Slug: ${baseName}] [Book: ${baseName}]\n\nThis is a book from the Greenpill library. File: greenpill--${fileName}. The Greenpill series covers regenerative finance, public goods, and web3 ecosystem building.`;
    const r2 = await syncFile(
      client, vectorStoreId,
      `greenpill-meta:${baseName}`,
      `greenpill--${baseName}--meta.md`,
      meta, "text/markdown",
      oldManifest, newManifest, oldPaths,
    );
    r2 === "uploaded" ? books.uploaded++ : books.unchanged++;
  }

  // Sync research PDFs — upload PDF + metadata companion derived from the markdown file
  for (const filePath of researchPdfs) {
    const slug = path.basename(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath);

    // PDF binary
    const r1 = await syncFile(
      client, vectorStoreId,
      `research-pdf:${slug}/${fileName}`,
      `research--${slug}--${fileName}`,
      content, "application/pdf",
      oldManifest, newManifest, oldPaths,
    );
    r1 === "uploaded" ? books.uploaded++ : books.unchanged++;

    // Metadata companion — read ctaUrl and name from the corresponding markdown file
    const mdPath = path.join(CONTENT_DIR, "research", `${slug}.md`);
    if (fs.existsSync(mdPath)) {
      const mdContent = fs.readFileSync(mdPath, "utf8");
      const nameMatch = mdContent.match(/^name:\s*["']?(.+?)["']?\s*$/m);
      const ctaMatch = mdContent.match(/^ctaUrl:\s*["']?(.+?)["']?\s*$/m);
      const name = nameMatch?.[1] ?? slug;
      const ctaUrl = ctaMatch?.[1] ?? `/content-images/research/${slug}/${fileName}`;

      const meta = `[Content Type: research] [Slug: ${slug}] [Page URL: /research/${slug}] [CTA URL: ${ctaUrl}]\n\nThis is the full book content for "${name}". Read it at: ${ctaUrl}. More information at: /research/${slug}.`;
      const r2 = await syncFile(
        client, vectorStoreId,
        `research-pdf-meta:${slug}`,
        `research--${slug}--meta.md`,
        meta, "text/markdown",
        oldManifest, newManifest, oldPaths,
      );
      r2 === "uploaded" ? books.uploaded++ : books.unchanged++;
    }
  }

  // Delete files that no longer exist locally
  for (const removedPath of oldPaths) {
    const entry = oldManifest[removedPath];
    try {
      await client.vectorStores.files.delete(entry.fileId, { vector_store_id: vectorStoreId });
      await client.files.delete(entry.fileId);
    } catch {
      // Already gone
    }
    if (removedPath.startsWith("md:")) {
      md.deleted++;
    } else {
      books.deleted++;
    }
    console.log(`  ✕ ${removedPath} (removed)`);
  }

  saveManifest(newManifest);

  console.log(`\nDone.`);
  console.log(`  Markdown  — Uploaded: ${md.uploaded}, Unchanged: ${md.unchanged}, Deleted: ${md.deleted}`);
  console.log(`  Books     — Uploaded: ${books.uploaded}, Unchanged: ${books.unchanged}, Deleted: ${books.deleted}`);
  console.log(`Vector store: ${vectorStoreId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
