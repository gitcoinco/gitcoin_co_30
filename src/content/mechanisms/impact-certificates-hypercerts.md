---
id: '1740500100027'
slug: impact-certificates-hypercerts
name: "Impact Certificates (Hypercerts)"
shortDescription: "Portable records of who did what, when, and where — with optional onchain ownership — so funders can allocate against shared evidence instead of isolated applications."
tags:
  - retroactive
  - tokenization
  - attribution
lastUpdated: '2026-09-09'
relatedMechanisms:
  - retroactive-funding
  - impact-attestations
relatedApps:
  - octant
  - optimism-retropgf
  - opensource-observer
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
banner: /content-images/mechanisms/impact-certificates-hypercerts/banner.png
---

**Impact Certificates (Hypercerts)** are a shared format for describing a unit of work: who contributed, what they did or plan to do, over what period, and in what scope. The Hypercerts Foundation stewards the protocol with research and early design from Protocol Labs. As of 2025–2026 the live protocol stores those records on the [AT Protocol](https://docs.hypercerts.org/core-concepts/why-at-protocol), so applications read the data rather than owning it. Onchain tokenization is optional: the Foundation's November 2025 architecture note treats blockchains as an ownership and funding layer (immutable ownership, transferable certificates) on top of the ATProto data layer, not as the only place a hypercert can exist.

That is a different object than the 2022–2024 generation, which this directory previously described as an onchain token that is minted after work is done and then bought in a retroactive market. Both generations are still part of the public story. They are not one liquidity pool.

## How It Works

The current protocol is a record–evaluate–fund loop, not a single marketplace.

1. **Record** — a project publishes a structured claim (planned or completed work). Records are stored in ATProto personal or shared data servers; users can change hosts without losing the record.
2. **Evaluate** — experts, communities, or tools attach evidence and assessments. Evaluations are referenced, not baked into a single score, and they accumulate over time.
3. **Fund** — a grants program, crowdfund, retro round, or buyer uses those shared records. Hypercerts do not decide who gets paid; they are the common language other mechanisms read.
4. **Optional onchain anchor** — ownership, a frozen metadata hash, or a transferable certificate can be placed on a chain when a mechanism needs settlement, splits, or secondary trading.

The older EVM-token flow (mint after delivery, evaluate, buy retroactively, fractionalize) still matches how some impact-certificate experiments were run, including early RetroPGF-adjacent work. It is no longer an accurate description of the protocol the Foundation is shipping.

## Advantages

- Separates **impact data** from **payout rails**, so Octant, a climate crowdfund, and a retro round can read the same contribution without copying application forms.
- Supports **prospective and retroactive** funding. Ma Earth's featured use is crowdfunding regenerative land projects from published records of planned or completed work — not only paying after the fact.
- Portable identity and records (ATProto) reduce lock-in to one grants UI.
- Optional tokenization still allows splits, secondary markets, and onchain settlement when a program wants them.

## Limitations

- **Not a grants program.** Holding or publishing a hypercert does not move ETH, OP, or USDC. A funder still has to run a round, a stream, or a purchase.
- **Two generations.** Early onchain hypercerts and current ATProto records are not automatically the same market. Directories that still say “mint an ERC token, then sell it retroactively” describe the first generation.
- **AT Protocol is not Ethereum.** Ethereum/L2 settlement is optional. Programs that need every claim on EVM have to add the onchain layer themselves.
- **Evaluation quality is the scarce input.** The protocol does not impose one metric. Thin or captured evaluations recreate the “persuasive narrative” problem the design is trying to escape.
- **Impact markets remain thin.** Trade, speculation, and curation are possible in the tokenized variant; they are not a demonstrated deep market as of this update.
- Still a poor fit for a simple one-off grant where a multisig payment is enough.

The previous page listed “unsuitable for upfront funding — only works retroactively.” That limitation applied to the certificate-as-retro-receipt model. It does not apply to the current record format.

## Best Used When

- A funder wants reusable contribution data across rounds (RetroPGF-style, Octant epochs, or domain crowdfunds)
- Evaluators and projects should keep their own records instead of re-entering each platform
- A program may later want onchain splits or certificates without making the chain the system of record
- The work is hard to price (OSS, regeneration, research) and needs evidence over time, not a one-shot application

## Examples and Use Cases

### Regenerative land crowdfunding (Ma Earth)

Projects publish records of planned or completed stewardship. Evaluators add observations. Funders allocate from that shared context. This is the Foundation's featured 2026 use case and is prospective as well as retrospective.

### Public goods funding platforms

Octant is listed as a research partner exploring impact-weighted allocation from hypercert data. Optimism appears as an ecosystem partner on the Foundation site. Those links are partnership/research relationships, not a claim that RetroPGF or Octant epochs currently settle exclusively in hypercerts.

### Tooling layer

[Certified](https://certified.app) is the portable impact profile. [Hyperscan](https://hyperscan.dev) indexes records and evaluations. A CLI, Hyperindex API, and agent API sit on the same schemas. This is infrastructure for other mechanisms, not a replacement for quadratic funding or direct grants.

## Further Reading

- [Hypercerts Foundation](https://hypercerts.org/)
- [Hypercerts documentation](https://docs.hypercerts.org)
- [Why We Are Building Hypercerts](https://hypercerts.leaflet.pub/3m6mnb2riz22o) (Nov 2025; ATProto data layer and optional onchain funding layer)
- [Allo Capital — Impact Certificates (Hypercerts)](https://www.allo.capital/mechanisms/impact-certificates-hypercerts) (earlier onchain-token framing)
- [hypercerts-org on GitHub](https://github.com/hypercerts-org)
