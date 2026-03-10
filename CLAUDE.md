# Gitcoin 30 — Instructions for Claude

## Standing Rules

### 1. Keep documentation in sync — always

Whenever frontmatter schemas, field names, valid enum values, or content conventions change, you **must** update **all four** in the same change:

1. **`CLAUDE.md`** — the authoritative schema reference (Frontmatter Schemas section below)
2. **`README.md`** — the public-facing Metadata / Frontmatter Fields section
3. **`.github/ISSUE_TEMPLATE/{type}.yml`** — the relevant issue template(s)
4. **`scripts/validate-content.ts`** — add/update the corresponding validation logic

Never update one without checking and updating the others.

### 2. Enum values live in `src/lib/types.ts` — single source of truth

`RESEARCH_TYPES` and `SENSEMAKING_CATEGORIES` are exported constants in `types.ts`. `parse-issue.ts`, `validate-content.ts`, and `content-validators.ts` import from there. Never duplicate these lists inline.

### 3. Clean code

- No dead code — remove hooks, props, or exports that nothing uses
- No duplication — if two places need the same constant, export it from one source
- Scripts stay consistent — publish scripts follow the same pattern: `parseCustomFields` captures data from the issue body, `addCustomFrontmatter` (async) processes and writes frontmatter fields including any file downloads

---

## Project Overview

A directory of public goods funding mechanisms, apps, campaigns, research, and case studies in the Ethereum ecosystem. Built with Next.js (App Router), React, Tailwind CSS v4, TypeScript.

## Content System

Markdown files live in `src/content/{apps,mechanisms,research,case-studies,campaigns}/`. Each file has YAML frontmatter followed by a markdown body.

### Directory Structure

```
src/content/
├── apps/           # Tools/platforms (Gitcoin Grants Stack, Juicebox, etc.)
├── mechanisms/     # Funding mechanisms (Quadratic Funding, Retroactive Funding, etc.)
├── research/       # Research articles and analysis
├── case-studies/   # Real-world case studies
└── campaigns/      # Funding rounds and campaigns
```

---

## Frontmatter Schemas

### Base fields (all content types)

```yaml
---
id: '1234567890'           # Unix timestamp string — use Date.now() when creating new files
slug: your-slug            # Kebab-case, must match the filename exactly
name: "Display Name"
shortDescription: "One-sentence description."
banner: /content-images/{category}/{slug}/banner.png   # Only if file exists — see Image Rules
tags:
  - tag-one
  - tag-two
lastUpdated: 'YYYY-MM-DD'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies:
  - some-case-study-slug
relatedResearch:
  - some-research-slug
relatedCampaigns:
  - some-campaign-slug
---
```

> All five `related*` fields are parsed from frontmatter and rendered as related content sections on detail pages.

### Apps — additional fields

```yaml
logo: /content-images/apps/{slug}/logo.png   # Only if file exists — see Image Rules
featured: true                               # Team only — set by Gitcoin team. Surfaces in featured section on /apps and homepage
```

Logo images for apps must be the **white/negative (inverted) version** of the app's logo. They are displayed on dark backgrounds — a full-colour logo will not render correctly.

### Research — additional fields

```yaml
sensemakingFor: mechanisms   # Team only — set by Gitcoin team. Marks this as the sensemaking article for a category page
                             # Valid values: mechanisms | apps | campaigns | case-studies | research
                             # Only one article per category should have this set
                             # Use a wider 3:1 banner (e.g. 1800×600px) for sensemaking articles

researchType: Report         # Optional — MUST be one of: Book | Report | Opinion | Analysis | Perspective
                             # Validated by CI. Do not use other values.

ctaUrl: '/content-images/research/{slug}/book.pdf'  # Optional — URL for a CTA button on the detail page
                                                     # For PDFs: named book.pdf by convention, stored at
                                                     #   public/content-images/research/{slug}/book.pdf
                                                     # When publishing via issue: drop the PDF in the PDF field of the issue form —
                                                     #   the script downloads it and writes the local path automatically
                                                     # For external links: use a full https:// URL
                                                     # Button label derived automatically: "Read {researchType}" (e.g. "Read Book")
```

### Campaigns — additional fields

```yaml
featured: true                    # Team only — set by Gitcoin team. Surfaces in featured section on /campaigns and homepage
ctaUrl: 'https://...'             # Link to the campaign/round
matchingPoolUsd: '$1.5M'          # Total matching pool as a display string
projectsCount: '265'              # Number of projects as a display string
startDate: 'YYYY-MM-DD'
endDate: 'YYYY-MM-DD'             # Leave as empty string '' for ongoing campaigns
```

### featured field (all content types) — team only

`featured: true` is set by the Gitcoin team only. What it does per type:
- **apps** → shown in featured section on `/apps` page and on the homepage
- **campaigns** → shown in featured section on `/campaigns` page and on the homepage
- **research** → shown in featured section on the homepage
- **mechanisms / case-studies** → loader supports it (featured items sort first) but no dedicated featured UI section exists yet

---

## Image Rules — Read Carefully

### Banners MUST be generated with the Chladni generator — no exceptions

**Do not use any other image as a banner.** Do not use screenshots, article preview images, external images, or images sourced from the original article as the `banner` field. The only accepted banner format is a PNG generated by the Chladni Particles generator (`npm run banner:auto` or `npm run banner:pick`).

If you have an image you want to include in the article body, embed it in the markdown content — it does not belong in the `banner` field.

### NEVER add banner/logo frontmatter without the actual file

Do **not** write `banner: /content-images/research/my-article/banner.png` in frontmatter unless `public/content-images/research/my-article/banner.png` actually exists in the repository. A missing path breaks the page and OG image generation. When in doubt, omit the field — the app shows a placeholder automatically.

### No SVGs for banner or logo

Banners and logos are used as OG (Open Graph) images for social media previews. **SVG files cannot be used as OG images.** Always use **PNG or JPG** for `banner` and `logo`.

- If you have an SVG source, convert it to PNG before saving it.
- Inline description images may use any format, but PNG/JPG preferred.

### Logo style

App logos must be the **white/negative (inverted) version** — they are rendered on dark backgrounds. A full-colour or dark logo will not be visible.

### Image locations

**Images MUST go under `public/content-images/`. Never place images inside `src/content/`.**

The banner file must be named exactly `banner.png` or `banner.jpg` — not `article-preview.png`, `hero.png`, or anything else. The frontmatter path must match the actual file path exactly.

```
public/content-images/
├── mechanisms/
│   └── quadratic-funding/
│       └── banner.jpg
├── apps/
│   └── gitcoin-grants-stack/
│       ├── banner.png
│       └── logo.png          # white/negative version, PNG only
├── research/
│   └── allo-protocol-ecosystem-analysis/
│       └── banner.png
├── case-studies/
│   └── some-case-study/
│       └── banner.png
├── campaigns/
│   └── gg24/
│       └── banner.png
└── placeholder.png           # fallback shown when no banner/logo is set
```

So for a research article with slug `my-article`, the only valid setup is:
- File on disk: `public/content-images/research/my-article/banner.png`
- Frontmatter: `banner: /content-images/research/my-article/banner.png`

If these don't match exactly, the page breaks.

### Image dimensions

| Field | Dimensions | Aspect ratio |
|-------|-----------|--------------|
| `banner` (standard) | 1600×900px or 1200×600px | 16:9 or 2:1 |
| `banner` (sensemaking article) | 1800×600px | 3:1 |
| `logo` | 256×256px or 512×512px | 1:1 square |
| `og-image` (override) | 1200×630px | ~1.91:1 |

### OG image — dynamic generation and override

Every content page gets a **dynamic OG image** generated at build time: the banner is used as background with a gradient overlay, the Gitcoin logo, read time, title, and a "Read Now" button overlaid on it.

To **override** the generated OG image with a custom static one (e.g. a specially designed card), drop a file here — no frontmatter change needed:

```
public/content-images/{type}/{slug}/og-image.png
public/content-images/{type}/{slug}/og-image.jpg
```

The generator checks for this file first and serves it as-is if found, skipping dynamic generation entirely.

### Banner image generator

Two workflows depending on the situation:

**Batch / automatic** — generates banners for all content files that are missing one, fully automated. Requires a one-time browser install (`npx playwright install chromium`).

```bash
npm run banner:auto                          # all content types
npm run banner:auto mechanisms               # one content type
npm run banner:auto mechanisms quadratic-funding  # single item
```

Finds every `.md` file without a `banner:` field, generates a banner using the real Chladni Particles generator headlessly, saves the PNG to the correct path, and updates the frontmatter automatically.

**Manual / interactive** — for when the user wants to pick the pattern themselves. Always fill in the content type and slug from the file you just created:

```bash
npm run banner:pick mechanisms quadratic-funding
npm run banner:pick research my-article-slug
npm run banner:pick apps my-app-slug
```

Opens the Chladni generator in the user's browser. They set Aspect to Landscape, press R until happy, press S to save — the terminal comes back into focus automatically, the script moves the file to the right path, and updates the frontmatter.

> When generating multiple articles, run `npm run banner:auto` after creating all the files — it handles everything in one pass.

---

## Adding Content

### Preferred workflow (via GitHub Issues)

The publish scripts handle image downloading, path writing, and file creation automatically. Use these when possible:

```bash
npm run publish-app <issue-number>
npm run publish-mechanism <issue-number>
npm run publish-research <issue-number>
npm run publish-case-study <issue-number>
npm run publish-campaign <issue-number>
```

### Manual creation (what Claude should do)

1. Create the file at `src/content/{category}/{slug}.md`
2. **Do not add `banner:` to the frontmatter — omit it entirely.** Banners are always generated by the Chladni generator; never use another image as a banner. Run `npm run banner:auto` after creating the file — it generates the banner and patches the frontmatter automatically.
3. **Download inline images from the source article.** If the original article contains embedded images (diagrams, charts, figures, screenshots), download each one and save it to `public/content-images/{category}/{slug}/` with a descriptive filename (e.g. `diagram-1.png`, `funding-flow.png`). Reference them in the markdown body as `![Alt text](/content-images/{category}/{slug}/filename.png)`. Do **not** leave external URLs as image sources — always download and host locally.
4. After creating all content files, run:
   ```bash
   npm run banner:auto
   ```
   This finds every `.md` file without a `banner:` field, generates a banner using the Chladni Particles generator, saves the PNG to the correct path, and patches the frontmatter automatically. **Always run this after creating content files.**

> If `npm run banner:auto` fails with a Playwright error, the user needs to run `npx playwright install chromium` once (one-time setup per machine). Tell them to do this and then re-run the command.

### Ingesting content from external URLs

When ingesting a post/article from an external URL (e.g. gov.gitcoin.co, blog posts, etc.):

1. **Always download inline images.** Fetch the page, identify ALL images in the post body, and download the original/high-resolution versions to `public/content-images/{category}/{slug}/`. Use descriptive filenames (e.g. `01-diagram-name.png`, `02-chart-name.png`).
2. **Reference images with local paths** in the markdown body — use `/content-images/{category}/{slug}/filename.png`, not the original external URLs. External image URLs can break or disappear over time.
3. **Preserve the original structure** of the source content as closely as possible — keep headings, tables, lists, and image placement in their original positions rather than summarizing or reorganizing.
4. Skip images that are purely navigational (avatars, UI chrome, social share buttons) — only download content-relevant images like diagrams, charts, screenshots, and illustrations.

### Slugs

- Kebab-case, derived from the content name
- Must match the filename exactly (`slug: quadratic-funding` → `quadratic-funding.md`)
- When updating an existing file, use the same slug as the existing file to avoid creating a duplicate
- Use existing slugs when referencing related content

### Tags

Lowercase, hyphen-separated. Follow existing conventions from similar files — e.g. `quadratic`, `retroactive`, `democratic`, `infrastructure`, `sybil-resistance`, `multichain`, `grants`.

---

## Development

```bash
npm install
npx playwright install chromium  # one-time per machine — needed for banner generation
npm run dev                       # dev server
npm run build                     # production build
npm run lint
npm run sync-docs                 # sync content to OpenAI vector store for AI chat
npx tsx scripts/validate-content.ts          # validate all content files
npx tsx scripts/validate-content.ts src/content/research/my-article.md  # validate one file
npx tsx scripts/validate-issue.ts <type> <body-file>  # validate a GitHub issue body (types: app, mechanism, research, case-study, campaign)
```
