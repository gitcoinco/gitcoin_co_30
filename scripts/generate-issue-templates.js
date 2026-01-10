#!/usr/bin/env node

/**
 * Generate GitHub issue templates from shared components
 *
 * This allows us to:
 * 1. Update all templates at once by modifying shared sections
 * 2. Update individual templates by modifying type-specific sections
 * 3. Keep templates DRY and consistent
 *
 * Usage: node scripts/generate-issue-templates.js [content-type]
 *
 * Examples:
 *   node scripts/generate-issue-templates.js          # Generate all templates
 *   node scripts/generate-issue-templates.js mechanism # Generate only mechanism template
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// SHARED TEMPLATE SECTIONS (edit these to update all templates)
// ============================================================================

const SHARED_SECTIONS = {
  metadata: `## Metadata

- **Short Description**: (One-line description)
- **Tags**: (comma-separated tags)`,

  bannerImage: `## Banner Image
<!--
OPTIONAL: Add a banner image - it will be displayed at the top of the page.
Recommended dimensions: 1600x900 pixels (16:9 aspect ratio) or 1200x600 pixels (2:1 aspect ratio)
Formats: PNG, JPG, or WebP
-->

`,

  logo: `## Logo
<!--
OPTIONAL: Add a logo image.
Recommended dimensions: Square (e.g., 256x256 pixels)
Formats: SVG, PNG preferred
-->

`,

  relatedMechanisms: `## Related Mechanisms
<!-- Related mechanisms (use slugs like "quadratic-funding", "direct-grants") -->
-
-`,

  relatedApps: `## Related Apps
<!-- Related apps (use slugs like "gitcoin-grants-stack", "allo-protocol") -->
-
-`,

  divider: `
---`,

  footer: (contentType) => `
## Submission Checklist
<!-- Check all boxes before submitting -->
- [ ] Short description is clear and concise
- [ ] Tags are provided
- [ ] Description is comprehensive
- [ ] Related mechanisms/apps are listed (if applicable)
`
};

// ============================================================================
// CONTENT-TYPE SPECIFIC SECTIONS (edit these to update individual templates)
// ============================================================================

const CONTENT_TYPES = {
  mechanism: {
    name: 'Mechanism Submission',
    about: 'Submit a new funding mechanism to the directory',
    title: '[Mechanism] Add your mechanism name here',
    labels: ['content', 'mechanism'],

    description: `## Description
<!--
Full description of the mechanism (use markdown formatting).
Include sections for:
- How it works (step-by-step explanation)
- Advantages (benefits of this mechanism)
- Limitations (challenges or limitations)
- Best used for (what types of projects or situations)
- Examples and use cases
-->

`
  },

  app: {
    name: 'App Submission',
    about: 'Submit a new app, platform, or funding tool to the directory',
    title: '[App] Add your app name here',
    labels: ['content', 'app'],

    description: `## Description
<!--
Full description of what this app does, its features, and use cases (use markdown formatting).
You can include details like:
- **Category**: Platform | DAO | Grant Program | Fund | Primitive
- **Status**: Active | Deprecated | Upcoming
- **Website**: URL
- **Launch Date**: YYYY-MM-DD
- **Funding Volume**: e.g., $10M distributed
- **Blockchains**: Ethereum, Optimism, Arbitrum, etc.
- **Social Links**: Twitter, Discord, GitHub
-->

`
  },

  research: {
    name: 'Research Submission',
    about: 'Submit research, analysis, or data about public goods funding',
    title: '[Research] Add your research title here',
    labels: ['content', 'research'],

    description: `## Description
<!--
The complete research content (use markdown formatting).
Include key findings and main insights.
You can include details like:
- **Type**: Analysis | Report | Trend | Opinion | Data
- **Authors**: @username1, @username2
- **Sources**: Links to data sources, citations
-->

`
  },

  'case-study': {
    name: 'Case Study Submission',
    about: 'Submit a new case study about a funding mechanism or program',
    title: '[Case Study] Add your case study title here',
    labels: ['content', 'case-study'],

    description: `## Description
<!--
Full description of the case study (use markdown formatting).
Include sections for:
- Background (context: what problem was being solved? when did this take place?)
- The Mechanism/Program (how the funding mechanism worked)
- Outcomes (measurable outcomes with metrics)
- Lessons Learned (key takeaways)

You can include details like:
- **Project Name**: The actual project/program name
- **Platform Used**: gitcoin-grants-stack, allo-protocol, etc.
- **Mechanism Type**: quadratic-funding, direct-grants, retroactive-funding
- **Funding Amount**: e.g., $500,000 or 100M ARB
- **Funding Date**: YYYY-MM-DD
- **Status**: Success | Partial | Failed | Ongoing
- **Sources**: Links to data, reports, or additional resources
-->

`
  },

  campaign: {
    name: 'Campaign Submission',
    about: 'Submit an active, upcoming, or completed funding campaign',
    title: '[Campaign] Add your campaign name here',
    labels: ['content', 'campaign'],

    description: `## Description
<!--
Full description of the campaign (use markdown formatting).

You can include details like:
- **Status**: Upcoming | Active | Completed
- **Start Date**: YYYY-MM-DD
- **End Date**: YYYY-MM-DD
- **Organizer**: Who is running this campaign?
- **Mechanism**: quadratic-funding, direct-grants, etc.
- **Funding Pool**: e.g., $500,000
- **Matching Pool**: e.g., $100,000 (if applicable)
- **Application URL**: Link to apply
- **Is Featured**: true | false
- **Eligibility**: Who can participate? What are the requirements?
- **Results** (For Completed Campaigns):
  - Projects Funded
  - Total Distributed
  - Unique Donors
  - Highlights
-->

`
  }
};

// ============================================================================
// TEMPLATE GENERATION LOGIC
// ============================================================================

function generateTemplate(contentType) {
  const config = CONTENT_TYPES[contentType];

  if (!config) {
    throw new Error(`Unknown content type: ${contentType}`);
  }

  // Build frontmatter
  const frontmatter = `---
name: ${config.name}
about: ${config.about}
title: '${config.title}'
labels: ${JSON.stringify(config.labels)}
assignees: ''
---

<!--
This template will be automatically converted to a markdown file.
Fill in all sections below. You can use markdown formatting and add images.
-->
`;

  // Build template sections in order
  const sections = [
    frontmatter,
    SHARED_SECTIONS.metadata,
    '\n',
    SHARED_SECTIONS.bannerImage,
    SHARED_SECTIONS.logo,
    config.description,
    SHARED_SECTIONS.relatedMechanisms,
    '\n',
    SHARED_SECTIONS.relatedApps,
    SHARED_SECTIONS.divider,
    SHARED_SECTIONS.footer(contentType)
  ];

  return sections.join('\n');
}

function saveTemplate(contentType, content) {
  const templateDir = path.join(process.cwd(), '.github', 'ISSUE_TEMPLATE');
  fs.mkdirSync(templateDir, { recursive: true });

  const filename = `${contentType}.md`;
  const filepath = path.join(templateDir, filename);

  fs.writeFileSync(filepath, content);
  console.log(`✓ Generated ${filename}`);
}

function generateAll() {
  console.log('📝 Generating GitHub issue templates...\n');

  const types = Object.keys(CONTENT_TYPES);
  types.forEach(type => {
    const content = generateTemplate(type);
    saveTemplate(type, content);
  });

  console.log(`\n✅ Generated ${types.length} templates`);
  console.log('\n💡 To update templates:');
  console.log('   - Edit shared sections in this script to update all templates');
  console.log('   - Edit content-type sections to update individual templates');
  console.log('   - Run: node scripts/generate-issue-templates.js');
}

// ============================================================================
// CLI
// ============================================================================

const targetType = process.argv[2];

if (targetType) {
  // Generate specific template
  if (!CONTENT_TYPES[targetType]) {
    console.error(`❌ Unknown content type: ${targetType}`);
    console.error(`Valid types: ${Object.keys(CONTENT_TYPES).join(', ')}`);
    process.exit(1);
  }

  console.log(`📝 Generating ${targetType} template...\n`);
  const content = generateTemplate(targetType);
  saveTemplate(targetType, content);
  console.log(`\n✅ Generated ${targetType} template`);
} else {
  // Generate all templates
  generateAll();
}
