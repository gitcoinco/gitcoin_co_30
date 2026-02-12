import { publishContent } from "./publish-content";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-app.ts <issue-number>");
  process.exit(1);
}

publishContent("app", issueNumber).catch(console.error);
