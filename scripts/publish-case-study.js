#!/usr/bin/env node

/**
 * Publish a case study from a GitHub issue
 * This is a thin wrapper around the generic publish-content.js
 *
 * Usage: node scripts/publish-case-study.js <issue-number>
 */

const { publishContent } = require('./publish-content');

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-case-study.js <issue-number>');
  process.exit(1);
}

// You can add custom parsing/formatting logic here if needed for case studies
const customOptions = {
  // parseCustomFields: (issueBody) => {
  //   // Parse case-study-specific fields
  //   return {};
  // },
  // addCustomFrontmatter: (customData, metadata) => {
  //   // Add case-study-specific frontmatter
  //   return '';
  // }
};

publishContent('case-study', issueNumber, customOptions).catch(console.error);
