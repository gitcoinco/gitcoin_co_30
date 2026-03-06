import { Metadata } from "next";
import { pageSeo } from "@/lib/page-seo";
import {
  CheckCircle,
  FileText,
  Edit,
  AlertCircle,
  Star,
  Zap,
  BookOpen,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui";
import ContributeCard from "@/components/cards/ContributeCard";

export const metadata: Metadata = pageSeo.contribute;

const contentTypes = [
  {
    type: "Case Study",
    icon: BookOpen,
    description:
      "In-depth analysis of a funding experiment with outcomes and lessons learned",
  },
  {
    type: "Mechanism Documentation",
    icon: FileText,
    description: "Comprehensive documentation of a funding mechanism",
  },
  {
    type: "App Profile",
    icon: Zap,
    description: "Complete profile of a funding platform, DAO, or program",
  },
  {
    type: "Research Piece",
    icon: BarChart3,
    description: "Original analysis or trend report",
  },
  {
    type: "Edit/Update",
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
            Help build Ethereum&apos;s definitive funding resource. We maintain
            a high bar for quality — only well-researched, original submissions
            will be accepted.
          </p>
        </div>
      </section>

      {/* Content Types */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gray-25/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-gray-25" />
              </div>
              <h2 className="text-2xl font-bold text-gray-25">
                What We Accept
              </h2>
            </div>
            <div className="card mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300">
                  We have a high quality bar. Submissions that are low-effort,
                  AI-generated slop, or lack original research will be rejected.
                  Take the time to produce something genuinely useful.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              {contentTypes.map((item) => (
                <div
                  key={item.type}
                  className="card flex flex-col md:flex-row md:items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-teal-950 border border-teal-700 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-teal-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-25">
                      {item.type}
                    </h3>
                    <p className="text-sm text-gray-400 font-serif">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

            <div className="mt-10">
              <h3 className="font-semibold text-gray-25 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                What We&apos;re NOT Looking For
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">&times;</span>
                  Low-effort or hastily written submissions
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">&times;</span>
                  AI-generated slop without original research or critical thinking
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">&times;</span>
                  Content outside our focus (non-Ethereum, non-funding topics)
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">&times;</span>
                  Promotional or marketing content for a specific project
                </li>
                <li className="flex items-start gap-2 text-gray-400">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">&times;</span>
                  Rehashes of existing content without new insight or analysis
                </li>
              </ul>
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
              Every submission must meet these standards to be accepted:
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

            <div className="grid md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-700 text-gray-25 font-bold flex items-center justify-center mx-auto mb-4">
                  0
                </div>
                <h3 className="font-semibold text-gray-25 mb-2">Plan</h3>
                <p className="text-sm text-gray-400 font-serif">
                  <a href="https://t.me/+TIzf8MYT7DY0YWVh" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 underline">Join the Telegram</a> and
                  ask what research we&apos;re interested in. Validate mutual
                  interest before spending time writing!
                </p>
              </div>
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
                  Only high quality and relevant submissions are reviewed and merged
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
                  Publish
                </h3>
                <p className="text-sm text-gray-400">
                  Approved content goes live on the site with your attribution
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Submit */}
      <section className="border-y border-teal-500 py-20 relative">
        <div className="pointer-events-none absolute inset-x-0 -top-4 h-4 bg-gradient-to-b from-transparent to-teal-500/30" />

        <ContributeCard showGuidelinesLink={false} />
      </section>

      {/* CTA - Researcher Position */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-25 mb-3">
              Become an Ongoing Researcher
            </h2>
            <p className="font-serif text-gray-400 max-w-xl mx-auto mb-8">
              Want to contribute on a regular basis? We&apos;re looking for
              dedicated researchers to help expand and maintain the directory.
            </p>
            <Button
              href="https://forms.gle/joTWdk2SHgUUwfix5"
              variant="primary"
              external
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
