"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Shield,
  Network,
  Users,
  TrendingUp,
  Search,
  Flame,
  Check,
  Loader2,
  Wallet,
  ArrowDownToLine,
  Activity,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  LogOut,
} from "lucide-react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useSwitchChain,
  useEnsName,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { domains, quadrants, diagnosticChecklist, axes, type Domain } from "@/lib/coalitions-data";
import { STAKING_CONTRACT_ADDRESS, STAKING_CONTRACT_ABI, TARGET_CHAIN, IS_STAGING } from "@/lib/staking-contract";
import { DomainMap } from "./DomainMap";

const STAKE_TIERS = [
  { amount: "0.001", label: "0.001 ETH", description: "Light signal" },
  { amount: "0.01", label: "0.01 ETH", description: "Interested" },
  { amount: "0.1", label: "0.1 ETH", description: "Committed" },
  { amount: "1", label: "1 ETH", description: "Champion" },
] as const;

type ZoomLevel = 4 | 3 | 2 | 1;
type QuadrantId = Domain["quadrant"];

const ZOOM_LABELS: Record<ZoomLevel, string> = {
  4: "1x",
  3: "2x",
  2: "3x",
  1: "4x",
};

const diagnosticIcons = {
  Shield,
  Network,
  Users,
  TrendingUp,
} as const;

export function CoalitionsClient() {
  const { address, isConnected, chainId: walletChainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChainAsync } = useSwitchChain();
  const { writeContractAsync, isPending: isSending, reset: resetTx } = useWriteContract();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial state from URL
  const initialZoom = useMemo(() => {
    const z = parseInt(searchParams.get("zoom") || "2", 10);
    return ([1, 2, 3, 4].includes(z) ? z : 2) as ZoomLevel;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialQuadrant = useMemo(() => {
    const q = searchParams.get("quadrant");
    return q && ["atoms-survive", "atoms-thrive", "bits-survive", "bits-thrive"].includes(q)
      ? (q as QuadrantId)
      : null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialSort = useMemo(() => {
    const s = searchParams.get("sort");
    return s && ["segment", "alpha", "raised", "interest"].includes(s)
      ? (s as "segment" | "alpha" | "raised" | "interest")
      : "segment";
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const initialSearch = useMemo(() => searchParams.get("q") || "", []); // eslint-disable-line react-hooks/exhaustive-deps

  const [stakingDomain, setStakingDomain] = useState<string | null>(null);
  const [zoom, setZoom] = useState<ZoomLevel>(initialZoom);
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantId | null>(initialQuadrant);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [interestCounts, setInterestCounts] = useState<Record<string, number>>({});
  const [trending, setTrending] = useState<{ domainId: string; queryCount: number }[]>([]);
  const [interested, setInterested] = useState<Set<string>>(new Set());
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"segment" | "alpha" | "raised" | "interest">(initialSort);
  const [domainTotals, setDomainTotals] = useState<Record<string, number>>({});
  const [activity, setActivity] = useState<{ type: string; domainId: string; address: string; amount?: string; timestamp: number }[]>([]);
  const [activityTotal, setActivityTotal] = useState(0);
  const [pendingTx, setPendingTx] = useState<{ domainId: string; hash: string } | null>(null);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (zoom !== 2) params.set("zoom", String(zoom));
    if (selectedQuadrant) params.set("quadrant", selectedQuadrant);
    if (sortBy !== "segment") params.set("sort", sortBy);
    if (searchQuery) params.set("q", searchQuery);
    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    router.replace(url, { scroll: false });
  }, [zoom, selectedQuadrant, sortBy, searchQuery, pathname, router]);

  const reportDomainTotal = useCallback((domainId: string, ethAmount: number) => {
    setDomainTotals((prev) => {
      if (prev[domainId] === ethAmount) return prev;
      return { ...prev, [domainId]: ethAmount };
    });
  }, []);

  const refreshData = useCallback(() => {
    fetch("/api/coalitions")
      .then((r) => r.json())
      .then((data) => {
        setInterestCounts(data.interests || {});
        setTrending(data.trending || []);
        setActivity(data.activity || []);
        setActivityTotal(data.activityTotal || 0);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const logQuery = useCallback(
    (query: string, domainId?: string) => {
      fetch("/api/coalitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "query", query, domainId }),
      })
        .then(() => refreshData())
        .catch(() => {});
    },
    [refreshData]
  );

  const signalInterest = useCallback(
    (domainId: string) => {
      if (interested.has(domainId)) return;
      fetch("/api/coalitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "interest", domainId, address }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            setInterested((prev) => new Set([...prev, domainId]));
            setInterestCounts((prev) => ({ ...prev, [domainId]: data.count }));
          }
        })
        .catch(() => {});
    },
    [interested, address]
  );

  const handleDomainClick = (domainId: string) => {
    const wasExpanded = expandedDomain === domainId;
    setExpandedDomain(wasExpanded ? null : domainId);
    if (!wasExpanded) {
      signalInterest(domainId);
      logQuery(domainId, domainId);
    }
  };

  const handleStake = async (domainId: string, amount: string) => {
    try {
      if (!isConnected) {
        connect({ connector: connectors[0] });
        return;
      }
      if (walletChainId !== TARGET_CHAIN.id) {
        await switchChainAsync({ chainId: TARGET_CHAIN.id });
        return;
      }
      resetTx();
      setStakingDomain(domainId);
      const hash = await writeContractAsync({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "stake",
        args: [domainId],
        value: parseEther(amount),
      });
      if (hash) {
        setPendingTx({ domainId, hash });
        setTimeout(() => setPendingTx(null), 20000);
      }
      if (hash && address) {
        fetch("/api/coalitions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "stake", domainId, address, amount, txHash: hash }),
        }).then(() => refreshData()).catch(() => {});
      }
    } catch (err) {
      console.error("Stake error:", err);
    } finally {
      setStakingDomain(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) logQuery(searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (value.trim().length >= 3) {
      searchDebounceRef.current = setTimeout(() => {
        const matched = domains.find(
          (d) =>
            d.name.toLowerCase().includes(value.toLowerCase()) ||
            d.examples.some((ex) => ex.toLowerCase().includes(value.toLowerCase()))
        );
        logQuery(value, matched?.id);
      }, 1000);
    }
  };

  const filteredDomains = domains
    .filter((d) => {
      const matchesQuadrant = !selectedQuadrant || d.quadrant === selectedQuadrant;
      const matchesSearch =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.examples.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesQuadrant && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "alpha") return a.name.localeCompare(b.name);
      if (sortBy === "raised") return (domainTotals[b.id] || 0) - (domainTotals[a.id] || 0);
      if (sortBy === "interest") return (interestCounts[b.id] || 0) - (interestCounts[a.id] || 0);
      return 0;
    });

  const toggleDiagnostic = (id: string) => {
    setSelectedDiagnostics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-gray-900 relative">
      {/* Zoom control */}
      <div className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-[72px] z-50">
        <div className="container-page py-2.5 flex items-center gap-3">
          {IS_STAGING && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              Sepolia
            </span>
          )}
          <ZoomOut className="w-3.5 h-3.5 text-gray-500" />
          <div className="flex items-center bg-gray-800 rounded-full p-0.5">
            {([4, 3, 2, 1] as ZoomLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => {
                  setZoom(level);
                  if (level >= 3) { setSelectedQuadrant(null); setSearchQuery(""); }
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  zoom === level ? "bg-teal-500 text-gray-950 shadow-[0_0_8px_rgba(2,226,172,0.4)]" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {ZOOM_LABELS[level]}
              </button>
            ))}
          </div>
          <ZoomIn className="w-3.5 h-3.5 text-gray-500" />
          <a
            href="/experiments/dacc-coalition-builder/analytics"
            className="ml-auto text-[10px] px-2.5 py-1 rounded-full bg-gray-800 text-gray-400 hover:text-teal-400 hover:bg-gray-700 transition-colors flex items-center gap-1"
          >
            <Activity className="w-3 h-3" />
            Analytics
          </a>
        </div>
      </div>

      {/* ═══ ZOOM 4x: Select your flavor of d/acc ═══ */}
      {zoom === 4 && (
        <section className="relative py-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/[0.03] blur-3xl rounded-full pointer-events-none" />
          <div className="container-page relative">
            <h2 className="text-lg font-heading font-bold text-gray-25 mb-1">Select your flavor of d/acc</h2>
            <p className="text-sm text-gray-500 mb-5">Each flavor represents a different dimension of acceleration. Stake to signal which matters most to you.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {diagnosticChecklist.map((item) => {
                const Icon = diagnosticIcons[item.icon as keyof typeof diagnosticIcons];
                const flavorId = `flavor:${item.id}`;
                const isExpanded = expandedDomain === flavorId;
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border bg-gray-950 transition-all duration-300 ${
                      isExpanded
                        ? "border-teal-500/50 ring-1 ring-teal-500/20 shadow-[0_0_20px_-5px_rgba(2,226,172,0.3)]"
                        : "border-gray-700 hover:border-teal-500/30 hover:shadow-[0_0_16px_-4px_rgba(2,226,172,0.2)]"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedDomain(isExpanded ? null : flavorId)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-5 h-5 text-teal-400" />
                            <h3 className="font-heading font-bold text-gray-25 text-lg">{item.label}</h3>
                          </div>
                          <p className="text-sm text-gray-400 font-serif italic">
                            &ldquo;{item.question}&rdquo;
                          </p>
                        </div>
                        <DomainPercent domainId={flavorId} onTotal={reportDomainTotal} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-gray-800 pt-4 space-y-3">
                        <DomainStakeInfo domainId={flavorId} />
                        <StakeTierButtons
                          domainId={flavorId}
                          stakingDomain={stakingDomain}
                          isSending={isSending}
                          onStake={handleStake}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ZOOM 3x: Fund a quadrant ═══ */}
      {zoom === 3 && (
        <section className="relative py-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/[0.03] blur-3xl rounded-full pointer-events-none" />
          <div className="container-page relative">
            <div className="grid md:grid-cols-2 gap-4">
              {quadrants.map((q) => {
                const qDomains = domains.filter((d) => d.quadrant === q.id);
                const qInterest = qDomains.reduce((sum, d) => sum + (interestCounts[d.id] || 0), 0);
                const isExpanded = expandedDomain === q.id;
                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border bg-gray-950 transition-all duration-300 ${
                      isExpanded ? `${q.borderColor} ring-1 ring-inset shadow-[0_0_20px_-5px_rgba(2,226,172,0.25)]` : "border-gray-700 hover:border-gray-500 hover:shadow-[0_0_16px_-4px_rgba(2,226,172,0.15)]"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedDomain(isExpanded ? null : q.id)}
                      className="w-full p-5 text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${q.bgColor} ${q.color}`}>
                            {q.axis.y} + {q.axis.x}
                          </span>
                          <h3 className="font-heading font-bold text-gray-25 text-lg mt-2">{q.label}</h3>
                          <p className="text-xs text-gray-500 mt-1">{q.description}</p>
                          <p className="text-[10px] text-gray-600 mt-2">{qDomains.length} domains</p>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <DomainPercent domainId={`quadrant:${q.id}`} onTotal={reportDomainTotal} />
                          {qInterest > 0 && (
                            <>
                              <span className="text-sm font-heading font-bold text-teal-400 block">{qInterest}</span>
                              <p className="text-[10px] text-gray-500">interested</p>
                            </>
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-gray-800 pt-4 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {qDomains.map((d) => (
                            <span key={d.id} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                              {d.name}
                            </span>
                          ))}
                        </div>

                        <DomainStakeInfo domainId={`quadrant:${q.id}`} />

                        <div>
                          <p className="text-[10px] text-gray-500 mb-2">
                            Stake ETH to fund {q.label.toLowerCase()} — withdraw anytime
                          </p>
                          <div className="grid grid-cols-4 gap-1.5">
                            {STAKE_TIERS.map((tier) => (
                              <button
                                key={tier.amount}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStake(`quadrant:${q.id}`, tier.amount);
                                }}
                                disabled={!!stakingDomain}
                                className="py-2 px-2 rounded-md border border-gray-700 hover:border-teal-500 bg-gray-900 hover:shadow-[0_0_8px_-2px_rgba(2,226,172,0.3)] transition-all duration-200 text-center group disabled:opacity-50"
                              >
                                <span className="text-xs font-heading font-bold text-teal-400 group-hover:text-teal-300">
                                  {tier.label}
                                </span>
                                <p className="text-[10px] text-gray-500">{tier.description}</p>
                              </button>
                            ))}
                          </div>
                          {stakingDomain === `quadrant:${q.id}` && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-teal-400">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              {isSending ? "Confirm in wallet..." : "Processing..."}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ZOOM 2x: Fund a domain ═══ */}
      {zoom === 2 && (
        <>
          {/* Filters */}
          <section className="sticky top-[72px] z-40 bg-gray-900 border-b border-gray-700">
            <div className="container-page py-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedQuadrant(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    !selectedQuadrant
                      ? "bg-gray-25 text-gray-900"
                      : "bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-25"
                  }`}
                >
                  All
                </button>
                {quadrants.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuadrant(selectedQuadrant === q.id ? null : q.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedQuadrant === q.id
                        ? "bg-gray-25 text-gray-900"
                        : "bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-25"
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
                <span className="text-xs text-gray-500 ml-auto mr-2">{filteredDomains.length} domains</span>
                <span className="text-[10px] text-gray-600">|</span>
                {(["segment", "alpha", "raised", "interest"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`px-2 py-1 rounded text-[10px] transition-colors ${
                      sortBy === s ? "bg-gray-700 text-gray-25" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {s === "segment" ? "Segment" : s === "alpha" ? "A\u2192Z" : s === "raised" ? "$ Raised" : "Interest"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Domain cards */}
          <section className="py-5">
            <div className="container-page">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDomains.map((domain) => {
                  const quadrant = quadrants.find((q) => q.id === domain.quadrant);
                  const count = interestCounts[domain.id] || 0;
                  const isExpanded = expandedDomain === domain.id;
                  const isInterested = interested.has(domain.id);
                  return (
                    <div
                      key={domain.id}
                      className={`rounded-lg border bg-gray-950 transition-all duration-300 ${
                        isExpanded
                          ? `${quadrant?.borderColor} ring-1 ring-inset shadow-[0_0_12px_-3px_rgba(2,226,172,0.3)]`
                          : isInterested
                            ? "border-teal-500/30 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.2)]"
                            : "border-gray-700 hover:border-gray-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.15)]"
                      }`}
                    >
                      <button onClick={() => handleDomainClick(domain.id)} className="w-full p-4 text-left">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${quadrant?.bgColor} ${quadrant?.color}`}>
                                {quadrant?.label}
                              </span>
                              {isInterested && <Check className="w-3 h-3 text-teal-400" />}
                            </div>
                            <h3 className="font-heading font-semibold text-gray-25 text-sm">{domain.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{domain.description}</p>
                          </div>
                          <div className="ml-2 text-right shrink-0 flex flex-col items-end gap-0.5">
                            <DomainPercent domainId={domain.id} onTotal={reportDomainTotal} />
                            {count > 0 && (
                              <>
                                <span className="text-sm font-heading font-bold text-teal-400">{count}</span>
                                <p className="text-[10px] text-gray-500">interested</p>
                              </>
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 border-t border-gray-800 pt-3 space-y-3">
                          <div className="flex flex-wrap gap-1.5">
                            {domain.examples.map((ex) => (
                              <span key={ex} className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                                {ex}
                              </span>
                            ))}
                          </div>
                          <DomainStakeInfo domainId={domain.id} />
                          <StakeTierButtons
                            domainId={domain.id}
                            stakingDomain={stakingDomain}
                            isSending={isSending}
                            onStake={handleStake}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ═══ ZOOM 1x: Fund projects ═══ */}
      {zoom === 1 && (
        <>
          {/* Filters */}
          <section className="sticky top-[72px] z-40 bg-gray-900 border-b border-gray-700">
            <div className="container-page py-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedQuadrant(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    !selectedQuadrant
                      ? "bg-gray-25 text-gray-900"
                      : "bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-25"
                  }`}
                >
                  All
                </button>
                {quadrants.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuadrant(selectedQuadrant === q.id ? null : q.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedQuadrant === q.id
                        ? "bg-gray-25 text-gray-900"
                        : "bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-25"
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
                <div className="ml-auto relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search projects..."
                    className="bg-gray-800 border border-gray-700 rounded-full pl-8 pr-3 py-1.5 text-xs text-gray-25 placeholder:text-gray-500 focus:outline-none focus:border-teal-500 w-48"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Project cards */}
          <section className="py-5">
            <div className="container-page">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredDomains.flatMap((domain) => {
                  const quadrant = quadrants.find((q) => q.id === domain.quadrant);
                  return domain.examples
                    .filter(
                      (ex) =>
                        !searchQuery ||
                        ex.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        domain.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((example) => {
                      const projectId = `project:${example.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                      const isExpanded = expandedDomain === projectId;
                      return (
                        <div
                          key={projectId}
                          className={`rounded-lg border bg-gray-950 transition-all duration-300 ${
                            isExpanded
                              ? `${quadrant?.borderColor} ring-1 ring-inset shadow-[0_0_12px_-3px_rgba(2,226,172,0.3)]`
                              : "border-gray-700 hover:border-gray-500 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.15)]"
                          }`}
                        >
                          <button
                            onClick={() => setExpandedDomain(isExpanded ? null : projectId)}
                            className="w-full p-3 text-left"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${quadrant?.bgColor} ${quadrant?.color}`}>
                                    {domain.name}
                                  </span>
                                </div>
                                <h3 className="font-heading font-semibold text-gray-25 text-sm">{example}</h3>
                              </div>
                              <DomainPercent domainId={projectId} onTotal={reportDomainTotal} />
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="px-3 pb-3 border-t border-gray-800 pt-3 space-y-3">
                              <DomainStakeInfo domainId={projectId} />
                              <StakeTierButtons
                                domainId={projectId}
                                stakingDomain={stakingDomain}
                                isSending={isSending}
                                onStake={handleStake}
                              />
                            </div>
                          )}
                        </div>
                      );
                    });
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* My Positions */}
      <StakingPositions pendingTx={pendingTx} />

      {/* Activity Feed */}
      <ActivityFeed
        activity={activity}
        activityTotal={activityTotal}
        trending={trending}
        connectedAddress={address}
        onDomainClick={(domainId) => {
          setZoom(2);
          const domain = domains.find((d) => d.id === domainId);
          if (domain) {
            setSelectedQuadrant(domain.quadrant);
            handleDomainClick(domain.id);
          }
        }}
      />
    </div>
  );
}

// ── Reusable stake tier buttons ───────────────────────────────────────────
function StakeTierButtons({
  domainId,
  stakingDomain,
  isSending,
  onStake,
}: {
  domainId: string;
  stakingDomain: string | null;
  isSending: boolean;
  onStake: (domainId: string, amount: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] text-gray-500 mb-2">
        Stake ETH to signal interest — withdraw anytime
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {STAKE_TIERS.map((tier) => (
          <button
            key={tier.amount}
            onClick={(e) => {
              e.stopPropagation();
              onStake(domainId, tier.amount);
            }}
            disabled={!!stakingDomain}
            className="py-2 px-2 rounded-md border border-gray-700 hover:border-teal-500 bg-gray-900 hover:shadow-[0_0_8px_-2px_rgba(2,226,172,0.3)] transition-all duration-200 text-center group disabled:opacity-50"
          >
            <span className="text-xs font-heading font-bold text-teal-400 group-hover:text-teal-300">
              {tier.label}
            </span>
            <p className="text-[10px] text-gray-500">{tier.description}</p>
          </button>
        ))}
      </div>
      {stakingDomain === domainId && (
        <div className="mt-2 flex items-center gap-2 text-xs text-teal-400">
          <Loader2 className="w-3 h-3 animate-spin" />
          {isSending ? "Confirm in wallet..." : "Processing..."}
        </div>
      )}
    </div>
  );
}

// ── Domain % raised badge (reads from contract, reports to parent) ────────
function DomainPercent({
  domainId,
  onTotal,
}: {
  domainId: string;
  onTotal: (domainId: string, eth: number) => void;
}) {
  const { data: totalWei } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getDomainTotal",
    args: [domainId],
  });

  const ethAmount = totalWei ? Number(formatEther(totalWei)) : 0;
  const pct = Math.min(ethAmount * 100, 100);

  useEffect(() => {
    onTotal(domainId, ethAmount);
  }, [domainId, ethAmount, onTotal]);

  if (!totalWei || ethAmount === 0) return null;

  return (
    <span className={`text-sm font-heading font-bold ${pct >= 100 ? "text-green-400" : "text-teal-400"}`}>
      {pct.toFixed(2)}%
    </span>
  );
}

// ── Domain stake info (reads from contract) ──────────────────────────────
function DomainStakeInfo({ domainId }: { domainId: string }) {
  const { data: totalWei } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getDomainTotal",
    args: [domainId],
  });

  const { data: isDeployed } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "isDomainDeployed",
    args: [domainId],
  });

  const total = totalWei ? formatEther(totalWei) : "0";
  const threshold = 1;
  const progress = totalWei ? Math.min(Number(formatEther(totalWei)) / threshold, 1) : 0;

  if (totalWei === undefined) return null;

  return (
    <div className="rounded-lg bg-gray-900 border border-gray-700 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Onchain pool</span>
        <span className="text-sm font-heading font-bold text-teal-400">{total} ETH</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">{(progress * 100).toFixed(0)}% to deployment</span>
        <span className="text-xs text-gray-500">Goal: {threshold} ETH</span>
      </div>
      {isDeployed && (
        <p className="text-xs text-teal-400 mt-2 font-medium">Funds deployed by operator</p>
      )}
    </div>
  );
}

// ── All stakeable IDs across zoom levels ─────────────────────────────────
const ALL_STAKEABLE_IDS: { id: string; name: string }[] = [
  ...diagnosticChecklist.map((item) => ({ id: `flavor:${item.id}`, name: `${item.label} d/acc` })),
  ...quadrants.map((q) => ({ id: `quadrant:${q.id}`, name: q.label })),
  ...domains.map((d) => ({ id: d.id, name: d.name })),
  ...domains.flatMap((d) =>
    d.examples.map((ex) => ({
      id: `project:${ex.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      name: ex,
    }))
  ),
];

// ── My Staking Positions ─────────────────────────────────────────────────
function StakingPositions({ pendingTx }: { pendingTx: { domainId: string; hash: string } | null }) {
  const { address, isConnected } = useAccount();
  const { connect: connectWallet, connectors: availableConnectors } = useConnect();
  const { disconnect } = useDisconnect();

  const explorerUrl = TARGET_CHAIN.blockExplorers?.default?.url || "https://etherscan.io";

  if (!isConnected) {
    return (
      <section className="relative py-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        <div className="container-page text-center">
          <Wallet className="w-8 h-8 text-gray-500 mx-auto mb-3" />
          <h2 className="text-lg font-heading font-semibold text-gray-25 mb-2">Your Positions</h2>
          <p className="text-sm text-gray-500 mb-4">Connect your wallet to view your staking positions</p>
          <button
            onClick={() => connectWallet({ connector: availableConnectors[0] })}
            className="px-6 py-3 rounded-lg bg-teal-500 text-gray-950 font-medium text-sm hover:bg-teal-400 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-teal-500/5 blur-3xl pointer-events-none" />
      <div className="container-page">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-semibold text-gray-25 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-teal-400" />
            Your Positions
            <span className="text-xs text-gray-500 font-normal ml-2">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </h2>
          <button
            onClick={() => disconnect()}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Disconnect
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingTx && (
            <div className="rounded-xl border border-teal-500/30 bg-gray-950 p-4 shadow-[0_0_20px_-5px_rgba(2,226,172,0.25)] animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                <h3 className="font-heading font-semibold text-gray-25 text-sm">Transaction Pending</h3>
              </div>
              <p className="text-xs text-gray-400 mb-2">
                Staking on <span className="text-gray-300">{pendingTx.domainId}</span>
              </p>
              <a
                href={`${explorerUrl}/tx/${pendingTx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
              >
                View on block explorer <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
          {ALL_STAKEABLE_IDS.map((item) => (
            <PositionCard key={item.id} domainId={item.id} domainName={item.name} address={address!} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PositionCard({
  domainId,
  domainName,
  address,
}: {
  domainId: string;
  domainName: string;
  address: `0x${string}`;
}) {
  const { data: stakeWei, refetch: refetchStake } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getStake",
    args: [domainId, address],
  });

  const { data: isDeployed } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "isDomainDeployed",
    args: [domainId],
    query: { enabled: !!stakeWei && stakeWei > BigInt(0) },
  });

  const { data: domainTotalWei } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getDomainTotal",
    args: [domainId],
    query: { enabled: !!stakeWei && stakeWei > BigInt(0) },
  });

  const { writeContractAsync: withdrawAsync, isPending } = useWriteContract();
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawTxHash, setWithdrawTxHash] = useState<string | null>(null);

  const explorerUrl = TARGET_CHAIN.blockExplorers?.default?.url || "https://etherscan.io";

  const stakeAmount = stakeWei ? Number(formatEther(stakeWei)) : 0;
  if (stakeAmount === 0 && !withdrawing) return null;

  const domainTotal = domainTotalWei ? Number(formatEther(domainTotalWei)) : 0;
  const othersStaked = Math.max(0, domainTotal - stakeAmount);
  const status = isDeployed ? "Done" : "Not Started";
  const statusColor = isDeployed ? "text-green-400" : "text-gray-500";
  const statusDot = isDeployed ? "bg-green-400" : "bg-gray-500";

  const handleWithdraw = async () => {
    if (!stakeWei || isDeployed) return;
    setWithdrawing(true);
    try {
      const hash = await withdrawAsync({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "withdraw",
        args: [domainId, stakeWei],
      });
      if (hash) {
        setWithdrawTxHash(hash);
        // Wait for the tx to be included, then refetch
        setTimeout(() => {
          refetchStake();
          setWithdrawing(false);
          setWithdrawTxHash(null);
        }, 15000);
      }
    } catch {
      setWithdrawing(false);
    }
  };

  return (
    <div className={`rounded-xl border bg-gray-950 p-4 transition-all duration-300 ${withdrawing ? "border-orange-500/30 shadow-[0_0_16px_-4px_rgba(251,146,60,0.2)]" : "border-gray-700 hover:border-gray-600 hover:shadow-[0_0_12px_-3px_rgba(2,226,172,0.15)]"}`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-heading font-semibold text-gray-25 text-sm">{domainName}</h3>
        <span className="text-sm font-heading font-bold text-teal-400">
          {stakeWei ? formatEther(stakeWei) : "0"} ETH
        </span>
      </div>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot}`} />
          <span className={`text-[10px] font-medium ${statusColor}`}>{status}</span>
        </div>
        <span className="text-[10px] text-gray-500">Yield: 0%</span>
        <span className="text-[10px] text-gray-500">Pool: {domainTotal.toFixed(3)} ETH</span>
        {othersStaked > 0 && (
          <span className="text-[10px] text-gray-400">Others staked: {othersStaked.toFixed(3)} ETH</span>
        )}
      </div>
      {isDeployed ? (
        <p className="text-xs text-gray-500">Funds deployed — thank you for your support</p>
      ) : withdrawing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-orange-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            {isPending ? "Confirm in wallet..." : "Withdrawing..."}
          </div>
          {withdrawTxHash && (
            <a
              href={`${explorerUrl}/tx/${withdrawTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
            >
              View on block explorer <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      ) : (
        <button
          onClick={handleWithdraw}
          className="w-full py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-gray-400 hover:text-gray-25 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowDownToLine className="w-4 h-4" />
          Withdraw
        </button>
      )}
    </div>
  );
}

// ── ENS-aware address display ─────────────────────────────────────────────
function ActivityAddress({ address: addr }: { address: string }) {
  const explorerUrl = TARGET_CHAIN.blockExplorers?.default?.url || "https://etherscan.io";
  const isEthAddress = addr.startsWith("0x") && addr.length === 42;
  const { data: ensName } = useEnsName({
    address: isEthAddress ? (addr as `0x${string}`) : undefined,
    chainId: 1, // ENS lives on mainnet
  });
  const display = ensName || `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (!isEthAddress) {
    return <span className="text-gray-400 font-mono">{display}</span>;
  }

  return (
    <a
      href={`${explorerUrl}/address/${addr}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 font-mono hover:text-teal-400 transition-colors"
    >
      {display}
    </a>
  );
}

// ── Activity Entry Row ────────────────────────────────────────────────────
function ActivityEntry({
  entry,
  onDomainClick,
}: {
  entry: { type: string; domainId: string; address: string; amount?: string; timestamp: number };
  onDomainClick: (domainId: string) => void;
}) {
  const domainName = domains.find((d) => d.id === entry.domainId)?.name || entry.domainId;
  const diff = Date.now() - entry.timestamp;
  const timeAgo =
    diff < 60_000 ? "just now"
    : diff < 3600_000 ? `${Math.floor(diff / 60_000)}m ago`
    : diff < 86400_000 ? `${Math.floor(diff / 3600_000)}h ago`
    : `${Math.floor(diff / 86400_000)}d ago`;

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-950 border border-gray-800 text-xs transition-all duration-200 hover:border-gray-700 hover:bg-[linear-gradient(to_right,rgba(2,226,172,0.03),transparent)]">
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          entry.type === "stake"
            ? "bg-teal-400"
            : entry.type === "withdraw"
              ? "bg-orange-400"
              : "bg-blue-400"
        }`}
      />
      <ActivityAddress address={entry.address} />
      <span className="text-gray-500">
        {entry.type === "stake" && (
          <>
            staked <span className="text-teal-400 font-medium">{entry.amount} ETH</span> on
          </>
        )}
        {entry.type === "withdraw" && (
          <>
            withdrew <span className="text-orange-400 font-medium">{entry.amount} ETH</span> from
          </>
        )}
        {entry.type === "interest" && "signaled interest in"}
      </span>
      <button
        onClick={() => onDomainClick(entry.domainId)}
        className="text-gray-300 font-medium truncate hover:text-teal-400 transition-colors"
      >
        {domainName}
      </button>
      <span className="text-gray-600 ml-auto shrink-0">{timeAgo}</span>
    </div>
  );
}

// ── Activity Feed ─────────────────────────────────────────────────────────
type ActivityItem = { type: string; domainId: string; address: string; amount?: string; timestamp: number };

function ActivityFeed({
  activity,
  activityTotal,
  trending,
  connectedAddress,
  onDomainClick,
}: {
  activity: ActivityItem[];
  activityTotal: number;
  trending: { domainId: string; queryCount: number }[];
  connectedAddress?: string;
  onDomainClick: (domainId: string) => void;
}) {
  const [allActivity, setAllActivity] = useState<ActivityItem[]>(activity);
  const [loading, setLoading] = useState(false);

  // Sync when parent refreshes initial data
  useEffect(() => {
    setAllActivity(activity);
  }, [activity]);

  const hasMore = allActivity.length < activityTotal;

  const loadMore = () => {
    setLoading(true);
    fetch(`/api/coalitions?limit=25&offset=${allActivity.length}`)
      .then((r) => r.json())
      .then((data) => {
        setAllActivity((prev) => [...prev, ...(data.activity || [])]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const myActivity = connectedAddress
    ? allActivity.filter((e) => e.address.toLowerCase() === connectedAddress.toLowerCase())
    : [];

  return (
    <section className="relative py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      <div className="container-page">
        {/* Your Activity — only when wallet connected and has activity */}
        {myActivity.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-heading font-semibold text-gray-25 mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-teal-400" />
              Your Activity
            </h2>
            <div className="space-y-1.5 max-w-2xl">
              {myActivity.map((entry, i) => (
                <ActivityEntry key={`my-${entry.timestamp}-${i}`} entry={entry} onDomainClick={onDomainClick} />
              ))}
            </div>
          </div>
        )}

        {/* All Activity — always shown */}
        <h2 className="text-lg font-heading font-semibold text-gray-25 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" />
          All Activity
        </h2>

        {trending.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-heading font-semibold text-gray-25">Trending</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trending.map((t) => {
                const domain = domains.find((d) => d.id === t.domainId);
                if (!domain) return null;
                return (
                  <button
                    key={t.domainId}
                    onClick={() => onDomainClick(domain.id)}
                    className="px-3 py-1.5 rounded-full bg-gray-950 border border-gray-700 text-gray-200 text-xs hover:border-teal-500 transition-colors flex items-center gap-1.5"
                  >
                    {domain.name}
                    <span className="text-xs text-orange-400">{t.queryCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {allActivity.length > 0 ? (
          <div className="space-y-1.5 max-w-2xl">
            {allActivity.map((entry, i) => (
              <ActivityEntry key={`all-${entry.timestamp}-${i}`} entry={entry} onDomainClick={onDomainClick} />
            ))}
            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="w-full py-2.5 rounded-lg border border-gray-700 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  `Load more (${activityTotal - allActivity.length} remaining)`
                )}
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No activity yet. Be the first to stake or signal interest.</p>
        )}
      </div>
    </section>
  );
}
