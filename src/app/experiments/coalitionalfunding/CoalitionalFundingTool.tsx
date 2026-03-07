"use client";

import { useState, useMemo, useCallback } from "react";

/* ───────────────────────── DATA ───────────────────────── */

interface Domain {
  id: string;
  name: string;
  icon: string;
  interest: number;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  interest: number;
}

interface Project {
  id: string;
  name: string;
  description: string;
  domain: string;
  subcategory: string;
  funding: number;
  backers: number;
  status: "seeking" | "active" | "funded";
  url?: string;
}

const DOMAINS: Domain[] = [
  {
    id: "climate",
    name: "Climate & Environment",
    icon: "🌍",
    interest: 147,
    subcategories: [
      { id: "watershed", name: "Watershed Monitoring", interest: 42 },
      { id: "carbon", name: "Carbon Removal", interest: 38 },
      { id: "reforestation", name: "Reforestation", interest: 31 },
      { id: "clean-energy", name: "Clean Energy", interest: 24 },
      { id: "biodiversity", name: "Biodiversity", interest: 12 },
    ],
  },
  {
    id: "oss",
    name: "Open Source Software",
    icon: "💻",
    interest: 234,
    subcategories: [
      { id: "dev-tools", name: "Developer Tools", interest: 67 },
      { id: "protocol-infra", name: "Protocol Infrastructure", interest: 58 },
      { id: "security", name: "Security Audits", interest: 44 },
      { id: "docs", name: "Documentation", interest: 38 },
      { id: "sdks", name: "SDKs & Libraries", interest: 27 },
    ],
  },
  {
    id: "education",
    name: "Education & Onboarding",
    icon: "📚",
    interest: 89,
    subcategories: [
      { id: "web3-ed", name: "Web3 Education", interest: 34 },
      { id: "bootcamps", name: "Developer Bootcamps", interest: 22 },
      { id: "content", name: "Content Creation", interest: 18 },
      { id: "translations", name: "Translations", interest: 9 },
      { id: "research", name: "Research", interest: 6 },
    ],
  },
  {
    id: "governance",
    name: "Governance & DAOs",
    icon: "🏛️",
    interest: 112,
    subcategories: [
      { id: "voting", name: "Voting Systems", interest: 33 },
      { id: "dao-tools", name: "DAO Tooling", interest: 29 },
      { id: "treasury", name: "Treasury Management", interest: 24 },
      { id: "delegation", name: "Delegation", interest: 16 },
      { id: "proposals", name: "Proposal Frameworks", interest: 10 },
    ],
  },
  {
    id: "defi",
    name: "DeFi Infrastructure",
    icon: "🏦",
    interest: 178,
    subcategories: [
      { id: "lending", name: "Lending Protocols", interest: 45 },
      { id: "dex", name: "DEX Improvements", interest: 41 },
      { id: "oracles", name: "Oracle Networks", interest: 38 },
      { id: "risk", name: "Risk Management", interest: 32 },
      { id: "interop", name: "Interoperability", interest: 22 },
    ],
  },
  {
    id: "bioregional",
    name: "Bioregional & Local",
    icon: "🏔️",
    interest: 63,
    subcategories: [
      { id: "watershed-dao", name: "Watershed DAOs", interest: 18 },
      { id: "food", name: "Local Food Systems", interest: 15 },
      { id: "land-trust", name: "Community Land Trusts", interest: 12 },
      { id: "regen-ag", name: "Regenerative Agriculture", interest: 11 },
      { id: "municipal", name: "Municipal Coordination", interest: 7 },
    ],
  },
  {
    id: "ai-safety",
    name: "AI Safety & Alignment",
    icon: "🤖",
    interest: 156,
    subcategories: [
      { id: "alignment", name: "Alignment Research", interest: 48 },
      { id: "auditing", name: "AI Auditing", interest: 36 },
      { id: "open-ai", name: "Open-Source AI", interest: 32 },
      { id: "defensive", name: "Defensive Tools", interest: 24 },
      { id: "agent-coord", name: "Agent Coordination", interest: 16 },
    ],
  },
  {
    id: "identity",
    name: "Identity & Privacy",
    icon: "🔐",
    interest: 94,
    subcategories: [
      { id: "did", name: "Decentralized Identity", interest: 28 },
      { id: "zk", name: "Zero-Knowledge Proofs", interest: 26 },
      { id: "privacy-tools", name: "Privacy Tools", interest: 19 },
      { id: "sybil", name: "Sybil Resistance", interest: 13 },
      { id: "attestations", name: "Attestations", interest: 8 },
    ],
  },
];

const SAMPLE_PROJECTS: Project[] = [
  { id: "p1", name: "Colorado River Sensor Network", description: "Open-source water quality sensors for the Colorado River watershed, publishing data to a public knowledge commons.", domain: "climate", subcategory: "watershed", funding: 12000, backers: 8, status: "seeking" },
  { id: "p2", name: "Soil Carbon Verification Protocol", description: "On-chain verification of soil carbon sequestration using satellite imagery + ground truth sampling.", domain: "climate", subcategory: "carbon", funding: 34000, backers: 15, status: "active" },
  { id: "p3", name: "EVM Formal Verification Suite", description: "Automated formal verification tools for Solidity smart contracts, open-sourced under MIT.", domain: "oss", subcategory: "security", funding: 67000, backers: 42, status: "active" },
  { id: "p4", name: "DAO Governance Analytics Dashboard", description: "Real-time analytics on DAO participation, voter turnout, and proposal outcomes across 50+ DAOs.", domain: "governance", subcategory: "dao-tools", funding: 18000, backers: 11, status: "seeking" },
  { id: "p5", name: "Boulder Bioregional Data Commons", description: "Community-owned repository of ecological, economic, and governance data for the Front Range bioregion.", domain: "bioregional", subcategory: "watershed-dao", funding: 8000, backers: 6, status: "seeking" },
  { id: "p6", name: "AI Model Audit Framework", description: "Open framework for red-teaming and auditing AI models for alignment risks, bias, and safety.", domain: "ai-safety", subcategory: "auditing", funding: 45000, backers: 23, status: "active" },
  { id: "p7", name: "ZK-Passport Identity Layer", description: "Privacy-preserving identity verification using zero-knowledge proofs on government IDs.", domain: "identity", subcategory: "zk", funding: 82000, backers: 31, status: "funded" },
  { id: "p8", name: "Regenerative Ag Yield Tracker", description: "Open data platform tracking yields, soil health, and economic outcomes of regenerative farms.", domain: "bioregional", subcategory: "regen-ag", funding: 5000, backers: 4, status: "seeking" },
  { id: "p9", name: "Cross-Chain Oracle Standard", description: "Unified oracle interface standard enabling any chain to consume any data feed.", domain: "defi", subcategory: "oracles", funding: 55000, backers: 27, status: "active" },
  { id: "p10", name: "Web3 Curriculum for Community Colleges", description: "Free, modular web3 curriculum designed for US community college adoption.", domain: "education", subcategory: "web3-ed", funding: 22000, backers: 14, status: "seeking" },
];

/* ────────────────────── STEPS ─────────────────────── */

type Step = "select" | "elaborate" | "projects" | "pledge";

interface AttractorState {
  domain: string | null;
  subcategories: Set<string>;
  freeText: string;
  pledgeAmount: string;
  selectedProjects: Set<string>;
}

/* ────────────────────── COMPONENT ─────────────────────── */

export default function CoalitionalFundingTool() {
  const [step, setStep] = useState<Step>("select");
  const [attractor, setAttractor] = useState<AttractorState>({
    domain: null,
    subcategories: new Set(),
    freeText: "",
    pledgeAmount: "",
    selectedProjects: new Set(),
  });

  const selectedDomain = useMemo(
    () => DOMAINS.find((d) => d.id === attractor.domain),
    [attractor.domain]
  );

  const matchingProjects = useMemo(() => {
    if (!attractor.domain) return [];
    return SAMPLE_PROJECTS.filter(
      (p) =>
        p.domain === attractor.domain &&
        (attractor.subcategories.size === 0 ||
          attractor.subcategories.has(p.subcategory))
    );
  }, [attractor.domain, attractor.subcategories]);

  const totalInterest = useMemo(() => {
    if (!selectedDomain) return 0;
    if (attractor.subcategories.size === 0) return selectedDomain.interest;
    return selectedDomain.subcategories
      .filter((s) => attractor.subcategories.has(s.id))
      .reduce((sum, s) => sum + s.interest, 0);
  }, [selectedDomain, attractor.subcategories]);

  const selectDomain = useCallback((id: string) => {
    setAttractor((prev) => ({
      ...prev,
      domain: id,
      subcategories: new Set(),
      selectedProjects: new Set(),
    }));
    setStep("elaborate");
  }, []);

  const toggleSubcategory = useCallback((id: string) => {
    setAttractor((prev) => {
      const next = new Set(prev.subcategories);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, subcategories: next };
    });
  }, []);

  const toggleProject = useCallback((id: string) => {
    setAttractor((prev) => {
      const next = new Set(prev.selectedProjects);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, selectedProjects: next };
    });
  }, []);

  const goBack = useCallback(() => {
    if (step === "elaborate") setStep("select");
    else if (step === "projects") setStep("elaborate");
    else if (step === "pledge") setStep("projects");
  }, [step]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-8 text-center">
        <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-3">
          Experiment
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Fund What <span className="text-teal-400">Matters</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Pick what you care about. Find projects and funders who care too.
          Pool your capital. We handle the rest.
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2">
          {(
            [
              ["select", "What do you care about?"],
              ["elaborate", "Get specific"],
              ["projects", "Find projects"],
              ["pledge", "Pledge & join"],
            ] as [Step, string][]
          ).map(([key, label], i) => {
            const steps: Step[] = ["select", "elaborate", "projects", "pledge"];
            const currentIdx = steps.indexOf(step);
            const thisIdx = i;
            const active = thisIdx <= currentIdx;
            return (
              <div key={key} className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      active
                        ? "bg-teal-500 text-black"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  {i < 3 && (
                    <div
                      className={`flex-1 h-0.5 transition-all ${
                        thisIdx < currentIdx ? "bg-teal-500" : "bg-gray-800"
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`text-[11px] ${active ? "text-gray-300" : "text-gray-600"}`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">
        {/* ─── STEP 1: SELECT DOMAIN ─── */}
        {step === "select" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              What do you want to fund?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Pick a domain. You&apos;ll narrow it down next.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DOMAINS.sort((a, b) => b.interest - a.interest).map((d) => (
                <button
                  key={d.id}
                  onClick={() => selectDomain(d.id)}
                  className={`text-left bg-[#14141f] rounded-xl p-4 border transition-all hover:border-teal-500/40 hover:bg-[#14141f]/80 ${
                    attractor.domain === d.id
                      ? "border-teal-500/60 bg-teal-500/5"
                      : "border-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white text-sm">
                          {d.name}
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">
                          {d.interest} funders interested
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-600 text-lg">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 2: ELABORATE ─── */}
        {step === "elaborate" && selectedDomain && (
          <div>
            <button
              onClick={goBack}
              className="text-gray-500 text-sm mb-4 hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedDomain.icon}</span>
              <h2 className="text-xl font-bold text-white">
                {selectedDomain.name}
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              What specifically? Select areas that matter to you, or describe it
              in your own words.
            </p>

            {/* Subcategories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedDomain.subcategories.map((s) => {
                const selected = attractor.subcategories.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSubcategory(s.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selected
                        ? "bg-teal-500/20 text-teal-400 border border-teal-500/40"
                        : "bg-[#14141f] text-gray-400 border border-gray-700 hover:border-teal-500/30"
                    }`}
                  >
                    {s.name}
                    <span className="ml-1.5 text-xs opacity-60">
                      ({s.interest})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Free text elaboration */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 block mb-2">
                Describe what you want to fund (optional)
              </label>
              <textarea
                value={attractor.freeText}
                onChange={(e) =>
                  setAttractor((prev) => ({
                    ...prev,
                    freeText: e.target.value,
                  }))
                }
                placeholder="e.g., I want to fund open-source water quality sensors for the Colorado River Basin that publish data to a public commons..."
                className="w-full bg-[#14141f] border border-gray-700 rounded-xl p-4 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 resize-none h-24"
              />
            </div>

            {/* Interest signal */}
            <div className="bg-[#14141f] rounded-xl p-4 border border-gray-800 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-semibold">
                    Coalition signal
                  </p>
                  <p className="text-xs text-gray-500">
                    {totalInterest} other funders are interested in{" "}
                    {attractor.subcategories.size > 0
                      ? "these areas"
                      : "this domain"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(5, Math.floor(totalInterest / 10)))].map(
                      (_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500/40 to-teal-700/40 border-2 border-[#0a0a0f] flex items-center justify-center text-[10px] text-teal-400"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      )
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    +{totalInterest}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("projects")}
              className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 py-3 rounded-xl font-semibold hover:bg-teal-500/30 transition-all"
            >
              Find projects →
            </button>
          </div>
        )}

        {/* ─── STEP 3: PROJECTS ─── */}
        {step === "projects" && selectedDomain && (
          <div>
            <button
              onClick={goBack}
              className="text-gray-500 text-sm mb-4 hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold text-white mb-1">
              Projects seeking funding
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              These projects match what you care about. Select the ones you want
              to back.
            </p>

            {matchingProjects.length === 0 ? (
              <div className="bg-[#14141f] rounded-xl p-8 border border-gray-800 text-center">
                <p className="text-gray-400 mb-2">
                  No projects match yet — be the first to create an attractor.
                </p>
                <p className="text-xs text-gray-600">
                  When you pledge, builders will find you.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {matchingProjects.map((p) => {
                  const selected = attractor.selectedProjects.has(p.id);
                  const statusColors = {
                    seeking:
                      "bg-yellow-500/15 text-yellow-400",
                    active: "bg-teal-500/15 text-teal-400",
                    funded: "bg-purple-500/15 text-purple-400",
                  };
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggleProject(p.id)}
                      className={`w-full text-left bg-[#14141f] rounded-xl p-4 border transition-all ${
                        selected
                          ? "border-teal-500/50 bg-teal-500/5"
                          : "border-gray-800 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white text-sm">
                              {p.name}
                            </h3>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status]}`}
                            >
                              {p.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {p.description}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                            selected
                              ? "border-teal-500 bg-teal-500"
                              : "border-gray-600"
                          }`}
                        >
                          {selected && (
                            <span className="text-black text-xs font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>
                          💰 ${(p.funding / 1000).toFixed(0)}K raised
                        </span>
                        <span>👥 {p.backers} backers</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setStep("pledge")}
              className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 py-3 rounded-xl font-semibold hover:bg-teal-500/30 transition-all"
            >
              {attractor.selectedProjects.size > 0
                ? `Pledge to ${attractor.selectedProjects.size} project${attractor.selectedProjects.size > 1 ? "s" : ""} →`
                : "Pledge to this domain →"}
            </button>
          </div>
        )}

        {/* ─── STEP 4: PLEDGE ─── */}
        {step === "pledge" && selectedDomain && (
          <div>
            <button
              onClick={goBack}
              className="text-gray-500 text-sm mb-4 hover:text-teal-400 transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold text-white mb-1">
              Your attractor
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Review and pledge. When enough funders gather, this becomes a live
              funding round — we handle the mechanism and operations.
            </p>

            {/* Summary card */}
            <div className="bg-[#14141f] rounded-xl p-5 border border-gray-800 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{selectedDomain.icon}</span>
                <h3 className="font-bold text-white">{selectedDomain.name}</h3>
              </div>

              {attractor.subcategories.size > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1.5">Focus areas:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDomain.subcategories
                      .filter((s) => attractor.subcategories.has(s.id))
                      .map((s) => (
                        <span
                          key={s.id}
                          className="text-xs bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-full"
                        >
                          {s.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {attractor.freeText && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Your focus:</p>
                  <p className="text-sm text-gray-300 bg-[#1a1a2e] rounded-lg p-3">
                    &ldquo;{attractor.freeText}&rdquo;
                  </p>
                </div>
              )}

              {attractor.selectedProjects.size > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">
                    Backing {attractor.selectedProjects.size} project
                    {attractor.selectedProjects.size > 1 ? "s" : ""}:
                  </p>
                  <div className="space-y-1.5">
                    {SAMPLE_PROJECTS.filter((p) =>
                      attractor.selectedProjects.has(p.id)
                    ).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="text-teal-500">•</span>
                        <span className="text-gray-300">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pledge amount */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 block mb-2">
                How much do you want to pledge?
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={attractor.pledgeAmount}
                  onChange={(e) =>
                    setAttractor((prev) => ({
                      ...prev,
                      pledgeAmount: e.target.value.replace(/[^0-9]/g, ""),
                    }))
                  }
                  placeholder="5,000"
                  className="w-full bg-[#14141f] border border-gray-700 rounded-xl py-3 pl-8 pr-16 text-white text-lg font-mono focus:outline-none focus:border-teal-500/50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  USDC
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                No commitment until the round launches. Your pledge signals
                intent and helps attract builders.
              </p>
            </div>

            {/* Quick amounts */}
            <div className="flex gap-2 mb-6">
              {["1000", "5000", "10000", "25000", "50000"].map((amt) => (
                <button
                  key={amt}
                  onClick={() =>
                    setAttractor((prev) => ({ ...prev, pledgeAmount: amt }))
                  }
                  className={`flex-1 py-2 rounded-lg text-xs font-mono transition-all ${
                    attractor.pledgeAmount === amt
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "bg-[#14141f] text-gray-500 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  ${Number(amt).toLocaleString()}
                </button>
              ))}
            </div>

            {/* Coalition info */}
            <div className="bg-[#14141f] rounded-xl p-4 border border-gray-800 mb-6">
              <h4 className="text-sm font-semibold text-white mb-2">
                How this works
              </h4>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex gap-2">
                  <span className="text-teal-400">1.</span>
                  <span>
                    Your pledge is recorded (no funds move yet)
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-teal-400">2.</span>
                  <span>
                    Other funders see your signal and join the coalition
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-teal-400">3.</span>
                  <span>
                    Builders register projects matching your attractor
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-teal-400">4.</span>
                  <span>
                    At threshold, a round operator launches the round — we
                    pick the best mechanism for the context
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-teal-400">5.</span>
                  <span>
                    Fund deploys, projects build, outcomes feed back into the
                    system
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              className={`w-full py-3.5 rounded-xl font-semibold text-lg transition-all ${
                attractor.pledgeAmount
                  ? "bg-teal-500 text-black hover:bg-teal-400"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!attractor.pledgeAmount}
            >
              {attractor.pledgeAmount
                ? `Pledge $${Number(attractor.pledgeAmount).toLocaleString()} USDC`
                : "Enter an amount to pledge"}
            </button>
            <p className="text-center text-xs text-gray-600 mt-3">
              This is an experimental prototype.
              Pledges are signals, not commitments.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-xs">
            An experiment by{" "}
            <a
              href="https://gitcoin.co"
              className="text-teal-500/60 hover:text-teal-400"
            >
              Gitcoin
            </a>
            . Read the{" "}
            <a
              href="/research/mechanism-cartography-from-discovery-to-coalitional-funding"
              className="text-teal-500/60 hover:text-teal-400"
            >
              research
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
