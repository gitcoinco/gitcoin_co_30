import Link from "next/link";
import {
  AppCard,
  CampaignCard,
  CategoriesCard,
  ResearchCard,
} from "@/components/cards";
import { Button, SearchBar } from "@/components/ui";
import { PencilLine, Users, Zap } from "lucide-react";
import ChladniBackground from "@/components/ChladniBackground";
import { getFeaturedApps } from "@/content/apps";
import { getFeaturedCampaigns } from "@/content/campaigns";
import { getFeaturedResearch } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";

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

export default function HomePage() {
  const featuredApps = getFeaturedApps(3);
  const featuredCampaigns = getFeaturedCampaigns(2);
  const featuredResearch = getFeaturedResearch(4);

  return (
    <div className="bg-gray-900 text-gray-25" data-node-id="551:2185">
      <section className="relative overflow-hidden -mt-[72px] pt-[72px]">
        <ChladniBackground variant="1"/>

        <div className="relative z-10 mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
          <div className="pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="flex flex-col xl:ml-[10vw] ml-auto mr-auto ">
              <p className="mb-8 w-fit rounded-lg bg-gray-900 px-5 py-[10px] text-sm text-teal-500 font-mono">
                Fund What Matters
              </p>
              <h1 className="max-w-170 text-4xl sm:text-5xl/14 md:text-7xl/20 font-extrabold text-gray-25 font-heading">
                The Map of the Funding Universe
              </h1>
              <p className="mt-6 max-w-[732px] text-xl text-gray-100 font-serif">
                Your trusted directory and reference library for funding
                mechanisms, platforms, case studies, and research in the
                Ethereum ecosystem.
              </p>

              <div className="mt-8 w-full max-w-[732px]">
                <SearchBar
                  placeholder="Search or ask anything..."
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
        {featuredCampaigns.length > 0 && (
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
        )}

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

        {featuredApps.length > 0 && (
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
        )}

        {featuredResearch.length > 0 && (
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
        )}

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
