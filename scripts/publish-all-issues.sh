#!/bin/sh
# Publish all open GitHub issues to markdown content files.
# Usage: bash scripts/publish-all-issues.sh

REPO="gitcoinco/gitcoin_co_30"

curl -s "https://api.github.com/repos/$REPO/issues?state=open&per_page=50" | \
  npx tsx -e "
    const issues = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
    for (const { number, title } of issues) {
      const match = title.match(/^\[(Mechanism|App|Campaign|Case Study|Research)\]/i);
      if (!match) { console.error('⚠️  Skipping #' + number + ': ' + title); continue; }
      const type = match[1].toLowerCase().replace(' ', '-');
      console.log(number + '\t' + type);
    }
  " | while IFS=$'\t' read -r num type; do
  echo "Publishing #$num as $type..."
  npx tsx scripts/publish-$type.ts "$num"
done
