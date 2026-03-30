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

export default function PartnersMarqueeSection({
  title = "Our Partners",
  description = "We partner with some of the most impactful organizations fueling the future of open source software and public goods",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-fwd { animation: marquee 55s linear infinite; display: flex; width: max-content; }
        .marquee-rev { animation: marquee 55s linear infinite reverse; display: flex; width: max-content; }
      `}</style>

      <div className="mx-auto w-full max-w-[908px] px-4 sm:px-6 lg:px-0 mb-14">
        <div className="rounded-2xl border border-gray-300 bg-gray-800/40 px-8 py-6 flex flex-col md:flex-row md:items-start gap-3 md:gap-14">
          <h2 className="text-base sm:text-2xl font-heading font-bold text-gray-25 whitespace-nowrap">
            {title}
          </h2>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 overflow-hidden">
        <div className="overflow-hidden">
          <div className="marquee-fwd">
            {[...partnerRow1, ...partnerRow1, ...partnerRow1, ...partnerRow1].map(
              (name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-[64px] md:text-[80px] lg:text-[88px] font-heading font-bold text-gray-25 whitespace-nowrap pr-20"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-rev">
            {[...partnerRow2, ...partnerRow2, ...partnerRow2, ...partnerRow2].map(
              (name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-[52px] md:text-[64px] lg:text-[72px] font-heading font-bold text-gray-25 whitespace-nowrap pr-16"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-fwd">
            {[...partnerRow3, ...partnerRow3, ...partnerRow3, ...partnerRow3].map(
              (name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-2xl md:text-3xl font-mono font-semibold text-gray-25 whitespace-nowrap pr-12 tracking-wider"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
