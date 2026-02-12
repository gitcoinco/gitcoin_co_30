"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  DetailPageLayout,
  Breadcrumb,
  HeroImage,
  PageHeader,
  TwoColumnLayout,
  TagsSection,
  MetadataSection,
} from "@/components/layouts/DetailPageLayout";
import { Markdown } from "@/components/Markdown";
import {
  AppCard,
  MechanismCard,
  CaseStudyCard,
  ResearchCard,
  CampaignCard,
} from "@/components/cards";
import type { BaseContent } from "@/lib/types";

const CONTENT_TYPES = [
  { value: "mechanism", label: "Mechanism" },
  { value: "app", label: "App" },
  { value: "research", label: "Research" },
  { value: "case-study", label: "Case Study" },
  { value: "campaign", label: "Campaign" },
];

export default function PreviewForm() {
  const searchParams = useSearchParams();
  const [issueNumber, setIssueNumber] = useState(
    searchParams.get("issue") || "",
  );
  const [contentType, setContentType] = useState(
    searchParams.get("type") || "mechanism",
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<(BaseContent & { [key: string]: any }) | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-load if URL has params
  useEffect(() => {
    const issue = searchParams.get("issue");
    const type = searchParams.get("type");
    if (issue && type) {
      fetchPreview(issue, type);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchPreview(issue: string, type: string) {
    setLoading(true);
    setError("");
    setContent(null);

    try {
      const res = await fetch(
        `/api/preview?issue=${encodeURIComponent(issue)}&type=${encodeURIComponent(type)}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch preview");
        return;
      }

      setContent(data);
    } catch {
      setError("Failed to fetch preview");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!issueNumber) return;

    // Update URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set("issue", issueNumber);
    url.searchParams.set("type", contentType);
    window.history.replaceState({}, "", url.toString());

    fetchPreview(issueNumber, contentType);
  }

  return (
    <>
      {/* Form */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="container-page py-8">
          <h1 className="text-2xl font-bold text-gray-25 mb-6">
            Preview GitHub Issue
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Issue Number
              </label>
              <input
                type="number"
                value={issueNumber}
                onChange={(e) => setIssueNumber(e.target.value)}
                placeholder="7"
                required
                className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-900 text-gray-25 w-32"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-900 text-gray-25"
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading || !issueNumber}
              className="px-6 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Loading..." : "Preview"}
            </button>
          </form>

          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}
        </div>
      </div>

      {/* Preview */}
      {content && (
        <div>
          {/* Preview banner */}
          <div className="bg-yellow-900/30 border-b border-yellow-700/50">
            <div className="container-page py-2 text-center text-sm text-yellow-300">
              Preview of issue #{issueNumber} — this is not a published page
            </div>
          </div>

          <DetailPageLayout>
            <Breadcrumb
              href="/preview"
              label="Back to Preview"
            />

            {content.banner && (
              <HeroImage src={content.banner} alt={content.name} />
            )}

            <PageHeader>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {content.logo && !content.banner && (
                  <div className="flex-shrink-0">
                    <img
                      src={content.logo}
                      alt={`${content.name} logo`}
                      className="w-20 h-20 rounded-2xl object-cover bg-gray-800"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-25 mb-2 md:mb-4">
                    {content.name}
                  </h1>
                  <p className="text-lg text-gray-500 max-w-2xl">
                    {content.shortDescription}
                  </p>
                </div>
              </div>
            </PageHeader>

            <TwoColumnLayout
              content={
                <div className="space-y-8">
                  <article className="card p-8 md:p-10">
                    <Markdown content={content.description} />
                  </article>

                  {/* Related items — rendered as cards when they exist */}
                  {content.resolvedApps?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-25 mb-4">Related Apps</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {content.resolvedApps.map((app: any) => (
                          <AppCard key={app.id} app={app} />
                        ))}
                      </div>
                    </div>
                  )}
                  {content.resolvedMechanisms?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-25 mb-4">Related Mechanisms</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {content.resolvedMechanisms.map((m: any) => (
                          <MechanismCard key={m.id} mechanism={m} />
                        ))}
                      </div>
                    </div>
                  )}
                  {content.resolvedCaseStudies?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-25 mb-4">Related Case Studies</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {content.resolvedCaseStudies.map((cs: any) => (
                          <CaseStudyCard key={cs.id} caseStudy={cs} />
                        ))}
                      </div>
                    </div>
                  )}
                  {content.resolvedResearch?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-25 mb-4">Related Research</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {content.resolvedResearch.map((r: any) => (
                          <ResearchCard key={r.id} research={r} />
                        ))}
                      </div>
                    </div>
                  )}
                  {content.resolvedCampaigns?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-25 mb-4">Related Campaigns</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {content.resolvedCampaigns.map((c: any) => (
                          <CampaignCard key={c.id} campaign={c} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              }
              sidebar={
                <div className="space-y-6">
                  {content.tags.length > 0 && (
                    <TagsSection tags={content.tags} />
                  )}
                  <MetadataSection lastUpdated={content.lastUpdated} />
                </div>
              }
            />
          </DetailPageLayout>
        </div>
      )}
    </>
  );
}
