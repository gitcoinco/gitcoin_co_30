/**
 * GET /api/markee/health
 *
 * Returns the health status of all Markee integration components:
 *   - leaderboard  : can the API find this leaderboard, and does it have an active message?
 *   - viewTracking : is the view tracking API reachable and returning counts?
 *   - moderation   : is the Vercel KV store connected?
 *
 * Overall status: "ok" | "warn" | "error"
 *   ok    — all checks passed
 *   warn  — partial degradation (e.g. no messages yet, view count is 0)
 *   error — a component is unreachable or misconfigured
 */

import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { LEADERBOARD_ADDRESS_LOWER } from "@/lib/markee";

type CheckStatus = "ok" | "warn" | "error";

interface CheckResult {
  status: CheckStatus;
  message: string;
  detail?: Record<string, unknown>;
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

interface LeaderboardResult extends CheckResult {
  topMarkeeAddress?: string;
  topMessage?: string;
}

async function checkLeaderboard(): Promise<LeaderboardResult> {
  try {
    const res = await fetch(
      "https://markee.xyz/api/openinternet/leaderboards",
      { next: { revalidate: 0 } },
    );
    if (!res.ok) {
      return { status: "error", message: `Leaderboard API returned HTTP ${res.status}` };
    }

    const json = await res.json();
    const lb = (json.leaderboards ?? []).find(
      (l: { address: string }) => l.address.toLowerCase() === LEADERBOARD_ADDRESS_LOWER,
    );

    if (!lb) {
      return {
        status: "error",
        message: `Leaderboard ${LEADERBOARD_ADDRESS_LOWER} not found in API — confirm the address is registered`,
      };
    }

    if (!lb.topMessage || lb.topFundsAddedRaw === "0") {
      return {
        status: "warn",
        message: "Leaderboard found but has no messages yet",
        detail: { markeeCount: lb.markeeCount },
      };
    }

    return {
      status: "ok",
      message: "Leaderboard found with active top message",
      topMarkeeAddress: lb.topMarkeeAddress,
      topMessage: lb.topMessage,
      detail: {
        topMessage: lb.topMessage,
        topMarkeeAddress: lb.topMarkeeAddress,
        topMessageOwner: lb.topMessageOwner,
        markeeCount: lb.markeeCount,
        topFundsAdded: lb.topFundsAddedRaw,
      },
    };
  } catch (err) {
    return { status: "error", message: `Leaderboard check threw: ${err}` };
  }
}

// ─── View Tracking ────────────────────────────────────────────────────────────

async function checkViewTracking(
  topMarkeeAddress?: string,
  topMessage?: string,
): Promise<CheckResult> {
  if (!topMarkeeAddress || !topMessage) {
    return { status: "warn", message: "Skipped — no active markee to check views against" };
  }

  try {
    const params = new URLSearchParams({
      address: topMarkeeAddress,
      messages: topMessage,
    });
    const res = await fetch(
      `https://markee.xyz/api/views?${params.toString()}`,
      { next: { revalidate: 0 } },
    );
    if (!res.ok) {
      return { status: "error", message: `Views API returned HTTP ${res.status}` };
    }

    const data = await res.json();
    const viewCount = data[topMessage];

    if (typeof viewCount !== "number") {
      return {
        status: "error",
        message: "Views API responded but returned an unexpected format",
        detail: { raw: data },
      };
    }

    return {
      status: viewCount > 0 ? "ok" : "warn",
      message: viewCount > 0
        ? "View tracking is active and returning counts"
        : "View tracking reachable but count is 0 — page may not have been visited yet",
      detail: { messageViews: viewCount },
    };
  } catch (err) {
    return { status: "error", message: `View tracking check threw: ${err}` };
  }
}

// ─── Moderation ───────────────────────────────────────────────────────────────

async function checkModeration(): Promise<CheckResult> {
  try {
    const flagged = await kv.smembers("moderation:flagged");
    return {
      status: "ok",
      message: "Moderation KV store is connected",
      detail: { flaggedCount: Array.isArray(flagged) ? flagged.length : 0 },
    };
  } catch {
    return {
      status: "error",
      message:
        "Moderation KV unavailable — set KV_REST_API_URL and KV_REST_API_TOKEN in Vercel project settings",
    };
  }
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function GET() {
  // Leaderboard and moderation checks are independent — run in parallel
  const [lbResult, modResult] = await Promise.all([
    checkLeaderboard(),
    checkModeration(),
  ]);

  // View tracking depends on the top markee address from the leaderboard check
  const vtResult = await checkViewTracking(lbResult.topMarkeeAddress, lbResult.topMessage);

  const statuses: CheckStatus[] = [lbResult.status, vtResult.status, modResult.status];
  const overall: CheckStatus = statuses.includes("error")
    ? "error"
    : statuses.includes("warn")
      ? "warn"
      : "ok";

  // Strip internal fields before returning
  const { topMarkeeAddress: _a, topMessage: _m, ...lbPublic } = lbResult;

  return NextResponse.json({
    timestamp: Date.now(),
    overall,
    checks: {
      leaderboard: lbPublic,
      viewTracking: vtResult,
      moderation: modResult,
    },
  });
}
