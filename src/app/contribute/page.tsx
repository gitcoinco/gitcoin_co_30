import { Metadata } from 'next'
import { CheckCircle, DollarSign, FileText, Edit, AlertCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contribution Guide',
  description: 'Learn how to contribute to the Gitcoin Funding Directory and earn bounties.',
}

const bounties = [
  { type: 'Case Study', amount: '$100', description: 'In-depth analysis of a funding experiment with outcomes and lessons learned' },
  { type: 'Mechanism Documentation', amount: '$75', description: 'Comprehensive documentation of a funding mechanism' },
  { type: 'App Profile', amount: '$50', description: 'Complete profile of a funding platform, DAO, or program' },
  { type: 'Research Piece', amount: '$100', description: 'Original analysis or trend report' },
  { type: 'Edit/Update', amount: '$25', description: 'Significant improvements to existing content' },
]

const qualityStandards = [
  'Factually accurate and well-researched',
  'Clear, concise writing without jargon',
  'Includes relevant links and sources',
  'Covers both strengths and limitations fairly',
  'Original content, not copied from elsewhere',
  'Follows our style guide and formatting',
]

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-lichenpunk-offWhite">
      {/* Header */}
      <section className="bg-white border-b border-lichenpunk-warmGray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Contribution Guide
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl">
            Help build Ethereum&apos;s definitive funding resource. Quality contributions
            earn bounties and recognition in the community.
          </p>
        </div>
      </section>

      {/* Bounties */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gitcoin-green/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-gitcoin-green" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                Bounty Rates
              </h2>
            </div>
            <div className="grid gap-4">
              {bounties.map((bounty) => (
                <div key={bounty.type} className="card flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">{bounty.type}</h3>
                    <p className="text-sm text-text-secondary">{bounty.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-gitcoin-green">
                    {bounty.amount}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-secondary mt-4 text-center">
              Bounties are paid in ETH or USDC to your provided wallet address upon approval.
            </p>
          </div>
        </div>
      </section>

      {/* What to Contribute */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-solarpunk-sky/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-solarpunk-sky" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                What We&apos;re Looking For
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-text-primary mb-4">High Priority</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-text-secondary">
                    <Star className="w-4 h-4 text-solarpunk-orange mt-1 flex-shrink-0" />
                    Case studies from recent funding rounds (GG24, RetroPGF4, etc.)
                  </li>
                  <li className="flex items-start gap-2 text-text-secondary">
                    <Star className="w-4 h-4 text-solarpunk-orange mt-1 flex-shrink-0" />
                    Documentation of emerging mechanisms
                  </li>
                  <li className="flex items-start gap-2 text-text-secondary">
                    <Star className="w-4 h-4 text-solarpunk-orange mt-1 flex-shrink-0" />
                    Profiles of DAOs with active grant programs
                  </li>
                  <li className="flex items-start gap-2 text-text-secondary">
                    <Star className="w-4 h-4 text-solarpunk-orange mt-1 flex-shrink-0" />
                    Research on funding effectiveness and impact
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-4">Always Welcome</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-gitcoin-green mt-1 flex-shrink-0" />
                    Updates to outdated information
                  </li>
                  <li className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-gitcoin-green mt-1 flex-shrink-0" />
                    New platforms and tools we&apos;ve missed
                  </li>
                  <li className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-gitcoin-green mt-1 flex-shrink-0" />
                    Translations (coming soon)
                  </li>
                  <li className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-gitcoin-green mt-1 flex-shrink-0" />
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
              <div className="w-10 h-10 rounded-lg bg-lichenpunk-moss/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-lichenpunk-moss" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                Quality Standards
              </h2>
            </div>
            <p className="text-text-secondary mb-6">
              To earn a bounty, your submission must meet these standards:
            </p>
            <div className="card">
              <ul className="space-y-4">
                {qualityStandards.map((standard, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gitcoin-green/10 text-gitcoin-green text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-text-secondary">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-lunarpunk-lavender/10 flex items-center justify-center">
                <Edit className="w-5 h-5 text-lunarpunk-lavender" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-lichenpunk-warmGray text-text-primary font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Submit</h3>
                <p className="text-sm text-text-secondary">
                  Fill out the submission form with your content
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-lichenpunk-warmGray text-text-primary font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Review</h3>
                <p className="text-sm text-text-secondary">
                  Our team reviews within 3-5 business days
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-lichenpunk-warmGray text-text-primary font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Feedback</h3>
                <p className="text-sm text-text-secondary">
                  We may request revisions before approval
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gitcoin-green text-text-primary font-bold flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Publish & Pay</h3>
                <p className="text-sm text-text-secondary">
                  Content goes live, bounty sent to your wallet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-lichenpunk-lichen text-white">
        <div className="container-page text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Contribute?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Start with something you know well. Share your expertise and help build
            the definitive resource for Ethereum funding.
          </p>
          <Button href="/submit" className="bg-gitcoin-green text-text-primary hover:bg-gitcoin-softCyan">
            Start Contributing
          </Button>
        </div>
      </section>
    </div>
  )
}
