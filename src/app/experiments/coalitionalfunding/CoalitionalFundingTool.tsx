"use client";

import { useState, useMemo, useCallback } from "react";

/* ───────────────────────── DATA ───────────────────────── */

interface Mechanism {
  id: string;
  name: string;
  slug: string;
  short: string;
  tags: string[];
  // scoring weights: community, trust, capital, speed, decentralization
  fit: [number, number, number, number, number];
  daccScore: number; // 0-100 — higher = more decentralizing
  examples: string[];
}

const MECHANISMS: Mechanism[] = [
  {
    id: "qf",
    name: "Quadratic Funding",
    slug: "quadratic-funding",
    short:
      "Democratic matching where small contributions get amplified. Favors breadth of support over whale concentration.",
    tags: ["public goods", "matching", "democratic", "community signal"],
    fit: [90, 40, 60, 50, 95],
    daccScore: 92,
    examples: ["Gitcoin Grants", "clr.fund", "Octant"],
  },
  {
    id: "retro",
    name: "Retroactive Public Goods Funding",
    slug: "retroactive-funding",
    short:
      "Fund projects after they've proven impact. Reduces risk by rewarding demonstrated value.",
    tags: ["retroactive", "impact", "public goods", "evaluation"],
    fit: [60, 70, 80, 30, 70],
    daccScore: 68,
    examples: ["Optimism RetroPGF", "Filecoin Funding the Commons"],
  },
  {
    id: "conviction",
    name: "Conviction Voting",
    slug: "conviction-voting",
    short:
      "Continuous signal where staked tokens accumulate conviction over time. Patient capital wins.",
    tags: ["continuous", "staking", "long-term", "patience"],
    fit: [70, 60, 50, 20, 85],
    daccScore: 88,
    examples: ["1Hive Gardens", "Commons Stack"],
  },
  {
    id: "direct",
    name: "Direct Grants",
    slug: "direct-grants",
    short:
      "Committee or individual decides allocation. Fast but centralized. Works when trust is high.",
    tags: ["fast", "centralized", "committee", "trust-dependent"],
    fit: [30, 90, 70, 90, 30],
    daccScore: 25,
    examples: ["Ethereum Foundation Grants", "Arbitrum STIP"],
  },
  {
    id: "bounties",
    name: "Bounties",
    slug: "bounties",
    short:
      "Defined deliverables with fixed rewards. Clear scope, clear payout. Great for tasks, less for exploration.",
    tags: ["task-based", "deliverable", "clear scope", "builder-friendly"],
    fit: [40, 50, 40, 85, 60],
    daccScore: 65,
    examples: ["owockibot bounty board", "Gitcoin Bounties (legacy)", "Dework"],
  },
  {
    id: "augmented-bonding",
    name: "Augmented Bonding Curve",
    slug: "augmented-bonding-curve",
    short:
      "Token bonding curve with funding tap. Continuous funding that scales with community conviction.",
    tags: ["bonding curve", "continuous", "token", "automated"],
    fit: [80, 30, 70, 40, 80],
    daccScore: 78,
    examples: ["Commons Stack", "Token Engineering Commons"],
  },
  {
    id: "milestone",
    name: "Milestone-Based Funding",
    slug: "milestone-based-funding",
    short:
      "Capital released as project hits predefined milestones. Balances accountability with flexibility.",
    tags: ["accountability", "staged", "milestones", "structured"],
    fit: [40, 80, 70, 50, 45],
    daccScore: 42,
    examples: ["Compound Grants 2.0", "Protocol Labs RFPs"],
  },
  {
    id: "dominance-assurance",
    name: "Dominance Assurance Contract",
    slug: "dominance-assurance-contract",
    short:
      "Crowdfunding where contributors get a bonus refund if the threshold isn't met. Incentivizes early commitment.",
    tags: ["crowdfunding", "threshold", "assurance", "incentive"],
    fit: [70, 30, 50, 60, 75],
    daccScore: 82,
    examples: ["Alex Tabarrok's proposal", "Experimental deployments"],
  },
  {
    id: "quadratic-diplomacy",
    name: "Quadratic Diplomacy",
    slug: "quadratic-diplomacy",
    short:
      "Peer evaluation where team members allocate points to each other using quadratic voting. For internal allocation.",
    tags: ["peer evaluation", "internal", "teams", "quadratic"],
    fit: [50, 80, 30, 70, 70],
    daccScore: 74,
    examples: ["Bankless DAO", "Internal team allocation"],
  },
  {
    id: "coalitional",
    name: "Coalitional Funding",
    slug: "coalitional-funding",
    short:
      "Multiple aligned funders coordinate around a shared domain, pool resources, and co-fund through a common mechanism.",
    tags: ["coalition", "pooled", "coordinated", "multi-funder"],
    fit: [85, 60, 90, 40, 80],
    daccScore: 85,
    examples: ["Gitcoin GG20 co-funding", "Protocol Guild"],
  },
  {
    id: "harberger",
    name: "Harberger Tax / SALSA",
    slug: "harberger-tax-salsa",
    short:
      "Self-assessed licenses with continuous tax. Creates efficient allocation of shared resources.",
    tags: ["property rights", "tax", "allocation", "shared resources"],
    fit: [50, 40, 60, 50, 78],
    daccScore: 76,
    examples: ["Radical Markets", "Geo Web"],
  },
  {
    id: "impact-certs",
    name: "Impact Certificates",
    slug: "impact-certificates",
    short:
      "Tradeable certificates representing verified impact. Creates a market for public goods outcomes.",
    tags: ["impact", "certificates", "market", "tradeable"],
    fit: [50, 50, 80, 40, 72],
    daccScore: 70,
    examples: ["Hypercerts", "Impact Market proposals"],
  },
];

interface Domain {
  id: string;
  name: string;
  icon: string;
  interest: number; // simulated interest count
  subcategories: string[];
}

const DOMAINS: Domain[] = [
  {
    id: "climate",
    name: "Climate & Environment",
    icon: "🌍",
    interest: 147,
    subcategories: [
      "Watershed monitoring",
      "Carbon removal",
      "Reforestation",
      "Clean energy",
      "Biodiversity",
    ],
  },
  {
    id: "oss",
    name: "Open Source Software",
    icon: "💻",
    interest: 234,
    subcategories: [
      "Developer tools",
      "Protocol infrastructure",
      "Security audits",
      "Documentation",
      "SDKs & libraries",
    ],
  },
  {
    id: "education",
    name: "Education & Onboarding",
    icon: "📚",
    interest: 89,
    subcategories: [
      "Web3 education",
      "Developer bootcamps",
      "Content creation",
      "Translations",
      "Research",
    ],
  },
  {
    id: "governance",
    name: "Governance & DAOs",
    icon: "🏛️",
    interest: 112,
    subcategories: [
      "Voting systems",
      "DAO tooling",
      "Treasury management",
      "Delegation",
      "Proposal frameworks",
    ],
  },
  {
    id: "defi",
    name: "DeFi Infrastructure",
    icon: "🏦",
    interest: 178,
    subcategories: [
      "Lending protocols",
      "DEX improvements",
      "Oracle networks",
      "Risk management",
      "Interoperability",
    ],
  },
  {
    id: "bioregional",
    name: "Bioregional & Local",
    icon: "🏔️",
    interest: 63,
    subcategories: [
      "Watershed DAOs",
      "Local food systems",
      "Community land trusts",
      "Regenerative agriculture",
      "Municipal coordination",
    ],
  },
  {
    id: "ai-safety",
    name: "AI Safety & Alignment",
    icon: "🤖",
    interest: 156,
    subcategories: [
      "Alignment research",
      "AI auditing",
      "Open-source AI",
      "Defensive tools",
      "Agent coordination",
    ],
  },
  {
    id: "identity",
    name: "Identity & Privacy",
    icon: "🔐",
    interest: 94,
    subcategories: [
      "Decentralized identity",
      "Zero-knowledge proofs",
      "Privacy tools",
      "Sybil resistance",
      "Attestations",
    ],
  },
];

interface Attractor {
  id: string;
  domain: string;
  title: string;
  mechanism: string;
  pledged: number;
  target: number;
  backers: number;
  builders: number;
  status: "forming" | "threshold_met" | "live";
}

const SAMPLE_ATTRACTORS: Attractor[] = [
  {
    id: "a1",
    domain: "climate",
    title: "Colorado River Watershed Monitoring",
    mechanism: "qf",
    pledged: 32000,
    target: 50000,
    backers: 12,
    builders: 4,
    status: "forming",
  },
  {
    id: "a2",
    domain: "oss",
    title: "Ethereum Client Diversity",
    mechanism: "retro",
    pledged: 85000,
    target: 75000,
    backers: 23,
    builders: 7,
    status: "threshold_met",
  },
  {
    id: "a3",
    domain: "ai-safety",
    title: "Open Source AI Auditing Tools",
    mechanism: "bounties",
    pledged: 15000,
    target: 40000,
    backers: 8,
    builders: 11,
    status: "forming",
  },
  {
    id: "a4",
    domain: "bioregional",
    title: "Regenerative Ag Data Commons",
    mechanism: "coalitional",
    pledged: 120000,
    target: 100000,
    backers: 31,
    builders: 9,
    status: "live",
  },
  {
    id: "a5",
    domain: "governance",
    title: "DAO Governance Research Hub",
    mechanism: "conviction",
    pledged: 22000,
    target: 60000,
    backers: 14,
    builders: 3,
    status: "forming",
  },
];

/* ───────────────────── HELPERS ────────────────────── */

function scoreMechanism(
  m: Mechanism,
  params: { community: number; trust: number; capital: number; speed: number; dacc: number }
): number {
  const { community, trust, capital, speed, dacc } = params;
  const raw =
    m.fit[0] * community +
    m.fit[1] * trust +
    m.fit[2] * capital +
    m.fit[3] * speed +
    m.fit[4] * dacc;
  const max = 100 * (community + trust + capital + speed + dacc);
  return max > 0 ? Math.round((raw / max) * 100) : 50;
}

function badgeColor(score: number) {
  if (score >= 75) return "bg-teal-500/15 text-teal-400";
  if (score >= 50) return "bg-yellow-500/15 text-yellow-400";
  return "bg-red-500/15 text-red-400";
}

function daccBadge(score: number) {
  if (score >= 80) return { label: "d/acc ✓", cls: "bg-teal-500/15 text-teal-400" };
  if (score >= 50) return { label: "d/acc ~", cls: "bg-yellow-500/15 text-yellow-400" };
  return { label: "d/acc ✗", cls: "bg-red-500/15 text-red-400" };
}

function progressPct(pledged: number, target: number) {
  return Math.min(100, Math.round((pledged / target) * 100));
}

function statusLabel(s: Attractor["status"]) {
  if (s === "forming") return { text: "Forming", cls: "bg-yellow-500/15 text-yellow-400" };
  if (s === "threshold_met")
    return { text: "Threshold Met", cls: "bg-teal-500/15 text-teal-400" };
  return { text: "Live Round", cls: "bg-purple-500/15 text-purple-400" };
}

/* ────────────────────── COMPONENT ─────────────────────── */

type Tab = "discover" | "map" | "coalitions";

export default function CoalitionalFundingTool() {
  const [tab, setTab] = useState<Tab>("discover");

  // discover sliders
  const [community, setCommunity] = useState(50);
  const [trust, setTrust] = useState(50);
  const [capital, setCapital] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [dacc, setDacc] = useState(75);

  // interest signals
  const [interested, setInterested] = useState<Set<string>>(new Set());
  const [filterDomain, setFilterDomain] = useState<string>("all");

  const toggleInterest = useCallback((domainId: string) => {
    setInterested((prev) => {
      const next = new Set(prev);
      if (next.has(domainId)) next.delete(domainId);
      else next.add(domainId);
      return next;
    });
  }, []);

  const params = useMemo(
    () => ({ community, trust, capital, speed, dacc }),
    [community, trust, capital, speed, dacc]
  );

  const ranked = useMemo(() => {
    return [...MECHANISMS]
      .map((m) => ({ ...m, score: scoreMechanism(m, params) }))
      .sort((a, b) => b.score - a.score);
  }, [params]);

  const filteredAttractors = useMemo(() => {
    if (filterDomain === "all") return SAMPLE_ATTRACTORS;
    return SAMPLE_ATTRACTORS.filter((a) => a.domain === filterDomain);
  }, [filterDomain]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-8 text-center">
        <p className="text-teal-400 font-mono text-sm tracking-widest uppercase mb-3">
          Experiment
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Coalitional Funding{" "}
          <span className="text-teal-400">Cartography</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover the right funding mechanism → find your coalition → deploy
          capital together. A reflexive loop between discovery, coalition
          formation, and funding.
        </p>

        {/* d/acc badge */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-sm text-teal-400 border border-teal-500/20">
          <span>🛡️</span>
          <span>d/acc aligned — decentralize power, preserve human agency</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="flex gap-1 bg-[#14141f] rounded-xl p-1">
          {(
            [
              ["discover", "🔍 Discover Mechanisms"],
              ["map", "🗺️ Domain Map"],
              ["coalitions", "🤝 Coalitions"],
            ] as [Tab, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                tab === key
                  ? "bg-teal-500/15 text-teal-400"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* ─── DISCOVER TAB ─── */}
        {tab === "discover" && (
          <div>
            {/* Sliders */}
            <div className="bg-[#14141f] rounded-2xl p-6 mb-8 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-1">
                Your Context
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Adjust sliders to match your funding scenario. The d/acc filter
                weights decentralization.
              </p>

              {[
                {
                  label: "Community Size",
                  value: community,
                  set: setCommunity,
                  low: "Small",
                  high: "Large",
                },
                {
                  label: "Trust Level",
                  value: trust,
                  set: setTrust,
                  low: "Low",
                  high: "High",
                },
                {
                  label: "Capital Scale",
                  value: capital,
                  set: setCapital,
                  low: "$1K",
                  high: "$1M+",
                },
                {
                  label: "Speed Needed",
                  value: speed,
                  set: setSpeed,
                  low: "Patient",
                  high: "Urgent",
                },
                {
                  label: "Decentralization Priority",
                  value: dacc,
                  set: setDacc,
                  low: "Pragmatic",
                  high: "d/acc Max",
                },
              ].map(({ label, value, set, low, high }) => (
                <div key={label} className="mb-5 last:mb-0">
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span className="font-semibold text-white">{label}</span>
                    <span className="text-teal-400 font-mono">{value}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16 text-right">
                      {low}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={value}
                      onChange={(e) => set(Number(e.target.value))}
                      className="flex-1 h-1.5 rounded-full appearance-none bg-gray-700 accent-teal-500 cursor-pointer [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(2,226,172,0.4)]"
                    />
                    <span className="text-xs text-gray-500 w-16">{high}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <h2 className="text-xl font-bold text-white mb-4">
              Recommended Mechanisms
            </h2>
            <div className="space-y-4">
              {ranked.map((m) => {
                const dacc_info = daccBadge(m.daccScore);
                return (
                  <div
                    key={m.id}
                    className="bg-[#14141f] rounded-2xl p-5 border border-gray-800 hover:border-teal-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <a
                          href={`/mechanisms/${m.slug}`}
                          className="text-lg font-bold text-white hover:text-teal-400 transition-colors"
                        >
                          {m.name}
                        </a>
                        <div className="flex gap-2 mt-1.5">
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColor(m.score)}`}
                          >
                            {m.score}% fit
                          </span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${dacc_info.cls}`}
                          >
                            {dacc_info.label} ({m.daccScore})
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{m.short}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-1 bg-gray-700 rounded-full">
                        <div
                          className="h-1 bg-teal-500 rounded-full transition-all duration-500"
                          style={{ width: `${m.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {m.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Examples:{" "}
                      {m.examples.map((e, i) => (
                        <span key={e}>
                          {i > 0 && ", "}
                          <span className="text-gray-400">{e}</span>
                        </span>
                      ))}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── MAP TAB ─── */}
        {tab === "map" && (
          <div>
            <div className="bg-[#14141f] rounded-2xl p-6 mb-8 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-1">
                Demand Signal Map
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Where is funding interest clustering? Signal your interest to
                help coalitions form. Numbers are aggregated anonymous queries.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOMAINS.sort((a, b) => b.interest - a.interest).map((d) => {
                  const maxInterest = Math.max(...DOMAINS.map((x) => x.interest));
                  const pct = Math.round((d.interest / maxInterest) * 100);
                  const isInterested = interested.has(d.id);
                  return (
                    <div
                      key={d.id}
                      className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-700/50 hover:border-teal-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{d.icon}</span>
                          <div>
                            <h3 className="font-semibold text-white text-sm">
                              {d.name}
                            </h3>
                            <span className="text-xs text-gray-500 font-mono">
                              {d.interest + (isInterested ? 1 : 0)} interested
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleInterest(d.id)}
                          className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                            isInterested
                              ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                              : "bg-gray-700/50 text-gray-400 border border-gray-600/50 hover:border-teal-500/30"
                          }`}
                        >
                          {isInterested ? "✓ Interested" : "+ I care"}
                        </button>
                      </div>
                      {/* interest bar */}
                      <div className="h-1.5 bg-gray-700 rounded-full mt-3 mb-3">
                        <div
                          className="h-1.5 bg-teal-500/70 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {d.subcategories.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The loop explanation */}
            <div className="bg-[#14141f] rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-4">
                The Reflexive Loop
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    n: "1",
                    title: "Discover",
                    desc: "Describe your problem. Find the right mechanism.",
                    icon: "🔍",
                  },
                  {
                    n: "2",
                    title: "Coalesce",
                    desc: "See who else cares. Signal your interest.",
                    icon: "🤝",
                  },
                  {
                    n: "3",
                    title: "Fund",
                    desc: "Pool capital. Deploy through the right mechanism.",
                    icon: "💰",
                  },
                  {
                    n: "4",
                    title: "Learn",
                    desc: "Track outcomes. Feed learnings back into the map.",
                    icon: "📊",
                  },
                ].map(({ n, title, desc, icon }) => (
                  <div
                    key={n}
                    className="text-center p-4 rounded-xl bg-[#1a1a2e] border border-gray-700/50"
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <div className="text-teal-400 font-mono text-xs mb-1">
                      Stage {n}
                    </div>
                    <h3 className="font-bold text-white mb-1">{title}</h3>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <span className="text-teal-400 text-sm">
                  ↻ Each loop makes the map smarter
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─── COALITIONS TAB ─── */}
        {tab === "coalitions" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Active Attractors
                </h2>
                <p className="text-gray-500 text-sm">
                  Proto-rounds gathering energy. Pledge to help them reach
                  threshold.
                </p>
              </div>
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="bg-[#14141f] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 appearance-none cursor-pointer"
              >
                <option value="all">All domains</option>
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.icon} {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {filteredAttractors.map((a) => {
                const pct = progressPct(a.pledged, a.target);
                const st = statusLabel(a.status);
                const mech = MECHANISMS.find((m) => m.id === a.mechanism);
                const domain = DOMAINS.find((d) => d.id === a.domain);
                return (
                  <div
                    key={a.id}
                    className="bg-[#14141f] rounded-2xl p-5 border border-gray-800 hover:border-teal-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>{domain?.icon}</span>
                          <h3 className="font-bold text-white">{a.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${st.cls}`}
                          >
                            {st.text}
                          </span>
                          {mech && (
                            <span className="text-xs bg-gray-800 text-gray-400 px-2.5 py-0.5 rounded-full">
                              via {mech.name}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        className={`text-sm px-4 py-2 rounded-lg font-semibold transition-all ${
                          a.status === "live"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            : "bg-teal-500/20 text-teal-400 border border-teal-500/30 hover:bg-teal-500/30"
                        }`}
                      >
                        {a.status === "live" ? "Join Round →" : "Pledge"}
                      </button>
                    </div>

                    {/* Progress */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>
                          ${(a.pledged / 1000).toFixed(0)}K pledged of $
                          {(a.target / 1000).toFixed(0)}K target
                        </span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            a.status === "live"
                              ? "bg-purple-500"
                              : a.status === "threshold_met"
                                ? "bg-teal-400"
                                : "bg-teal-500/70"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-6 text-xs text-gray-500">
                      <span>
                        👥 <span className="text-gray-300">{a.backers}</span>{" "}
                        backers
                      </span>
                      <span>
                        🔨 <span className="text-gray-300">{a.builders}</span>{" "}
                        builders
                      </span>
                      <span>
                        🏛️{" "}
                        <span className="text-gray-300">{domain?.name}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-[#14141f] rounded-2xl p-6 border border-teal-500/20 text-center">
              <h3 className="text-lg font-bold text-white mb-2">
                Don&apos;t see your domain?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Create an attractor to start gathering a coalition around what
                you care about.
              </p>
              <button className="bg-teal-500/20 text-teal-400 border border-teal-500/30 px-6 py-2.5 rounded-lg font-semibold hover:bg-teal-500/30 transition-all">
                + Create Attractor
              </button>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-xs">
            This is an experimental prototype by{" "}
            <a href="https://gitcoin.co" className="text-teal-500/60 hover:text-teal-400">
              Gitcoin
            </a>
            . Read the{" "}
            <a
              href="/research/mechanism-cartography-from-discovery-to-coalitional-funding"
              className="text-teal-500/60 hover:text-teal-400"
            >
              research article
            </a>{" "}
            or explore the{" "}
            <a
              href="https://mechanism-finder.vercel.app"
              className="text-teal-500/60 hover:text-teal-400"
            >
              Mechanism Finder
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
