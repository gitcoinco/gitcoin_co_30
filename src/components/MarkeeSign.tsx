"use client";

import { useState, useEffect, useCallback } from "react";
import { Eye } from "lucide-react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import { base } from "wagmi/chains";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import MarkeeModal from "./MarkeeModal";
import { ModeratedContent, FlagButton } from "@/components/moderation";
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

function formatViews(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) return `${(Math.floor(n / 100) / 10).toFixed(1)}k`;
  if (n < 1_000_000_000) return `${(Math.floor(n / 100_000) / 10).toFixed(1)}M`;
  return `${(Math.floor(n / 100_000_000) / 10).toFixed(1)}B`;
}

export default function MarkeeSign() {
  const [data, setData] = useState<SignData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [boostAmount, setBoostAmount] = useState("");
  const [pendingReopenModal, setPendingReopenModal] = useState(false);

  const { openConnectModal, connectModalOpen } = useConnectModal();

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
        const next: SignData = {
          topMarkeeAddress: lb.topMarkeeAddress ?? null,
          message: lb.topMessage,
          name: lb.topMessageOwner ?? "",
          totalFundsAdded: BigInt(lb.topFundsAddedRaw ?? "0"),
        };
        setData(next);
        // Track view and capture updated count
        if (next.topMarkeeAddress) {
          fetch("/api/markee/views", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              address: next.topMarkeeAddress,
              message: next.message,
            }),
          })
            .then((r) => r.json())
            .then((d) => {
              if (typeof d.messageViews === "number") setViewCount(d.messageViews);
            })
            .catch(() => {});
        }
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

  // Reopen Markee modal after RainbowKit wallet connect modal closes
  useEffect(() => {
    if (!connectModalOpen && pendingReopenModal) {
      setPendingReopenModal(false);
      setModalOpen(true);
    }
  }, [connectModalOpen, pendingReopenModal]);

  const handleConnectWallet = useCallback(() => {
    setModalOpen(false);
    setPendingReopenModal(true);
    openConnectModal?.();
  }, [openConnectModal]);

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
      <div
        data-markee-address={LEADERBOARD_ADDRESS_LOWER}
        className="group relative w-full"
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div onClick={() => !loading && setModalOpen(true)} className="cursor-pointer">
          <ModeratedContent
            chainId={base.id}
            markeeId={data.topMarkeeAddress ?? ""}
            className="rounded border border-gray-700 bg-gray-800/40 hover:border-teal-500/50 transition-colors duration-200"
          >
            <div className="px-4 pt-3 pb-2 flex flex-col gap-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-mono text-xs text-gray-300 group-hover:text-gray-100 transition-colors duration-200 leading-snug break-words">
                    {loading ? (
                      <span className="text-gray-500">Loading...</span>
                    ) : (
                      data.message
                    )}
                  </p>
                  {data.name && !loading && (
                    <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                      {data.name.startsWith("0x")
                        ? `${data.name.slice(0, 6)}...${data.name.slice(-4)}`
                        : data.name}
                    </p>
                  )}
                </div>
                {data.topMarkeeAddress && !loading && (
                  <span onClick={(e) => e.stopPropagation()}>
                    <FlagButton
                      chainId={base.id}
                      markeeId={data.topMarkeeAddress}
                      compact
                    />
                  </span>
                )}
              </div>
              {viewCount !== null && !loading && (
                <div className="flex justify-end">
                  <span className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                    <Eye size={11} className="opacity-70" />
                    {formatViews(viewCount)}
                  </span>
                </div>
              )}
            </div>
          </ModeratedContent>
        </div>

        {/* Price badge -- revealed on hover */}
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gray-700 bg-gray-900 px-2.5 py-0.5 text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100 group-hover:border-teal-500/40 group-hover:text-teal-400 transition-all duration-200 whitespace-nowrap pointer-events-none">
          {loading ? "..." : priceLabel}
        </span>
      </div>

      {modalOpen && (
        <MarkeeModal
          minimumPrice={effectiveMin}
          maxMessageLength={maxMessageLength ? Number(maxMessageLength) : 223}
          topFundsAdded={data.totalFundsAdded}
          takeTopSpot={takeTopSpot}
          currentMessage={data.message}
          currentName={data.name}
          message={message}
          setMessage={setMessage}
          name={name}
          setName={setName}
          ethAmount={ethAmount}
          setEthAmount={setEthAmount}
          boostAmount={boostAmount}
          setBoostAmount={setBoostAmount}
          onConnectWallet={handleConnectWallet}
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
