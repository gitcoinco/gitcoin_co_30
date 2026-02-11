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

const customOptions = {
  addCustomFrontmatter: (_customData, metadata) => {
    const lines = [];
    if (metadata.externalUrl) lines.push(`externalUrl: '${metadata.externalUrl}'`);
    if (metadata.matchingPoolUsd) lines.push(`matchingPoolUsd: '${metadata.matchingPoolUsd}'`);
    if (metadata.projectsCount) lines.push(`projectsCount: '${metadata.projectsCount}'`);
    if (metadata.startDate) lines.push(`startDate: '${metadata.startDate}'`);
    if (metadata.endDate) lines.push(`endDate: '${metadata.endDate}'`);
    return lines.join('\n');
  }
};

publishContent('campaign', issueNumber, customOptions).catch(console.error);
