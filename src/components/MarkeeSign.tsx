"use client";

import { useState, useEffect, useCallback } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import { base } from "wagmi/chains";
import MarkeeModal from "./MarkeeModal";
import {
  LEADERBOARD_ADDRESS,
  LEADERBOARD_ADDRESS_LOWER,
  LEADERBOARD_ABI,
  API_URL,
  MIN_INCREMENT,
} from "@/lib/markee";

type SignData = {
  topMarkeeAddress: string | null;
  message: string;
  name: string;
  totalFundsAdded: bigint;
};

const DEFAULT_DATA: SignData = {
  topMarkeeAddress: null,
  message: "this is a sign.",
  name: "",
  totalFundsAdded: 0n,
};

export default function MarkeeSign() {
  const [data, setData] = useState<SignData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
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
      if (!res.ok) throw new Error(`API ${res.status}`);
      const json = await res.json();
      const lb = (json.leaderboards ?? []).find(
        (l: { address: string }) =>
          l.address.toLowerCase() === LEADERBOARD_ADDRESS_LOWER,
      );
      if (!lb || !lb.topMessage || BigInt(lb.topFundsAddedRaw ?? "0") === 0n) {
        setData(DEFAULT_DATA);
      } else {
        setData({
          topMarkeeAddress: lb.topMarkeeAddress ?? null,
          message: lb.topMessage,
          name: lb.topMessageOwner ?? "",
          totalFundsAdded: BigInt(lb.topFundsAddedRaw ?? "0"),
        });
      }
    } catch {
      // leave DEFAULT_DATA in place; modal still works via contract reads
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const effectiveMin = minimumPrice ?? BigInt("3000000000000000");
  const takeTopSpot =
    data.totalFundsAdded > 0n
      ? data.totalFundsAdded + MIN_INCREMENT
      : effectiveMin;
  const priceLabel =
    data.totalFundsAdded > 0n
      ? `${parseFloat(formatEther(takeTopSpot)).toFixed(3)} ETH to change`
      : "be first!";

  return (
    <>
      <button
        data-markee-address={LEADERBOARD_ADDRESS_LOWER}
        onClick={() => setModalOpen(true)}
        disabled={loading}
        className="group relative w-full text-left cursor-pointer"
        aria-label="Click to change the Markee message"
      >
        <div className="rounded border border-gray-700 bg-gray-800/40 px-4 py-3 hover:border-teal-500/50 transition-colors duration-200">
          <p className="font-mono text-xs text-gray-300 group-hover:text-gray-100 transition-colors duration-200 leading-snug break-words">
            {loading ? (
              <span className="text-gray-500">loading...</span>
            ) : (
              data.message
            )}
          </p>
          {data.name && !loading && (
            <p className="mt-1 text-xs text-gray-600 group-hover:text-gray-500 transition-colors duration-200">
              {data.name.startsWith("0x")
                ? `${data.name.slice(0, 6)}...${data.name.slice(-4)}`
                : data.name}
            </p>
          )}
        </div>

        {/* Price badge -- revealed on hover */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gray-700 bg-gray-900 px-2.5 py-0.5 text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100 group-hover:border-teal-500/40 group-hover:text-teal-400 transition-all duration-200 whitespace-nowrap">
          {loading ? "..." : priceLabel}
        </span>
      </button>

      {modalOpen && (
        <MarkeeModal
          minimumPrice={effectiveMin}
          maxMessageLength={maxMessageLength ? Number(maxMessageLength) : 223}
          topFundsAdded={data.totalFundsAdded}
          takeTopSpot={takeTopSpot}
          currentMessage={data.message}
          currentName={data.name}
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
