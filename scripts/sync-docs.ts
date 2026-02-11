/**
 * Sync content markdown files to an OpenAI vector store for RAG-based chat.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... OPENAI_VECTOR_STORE_ID=vs_... npx tsx scripts/sync-docs.ts
 *
 * If OPENAI_VECTOR_STORE_ID is not set, a new vector store will be created
 * and its ID will be printed so you can add it to your .env.local.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { glob } from "node:fs/promises";
import OpenAI from "openai";

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");
const MANIFEST_PATH = path.resolve(process.cwd(), "scripts/.vector-manifest.json");
const VECTOR_STORE_NAME = "gitcoin-funding-directory";

interface ManifestEntry {
  fileId: string;
  hash: string;
}

type Manifest = Record<string, ManifestEntry>;

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

  // Collect all markdown files
  const mdFiles: string[] = [];
  for await (const entry of glob(path.join(CONTENT_DIR, "**/*.md"))) {
    mdFiles.push(entry);
  }
  mdFiles.sort();
  console.log(`Found ${mdFiles.length} markdown files.\n`);

  const oldManifest = loadManifest();
  const newManifest: Manifest = {};
  const oldPaths = new Set(Object.keys(oldManifest));

  let uploaded = 0;
  let unchanged = 0;
  let deleted = 0;

  for (const filePath of mdFiles) {
    const relativePath = path.relative(CONTENT_DIR, filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const contentType = contentTypeFromPath(filePath);
    const slug = path.basename(filePath, ".md");

    // Prepend metadata header for better retrieval context
    const pageUrl = `/${contentType}/${slug}`;
    const enrichedContent = `[Content Type: ${contentType}] [Slug: ${slug}] [Page URL: ${pageUrl}]\n\n${content}`;
    const hash = sha256(enrichedContent);

    oldPaths.delete(relativePath);

    // Check if unchanged
    const existing = oldManifest[relativePath];
    if (existing && existing.hash === hash) {
      newManifest[relativePath] = existing;
      unchanged++;
      continue;
    }

    // If changed, delete old file first
    if (existing) {
      try {
        await client.vectorStores.files.delete(existing.fileId, { vector_store_id: vectorStoreId });
        await client.files.delete(existing.fileId);
      } catch {
        // File may already be deleted, continue
      }
    }

    // Upload new file
    const fileName = `${contentType}--${slug}.md`;
    const file = await client.files.create({
      file: new File([enrichedContent], fileName, { type: "text/markdown" }),
      purpose: "assistants",
    });

    await client.vectorStores.files.create(vectorStoreId, {
      file_id: file.id,
    });

    newManifest[relativePath] = { fileId: file.id, hash };
    uploaded++;
    console.log(`  ↑ ${relativePath}`);
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
    deleted++;
    console.log(`  ✕ ${removedPath} (removed)`);
  }

  saveManifest(newManifest);

  console.log(`\nDone. Uploaded: ${uploaded}, Unchanged: ${unchanged}, Deleted: ${deleted}`);
  console.log(`Vector store: ${vectorStoreId}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
