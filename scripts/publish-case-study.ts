import { publishContent } from "./publish-content";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error(
    "Usage: npx tsx scripts/publish-case-study.ts <issue-number>",
  );
  process.exit(1);
}

publishContent("case-study", issueNumber).catch(console.error);
