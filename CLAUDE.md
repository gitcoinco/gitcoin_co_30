# Gitcoin 30 — Instructions for Claude

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
featured: true                               # Optional — surfaces in featured section on /apps and homepage
```

Logo images for apps must be the **white/negative (inverted) version** of the app's logo. They are displayed on dark backgrounds — a full-colour logo will not render correctly.

### Research — additional field

```yaml
sensemakingFor: mechanisms   # Optional — marks this as the sensemaking article for a category page
                             # Valid values: mechanisms | apps | campaigns | case-studies | research
                             # Only one article per category should have this set
                             # Use a wider 3:1 banner (e.g. 1800×600px) for sensemaking articles

researchType: Report # Optional - can be Report | Opinion but not restricted to these values only
```

### Campaigns — additional fields

```yaml
featured: true                    # Optional — surfaces in featured section on /campaigns and homepage
externalUrl: 'https://...'        # Link to the campaign/round
matchingPoolUsd: '$1.5M'          # Total matching pool as a display string
projectsCount: '265'              # Number of projects as a display string
startDate: 'YYYY-MM-DD'
endDate: 'YYYY-MM-DD'             # Leave as empty string '' for ongoing campaigns
```

### featured field (all content types)

`featured: true` is available on every content type. What it does per type:
- **apps** → shown in featured section on `/apps` page and on the homepage
- **campaigns** → shown in featured section on `/campaigns` page and on the homepage
- **research** → shown in featured section on the homepage
- **mechanisms / case-studies** → loader supports it (featured items sort first) but no dedicated featured UI section exists yet

---

## Image Rules — Read Carefully

### NEVER add banner/logo frontmatter without the actual file

Do **not** write `banner: /content-images/research/my-article/banner.png` in frontmatter unless `public/content-images/research/my-article/banner.png` actually exists in the repository. A missing path breaks the page and OG image generation. When in doubt, omit the field — the app shows a placeholder automatically.

### No SVGs for banner or logo

Banners and logos are used as OG (Open Graph) images for social media previews. **SVG files cannot be used as OG images.** Always use **PNG or JPG** for `banner` and `logo`.

- If you have an SVG source, convert it to PNG before saving it.
- Inline description images may use any format, but PNG/JPG preferred.

### Logo style

App logos must be the **white/negative (inverted) version** — they are rendered on dark backgrounds. A full-colour or dark logo will not be visible.

### Image locations

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
2. Do **not** add `banner:` to the frontmatter — omit it entirely
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

## Content Quality Standards

### Source Requirements

Every quantitative claim must include a primary source. Do not write "Gitcoin has distributed $60M+" without linking or citing the source dataset, report, or on-chain reference. Acceptable sources: on-chain data, published reports, official announcements, academic papers. If a stat cannot be sourced, either find the source or remove the claim.

### Tone Profiles by Content Type

The model's voice should adapt to the content type being written:

| Content Type | Tone | Framing |
|-------------|------|---------|
| **Research** | Analytical, exploratory, evidence-based. Present findings and let the reader draw conclusions. Avoid definitives ("the evidence is clear", "this proves", "undeniably"). Prefer "the data suggests", "one interpretation is", "this points toward". |
| **Mechanism** | Technical, precise, neutral. Describe how it works, tradeoffs, and design parameters. No advocacy — just the mechanism. |
| **Case Study** | Narrative, grounded in specifics. What happened, what worked, what didn't, what we learned. Let the story carry the argument. |
| **App** | Descriptive, practical. What it does, how to use it, where it fits in the ecosystem. Keep it functional. |
| **Campaign** | Factual, concise. Dates, amounts, participants, outcomes. |

**Banned patterns across all types:**
- "The evidence is clear that..." — present the evidence, let the reader decide
- "It is undeniable that..." — if it were undeniable you wouldn't need to say so
- "This groundbreaking..." — let the reader judge significance
- "Revolutionary approach..." — describe the approach, skip the adjective
- Unsourced superlatives ("the largest", "the first", "the most") — source it or soften it

### SEO & AI Search Optimization

All content should be optimized for both traditional search engines and AI-powered search (ChatGPT, Perplexity, Google AI Overviews):

1. **Title & slug:** Include the primary keyword naturally. Prefer specific, descriptive titles over clever/abstract ones. "Quadratic Funding: How Democratic Matching Works" > "The Shape of Money"
2. **shortDescription:** Write as a complete, self-contained answer to the implicit question. This is what AI search surfaces. 150-200 chars, keyword-rich.
3. **First paragraph:** Answer the "what is this about?" question immediately. AI search and featured snippets pull from the first 2-3 sentences.
4. **Headers (H2/H3):** Use question-format headers where natural ("How does quadratic funding work?", "What are the tradeoffs?"). These map directly to search queries.
5. **Structured data:** Use tables, numbered lists, and definition patterns where appropriate. These are preferred by both Google and AI search for extraction.
6. **Internal linking:** Link to related mechanisms, apps, case studies, and research using relative paths. This builds topical authority and helps AI crawlers map relationships.
7. **Tags:** Use established tag vocabulary. Tags feed the site's filtering and help search engines understand content taxonomy.

### Verification Pass

Before finalizing any content, perform a second pass specifically to:

1. **Flag unverified stats:** Search for any numbers, percentages, dollar amounts, or quantitative claims. Each must have an inline source (link, citation, or footnote). Flag any that don't.
2. **Check framework consistency:** Does this piece use terminology consistently with the rest of the site? Cross-reference `src/content/mechanisms/` for canonical mechanism names. Don't call it "retroactive funding" in one place and "retroPGF" in another without explaining the relationship.
3. **Validate slugs:** Every `relatedMechanisms`, `relatedApps`, `relatedCaseStudies`, `relatedResearch`, and `relatedCampaigns` entry must correspond to an actual file in the repo. Run `ls src/content/{type}/` to verify.
4. **Check link targets:** Internal links to `/mechanisms/xyz` or `/research/xyz` must use slugs that exist. External links should be to stable URLs (not tweets that may be deleted, not paywalled content).
5. **Tone audit:** Re-read for any definitive/superlative language that crept in. Apply the tone profile for the content type.

---

## Development

```bash
npm install
npx playwright install chromium  # one-time per machine — needed for banner generation
npm run dev                       # dev server
npm run build                     # production build
npm run lint
npm run sync-docs                 # sync content to OpenAI vector store for AI chat
```
