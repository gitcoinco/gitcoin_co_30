import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import {
  ListPageLayout,
  ListPageHeader,
} from "@/components/layouts";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Experimental tools for coordination, funding, and public goods discovery.",
};

const experiments = [
  {
    slug: "dacc-coalition-builder",
    title: "d/acc Coalition Builder",
    description:
      "Map the problem space, find your coalition, and deploy capital through the right mechanism. A reflexive feedback loop between discovering, coalescing, funding, and learning.",
    status: "Alpha" as const,
    icon: Map,
  },
];

export default function ExperimentsPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Experiments"
        description="Gitcoin-curated Experimental tools pushing the frontier of coordination"
      />

      <section className="section">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((exp) => (
              <Link
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className="card group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-teal-500/10 text-teal-400">
                    <exp.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-semibold text-gray-25">
                        {exp.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 font-medium">
                        {exp.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{exp.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm text-teal-400 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ListPageLayout>
  );
}
