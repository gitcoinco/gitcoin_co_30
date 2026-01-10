# Scripts Documentation

This directory contains scripts for managing content submissions via GitHub issues.

## Overview

The content submission system has two main parts:

1. **GitHub Issue Templates** - Standardized forms for users to submit content
2. **Publish Scripts** - Automated scripts to convert GitHub issues into markdown content

## Architecture

### GitHub Issue Templates

All templates are **generated** from shared components to maintain consistency and reduce duplication.

**Generated Templates:**
- `.github/ISSUE_TEMPLATE/mechanism.md`
- `.github/ISSUE_TEMPLATE/app.md`
- `.github/ISSUE_TEMPLATE/research.md`
- `.github/ISSUE_TEMPLATE/case-study.md`
- `.github/ISSUE_TEMPLATE/campaign.md`

**DO NOT edit these templates directly!** They will be overwritten when you regenerate them.

### Publish Scripts

All publish scripts use a **shared generic function** to avoid code duplication.

**Architecture:**
```
publish-content.js (generic logic)
    ↑
    ├─ publish-mechanism.js (thin wrapper)
    ├─ publish-app.js (thin wrapper)
    ├─ publish-research.js (thin wrapper)
    ├─ publish-case-study.js (thin wrapper)
    └─ publish-campaign.js (thin wrapper)
```

**Supporting Files:**
- `shared-utils.js` - Common parsing and image processing utilities

## How to Update Templates

### Update All Templates (Common Sections)

To update sections that appear in **all** templates (e.g., metadata, banner image, related sections):

1. Edit `scripts/generate-issue-templates.js`
2. Find the `SHARED_SECTIONS` object
3. Modify the section you want to change
4. Run: `node scripts/generate-issue-templates.js`

**Example:** Changing the metadata section for all templates:

```javascript
const SHARED_SECTIONS = {
  metadata: `## Metadata

- **Short Description**: (One-line description)
- **Tags**: (comma-separated tags)
- **New Field**: (some new field)  // ← Add this
`,
  // ...
};
```

### Update Individual Templates

To update sections specific to **one** content type:

1. Edit `scripts/generate-issue-templates.js`
2. Find the `CONTENT_TYPES` object
3. Find the specific content type (e.g., `mechanism`, `app`)
4. Modify its `description` or other properties
5. Run: `node scripts/generate-issue-templates.js mechanism` (or the specific type)

**Example:** Updating only the mechanism template:

```javascript
const CONTENT_TYPES = {
  mechanism: {
    name: 'Mechanism Submission',
    about: 'Submit a new funding mechanism to the directory',
    title: '[Mechanism] Add your mechanism name here',
    labels: ['content', 'mechanism'],

    description: `## Description
<!--
Add your custom instructions here
-->

`
  },
  // ...
};
```

### Regenerate Templates

After editing `generate-issue-templates.js`:

```bash
# Regenerate all templates
node scripts/generate-issue-templates.js

# Regenerate only one template
node scripts/generate-issue-templates.js mechanism
```

## How to Update Publish Scripts

### Update All Publish Scripts (Common Logic)

To update logic that applies to **all** content types:

1. Edit `scripts/publish-content.js`
2. Modify the `publishContent()` function
3. No need to touch individual publish scripts!

**Example:** Adding a new standard field to all frontmatter:

```javascript
async function publishContent(contentType, issueNumber, customOptions = {}) {
  // ... existing code ...

  // Build frontmatter
  let frontmatter = `---
id: '${Date.now()}'
slug: ${slug}
name: ${issue.title.replace(titlePrefix, '')}
shortDescription: ${metadata.shortDescription || ''}
newField: someValue  // ← Add this
`;

  // ... rest of code ...
}
```

### Update Individual Publish Scripts (Custom Logic)

To add custom parsing or frontmatter for **one** content type:

1. Edit the specific publish script (e.g., `scripts/publish-mechanism.js`)
2. Modify the `customOptions` object
3. Add custom parsing or frontmatter logic

**Example:** Adding custom fields for mechanisms only:

```javascript
// In publish-mechanism.js
const customOptions = {
  parseCustomFields: (issueBody) => {
    // Parse mechanism-specific fields
    const category = issueBody.match(/Category:\s*(.+)/)?.[1];
    return { category };
  },
  addCustomFrontmatter: (customData, metadata) => {
    // Add mechanism-specific frontmatter
    return `category: ${customData.category || 'allocation'}`;
  }
};

publishContent('mechanism', issueNumber, customOptions).catch(console.error);
```

## Usage

### Publishing Content from GitHub Issues

```bash
# Publish a mechanism
node scripts/publish-mechanism.js 123

# Publish an app
node scripts/publish-app.js 456

# Publish research
node scripts/publish-research.js 789

# Publish a case study
node scripts/publish-case-study.js 101

# Publish a campaign
node scripts/publish-campaign.js 112

# Or use the generic script directly
node scripts/publish-content.js mechanism 123
```

### What the Scripts Do

1. Fetch the GitHub issue
2. Parse metadata (short description, tags)
3. Parse the description section
4. Parse related mechanisms and apps lists
5. Download and process images (banner and logo)
6. Generate markdown file with frontmatter
7. Save to `src/content/<type>/<slug>.md`

### Image Handling

The scripts automatically handle both **banner** and **logo** images by parsing them from specific sections:

- **Banner images**: Parsed from the `## Banner Image` section (optional)
  - Wide format (16:9 or 2:1 aspect ratio recommended)
  - Saved to `/public/images/<type>/<slug>/`
  - Referenced in frontmatter as `banner` field

- **Logo images**: Parsed from the `## Logo` section (optional)
  - Square format (1:1 aspect ratio recommended)
  - Saved to `/public/logos/`
  - Referenced in frontmatter as `logo` field

- **Additional images**: Parsed from the `## Description` section
  - Embedded in the content
  - Saved to `/public/images/<type>/<slug>/`
  - Paths automatically updated in the generated markdown

Both banner and logo are optional. You can have:
- Only a banner
- Only a logo
- Both banner and logo
- Neither (no images)

Images are automatically downloaded from the GitHub issue and optimized.

## File Structure

```
scripts/
├── README.md                      # This file
├── shared-utils.js                # Common utilities
├── publish-content.js             # Generic publish function
├── publish-mechanism.js           # Mechanism-specific wrapper
├── publish-app.js                 # App-specific wrapper
├── publish-research.js            # Research-specific wrapper
├── publish-case-study.js          # Case study-specific wrapper
├── publish-campaign.js            # Campaign-specific wrapper
└── generate-issue-templates.js    # Template generator

.github/ISSUE_TEMPLATE/
├── mechanism.md                   # Generated template
├── app.md                         # Generated template
├── research.md                    # Generated template
├── case-study.md                  # Generated template
└── campaign.md                    # Generated template
```

## Benefits of This Architecture

1. **DRY (Don't Repeat Yourself)**
   - Shared template sections defined once
   - Shared publish logic defined once
   - Easy to maintain consistency

2. **Flexible**
   - Can update all templates at once
   - Can update individual templates
   - Can customize individual publish scripts

3. **Scalable**
   - Easy to add new content types
   - Easy to add new fields globally or per-type
   - Easy to modify parsing logic

4. **Maintainable**
   - Clear separation of concerns
   - Well-documented
   - Single source of truth for common logic

## Adding a New Content Type

To add a new content type (e.g., "tutorial"):

1. **Add to template generator:**
   ```javascript
   // In generate-issue-templates.js
   const CONTENT_TYPES = {
     // ... existing types ...
     tutorial: {
       name: 'Tutorial Submission',
       about: 'Submit a tutorial',
       title: '[Tutorial] Add your tutorial title here',
       labels: ['content', 'tutorial'],
       description: `## Description\n<!-- Tutorial content -->\n`
     }
   };
   ```

2. **Add to publish script config:**
   ```javascript
   // In publish-content.js
   const CONTENT_TYPES = {
     // ... existing types ...
     tutorial: {
       label: 'Tutorial',
       emoji: '📖',
       plural: 'tutorials',
       folder: 'tutorials'
     }
   };
   ```

3. **Create publish script:**
   ```javascript
   // Create scripts/publish-tutorial.js
   #!/usr/bin/env node
   const { publishContent } = require('./publish-content');
   const issueNumber = process.argv[2];

   if (!issueNumber) {
     console.error('Usage: node scripts/publish-tutorial.js <issue-number>');
     process.exit(1);
   }

   publishContent('tutorial', issueNumber).catch(console.error);
   ```

4. **Generate template:**
   ```bash
   node scripts/generate-issue-templates.js tutorial
   ```

That's it! You now have a fully functional new content type.
