import { publishContent } from "./publish-content";
import type { IssueMetadata } from "../src/lib/parse-issue";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-campaign.ts <issue-number>");
  process.exit(1);
}

publishContent("campaign", issueNumber, {
  addCustomFrontmatter: (_customData, metadata) => {
    const m = metadata as unknown as IssueMetadata;
    const lines: string[] = [];
    if (m.externalUrl) lines.push(`externalUrl: '${m.externalUrl}'`);
    if (m.matchingPoolUsd)
      lines.push(`matchingPoolUsd: '${m.matchingPoolUsd}'`);
    if (m.projectsCount) lines.push(`projectsCount: '${m.projectsCount}'`);
    if (m.startDate) lines.push(`startDate: '${m.startDate}'`);
    if (m.endDate) lines.push(`endDate: '${m.endDate}'`);
    return lines.join("\n");
  },
}).catch(console.error);
