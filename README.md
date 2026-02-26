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
   - Add banner image under `## Banner Image` section (if applicable) - Use the [Chladni Particles generator](https://octaviaan.github.io/Chladni-Particles/). Press `R` to randomize.
   - Add logo image under `## Logo` section (if applicable)
   - Fill in all metadata fields
   - Write your content using markdown formatting

3. **Preview your submission** — a bot will comment on your issue with a preview link, or visit directly:
   ```
   https://gitcoin.co/preview?issue=<issue-number>&type=<content-type>
   ```

4. **Publishing** — a maintainer adds the `approved` label, which automatically creates a PR with your content. Alternatively, maintainers can publish manually:
   ```bash
   npm run publish-app <issue-number>
   npm run publish-mechanism <issue-number>
   npm run publish-research <issue-number>
   npm run publish-case-study <issue-number>
   npm run publish-campaign <issue-number>
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

**Images for Manual Contributions:**

Each content item has its own image folder at `public/content-images/{category}/{slug}/`:
```
public/content-images/
├── campaigns/
│   └── gg24-upcoming/
│       └── banner.svg          # Banner/cover image
├── case-studies/
│   └── protocol-guild-ecosystem-funding/
│       └── banner.png
├── research/
│   └── ethereum-public-goods-funding-sources-the-next-era/
│       ├── banner.png          # Banner image
│       ├── funding-sources.png # Inline image (named from alt text)
│       └── image-1.png         # Inline image (auto-numbered)
├── apps/
│   └── gitcoin-grants-stack/
│       ├── banner.png
│       └── logo.png            # Logo/icon (square format, white/negative version)
└── placeholder.png             # Fallback image
```

- **Banner**: `public/content-images/{category}/{slug}/banner.{ext}` — reference as `banner: "/content-images/{category}/{slug}/banner.png"`
- **Logo**: `public/content-images/{category}/{slug}/logo.png` — reference as `logo: "/content-images/{category}/{slug}/logo.png"` (white/negative version, PNG only)
- **Inline images**: Same folder, named from alt text or numbered — reference as `![Alt text](/content-images/{category}/{slug}/image-name.png)`
- Accepted formats: PNG, JPG (SVG not supported — banners and logos are used as OG images)

## Development

```bash
# Install dependencies
npm install

# One-time setup: install Playwright browser for banner generation
npx playwright install chromium

# Run development server
npm run dev

# Build for production
npm run build
```

## Scripts

**Publishing (from GitHub Issues)**
- `npm run publish-app <issue-number>` - Create app from GitHub issue
- `npm run publish-mechanism <issue-number>` - Create mechanism from GitHub issue
- `npm run publish-research <issue-number>` - Create research from GitHub issue
- `npm run publish-case-study <issue-number>` - Create case study from GitHub issue
- `npm run publish-campaign <issue-number>` - Create campaign from GitHub issue
- `npm run publish-all` - Publish all open GitHub issues at once

**Banner generation**
- `npm run banner:auto` - Generate banners for all content files missing one (automated, headless)
- `npm run banner:auto mechanisms` - Generate banners for one content type
- `npm run banner:auto mechanisms quadratic-funding` - Generate banner for a single item
- `npm run banner:pick <content-type> <slug>` - Open the Chladni generator interactively to pick a banner yourself

**Other**
- `npm run sync-docs` - Sync content files from src/content to OpenAI vector store for AI chat


## Content Guidelines

### Images

**Banner Images (Optional)**
- **Dimensions**: 1600x900px (16:9 aspect ratio) or 1200x600px (2:1 aspect ratio) recommended; 1800x600px (3:1) for sensemaking articles
- **Where to add**: Place under the `## Banner Image` section in the GitHub issue template
- **Format**: PNG or JPG only — SVG is not supported (banners are used as OG images)
- Used as the hero image at the top of content pages and for social media previews
- **Generator**: [Chladni Particles](https://octaviaan.github.io/Chladni-Particles/) — use `npm run banner:auto` to generate automatically, or `npm run banner:pick <type> <slug>` to pick one interactively

**Logo Images (Optional)**
- **Dimensions**: Square format recommended (e.g., 256x256px, 512x512px)
- **Aspect ratio**: 1:1 (square)
- **Where to add**: Place under the `## Logo` section in the GitHub issue template
- **Format**: PNG or JPG only — SVG is not supported (logos are used as OG images)
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
