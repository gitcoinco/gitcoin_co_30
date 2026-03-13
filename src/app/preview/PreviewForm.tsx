"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  AppCard,
  MechanismCard,
  CaseStudyCard,
  ResearchCard,
  CampaignCard,
} from "@/components/cards";
import ContentDetailPage from "@/components/templates/ContentDetailPage";
import type { BaseContent } from "@/lib/types";

const CONTENT_TYPES = [
  { value: "mechanism", label: "Mechanism" },
  { value: "app", label: "App" },
  { value: "research", label: "Research" },
  { value: "case-study", label: "Case Study" },
  { value: "campaign", label: "Campaign" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PreviewContent = BaseContent & { description: string; [key: string]: any };

export default function PreviewForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"pr" | "issue">(
    searchParams.get("pr") ? "pr" : "issue",
  );
  const [prNumber, setPrNumber] = useState(searchParams.get("pr") || "");
  const [issueNumber, setIssueNumber] = useState(
    searchParams.get("issue") || "",
  );
  const [contentType, setContentType] = useState(
    searchParams.get("type") || "mechanism",
  );
  const [prFiles, setPrFiles] = useState<string[] | null>(null);
  const [content, setContent] = useState<PreviewContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-load if URL has params
  useEffect(() => {
    const pr = searchParams.get("pr");
    const issue = searchParams.get("issue");
    const type = searchParams.get("type");
    if (pr) fetchPreview({ pr });
    else if (issue && type) fetchPreview({ issue, type });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchPreview(
    params: { pr: string; file?: string } | { issue: string; type: string },
  ) {
    setLoading(true);
    setError("");
    setContent(null);
    setPrFiles(null);

    try {
      let qs: string;
      if ("pr" in params) {
        qs = `pr=${encodeURIComponent(params.pr)}`;
        if (params.file) qs += `&file=${encodeURIComponent(params.file)}`;
      } else {
        qs = `issue=${encodeURIComponent(params.issue)}&type=${encodeURIComponent(params.type)}`;
      }

      const res = await fetch(`/api/preview?${qs}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch preview");
        return;
      }

      // Multiple files — show picker
      if (data.files) {
        setPrFiles(data.files);
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
    const url = new URL(window.location.href);

    if (mode === "pr") {
      if (!prNumber) return;
      url.searchParams.set("pr", prNumber);
      url.searchParams.delete("issue");
      url.searchParams.delete("type");
      window.history.replaceState({}, "", url.toString());
      fetchPreview({ pr: prNumber });
    } else {
      if (!issueNumber) return;
      url.searchParams.set("issue", issueNumber);
      url.searchParams.set("type", contentType);
      url.searchParams.delete("pr");
      window.history.replaceState({}, "", url.toString());
      fetchPreview({ issue: issueNumber, type: contentType });
    }
  }

  return (
    <>
      {/* Persistent disclaimer */}
      <div className="bg-yellow-950 border-b-2 border-yellow-600">
        <div className="container-page py-3 flex items-center gap-3 text-sm text-yellow-300">
          <span className="text-yellow-500 text-base shrink-0">⚠</span>
          <span>
            <strong>This is not an official Gitcoin page.</strong> This is an
            internal tool for reviewing community contributions before they are
            published. Content shown here has not been approved or endorsed by
            Gitcoin.
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-950 border-b border-gray-800">
        <div className="container-page py-8">
          <h1 className="text-2xl font-bold text-gray-25 mb-6">
            Preview Content
          </h1>

          {/* Mode toggle */}
          <div className="flex gap-1 mb-6 p-1 rounded-lg bg-gray-900 border border-gray-800 w-fit">
            <button
              type="button"
              onClick={() => setMode("pr")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "pr" ? "bg-gray-700 text-gray-25" : "text-gray-500 hover:text-gray-300"}`}
            >
              From PR
            </button>
            <button
              type="button"
              onClick={() => setMode("issue")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "issue" ? "bg-gray-700 text-gray-25" : "text-gray-500 hover:text-gray-300"}`}
            >
              From Issue
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 items-end"
          >
            {mode === "pr" ? (
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  PR Number
                </label>
                <input
                  type="number"
                  value={prNumber}
                  onChange={(e) => setPrNumber(e.target.value)}
                  placeholder="190"
                  required
                  className="px-4 py-2 rounded-lg border border-gray-800 bg-gray-900 text-gray-25 w-32"
                />
              </div>
            ) : (
              <>
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
              </>
            )}
            <button
              type="submit"
              disabled={loading || (mode === "pr" ? !prNumber : !issueNumber)}
              className="px-6 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Loading..." : "Preview"}
            </button>
          </form>

          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}

          {prFiles && (
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">
                This PR contains multiple content files — pick one to preview:
              </p>
              <div className="flex flex-col gap-2">
                {prFiles.map((f) => {
                  const label = f
                    .replace("src/content/", "")
                    .replace(".md", "");
                  return (
                    <button
                      key={f}
                      onClick={() => fetchPreview({ pr: prNumber, file: f })}
                      className="text-left px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-teal-400 text-sm hover:border-teal-600 transition-colors w-fit"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      {content && (
        <>
          <div className="bg-yellow-900/30 border-b border-yellow-700/50">
            <div className="container-page py-2 text-center text-sm text-yellow-300">
              Previewing{" "}
              {mode === "pr" ? `PR #${prNumber}` : `issue #${issueNumber}`} —
              not published or endorsed by Gitcoin
            </div>
          </div>

          <ContentDetailPage
            item={content}
            breadcrumbHref="/preview"
            breadcrumbLabel="Back to Preview"
            ctaUrl={content.ctaUrl}
            ctaLabel={
              content.researchType
                ? `Read ${content.researchType}`
                : content.ctaUrl
                  ? "Visit"
                  : undefined
            }
            showSuggestEdit={false}
            relatedSections={[
              {
                title: "Related Apps",
                items: (content.resolvedApps ?? []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (app: any) => <AppCard key={app.slug} app={app} />,
                ),
              },
              {
                title: "Related Mechanisms",
                items: (content.resolvedMechanisms ?? []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (m: any) => <MechanismCard key={m.slug} mechanism={m} />,
                ),
              },
              {
                title: "Related Case Studies",
                items: (content.resolvedCaseStudies ?? []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (cs: any) => <CaseStudyCard key={cs.slug} caseStudy={cs} />,
                ),
              },
              {
                title: "Related Research",
                items: (content.resolvedResearch ?? []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (r: any) => <ResearchCard key={r.slug} research={r} />,
                ),
              },
              {
                title: "Related Campaigns",
                items: (content.resolvedCampaigns ?? []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (c: any) => <CampaignCard key={c.slug} campaign={c} />,
                ),
              },
            ]}
          />
        </>
      )}
    </>
  );
}
