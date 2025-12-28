'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, FileText, Zap, BookOpen, BarChart3, Calendar, CheckCircle } from 'lucide-react'
import { Button, Input, Textarea, Select, Badge } from '@/components/ui'

const contentTypes = [
  { value: 'app', label: 'App / Platform', icon: Zap, description: 'Funding platforms, DAOs, grant programs' },
  { value: 'mechanism', label: 'Mechanism', icon: FileText, description: 'Funding mechanisms and approaches' },
  { value: 'case-study', label: 'Case Study', icon: BookOpen, description: 'Analysis of a funding experiment' },
  { value: 'research', label: 'Research', icon: BarChart3, description: 'Analysis, reports, or trend pieces' },
  { value: 'campaign', label: 'Campaign', icon: Calendar, description: 'Active or upcoming funding rounds' },
]

function SubmitContent() {
  const searchParams = useSearchParams()
  const editPath = searchParams.get('edit')
  const preselectedType = searchParams.get('type') || ''

  const [selectedType, setSelectedType] = useState(preselectedType)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-void-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-light-white/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-light-white" />
          </div>
          <h1 className="text-2xl font-bold text-light-white mb-4">
            Submission Received!
          </h1>
          <p className="text-muted-gray mb-6">
            Thank you for contributing to the Gitcoin Funding Directory. Our team will review your submission and get back to you within 3-5 business days.
          </p>
          <Button href="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-light-white mb-4">
            {editPath ? 'Suggest an Edit' : 'Submit Content'}
          </h1>
          <p className="text-lg text-muted-gray max-w-3xl">
            {editPath
              ? 'Help us improve this content. Your edit will be reviewed by our team.'
              : 'Contribute to the Gitcoin Funding Directory. Quality submissions earn bounties up to $100.'}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            {/* Edit notice */}
            {editPath && (
              <div className="card bg-system-info/10 border-system-info mb-8">
                <p className="text-sm text-light-white">
                  Editing: <code className="bg-charcoal px-2 py-0.5 rounded">{editPath}</code>
                </p>
              </div>
            )}

            {/* Content Type Selection */}
            {!editPath && !selectedType && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-light-white">
                  What would you like to submit?
                </h2>
                <div className="grid gap-4">
                  {contentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className="card text-left flex items-center gap-4 hover:border-light-white transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-light-white/10 flex items-center justify-center flex-shrink-0">
                        <type.icon className="w-6 h-6 text-light-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-light-white">{type.label}</h3>
                        <p className="text-sm text-muted-gray">{type.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            {(selectedType || editPath) && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {selectedType && (
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="active">
                      {contentTypes.find((t) => t.value === selectedType)?.label}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => setSelectedType('')}
                      className="text-sm text-muted-gray hover:text-light-white"
                    >
                      Change type
                    </button>
                  </div>
                )}

                <div className="card space-y-6">
                  <h2 className="text-xl font-semibold text-light-white">
                    Basic Information
                  </h2>

                  <Input
                    label="Title / Name"
                    name="title"
                    placeholder="Enter the title or name"
                    required
                  />

                  <Input
                    label="Tagline"
                    name="tagline"
                    placeholder="A short description (one sentence)"
                    helperText="Keep it concise - this appears in cards and previews"
                  />

                  <Textarea
                    label="Full Description"
                    name="description"
                    placeholder="Provide a comprehensive description..."
                    helperText="Markdown is supported"
                  />

                  {selectedType === 'app' && (
                    <>
                      <Input
                        label="Website URL"
                        name="website"
                        type="url"
                        placeholder="https://"
                      />
                      <Select
                        label="Category"
                        name="category"
                        options={[
                          { value: 'platform', label: 'Platform' },
                          { value: 'dao', label: 'DAO' },
                          { value: 'grant-program', label: 'Grant Program' },
                          { value: 'fund', label: 'Fund' },
                          { value: 'primitive', label: 'Primitive' },
                        ]}
                        placeholder="Select a category"
                      />
                    </>
                  )}

                  {selectedType === 'case-study' && (
                    <>
                      <Input
                        label="Project Name"
                        name="project"
                        placeholder="Name of the funded project"
                      />
                      <Input
                        label="Funding Amount"
                        name="fundingAmount"
                        placeholder="e.g., $100,000 or 50,000 OP"
                      />
                      <Select
                        label="Outcome"
                        name="status"
                        options={[
                          { value: 'success', label: 'Success' },
                          { value: 'partial', label: 'Partial Success' },
                          { value: 'ongoing', label: 'Ongoing' },
                          { value: 'failed', label: 'Failed' },
                        ]}
                        placeholder="Select outcome"
                      />
                    </>
                  )}

                  {selectedType === 'campaign' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Start Date"
                          name="startDate"
                          type="date"
                        />
                        <Input
                          label="End Date"
                          name="endDate"
                          type="date"
                        />
                      </div>
                      <Input
                        label="Matching/Funding Pool"
                        name="fundingPool"
                        placeholder="e.g., $500,000 or 1M OP"
                      />
                      <Input
                        label="Application URL"
                        name="applicationUrl"
                        type="url"
                        placeholder="https://"
                      />
                    </>
                  )}

                  <Input
                    label="Tags"
                    name="tags"
                    placeholder="Enter tags separated by commas"
                    helperText="e.g., quadratic funding, ethereum, grants"
                  />
                </div>

                <div className="card space-y-6">
                  <h2 className="text-xl font-semibold text-light-white">
                    Your Information
                  </h2>
                  <p className="text-sm text-muted-gray -mt-4">
                    Optional - for attribution and bounty payments
                  </p>

                  <Input
                    label="Your Name"
                    name="authorName"
                    placeholder="How should we credit you?"
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="For follow-up questions"
                  />

                  <Input
                    label="Wallet Address (for bounties)"
                    name="wallet"
                    placeholder="0x..."
                    helperText="Ethereum address for bounty payments"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" variant="primary" className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Review
                  </Button>
                  <Button type="button" variant="secondary" href="/">
                    Cancel
                  </Button>
                </div>

                <p className="text-sm text-muted-gray text-center">
                  By submitting, you agree that your contribution may be edited and published
                  under an open license. Quality submissions earn bounties up to $100.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function SubmitLoading() {
  return (
    <div className="min-h-screen bg-void-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-light-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-gray">Loading...</p>
      </div>
    </div>
  )
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-void-black">
      <Suspense fallback={<SubmitLoading />}>
        <SubmitContent />
      </Suspense>
    </div>
  )
}
