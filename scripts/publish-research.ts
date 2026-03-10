import fs from "node:fs";
import path from "node:path";
import { publishContent } from "./publish-content";
import { downloadPdf, extractPdfUrl } from "./shared-utils";
import type { IssueMetadata } from "../src/lib/parse-issue";
import { RESEARCH_TYPES } from "../src/lib/types";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-research.ts <issue-number>");
  process.exit(1);
}

publishContent("research", issueNumber, {
  parseCustomFields: (issueBody) => ({
    pdfUrl: extractPdfUrl(issueBody),
  }),

  addCustomFrontmatter: async (customData, metadata, slug) => {
    const m = metadata as unknown as IssueMetadata;
    const lines: string[] = [];

    if (m.sensemakingFor) lines.push(`sensemakingFor: "${m.sensemakingFor}"`);

    if (m.researchType) {
      const normalized = m.researchType as string;
      if (RESEARCH_TYPES.includes(normalized as any)) {
        lines.push(`researchType: ${normalized}`);
      } else {
        console.warn(`⚠ Unknown researchType "${normalized}" — omitted. Valid values: ${RESEARCH_TYPES.join(", ")}`);
      }
    }

    const pdfUrl = customData.pdfUrl as string;
    if (pdfUrl) {
      const imagesDir = path.join(process.cwd(), "public", "content-images", "research", slug);
      fs.mkdirSync(imagesDir, { recursive: true });
      const localPath = path.join(imagesDir, "book.pdf");
      console.log(`📄 Downloading PDF...`);
      await downloadPdf(pdfUrl, localPath);
      console.log(`  ✓ book.pdf (${(fs.statSync(localPath).size / 1024 / 1024).toFixed(1)} MB)`);
      lines.push(`ctaUrl: '/content-images/research/${slug}/book.pdf'`);
    } else if (m.ctaUrl) {
      lines.push(`ctaUrl: '${m.ctaUrl}'`);
    }

    return lines.join("\n");
  },
}).catch(console.error);
