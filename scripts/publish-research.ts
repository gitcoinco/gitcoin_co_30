import { publishContent } from "./publish-content";
import type { IssueMetadata } from "../src/lib/parse-issue";
import { RESEARCH_TYPES } from "../src/lib/types";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-research.ts <issue-number>");
  process.exit(1);
}

publishContent("research", issueNumber, {
  parseCustomFields: () => ({}),

  addCustomFrontmatter: async (_customData, metadata, _slug) => {
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

    if (m.ctaUrl) lines.push(`ctaUrl: '${m.ctaUrl}'`);

    return lines.join("\n");
  },
}).catch(console.error);
