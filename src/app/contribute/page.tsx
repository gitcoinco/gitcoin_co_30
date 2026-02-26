import { Metadata } from "next";
import {
  CheckCircle,
  DollarSign,
  FileText,
  Edit,
  AlertCircle,
  Star,
  Zap,
  BookOpen,
  BarChart3,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui";
import ContributeCard from "@/components/cards/ContributeCard";

export const metadata: Metadata = {
  title: "Contribution Guide",
  description:
    "Learn how to contribute to the Gitcoin Funding Directory and earn bounties.",
};

const bounties = [
  {
    type: "Case Study",
    amount: "$100",
    icon: BookOpen,
    description:
      "In-depth analysis of a funding experiment with outcomes and lessons learned",
  },
  {
    type: "Mechanism Documentation",
    amount: "$75",
    icon: FileText,
    description: "Comprehensive documentation of a funding mechanism",
  },
  {
    type: "App Profile",
    amount: "$50",
    icon: Zap,
    description: "Complete profile of a funding platform, DAO, or program",
  },
  {
    type: "Research Piece",
    amount: "$100",
    icon: BarChart3,
    description: "Original analysis or trend report",
  },
  {
    type: "Edit/Update",
    amount: "$25",
    icon: Edit,
    description: "Significant improvements to existing content",
  },
];

const qualityStandards = [
  "Factually accurate and well-researched",
  "Clear, concise writing without jargon",
  "Includes relevant links and sources",
  "Covers both strengths and limitations fairly",
  "Original content, not copied from elsewhere",
  "Follows our style guide and formatting",
];

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-25 mb-4">
            Contribution Guide
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl font-serif">
            Help build Ethereum&apos;s definitive funding resource. Quality
            contributions earn bounties and recognition in the community.
          </p>
        </div>
      </section>

      {/* Bounties */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-25">Bounty Rates</h2>
            </div>
            <div className="grid gap-4">
              {bounties.map((bounty) => (
                <div
                  key={bounty.type}
                  className="card flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-teal-950 border border-teal-700 flex items-center justify-center flex-shrink-0">
                    <bounty.icon className="w-6 h-6 text-teal-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-25">
                      {bounty.type}
                    </h3>
                    <p className="text-sm text-gray-400 font-serif">
                      {bounty.description}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-gray-25">
                    {bounty.amount}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-4 text-center">
              Bounties are paid in ETH or USDC to your provided wallet address
              upon approval.
            </p>
          </div>
        </div>
      </section>

      {/* What to Contribute */}
      <section className="section ">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gray-25/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-25" />
              </div>
              <h2 className="text-2xl font-bold text-gray-25">
                What We&apos;re Looking For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-25 mb-4">
                  High Priority
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-400">
                    <Star className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Case studies from recent funding rounds (GG24, RetroPGF4,
                    etc.)
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <Star className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Documentation of emerging mechanisms
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <Star className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Profiles of DAOs with active grant programs
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <Star className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Research on funding effectiveness and impact
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-25 mb-4">
                  Always Welcome
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Updates to outdated information
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    New platforms and tools we&apos;ve missed
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Translations (coming soon)
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <CheckCircle className="w-4 h-4 text-gray-25 mt-1 flex-shrink-0" />
                    Corrections and fact-checking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gray-25/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-25" />
              </div>
              <h2 className="text-2xl font-bold text-gray-25">
                Quality Standards
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              To earn a bounty, your submission must meet these standards:
            </p>
            <div className="card">
              <ul className="space-y-4">
                {qualityStandards.map((standard, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-25/10 text-gray-25 text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-400">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section ">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gray-25/10 flex items-center justify-center">
                <Edit className="w-5 h-5 text-gray-25" />
              </div>
              <h2 className="text-2xl font-bold text-gray-25">How It Works</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-gray-25 font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-25 mb-2">Submit</h3>
                <p className="text-sm text-gray-400 font-serif">
                  Fill out the submission form with your content
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-gray-25 font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-25 mb-2">Review</h3>
                <p className="text-sm text-gray-400 font-serif">
                  Our team reviews within 30 business days
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-gray-25 font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-25 mb-2">Feedback</h3>
                <p className="text-sm text-gray-400 font-serif">
                  We may request revisions before approval
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-gray-25 font-bold flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-gray-25 mb-2">
                  Publish & Pay
                </h3>
                <p className="text-sm text-gray-400">
                  Content goes live, bounty sent to your wallet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-teal-500 py-20 relative">
        <div className="pointer-events-none absolute inset-x-0 -top-4 h-4 bg-gradient-to-b from-transparent to-teal-500/30" />

        <ContributeCard showGuidelinesLink={false} />
      </section>
    </div>
  );
}
