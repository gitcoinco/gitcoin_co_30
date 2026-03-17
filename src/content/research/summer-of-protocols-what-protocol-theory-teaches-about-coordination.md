---
id: '1741190400002'
slug: summer-of-protocols-what-protocol-theory-teaches-about-coordination
name: "Summer of Protocols: What Protocol Theory Teaches Us About Coordination"
shortDescription: "The Ethereum Foundation-funded Summer of Protocols initiative revealed protocols as civilization's dark matter — and its findings reshape how we think about public goods funding."
tags:
  - protocols
  - coordination
  - governance
  - infrastructure
  - institutional-design
researchType: Report
lastUpdated: '2026-03-05'
relatedMechanisms:
  - direct-grants
  - quadratic-funding
relatedApps:
  - allo-protocol
  - protocol-guild
relatedCaseStudies: []
relatedResearch:
  - our-choices-our-world-thriving-together
  - a-networked-epistemology
  - the-dao-of-daos
  - protocols-for-postcapitalist-expression
relatedCampaigns: []
banner: /content-images/research/summer-of-protocols-what-protocol-theory-teaches-about-coordination/banner.png
authors:
  - "Kevin Owocki"
---

> **TLDR:** The Ethereum Foundation-funded Summer of Protocols united 33 researchers to ask: what is a protocol, really? Their answer: protocols are civilization's dark matter — invisible coordination infrastructure that shapes everything from traffic patterns to Ethereum itself. Understanding protocols reshapes how we design public goods funding.


## The Summer That Took Protocols Seriously

In March 2023, the writer and thinker Venkatesh Rao announced an unusual research initiative on his blog Ribbonfarm. Funded by the Ethereum Foundation, the Summer of Protocols would bring together 33 researchers from wildly different fields — architecture, law, game design, technology, media, art, workplace safety — for a collaborative investigation into a deceptively simple question: **what is a protocol, really?**

The premise was that protocols are everywhere yet curiously understudied. We live inside protocols constantly — from the TCP/IP stack that delivers this webpage to the social norms that govern how we greet strangers to the regulatory frameworks that structure financial markets. Yet despite their ubiquity, protocols as a category had no dedicated field of study. No department of protocol theory. No canonical textbook. The Summer of Protocols aimed to change that.

What emerged from the initiative — captured in Rao's pilot study "The Unreasonable Sufficiency of Protocols" and dozens of subsequent research papers — offers a framework with profound implications for how we think about public goods funding, coordination mechanisms, and the future of onchain governance.

## Protocols as the Dark Matter of Civilization

Rao's central metaphor is striking: protocols are the "dark matter" of civilization. Like dark matter in astrophysics — invisible, pervasive, and responsible for holding visible structures together — protocols operate beneath the surface of human coordination, shaping behavior without being directly observed.

Consider: when you drive on the right side of the road, you are following a protocol. When a doctor washes their hands before surgery, they are executing a protocol. When nodes on the Ethereum network validate transactions, they are running a protocol. When diplomats exchange credentials, when air traffic controllers sequence landings, when strangers form an orderly queue — protocols are doing the invisible work of coordination.

The key insight from Rao and his collaborators is that "the evolutionary history of protocols forms a somewhat independent layer of the civilizational stack that mediates between material and social realities." Protocols are not merely rules or standards. They constitute an independent category of social technology — one that has been growing in importance as human coordination scales beyond what informal norms and centralized institutions can manage.

The pilot study argues that protocols are "unreasonably sufficient" — meaning they solve more of the coordination problem than we expect, more completely than we expect, relative to their size and complexity. A protocol like TCP/IP, which can be described in a few pages, coordinates the communication of billions of devices. The Ethereum protocol, encapsulated in a yellow paper, coordinates a global financial system. This is an unreasonable ratio of simplicity to effect — and it suggests that protocols have properties worth studying systematically.

## What Makes a Protocol a Protocol?

One of the Summer of Protocols' most valuable contributions is taxonomic: distinguishing protocols from related but distinct concepts like platforms, institutions, standards, and norms.

**Protocols vs. Platforms.** This is perhaps the most important distinction for the web3 community. A platform is a centralized system that mediates interactions between participants, extracting value through its position as intermediary. Twitter, Uber, and the App Store are platforms. A protocol is a set of rules that participants follow to interact directly, without a mediating intermediary capturing value. HTTP, SMTP, and Ethereum are protocols.

The distinction matters because platforms and protocols represent **competing visions for how coordination should work**. The platform model concentrates power and value in the entity that controls the platform. The protocol model distributes power and value among participants who follow shared rules. The history of the internet can be read as an oscillation between these two models — open protocols (email, the web) creating value that is subsequently captured by platforms (Gmail, Facebook), which then face pressure from new protocols (blockchain, federated social media) that attempt to re-open the captured space.

**Protocols vs. Institutions.** Institutions (governments, corporations, universities) are organizations with persistent identity, resources, and authority. Protocols are rules that can exist independently of any single institution. The protocol for handshaking does not require a Handshake Authority. The Ethereum protocol persists even if the Ethereum Foundation dissolved tomorrow. This independence is what gives protocols their resilience — and what makes them challenging for institutional thinkers to understand.

**Protocols vs. Standards.** Standards describe specifications — what things should look like or how they should be measured. Protocols describe processes — sequences of actions that participants perform. A standard says "electrical outlets should have three prongs." A protocol says "when you want to connect to a network, first send a SYN packet, then wait for a SYN-ACK response, then send an ACK packet." Standards are static specifications; protocols are dynamic interaction patterns.

**Protocols vs. Norms.** Social norms are informal, implicit, and enforced through social pressure. Protocols are explicit, documented, and often enforced through technical mechanisms. The norm of tipping at a restaurant is informal and varies by culture. The protocol for processing a credit card transaction is explicit and identical everywhere. The evolution from norms to protocols often marks a transition from small-scale to large-scale coordination.

## Dangerous Protocols: Nadia Asparouhova's Corrective

Not everyone in the Summer of Protocols cohort shared an uncritical enthusiasm for protocol-ification. Nadia Asparouhova (formerly Nadia Eghbal, author of *Working in Public*) contributed one of the program's most important essays: "Dangerous Protocols."

Asparouhova's argument is a necessary corrective to the tendency in web3 circles to treat protocols as inherently liberating. Drawing on Alexander Galloway's 2004 book *Protocol: How Control Exists after Decentralization*, she argues that protocols are not simply alternatives to centralized control — they are a *different form* of control. Galloway's central thesis is that "the founding principle of the Net is control, not freedom, and that the controlling power lies in the technical protocols that make network connections (and disconnections) possible."

Asparouhova identifies a paradox at the heart of protocol advocacy: protocols are frequently touted as the liberating alternative to walled technological gardens, but **the historical purpose of protocols has always been to simplify decision-making and reduce human agency**. When you follow a protocol, you do not decide what to do — you execute a predetermined sequence. This is the source of both protocols' power (they scale coordination by removing the need for individual judgment) and their danger (they can remove agency from participants who never consented to the protocol's terms).

She borrows Galloway's framing: protocols are not good or bad — they are "dangerous." They are powerful tools that can serve either liberation or control, depending on who designs them, who can modify them, and who can exit them.

This maps directly onto debates in the public goods funding space. When Gitcoin implements a protocol for quadratic funding, it enables permissionless participation — but it also encodes specific assumptions about what counts as a legitimate project, how Sybil resistance should work, and how matching funds should be allocated. These are design choices baked into the protocol, and they shape outcomes in ways that participants may not fully understand. The question is not whether to use protocols but how to design them with appropriate attention to power, agency, and exit rights.

## Protocol Design Patterns

Across the Summer of Protocols research, several design patterns emerged that are directly relevant to public goods funding:

### Permissionlessness

A well-designed protocol allows anyone to participate without requiring approval from a gatekeeper. This is the principle that distinguishes Ethereum from a traditional database: anyone can deploy a smart contract, without asking permission from the Ethereum Foundation or any other authority. In public goods funding, permissionlessness means that any project can apply for funding, any contributor can participate in allocation decisions, and the rules are transparent and equally applied.

### Composability

Protocols become more powerful when they can be combined. The DeFi ecosystem demonstrates this: lending protocols compose with exchange protocols compose with yield protocols, creating functionality that no single protocol could provide alone. In public goods funding, composability means that allocation mechanisms (quadratic funding, retroactive funding, direct grants) can be combined and layered, with the output of one mechanism feeding into another. Allo Protocol, Gitcoin's onchain infrastructure, is explicitly designed around this principle — providing a composable substrate for diverse allocation strategies.

### Credible Neutrality

A term popularized by Vitalik Buterin, credible neutrality means that a protocol can be observed to not discriminate against any particular participant. The protocol treats all inputs by the same rules, regardless of who provides them. This is critical for public goods funding mechanisms, where trust in the fairness of allocation is essential for participation. If participants believe the mechanism favors insiders or is subject to manipulation, they will not participate — and the mechanism fails.

### Hardness

Rao dedicates significant attention to the concept of "hardness" — the degree to which a protocol resists modification. Hard protocols (like TCP/IP or the Bitcoin consensus rules) are extremely difficult to change, which makes them reliable but inflexible. Soft protocols (like social norms or organizational policies) are easily modified, which makes them adaptive but unreliable. The art of protocol design lies in finding the right hardness for the context — hard enough to be trustworthy, soft enough to evolve.

For public goods funding, this maps onto a key tension: mechanisms need to be stable enough that participants trust them across multiple rounds, but flexible enough to adapt to new information about what works and what does not.

## Protocols vs. Platforms as Competing Visions

The Summer of Protocols research crystallizes a debate that has been simmering in the web3 community since its inception: should coordination infrastructure be organized as protocols or platforms?

The platform model is familiar and proven. Platforms like GoFundMe, Kickstarter, and Patreon have successfully coordinated billions of dollars in funding. They work by providing a curated experience, handling payment processing, managing trust, and taking a percentage of transactions. The platform model's strength is user experience and trust; its weakness is rent extraction, censorship risk, and vendor lock-in.

The protocol model is less proven but more ambitious. By encoding coordination rules into open, permissionless, composable smart contracts, the protocol model aims to create funding infrastructure that is owned by no one, operated by everyone, and resistant to capture. Allo Protocol and Gitcoin Grants Stack represent this vision: rather than building a platform that mediates between funders and projects, they build protocols that funders and projects can use directly.

The trade-off is real. Protocols are harder to use, harder to govern, and harder to iterate on than platforms. They require participants to manage their own keys, understand gas fees, and navigate unfamiliar interfaces. But protocols offer something platforms cannot: **credible commitment to neutrality**. A platform can change its rules at any time, delist projects, adjust algorithms, or raise fees. A protocol, once deployed, operates according to its code — and modifications require transparent governance processes.

The Summer of Protocols research suggests that the future is not purely one model or the other but a layered architecture: protocols at the infrastructure level, providing credible neutrality and composability, with platform-like interfaces at the application level, providing usability and curation. Protocol Guild, which funds Ethereum core protocol developers through an onchain mechanism, exemplifies this hybrid: the underlying allocation protocol is transparent and rule-based, while the interface and community management have platform-like qualities.

## Retrofitting the Web: Dorian Taylor's Vision

One of the more provocative contributions to the Summer of Protocols came from Dorian Taylor, a designer and technologist who has spent years working on what he calls "retrofitting the web." Taylor's argument, discussed on the GreenPill podcast, is that the original web was designed as a protocol-first system (HTML, HTTP, URLs) but has been progressively captured by platform dynamics (search engines, social media, app stores).

Taylor's project — centered on a tool called the Intertwingler — aims to rebuild the web's protocol layer, restoring the direct, peer-to-peer information exchange that the original web protocols enabled but that platforms have intermediated. The vision is not to replace the web but to retrofit it — to reintroduce protocol-level coordination into an infrastructure that has drifted toward platform-level control.

This resonates with the public goods funding challenge. The current funding landscape is dominated by platform-like structures: grant programs administered by foundations, funding rounds managed by specific organizations, donation flows intermediated by payment processors. The protocol-first alternative is funding infrastructure that operates at the protocol level — composable, permissionless, and credibly neutral — allowing any community to instantiate its own funding mechanisms without depending on a specific platform provider.

## Lessons for Public Goods Funding

The Summer of Protocols' research yields several concrete lessons for the public goods funding space:

**1. Study the protocols you already use.** Every funding mechanism is a protocol — a set of rules that participants follow to coordinate resource allocation. Making these rules explicit, studying their properties, and comparing them to alternatives is the first step toward better mechanism design. Most funding "innovations" are actually rediscoveries of protocol patterns that have existed in other domains.

**2. Design for the right hardness.** Funding protocols need to be hard enough to be trustworthy (participants need confidence that the rules will not change mid-round) but soft enough to evolve (mechanisms need to adapt based on evidence of what works). This suggests a layered approach: hard core protocols for basic allocation logic, softer governance protocols for parameter adjustment and mechanism selection.

**3. Embrace composability.** Rather than building monolithic funding platforms, build composable funding protocols that can be combined in novel ways. Quadratic funding for community preference signaling, composed with retroactive funding for proven impact, composed with direct grants for strategic priorities — each component a simple protocol, the combination producing sophisticated allocation behavior.

**4. Take the danger seriously.** Asparouhova's warning applies directly: funding protocols encode power. Who designs the protocol? Who can modify it? Who benefits from its default settings? These are not technical questions — they are political questions that deserve transparent deliberation.

**5. Protocols need narratives.** The Summer of Protocols itself succeeded in part because it had a compelling narrative — that protocols are civilization's dark matter, worthy of serious study. Funding protocols similarly need narratives that explain why they matter, how they work, and what futures they enable. The protocol layer and the narrative layer are not separate — they are co-constitutive.

## Conclusion: The Protocol Turn

The Summer of Protocols represents something significant: the beginning of a serious, cross-disciplinary investigation into the nature of protocols as social technology. By bringing together researchers from architecture, law, safety engineering, game design, and technology, the initiative revealed that protocol thinking — the art of designing minimal rule sets that enable large-scale coordination — is not unique to computer science. It is a civilizational practice as old as language, as ubiquitous as handshakes, and as consequential as constitutional law.

For the public goods funding community, the protocol turn offers both a framework and a challenge. The framework: think about funding mechanisms not as products to be built but as protocols to be designed — minimal, composable, credibly neutral rule sets that enable coordination at scale. The challenge: take seriously the dangers that Asparouhova identifies, the hardness trade-offs that Rao explores, and the platform pressures that Taylor warns against.

The summer is over. The protocol work has just begun.

*Multiple GreenPill podcast episodes covered this research in depth, including Episode 95 with Venkatesh Rao, Episode 152 with Timber Schroff on workplace safety protocols, and Episode 153 with Nadia Asparouhova on dangerous protocols.*
