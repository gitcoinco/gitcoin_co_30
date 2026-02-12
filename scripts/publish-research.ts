import { publishContent } from "./publish-content";
import type { IssueMetadata } from "../src/lib/parse-issue";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-research.ts <issue-number>");
  process.exit(1);
}

publishContent("research", issueNumber, {
  addCustomFrontmatter: (_customData, metadata) => {
    const m = metadata as unknown as IssueMetadata;
    if (m.sensemakingFor) {
      return `sensemakingFor: ${m.sensemakingFor}`;
    }
    return "";
  },
}).catch(console.error);
