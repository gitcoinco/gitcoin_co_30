---
id: '1700748000'
slug: shape-rotators-guide-to-funding-what-matters
name: "Shape Rotator's Guide to Funding What Matters"
shortDescription: "Mapping the multi-dimensional design space of capital allocation mechanisms for public goods funding."
tags:
  - mechanism design
  - capital allocation
  - public goods
  - design space
  - quadratic-funding
  - retroactive-funding
researchType: Perspective
lastUpdated: '2023-11-23'
relatedMechanisms:
  - quadratic-funding
  - retroactive-funding
  - direct-grants
  - self-curated-registries
  - impact-certificates-hypercerts
  - impact-attestations
relatedApps:
  - gitcoin-grants-stack
  - optimism-retropgf
  - protocol-guild
  - allo-protocol
relatedCaseStudies: []
relatedResearch:
  - plural-funding-mechanisms
relatedCampaigns: []
banner: /content-images/research/shape-rotators-guide-to-funding-what-matters/banner.png
---

**Type:** Perspective
**Authors:** Kevin Owocki
**Originally published:** [Gitcoin Governance Forum](https://gov.gitcoin.co/t/shape-rotators-guide-to-funding-what-matters/17174), November 2023

## TLDR

This post discusses the evolution of funding mechanisms in the context of Gitcoin's mission to "Fund What Matters".

We use both empirical knowledge, a priori reasoning, and a few educated guesses, to explore the evolving landscape of funding mechanisms in web3.

The post examines how different design criteria have shaped various funding experiments. We then explore the potential future of the design space, considering additional design criteria like project maturity, retroactive funding, dependance on impact attestations, or mobile first experiments. We then make some educated guesses about how the design space might evolve, informing where to place bets over the next 5-10 years.

## Shape Rotators Guide to Funding What Matters

As a [shape rotator](https://www.urbandictionary.com/define.php?term=shape%20rotator), I love cartography. Cartography (the study and practice of making and using maps) allows for visual understanding of what's around us. A picture is worth a thousand words, which means that by visualizing abstract concepts, more of us can get on the same page faster & at higher fidelity than we would otherwise.

The objective of this post is to cartography the design space in & around Gitcoin's mission (To Fund What Matters).

![Empirical vs A Priori Knowledge](/content-images/research/shape-rotators-guide-to-funding-what-matters/01-empirical-knowledge.png)

Empirical knowledge is gained through experience or observation, relying on the senses or experiments to understand the world. A priori knowledge, on the other hand, is knowledge that is known independently of experience, based on reason or logical deduction.

In this post, I will try to leverage both types of reasoning to cut through the "fog of war" of the design space. "Fog of war" metaphorically describes the ambiguity and lack of clarity in understanding and making decisions within complex systems.

![Fog of War](/content-images/research/shape-rotators-guide-to-funding-what-matters/02-fog-of-war.jpeg)

## The Design Space

By reflecting on the growth of the internet empirically, and by reasoning about the a priori parallels between web1 and web3, we can reason about how web3 might play out.

![Web Evolution - from email to LLMs](/content-images/research/shape-rotators-guide-to-funding-what-matters/03-internet-evolution.png)

Just as email, IMs, twitter and tik tok, and LLMs changed how we transfer information... The internet of money could change how we transfer money. How we Fund What Matters.

We have Massively Multiplayer Online Role Playing Games (MMORPGs). Now that we've got web3, will we have Massively Multiplayer Online Funding Games (MMOFPs)? Can large networks of people coordinating resources be more powerful than large corporations/governments/billionaires?

I have an instinct that peer to peer funding games may be the biggest wedge we have. There is a greenfield opportunity to explore the design space around Gitcoin's mission, to "Fund What Matters".

## The Mission

Gitcoin's mission, "Fund What Matters", is a directive emphasizing the importance of investing in or financially supporting causes, projects, or initiatives that hold significant value or impact. It suggests prioritizing spending in areas that make a meaningful difference, whether socially, environmentally, culturally, or economically.

This phrase often encourages individuals or organizations to think critically about where their money can have the greatest positive effect. It's a call to action for responsible and purpose-driven allocation of resources, aligning financial decisions with core values and priorities.

## The Mission x The Design Space

By leveraging blockchain technology, the attributes of it that make it powerful (transparency, corruption resistance, global, open source, programmable), and the wave of innovation surrounding the EVM, we can help evolve how people "Fund what matters" to them.

Just as the internet accelerated the flow of information, web3 can accelerate the flow of capital. We can ride this wave to build and scale new funding experiments.

## The Past

In 2019, the bear market had just hit. And projects in the Ethereum ecosystem needed funding. At the time, the major forces in Eth public goods funding were the Ethereum Community Fund, the Ethereum Foundation, and Consensys. The EF/ECF had grants programs or you could get hired at Consensys.

Gitcoin discovered [Quadratic Funding](https://wtfisqf.com/) in late 2018 and launched Gitcoin Grants in January 2019. We were differentiated from the existing players by the decentralized decision making introduced by quadratic funding.

I think the design space kind of looked like this:

| Criteria | Comment |
|----------|---------|
| Technocratic = small group of decision makers | At the ECF/EF, you had to go through a grantmaking process where a small committee would decide if you got funding. At Consensys, you had to be hired by Joe Lubin or his disciples. |
| Democratic = larger more permissionless group of decision makers | At Gitcoin, anyone can help allocate the funding due to Quadratic Funding. This scales because 1000s of projects can get funded at once. |

Here it is visualized as a 2 dimensional spectrum:

![2D Spectrum: Technocratic vs Democratic](/content-images/research/shape-rotators-guide-to-funding-what-matters/04-2d-spectrum.png)

Of course, this doesn't tell the full story. If you were to add a 2nd axis showing the amount of funding being deployed, the design space would look something like this:

![3D Space: Adding Funding Amount](/content-images/research/shape-rotators-guide-to-funding-what-matters/05-3d-design-space.png)

## The Present

Over the course of 2022, more players entered the space and we began to see the rise of retroactive public goods funding experiments like Optimism RPGF and very simple but effective mechanisms like the Protocol Guild's self curating registry.

Trying to further map the design space, adding another 3rd dimension... Looks like this:

![3D Space with Retroactive Dimension](/content-images/research/shape-rotators-guide-to-funding-what-matters/06-3d-simplicity.png)

If we were to make the 3rd dimension "simplicity", then it would kind of look like this:

![3D Space: Simplicity Dimension](/content-images/research/shape-rotators-guide-to-funding-what-matters/07-simplicity-dimension.png)

Each of these experiments evolved the design space forward in important ways:

1. **Retroactive public goods funding** is based off the idea that it is easier to fund projects based on the impact they've already had. As opposed to speculating on the impact they might have in the future. After retroPGF is established, we can then bet that projects could receive proactive funding based on future retroactive rewards.
2. **Protocol Guild** built a very simple mechanism, a self curating registry. This registry allowed projects to easily contribute to protocol development.

Lets get weird. Lets look at what this new design space looks like all together. If we combine the two 3d cubes, we get a tesseract (4 dimensional cube) showing us the new design space:

![4D Tesseract Design Space](/content-images/research/shape-rotators-guide-to-funding-what-matters/08-4d-tesseract.png)

Since us humans have evolved to understand 3d images, this 4d visualization is a bit hard to grok visually. That said, once you spend some time staring at it, you will can internalize that we've found a way to conceptualize the entire design space across all 4 dimensions:

1. Technocratic vs democratic
2. Amount of funding
3. Proactive vs retroactive
4. Simple vs complex

As a shape rotator is where things get interesting to me. As people begin launching projects that are empirically effective at funding what matters to them, we can start to build a 1, 2, 3 dimensional... up to n-dimensional space of what the design space looks like.

![Design Space Figma Overview](/content-images/research/shape-rotators-guide-to-funding-what-matters/09-figma-design-space.png)

## The Future

Now we are really starting to cartography the design space. By creating visualizations of how these mechanisms relate to each other, and extracting the criteria that makes them different, we're starting to get a visual of the design space. We've started to beat back the fog of war of the possibilities.

Here, again are the criteria (dimensions) that the market has begun to segment itself upon:

| Criteria | Comment |
|----------|---------|
| Technocratic vs Democratic | Is the # of decision makers larger or small? |
| Amount of Funding in $$$ | Is the amount of $$ at stake larger or small? |
| Retroactive vs proactive | Is the funding criteria based on value in the past, future, present, or a combo of both. |
| Simple vs complicated | How much complexity is within the capital allocation mechanism. |

What opportunities to do something cool and innovative, building on this criteria, are there? Some examples:

- What if we built self curating registries (like Protocol Guild) into Allo and deployed them to adjacent public goods spaces (eg other than protocol developers)? How big is the TAM (total addressable market) for this?
- What if we built retroactive public goods funding into Gitcoin Grants? How big is this TAM?
- What if we built more technocratic/expert-led decision making into Gitcoin Grants? How big is this TAM?

What if there are more criteria (dimensions) that matter? What if there is a higher dimensionality to the design space?

![Higher Dimensional Design Space](/content-images/research/shape-rotators-guide-to-funding-what-matters/10-figma-dimensions.png)

What dimensions would we even care to splice the design space by? And would each dimension justify the complexity of thinking in higher dimensional thinking? Since it's hard to think in higher than 3 dimensions, maybe we'd be better off focusing on design spaces 3 dimensions or less.

That said, there might be value in exploring what dimensions to even look at. We can make some educated guesses here. Here are all of the additional dimensions I can think would ever matter within the design space of "how do you build a mechanism that helps people fund what matters?"

| Criteria | Comment |
|----------|---------|
| Mature projects vs seed projects | Is the mechanism more for mature projects or seed stage projects? |
| Web2 vs web3 UX | Is the UX usable for web2 natives? |
| Effective or not | Is the mechanism actually effective at whatever its goal is (in Gitcoin's case building an ecosystem)? How big is the TAM? |
| Return expected vs not | Is a return expected as part of the fundraise? Or not? |
| Virality vs not | Is virality a big part of the mechanism? Like for Quadratic Funding, where people tend to share their grants on social media. |
| Does it depend on Impact Attestations? | Does the mechanism depend on impact attestations? Do we have a reliable proof-of-impact? |
| Oracle-limited or not? | If the mechanism depends on some external data source, is it limited by having reliable oracles or not? |
| Credibly neutral vs not | Does the mechanism's constituents care that its credibly neutral, or does it allow for rent-seeking intermediaries? |
| Desktop vs mobile | Is the mechanism experience desktop first or mobile-first? |
| Built into social media? | Is the mechanism a standalone website, or is it built onto a web3 social network like Farcaster/Lens Protocol? |
| Massively multiplayer? | Will the mechanism work at scale? Will it enable Massively Multiplayer Online Funding Games (MMOFPs)? |
| Are assets fungible or not? | Do the primary assets in the mechanism resemble fungible things like ERC-20s? Or are they more based on ERC-721 like assets? |
| Can it be built on top of Allo? | Can it be built upon Allo? Does Allo help make it easier to bring to market? |
| Can it be built on top of Passport? | Does the mechanism benefit from sybil resistance? If so, does Passport newly enable it? |
| Is the funding continuous/recurring? | Does the mechanism depend on fickle things like people donating? Or does it depend on continuous sources of funding (like sequencer fees or yield)? |

## Open Questions

Which combinations of these criteria have billion-dollar potential to "Fund What Matters"? Where is the TAM very large now, and what design spaces have billion-dollar potential next cycle? Which will only be enabled by new UX breakthroughs (like PWAs, gasless apps, account abstraction)?

Would we be served well by building/researching many of these tools internally, or enabling 1000s of devs to build in these design spaces, on top of Allo? And perhaps taking upside in each.

It may be worth defining criteria for when it makes sense to double down on existing families of mechanisms we know are working (QF, retro PGF), vs go broad and exploring new mechanisms. Are the two mutually exclusive, or can we design a network that, like a [slime mold](https://twitter.com/owocki/status/1456368527347044355), can both search + harvest at the same time?

## Research Areas

1. Map out spectrum of public goods funding from cradle-to-grave (or cradle-to-unicorn) for each project.

![Funding Spectrum](/content-images/research/shape-rotators-guide-to-funding-what-matters/11-funding-spectrum.png)

2. How does retroactive public goods funding create new opportunities?

![Project Maturity Curve](/content-images/research/shape-rotators-guide-to-funding-what-matters/12-maturity-curve.png)

3. How does sybil resistance from things like Gitcoin Passport create new opportunities?
4. What opportunities are there to build mechanisms into web3 social networks like Lens/Farcaster?
5. What are the mobile-first possibilities?
6. What would Gitcoin Grants but for private goods look like? Would it detract from Gitcoin's mission or be a valuable extension of Allo/Grants Stack?
7. What is the design space of Allo v2? What are the highest opportunities within them?
8. How would making the UX of Gitcoin feel more web2 native affect the market size opportunity?

![Democratized Angel Investing](/content-images/research/shape-rotators-guide-to-funding-what-matters/13-angel-investor.png)

## Conclusion

In this post, we reasoned empirically and a priori about how the design space for Funding What Matters has evolved so far. We then visualized it.

From there, we made some educated guesses about what other types of experiments for Funding What Matters may exist in the future. Then we identified some next steps we could take for Gitcoin (and the broader regen web3 ecosystem) to advance the mission.
