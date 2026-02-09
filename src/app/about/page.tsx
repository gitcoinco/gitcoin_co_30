import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Users, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Gitcoin's mission to fund public goods and our vision for the funding ecosystem.",
};

const values = [
  {
    icon: Globe,
    title: "Open Ecosystem",
    description:
      "We document the entire funding landscape, not just Gitcoin products. Every platform, mechanism, and approach has a place here.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "This directory is built by and for the community. Anyone can contribute case studies, document mechanisms, or add new platforms.",
  },
  {
    icon: BookOpen,
    title: "Education First",
    description:
      "We believe better understanding leads to better decisions. Every page is designed to teach, not just inform.",
  },
  {
    icon: Target,
    title: "Impact Focused",
    description:
      "Our goal is to help more capital flow to public goods more effectively. Everything we do serves this mission.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-25 mb-6">
              The Map of the
              <br />
              <span className="text-gray-25">Funding Universe</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              Gitcoin.co is the trusted directory and reference library for
              Ethereum public goods funding. We document what exists, what
              works, and where capital should flow next.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-25 mb-6">
              Our Mission
            </h2>
            <div className="prose prose-lg max-w-none text-gray-500">
              <p>
                The Ethereum ecosystem has evolved dramatically since 2019.
                Funding mechanisms have multiplied. New platforms, DAOs, funds,
                and experiments have emerged. What was once a simple landscape
                has become a rich, complex ecosystem.
              </p>
              <p>
                We believe this plurality is a strength, not a weakness.
                Different mechanisms serve different needs. Different
                communities have different preferences. The challenge is not to
                pick winners, but to help everyone navigate the options.
              </p>
              <p>
                That&apos;s why we built this directory: to be the intellectual
                center of Ethereum funding. Not by competing in the arena, but
                by curating it. Not by pushing one approach, but by documenting
                them all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-950">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-25 mb-12 text-center">
            What We Believe
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-25/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-gray-25" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-25 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-25 mb-6">
              About Gitcoin
            </h2>
            <div className="prose prose-lg max-w-none text-gray-500">
              <p>
                Gitcoin was founded in 2017 with a mission to build and fund
                public goods. Since then, we&apos;ve helped distribute over $60
                million to open source developers and public goods projects
                through quadratic funding rounds.
              </p>
              <p>
                We pioneered quadratic funding in production with Gitcoin
                Grants, built Gitcoin Passport for sybil-resistant identity, and
                created the Allo Protocol for modular capital allocation.
              </p>
              <p>
                This directory represents our evolution: from being one funding
                platform to being the curator of the entire funding ecosystem.
                We&apos;re not just where funding happens—we&apos;re where
                people go to understand it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gray-950 text-gray-25">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Help Us Build This
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            This directory is a community effort. Contribute case studies,
            document mechanisms, or add platforms we&apos;ve missed. Earn
            bounties for quality contributions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="/contribute"
              className="bg-gray-25 text-gray-900 hover:bg-gray-500"
            >
              Contribution Guide
            </Button>
            <Button
              href="/submit"
              className="border-2 border-white text-white hover:bg-gray-950/10"
            >
              Submit Content
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
