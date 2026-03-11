---
id: '1741300000027'
slug: gg23-predictive-funding-challenge-retrospective
name: "GG23 Predictive Funding Challenge Retrospective"
shortDescription: "Gitcoin's GG23 predictive funding experiment invited data scientists to forecast $1.5M in grant allocations in a 36-hour window, with 11 submissions and a winning RMSE of 0.016 — demonstrating predictive models can enhance scalability, collusion resistance, and allocation signal quality."
tags:
  - gitcoin
  - quadratic-funding
  - grants
  - data-science
  - prediction-markets
lastUpdated: '2026-03-10'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns:
  - gitcoin-grants-23-gg23
banner: /content-images/case-studies/gg23-predictive-funding-challenge-retrospective/banner.png
---

**TL;DR**

Gitcoin conducted a predictive funding experiment during GG23 where data scientists forecasted how $1.5M in grants would be distributed. Eleven models were submitted within a 36-hour window, with the winning entry achieving an error score of 0.016—substantially better than random prediction (~0.04). The initiative demonstrated that predictive modeling and prediction markets can enhance grant scalability, detect anomalies, and engage technical communities.

**Background**

In early 2025, Gitcoin launched a data science competition inviting model builders to predict GG23 funding allocations before the round commenced. A $10,000 prize pool, jointly funded by Gitcoin and the Ethereum Foundation Unblocking Pilots team, tested whether models could reliably estimate funding outcomes. Potential benefits included engaging data science communities, surfacing anomalous results indicating manipulation, and enabling "shadow rounds" using previous winning models for new project evaluation.

**Recap**

The application deadline was March 31st, 2025, with the round opening April 2nd—creating a 36-hour prediction window. Prize distribution: $5,000 first place, $3,000 second, $2,000 third. Mandatory model writeups were required for prize consideration.

**Results**

*Participation:* Eleven valid submissions received, with seven providing model documentation.

![Leaderboard of all participants in the Predictive Funding Challenge](/content-images/case-studies/gg23-predictive-funding-challenge-retrospective/01-leaderboard-predictive-funding-challenge.jpeg)

*Performance:* Evaluated using root mean squared error (RMSE), lower scores indicate accuracy:
- 1st: David Gasquez—0.016
- 2nd: Omniacs DAO—0.0173
- 3rd: Limonada—0.018

Random models score approximately 0.04. The lowest-ranked submission scored 0.034, showing significant variance between top performers.

*Information Surfacing:* Winning models employed XGBoost algorithms with feature engineering, emphasizing contributor counts, per-contributor amounts from previous rounds, and project sentiment scores.

**Takeaways**

Three recommendations emerged:

1. **Scalability**: Predictive competitions reduce grant administration costs by generating reusable models for future rounds.

2. **Collusion Resistance**: Independent allocation lists provide fallback options if fraud detection suggests manipulation, deterring sybil attacks since attackers cannot guarantee their efforts translate to funding.

3. **Markets**: Concurrent prediction markets attract traders while surfacing collective expectations and providing additional allocation signals.

![Division between Ethereum clients using 3 separate allocation lists](/content-images/case-studies/gg23-predictive-funding-challenge-retrospective/03-ethereum-clients-allocation-division.png)

**Limitations**

Implementation requires: publicly disclosed funding results, sufficient time between eligibility and allocations for modeling, and clear frameworks preventing operator bias in list selection.

**What's Next**

Future grant rounds should integrate data science contests and prediction markets. Gitcoin's business opportunity involves becoming a platform where tested models are queried by funders for allocation guidance.

---

*Source: [Original post on Gitcoin Governance Forum](https://gov.gitcoin.co/t/gg23-predictive-funding-challenge-retrospective/25163)*
