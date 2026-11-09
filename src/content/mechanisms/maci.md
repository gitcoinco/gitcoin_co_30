---
id: '1788963300142'
slug: maci
name: "MACI (Minimal Anti-Collusion Infrastructure)"
shortDescription: "Private on-chain voting that hides individual ballots behind encryption and zk-SNARKs so quadratic funding and governance rounds can resist bribery — if the coordinator is honest."
tags:
  - privacy
  - voting
  - quadratic
  - verification
lastUpdated: '2026-09-09'
relatedMechanisms:
  - quadratic-funding
  - quadratic-voting
relatedApps: []
relatedCaseStudies:
  - gg24-privacy-round-retrospective
relatedResearch:
  - quadratic-funding-sybil-resistance
relatedCampaigns:
  - gitcoin-grants-24-gg24
banner: /content-images/mechanisms/maci/banner.png
---

**Minimal Anti-Collusion Infrastructure (MACI)** is an Ethereum voting protocol that encrypts ballots on-chain and proves the tally with zk-SNARKs, so a voter cannot produce a receipt a briber can trust. It is not itself a matching formula. It is a **privacy and anti-collusion layer** that quadratic funding, quadratic voting, and similar public-goods rounds can sit on when the vote would otherwise be a public Ethereum transaction.

Vitalik Buterin sketched the design in 2019. Privacy & Scaling Explorations (PSE) at the Ethereum Foundation maintains the current implementation (v3.x as of 2026). Frontends such as [Privote](https://privote.live) and older apps such as [clr.fund](https://clr.fund) wrap it for operators.

MACI does **not** replace Gitcoin Passport, Human Passport, or any other identity system. It assumes each eligible voter already controls a unique Ethereum key. Collusion resistance holds only while the **coordinator** who holds the decryption key stays honest. A dishonest coordinator can still see votes and can refuse to publish a tally; they cannot forge a false one.

## How It Works

Plain on-chain voting fails two of the properties a funding round needs. Ethereum already gives correct execution and (fee-permitting) inclusion. It does not give ballot privacy, and it makes bribery easy: a voter can show a transaction that proves how they voted, or a contract can pay them automatically for that proof.

MACI splits the process between voters and one coordinator.

1. **Sign-up.** Eligible keys register with the MACI contract. Eligibility is whoever the operator already decided is a unique human — Passport, an allowlist, a previous round roster. MACI does not decide that.
2. **Encrypt and submit.** The voter encrypts the ballot to a key the coordinator can decrypt, then posts the ciphertext on-chain. Anyone can see that a message was sent. Nobody except the coordinator (and the voter) can read the choice.
3. **Key-change / overwrite.** A voter can submit a later message that replaces the earlier one. That is the receipt-freeness trick: a screenshot of “I voted for A” is worthless, because a later message may have changed the vote, and a briber cannot tell.
4. **Off-chain tally, on-chain proof.** After the poll closes, the coordinator decrypts, applies the state transitions, and produces a tally plus zk-SNARK proofs that (a) only valid messages were processed and (b) those messages sum to the published result. The contracts verify the proofs. Anyone can check them.
5. **Publish or halt.** If the coordinator never submits the proofs, the round does not resolve. That is a liveness failure, not a silent rewrite of the numbers.

Quadratic funding on MACI is the same matching math as ordinary QF, computed over hidden ballots. Gitcoin’s GG24 Privacy domain ran that pattern through Privote rather than through a public QF explorer.

## Advantages

- **Bribes get expensive to verify.** A buyer cannot cheaply check that the seller actually voted as promised, which is the property QF needs when matching weights unique humans.
- **Public result, private ballots.** Smart contracts and observers can verify the tally without a public vote graph that invites bandwagoning and targeted harassment.
- **Coordinator cannot fake the math.** zk-SNARKs bind the published result to the on-chain message tree. Censorship of an already-included message, or stuffing extra votes, should fail proof verification.
- **Composable with QF and QV.** The protocol is a ballot box, not a new allocation ideology. Operators keep their matching formula.

## Limitations

- **Trusted coordinator.** The coordinator can decrypt every ballot. If they collude with a briber, receipt-freeness collapses for that round. PSE’s own docs state this; it is not an edge case.
- **Liveness hostage.** The same coordinator can stall forever by never posting the tally. They cannot publish a *wrong* tally. They can publish *none*.
- **Identity is out of scope.** MACI does not stop one person with many keys. Passport, ZKPassport, or an allowlist still has to sit in front. GG24 still needed Human Passport as a gate.
- **Operational friction.** The GG24 Privacy retrospective recorded contract-redeploy / duplicate-application pain and voter trouble submitting votes. Operators were told to move to a later Privote frontend and MACI v3 for UX, not because the cryptography failed.
- **Complexity and circuits.** Trusted setup, witness generation, and coordinator infrastructure are heavier than a Snapshot poll. Small communities that are not actually being bribed pay that cost for little gain.

## Best Used When

- A quadratic funding or quadratic voting round is large enough that vote-buying or copy-the-leaderboard is a real attack, not a blog hypothetical
- The operator can name a coordinator the community will tolerate seeing ballots (or can run that software in a TEE)
- An identity system already exists; MACI is being added *on top*
- The round can survive a delayed or missing tally (or has a social fallback)

Skip it for tiny, high-trust crews, for token-weighted votes where whales are the point, and for any process that must remain live even if one operator disappears.

## Examples and Use Cases

### GG24 Privacy round (Oct 2025)

Gitcoin’s Privacy domain used MACI private voting via Privote, with Human Passport as the gate. The retrospective on this directory: 121 applications, 93 accepted, 7,427 QF votes, 35.41 WETH raised, ~$13k in community donations. Operators credited hidden ballots with reducing manipulation; they also listed matching-pool size, last-minute contract issues, and frontend UX as the things that did *not* work. That is a live Ethereum public-goods deployment, not a whitepaper.

### clr.fund and Allo `MACI_QF`

clr.fund wrapped MACI so permissionless QF rounds could hide contribution graphs. Gitcoin’s Allo stack has a `MACI_QF` strategy for the same composition: quadratic matching over a private ballot box. Treat vendor TVL claims as unverified unless you can trace them on-chain.

### DAO polls on Privote

Privote exposes MACI as a general private-poll product (the Gitcoin Privacy poll is one of the ended examples on the site). Same coordinator assumption, smaller stakes.

## Further Reading

- [MACI documentation (PSE, v3.x)](https://maci.pse.dev/docs/introduction)
- [Vitalik Buterin — Minimal anti-collusion infrastructure (ethresear.ch, 2019)](https://ethresear.ch/t/minimal-anti-collusion-infrastructure/5413)
- [GG24 Privacy Round Retrospective (this directory)](/case-studies/gg24-privacy-round-retrospective)
- [Privote](https://privote.live)
- [PSE — State of Private Voting 2026](https://pse.dev/articles/state-of-private-voting-2026/state-of-private-voting-2026-v2.pdf)
