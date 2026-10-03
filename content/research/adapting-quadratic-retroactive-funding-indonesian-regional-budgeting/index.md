# Adapting Quadratic and Retroactive Funding to Subnational Public Budgeting: Lessons from Regional Regulatory Benchmarking

## Authors

Anton Mahendra | [LinkedIn](https://www.linkedin.com/in/anton-mahendra/)

## Summary

Exploring where quadratic funding and retroactive funding principles could apply to Indonesian regional public budgeting (APBD/CSR).

## Full Text

## Why This Matters

Quadratic funding (QF) and retroactive public goods funding (RetroPGF) were
designed to solve a specific problem: allocating limited capital toward
public goods without relying solely on centralized committees. Outside of
crypto-native ecosystems, subnational governments face a structurally
similar problem — allocating regional development budgets (APBD/CSR
co-investment schemes) across competing public infrastructure and social
programs, often through top-down committee decisions with limited
community input.

This piece draws on hands-on experience conducting regulatory benchmarking
across Indonesian provinces to explore where onchain funding mechanisms
could and couldn't translate to public budgeting contexts outside
crypto.

## What Public Budgeting Currently Looks Like

Indonesia has run a formal participatory budgeting process since 2004,
known as Musrenbang (Musyawarah Perencanaan Pembangunan), mandated under
Law No. 25/2004 on the National Development Planning System. The process
runs bottom-up in theory: village and sub-district forums submit proposals
that are meant to flow upward into the district/provincial budget (APBD).

In practice, research on Musrenbang implementation across multiple cities
(Kota Kita's study of Solo, Yogyakarta, Surabaya, Makassar, Bandung, and
Kebumen) finds that local governments typically allocate only a small
share of the budget to proposals that actually originate from these
forums, and that the process functions more as a representative
consultation than a direct one — aspirations get filtered through several
layers before reaching the final budget document. A parallel study in
Kutai Kartanegara found little measurable link between the participatory
process and the efficiency or effectiveness of the resulting development
projects.

Two structural patterns show up repeatedly in this literature:
1. Participation happens early, capital allocation happens late.
   Community forums close months before the budget is finalized, and by
   the time trade-offs between competing proposals are actually made, the
   public is no longer in the room.
2. Evaluation is rare and always after the fact. Whether a funded program
   actually delivered impact is usually assessed informally, if at all —
   there's no standard mechanism comparable to retroactive funding rounds
   that pay for *proven* outcomes rather than proposed ones.

CSR-funded programs (which in Indonesia are a statutory obligation for
resource-sector companies) add a second, parallel budget stream that
regional governments increasingly try to co-invest alongside APBD — for
example, matching provincial funds with corporate CSR money on flagship
programs like commodity-processing initiatives. This co-investment
pattern is structurally close to a matching pool, but the matching ratio
and project selection are negotiated case-by-case rather than through any
standardized public mechanism.

## Regional Comparison: Indonesia in a Southeast Asian Context

Indonesia is not the region's strongest performer on budget participation.
The Philippines has consistently led Southeast Asia on the Open Budget
Survey's Public Participation indicator, scoring ahead of regional peers
on formal opportunities for public input across the budget cycle — though
even there, researchers have found that participatory budgeting tends to
under-serve the poorest communities in practice, a bias also documented
in Indonesian cities like Solo.

The Asian Development Bank's cross-country pilots (Indonesia, Marshall
Islands, Pakistan) reached a consistent conclusion: participatory
budgeting succeeds less on the sophistication of the mechanism and more
on whether local governments have the political will and technical
capacity to act on it. This is the same failure mode QF designers try to
engineer around with automated matching formulas — but automation alone
doesn't solve a political-will problem.

## Where QF/RetroPGF Principles Could Apply

- **Community-weighted signal at the allocation stage, not just the proposal stage.** Musrenbang already collects community input, but the input is disconnected from how money actually gets divided among competing proposals. A QF-style matching formula applied *after* proposals are collected (weighting broad, small-scale support over concentrated backing) could make the link between participation and allocation explicit and auditable, rather than filtered through committee discretion.

- **Retroactive evaluation as a funding trigger.** Instead of releasing full CSR/APBD co-investment funds upfront based on proposals, a portion could be structured as retroactive top-ups released after independently verified outcomes, similar to RetroPGF's "pay for proven impact" logic. This would directly address the evaluation gap noted in the Kutai Kartanegara findings above.

- **Matching pool structure.** Formalizing existing APBD+CSR co-investment — the ad-hoc negotiation that currently determines APBD/CSR matching ratios could be replaced with a published, rules-based matching pool, making the co-investment process legible to the public rather than negotiated privately between government and corporate partners.

## Where the Analogy Breaks Down

- **Sybil-resistance is a solved-ish problem onchain and an unsolved one offline.** QF's core vulnerability — fake accounts inflating the number of "small" contributors — has cryptographic and reputation-based mitigations onchain (Gitcoin Passport, identity scoring). Musrenbang has no equivalent: attendance and proposal counts can be manipulated through patronage networks, and there's no low-cost verification layer.

- **Legal accountability runs through statute, not smart contracts.** APBD spending is bound by regional finance law (Permendagri regulations, audit by BPK), which moves far slower than a smart-contract-enforced matching round and can't be redesigned by a community the way an onchain mechanism can be forked or upgraded.

- **Small donors don't hold real capital in a low-income context.** QF's power comes from aggregating many small financial contributions. In many Indonesian districts, the relevant public doesn't have discretionary capital to signal preference with — the "vote" would have to be a non-financial proxy (attendance, verified need, ranked preference), which changes the math and the incentive design entirely.

- **Committees aren't a bug to be removed — they're often the accountability mechanism.** Fully disintermediating budget committees removes a body that, however imperfect, is legally answerable to auditors and voters. An onchain-native "remove the middleman" framing doesn't map cleanly onto a system where the middleman is also the legally liable party.

## Takeaways

1. Musrenbang already does the *participation* half of what QF does — the missing piece is a transparent, rules-based allocation formula connecting participation to actual budget shares.
2. Retroactive funding logic is the more portable idea of the two: paying for verified outcomes rather than proposed ones addresses a well-documented evaluation gap in Indonesian participatory budgeting research, without requiring new legal infrastructure.
3. Full QF matching-formula adoption is unlikely to translate directly — sybil-resistance and the "small donor" assumption both break down outside a context where participants hold discretionary capital and verifiable digital identity.
4. The more promising near-term step is formalizing existing APBD+CSR co-investment into a published, rules-based matching structure — an incremental change that doesn't require new legislation, just transparency.

## Sources

- Kota Kita, ["Participatory Budgeting Practices in Indonesian Cities"](https://kotakita.org/participatory-budgeting-practices-in-indonesian-cities)
- ["Assessing the Participatory Budgeting Process in Kutai Kartanegara, Indonesia"](https://etd.repository.ugm.ac.id/penelitian/detail/206169)
- Affandi et al., ["Participatory Budgeting in Indonesia: from the Policy Innovation to the Democracy Innovation"](https://journal.unesa.ac.id/index.php/jsm/article/view/16921)
- ["Philippines maintains lead in Southeast Asia on Budget Participation"](https://ogp.dbm.gov.ph/index.php/news/philippines-maintains-lead-in-southeast-asia-on-budget-participation), Open Government Partnership Philippines
- Asian Development Bank, ["Fostering Public Participation in Budget-making: Case Studies from Indonesia, Marshall Islands, and Pakistan"](https://www.adb.org/publications/fostering-public-participation-budget-making-case-studies-indonesia-marshall-islands)
