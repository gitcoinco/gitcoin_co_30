"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  AppCard,
  MechanismCard,
  CaseStudyCard,
  ResearchCard,
  CampaignCard,
} from "@/components/cards";
import { Badge, EmptyState } from "@/components/ui";
import type {
  App,
  Mechanism,
  CaseStudy,
  Research,
  Campaign,
} from "@/lib/types";

const filters = [
  { value: "all", label: "All" },
  { value: "apps", label: "Apps" },
  { value: "mechanisms", label: "Mechanisms" },
  { value: "case-studies", label: "Case Studies" },
  { value: "research", label: "Research" },
  { value: "campaigns", label: "Campaigns" },
];

interface SearchClientProps {
  apps: App[];
  mechanisms: Mechanism[];
  caseStudies: CaseStudy[];
  research: Research[];
  campaigns: Campaign[];
}

export function SearchClient({
  apps,
  mechanisms,
  caseStudies,
  research,
  campaigns,
}: SearchClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("all");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q)
      return {
        apps: [],
        mechanisms: [],
        caseStudies: [],
        research: [],
        campaigns: [],
      };

    const matchedApps = apps.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );

    const matchedMechanisms = mechanisms.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.shortDescription.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)),
    );

    const matchedCaseStudies = caseStudies.filter(
      (cs) =>
        cs.name.toLowerCase().includes(q) ||
        cs.shortDescription.toLowerCase().includes(q) ||
        cs.tags.some((t) => t.toLowerCase().includes(q)),
    );

    const matchedResearch = research.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.shortDescription.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    );

    const matchedCampaigns = campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)),
    );

    return {
      apps: matchedApps,
      mechanisms: matchedMechanisms,
      caseStudies: matchedCaseStudies,
      research: matchedResearch,
      campaigns: matchedCampaigns,
    };
  }, [query, apps, mechanisms, caseStudies, research, campaigns]);

  const totalResults =
    results.apps.length +
    results.mechanisms.length +
    results.caseStudies.length +
    results.research.length +
    results.campaigns.length;

  const hasResults = totalResults > 0;
  const showApps = activeFilter === "all" || activeFilter === "apps";
  const showMechanisms =
    activeFilter === "all" || activeFilter === "mechanisms";
  const showCaseStudies =
    activeFilter === "all" || activeFilter === "case-studies";
  const showResearch = activeFilter === "all" || activeFilter === "research";
  const showCampaigns = activeFilter === "all" || activeFilter === "campaigns";

  return (
    <>
      {/* Search Header */}
      <section className="bg-gray-950 border-b border-gray-800 sticky top-16 z-40">
        <div className="container-page py-6">
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps, mechanisms, case studies..."
              className="w-full py-3 pl-12 pr-12 rounded-xl border border-gray-800 bg-gray-950 text-gray-25 placeholder:text-gray-500/60 focus:outline-none focus:ring-2 focus:ring-gray-25 focus:border-transparent"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-25"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? "bg-gray-25 text-gray-900"
                    : "bg-gray-800 text-gray-500 hover:bg-gray-500 hover:text-gray-25"
                }`}
              >
                {filter.label}
                {filter.value !== "all" && query && (
                  <span className="ml-1 opacity-75">
                    (
                    {filter.value === "apps"
                      ? results.apps.length
                      : filter.value === "mechanisms"
                        ? results.mechanisms.length
                        : filter.value === "case-studies"
                          ? results.caseStudies.length
                          : filter.value === "research"
                            ? results.research.length
                            : results.campaigns.length}
                    )
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="container-page">
          {!query ? (
            <EmptyState
              icon={Search}
              title="Start searching"
              description="Enter a search term to find apps, mechanisms, case studies, and more."
            />
          ) : !hasResults ? (
            <EmptyState
              icon={Search}
              title="No results found"
              description={`We couldn't find anything matching "${query}". Try different keywords or browse our directories.`}
              action={{ label: "Browse Apps", href: "/apps" }}
            />
          ) : (
            <div className="space-y-12">
              {/* Results count */}
              <p className="text-gray-500 text-center">
                Found{" "}
                <span className="font-medium text-gray-25">{totalResults}</span>{" "}
                results for &quot;{query}&quot;
              </p>

              {/* Apps */}
              {showApps && results.apps.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-25 mb-4 flex items-center gap-2">
                    Apps
                    <Badge size="sm">{results.apps.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.apps.map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </div>
              )}

              {/* Mechanisms */}
              {showMechanisms && results.mechanisms.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-25 mb-4 flex items-center gap-2">
                    Mechanisms
                    <Badge size="sm">{results.mechanisms.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.mechanisms.map((mechanism) => (
                      <MechanismCard key={mechanism.id} mechanism={mechanism} />
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {showCaseStudies && results.caseStudies.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-25 mb-4 flex items-center gap-2">
                    Case Studies
                    <Badge size="sm">{results.caseStudies.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.caseStudies.map((cs) => (
                      <CaseStudyCard key={cs.id} caseStudy={cs} />
                    ))}
                  </div>
                </div>
              )}

              {/* Research */}
              {showResearch && results.research.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-25 mb-4 flex items-center gap-2">
                    Research
                    <Badge size="sm">{results.research.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.research.map((r) => (
                      <ResearchCard key={r.id} research={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Campaigns */}
              {showCampaigns && results.campaigns.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-25 mb-4 flex items-center gap-2">
                    Campaigns
                    <Badge size="sm">{results.campaigns.length}</Badge>
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.campaigns.map((campaign) => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
