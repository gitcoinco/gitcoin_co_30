#!/usr/bin/env node

/**
 * Publish an app from a GitHub issue
 * This is a thin wrapper around the generic publish-content.js
 *
 * Usage: node scripts/publish-app.js <issue-number>
 */

const { publishContent } = require('./publish-content');

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-app.js <issue-number>');
  process.exit(1);
}

// You can add custom parsing/formatting logic here if needed for apps
const customOptions = {
  // parseCustomFields: (issueBody) => {
  //   // Parse app-specific fields
  //   return {};
  // },
  // addCustomFrontmatter: (customData, metadata) => {
  //   // Add app-specific frontmatter
  //   return '';
  // }
};

publishContent('app', issueNumber, customOptions).catch(console.error);
