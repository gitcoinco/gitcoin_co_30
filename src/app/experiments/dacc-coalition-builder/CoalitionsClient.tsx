"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
} from "lucide-react";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
  useSwitchChain,
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

type QuadrantId = Domain["quadrant"];

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
  const [stakingDomain, setStakingDomain] = useState<string | null>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [interestCounts, setInterestCounts] = useState<Record<string, number>>({});
  const [trending, setTrending] = useState<{ domainId: string; queryCount: number }[]>([]);
  const [interested, setInterested] = useState<Set<string>>(new Set());
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [selectedDiagnostics, setSelectedDiagnostics] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"segment" | "alpha" | "raised" | "interest">("segment");
  const [domainTotals, setDomainTotals] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [activity, setActivity] = useState<{ type: string; domainId: string; address: string; amount?: string; timestamp: number }[]>([]);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Callback for DomainPercent to report onchain totals
  const reportDomainTotal = useCallback((domainId: string, ethAmount: number) => {
    setDomainTotals((prev) => {
      if (prev[domainId] === ethAmount) return prev;
      return { ...prev, [domainId]: ethAmount };
    });
  }, []);

  // Fetch interest data from API
  const refreshData = useCallback(() => {
    fetch("/api/coalitions")
      .then((r) => r.json())
      .then((data) => {
        setInterestCounts(data.interests || {});
        setTrending(data.trending || []);
        setActivity(data.activity || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Log search queries
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

  // Light interest signal (no wallet needed)
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

  // Click domain card = mark interested + expand
  const handleDomainClick = (domainId: string) => {
    const wasExpanded = expandedDomain === domainId;
    setExpandedDomain(wasExpanded ? null : domainId);
    if (!wasExpanded) {
      signalInterest(domainId);
      logQuery(domainId, domainId);
    }
  };

  // Stake: connect → switch chain → send tx
  const handleStake = async (domainId: string, amount: string) => {
    try {
      if (!isConnected) {
        connect({ connector: connectors[0] });
        return;
      }

      // Switch to target chain first — return so user clicks again on correct chain
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

  // Search handlers
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
      return 0; // segment = default order
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
    <div className="bg-gray-900">
      {/* Mode toggle */}
      <div className="border-b border-gray-700">
        <div className="container-page py-2 flex items-center gap-3">
          {IS_STAGING && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              Sepolia
            </span>
          )}
          <div className="flex items-center bg-gray-800 rounded-full p-0.5">
            <button
              onClick={() => setMode("basic")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                mode === "basic" ? "bg-gray-25 text-gray-900" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                mode === "advanced" ? "bg-gray-25 text-gray-900" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Advanced
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Select your flavor of d/acc (advanced only) */}
      {mode === "advanced" && (
        <section className="border-b border-gray-700">
          <div className="container-page py-5">
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider mr-1">Step 1</span>
              <span className="font-heading font-semibold text-gray-25">Select your flavor of d/acc</span>
              {selectedDiagnostics.size > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400">
                  {selectedDiagnostics.size}/4
                </span>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {diagnosticChecklist.map((item) => {
                const Icon = diagnosticIcons[item.icon as keyof typeof diagnosticIcons];
                const isSelected = selectedDiagnostics.has(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleDiagnostic(item.id)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      isSelected
                        ? "bg-teal-500/10 border border-teal-500/50 ring-1 ring-teal-500/20"
                        : "bg-gray-950 border border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-teal-500 border-teal-500"
                            : "border-gray-600"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-gray-950" />}
                      </div>
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-teal-400" : "text-gray-500"}`} />
                      <span className={`font-heading font-semibold text-sm ${isSelected ? "text-teal-300" : "text-gray-25"}`}>
                        {item.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-serif italic pl-7">
                      &ldquo;{item.question}&rdquo;
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Domain Map (advanced only) */}
      {mode === "advanced" && (
        <section className="border-b border-gray-700">
          <div className="container-page py-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Step 2</span>
              <h2 className="text-sm font-heading font-semibold text-gray-25">Find your domain</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {axes.y.description} &times; {axes.x.description}
            </p>
            <DomainMap
              domains={domains}
              interestCounts={interestCounts}
              selectedQuadrant={selectedQuadrant}
              onSelectQuadrant={setSelectedQuadrant}
            />
          </div>
        </section>
      )}

      {/* Search (advanced only) */}
      {mode === "advanced" && (
        <section className="border-b border-gray-700">
          <div className="container-page py-4">
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search domains... (e.g. watershed monitoring, AI alignment)"
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-25 placeholder:text-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Quadrant Filter + Domain Cards */}
      <section className="sticky top-[72px] z-40 bg-gray-900 border-b border-gray-700">
        <div className="container-page py-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            {mode === "advanced" && (
              <span className="text-xs text-gray-500 uppercase tracking-wider mr-1">Step 3</span>
            )}
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
                  sortBy === s
                    ? "bg-gray-700 text-gray-25"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {s === "segment" ? "Segment" : s === "alpha" ? "A→Z" : s === "raised" ? "$ Raised" : "Interest"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Cards */}
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
                  className={`rounded-lg border bg-gray-950 transition-all ${
                    isExpanded
                      ? `${quadrant?.borderColor} ring-1 ring-inset`
                      : isInterested
                        ? "border-teal-500/30"
                        : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <button onClick={() => handleDomainClick(domain.id)} className="w-full p-4 text-left">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${quadrant?.bgColor} ${quadrant?.color}`}
                          >
                            {quadrant?.label}
                          </span>
                          {isInterested && (
                            <Check className="w-3 h-3 text-teal-400" />
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-gray-25 text-sm">
                          {domain.name}
                        </h3>
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
                                handleStake(domain.id, tier.amount);
                              }}
                              disabled={!!stakingDomain}
                              className="py-2 px-2 rounded-md border border-gray-700 hover:border-teal-500 bg-gray-900 transition-all text-center group disabled:opacity-50"
                            >
                              <span className="text-xs font-heading font-bold text-teal-400 group-hover:text-teal-300">
                                {tier.label}
                              </span>
                              <p className="text-[10px] text-gray-500">{tier.description}</p>
                            </button>
                          ))}
                        </div>
                        {stakingDomain === domain.id && (
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

      {/* My Positions */}
      <StakingPositions />

      {/* Activity Feed */}
      <ActivityFeed
        activity={activity}
        trending={trending}
        onTrendingClick={(domainId) => {
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

// ── My Staking Positions ─────────────────────────────────────────────────
function StakingPositions() {
  const { address, isConnected } = useAccount();
  const { connect: connectWallet, connectors: availableConnectors } = useConnect();

  if (!isConnected) {
    return (
      <section className="border-t border-gray-600 py-16">
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
    <section className="border-t border-gray-600 py-12">
      <div className="container-page">
        <h2 className="text-lg font-heading font-semibold text-gray-25 mb-6 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-teal-400" />
          Your Positions
          <span className="text-xs text-gray-500 font-normal ml-2">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((domain) => (
            <PositionCard key={domain.id} domainId={domain.id} domainName={domain.name} address={address!} />
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
  const { data: stakeWei, refetch } = useReadContract({
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
  });

  const { data: domainTotalWei } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getDomainTotal",
    args: [domainId],
  });

  const { writeContract, isPending } = useWriteContract();
  const [withdrawing, setWithdrawing] = useState(false);

  const stakeAmount = stakeWei ? Number(formatEther(stakeWei)) : 0;
  if (stakeAmount === 0) return null;

  const domainTotal = domainTotalWei ? Number(formatEther(domainTotalWei)) : 0;
  const othersStaked = Math.max(0, domainTotal - stakeAmount);
  const status = isDeployed ? "Done" : "Not Started";
  const statusColor = isDeployed ? "text-green-400" : "text-gray-500";
  const statusDot = isDeployed ? "bg-green-400" : "bg-gray-500";

  const handleWithdraw = () => {
    if (!stakeWei || isDeployed) return;
    setWithdrawing(true);
    writeContract(
      {
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_CONTRACT_ABI,
        functionName: "withdraw",
        args: [domainId, stakeWei],
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            refetch();
            setWithdrawing(false);
          }, 3000);
        },
        onError: () => setWithdrawing(false),
      }
    );
  };

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-950 p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-heading font-semibold text-gray-25 text-sm">{domainName}</h3>
        <span className="text-sm font-heading font-bold text-teal-400">
          {formatEther(stakeWei!)} ETH
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
      ) : (
        <button
          onClick={handleWithdraw}
          disabled={isPending || withdrawing}
          className="w-full py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:border-gray-400 hover:text-gray-25 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPending || withdrawing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowDownToLine className="w-4 h-4" />
          )}
          Withdraw
        </button>
      )}
    </div>
  );
}

// ── Activity Feed ─────────────────────────────────────────────────────────
function ActivityFeed({
  activity,
  trending,
  onTrendingClick,
}: {
  activity: { type: string; domainId: string; address: string; amount?: string; timestamp: number }[];
  trending: { domainId: string; queryCount: number }[];
  onTrendingClick: (domainId: string) => void;
}) {
  if (activity.length === 0 && trending.length === 0) return null;

  const domainName = (id: string) => domains.find((d) => d.id === id)?.name || id;
  const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const timeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60_000) return "just now";
    if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m ago`;
    if (diff < 86400_000) return `${Math.floor(diff / 3600_000)}h ago`;
    return `${Math.floor(diff / 86400_000)}d ago`;
  };

  return (
    <section className="border-t border-gray-600 py-12">
      <div className="container-page">
        <h2 className="text-lg font-heading font-semibold text-gray-25 mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400" />
          Activity
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
                    onClick={() => onTrendingClick(domain.id)}
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

        <div className="space-y-1.5 max-w-2xl">
          {activity.map((entry, i) => (
            <div
              key={`${entry.timestamp}-${i}`}
              className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-950 border border-gray-800 text-xs"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  entry.type === "stake"
                    ? "bg-teal-400"
                    : entry.type === "withdraw"
                      ? "bg-orange-400"
                      : "bg-blue-400"
                }`}
              />
              <span className="text-gray-400 font-mono">{shortAddr(entry.address)}</span>
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
              <span className="text-gray-300 font-medium truncate">{domainName(entry.domainId)}</span>
              <span className="text-gray-600 ml-auto shrink-0">{timeAgo(entry.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
