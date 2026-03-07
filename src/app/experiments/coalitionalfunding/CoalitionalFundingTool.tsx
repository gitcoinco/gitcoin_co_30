"use client";

import { useState, useMemo, useCallback } from "react";

/* ───────────────────── d/acc TAXONOMY ───────────────────── */

interface Category {
  id: string;
  name: string;
  quadrant: "physical-defense" | "physical-coordination" | "digital-defense" | "digital-coordination";
  icon: string;
  interest: number;
  trending: boolean;
  subcategories: { id: string; name: string; interest: number; trending: boolean }[];
}

const QUADRANTS = {
  "physical-defense": { name: "Physical Defense", axis: "Atoms × Survive", icon: "🛡️", color: "rose" },
  "physical-coordination": { name: "Physical Coordination", axis: "Atoms × Thrive", icon: "🌱", color: "amber" },
  "digital-defense": { name: "Digital Defense", axis: "Bits × Survive", icon: "🔐", color: "cyan" },
  "digital-coordination": { name: "Digital Coordination", axis: "Bits × Thrive", icon: "⚡", color: "teal" },
} as const;

const CATEGORIES: Category[] = [
  // Physical Defense
  {
    id: "biosecurity", name: "Biosecurity", quadrant: "physical-defense", icon: "🧬",
    interest: 82, trending: false,
    subcategories: [
      { id: "pathogen-detect", name: "Pathogen Detection", interest: 34, trending: true },
      { id: "biodefense-infra", name: "Biodefense Infrastructure", interest: 28, trending: false },
      { id: "pandemic-prep", name: "Pandemic Preparedness", interest: 20, trending: false },
    ],
  },
  {
    id: "clean-energy", name: "Clean Energy", quadrant: "physical-defense", icon: "⚡",
    interest: 156, trending: true,
    subcategories: [
      { id: "solar-micro", name: "Solar Microgrids", interest: 52, trending: true },
      { id: "energy-storage", name: "Energy Storage", interest: 48, trending: true },
      { id: "nuclear-small", name: "Small Modular Reactors", interest: 34, trending: false },
      { id: "grid-resilience", name: "Grid Resilience", interest: 22, trending: false },
    ],
  },
  {
    id: "hardware", name: "Open Hardware", quadrant: "physical-defense", icon: "🔧",
    interest: 67, trending: false,
    subcategories: [
      { id: "risc-v", name: "RISC-V Ecosystem", interest: 31, trending: true },
      { id: "sensor-networks", name: "Sensor Networks", interest: 22, trending: false },
      { id: "fab-labs", name: "Fab Labs & Maker Spaces", interest: 14, trending: false },
    ],
  },

  // Physical Coordination
  {
    id: "urban-planning", name: "Urban Planning", quadrant: "physical-coordination", icon: "🏙️",
    interest: 73, trending: false,
    subcategories: [
      { id: "15min-city", name: "15-Minute Cities", interest: 28, trending: false },
      { id: "public-transit", name: "Public Transit", interest: 25, trending: false },
      { id: "housing", name: "Affordable Housing", interest: 20, trending: false },
    ],
  },
  {
    id: "supply-chains", name: "Supply Chains", quadrant: "physical-coordination", icon: "📦",
    interest: 58, trending: false,
    subcategories: [
      { id: "food-systems", name: "Local Food Systems", interest: 24, trending: false },
      { id: "regen-ag", name: "Regenerative Agriculture", interest: 22, trending: true },
      { id: "fair-trade", name: "Fair Trade Infrastructure", interest: 12, trending: false },
    ],
  },
  {
    id: "health", name: "Health", quadrant: "physical-coordination", icon: "🏥",
    interest: 91, trending: false,
    subcategories: [
      { id: "desci-health", name: "DeSci Health Research", interest: 38, trending: true },
      { id: "community-health", name: "Community Health", interest: 31, trending: false },
      { id: "open-pharma", name: "Open Pharma", interest: 22, trending: false },
    ],
  },
  {
    id: "bioregional", name: "Bioregional Coordination", quadrant: "physical-coordination", icon: "🏔️",
    interest: 63, trending: true,
    subcategories: [
      { id: "watershed-dao", name: "Watershed DAOs", interest: 21, trending: true },
      { id: "land-trust", name: "Community Land Trusts", interest: 18, trending: false },
      { id: "ecological-data", name: "Ecological Data Commons", interest: 15, trending: true },
      { id: "municipal-coord", name: "Municipal Coordination", interest: 9, trending: false },
    ],
  },

  // Digital Defense
  {
    id: "zk-privacy", name: "ZK & Privacy", quadrant: "digital-defense", icon: "🔒",
    interest: 189, trending: true,
    subcategories: [
      { id: "zk-proofs", name: "Zero-Knowledge Proofs", interest: 72, trending: true },
      { id: "encryption", name: "End-to-End Encryption", interest: 48, trending: false },
      { id: "privacy-tools", name: "Privacy-Preserving Tools", interest: 41, trending: false },
      { id: "mpc", name: "Multi-Party Computation", interest: 28, trending: true },
    ],
  },
  {
    id: "identity", name: "Decentralized Identity", quadrant: "digital-defense", icon: "🪪",
    interest: 94, trending: false,
    subcategories: [
      { id: "did", name: "DIDs & Verifiable Credentials", interest: 36, trending: false },
      { id: "sybil", name: "Sybil Resistance", interest: 28, trending: true },
      { id: "attestations", name: "Attestation Networks", interest: 18, trending: false },
      { id: "self-sovereign", name: "Self-Sovereign Identity", interest: 12, trending: false },
    ],
  },
  {
    id: "ai-safety", name: "AI Safety & Alignment", quadrant: "digital-defense", icon: "🤖",
    interest: 203, trending: true,
    subcategories: [
      { id: "alignment", name: "Alignment Research", interest: 64, trending: true },
      { id: "ai-audit", name: "AI Auditing & Red-Teaming", interest: 52, trending: true },
      { id: "open-ai-models", name: "Open-Source AI", interest: 48, trending: true },
      { id: "defensive-ai", name: "Defensive AI Tools", interest: 39, trending: false },
    ],
  },

  // Digital Coordination
  {
    id: "governance", name: "Governance & DAOs", quadrant: "digital-coordination", icon: "🏛️",
    interest: 145, trending: false,
    subcategories: [
      { id: "voting-systems", name: "Voting Systems", interest: 42, trending: false },
      { id: "dao-tooling", name: "DAO Tooling", interest: 38, trending: false },
      { id: "quadratic-mechanisms", name: "Quadratic Mechanisms", interest: 35, trending: false },
      { id: "prediction-markets", name: "Prediction Markets", interest: 30, trending: true },
    ],
  },
  {
    id: "public-goods", name: "Public Goods Funding", quadrant: "digital-coordination", icon: "🌐",
    interest: 234, trending: true,
    subcategories: [
      { id: "retro-pgf", name: "Retroactive PGF", interest: 67, trending: true },
      { id: "qf-rounds", name: "Quadratic Funding Rounds", interest: 58, trending: false },
      { id: "impact-certs", name: "Impact Certificates", interest: 44, trending: true },
      { id: "protocol-guild", name: "Protocol Guild / Drips", interest: 38, trending: false },
      { id: "oss-sustainability", name: "OSS Sustainability", interest: 27, trending: false },
    ],
  },
  {
    id: "defi-infra", name: "DeFi Infrastructure", quadrant: "digital-coordination", icon: "🏦",
    interest: 178, trending: false,
    subcategories: [
      { id: "lending", name: "Lending Protocols", interest: 45, trending: false },
      { id: "dex", name: "DEX Improvements", interest: 41, trending: false },
      { id: "oracles", name: "Oracle Networks", interest: 38, trending: false },
      { id: "interop", name: "Cross-Chain Interop", interest: 32, trending: true },
      { id: "risk-mgmt", name: "Risk Management", interest: 22, trending: false },
    ],
  },
];

interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  raised: number;
  backers: number;
  daccScore: number;
  status: "seeking" | "active" | "funded";
}

const PROJECTS: Project[] = [
  { id: "p1", name: "Colorado River Sensor Network", description: "Open-source water quality sensors publishing data to a public knowledge commons.", category: "bioregional", subcategory: "watershed-dao", raised: 12000, backers: 8, daccScore: 88, status: "seeking" },
  { id: "p2", name: "Soil Carbon Verification Protocol", description: "On-chain verification of soil carbon sequestration using satellite + ground truth.", category: "supply-chains", subcategory: "regen-ag", raised: 34000, backers: 15, daccScore: 76, status: "active" },
  { id: "p3", name: "EVM Formal Verification Suite", description: "Automated formal verification for Solidity smart contracts. MIT licensed.", category: "public-goods", subcategory: "oss-sustainability", raised: 67000, backers: 42, daccScore: 91, status: "active" },
  { id: "p4", name: "ZK-Passport Identity Layer", description: "Privacy-preserving identity verification using ZK proofs on government IDs.", category: "zk-privacy", subcategory: "zk-proofs", raised: 82000, backers: 31, daccScore: 94, status: "funded" },
  { id: "p5", name: "Boulder Bioregional Data Commons", description: "Community-owned ecological, economic, and governance data for the Front Range.", category: "bioregional", subcategory: "ecological-data", raised: 8000, backers: 6, daccScore: 86, status: "seeking" },
  { id: "p6", name: "AI Model Audit Framework", description: "Open framework for red-teaming AI models for alignment risks and bias.", category: "ai-safety", subcategory: "ai-audit", raised: 45000, backers: 23, daccScore: 89, status: "active" },
  { id: "p7", name: "Decentralized Solar Microgrid DAO", description: "Community-owned solar microgrids with tokenized energy credits.", category: "clean-energy", subcategory: "solar-micro", raised: 28000, backers: 17, daccScore: 82, status: "seeking" },
  { id: "p8", name: "Open Prediction Market Protocol", description: "Censorship-resistant prediction markets for governance signal.", category: "governance", subcategory: "prediction-markets", raised: 55000, backers: 27, daccScore: 78, status: "active" },
  { id: "p9", name: "RISC-V Security Coprocessor", description: "Open-source hardware security module on RISC-V for key management.", category: "hardware", subcategory: "risc-v", raised: 19000, backers: 11, daccScore: 92, status: "seeking" },
  { id: "p10", name: "Hypercerts Impact Market", description: "Marketplace for buying and selling verified impact certificates.", category: "public-goods", subcategory: "impact-certs", raised: 41000, backers: 19, daccScore: 74, status: "active" },
  { id: "p11", name: "DeSci Clinical Trial DAO", description: "Decentralized clinical trials with patient-owned data and open results.", category: "health", subcategory: "desci-health", raised: 36000, backers: 14, daccScore: 85, status: "seeking" },
  { id: "p12", name: "Sybil-Resistant Voting Protocol", description: "Novel sybil resistance using social graph analysis + ZK attestations.", category: "identity", subcategory: "sybil", raised: 22000, backers: 9, daccScore: 87, status: "seeking" },
];

/* ────────────────────── COMPONENT ─────────────────────── */

type Step = "quadrant" | "category" | "elaborate" | "projects" | "pledge";

interface AttractorState {
  quadrant: string | null;
  category: string | null;
  subcategories: Set<string>;
  freeText: string;
  pledgeAmount: string;
  selectedProjects: Set<string>;
}

export default function CoalitionalFundingTool() {
  const [step, setStep] = useState<Step>("quadrant");
  const [attractor, setAttractor] = useState<AttractorState>({
    quadrant: null,
    category: null,
    subcategories: new Set(),
    freeText: "",
    pledgeAmount: "",
    selectedProjects: new Set(),
  });

  const quadrantCategories = useMemo(
    () => attractor.quadrant ? CATEGORIES.filter((c) => c.quadrant === attractor.quadrant) : [],
    [attractor.quadrant]
  );

  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === attractor.category),
    [attractor.category]
  );

  const matchingProjects = useMemo(() => {
    if (!attractor.category) return [];
    return PROJECTS.filter(
      (p) => p.category === attractor.category &&
        (attractor.subcategories.size === 0 || attractor.subcategories.has(p.subcategory))
    );
  }, [attractor.category, attractor.subcategories]);

  const trendingCategories = useMemo(
    () => CATEGORIES.filter((c) => c.trending).sort((a, b) => b.interest - a.interest).slice(0, 5),
    []
  );

  const trendingSubs = useMemo(() => {
    const all: { cat: string; sub: { id: string; name: string; interest: number }; catIcon: string }[] = [];
    CATEGORIES.forEach((c) => c.subcategories.filter((s) => s.trending).forEach((s) => all.push({ cat: c.name, sub: s, catIcon: c.icon })));
    return all.sort((a, b) => b.sub.interest - a.sub.interest).slice(0, 8);
  }, []);

  const totalInterest = useMemo(() => {
    if (!selectedCategory) return 0;
    if (attractor.subcategories.size === 0) return selectedCategory.interest;
    return selectedCategory.subcategories
      .filter((s) => attractor.subcategories.has(s.id))
      .reduce((sum, s) => sum + s.interest, 0);
  }, [selectedCategory, attractor.subcategories]);

  const goBack = useCallback(() => {
    const map: Record<Step, Step> = { quadrant: "quadrant", category: "quadrant", elaborate: "category", projects: "elaborate", pledge: "projects" };
    setStep(map[step]);
  }, [step]);

  const stepLabels: [Step, string][] = [
    ["quadrant", "Pick a quadrant"],
    ["category", "Choose domain"],
    ["elaborate", "Get specific"],
    ["projects", "Find projects"],
    ["pledge", "Pledge"],
  ];
  const stepIdx = stepLabels.findIndex(([k]) => k === step);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-6 text-center">
        <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-2">
          Experiment · d/acc aligned
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Fund What <span className="text-teal-400">Matters</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto">
          Discover problems worth solving. Find others who care. Pool capital. We handle the rest.
        </p>
      </div>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-4 mb-6">
        <div className="flex items-center gap-1">
          {stepLabels.map(([key, label], i) => (
            <div key={key} className="flex-1 flex items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${i <= stepIdx ? "bg-teal-500 text-black" : "bg-gray-800 text-gray-600"}`}>
                {i + 1}
              </div>
              {i < 4 && <div className={`flex-1 h-px ${i < stepIdx ? "bg-teal-500" : "bg-gray-800"}`} />}
            </div>
          ))}
        </div>
        <div className="flex mt-1">
          {stepLabels.map(([key, label], i) => (
            <p key={key} className={`flex-1 text-[9px] ${i <= stepIdx ? "text-gray-400" : "text-gray-700"}`}>{label}</p>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-20">

        {/* ─── STEP 1: QUADRANT ─── */}
        {step === "quadrant" && (
          <div>
            {/* Trending section */}
            <div className="mb-8">
              <h3 className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-3">🔥 Trending</h3>
              <div className="flex flex-wrap gap-2">
                {trendingSubs.map(({ cat, sub, catIcon }) => (
                  <button key={sub.id}
                    onClick={() => {
                      const c = CATEGORIES.find((cc) => cc.subcategories.some((s) => s.id === sub.id));
                      if (c) {
                        setAttractor((prev) => ({ ...prev, quadrant: c.quadrant, category: c.id, subcategories: new Set([sub.id]) }));
                        setStep("elaborate");
                      }
                    }}
                    className="flex items-center gap-1.5 bg-[#14141f] border border-gray-800 rounded-full px-3 py-1.5 text-xs text-gray-300 hover:border-teal-500/30 transition-all"
                  >
                    <span>{catIcon}</span>
                    <span>{sub.name}</span>
                    <span className="text-teal-400 font-mono text-[10px]">↑{sub.interest}</span>
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-lg font-bold text-white mb-1">What area do you want to fund?</h2>
            <p className="text-gray-500 text-xs mb-4">
              Organized by the <a href="https://www.wtfisdacc.com/" target="_blank" className="text-teal-400 hover:underline">d/acc framework</a> — two axes, four quadrants.
            </p>

            {/* 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Axis labels */}
              <div className="col-span-2 flex justify-center">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">← Survive · Thrive →</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(QUADRANTS) as [keyof typeof QUADRANTS, typeof QUADRANTS[keyof typeof QUADRANTS]][]).map(([qid, q]) => {
                const cats = CATEGORIES.filter((c) => c.quadrant === qid);
                const totalInt = cats.reduce((s, c) => s + c.interest, 0);
                return (
                  <button key={qid}
                    onClick={() => { setAttractor((prev) => ({ ...prev, quadrant: qid, category: null, subcategories: new Set() })); setStep("category"); }}
                    className="text-left bg-[#14141f] rounded-xl p-4 border border-gray-800 hover:border-teal-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{q.icon}</span>
                      <span className="font-semibold text-white text-sm">{q.name}</span>
                    </div>
                    <p className="text-[10px] font-mono text-gray-600 mb-2">{q.axis}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {cats.slice(0, 3).map((c) => (
                        <span key={c.id} className="text-[10px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded">{c.name}</span>
                      ))}
                      {cats.length > 3 && <span className="text-[10px] text-gray-600">+{cats.length - 3}</span>}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{totalInt} interested</span>
                  </button>
                );
              })}
            </div>

            {/* The 4 D's */}
            <div className="mt-8 bg-[#14141f] rounded-xl p-4 border border-gray-800">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">The Four D&apos;s — Every project is scored on:</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { d: "Defensive", q: "Easier to defend than attack?" },
                  { d: "Decentralized", q: "No trust in central actors?" },
                  { d: "Democratic", q: "More people participate?" },
                  { d: "Differential", q: "Defense grows faster than offense?" },
                ].map(({ d, q }) => (
                  <div key={d} className="flex gap-2">
                    <span className="text-teal-400 font-mono font-bold text-sm">D</span>
                    <div>
                      <p className="text-xs text-white font-semibold">{d}</p>
                      <p className="text-[10px] text-gray-500">{q}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: CATEGORY ─── */}
        {step === "category" && attractor.quadrant && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{QUADRANTS[attractor.quadrant as keyof typeof QUADRANTS].icon}</span>
              <h2 className="text-lg font-bold text-white">{QUADRANTS[attractor.quadrant as keyof typeof QUADRANTS].name}</h2>
            </div>
            <p className="text-gray-500 text-xs mb-5">Pick a domain to fund.</p>
            <div className="space-y-2">
              {quadrantCategories.sort((a, b) => b.interest - a.interest).map((c) => (
                <button key={c.id}
                  onClick={() => { setAttractor((prev) => ({ ...prev, category: c.id, subcategories: new Set() })); setStep("elaborate"); }}
                  className="w-full text-left bg-[#14141f] rounded-xl p-4 border border-gray-800 hover:border-teal-500/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white text-sm">{c.name}</h3>
                        {c.trending && <span className="text-[9px] bg-teal-500/15 text-teal-400 px-1.5 py-0.5 rounded-full font-mono">trending</span>}
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{c.interest} funders interested</span>
                    </div>
                  </div>
                  <span className="text-gray-600">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── STEP 3: ELABORATE ─── */}
        {step === "elaborate" && selectedCategory && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{selectedCategory.icon}</span>
              <h2 className="text-lg font-bold text-white">{selectedCategory.name}</h2>
            </div>
            <p className="text-gray-500 text-xs mb-5">What specifically? Pick focus areas or describe in your own words.</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategory.subcategories.map((s) => {
                const sel = attractor.subcategories.has(s.id);
                return (
                  <button key={s.id}
                    onClick={() => setAttractor((prev) => {
                      const next = new Set(prev.subcategories);
                      sel ? next.delete(s.id) : next.add(s.id);
                      return { ...prev, subcategories: next };
                    })}
                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${sel ? "bg-teal-500/20 text-teal-400 border border-teal-500/40" : "bg-[#14141f] text-gray-400 border border-gray-700 hover:border-teal-500/30"}`}
                  >
                    {s.name}
                    <span className="ml-1 opacity-60">({s.interest})</span>
                    {s.trending && <span className="ml-1 text-teal-400">↑</span>}
                  </button>
                );
              })}
            </div>

            <textarea
              value={attractor.freeText}
              onChange={(e) => setAttractor((prev) => ({ ...prev, freeText: e.target.value }))}
              placeholder="Describe what you want to fund in your own words (optional)..."
              className="w-full bg-[#14141f] border border-gray-700 rounded-xl p-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500/50 resize-none h-20 mb-5"
            />

            {/* Coalition signal */}
            <div className="bg-[#14141f] rounded-xl p-3 border border-gray-800 mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-white font-semibold">{totalInterest} others interested</p>
                <p className="text-[10px] text-gray-500">{attractor.subcategories.size > 0 ? "in these focus areas" : "in this domain"}</p>
              </div>
              <div className="flex -space-x-1.5">
                {[...Array(Math.min(6, Math.max(1, Math.floor(totalInterest / 15))))].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500/30 to-teal-700/30 border-2 border-[#0a0a0f] flex items-center justify-center text-[9px] text-teal-400">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-gray-800 border-2 border-[#0a0a0f] flex items-center justify-center text-[8px] text-gray-500">+{totalInterest}</div>
              </div>
            </div>

            <button onClick={() => setStep("projects")} className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 py-3 rounded-xl font-semibold hover:bg-teal-500/30 transition-all text-sm">
              Find projects →
            </button>
          </div>
        )}

        {/* ─── STEP 4: PROJECTS ─── */}
        {step === "projects" && selectedCategory && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <h2 className="text-lg font-bold text-white mb-1">Projects seeking funding</h2>
            <p className="text-gray-500 text-xs mb-5">Select projects to back. Each has a d/acc score.</p>

            {matchingProjects.length === 0 ? (
              <div className="bg-[#14141f] rounded-xl p-6 border border-gray-800 text-center">
                <p className="text-gray-400 text-sm mb-1">No projects match yet.</p>
                <p className="text-[10px] text-gray-600">When you pledge, builders will find you.</p>
              </div>
            ) : (
              <div className="space-y-2 mb-5">
                {matchingProjects.map((p) => {
                  const sel = attractor.selectedProjects.has(p.id);
                  const tierCls = p.daccScore >= 85 ? "bg-teal-500/15 text-teal-400" : p.daccScore >= 70 ? "bg-amber-500/15 text-amber-400" : "bg-gray-700/30 text-gray-400";
                  const tierLabel = p.daccScore >= 85 ? "Core d/acc" : p.daccScore >= 70 ? "Growth" : "Speculative";
                  return (
                    <button key={p.id}
                      onClick={() => setAttractor((prev) => { const n = new Set(prev.selectedProjects); sel ? n.delete(p.id) : n.add(p.id); return { ...prev, selectedProjects: n }; })}
                      className={`w-full text-left bg-[#14141f] rounded-xl p-4 border transition-all ${sel ? "border-teal-500/50 bg-teal-500/5" : "border-gray-800 hover:border-gray-600"}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${tierCls}`}>{tierLabel} · {p.daccScore}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">{p.description}</p>
                        </div>
                        <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${sel ? "border-teal-500 bg-teal-500" : "border-gray-600"}`}>
                          {sel && <span className="text-black text-[10px] font-bold">✓</span>}
                        </div>
                      </div>
                      <div className="flex gap-4 text-[10px] text-gray-500">
                        <span>💰 ${(p.raised / 1000).toFixed(0)}K raised</span>
                        <span>👥 {p.backers} backers</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <button onClick={() => setStep("pledge")} className="w-full bg-teal-500/20 text-teal-400 border border-teal-500/30 py-3 rounded-xl font-semibold hover:bg-teal-500/30 transition-all text-sm">
              {attractor.selectedProjects.size > 0 ? `Pledge to ${attractor.selectedProjects.size} project${attractor.selectedProjects.size > 1 ? "s" : ""} →` : "Pledge to this domain →"}
            </button>
          </div>
        )}

        {/* ─── STEP 5: PLEDGE ─── */}
        {step === "pledge" && selectedCategory && (
          <div>
            <button onClick={goBack} className="text-gray-500 text-xs mb-4 hover:text-teal-400 flex items-center gap-1">← Back</button>
            <h2 className="text-lg font-bold text-white mb-1">Your attractor</h2>
            <p className="text-gray-500 text-xs mb-5">At 1 ETH threshold, this graduates to a live round.</p>

            {/* Summary */}
            <div className="bg-[#14141f] rounded-xl p-4 border border-gray-800 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{selectedCategory.icon}</span>
                <div>
                  <h3 className="font-bold text-white text-sm">{selectedCategory.name}</h3>
                  <span className="text-[10px] font-mono text-gray-500">{QUADRANTS[selectedCategory.quadrant].name}</span>
                </div>
              </div>
              {attractor.subcategories.size > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedCategory.subcategories.filter((s) => attractor.subcategories.has(s.id)).map((s) => (
                    <span key={s.id} className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full">{s.name}</span>
                  ))}
                </div>
              )}
              {attractor.freeText && <p className="text-xs text-gray-400 bg-[#1a1a2e] rounded-lg p-2 mb-2">&ldquo;{attractor.freeText}&rdquo;</p>}
              {attractor.selectedProjects.size > 0 && (
                <div className="space-y-1">
                  {PROJECTS.filter((p) => attractor.selectedProjects.has(p.id)).map((p) => (
                    <div key={p.id} className="flex items-center gap-1.5 text-xs"><span className="text-teal-500">•</span><span className="text-gray-300">{p.name}</span></div>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="mb-4">
              <div className="relative">
                <input type="text" value={attractor.pledgeAmount}
                  onChange={(e) => setAttractor((prev) => ({ ...prev, pledgeAmount: e.target.value.replace(/[^0-9.]/g, "") }))}
                  placeholder="0.5"
                  className="w-full bg-[#14141f] border border-gray-700 rounded-xl py-3 pl-4 pr-14 text-white text-lg font-mono focus:outline-none focus:border-teal-500/50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ETH</span>
              </div>
              <p className="text-[10px] text-gray-600 mt-1">No funds move until the round launches. 1% goes to Gitcoin.</p>
            </div>

            <div className="flex gap-2 mb-5">
              {["0.1", "0.25", "0.5", "1", "5"].map((amt) => (
                <button key={amt}
                  onClick={() => setAttractor((prev) => ({ ...prev, pledgeAmount: amt }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono transition-all ${attractor.pledgeAmount === amt ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-[#14141f] text-gray-500 border border-gray-700 hover:border-gray-600"}`}
                >
                  {amt} ETH
                </button>
              ))}
            </div>

            {/* How it works */}
            <div className="bg-[#14141f] rounded-xl p-4 border border-gray-800 mb-5">
              <h4 className="text-xs font-semibold text-white mb-2">How this works</h4>
              <div className="space-y-1.5 text-[11px] text-gray-500">
                {[
                  "Your pledge is recorded on-chain (no funds move yet)",
                  "Other funders see your signal and join",
                  "Builders register matching projects",
                  "At 1 ETH threshold → round launches automatically",
                  "Mechanism is selected for the context. You don't need to think about it.",
                  "Outcomes feed back into the system",
                ].map((t, i) => (
                  <div key={i} className="flex gap-2"><span className="text-teal-400">{i + 1}.</span><span>{t}</span></div>
                ))}
              </div>
            </div>

            <button
              disabled={!attractor.pledgeAmount || parseFloat(attractor.pledgeAmount) <= 0}
              className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${attractor.pledgeAmount && parseFloat(attractor.pledgeAmount) > 0 ? "bg-teal-500 text-black hover:bg-teal-400" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
            >
              {attractor.pledgeAmount && parseFloat(attractor.pledgeAmount) > 0 ? `Pledge ${attractor.pledgeAmount} ETH` : "Enter amount"}
            </button>
            <p className="text-center text-[10px] text-gray-600 mt-2">Experimental prototype. Pledges are signals, not commitments.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-14 text-center">
          <p className="text-gray-600 text-[10px]">
            Built on the <a href="https://www.wtfisdacc.com/" target="_blank" className="text-teal-500/60 hover:text-teal-400">d/acc framework</a> by{" "}
            <a href="https://gitcoin.co" className="text-teal-500/60 hover:text-teal-400">Gitcoin</a>
          </p>
        </div>
      </div>
    </div>
  );
}
