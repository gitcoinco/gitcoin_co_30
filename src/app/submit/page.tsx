"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  FileText,
  Zap,
  BookOpen,
  BarChart3,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button, Input, Textarea, Select, Badge } from "@/components/ui";

const contentTypes = [
  {
    value: "app",
    label: "App / Platform",
    icon: Zap,
    description: "Funding platforms, DAOs, grant programs",
    mdType: "app.md",
  },
  {
    value: "mechanism",
    label: "Mechanism",
    icon: FileText,
    description: "Funding mechanisms and approaches",
    mdType: "mechanism.md",
  },
  {
    value: "case-study",
    label: "Case Study",
    icon: BookOpen,
    description: "Analysis of a funding experiment",
    mdType: "case-study.md",
  },
  {
    value: "research",
    label: "Research",
    icon: BarChart3,
    description: "Analysis, reports, or trend pieces",
    mdType: "research.md",
  },
  {
    value: "campaign",
    label: "Campaign",
    icon: Calendar,
    description: "Active or upcoming funding rounds",
    mdType: "campaign.md",
  },
];

function SubmitContent() {
  const searchParams = useSearchParams();
  const editPath = searchParams.get("edit");

  return (
    <>
      {/* Header */}
      <section className="bg-charcoal border-b border-dark-gray">
        <div className="container-page py-12">
          <h1 className="text-3xl md:text-4xl heading text-light-white mb-4">
            {editPath ? "Suggest an Edit" : "Submit Content"}
          </h1>
          <p className="text-lg text-muted-gray max-w-3xl">
            {editPath
              ? "Help us improve this content. Your edit will be reviewed by our team."
              : "Contribute to the Gitcoin Funding Directory. Quality submissions earn bounties up to $100."}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mx-auto">
            {/* Content Type Selection */}

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-light-white">
                What would you like to submit?
              </h2>
              <div className="grid gap-4">
                {contentTypes.map((type) => (
                  <Button
                    href={`https://github.com/gitcoinco/gitcoin_co_30/issues/new?template=${type.mdType}`}
                    variant="ghost"
                    size="sm"
                    key={type.value}
                    className="card text-left flex items-center justify-start gap-4 hover:border-light-white transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-light-white/10 flex items-center justify-center flex-shrink-0">
                      <type.icon className="w-6 h-6 text-light-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-light-white">
                        {type.label}
                      </h3>
                      <p className="text-sm text-muted-gray">
                        {type.description}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-void-black">
      <Suspense fallback={<div className="container-page py-12"><p className="text-muted-gray">Loading...</p></div>}>
        <SubmitContent />
      </Suspense>
    </div>
  );
}
