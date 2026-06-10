/**
 * GET  /api/moderation  -- returns all flagged markee keys
 * POST /api/moderation  -- flag or unflag a markee (admin only, signed)
 *
 * Keys: "{chainId}:{markeeAddress}" stored in a Vercel KV Set.
 * Requires KV_REST_API_URL + KV_REST_API_TOKEN in environment.
 */

import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { verifyMessage } from "viem";
import { ADMIN_ADDRESSES } from "@/lib/moderation/config";

const KV_KEY = "moderation:flagged";

function isAdmin(address: string | null): boolean {
  if (!address) return false;
  return ADMIN_ADDRESSES.some(
    (a) => a.toLowerCase() === address.toLowerCase(),
  );
}

export async function GET() {
  try {
    const flagged = await kv.smembers(KV_KEY);
    return NextResponse.json({ flagged: flagged ?? [] });
  } catch (err) {
    console.error("[moderation] GET error:", err);
    return NextResponse.json({ flagged: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { markeeId, chainId, action, adminAddress, signature, timestamp } =
      body as {
        markeeId: string;
        chainId: number | string;
        action: "flag" | "unflag";
        adminAddress: string;
        signature: `0x${string}`;
        timestamp: number;
      };

    if (!markeeId || !chainId || !action || !adminAddress || !signature || !timestamp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > 300) {
      return NextResponse.json({ error: "Signature expired" }, { status: 401 });
    }

    const message = `markee-moderation:${action}:${chainId}:${markeeId}:${timestamp}`;
    const valid = await verifyMessage({
      address: adminAddress as `0x${string}`,
      message,
      signature,
    });
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (!isAdmin(adminAddress)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const key = `${chainId}:${markeeId}`;
    if (action === "flag") {
      await kv.sadd(KV_KEY, key);
    } else if (action === "unflag") {
      await kv.srem(KV_KEY, key);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const flagged = await kv.smembers(KV_KEY);
    return NextResponse.json({ success: true, action, key, flagged: flagged ?? [] });
  } catch (err) {
    console.error("[moderation] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
