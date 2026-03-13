# Gitcoin 30 - Public Goods Funding Directory

A comprehensive directory of funding mechanisms, apps, campaigns, research, and case studies for public goods funding in the Ethereum ecosystem.

## Adding Content

### Method 1: Via GitHub Issues (Recommended)

This is the easiest way to contribute. The content is automatically formatted and validated.

1. **Create a GitHub Issue** using one of the templates:
   - [Submit an App](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=app.yml)
   - [Submit a Mechanism](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=mechanism.yml)
   - [Submit Research](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=research.yml)
   - [Submit a Case Study](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=case-study.yml)
   - [Submit a Campaign](https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=campaign.yml)

2. **Fill out the form** — required fields are enforced by GitHub. Optional fields can be left blank.
   - **Banner Image**: go to [gitcoin.co/generator](https://gitcoin.co/generator) → press `R` to pick a pattern → `S` to save → drag the PNG into the Banner Image field. Required.
   - **Logo** (apps only): drag your white/inverted PNG logo into the Logo field.
   - **Description**: write full markdown content in the Description field.

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
│       └── banner.png          # Banner/cover image
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
- **Logo** (apps only): `public/content-images/apps/{slug}/logo.png` — reference as `logo: "/content-images/apps/{slug}/logo.png"` (white/negative version, PNG only)
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

**Validation**
- `npx tsx scripts/validate-content.ts` - Validate all committed content files (slug, required fields, image paths, enums)
- `npx tsx scripts/validate-content.ts src/content/research/my-file.md` - Validate a single file

**Other**
- `npm run sync-docs` - Sync content files from src/content to OpenAI vector store for AI chat


## Content Guidelines

### Images

**Banner Images (Required for issue submissions)**
- **Dimensions**: 1600×900px (16:9) or 1200×600px (2:1); 1800×600px (3:1) for sensemaking articles
- **Where to add**: Drag a PNG into the Banner Image field in the issue form
- **Format**: PNG or JPG only — SVG not supported (banners are used as OG images)
- **Generator**: [gitcoin.co/generator](https://gitcoin.co/generator) — set Aspect to Landscape, press `R` to pick a pattern, `S` to save

**Logo Images (Apps only, required)**
- **Dimensions**: 256×256px or 512×512px — must be square (1:1)
- **Style**: White/inverted version only — logos are displayed on dark backgrounds
- **Where to add**: Drag a PNG into the Logo field in the issue form
- **Format**: PNG only — SVG not supported

**Inline Images**
- Add in the Description field as standard markdown: `![Alt text](https://...)`
- All images are automatically downloaded and hosted locally on publish

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

**`featured`** (all content types, optional — **Gitcoin team only**)
- Set `featured: true` to feature an item on the homepage
- Featured apps and campaigns are displayed in their respective homepage sections
- Not expected from external contributors — the team sets this during publishing

**`sensemakingFor`** (research only, optional — **Gitcoin team only**)
- Marks a research article as a "sensemaking" piece for a specific category
- Valid values: `mechanisms`, `apps`, `campaigns`, `case-studies`, `research`
- Each category page displays its sensemaking article at the top in a dedicated section
- On the `/research` page, sensemaking articles also appear in the normal grid
- Banner images for sensemaking articles should use a wider 3:1 aspect ratio (e.g., 1800x600px)
- Not expected from external contributors — the team sets this during publishing


**`researchType`** (research only, optional)
- Must be one of: `Book`, `Report`, `Opinion`, `Analysis`, `Perspective`
- Validated by CI — other values will fail the PR check
- Enables filter tabs on the /research page

**`ctaUrl`** (research and campaigns, optional)
- URL for a CTA button shown on the research detail page; the button label is derived automatically from `researchType` (e.g. `Book` → "Read Book")
- For PDFs hosted in this repo: commit the file to `public/content-images/research/{slug}/book.pdf` via PR (team only) and set `ctaUrl: '/content-images/research/{slug}/book.pdf'`
- For external links: use a full `https://` URL