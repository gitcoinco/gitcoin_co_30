---
id: '1772727445381'
slug: ethereum-has-ens-for-people-what-about-everything-else
name: "Ethereum Has ENS for People. What About Everything Else?"
shortDescription: "Two companion ERCs (8185 + 8186) for mapping off-chain entities to Ethereum addresses and pre-funding them before registration."
tags:
  - identity
  - public-goods
  - funding
  - ai-agents
  - registry
  - escrow
  - ERC
researchType: Opinion
lastUpdated: '2026-03-05'
relatedMechanisms:
  - quadratic-funding
  - direct-grants
relatedApps:
  - gitcoin-grants-stack
  - allo-protocol
relatedCaseStudies:

relatedResearch:
  - plural-funding-mechanisms
relatedCampaigns:

banner: /content-images/research/ethereum-has-ens-for-people-what-about-everything-else/banner.png
---

# Ethereum Has ENS for People. What About Everything Else?

Ethereum has ENS for addressing people. But what about everything else?

A GitHub repository. An npm package. A DNS domain. A YouTube channel. These are the entities that build, maintain, and power the internet — and none of them have an Ethereum address.

This creates a problem that every funding protocol has solved independently:

- **Drips** built a custom oracle to map GitHub repos to addresses.  
- **Gitcoin** maintains its own project registry.  
- **Every new protocol** that needs to send money to "the maintainers of react" has to build another bespoke system from scratch.

We've been building the same plumbing over and over. It's time for a shared primitive.

## Two Companion ERCs

We've submitted two ERCs ([PR #1580](https://github.com/ethereum/ERCs/pull/1580)) that solve this at the protocol level:

### ERC-8185: Off-Chain Entity Registry

A single, shared registry that maps off-chain identifiers to Ethereum addresses.

```  
ownerOf(keccak256("github", "ethereum/go-ethereum")) → 0xabc...  
```

That's it. One call. Any protocol, any agent, any dapp can resolve any off-chain entity to an Ethereum address — permissionlessly, on-chain, with no API keys or trusted backends.

Ownership is proven through pluggable verifier contracts. Today, that means oracle-signed proofs. Tomorrow, it means zero-knowledge verification (zkTLS, DNSSEC). The registry doesn't change — only the verifiers upgrade.

### ERC-8186: Claimable Escrow

The registry solves *who owns what*. The escrow solves *how to pay them before they show up*.

Every identifier in the registry has a **deterministic deposit address** — computable by anyone, before the entity has ever touched Ethereum. Fund `github:org/repo` today. The maintainers claim it whenever they're ready.

This means a grants protocol can allocate funding to every dependency in a project's supply chain in a single transaction, without any of those maintainers having registered first. The money waits for them.

## Why Now: The Agent Moment

This infrastructure was always needed. But the rise of AI agents makes it urgent.

An agent instructed to "fund the maintainers of react" needs to:  
1. Resolve the identifier to an Ethereum address  
2. Compute a deposit address if nobody has registered yet  
3. Transfer tokens — in one transaction, with no human coordination

Without a shared registry, every agent framework would need its own identity resolution backend. That's the fragmentation problem all over again, but at machine scale.

With these ERCs, any agent, any framework, one `ownerOf` call. Entity resolution becomes a solved problem.

## Design Philosophy

**Minimal surface area.** The registry is a pure mapping — it holds no funds, charges no fees, has no privileged operators beyond verifier governance.

**Pluggable verification.** The `IVerifier` interface is a single function: `verify(id, claimant, proof) → bool`. It supports oracles today and ZK proofs tomorrow, with zero changes to the registry.

**No transfer function.** Changing the registered address requires revoking and re-claiming with a new proof. Ownership is always tied to verified control of the off-chain entity — not to whoever holds a private key.

**Architecturally independent.** The registry and escrow are separate ERCs. Protocols that only need identity resolution depend on the registry alone. The escrow is optional — and replaceable.

## The Path to Canonical

ENS became canonical because it was a single deployment that every wallet, dapp, and block explorer integrated. We're building for the same outcome:

1. **Standard first** — the ERCs establish the interface  
2. **Single deployment** — one registry per chain, a shared Schelling point  
3. **Early integrations** — protocols that already need entity resolution (Gitcoin, Drips, and others) adopt the shared primitive instead of maintaining their own  
4. **Agent adoption** — agent frameworks integrate `ownerOf` as the default resolution layer

The code is written. The [reference implementation](https://github.com/carlbarrdahl/ethereum-canonical-registry) includes the registry, oracle verifiers for GitHub and DNS, the escrow module, a TypeScript SDK, and backend signing services.

## Get Involved

- **ERC PR:** [ethereum/ERCs#1580](https://github.com/ethereum/ERCs/pull/1580)  
- **Reference implementation:** [ethereum-canonical-registry](https://github.com/carlbarrdahl/ethereum-canonical-registry)  
- **Ethereum Magicians:** [Discussion thread](https://ethereum-magicians.org/c/ercs/57)  
- **Gitcoin Forum:** [Discussion thread](https://gov.gitcoin.co/t/ethereum-has-ens-for-people-what-about-everything-else/25152)

We're looking for feedback on the verifier interface, the identifier scheme, and which protocols should integrate first.

- Authors: @carlbarrdahl  
- Sources: [ERC-8185](https://github.com/ethereum/ERCs/pull/1580), [Reference Implementation](https://github.com/carlbarrdahl/ethereum-canonical-registry)
