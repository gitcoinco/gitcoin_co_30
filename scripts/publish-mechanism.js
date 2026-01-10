#!/usr/bin/env node

/**
 * Publish a mechanism from a GitHub issue
 * This is a thin wrapper around the generic publish-content.js
 *
 * Usage: node scripts/publish-mechanism.js <issue-number>
 */

const { publishContent } = require('./publish-content');

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-mechanism.js <issue-number>');
  process.exit(1);
}

// You can add custom parsing/formatting logic here if needed for mechanisms
const customOptions = {
  // parseCustomFields: (issueBody) => {
  //   // Parse mechanism-specific fields
  //   return {};
  // },
  // addCustomFrontmatter: (customData, metadata) => {
  //   // Add mechanism-specific frontmatter
  //   return '';
  // }
};

publishContent('mechanism', issueNumber, customOptions).catch(console.error);
