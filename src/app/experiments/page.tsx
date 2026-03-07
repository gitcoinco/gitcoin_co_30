import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experiments | Gitcoin",
  description: "Interactive experiments exploring new funding mechanisms, coordination tools, and public goods infrastructure.",
};

const experiments = [
  {
    slug: "dacc-coalition-builder",
    title: "d/ACC Coalition Builder",
    description: "Discover d/acc-aligned projects, form coalitions around shared interests, and stake ETH to signal funding intent. Built on the d/acc framework from wtfisdacc.com.",
    status: "alpha" as const,
    tags: ["d/acc", "Coalitional Funding", "Sepolia Testnet"],
  },
];

const statusColors = {
  alpha: "bg-amber-500/15 text-amber-400",
  beta: "bg-teal-500/15 text-teal-400",
  live: "bg-green-500/15 text-green-400",
};

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-2">
          🧪 Experiments
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Interactive Experiments
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mb-10">
          Prototypes exploring new approaches to funding, coordination, and public goods.
          These are works in progress — expect rough edges.
        </p>

        <div className="space-y-4">
          {experiments.map((exp) => (
            <Link
              key={exp.slug}
              href={`/experiments/${exp.slug}`}
              className="block bg-[#14141f] rounded-xl p-6 border border-gray-800 hover:border-teal-500/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-lg font-bold text-white group-hover:text-teal-400 transition-colors">
                  {exp.title}
                </h2>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[exp.status]}`}>
                  {exp.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{exp.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-[10px] bg-gray-800 text-gray-500 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-[#14141f] rounded-xl p-6 border border-dashed border-gray-700 text-center">
          <p className="text-gray-500 text-sm mb-1">More experiments coming soon</p>
          <p className="text-gray-600 text-xs">
            Have an idea? <a href="https://github.com/gitcoinco/gitcoin_co_30" target="_blank" className="text-teal-500/60 hover:text-teal-400">Open a PR</a>
          </p>
        </div>
      </div>
    </div>
  );
}
