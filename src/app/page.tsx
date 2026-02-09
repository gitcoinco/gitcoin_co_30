"use client";

import Link from "next/link";
import {
  AppCard,
  CampaignCard,
  CategoriesCard,
  ResearchCard,
} from "@/components/cards";
import type { App, Campaign, Research } from "@/lib/types";
import { Button, SearchBar } from "@/components/ui";
import { PencilLine, Users, Zap } from "lucide-react";
import ChladniBackground from "@/components/ChladniBackground";

const assets = {
  heroBg: "/assets/figma/ca436c39077b5d27c27cec8a2772d7e3ed184d50.png",
  logo: "/assets/figma/81871db42703abd63ff71bbe3a5c094680338593.svg",
  chevron: "/assets/figma/28e9d759f07e6e95787665c44702ac7b566f0810.svg",
  search: "/assets/figma/fe472c1506d575961e5d3dfb9ef196b2162740ae.svg",
  matchingPool: "/assets/figma/d9e6678d43acd448cea7fa0986a79831a1d38a0e.svg",
  projects: "/assets/figma/795de3627e1c5baed33f99c9396b110bdf3e654f.svg",
  timeline: "/assets/figma/c825d70de404cc1ac1c6cc05218031c9412ba810.svg",
  socialX: "/assets/figma/baa9aaa1fff4bfce539fc574dbbc21176fcd6bd5.svg",
  socialGithub: "/assets/figma/7e5219e82e52e49a02d7136cc85d027df4eaa3dc.svg",
  socialWarpcast: "/assets/figma/58792d3548b24a695ad74f91830bc2d8138d05ed.svg",
  socialYoutube: "/assets/figma/2e348b616fba316c798b65912d640f14efc38ad9.svg",
  socialDiscord: "/assets/figma/3612ddd0d9b418ab3f21e669182371003bebc9bc.svg",
  socialDiscourse: "/assets/figma/a977e9f097f6a48c8e0a4ca519ac0d6f87f312d8.svg",
  communitySubmit: "/assets/figma/6bf30b8135a2411d86fb47ed15600e1797f04ec6.svg",
  communityEdit: "/assets/figma/d5421a85e2559d3347000ec1b2fd6b27e8d6b913.svg",
  communityBounties:
    "/assets/figma/890870a279a253cda50c472f61d9553fdb210dde.svg",
};

const curateCards = [
  {
    title: "Case Studies",
    count: "120+",
    description:
      "Real outcomes, funding decisions, lessons learned, and what actually worked in practice.",
    examples: "Protocol Guild, Uniswap Grants, MolochDAO",
    href: "/case-studies",
  },
  {
    title: "Mechanisms",
    count: "120+",
    description:
      "Quadratic funding, retro funding, conviction voting, streaming, and hybrid models explained.",
    examples: "QF, RetroPGF, Conviction Voting, Direct Grants",
    href: "/mechanisms",
  },
  {
    title: "Research",
    count: "120+",
    description:
      "Analysis of capital flows, mechanism performance, ecosystem trends, and emerging insights.",
    examples: "Capital Flow Reports, Mechanism Analysis",
    href: "/research",
  },
  {
    title: "Campaigns",
    count: "120+",
    description:
      "Current and upcoming funding rounds, experiments, and initiatives you can participate in.",
    examples: "GG25, ETHBoulder, Network Goods",
    href: "/campaigns",
  },
  {
    title: "Apps",
    count: "120+",
    description:
      "Funding platforms, DAOs, grant programs, funds, and primitives powering the ecosystem.",
    examples: "Gitcoin Grants, Allo Protocol, Octant, Optimism RPGF",
    href: "/apps",
  },
];

const featuredApps: App[] = [
  {
    id: "home-app-1",
    slug: "allo-protocol",
    name: "Allo Protocol",
    shortDescription:
      "The Long-Term Incentive Pilot Program (LTIP) distributes 45.8M ARB tokens to protocols building...",
    description: "",
    tags: ["infrastructure"],
    lastUpdated: "2026-02-09",
  },
  {
    id: "home-app-2",
    slug: "optimism-retropgf",
    name: "Optimism RetroPGF",
    shortDescription:
      "Retroactive public goods funding that rewards projects based on their impact to the Optimism Collective.",
    description: "",
    tags: ["L2 Ecosystems"],
    lastUpdated: "2026-02-09",
  },
  {
    id: "home-app-3",
    slug: "octant",
    name: "Octant",
    shortDescription:
      "Community-driven funding platform using Golem Network rewards to support public goods through epoch-based voting.",
    description: "",
    tags: ["Community Funding"],
    lastUpdated: "2026-02-09",
  },
];

const featuredResearch: Research[] = [
  {
    id: "home-research-1",
    slug: "capital-flows-in-ethereum-public-goods-2025",
    name: "Capital Flows in Ethereum Public Goods 2025",
    shortDescription:
      "Comprehensive analysis of $120M+ in public goods funding across mechanisms and platforms.",
    description: "",
    tags: ["report"],
    lastUpdated: "2026-02-09",
  },
  {
    id: "home-research-2",
    slug: "the-evolution-of-quadratic-funding",
    name: "The Evolution of Quadratic Funding",
    shortDescription:
      "How QF has adapted from GitcoinDAO to plural mechanism experiments across the ecosystem.",
    description: "",
    tags: ["report"],
    lastUpdated: "2026-02-09",
  },
  {
    id: "home-research-3",
    slug: "capital-flows-in-ethereum-public-goods-2025-alt",
    name: "Capital Flows in Ethereum Public Goods 2025",
    shortDescription:
      "Comprehensive analysis of $120M+ in public goods funding across mechanisms and platforms.",
    description: "",
    tags: ["report"],
    lastUpdated: "2026-02-09",
  },
  {
    id: "home-research-4",
    slug: "the-evolution-of-quadratic-funding-alt",
    name: "The Evolution of Quadratic Funding",
    shortDescription:
      "How QF has adapted from GitcoinDAO to plural mechanism experiments across the ecosystem.",
    description: "",
    tags: ["report"],
    lastUpdated: "2026-02-09",
  },
];

const featuredCampaigns: Campaign[] = [
  {
    id: "home-campaign-1",
    slug: "gg25-q1-2026-grants-round",
    name: "GG25: Q1 2026 Grants Round",
    shortDescription:
      "Support public goods across developer tools, community, and education with quadratic funding.",
    description: "",
    tags: ["active-now"],
    lastUpdated: "2026-02-09",
  },
  {
    id: "home-campaign-2",
    slug: "gg25-q1-2026-grants-round-2",
    name: "GG25: Q1 2026 Grants Round",
    shortDescription:
      "Support public goods across developer tools, community, and education with quadratic funding.",
    description: "",
    tags: ["active-now"],
    lastUpdated: "2026-02-09",
  },
];

function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-[30px] leading-9 tracking-[0.012em] text-gray-25">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-300 font-serif">{subtitle}</p>
      </div>

      <Link href={href}>
        <Button variant="ghost" className="text-right font-semibold">
          View All →
        </Button>
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-gray-25" data-node-id="551:2185">
      <section className="relative overflow-hidden ">
        <ChladniBackground />

        <div className="relative z-10 mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
          <div className="pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="flex flex-col xl:ml-[10vw] ml-auto mr-auto ">
              <p className="mb-8 w-fit rounded-lg bg-gray-900 px-5 py-[10px] text-sm text-teal-500 font-mono">
                Your home for Defi CrowdFunding
              </p>
              <h1 className="max-w-170 text-4xl sm:text-5xl/14 md:text-7xl/20 font-extrabold text-gray-25 font-heading">
                The Map of the Funding Universe
              </h1>
              <p className="mt-6 max-w-[732px] text-xl text-gray-100 font-serif">
                Your trusted directory and reference library for funding
                mechanisms, platforms, case studies, and research in the
                Ethereum ecosystem.
              </p>

              <div className="mt-8 w-full max-w-[896px]">
                <SearchBar
                  placeholder="Search apps, mechanisms, case studies, research..."
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-30 flex flex-wrap items-center justify-center gap-4">
              <Link href="/submit">
                <Button variant="primary">Partner with us</Button>
              </Link>

              <Link href="/contribute">
                <Button variant="secondary">Submit content</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section
          className="mx-auto w-full max-w-[1216px] px-4 py-16 sm:px-6 lg:px-0"
          data-node-id="551:2292"
        >
          <SectionHeader
            title="Featured Campaigns"
            subtitle="What's happening now in Ethereum funding"
            href="/campaigns"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                variant="home"
              />
            ))}
          </div>
        </section>

        <section
          className="border-y border-gray-950 py-20"
          data-node-id="551:2300"
        >
          <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
            <div className="mx-auto max-w-[980px] text-center">
              <h2 className="text-balance text-[48px] font-extrabold text-gray-25 font-heading sm:text-[64px] lg:text-[72px]">
                What We Curate
              </h2>
              <p className="mx-auto mt-3 max-w-[700px] text-sm text-gray-400 font-serif">
                The comprehensive reference library for understanding
                Ethereum&apos;s funding landscape
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {curateCards.map((card) => (
                <CategoriesCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-teal-950">
          <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
            <SectionHeader
              title="Featured Apps"
              subtitle="Essential platforms shaping Ethereum funding"
              href="/apps"
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredApps.map((app) => (
                <AppCard key={app.id} app={app} variant="home" />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1216px] px-4 py-16 sm:px-6 lg:px-0">
          <SectionHeader
            title="Latest Research"
            subtitle="Deep dives into funding mechanisms and trends"
            href="/research"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredResearch.map((research) => (
              <ResearchCard
                key={research.id}
                research={research}
                variant="home"
              />
            ))}
          </div>
        </section>

        <section
          className="relative border-y border-teal-500 py-16 bg-gray-950"
          data-node-id="551:2341"
        >
          <div className="pointer-events-none absolute inset-x-0 -top-4 h-4 bg-gradient-to-b from-transparent to-teal-500/30" />
          <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-4 bg-gradient-to-t from-transparent to-teal-500/30" />
          <div className="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
            <div className="text-center">
              <h2 className="text-[36px] leading-10 text-gray-25">
                Built by the Community
              </h2>
              <p className="mx-auto mt-4 max-w-[730px] leading-7 text-gray-200">
                This is a living knowledge base. Everyone can contribute, edit,
                and help document what works in Ethereum funding. Join 500+
                funding mechanism experts building the definitive reference for
                Ethereum public goods funding
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: PencilLine,
                  title: "Submit Content",
                  copy: "Add apps, mechanisms, case studies, or research to the directory",
                },
                {
                  icon: Users,
                  title: "Edit & Improve",
                  copy: "Help refine existing entries and keep information up to date",
                },
                {
                  icon: Zap,
                  title: "Earn Bounties",
                  copy: "Get rewarded for high-quality contributions that meet our standards",
                },
              ].map((item) => (
                <article key={item.title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-500">
                    <item.icon className="h-8 w-8 text-teal-100" />
                  </div>
                  <h3 className="mt-3 text-[20px] leading-7">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[295px] text-base leading-6 text-gray-200">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-14 max-w-[796px] text-center">
              <h3 className="text-2xl leading-8">Ready to Contribute?</h3>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
                <Link href="/submit">
                  <Button variant="primary">Submit an Entry</Button>
                </Link>
                <Link href="/contribute">
                  <Button variant="secondary">View Guidelines</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
