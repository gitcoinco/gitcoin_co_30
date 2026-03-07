import { NextRequest, NextResponse } from "next/server";

const ADMIN_ADDRESS = "0x00De4B13153673BCAE2616b67bf822500d325Fc3";

// In-memory store for MVP (production would use Supabase)
const interestSignals: Record<string, Set<string>> = {};
const stakes: { domainId: string; address: string; amount: string; txHash: string; timestamp: number }[] = [];
const queryLog: { query: string; timestamp: number; domainId?: string }[] = [];

// Admin overrides
const adminTrending: { domainId: string; queryCount: number }[] = [];
const adminInterestOverrides: Record<string, number> = {};

// GET: retrieve interest counts, stakes, and trending data
export async function GET() {
  const interests: Record<string, number> = {};
  for (const [domainId, ids] of Object.entries(interestSignals)) {
    interests[domainId] = ids.size;
  }
  // Apply admin overrides
  for (const [domainId, count] of Object.entries(adminInterestOverrides)) {
    interests[domainId] = count;
  }

  // Aggregate stakes per domain
  const stakesByDomain: Record<string, { totalEth: number; stakers: number }> = {};
  for (const s of stakes) {
    if (!stakesByDomain[s.domainId]) {
      stakesByDomain[s.domainId] = { totalEth: 0, stakers: 0 };
    }
    stakesByDomain[s.domainId].totalEth += parseFloat(s.amount);
    stakesByDomain[s.domainId].stakers += 1;
  }

  // Use admin trending if set, otherwise compute from query log
  let trending: { domainId: string; queryCount: number }[];
  if (adminTrending.length > 0) {
    trending = adminTrending;
  } else {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentQueries = queryLog.filter((q) => q.timestamp > sevenDaysAgo);
    const queryCounts: Record<string, number> = {};
    for (const q of recentQueries) {
      if (q.domainId) {
        queryCounts[q.domainId] = (queryCounts[q.domainId] || 0) + 1;
      }
    }
    trending = Object.entries(queryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([domainId, count]) => ({ domainId, queryCount: count }));
  }

  return NextResponse.json({
    interests,
    stakes: stakesByDomain,
    trending,
    totalQueries: queryLog.length,
    recentQueryCount: queryLog.filter((q) => q.timestamp > Date.now() - 7 * 24 * 60 * 60 * 1000).length,
    adminTrending,
    adminInterestOverrides,
  });
}

// POST: log a query, signal interest, record a stake, or admin actions
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, domainId, query, address, amount, txHash } = body;

  if (action === "query") {
    queryLog.push({
      query: query || "",
      timestamp: Date.now(),
      domainId: domainId || undefined,
    });
    return NextResponse.json({ success: true });
  }

  if (action === "interest") {
    if (!domainId) {
      return NextResponse.json({ error: "domainId required" }, { status: 400 });
    }
    const userId = address || `anon-${Math.random().toString(36).slice(2)}`;
    if (!interestSignals[domainId]) {
      interestSignals[domainId] = new Set();
    }
    interestSignals[domainId].add(userId);

    return NextResponse.json({
      success: true,
      count: adminInterestOverrides[domainId] ?? interestSignals[domainId].size,
    });
  }

  if (action === "stake") {
    if (!domainId || !address || !amount || !txHash) {
      return NextResponse.json(
        { error: "domainId, address, amount, and txHash required" },
        { status: 400 }
      );
    }
    stakes.push({ domainId, address, amount, txHash, timestamp: Date.now() });

    if (!interestSignals[domainId]) {
      interestSignals[domainId] = new Set();
    }
    interestSignals[domainId].add(address);

    const domainStakes = stakes.filter((s) => s.domainId === domainId);
    const totalEth = domainStakes.reduce((sum, s) => sum + parseFloat(s.amount), 0);

    return NextResponse.json({
      success: true,
      totalEth,
      stakers: new Set(domainStakes.map((s) => s.address)).size,
      interestCount: adminInterestOverrides[domainId] ?? interestSignals[domainId].size,
    });
  }

  // ── Admin actions ──────────────────────────────────────────────────
  if (!address || address.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  if (action === "admin:set-trending") {
    // body.trending: { domainId: string; queryCount: number }[]
    adminTrending.length = 0;
    if (Array.isArray(body.trending)) {
      adminTrending.push(...body.trending);
    }
    return NextResponse.json({ success: true, trending: adminTrending });
  }

  if (action === "admin:set-interest") {
    // body.domainId, body.count
    if (!domainId || body.count === undefined) {
      return NextResponse.json({ error: "domainId and count required" }, { status: 400 });
    }
    adminInterestOverrides[domainId] = Number(body.count);
    return NextResponse.json({ success: true, domainId, count: body.count });
  }

  if (action === "admin:clear-interest") {
    if (domainId) {
      delete adminInterestOverrides[domainId];
    } else {
      Object.keys(adminInterestOverrides).forEach((k) => delete adminInterestOverrides[k]);
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
