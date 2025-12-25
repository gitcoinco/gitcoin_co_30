# Gitcoin.co Implementation Plan

## Executive Summary

Transform Gitcoin.co into **Ethereum's Funding App Store and Reference Library** - a living CMS that curates the entire funding landscape, positioning Gitcoin as the intellectual center of Ethereum funding rather than just a participant.

---

## Phase 1: Foundation & Architecture

### 1.1 Project Setup

- [ ] Initialize repository with modern tooling (TypeScript, ESLint, Prettier)
- [ ] Set up monorepo structure if needed (frontend + CMS admin)
- [ ] Configure CI/CD pipeline (GitHub Actions or similar)
- [ ] Set up staging and production environments
- [ ] Configure environment variables management
- [ ] Set up error tracking (Sentry or similar)

### 1.2 CMS Selection & Configuration

**Recommended Options (evaluate based on team preferences):**

| CMS | Pros | Cons |
|-----|------|------|
| **Sanity** | Real-time collaboration, excellent content modeling, generous free tier | Learning curve for GROQ |
| **Strapi** | Open-source, self-hosted option, familiar REST/GraphQL | Self-hosting overhead |
| **Contentful** | Mature, great DX, strong ecosystem | Pricing at scale |
| **Payload CMS** | TypeScript-native, self-hosted, code-first | Newer ecosystem |
| **Directus** | Open-source, SQL-based, flexible | Less opinionated |

**Tasks:**
- [ ] Evaluate CMS options against requirements
- [ ] Consider community contribution workflow (editing, moderation, versioning)
- [ ] Set up chosen CMS with initial configuration
- [ ] Configure authentication and roles (Admin, Editor, Contributor)
- [ ] Set up content versioning and draft/publish workflow
- [ ] Configure webhooks for build triggers
- [ ] Set up preview functionality for draft content

### 1.3 Frontend Framework

**Recommended: Next.js 14+ with App Router**

- [ ] Initialize Next.js project with TypeScript
- [ ] Configure static generation (SSG) for content pages
- [ ] Set up Incremental Static Regeneration (ISR) for dynamic updates
- [ ] Configure image optimization pipeline
- [ ] Set up SEO utilities (metadata, Open Graph, JSON-LD)
- [ ] Configure MDX for rich content rendering
- [ ] Set up syntax highlighting for code examples

---

## Phase 2: Design System & Brand Implementation

### 2.1 Design Tokens

Implement the three-mode color system from brand.md:

```
design-system/
├── tokens/
│   ├── colors-lichenpunk.ts    # Default mode
│   ├── colors-solarpunk.ts     # Optimistic mode
│   ├── colors-lunarpunk.ts     # Serious mode
│   ├── colors-system.ts        # Cross-mode accents
│   ├── typography.ts
│   ├── spacing.ts
│   └── shadows.ts
└── themes/
    ├── lichenpunk.ts
    ├── solarpunk.ts
    └── lunarpunk.ts
```

**Tasks:**
- [ ] Create color token files for each mode:
  - **Lichenpunk**: Moss Green (#6F8F72), Deep Lichen (#4F6F64), Teal Green (#4AAE9B)
  - **Solarpunk**: Solar Green (#7CFFB2), Leaf Green (#4DFF9A), Sky Blue (#6EC1FF)
  - **Lunarpunk**: Midnight Purple (#2D1E4F), Deep Indigo (#1B1F3B), Dusk Violet (#4B3F72)
- [ ] Implement system accents (CTA Green #00EB88, Warning #F59E0B, Error #EF4444, Info #3B82F6)
- [ ] Define typography scale (modern, high legibility)
- [ ] Create spacing and layout tokens
- [ ] Build theme context/provider for mode switching
- [ ] Implement per-page theme selection (metadata-driven)

### 2.2 Component Library

**Core Components:**

- [ ] **Layout**
  - Header with navigation
  - Footer with links and newsletter
  - Sidebar for content pages
  - Breadcrumbs
  - Page container with theme support

- [ ] **Typography**
  - Headings (H1-H6)
  - Body text variants
  - Code blocks
  - Blockquotes
  - Lists

- [ ] **Navigation**
  - Top navigation bar
  - Mobile menu
  - Category tabs
  - Pagination
  - Table of contents (for long-form content)

- [ ] **Cards**
  - App card
  - Mechanism card
  - Case study card
  - Research card
  - Campaign card (featured)
  - Contributor card

- [ ] **Forms**
  - Text inputs
  - Textareas
  - Select dropdowns
  - Tag inputs
  - File uploads
  - Rich text editor (for submissions)
  - Form validation

- [ ] **Feedback**
  - Loading states
  - Empty states
  - Error states
  - Success messages
  - Toast notifications

- [ ] **Data Display**
  - Tables (sortable, filterable)
  - Tags/badges
  - Stats/metrics
  - Timelines
  - Comparison tables

### 2.3 Visual Assets

- [ ] Implement wordmark-first logo usage
- [ ] Create icon set (organic, not mechanical)
- [ ] Design placeholder images for content types
- [ ] Create Open Graph image templates
- [ ] Design loading/skeleton states

---

## Phase 3: Content Architecture

### 3.1 Content Types (Data Models)

#### Apps
Funding platforms, DAOs, grant programs, funds, and primitives.

```typescript
type App = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string // Rich text/MDX
  logo: Image
  website: string
  category: 'platform' | 'dao' | 'grant-program' | 'fund' | 'primitive'
  mechanisms: Mechanism[] // Relations
  blockchain: string[]
  launchDate: Date
  status: 'active' | 'deprecated' | 'upcoming'
  fundingVolume?: string // e.g., "$10M+"
  caseStudies: CaseStudy[] // Relations
  socialLinks: {
    twitter?: string
    discord?: string
    github?: string
    telegram?: string
  }
  tags: string[]
  contributors: Contributor[]
  lastUpdated: Date
  themeMode: 'lichenpunk' | 'solarpunk' | 'lunarpunk'
}
```

#### Mechanisms
Quadratic funding, retro funding, conviction voting, etc.

```typescript
type Mechanism = {
  id: string
  slug: string
  name: string
  shortDescription: string
  fullDescription: string // Rich text/MDX
  heroImage: Image
  category: 'allocation' | 'voting' | 'streaming' | 'trust' | 'hybrid'

  // Educational content
  howItWorks: string // Rich text with diagrams
  advantages: string[]
  limitations: string[]
  bestUsedFor: string[]

  // Technical
  implementations: App[] // Platforms using this
  technicalResources: {
    title: string
    url: string
    type: 'paper' | 'repo' | 'article' | 'video'
  }[]

  // Metadata
  inventors?: string[]
  originYear?: number
  relatedMechanisms: Mechanism[]
  caseStudies: CaseStudy[]
  tags: string[]
  contributors: Contributor[]
  lastUpdated: Date
}
```

#### Case Studies
What was funded, how, outcomes, lessons learned.

```typescript
type CaseStudy = {
  id: string
  slug: string
  title: string
  summary: string
  content: string // Rich text/MDX
  heroImage: Image

  // Context
  project: string
  platform: App
  mechanism: Mechanism
  fundingAmount: string
  fundingDate: Date

  // Outcomes
  outcomes: {
    title: string
    description: string
    metrics?: string
  }[]
  lessonsLearned: string[]
  status: 'success' | 'partial' | 'failed' | 'ongoing'

  // Metadata
  author: Contributor
  sources: {
    title: string
    url: string
  }[]
  tags: string[]
  publishDate: Date
  lastUpdated: Date
}
```

#### Research & Trends
Analysis of capital flows, mechanism performance, ecosystem shifts.

```typescript
type Research = {
  id: string
  slug: string
  title: string
  abstract: string
  content: string // Rich text/MDX
  heroImage: Image

  type: 'analysis' | 'report' | 'trend' | 'opinion' | 'data'

  // Data & Visuals
  dataVisualizations: {
    title: string
    type: 'chart' | 'graph' | 'table' | 'infographic'
    embed?: string
    image?: Image
  }[]

  // Context
  relatedApps: App[]
  relatedMechanisms: Mechanism[]
  timeframe?: string // e.g., "Q1 2025"

  // Metadata
  authors: Contributor[]
  sources: {
    title: string
    url: string
  }[]
  tags: string[]
  publishDate: Date
  lastUpdated: Date
}
```

#### Campaigns
What is happening now and soon.

```typescript
type Campaign = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string // Rich text/MDX
  heroImage: Image

  // Timing
  status: 'upcoming' | 'active' | 'completed'
  startDate: Date
  endDate: Date

  // Details
  organizer: App | string
  mechanism: Mechanism
  fundingPool?: string
  matchingPool?: string

  // Participation
  applicationUrl?: string
  eligibility?: string[]

  // Featured status
  isFeatured: boolean
  featuredOrder?: number

  // Outcomes (post-campaign)
  results?: {
    projectsFunded: number
    totalDistributed: string
    uniqueDonors?: number
    highlights: string[]
  }

  // Metadata
  caseStudy?: CaseStudy
  tags: string[]
  lastUpdated: Date
}
```

#### Contributors
Community members who create/edit content.

```typescript
type Contributor = {
  id: string
  slug: string
  name: string
  avatar: Image
  bio?: string
  role?: string
  organization?: string
  socialLinks: {
    twitter?: string
    github?: string
    website?: string
    ens?: string
  }
  contributions: number
  joinDate: Date
}
```

### 3.2 Content Relationships

- [ ] Define bi-directional relationships between content types
- [ ] Create reference validation rules
- [ ] Implement content suggestion system (related content)
- [ ] Build cross-reference display components

### 3.3 Content Categories & Taxonomy

**App Categories:**
- Platforms (Gitcoin, Giveth, Clr.fund, etc.)
- DAOs (Optimism Collective, Arbitrum DAO, etc.)
- Grant Programs (EF grants, Protocol Guild, etc.)
- Funds (Allo Capital, etc.)
- Primitives (tools, protocols, building blocks)

**Mechanism Categories:**
- Allocation (QF, retro PGF, conviction voting)
- Voting (snapshot, token-weighted, quadratic)
- Streaming (Drips, Superfluid)
- Trust-based (attestations, reputation)
- Hybrid (combinations)

**Tasks:**
- [ ] Finalize category taxonomy
- [ ] Create tag system (free-form + suggested)
- [ ] Build category landing pages
- [ ] Implement filtering and sorting

---

## Phase 4: Core Features

### 4.1 Homepage

- [ ] Hero section with value proposition
- [ ] Featured campaigns carousel/grid
- [ ] Quick stats (total funding tracked, mechanisms documented, etc.)
- [ ] Recent additions (new apps, mechanisms, case studies)
- [ ] Category navigation tiles
- [ ] Search prominent
- [ ] Newsletter signup
- [ ] Partner logos (optional)

### 4.2 Directory Pages

**Apps Directory (/apps)**
- [ ] Grid/list view toggle
- [ ] Filter by category, mechanism, blockchain, status
- [ ] Sort by name, funding volume, recency
- [ ] Search within directory
- [ ] Pagination or infinite scroll

**Mechanisms Directory (/mechanisms)**
- [ ] Visual cards with quick descriptions
- [ ] Filter by category
- [ ] Comparison feature (select 2-3 to compare)
- [ ] "Popular" and "Emerging" sections

**Case Studies Directory (/case-studies)**
- [ ] Filter by platform, mechanism, outcome status
- [ ] Sort by date, funding amount
- [ ] Featured/pinned case studies

**Research Directory (/research)**
- [ ] Filter by type, date range
- [ ] Tag-based browsing
- [ ] "Latest" and "Most Read" sections

**Campaigns Directory (/campaigns)**
- [ ] Active campaigns (prominent)
- [ ] Upcoming campaigns
- [ ] Past campaigns archive
- [ ] Calendar view option

### 4.3 Detail Pages

**App Detail Page (/apps/[slug])**
- [ ] Hero with logo, name, tagline
- [ ] Key stats sidebar
- [ ] Full description with rich formatting
- [ ] Mechanisms used (linked)
- [ ] Case studies featuring this app
- [ ] External links section
- [ ] Related apps
- [ ] "Suggest Edit" button
- [ ] Last updated timestamp

**Mechanism Detail Page (/mechanisms/[slug])**
- [ ] Educational hero section
- [ ] "How It Works" with diagrams
- [ ] Pros/cons comparison
- [ ] Apps implementing this mechanism
- [ ] Case studies using this mechanism
- [ ] Technical resources
- [ ] Related mechanisms
- [ ] "Suggest Edit" button

**Case Study Detail Page (/case-studies/[slug])**
- [ ] Rich long-form content
- [ ] Context sidebar (platform, mechanism, amount)
- [ ] Outcomes section with metrics
- [ ] Lessons learned callouts
- [ ] Sources/references
- [ ] Author attribution
- [ ] Related case studies

**Research Detail Page (/research/[slug])**
- [ ] Full article layout
- [ ] Data visualizations embedded
- [ ] Table of contents for long pieces
- [ ] Author(s) attribution
- [ ] Sources section
- [ ] Share buttons

**Campaign Detail Page (/campaigns/[slug])**
- [ ] Countdown/status indicator
- [ ] Participation CTA
- [ ] Full details
- [ ] Eligibility information
- [ ] Results (if completed)
- [ ] Link to case study (if exists)

### 4.4 Search & Discovery

- [ ] Global search with instant results
- [ ] Search across all content types
- [ ] Typeahead suggestions
- [ ] Search filters (by type, date, etc.)
- [ ] Search result previews
- [ ] "No results" helpful state
- [ ] Search analytics integration

**Technical Options:**
- Algolia (hosted, excellent DX)
- Meilisearch (self-hosted)
- Typesense (open-source)
- Built-in CMS search (if sufficient)

---

## Phase 5: Community Contribution System

### 5.1 Submission Workflow

**Anonymous/Guest Submissions:**
- [ ] Simple form for suggesting new content
- [ ] Fields vary by content type
- [ ] Captcha/anti-spam
- [ ] Email for follow-up
- [ ] Submission goes to moderation queue

**Authenticated Contributions:**
- [ ] Sign in with Ethereum (SIWE) or GitHub
- [ ] Contributor profile creation
- [ ] Full submission forms with rich text
- [ ] Save drafts
- [ ] Track submission status
- [ ] Contributor dashboard

### 5.2 Editing System

- [ ] "Suggest Edit" button on all content pages
- [ ] Side-by-side diff view for changes
- [ ] Change summary/reason field
- [ ] Edit goes to moderation queue
- [ ] Notification to original author (if applicable)

### 5.3 Moderation System

**Admin Dashboard:**
- [ ] Pending submissions queue
- [ ] Pending edits queue
- [ ] One-click approve/reject
- [ ] Edit before approving
- [ ] Bulk actions
- [ ] Moderation history

**Quality Standards:**
- [ ] Content guidelines page
- [ ] Quality rubric for case studies
- [ ] Fact-checking checklist
- [ ] Style guide

### 5.4 Contributor Incentives

- [ ] Public contributor profiles
- [ ] Contribution count display
- [ ] Contributor leaderboard (optional)
- [ ] Badges/achievements (optional)
- [ ] Integration with bounty system ($100/pop for quality content)

---

## Phase 6: Analytics & Success Tracking

### 6.1 Traffic Analytics

- [ ] Set up Plausible, Fathom, or privacy-respecting analytics
- [ ] Track page views by content type
- [ ] Track search queries
- [ ] Track referral sources
- [ ] Social share tracking

### 6.2 Content Performance

- [ ] Most viewed content
- [ ] Time on page
- [ ] Scroll depth
- [ ] Internal navigation patterns
- [ ] Search-to-content conversion

### 6.3 Success Metrics Dashboard

**Leading Indicators:**
- [ ] Traffic trends
- [ ] Organic social shares
- [ ] Search impressions/clicks
- [ ] Newsletter signups
- [ ] Community contributions

**Trailing Indicators:**
- [ ] Leads generated (contact form, partnerships)
- [ ] Inbound collaboration requests
- [ ] Content syndication

---

## Phase 7: Migration & Integration

### 7.1 Content Migration

**From impact.gitcoin.co:**
- [ ] Audit existing case studies
- [ ] Map to new data model
- [ ] Migrate and enhance content
- [ ] Set up redirects

**From existing Gitcoin.co:**
- [ ] Identify reusable content
- [ ] Grants maturity framework migration
- [ ] Other resources audit
- [ ] Plan redirect strategy

**External Content Integration:**
- [ ] Owocki's X articles analysis
- [ ] Grant Farm data (Sov)
- [ ] Greenpill podcast references
- [ ] Existing research/reports

### 7.2 URL Structure & SEO

- [ ] Define URL schema
  - `/apps/[slug]`
  - `/mechanisms/[slug]`
  - `/case-studies/[slug]`
  - `/research/[slug]`
  - `/campaigns/[slug]`
  - `/contributors/[slug]`
- [ ] 301 redirects from old URLs
- [ ] XML sitemap generation
- [ ] robots.txt configuration
- [ ] Canonical URLs
- [ ] Structured data (JSON-LD)

### 7.3 Integrations

**Potential Integrations:**
- [ ] Newsletter (Substack, Buttondown, ConvertKit)
- [ ] Social cards auto-generation
- [ ] RSS feeds by content type
- [ ] API for external consumption (optional)
- [ ] Allo/Gitcoin protocol data (live stats, optional)

---

## Phase 8: Launch Strategy

### 8.1 MVP Launch (Target: ETHBoulder)

**Must-Have for MVP:**
- [ ] Homepage with core navigation
- [ ] Apps directory (10-20 entries)
- [ ] Mechanisms directory (5-10 entries)
- [ ] 3-5 case studies
- [ ] Basic search
- [ ] Mobile responsive
- [ ] Basic submission form
- [ ] Analytics

**Nice-to-Have for MVP:**
- [ ] Research section
- [ ] Campaigns section
- [ ] Full contributor system
- [ ] Advanced search/filters

### 8.2 Content Seeding

**Pre-Launch Content:**
- [ ] Document 15-20 major funding apps
- [ ] Write up 8-10 mechanisms
- [ ] Create 5 high-quality case studies
- [ ] 2-3 research pieces
- [ ] Active campaigns section

**Priority Apps to Document:**
1. Gitcoin Grants Stack
2. Optimism RetroPGF
3. Giveth
4. Clr.fund
5. Protocol Guild
6. Arbitrum DAO Grants
7. Octant
8. Drips
9. Superfluid
10. Ethereum Foundation grants

**Priority Mechanisms:**
1. Quadratic Funding
2. Retroactive Public Goods Funding
3. Conviction Voting
4. Direct Grants
5. Streaming/Drips
6. Attestation-based funding
7. Milestone-based funding
8. Token-weighted voting

### 8.3 Launch Checklist

- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] SEO checklist
- [ ] Security review
- [ ] Load testing
- [ ] Backup/recovery tested
- [ ] Monitoring alerts configured
- [ ] Documentation for content editors

---

## Phase 9: Post-Launch & Community Swarming

### 9.1 ETHBoulder Community Engagement

- [ ] Bounty program setup ($100/pop for quality content)
- [ ] Contribution guidelines published
- [ ] Onboarding session for contributors
- [ ] Slack/Discord channel for contributors
- [ ] Weekly community calls (optional)

### 9.2 Content Expansion Priorities

**Round 1 (Post-MVP):**
- [ ] Expand to 50+ apps
- [ ] Complete mechanism library
- [ ] 20+ case studies
- [ ] Weekly research/trend pieces

**Round 2 (Ongoing):**
- [ ] Deep dives on each major platform
- [ ] Mechanism comparison guides
- [ ] "State of Funding" reports
- [ ] Video content integration

### 9.3 Feature Iterations

- [ ] User feedback collection system
- [ ] Feature request tracking
- [ ] Regular iteration sprints
- [ ] A/B testing for key pages

---

## Technical Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Homepage │ │Directory │ │  Detail  │ │  Submit  │       │
│  │          │ │  Pages   │ │  Pages   │ │  Forms   │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                          │                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Design System (Tokens/Components)        │  │
│  │  Lichenpunk │ Solarpunk │ Lunarpunk │ System          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Headless CMS                           │
│  ┌─────────┐ ┌───────────┐ ┌────────────┐ ┌──────────┐     │
│  │  Apps   │ │Mechanisms │ │Case Studies│ │ Research │     │
│  └─────────┘ └───────────┘ └────────────┘ └──────────┘     │
│  ┌─────────┐ ┌───────────┐ ┌────────────┐                  │
│  │Campaigns│ │Contributors│ │   Media    │                  │
│  └─────────┘ └───────────┘ └────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Services                              │
│  ┌─────────┐ ┌───────────┐ ┌────────────┐ ┌──────────┐     │
│  │ Search  │ │ Analytics │ │   Auth     │ │  Email   │     │
│  │(Algolia)│ │(Plausible)│ │  (SIWE)    │ │Newsletter│     │
│  └─────────┘ └───────────┘ └────────────┘ └──────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Team & Responsibilities

| Role | Responsibility | Lead |
|------|---------------|------|
| Technical Lead | Architecture, CMS setup, frontend | Jon |
| Design Lead | Design system, components, UX | Cristina |
| Content Lead | Content strategy, quality, migration | New Marketing Lead |
| Content Contributors | Research, case studies, app docs | Owocki, Carey, Community |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| CMS choice doesn't scale | Evaluate thoroughly; choose headless for flexibility |
| Content quality inconsistent | Establish quality rubric; moderation workflow |
| Low community contribution | Bounty program; clear guidelines; recognition |
| SEO traffic slow to build | Start with strong foundational content; patience |
| Feature creep | MVP discipline; prioritize ruthlessly |
| Timeline pressure | Lean MVP first; iterate post-launch |

---

## Success Criteria

**MVP Launch (ETHBoulder):**
- Site live with core content types
- Mobile responsive
- Basic search working
- 20+ pieces of quality content
- Submission flow functional

**3 Months Post-Launch:**
- Traffic trending upward
- 50+ apps documented
- 30+ case studies
- Active community contributions
- Social shares happening organically

**6 Months Post-Launch:**
- Recognized as go-to resource for Ethereum funding
- Regular inbound inquiries
- Content being cited/referenced
- 100+ pieces of content
- Sustainable contribution cadence

---

## Appendix: File Structure (Suggested)

```
gitcoin-funding-directory/
├── apps/
│   ├── (site)/              # Next.js app router
│   │   ├── page.tsx         # Homepage
│   │   ├── apps/
│   │   ├── mechanisms/
│   │   ├── case-studies/
│   │   ├── research/
│   │   ├── campaigns/
│   │   └── submit/
│   ├── components/
│   │   ├── ui/              # Base components
│   │   ├── cards/           # Card variants
│   │   ├── forms/           # Form components
│   │   └── layout/          # Layout components
│   └── lib/
│       ├── cms/             # CMS client
│       ├── search/          # Search integration
│       └── utils/           # Utilities
├── design-system/
│   ├── tokens/
│   └── themes/
├── cms/                     # CMS schemas (if self-hosted)
│   └── schemas/
├── content/                 # Seed content (markdown)
└── docs/                    # Internal documentation
    ├── content-guidelines.md
    └── contribution-guide.md
```

---

*This implementation plan is a living document. Update as decisions are made and requirements evolve.*
