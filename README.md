# Gitcoin 30 - Public Goods Funding Directory

A comprehensive directory of funding mechanisms, apps, campaigns, research, and case studies for public goods funding in the Ethereum ecosystem.

## Adding Content

### Method 1: Via GitHub Issues (Recommended)

This is the easiest way to contribute. The content is automatically formatted and validated.

1. **Create a GitHub Issue** using one of the templates:
   - [Submit an App](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=app.md)
   - [Submit a Mechanism](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=mechanism.md)
   - [Submit Research](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=research.md)
   - [Submit a Case Study](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=case-study.md)
   - [Submit a Campaign](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=campaign.md)

2. **Fill out the template** with your content
   - Add banner image under `## Banner Image` section (if applicable) - Use the [Chladni Particles generator](https://octaviaan.github.io/Chladni-Particles/). Press `R` to randomize, then click "Rebuild Particles" to apply.
   - Add logo image under `## Logo` section (if applicable)
   - Fill in all metadata fields
   - Write your content using markdown formatting

3. **Run the publish script** (requires repository access):
   ```bash
   # For apps
   npm run publish-app <issue-number>

   # For mechanisms
   npm run publish-mechanism <issue-number>

   # For research
   npm run publish-research <issue-number>

   # For case studies
   npm run publish-case-study <issue-number>

   # For campaigns
   npm run publish-campaign <issue-number>
   ```

4. **Review and commit** the generated files:
   ```bash
   git add .
   git commit -m "Add <content-type>: <title>"
   git push
   ```

### Method 2: Manual Creation

Create markdown files directly in the content directories.

**Directory Structure:**
```
src/content/
├── apps/           # App submissions
├── mechanisms/     # Funding mechanisms
├── research/       # Research articles
├── case-studies/   # Case studies
└── campaigns/      # Funding campaigns/rounds
```

**File Format:**
```markdown
---
# YAML frontmatter with metadata
title: "Your Title"
slug: "your-slug"
# ... other fields
---

Your content here in markdown format.
```

See existing files in each directory for the exact frontmatter schema required.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Scripts

- `npm run publish-app <issue-number>` - Create app from GitHub issue
- `npm run publish-mechanism <issue-number>` - Create mechanism from GitHub issue
- `npm run publish-research <issue-number>` - Create research from GitHub issue
- `npm run publish-case-study <issue-number>` - Create case study from GitHub issue
- `npm run publish-campaign <issue-number>` - Create campaign from GitHub issue
- `npm run publish-all` - Publish all open GitHub issues at once
- `npm run sync-docs` - Sync content files from src/content to OpenAI vector store for AI chat


## Content Guidelines

### Images

**Banner Images (Optional)**
- **Dimensions**: 1600x900px (16:9 aspect ratio) or 1200x600px (2:1 aspect ratio) recommended
- **Where to add**: Place under the `## Banner Image` section in the GitHub issue template
- **Format**: PNG or JPG only
- Used as the hero image at the top of content pages and for social media previews
- **Generator**: Use the [Chladni Particles generator](https://octaviaan.github.io/Chladni-Particles/) to create banner images. Export as square or landscape. Press `R` to randomize, then click "Rebuild Particles" to apply.

**Logo Images (Optional)**
- **Dimensions**: Square format recommended (e.g., 256x256px, 512x512px)
- **Aspect ratio**: 1:1 (square)
- **Where to add**: Place under the `## Logo` section in the GitHub issue template
- **Format**: PNG or JPG only
- Used for thumbnails, cards, and branding

**Additional Images**
- Can be added anywhere in the `## Description` section
- All images are automatically downloaded and optimized
- Image paths are automatically updated in the generated markdown

### Formatting
- Use markdown formatting in GitHub issues
- Supports standard markdown: headings, lists, links, code blocks

### Metadata / Frontmatter Fields
- Follow the enum values exactly (e.g., `analysis` not `'analysis'`)
- Use slugs for references (e.g., `quadratic-funding`, `gitcoin-grants-stack`)
- Dates in `YYYY-MM-DD` format

**`slug`** (all content types, optional)
- Override the auto-generated slug (which is derived from the issue title)
- Required when updating existing content to ensure the correct file is overwritten
- Example: `slug: quadratic-funding`

**`featured`** (all content types, optional)
- Set `featured: true` to feature an item on the homepage
- Featured apps and campaigns are displayed in their respective homepage sections

**`sensemakingFor`** (research only, optional)
- Marks a research article as a "sensemaking" piece for a specific category
- Valid values: `mechanisms`, `apps`, `campaigns`, `case-studies`, `research`
- Each category page displays its sensemaking article at the top in a dedicated section
- On the `/research` page, sensemaking articles also appear in the normal grid
- Banner images for sensemaking articles should use a wider 3:1 aspect ratio (e.g., 1800x600px)
- Example: `sensemakingFor: mechanisms`
