type PartnersMarqueeSectionProps = {
  title?: string;
  description?: string;
};

type MarqueeRowConfig = {
  id: string;
  names: readonly string[];
  animationClassName: string;
  textClassName: string;
};

const MARQUEE_ANIMATION_STYLES = `
  @keyframes partners-marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .partners-marquee-fwd {
    animation: partners-marquee 55s linear infinite;
    display: flex;
    width: max-content;
  }

  .partners-marquee-rev {
    animation: partners-marquee 55s linear infinite reverse;
    display: flex;
    width: max-content;
  }
`;

function repeatForMarquee<T>(items: readonly T[], repeatCount = 4) {
  return Array.from({ length: repeatCount }, () => items).flat();
}

const MARQUEE_ROWS: readonly MarqueeRowConfig[] = [
  {
    id: "headline",
    names: repeatForMarquee([
      "Momus",
      "Ethereum Foundation",
      "Yearn",
      "Polygon",
      "ENS",
    ]),
    animationClassName: "partners-marquee-fwd",
    textClassName:
      "text-[64px] font-heading font-bold text-gray-25 whitespace-nowrap pr-20 md:text-[80px] lg:text-[88px]",
  },
  {
    id: "subheadline",
    names: repeatForMarquee([
      "Chainlink",
      "Balancer",
      "Aragon",
      "a16z",
      "ForceDAO",
      "Synthetix",
    ]),
    animationClassName: "partners-marquee-rev",
    textClassName:
      "text-[52px] font-heading font-bold text-gray-25 whitespace-nowrap pr-16 md:text-[64px] lg:text-[72px]",
  },
  {
    id: "detail",
    names: repeatForMarquee([
      "Schmidt Futures",
      "OP Games",
      "Celo",
      "Binance",
      "Anoma",
      "Unlock Protocol",
      "Stefan George",
    ]),
    animationClassName: "partners-marquee-fwd",
    textClassName:
      "text-2xl font-mono font-semibold tracking-wider text-gray-25 whitespace-nowrap pr-12 md:text-3xl",
  },
];

function MarqueeRow({
  names,
  animationClassName,
  textClassName,
}: MarqueeRowConfig) {
  return (
    <div className="overflow-hidden">
      <div className={animationClassName}>
        {names.map((name, index) => (
          <span key={`${name}-${index}`} className={textClassName}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PartnersMarqueeSection({
  title = "Our Partners",
  description = "We partner with some of the most impactful organizations fueling the future of open source software and public goods",
}: PartnersMarqueeSectionProps) {
  return (
    <section className="overflow-x-hidden py-16">
      <style>{MARQUEE_ANIMATION_STYLES}</style>

      <div className="mx-auto mb-14 w-full max-w-[908px] px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-300 bg-gray-800/40 px-8 py-6 md:flex-row md:items-start md:gap-14">
          <h2 className="font-heading text-base font-bold whitespace-nowrap text-gray-25 sm:text-2xl">
            {title}
          </h2>
          <p className="leading-relaxed text-gray-400">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 overflow-hidden">
        {MARQUEE_ROWS.map((row) => (
          <MarqueeRow key={row.id} {...row} />
        ))}
      </div>
    </section>
  );
}
