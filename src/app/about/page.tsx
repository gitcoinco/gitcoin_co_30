import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import { CTASection } from "@/components/layouts";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.about;

function StatCard({
  value,
  label,
  style,
}: {
  value: string;
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="rounded-2xl border border-gray-300/40 px-2 sm:px-5 py-5"
      style={style}
    >
      <p className="text-2xl sm:text-3xl xl:text-4xl font-normal font-mono text-gray-200 text-center">
        {value}
      </p>
      <p className="mt-1.5 text-sm font-mono uppercase text-gray-200 text-center">
        {label}
      </p>
    </div>
  );
}

const timelineEvents = [
  {
    year: "2017",
    title: "Gitcoin is founded",
    description:
      "We started with the goal of supporting the development of open source projects and monetizing open source software through bounties.",
    link: null,
  },
  {
    year: "2018",
    title: "Quadratic Funding Paper Published",
    description:
      "Vitalik published his seminal paper on Quadratic Funding, a novel mechanism for democratically allocating philanthropic funds.",
    link: { label: "What's Quadratic Funding?", href: "/mechanisms" },
  },
  {
    year: "2019",
    title: "Gitcoin Grants Program Launched",
    description:
      "Gitcoin Grants became the first implementation of Quadratic Funding to maximize impact, and has funded many boundary-pushing projects since.",
    link: null,
  },
  {
    year: "2024",
    title: "$60,000,000+ Distributed",
    description:
      "To date, Gitcoin Grants has generated $60+ million of funding.",
    link: null,
  },
];

const partnerRow1 = ["Momus", "Ethereum Foundation", "Yearn", "Polygon", "ENS"];
const partnerRow2 = [
  "Chainlink",
  "Balancer",
  "Aragon",
  "a16z",
  "ForceDAO",
  "Synthetix",
];
const partnerRow3 = [
  "Schmidt Futures",
  "OP Games",
  "Celo",
  "Binance",
  "Anoma",
  "Unlock Protocol",
  "Stefan George",
];

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-gray-25 overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-fwd { animation: marquee 55s linear infinite; display: flex; width: max-content; }
        .marquee-rev { animation: marquee 55s linear infinite reverse; display: flex; width: max-content; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1166px] px-4 pt-10 mb-16 sm:px-6 lg:px-0">
        <div className="relative h-[360px] overflow-hidden rounded-2xl">
          {/* Fade image into dark on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10" />

          {/* Bottom teal glow */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-500/25 to-transparent z-20" />
          {/* Bottom-left teal bloom */}
          <div className="absolute -bottom-12 -left-12 w-96 h-52 rounded-full bg-teal-500/20 blur-3xl z-20" />

          <div className="relative z-30 flex h-full items-center justify-between">
            <div className=" border border-gray-300 rounded-2xl pl-4 sm:pl-10 xl:pl-14 pr-4 w-full h-full flex items-center">
              <h1 className="max-w-[640px] text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-heading leading-[1.12]">
                <span className="text-teal-500 font-extrabold ">
                  We envision a world shaped by{" "}
                </span>
                <span className="font-normal">
                  community-led positive change.
                </span>
              </h1>
            </div>
            <div className="relative hidden md:block rounded-2xl overflow-hidden flex-shrink-0 h-full w-auto aspect-square border border-gray-300 -mr-[1px]">
              <Image
                fill
                className="object-cover object-center"
                src="/assets/about/hero-image.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1166px] px-4 my-8 sm:px-6 lg:px-0">
        <div className="flex overflow-hidden min-h-[130px]">
          <div className="relative hidden md:block w-[180px] flex-shrink-0 self-stretch rounded-2xl overflow-hidden border border-gray-300 -mr-[1px]">
            <Image
              fill
              src="/assets/about/chladni-mission.png"
              alt=""
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 items-center justify-end px-8 py-12 md:px-12 rounded-2xl border border-gray-300">
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-light leading-snug text-right text-gray-25 max-w-[580px]">
              Since 2017, Gitcoin has empowered communities to{" "}
              <span className="text-teal-500">
                build, fund and protect what matters to them.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1229px] px-4 my-8 sm:px-6 lg:px-0">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
          {[
            "Modular, Permissionless Protocols",
            "Funding Technology and Tooling",
            "Ongoing Grants Programming",
          ].map((pillar) => (
            <div
              key={pillar}
              className="rounded-2xl border border-gray-300 px-6 sm:px-12 xl:px-20 py-9 flex items-center"
            >
              <div className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-gray-300 leading-relaxed mx-auto w-fit">
                {pillar}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col my-8 max-w-[1166px] mx-auto px-4">
        {/* ── WIDE CELLULAR BANNER ─────────────────────────────────────────── */}
        <div className="mx-auto w-full py-4 sm:px-6 lg:px-0 rounded-2xl border border-gray-300">
          <div className="relative h-[160px] overflow-hidden rounded-2xl">
            <Image
              fill
              src="/assets/about/banner-cellular.png"
              alt=""
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* ── PUBLIC GOODS QUOTE ───────────────────────────────────────────── */}
        <div className="mx-auto w-full py-2 sm:px-6 lg:px-0 rounded-2xl border border-gray-300 -mt-[1px]">
          <div className=" px-8 py-10 md:px-12 md:py-12">
            <p className="text-[26px] md:text-[32px] lg:text-[38px] font-heading font-light leading-[1.3] text-gray-25">
              Over the past 5 years we&apos;ve supported the funding of public
              goods,{" "}
              <span className="text-teal-500">
                enabling communities to fund their shared needs
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1166px] px-4 py-20 sm:px-6 xl:px-0">
        {/* 2-column: left 2/5 holds the chladni strip right-aligned; right 3/5 holds events */}
        <div className="grid xl:grid-cols-[2fr_3fr] gap-x-2 sm:gap-x-10">
          <div className="hidden xl:flex justify-end">
            <div className="relative w-24 self-stretch min-h-[520px] rounded-2xl overflow-hidden">
              <Image
                fill
                src="/assets/about/chladni-timeline.png"
                alt=""
                className="object-cover"
              />
            </div>
          </div>

          {/* Events */}
          <div className="flex flex-col gap-14">
            {timelineEvents.map((event, i) => (
              <div key={i}>
                <h3 className="text-xl md:text-2xl font-heading font-normal text-gray-25 leading-snug">
                  {event.title}
                </h3>
                {/* Year is purple / iris */}
                <p className="mt-2 text-sm font-mono text-[#A195F0]">
                  {event.year}
                </p>
                <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-[400px] leading-relaxed font-serif">
                  {event.description}
                </p>
                {event.link && (
                  <a
                    href={event.link.href}
                    className="mt-2 inline-flex items-center gap-1 text-sm text-gray-25 hover:text-teal-400 transition-colors"
                  >
                    {event.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR IMPACT ───────────────────────────────────────────────────── */}
      {/*
        Grid layout (5 explicit rows):
          row 1 — left image | center label+button | right image
          row 2 — connector  |                     | connector
          row 3 — left stat  | center stat         | right stat   ← all same row
          row 4 —            | connector           |
          row 5 —            | center bottom image |
      */}
      <section className="mx-auto w-full max-w-[1166px] px-4 py-16 sm:px-6 xl:px-0">
        {/* Mobile layout — stacked */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex flex-col items-center gap-5 py-6">
            <p className="text-2xl font-heading font-bold uppercase">
              Our Impact
            </p>
            <Button
              href="https://impact.gitcoin.co"
              external
              variant="secondary"
            >
              Learn more
            </Button>
          </div>
          {/* Two side images */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="rounded-2xl overflow-hidden border border-gray-300">
              <Image
                src="/assets/about/impact-donations.png"
                alt=""
                width={251}
                height={301}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="">
              <Image
                className="rounded-2xl overflow-hidden border border-gray-300"
                src="/assets/about/impact-usd.png"
                alt=""
                width={363}
                height={260}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
          <StatCard value="4.2M" label="Unique Donations" />
          <StatCard value="3,715" label="Projects Raised Funds" />
          <StatCard value="$60,000,000+" label="Towards Public Goods" />
          {/* Bottom image */}
          <div className="rounded-2xl overflow-hidden border border-gray-300">
            <Image
              src="/assets/about/impact-projects.png"
              alt=""
              width={262}
              height={261}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* Desktop layout — grid */}
        <div
          className="hidden md:grid grid-cols-[1fr_1fr_1.4fr] gap-x-2 sm:gap-x-4"
          style={{ gridTemplateRows: "auto 36px auto 36px auto" }}
        >
          {/* Row 1 — left image */}
          <div
            className="rounded-2xl overflow-hidden border-gray-300 border"
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            <Image
              src="/assets/about/impact-donations.png"
              alt=""
              width={251}
              height={301}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Row 1 — center: OUR IMPACT label + button */}
          <div
            className="flex flex-col items-center justify-center gap-5 px-4"
            style={{ gridRow: 1, gridColumn: 2 }}
          >
            <p className="text-2xl font-heading font-bold uppercase">
              Our Impact
            </p>
            <Button
              href="https://impact.gitcoin.co"
              external
              variant="secondary"
            >
              Learn more
            </Button>
          </div>

          {/* Row 1 — right image */}
          <div
            className="overflow-hidden self-end"
            style={{ gridRow: 1, gridColumn: 3 }}
          >
            <Image
              className="rounded-2xl overflow-hidden border-gray-300 border"
              src="/assets/about/impact-usd.png"
              alt=""
              width={363}
              height={260}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Row 2 — left connector (image → stat) */}
          <div
            className="flex flex-col items-center"
            style={{ gridRow: 2, gridColumn: 1 }}
          >
            <div className="w-px flex-1 bg-gray-300" />
          </div>
          {/* Row 2 — center: empty (no connector needed between label and stat) */}
          <div style={{ gridRow: 2, gridColumn: 2 }} />
          {/* Row 2 — right connector (image → stat) */}
          <div
            className="flex flex-col items-center"
            style={{ gridRow: 2, gridColumn: 3 }}
          >
            <div className="w-px flex-1 bg-gray-300" />
          </div>

          {/* Row 3 — all three stat cards on the same grid row */}
          <StatCard
            value="4.2M"
            label="Unique Donations"
            style={{ gridRow: 3, gridColumn: 1 }}
          />
          <StatCard
            value="3,715"
            label="Projects Raised Funds"
            style={{ gridRow: 3, gridColumn: 2 }}
          />
          <StatCard
            value="$60,000,000+"
            label="Towards Public Goods"
            style={{ gridRow: 3, gridColumn: 3 }}
          />

          {/* Row 4 — center connector (center stat → bottom image) */}
          <div style={{ gridRow: 4, gridColumn: 1 }} />
          <div
            className="flex flex-col items-center"
            style={{ gridRow: 4, gridColumn: 2 }}
          >
            <div className="w-px flex-1 bg-gray-300" />
          </div>
          <div style={{ gridRow: 4, gridColumn: 3 }} />

          {/* Row 5 — center bottom image only */}
          <div style={{ gridRow: 5, gridColumn: 1 }} />
          <div
            className="rounded-2xl overflow-hidden border-gray-300 border"
            style={{ gridRow: 5, gridColumn: 2 }}
          >
            <Image
              src="/assets/about/impact-projects.png"
              alt=""
              width={262}
              height={261}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div style={{ gridRow: 5, gridColumn: 3 }} />
        </div>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────────────────── */}
      <section className="py-16">
        {/* Header card */}
        <div className="mx-auto w-full max-w-[908px] px-4 sm:px-6 lg:px-0 mb-14">
          <div className="rounded-2xl border border-gray-300 bg-gray-800/40 px-8 py-6 flex flex-col md:flex-row md:items-start gap-3 md:gap-14">
            <h2 className="text-base sm:text-2xl font-heading font-bold text-gray-25 whitespace-nowrap">
              Our Partners
            </h2>
            <p className=" text-gray-400 leading-relaxed">
              We partner with some of the most impactful organizations fueling
              the future of open source software and public goods
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 overflow-hidden">
          {/* Row 1: very large heading font */}
          <div className="overflow-hidden">
            <div className="marquee-fwd">
              {[
                ...partnerRow1,
                ...partnerRow1,
                ...partnerRow1,
                ...partnerRow1,
              ].map((name, i) => (
                <span
                  key={i}
                  className="text-[64px] md:text-[80px] lg:text-[88px] font-heading font-bold text-gray-25 whitespace-nowrap pr-20"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: large heading font, reverse direction */}
          <div className="overflow-hidden">
            <div className="marquee-rev">
              {[
                ...partnerRow2,
                ...partnerRow2,
                ...partnerRow2,
                ...partnerRow2,
              ].map((name, i) => (
                <span
                  key={i}
                  className="text-[52px] md:text-[64px] lg:text-[72px] font-heading font-bold text-gray-25 whitespace-nowrap pr-16"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="marquee-fwd">
              {[
                ...partnerRow3,
                ...partnerRow3,
                ...partnerRow3,
                ...partnerRow3,
              ].map((name, i) => (
                <span
                  key={i}
                  className="text-2xl md:text-3xl font-mono font-semibold text-gray-25 whitespace-nowrap pr-12 tracking-wider"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        title="Ready to Contribute?"
        description="  Start with something you know well. Share your expertise and help
            build the definitive resource for Ethereum funding."
        buttonText="View guidelines"
        buttonHref="/contribute"
      />
    </div>
  );
}
