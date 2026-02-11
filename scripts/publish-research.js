#!/usr/bin/env node

/**
 * Publish research from a GitHub issue
 * This is a thin wrapper around the generic publish-content.js
 *
 * Usage: node scripts/publish-research.js <issue-number>
 */

const { publishContent } = require('./publish-content');

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-research.js <issue-number>');
  process.exit(1);
}

const customOptions = {
  addCustomFrontmatter: (_customData, metadata) => {
    if (metadata.sensemakingFor) {
      return `sensemakingFor: ${metadata.sensemakingFor}`;
    }
    return '';
  }
};

publishContent('research', issueNumber, customOptions).catch(console.error);
