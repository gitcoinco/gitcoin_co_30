"use client";

import { useState, useEffect, useCallback } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import { base } from "wagmi/chains";
import MarkeeModal from "./MarkeeModal";

const LEADERBOARD_ADDRESS =
  "0x710dA4C477EDf1052Ea876aEEf3E153Fb040Fa9f" as const;
const API_URL = "https://markee.xyz/api/openinternet/leaderboards";
const MIN_INCREMENT = BigInt("1000000000000000"); // 0.001 ETH

const LEADERBOARD_ABI = [
  {
    inputs: [],
    name: "minimumPrice",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMessageLength",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

type SignData = {
  topMarkeeAddress: string | null;
  message: string;
  name: string;
  owner: string;
  totalFundsAdded: bigint;
};

const DEFAULT_MESSAGE = "this is a sign.";
const DEFAULT_DATA: SignData = {
  topMarkeeAddress: null,
  message: DEFAULT_MESSAGE,
  name: "",
  owner: "",
  totalFundsAdded: 0n,
};

export default function MarkeeSign() {
  const [data, setData] = useState<SignData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: minimumPrice } = useReadContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: "minimumPrice",
    chainId: base.id,
  });

  const { data: maxMessageLength } = useReadContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: "maxMessageLength",
    chainId: base.id,
  });

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      const lb = (json.leaderboards ?? []).find(
        (l: { address: string }) =>
          l.address.toLowerCase() === LEADERBOARD_ADDRESS.toLowerCase(),
      );
      if (!lb || !lb.topMessage || BigInt(lb.topFundsAddedRaw ?? "0") === 0n) {
        setData(DEFAULT_DATA);
      } else {
        setData({
          topMarkeeAddress: lb.topMarkeeAddress ?? null,
          message: lb.topMessage,
          name: lb.topMessageOwner ?? "",
          owner: lb.topMarkeeAddress ?? "",
          totalFundsAdded: BigInt(lb.topFundsAddedRaw ?? "0"),
        });
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const effectiveMin = minimumPrice ?? BigInt("3000000000000000"); // 0.003 ETH fallback
  const takeTopSpot =
    data.totalFundsAdded > 0n
      ? data.totalFundsAdded + MIN_INCREMENT
      : effectiveMin;
  const hasMessages = data.totalFundsAdded > 0n;
  const priceLabel = hasMessages
    ? `${parseFloat(formatEther(takeTopSpot)).toFixed(3)} ETH to change`
    : "be first!";

  return (
    <>
      <button
        data-markee-address={LEADERBOARD_ADDRESS.toLowerCase()}
        onClick={() => setModalOpen(true)}
        disabled={loading || error}
        className="group relative mx-auto mt-6 mb-4 cursor-pointer w-full text-left"
        aria-label="Click to change the Markee message"
      >
        {/* Sign body */}
        <div className="relative rounded border border-gray-700 bg-gray-800/40 px-6 py-5 hover:border-teal-500/50 transition-colors duration-200">
          <p className="font-mono text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-200 leading-snug">
            {loading ? (
              <span className="text-gray-500">loading...</span>
            ) : error ? (
              <span className="text-gray-500">unavailable</span>
            ) : (
              data.message
            )}
          </p>
          {data.name && !loading && (
            <p className="mt-1.5 text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
              {data.name.startsWith("0x")
                ? `${data.name.slice(0, 6)}...${data.name.slice(-4)}`
                : data.name}
            </p>
          )}
        </div>

        {/* Price badge -- hidden until hover (always visible on mobile) */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gray-600 bg-gray-900 px-3 py-0.5 text-xs font-mono text-gray-400 opacity-0 group-hover:opacity-100 group-hover:border-teal-500/40 group-hover:text-teal-400 sm:opacity-0 opacity-100 border-teal-500/40 text-teal-400 transition-all duration-200 whitespace-nowrap">
          {loading ? "..." : error ? "unavailable" : priceLabel}
        </span>
      </button>

      {modalOpen && (
        <MarkeeModal
          leaderboardAddress={LEADERBOARD_ADDRESS}
          minimumPrice={effectiveMin}
          maxMessageLength={maxMessageLength ? Number(maxMessageLength) : 223}
          topFundsAdded={data.totalFundsAdded}
          takeTopSpot={takeTopSpot}
          currentMessage={data.message}
          currentName={data.name}
          topMarkeeAddress={
            data.topMarkeeAddress as `0x${string}` | null
          }
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            setTimeout(fetchData, 3000);
          }}
        />
      )}
    </>
  );
}
