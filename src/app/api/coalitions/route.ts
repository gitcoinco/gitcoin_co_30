import { NextRequest, NextResponse } from "next/server";

// In-memory store for MVP (production would use Supabase)
const interestSignals: Record<string, Set<string>> = {};
const stakes: { domainId: string; address: string; amount: string; txHash: string; timestamp: number }[] = [];
const queryLog: { query: string; timestamp: number; domainId?: string }[] = [];

// Activity feed (last 100 entries, serve last 25)
const activityFeed: {
  type: "stake" | "withdraw" | "interest";
  domainId: string;
  address: string;
  amount?: string;
  timestamp: number;
}[] = [];

function pushActivity(entry: (typeof activityFeed)[number]) {
  activityFeed.unshift(entry);
  if (activityFeed.length > 100) activityFeed.length = 100;
}

// GET: retrieve interest counts, stakes, trending, and activity feed
export async function GET() {
  const interests: Record<string, number> = {};
  for (const [domainId, ids] of Object.entries(interestSignals)) {
    interests[domainId] = ids.size;
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

  // Trending
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentQueries = queryLog.filter((q) => q.timestamp > sevenDaysAgo);
  const queryCounts: Record<string, number> = {};
  for (const q of recentQueries) {
    if (q.domainId) {
      queryCounts[q.domainId] = (queryCounts[q.domainId] || 0) + 1;
    }
  }
  const trending = Object.entries(queryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([domainId, count]) => ({ domainId, queryCount: count }));

  return NextResponse.json({
    interests,
    stakes: stakesByDomain,
    trending,
    activity: activityFeed.slice(0, 25),
    totalQueries: queryLog.length,
    recentQueryCount: recentQueries.length,
  });
}

// POST: log a query, signal interest, record a stake, or withdraw
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

    pushActivity({
      type: "interest",
      domainId,
      address: userId,
      timestamp: Date.now(),
    });

    return NextResponse.json({
      success: true,
      count: interestSignals[domainId].size,
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

    pushActivity({
      type: "stake",
      domainId,
      address,
      amount,
      timestamp: Date.now(),
    });

    const domainStakes = stakes.filter((s) => s.domainId === domainId);
    const totalEth = domainStakes.reduce((sum, s) => sum + parseFloat(s.amount), 0);

    return NextResponse.json({
      success: true,
      totalEth,
      stakers: new Set(domainStakes.map((s) => s.address)).size,
      interestCount: interestSignals[domainId].size,
    });
  }

  if (action === "withdraw") {
    if (!domainId || !address || !amount) {
      return NextResponse.json({ error: "domainId, address, and amount required" }, { status: 400 });
    }
    pushActivity({
      type: "withdraw",
      domainId,
      address,
      amount,
      timestamp: Date.now(),
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
