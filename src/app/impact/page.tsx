import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ResponsiveImpactHeroMetrics from "@/components/impact/ResponsiveImpactHeroMetrics";
import ResponsiveImpactNumbersFieldMask from "@/components/impact/ResponsiveImpactNumbersFieldMask";
import ScrollReveal from "@/components/impact/ScrollReveal";
import PartnersMarqueeSection from "@/components/sections/PartnersMarqueeSection";
import { getAppBySlug } from "@/content/apps";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { Button, InitialAvatar } from "@/components/ui";
import { CTASection } from "@/components/layouts";
import { pageSeo } from "@/lib/page-seo";
import type { App, CaseStudy } from "@/lib/types";

export const metadata: Metadata = pageSeo.impact;

type HeroMetric = {
  value: string;
  label: string;
};

type NumberMetric = {
  value: string;
  label: string;
};

type CaseStudyLayout = "compact" | "wide";

type CaseStudyHighlight = {
  slug: string;
  layout: CaseStudyLayout;
};

type ResolvedCaseStudyHighlight = CaseStudyHighlight & {
  study: CaseStudy;
  app: App | undefined;
};

type CaseStudyAssetOverride = {
  logoSrc?: string;
  mediaSrc?: string;
  mediaAlt?: string;
};

const heroMetrics: HeroMetric[] = [
  {
    value: "5M+",
    label: "Unique Donations",
  },
  {
    value: "230+",
    label: "Funding Rounds",
  },
  {
    value: "$60,000,000+",
    label: "Funding Distributed",
  },
];

const growthMilestones = [
  { year: "2019", value: "$0.7m", left: "16%", top: "74%" },
  { year: "2020", value: "$2.8m", left: "40%", top: "62%" },
  { year: "2021", value: "$13.2m", left: "63%", top: "41%" },
  { year: "2022", value: "$21.4m", left: "85%", top: "18%" },
];

const raisingGrid = [
  { key: "uniswap", src: "/assets/impact/raising/uni.svg", alt: "Uniswap" },
  {
    key: "walletconnect",
    src: "/assets/impact/raising/wallet.svg",
    alt: "WalletConnect",
  },
  { key: "optimism", src: "/assets/impact/raising/op.svg", alt: "Optimism" },
  { key: "yearn", src: "/assets/impact/raising/yearn.svg", alt: "yearn" },
  { key: "zapper", src: "/assets/impact/raising/zapper.svg", alt: "Zapper" },
  {
    key: "unicef",
    src: "/assets/impact/raising/uni-1.svg",
    alt: "United Nations CERF",
  },
  {
    key: "eff",
    src: "/assets/impact/raising/eff.svg",
    alt: "Electronic Frontier Foundation",
  },
  { key: "tor", src: "/assets/impact/raising/tor.svg", alt: "Tor" },
  {
    key: "tornado",
    src: "/assets/impact/raising/tornado.svg",
    alt: "Tornado",
  },
  {
    key: "longevity-prize",
    src: "/assets/impact/raising/longevity.svg",
    alt: "The Longevity Prize",
  },
  { key: "mask", src: "/assets/impact/raising/mask.svg", alt: "Mask" },
  { key: "1inch", src: "/assets/impact/raising/1in.svg", alt: "1inch" },
  { key: "bankless", src: "/assets/impact/raising/bank.svg", alt: "Bankless" },
  { key: "toucan", src: "/assets/impact/raising/toucan.svg", alt: "Toucan" },
  {
    key: "ukrainedao",
    src: "/assets/impact/raising/udao.svg",
    alt: "UkraineDAO",
  },
  {
    key: "blockchain-association",
    src: "/assets/impact/raising/blockass.svg",
    alt: "Blockchain Association",
  },
  { key: "shefi", src: "/assets/impact/raising/shefi.svg", alt: "SheFi" },
  {
    key: "internet-archive",
    src: "/assets/impact/raising/internet.svg",
    alt: "Internet Archive",
  },
  {
    key: "prysmatic-labs",
    src: "/assets/impact/raising/prysmatic.svg",
    alt: "Prysmatic Labs",
  },
  {
    key: "many-more",
    src: "/assets/impact/raising/manymore.svg",
    alt: "and many more",
  },
] as const;

const numberMetrics: NumberMetric[] = [
  {
    value: "270k",
    label: "Unique Supporters",
  },
  {
    value: "28.2B",
    label: "Grantee Market Cap",
  },
  {
    value: "3715",
    label: "Projects Funded",
  },
  {
    value: "$3M+",
    label: "Frauds Prevented",
  },
];

const caseStudyHighlights: CaseStudyHighlight[] = [
  {
    slug: "optimism-from-plasma-group-research-to-a-2b-layer-2-ecosystem",
    layout: "compact",
  },
  {
    slug: "eip-1559-how-quadratic-funding-legitimized-ethereum-s-most-important-fee-market-reform",
    layout: "wide",
  },
  {
    slug: "shamba-network-equipping-smallholder-farmers-to-conserve-ecosystems",
    layout: "wide",
  },
  {
    slug: "tornado-cash-how-quadratic-funding-sustained-ethereum-s-most-important-privacy-tool",
    layout: "compact",
  },
  {
    slug: "austin-griffith-quadratic-freelancer-onboarding-developers",
    layout: "compact",
  },
  {
    slug: "coin-center-defending-cryptocurrency-rights-through-community-funded-advocacy",
    layout: "wide",
  },
  {
    slug: "filecoin-retropgf-retroactive-funding-beyond-optimism",
    layout: "wide",
  },
  {
    slug: "1inch-from-hackathon-to-decentralized-exchange-powerhouse",
    layout: "compact",
  },
];

const caseStudyAssetOverrides: Record<string, CaseStudyAssetOverride> = {
  "optimism-from-plasma-group-research-to-a-2b-layer-2-ecosystem": {
    logoSrc: "/assets/impact/case-studies/logos/optimism.png",
  },
  "eip-1559-how-quadratic-funding-legitimized-ethereum-s-most-important-fee-market-reform":
    {
      logoSrc: "/assets/impact/case-studies/logos/eip-1559.png",
      mediaSrc: "/assets/impact/case-studies/media/eip-1559.png",
      mediaAlt: "Developers assembling Ethereum blocks",
    },
  "shamba-network-equipping-smallholder-farmers-to-conserve-ecosystems": {
    logoSrc: "/assets/impact/case-studies/logos/shamba-network.png",
    mediaSrc: "/assets/impact/case-studies/media/shamba-network.webp",
    mediaAlt: "Farmer standing in a field",
  },
  "tornado-cash-how-quadratic-funding-sustained-ethereum-s-most-important-privacy-tool":
    {
      logoSrc: "/assets/impact/case-studies/logos/tornado-cash.svg",
    },
  "austin-griffith-quadratic-freelancer-onboarding-developers": {
    logoSrc: "/assets/impact/case-studies/logos/austin-griffith.png",
  },
  "coin-center-defending-cryptocurrency-rights-through-community-funded-advocacy":
    {
      logoSrc: "/assets/impact/case-studies/logos/coin-center.png",
      mediaSrc: "/assets/impact/case-studies/media/coin-center.webp",
      mediaAlt: "Peter Van Valkenburgh speaking before Congress",
    },
  "filecoin-retropgf-retroactive-funding-beyond-optimism": {
    logoSrc: "/assets/impact/case-studies/logos/oakland-local-round.png",
    mediaSrc: "/assets/impact/case-studies/media/oakland-local-round.jpeg",
    mediaAlt: "Community members attending an Oakland Local Round session",
  },
  "1inch-from-hackathon-to-decentralized-exchange-powerhouse": {
    logoSrc: "/assets/impact/case-studies/logos/1inch.png",
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="group inline-flex rounded-md border border-teal-500/60 px-3 py-1 font-mono text-[11px] uppercase text-teal-500 transition-colors duration-200 hover:border-teal-400">
      <span className="tracking-[0.3em] transition-[letter-spacing] duration-400 ease-out group-hover:tracking-[0.05em]">
        {children}
      </span>
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-heading text-[34px] leading-[0.95] sm:text-[46px]">
        {titleAccent ? (
          <>
            <span className="text-teal-500">{titleAccent}</span>
            <span className="font-light text-gray-200"> {title}</span>
          </>
        ) : (
          <span className="text-teal-500">{title}</span>
        )}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl font-serif text-lg leading-[1.35] text-gray-300">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function MetricConnector({ className = "h-8" }: { className?: string }) {
  return <div className={`w-px bg-gray-300/65 ${className}`} />;
}

function NumberCard({ value, label }: NumberMetric) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <div className="relative h-[250px] w-full overflow-hidden rounded-[16px] border border-gray-300/65 bg-transparent">
        <div className="absolute inset-0 bg-[#1f1c18]/18" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
          <div className="font-mono text-[40px] leading-[0.925] text-gray-25">
            {value}
          </div>
        </div>
      </div>
      <MetricConnector className="h-[33px]" />
      <div className="flex h-[48px] w-full items-center justify-center rounded-[16px] border border-gray-300/65 bg-[#201d19] px-3">
        <div className="font-mono text-[14px] uppercase tracking-[0.05em] text-gray-25">
          {label}
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({
  study,
  app,
  layout,
}: {
  study: CaseStudy;
  app?: App;
  layout: CaseStudyLayout;
}) {
  const isWide = layout === "wide";
  const assets = caseStudyAssetOverrides[study.slug];
  const logo = assets?.logoSrc ?? app?.logo;
  const mediaSrc =
    assets?.mediaSrc ?? study.banner ?? "/content-images/placeholder.png";
  const mediaAlt = assets?.mediaAlt ?? study.name;

  return (
    <article
      className={`group rounded-[14px] border border-gray-300/65 bg-[#1f1d19] transition-colors hover:border-teal-500/70 ${isWide ? "xl:col-span-2" : ""}`}
    >
      <div
        className={`grid h-full ${isWide ? "lg:grid-cols-[320px_minmax(0,1fr)]" : ""}`}
      >
        <div className="flex min-h-[250px] flex-col px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            {logo ? (
              <div className="relative size-[50px] shrink-0 rounded-xl border border-gray-300/60 bg-gray-950 p-2">
                <Image
                  src={logo}
                  alt=""
                  fill
                  sizes="50px"
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <InitialAvatar
                name={study.name}
                className="size-[50px] rounded-xl border-gray-300/60 text-gray-100"
                textClassName="text-xl text-gray-100"
              />
            )}
            <span className="font-heading text-xl font-semibold text-gray-100">
              {study.name.split(":")[0]}
            </span>
          </div>

          <p
            className={`mt-8 font-serif text-gray-200 ${isWide ? "max-w-[280px] text-[20px] leading-[1.05]" : "text-[20px] leading-[1.08]"}`}
          >
            {study.shortDescription}
          </p>

          <div className="mt-auto pt-8">
            <Button
              href={`/case-studies/${study.slug}`}
              variant="primary"
              size="sm"
            >
              Read case study
            </Button>
          </div>
        </div>

        {isWide ? (
          <Link
            href={`/case-studies/${study.slug}`}
            className="relative hidden min-h-[300px] overflow-hidden rounded-r-[14px] border-l border-gray-300/65 lg:block"
            aria-label={`Read case study: ${study.name}`}
          >
            <Image
              src={mediaSrc}
              alt={mediaAlt}
              fill
              sizes="(max-width: 1280px) 50vw, 480px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-r from-gray-950/5 via-transparent to-gray-950/10" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function GrowthMilestoneTag({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 rounded-[14px] border border-gray-100 bg-gray-900 px-4 py-2 font-mono text-base leading-none text-gray-100 shadow-[0_0_30px_var(--color-gray-950)] sm:text-[20px]"
      style={style}
    >
      {children}
    </div>
  );
}

export default function ImpactPage() {
  const caseStudies = caseStudyHighlights
    .map((item) => {
      const study = getCaseStudyBySlug(item.slug);
      if (!study) return null;

      const app = study.relatedApps?.[0]
        ? getAppBySlug(study.relatedApps[0])
        : undefined;

      return { ...item, study, app };
    })
    .filter((item): item is ResolvedCaseStudyHighlight => item !== null);

  return (
    <div className="bg-gray-900 text-gray-25 py-8">
      <section className="container-page pb-14 pt-14 sm:pb-20 sm:pt-18">
        <div className="mx-auto max-w-[1028px]">
          <h1 className="font-heading text-[34px] leading-[0.95] sm:text-[56px]">
            <span className="block text-teal-500">Empowering Communities</span>
            <span className="block font-light text-gray-100">
              to fund and build what matters.
            </span>
          </h1>

          <ResponsiveImpactHeroMetrics metrics={heroMetrics} />
        </div>
      </section>

      <section className="container-page py-24">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-3xl">
            <Eyebrow>Year by Year</Eyebrow>
            <h2 className="mt-4 font-heading text-[34px] leading-[0.95] sm:text-[46px]">
              <span className="block text-teal-500">Growing</span>
              <span className="block font-light text-gray-200">Our Impact</span>
            </h2>
          </div>
          <p className="max-w-[560px] font-serif text-lg leading-[1.45] text-gray-300 lg:pt-2">
            Launched in 2019, Gitcoin Grants empowers people and collectives in
            web3 to direct funding toward projects and causes they believe in.
            What began as a focused experiment has grown into a durable engine
            for public goods, with funding volume expanding dramatically each
            year.
          </p>
        </div>

        <ScrollReveal className="mt-10" y={28} scale={0.985}>
          <div className="relative overflow-visible rounded-[4xl] border border-gray-300/65">
            <div className="relative aspect-[1053/674] min-h-[340px] w-full">
              <Image
                src="/assets/impact/growth-chart-bg-new.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-40 rounded-[4xl]"
              />

              {growthMilestones.map((milestone, index) => (
                <ScrollReveal
                  key={milestone.year}
                  className="absolute inset-0"
                  delay={index * 110}
                  duration={520}
                  y={18}
                  scale={0.98}
                >
                  <div
                    className="absolute -translate-x-1/2 bg-gray-100/70"
                    style={{
                      left: milestone.left,
                      top: `calc(${milestone.top} + 10px)`,
                      bottom: "10px",
                      width: "2px",
                    }}
                  />
                  <GrowthMilestoneTag
                    style={{ left: milestone.left, top: milestone.top }}
                  >
                    {milestone.value}
                  </GrowthMilestoneTag>
                  <GrowthMilestoneTag
                    style={{ left: milestone.left, bottom: "-3%" }}
                  >
                    {milestone.year}
                  </GrowthMilestoneTag>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="container-page py-24">
        <SectionHeading
          eyebrow="Our Impact"
          title="On Gitcoin"
          titleAccent="Raising"
          centered
        />

        <div className="mx-auto mt-10 max-w-[1124px] overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {raisingGrid.map((item, index) => (
              <ScrollReveal
                key={item.key}
                delay={index * 55}
                duration={460}
                y={16}
                scale={0.96}
              >
                <div className="group relative origin-center overflow-hidden rounded-[2xl] border border-gray-600 bg-gray-900 transition-all duration-300 ease-out hover:shadow-[0_0_128px_0px_var(--color-iris-500)] hover:z-50 hover:scale-[1.1] hover:border-iris-500">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={281}
                    height={101}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 281px"
                    className="block h-auto w-full"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="max-w-[760px]">
          <SectionHeading
            eyebrow="Our Impact"
            title="By the Numbers"
            titleAccent="Gitcoin"
          />
        </div>

        <div className="mt-12">
          <div className="relative mx-auto w-full max-w-[1096px]">
            <ResponsiveImpactNumbersFieldMask />

            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-8">
              {numberMetrics.map((metric, index) => (
                <ScrollReveal
                  key={metric.label}
                  delay={index * 95}
                  duration={520}
                  y={20}
                  scale={0.975}
                >
                  <NumberCard {...metric} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <SectionHeading
          eyebrow="In Action"
          title="Our Case Studies"
          titleAccent="Read"
          centered
        />

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {caseStudies.map(({ slug, layout, study, app }) => (
            <CaseStudyCard key={slug} study={study} app={app} layout={layout} />
          ))}
        </div>
      </section>
      <PartnersMarqueeSection />

      <CTASection
        title="Ready to Contribute?"
        description="Start with something you know well. Share your expertise and help build the definitive resource for Ethereum funding."
        buttonText="View guidelines"
        buttonHref="/contribute"
      />
    </div>
  );
}
