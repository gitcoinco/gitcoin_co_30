#!/usr/bin/env node

/**
 * Publish a campaign from a GitHub issue
 * This is a thin wrapper around the generic publish-content.js
 *
 * Usage: node scripts/publish-campaign.js <issue-number>
 */

const { publishContent } = require('./publish-content');

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('Usage: node scripts/publish-campaign.js <issue-number>');
  process.exit(1);
}

// You can add custom parsing/formatting logic here if needed for campaigns
const customOptions = {
  // parseCustomFields: (issueBody) => {
  //   // Parse campaign-specific fields
  //   return {};
  // },
  // addCustomFrontmatter: (customData, metadata) => {
  //   // Add campaign-specific frontmatter
  //   return '';
  // }
};

publishContent('campaign', issueNumber, customOptions).catch(console.error);
