"use client";

import { useState, useEffect } from "react";

const LEADERBOARD_ADDRESS = "0x710da4c477edf1052ea876aeef3e153fb040fa9f";
const BUY_URL =
  "https://markee.xyz/ecosystem/website/0x710dA4C477EDf1052Ea876aEEf3E153Fb040Fa9f";
const API_URL = "https://markee.xyz/api/openinternet/leaderboards";

interface MarkeeData {
  topMessage: string | null;
  topMessageOwner: string | null;
  minimumPrice: string;
}

async function fetchMarkee(): Promise<MarkeeData | null> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 0 } });
    const json = await res.json();
    const lb = (json.leaderboards ?? []).find(
      (l: { address: string }) =>
        l.address.toLowerCase() === LEADERBOARD_ADDRESS
    );
    return lb ?? null;
  } catch {
    return null;
  }
}

export function MarkeeWidget() {
  const [data, setData] = useState<MarkeeData | null>(null);

  useEffect(() => {
    fetchMarkee().then(setData);
    const interval = setInterval(() => fetchMarkee().then(setData), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      data-markee-address={LEADERBOARD_ADDRESS}
      className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-xl border border-gray-700 bg-gray-800/40 px-5 py-4"
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
          Featured Message
        </p>
        {data?.topMessage ? (
          <p className="text-sm text-gray-100 leading-snug">{data.topMessage}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">No message yet.</p>
        )}
        {data?.topMessageOwner && (
          <p className="mt-1 text-xs text-gray-500">
            {data.topMessageOwner.startsWith("0x")
              ? `${data.topMessageOwner.slice(0, 6)}...${data.topMessageOwner.slice(-4)}`
              : data.topMessageOwner}
          </p>
        )}
      </div>
      <a
        href={BUY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-xs font-semibold text-teal-400 hover:text-teal-300 border border-teal-400/30 hover:border-teal-300/60 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
      >
        Change this message
      </a>
    </div>
  );
}
