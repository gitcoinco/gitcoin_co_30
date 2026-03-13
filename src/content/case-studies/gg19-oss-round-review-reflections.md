---
id: '1741300000010'
slug: gg19-oss-round-review-reflections
name: "GG19 OSS Round Review: Reflections"
shortDescription: "The GG19 Open Source Software round review reflects on timing trade-offs, passport friction, and platform challenges — including concurrent events, PGN limitations, and eligibility process improvements."
tags:
  - gitcoin
  - quadratic-funding
  - grants
  - oss
  - open-source
lastUpdated: '2023-12-15'
relatedMechanisms:
  - quadratic-funding
relatedApps:
  - gitcoin-grants-stack
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
banner: /content-images/case-studies/gg19-oss-round-review-reflections/banner.png
---

# GG19 OSS Round Review: Reflections

**Original Post by sejalrekhan and M0nkeyFl0wer**

---

Co-authored by [@sejalrekhan](https://gov.gitcoin.co/u/sejalrekhan) and [@M0nkeyFl0wer](https://gov.gitcoin.co/u/m0nkeyfl0wer). Thanks to [@jon-spark-eco](https://gov.gitcoin.co/u/jon-spark-eco) and everyone else on the Grants Program Team who contributed their feedback and thoughts to this reflection document.

This post is purely a reflection of the operational aspects of the last round. Our aim is to share insights and experiences to foster continuous improvement and collective learning. Please feel free to add your own thoughts and reflections in the comments below and/or in the survey at this [link](https://docs.google.com/forms/d/e/1FAIpQLSeIrMNxy2FR0ICP2cnRTWkA0IhYOu9nuvUJNKOudONv3YUa3A/viewform).

## Timing and Participation levels

As we reflect on the round, one key area of contemplation is its timing. In hindsight, we wonder if some adjustment to the timing could have yielded better results. The decision to schedule GG19 applications opening concurrently with Devconnect may merit reconsideration. We also find ourselves wondering if American Thanksgiving mid round reduced effectiveness and engagement. This retrospection is crucial for understanding how timing influences our outcomes and for guiding future planning strategies.

The difficulty with the timing of the round in the last quarter of the year was a mix of waiting for new features to be pushed to the platform as well as trying to navigate not getting too close to the holiday season. In this case, we felt it was important to wait for some critical new features to be completed and integrated into Grants Stack before the round began. The new features in this round were well received and dramatically increased the user experience so in that sense this seems like it was the right decision but it came with some trade-offs in terms of timing.

Big shout out to the Grants Stack team for all the great new features they pushed for this round as well as for the quick support they provided for any bugs or issues that occurred mid-round. Cross-workstream coordination and collaboration have been going well. In particular, the matching fund estimates, the search functionality, and the collections were a big hit with community members as well as the new report card functionality. The integration of Karma into grantees proposal is also another exciting new innovation.

This round was smaller than GG18 in terms of the number of donors and the amount donated overall. We have explored a variety of reasons that this may have been the case. Beyond timing considerations, several other factors that might have contributed to the diminished engagement in the round. We are exploring donor fatigue, the simultaneous occurrence of other events, such as the Optimism round (RPGF 3), the round deployed on PGN, and potentially diluted attention and resources. Also the relatively limited funds available in our round could have reduced its appeal. This insight into the interplay of various elements provides a valuable perspective for future planning and execution. Again please feel free to provide your perspective on these considerations.

![Donor participation chart](/content-images/case-studies/gg19-oss-round-review-reflections/02-donor-participation-chart.png)

![Funding analysis visualization](/content-images/case-studies/gg19-oss-round-review-reflections/03-funding-analysis-visualization.png)

![GG19 metrics comparison](/content-images/case-studies/gg19-oss-round-review-reflections/04-gg19-metrics-comparison.png)

## Eligibility and Review

For this OSS round we were more open to letting in a wider range of grantees and letting the community decide what to fund. That being said we continue to use Github repos as a key indicator of the level of activity and age of a project and some grantees were rejected if they seemed to not be a real project or not be actively working on the project. This was a quantitative measure as opposed to a qualitative measure. We intend to illustrate credible neutrality and to push as much of the decision making out to the community as possible and to trust the QF mechanism to do the heavy lifting. One potential draw back of this approach is making it harder to navigate a larger number of applications and find high quality projects. Then again deciding what is high quality may also be subjective. We continue to explore tools and approaches that can draw upon attestations, onchain data and repositories of code to streamline this process and make it easier for donors to navigate.

The duration we kept the application process open—before and during the round—could use some refinement. There appears to have been some confusion surrounding the early bird deadline, leading some to mistakenly believe that they could no longer apply after this date. This misinterpretation underscores the need for clearer communication and perhaps a reevaluation of our timeline for accepting applications. A bunch of people also applied in the last days of the round. We could have more effectively conveyed that applications received after the mid way point of the round would not likely be considered for review. This oversight highlights the importance of clearer and more direct communication about key deadlines in the future.

Leaving the applications open throughout the round did give our team the ability to support grantees effectively when they had issues applying before the round started and the early bird deadline helped us ensure all reviews were done before the round started and did not require teammates to "burn the midnight oil" and work full time through the weekend to accomplish this.

One other issue with the application process was the communication around the request for a second look (aka appeals). We have improved grantee communications to include reasons projects could not be approved but it was not clear enough what the timing would be for second looks. The intention was for this to be done at the mid way point of the round but in practice requests came in sporadically and were dealt with on a case by case basis.

The deadline for submitting appeals was not communicated with sufficient clarity. This lack of clear communication may have led to misunderstandings about the timeframe within which appeals needed to be filed. Going forward, it's crucial to ensure that such critical deadlines are conveyed more explicitly to avoid any confusion.

## Passport

Reflecting on the challenges faced by many community members in GG19, it became apparent that new grantees found it challenging to achieve the necessary scores. Approximately 24% of donors were not able to achieve a score of over 15 and 50% didn't get over a score of 20 which essentially means half the donors didn't maximise their match. Participation in past rounds seems to be the best route to achieving a high score for many but new donors are at a disadvantage. The option to stake GTC was a viable option but also presented difficulties for many as they had to trade for token and incur additional gas fees. This experience leads us to consider alternative approaches, such as coordinated 'identity staking' sessions between rounds, where individuals could stake on each other's identities and help achieve passport scores in advance. One approach would be to partner with groups like Holonym on these sessions and to walk community members through how to use their tools to increase their scores. It would be great if participants who complete these sessions could receive a 'stamp', signifying their enhanced credibility and understanding of the system.

## PGN

Reflecting on our experience with PGN, we acknowledge that while the last round was mostly smooth there were several issues that emerged due to some of limitations with the Public Goods Network in its current form. The absence of a multisig, the lack of a DEX, and restricted bridging options introduced additional complexities, particularly as we operated different rounds on various chains. This led to significant challenges. Ideally if we either had a way to check out with one transaction across various chains or to simply run our rounds on a smaller number of networks overall would be better. Also we may want to reconsider if its a good idea to run more rounds on PGN until some of these fundamental issues are resolved.

## Conclusions

Overall we are happy with the way things went in GG19. Even given some of the friction involved and market conditions continuing to be suboptimal we saw thousands of donors and hundreds over 600k raised directly from the community which was our goal. That being said, we are eager to continue to refine this process and will continue to iterate on how these rounds are run based on the feedback we receive. Thanks again for being part of making these rounds magical and such an important part of the web3 experience.

![Celebration](/content-images/case-studies/gg19-oss-round-review-reflections/05-celebration-gif.gif)

---

*Source: [Original post on Gitcoin Governance Forum](https://gov.gitcoin.co/t/gg19-oss-round-review-reflections/17278)*
