---
id: '5'
slug: streaming
name: Token Streaming
shortDescription: >-
  Continuous, real-time transfer of tokens from sender to recipient, enabling
  salary streams, subscriptions, and ongoing funding flows.
heroImage: /images/streaming-hero.jpg
category: streaming
howItWorks: |-
  1. Sender creates a stream with token and flow rate
  2. Tokens continuously transfer in real-time
  3. Recipient can withdraw accumulated funds anytime
  4. Stream continues until stopped or funds depleted
  5. Can be combined with other DeFi primitives
advantages:
  - Improved cash flow for recipients
  - Real-time compensation
  - Reduced counterparty risk
  - Composable with DeFi
  - Automatic, requires no manual transactions
limitations:
  - Requires consistent sender balance
  - Gas costs for modifications
  - Complex accounting
  - Limited to compatible tokens
  - Learning curve for users
bestUsedFor:
  - Ongoing salaries and compensation
  - Subscription services
  - Continuous grants
  - Vesting schedules
implementations:
  - superfluid
  - drips
  - protocol-guild
technicalResources:
  - title: Superfluid Documentation
    url: https://docs.superfluid.finance
    type: article
  - title: Drips Protocol
    url: https://docs.drips.network
    type: article
originYear: 2020
relatedMechanisms:
  - direct-grants
  - milestone-based
tags:
  - streaming
  - real-time
  - continuous
  - compensation
lastUpdated: '2024-12-01'
---

Token streaming enables continuous, real-time transfer of tokens. Instead of lump sum payments, funds flow constantly from sender to recipient at a defined rate per second.

This enables new financial primitives like real-time salary payments, continuous subscriptions, and streaming grants. Recipients can access their earned funds at any moment, improving cash flow and reducing trust requirements.

Protocols like Superfluid and Drips have pioneered this approach.