import { publishContent } from "./publish-content";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-mechanism.ts <issue-number>");
  process.exit(1);
}

publishContent("mechanism", issueNumber).catch(console.error);
