---
id: '1741300000014'
slug: gitcoin-citizens-retro-3
name: "Gitcoin Citizens Retro #3 — Early Retrospective"
shortDescription: "Gitcoin Citizens Retro #3 distributed $54,451.88 to 61 contributors from 3,495 donors on Arbitrum, with analysis of donor behavior, token usage, and the retroactive funding mechanism for community contributions."
tags:
  - gitcoin
  - retroactive-funding
  - grants
  - community
lastUpdated: '2024-04-19'
relatedMechanisms:
  - retroactive-funding
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns:
  - gitcoin-grants-20-gg20
banner: /content-images/case-studies/gitcoin-citizens-retro-3/banner.png
---

# Gitcoin Citizens Retro #3 - Early Retrospective

**Posted by DistributedDoge | April 19, 2024, 8:31am**

## How did Citizens #3 round go?

It turns out **Gitcoin Citizens #3** round was quite successful, so as we are waiting for matching payouts, I wanted to share brief retrospective here which answers some questions that I was curious about.

Big thanks to [@umarkhaneth](https://gov.gitcoin.co/u/umarkhaneth), [@ghostffcode](https://gov.gitcoin.co/u/ghostffcode) and RegenData.xyz for making it easy to explore round data, and folks working on ReportCards for creating a great tool to browse round summaries.

Gitcoin Citizen rounds are supposed to reward contributors to Gitcoin ecosystem.

Donation stats for each round held to date:

*   [Citizens #1](https://reportcards.gitcoin.co/10/0x984e29dCB4286c2D9cbAA2c238AfDd8A191Eefbc) - **$82,995.13** to **33** projects from **17,023** donors on **Optimism**
*   [Citizens #2](https://reportcards.gitcoin.co/424/0x7492a8c4ED29B1F1559888Bd832fAe5D33E10370) - **$14,710.96** to **64** contributors from **1,350** donors on **PGN**
*   [Citizens #3](https://reportcards.gitcoin.co/42161/0x5aA255d5CAe9B6cE0F2d9AEE209cB02349B83731) - **$54,451.88** to **61** contributors from **3,495** donors on **Arbitrum**

Notable Differences between rounds:

*   **Citizens #3** focused 100% on retroactive work, unlike **Citizens #2**
*   Citizens **2-3** focused on individuals instead of projects, possibly making rounds less attractive for airdrop farmers
*   **Citizens #3** introduced _[signal boosting](https://gov.gitcoin.co/t/signal-boosting-for-gitcoin-citizens-retro-3/18518)_ with 12 Gitcoiners sponsored with about $1,400 each to donate.

Technically, when counting **"crowdfunding"** we may want to discount those signal boosting donations but from granteee POV this looks like any other donation.

### Final Donations

Short summary of **Citizens #3**:

*   $54k of crowdfunding dispersed among 61 citizens.
*   16 citizens in total got over $1000
*   53 citizens in total got over $500

Trivia:

*   Best performing grant yielded $1700
*   Worst performing grant yielded $300
*   32 grantees donated to other grantees
*   Total grantee-to-grantee donations amount to $5k (including $3k sponsored by Signal Boosting)

Lets compare money recieved with each recipient against number of individual donations they received:

**Gitcoin Citizens #3 - value and number donations**

[![Gitcoin Citizens #3 - donations vs donor count](/content-images/case-studies/gitcoin-citizens-retro-3/01-citizens-3-donations-vs-donor-count.png)](/content-images/case-studies/gitcoin-citizens-retro-3/01-citizens-3-donations-vs-donor-count.png)

What I find encouraging, is that although some citizens were given less money (**so far** - matching is yet to be dispersed) they still got fair share of attention from donors.

We can contrast this with previous round, where decrease in dollar value received followed decrease in number of donations obtained by each grantee.

**Gitcoin Citizens #2 - value and number of donations**

[![Gitcoin Citizens #2 - donations vs donor count](/content-images/case-studies/gitcoin-citizens-retro-3/02-citizens-2-donations-vs-donor-count.png)](/content-images/case-studies/gitcoin-citizens-retro-3/02-citizens-2-donations-vs-donor-count.png)

I cannot really explain why we are seeing this right now, but I think answer may lie in distribution of donations.

Going back to **Citizens #3**, I found it interesting to count how many grantees each individual donor decided to support. The result is the following distribution:

[![Donor distribution by grantees supported](/content-images/case-studies/gitcoin-citizens-retro-3/03-donor-distribution-by-grantees-supported.png)](/content-images/case-studies/gitcoin-citizens-retro-3/03-donor-distribution-by-grantees-supported.png)

Donating to a single project was a popular choice. Yet, majority of donors opted to support multiple grantees with 10 being second most popular option:

*   3,495 donors in total
*   1,300 (37%) donated to exactly one grantee
*   930 (27%) donated to exactly ten grantees

Two peaks on the graph may suggest new donors are trying to qualify or somehow "reaffirm" the "donated to 10 projects" and "donated to 25 projects" passport stamp.

Majority of donors supporting multiple project, did not have strong preferences and donated roughly similar amount to each:

*   1,096 donors split donation **evenly** (no difference) between multiple projects
*   1,960 donors staggered donations by $1 or less
*   45 donors staggered donations by $10 dollars or more

For actual breakdown of donations to each grantee, I recommend following the [Citizens#3 Reportcard](https://reportcards.gitcoin.co/42161/0x5aA255d5CAe9B6cE0F2d9AEE209cB02349B83731)

### Tokens Used

[![Tokens used in donations](/content-images/case-studies/gitcoin-citizens-retro-3/04-tokens-used-in-donations.png)](/content-images/case-studies/gitcoin-citizens-retro-3/04-tokens-used-in-donations.png)

Most value in donations was transferred using either Eth or USDC.

[![Token distribution by grantee](/content-images/case-studies/gitcoin-citizens-retro-3/05-token-distribution-by-grantee.png)](/content-images/case-studies/gitcoin-citizens-retro-3/05-token-distribution-by-grantee.png)

If we look at proportion of tokens received by each grantee we would see those proportions are consistent with distribution shown above.

The chart is ordered by total dollar value of donations obtained by each recipient, starting from grant with highest total of donations received placed on the left.

Eight of best performing grantees got higher proportion (around 70%) of donations in USDC as compared to other tokens. This can be due to "signal boosting donations" sponsored by Gitcoin being dispersed as USDC? I want to make closer look at signal boosting once we know how final outcome of matching.

### Acceptance

How strict was the application process?

I took a quick look at public application details to see how selective the review process was. Around **~100** applications were submitted, with **61** being accepted in the end. Some of initially rejected applicants were able to secure approval after modifying application.

**Common problems:**

*   Unclear or non-existent description
*   Application describes project or group of people instead of a person
*   Application contains promise of future work, but no mention of what was done so far

I did not read through every applications, but from what I have seen, I feel like every person that made good-faith effort to showcase how work done is a past was relevant to Gitcoin was ultimately accepted into the round.

### Do the results make sense?

[![Grantee rankings summary](/content-images/case-studies/gitcoin-citizens-retro-3/06-grantee-rankings-summary.png)](/content-images/case-studies/gitcoin-citizens-retro-3/06-grantee-rankings-summary.png)

This is purely personal outlook on how things went so far:

*   I see instances of people who worked on same projects (e.g. Streaming QF) ranking close in donation amounts. I see it as positive signal that overal distribution of donations is sensible as opposed to random.
*   People who are "closer" to Gitcoin core (Stewards, Workstream members) did well but fair share of donations went to folks working on periphery of the DAO with no "official function" so to speak.
*   Citizens doing various activities like translations, running-rounds, onboarding seem fairly represented throughout the round.

Looking beyond donations and numbers, and moving-on to my experience as grantee and donor:

*   I like "matching-on-matching" sponsored by Arbitrum and partially by [@Owocki](https://gov.gitcoin.co/u/owocki). As grantee I would like to know a bit more about breakdown of matching pool - as in what proportion of total dollar value in matching pool comes from which sponsor?
*   Social media support by **GitcoinCitizens** twitter handle was always stellar, at least from my perspective. I like that in this round, **Gitcoin** handle was much more active in promoting the round than it was previously during Citizens #2.
*   Apart from donations, it is nice to have event that brings community together so that we can see what everyone in ecosystem is doing.
*   Browsing through grantee profiles on Grants Stack wasn't easy, so I apperciated "signal boosters" and fellow grantees who took time to make twitter lists, as well as [@rohit](https://gov.gitcoin.co/u/rohit) sharing GrantsScope.

I hope organizations looking to reward contributors would see current Citizens initiative as proof that running such Retroactive rounds together with Gitcoin can be a pretty good deal.

Crowdfunding and matching-on-matching can markedly increase money going to ecosystem contributors!

This is all I have at the moment, so feel free to drop any opinions about the round itself or this post, as we wait for final results!

---

*Source: [Original post on Gitcoin Governance Forum](https://gov.gitcoin.co/t/gitcoin-citizens-retro-3-early-retrospective/18637)*
