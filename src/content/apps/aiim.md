---
id: '1774470387337'
slug: aiim
name: "AI Internet-Meritocracy"
shortDescription: "The app asks AI, how much a given person should be paid. Prompt injections are handled by human voting."
banner: /content-images/apps/aiim/banner.png
logo: /content-images/apps/aiim/logo.png
tags:
  - "public-goods"
  - "multichain"
  - "open-source"
  - "ai"
  - "voting"
  - "meritocracy"
lastUpdated: '2026-07-24'
authors:
  - "Victor Porton"
relatedMechanisms:
  - ai
relatedApps:
  - giveth
relatedCaseStudies: []
relatedResearch: []
relatedCampaigns: []
---

- **Category**: App  
- **Status**: Beta  
- **App URL**: [merit.science-dao.org](https://merit.science-dao.org)
- **Website**: [science-dao.org/meritocracy/](https://science-dao.org/meritocracy/)
- **Launch Date**: May 2026  
- **Blockchains**: Ethereum, Celo, Polygon, Arbitrum, Optimism, Base, Mezo, Hedera, Solana, Bitcoin, Bitcoin Cash, Cosmos, Polkadot, Stellar, ICP
- **Social Links**: [X](https://x.com/SalariesScience) | [GitHub](https://github.com/vporton/meritocracy) | [LinkedIn](https://www.linkedin.com/company/88047718/) | [Facebook](https://www.facebook.com/SaalariesScience) | [Insta](https://www.instagram.com/salariesscience)

**AI Internet-Meritocracy (AIIM)** built by Victor Porton is a direct funding platform for researchers/scientists and open source developers. It distributes incoming funding according to AI’s decisions.

The app verifies users using secure authentication methods like GitHub and ORCID and using this information about the user asks AI how much salary this user is worth. Then it distributes (weekly) the salaries between users proportionally to the AI’s recommended salaries. It uses crypto with multiple tokens supported.

Prompt injection and severe plagiarism are filtered out using human voting (with Sybil secured through government IDs).

The queries to AI happen through storing a directed graph of actions in the database and executing them.

The app didn’t yet receive real financing, because it’s little known and is in beta testing. And there are just two users having finished registration.

The next stage (adversarial testing) is to try it with a little sum of real money. Then it should be rewritten as a fully-onchain ICP blockchain app.

## Release Status

This is a **beta** release. It needs:

- a security review
- the [adversarial testing](https://science-dao.org/adversarial/) for AI-related vulnerabilities

## Core Functionality

- **Salaries for all authors:** Salaries for all free software and research authors (without PhD requirement).
- **Continuous salaries:** Weekly salaries instead of waiting for a grant.
- **No grant writing:** Grant writing is replaced by once registering a few Web accounts (about 5min time once).
- **The scientific publication crisis solution:** The prompt to pay to marketers of under-represented products.
- **Human voting:** Prompt injection is contained by human voting.
- **Open-source implementation:** The AIIM platform code is open-source and available on GitHub.

### Verification and Accountability

Due to technical complexities in making the app non-custodial, the current version has a custodial wallet.

In order to minimize the probability of hacking, certain [security measures](https://science-dao.org/security-measures/) are to be implemented.

### Transparency

All AI and voting decisions are summarized and stored in the DB for future audits.

### Treasury Coordination

There are three kinds of treasuries:

- The Global one
- The national ones
- The European ones

The national and EU treasuries can be used by governments to finance science limited to their researchers, as a drop-in replacements of their existing science financing mechanisms.

### Community Governance

The community (Sybil-verified by national IDs) votes for (un)banning members of the community for prompt injection or severe plagiarism.

See also the article [AI Shouldn’t Judge Itself: Why Human Independence Is Essential for AI Governance](https://science-dao.org/ai-alignment/). A possible side effect of this may be, that machines will need people as voters and therefore a war with machines is canceled.

## How It Works

The current version of AIIM is a Node.js Web application with a remote PostgreSQL database and OpenAI models for AI. It holds a number of custodial crypto wallets.

AI calls and other operations are stored in the DB as a directed graph, in order to be able to use both batch (untested) or batch mode of OpenAI.

In the future, it is planned to rewrite it as a fully-onchain ICP blockchain app with ZenDB database instead of PostgreSQL, for wallets to become non-custodial.

### Core functionality

- **Treasury:** The treasury contains global and per-country (also EU) wallets.
- **Distribution Cycle:** Each week the salaries are distributed.
- **Person onboarding:** After having checked the accounts of a person to them a salary is assigned.
- **Salary recalculation:** Each two months all salaries are recalculated.

## Why It Matters

It solves the science and free software salaries problem. It also solves the scientific publication crisis (that I believe leads to multi-trillion (in dollars) indirect losses), that is when good works receive little publicity. It does it by giving money directly to authors. Salaries are paid weekly.
In practice, it enables:
- **Free software authors** to receive a stable salary for their products
- **Non-PhDs** to receive science funding
- **PhDs** to receive funding without spending time on grant writing
- **Marketers** to be paid for marketing science and free software
- **Society as a whole** to have well-accepted and promoted scientific works

The model addresses the scientific publication crisis by rewarding marketers for marketing under-represented products. It addresses funding problems by providing weekly salaries.

## Use cases

### Science or Free Software Projects Seeking Sustainable Funding

Open-source infrastructure teams, governance research organizations, and ecosystem tools can use AIIM as a renewable funding source. Unlike one-time grant rounds, AIIM provides a continuous stream of funding.

### Underrepresented Scientific Projects

Underrepresented scientific projects like ordered semicategory actions and underrepresented open source projects can receive funding for author support and for publicity by independent science marketers (saving the case when the author him/herself fails to market the work).

### Mechanism Designers Testing Governance Experiments

AIIM functions as a live testing environment for public goods funding mechanisms. Epoch-level experiments may adjust voting mechanics, matching logic, or allocation structures. Participation and allocation data contribute to broader research in decentralized funding design.

### Ecosystem Organizations Co-Sponsoring Public Goods

Organizations aligned with AIIM's mission may propose themed epochs or collaborate on funding priorities.

Through the governance process, external stakeholders can influence project selection and allocation focus areas alongside the Victor Porton’s Foundation. (This will become true mostly after switching to ICP blockchain.)

## Resources

- **App:** [merit.science-dao.org](https://greengoods.app)
- **Documentation:** [science-dao.org/category/docs/](https://science-dao.org/category/docs/)  
- **Builder / Technical Docs:** [github.com/vporton/meritocracy/tree/main/docs](https://github.com/vporton/meritocracy/tree/main/docs)  
- **Article:** [A New Economic Formation, AI Internet-Meritocracy](https://science-dao.org/economic-formation/) 
