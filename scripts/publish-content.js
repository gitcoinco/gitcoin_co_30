#!/usr/bin/env node

/**
 * Generic content publishing function
 * Used by all content type-specific publish scripts
 */

const fs = require('fs');
const path = require('path');
const {
  parseMetadata,
  parseSection,
  parseList,
  processImages
} = require('./shared-utils');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = 'gitcoinco/gitcoin_co_30';

// Content type configuration
const CONTENT_TYPES = {
  mechanism: {
    label: 'Mechanism',
    emoji: '⚙️',
    plural: 'mechanisms',
    folder: 'mechanisms'
  },
  app: {
    label: 'App',
    emoji: '📱',
    plural: 'apps',
    folder: 'apps'
  },
  research: {
    label: 'Research',
    emoji: '📊',
    plural: 'research',
    folder: 'research'
  },
  'case-study': {
    label: 'Case Study',
    emoji: '📚',
    plural: 'case-studies',
    folder: 'case-studies'
  },
  campaign: {
    label: 'Campaign',
    emoji: '📢',
    plural: 'campaigns',
    folder: 'campaigns'
  }
};

async function fetchIssue(issueNumber) {
  const url = `https://api.github.com/repos/${REPO}/issues/${issueNumber}`;

  const response = await fetch(url, {
    headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}
  });

  return response.json();
}

/**
 * Generic publish function for any content type
 * @param {string} contentType - Type of content (mechanism, app, research, case-study, campaign)
 * @param {number} issueNumber - GitHub issue number
 * @param {object} customOptions - Optional custom parsing/formatting logic
 */
async function publishContent(contentType, issueNumber, customOptions = {}) {
  const config = CONTENT_TYPES[contentType];

  if (!config) {
    throw new Error(`Unknown content type: ${contentType}. Valid types: ${Object.keys(CONTENT_TYPES).join(', ')}`);
  }

  console.log(`📥 Fetching issue #${issueNumber}...`);

  const issue = await fetchIssue(issueNumber);

  if (!issue.body) {
    console.error('❌ Issue has no content');
    return;
  }

  // Extract slug from title
  const titlePrefix = new RegExp(`^\\[${config.label}\\]\\s*`, 'i');
  const slug = issue.title
    .replace(titlePrefix, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  console.log(`${config.emoji} Creating ${contentType}: ${slug}`);

  // Parse structured data from issue body (standardized across all types)
  const metadata = parseMetadata(issue.body);
  const description = parseSection(issue.body, 'Description');
  const relatedMechanisms = parseList(issue.body, 'Related Mechanisms');
  const relatedApps = parseList(issue.body, 'Related Apps');
  const relatedCaseStudies = parseList(issue.body, 'Related Case Studies');
  const relatedResearch = parseList(issue.body, 'Related Research');
  const relatedCampaigns = parseList(issue.body, 'Related Campaigns');

  // Allow custom parsing for specific content types
  const customData = customOptions.parseCustomFields
    ? customOptions.parseCustomFields(issue.body)
    : {};

  // Create content directory
  const contentDir = path.join(process.cwd(), 'src', 'content', config.folder);
  fs.mkdirSync(contentDir, { recursive: true });

  // Process images (handles both banner and logo by section)
  const { banner, logo, updatedMarkdown } = await processImages(issue.body, description, slug, config.folder);

  // Format arrays for YAML
  const relatedMechanismsYaml = relatedMechanisms.length > 0
    ? relatedMechanisms.map(m => `  - ${m}`).join('\n')
    : '';

  const relatedAppsYaml = relatedApps.length > 0
    ? relatedApps.map(a => `  - ${a}`).join('\n')
    : '';

  const relatedCaseStudiesYaml = relatedCaseStudies.length > 0
    ? relatedCaseStudies.map(cs => `  - ${cs}`).join('\n')
    : '';

  const relatedResearchYaml = relatedResearch.length > 0
    ? relatedResearch.map(r => `  - ${r}`).join('\n')
    : '';

  const relatedCampaignsYaml = relatedCampaigns.length > 0
    ? relatedCampaigns.map(c => `  - ${c}`).join('\n')
    : '';

  const tagsYaml = metadata.tags && metadata.tags.length > 0
    ? metadata.tags.map(t => `  - ${t}`).join('\n')
    : '';

  // Build frontmatter (standard fields)
  let frontmatter = `---
id: '${Date.now()}'
slug: ${slug}
name: ${issue.title.replace(titlePrefix, '')}
shortDescription: ${metadata.shortDescription || ''}`;

  // Add optional image fields
  if (banner) frontmatter += `\nbanner: ${banner}`;
  if (logo) frontmatter += `\nlogo: ${logo}`;

  // Add standard fields
  frontmatter += `
tags:
${tagsYaml}
lastUpdated: '${new Date().toISOString().split('T')[0]}'
relatedMechanisms:
${relatedMechanismsYaml}
relatedApps:
${relatedAppsYaml}
relatedCaseStudies:
${relatedCaseStudiesYaml}
relatedResearch:
${relatedResearchYaml}
relatedCampaigns:
${relatedCampaignsYaml}`;

  // Allow custom frontmatter fields
  if (customOptions.addCustomFrontmatter) {
    const customFrontmatter = customOptions.addCustomFrontmatter(customData, metadata);
    if (customFrontmatter) {
      frontmatter += '\n' + customFrontmatter;
    }
  }

  frontmatter += '\n---';

  // Create complete markdown content
  const mdContent = `${frontmatter}

${updatedMarkdown.trim()}
`;

  const mdPath = path.join(contentDir, `${slug}.md`);
  fs.writeFileSync(mdPath, mdContent);

  console.log(`\n✅ Published!`);
  console.log(`   📄 ${mdPath}`);
  console.log(`\n👉 Next steps:`);
  console.log(`   1. Review and edit the generated file`);
  console.log(`   2. git add .`);
  console.log(`   3. git commit -m "Add ${contentType}: ${issue.title}"`);
  console.log(`   4. Close issue #${issueNumber} with "approved" label`);
}

module.exports = { publishContent, CONTENT_TYPES };

// CLI usage (if run directly)
if (require.main === module) {
  const contentType = process.argv[2];
  const issueNumber = process.argv[3];

  if (!contentType || !issueNumber) {
    console.error('Usage: node scripts/publish-content.js <content-type> <issue-number>');
    console.error(`Valid content types: ${Object.keys(CONTENT_TYPES).join(', ')}`);
    process.exit(1);
  }

  publishContent(contentType, issueNumber).catch(console.error);
}
