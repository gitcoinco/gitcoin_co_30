"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { formatEther, parseEther, UserRejectedRequestError } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { base } from "wagmi/chains";
import {
  LEADERBOARD_ADDRESS,
  LEADERBOARD_ABI,
  MARKEE_ABI,
} from "@/lib/markee";

const GARDENS_URL =
  "https://app.gardens.fund/gardens/8453/0xce6b968c8bd130ca08f1fcc97b509a824380d867";

interface MarkeeModalProps {
  minimumPrice: bigint;
  maxMessageLength: number;
  topFundsAdded: bigint;
  takeTopSpot: bigint;
  currentMessage: string;
  currentName: string;
  onClose: () => void;
  onSuccess: () => void;
}

function trimZeros(value: string) {
  return value.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
}

export default function MarkeeModal({
  minimumPrice,
  maxMessageLength,
  topFundsAdded,
  takeTopSpot,
  currentMessage,
  onClose,
  onSuccess,
}: MarkeeModalProps) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { openConnectModal, connectModalOpen } = useConnectModal();

  const isOnBase = chainId === base.id;

  const { data: balance } = useBalance({
    address,
    chainId: base.id,
    query: { enabled: !!address },
  });

  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  // Leaderboard: read top 10 markees directly from contract
  const { data: topMarkeesData, isPending: topMarkeesPending } = useReadContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: "getTopMarkees",
    args: [10n],
    chainId: base.id,
    query: { enabled: leaderboardOpen },
  });

  const topAddresses = (topMarkeesData as [`0x${string}`[], bigint[]] | undefined)?.[0] ?? [];
  const topFunds = (topMarkeesData as [`0x${string}`[], bigint[]] | undefined)?.[1] ?? [];

  const { data: markeeReadData, isPending: markeeDataPending } = useReadContracts({
    contracts: topAddresses.flatMap((addr) => [
      { address: addr, abi: MARKEE_ABI, functionName: "message" as const, chainId: base.id },
      { address: addr, abi: MARKEE_ABI, functionName: "name" as const, chainId: base.id },
    ]),
    query: { enabled: topAddresses.length > 0 },
  });

  const leaderboardEntries = topAddresses
    .map((addr, i) => ({
      address: addr,
      message: (markeeReadData?.[i * 2]?.result as string) ?? "",
      name: (markeeReadData?.[i * 2 + 1]?.result as string) ?? "",
      totalFundsAdded: topFunds[i]?.toString() ?? "0",
    }))
    .filter((e) => e.message);

  const leaderboardLoading =
    leaderboardOpen &&
    (topMarkeesPending || (topAddresses.length > 0 && markeeDataPending));

  // Open dialog on mount
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // Reopen dialog after RainbowKit connect modal closes
  useEffect(() => {
    if (!connectModalOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [connectModalOpen]);

  useEffect(() => {
    if (isSuccess) setTimeout(onSuccess, 1500);
  }, [isSuccess, onSuccess]);

  const takeTopSpotEth = trimZeros(
    parseFloat(formatEther(takeTopSpot)).toFixed(3),
  );
  const minEth = trimZeros(parseFloat(formatEther(minimumPrice)).toFixed(6));
  const hasCompetition = topFundsAdded > 0n;

  const parsedAmount = (() => {
    try {
      return ethAmount ? parseEther(ethAmount) : null;
    } catch {
      return null;
    }
  })();

  const insufficientBalance =
    isOnBase && balance && parsedAmount ? parsedAmount > balance.value : false;

  const lowBalance =
    isConnected && isOnBase && balance
      ? balance.value < minimumPrice
      : false;

  const isLoading = isPending || isConfirming;
  const isFormDirty =
    message.length > 0 || name.length > 0 || ethAmount.length > 0;

  const validate = () => {
    if (!message.trim()) {
      setError("Message is required.");
      return false;
    }
    if (!parsedAmount || parsedAmount <= 0n) {
      setError("Enter a valid ETH amount.");
      return false;
    }
    if (parsedAmount < minimumPrice) {
      setError(`Minimum is ${minEth} ETH.`);
      return false;
    }
    if (insufficientBalance) {
      setError("Insufficient ETH balance.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validate() || !parsedAmount) return;
    if (!isConnected) {
      setError("Connect your wallet first.");
      return;
    }
    if (!isOnBase) {
      try {
        await switchChainAsync({ chainId: base.id });
      } catch {
        setError("Please switch to Base network.");
      }
      return;
    }
    try {
      await writeContractAsync({
        address: LEADERBOARD_ADDRESS,
        abi: LEADERBOARD_ABI,
        functionName: "createMarkee",
        args: [message.trim(), name.trim()],
        value: parsedAmount,
        chainId: base.id,
      });
    } catch (err: unknown) {
      if (err instanceof UserRejectedRequestError) return;
      setError("Transaction failed. Please try again.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target !== dialogRef.current || isFormDirty) return;
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto max-w-md sm:max-w-xl w-full rounded-xl bg-gray-900 border border-gray-700 shadow-2xl p-0 max-h-[85vh] flex flex-col overflow-hidden backdrop:bg-black/60 backdrop:backdrop-blur-sm open:flex"
      onClick={handleBackdropClick}
      onClose={() => onClose()}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-gray-25">
          Change Gitcoin&apos;s Markee Message
        </h3>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
        {/* Current message + leaderboard toggle */}
        <div className="rounded border border-gray-700 bg-gray-800/50 px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Current message</p>
          <p className="font-mono text-sm text-gray-200 break-words text-center">
            {currentMessage}
          </p>
          <button
            onClick={() => setLeaderboardOpen((o) => !o)}
            className="mt-3 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-150 ${leaderboardOpen ? "rotate-180" : ""}`}
            />
            {leaderboardOpen ? "Hide leaderboard" : "Show leaderboard"}
          </button>
          {leaderboardOpen && (
            <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
              {leaderboardLoading ? (
                <p className="text-xs text-gray-500 font-mono">loading...</p>
              ) : leaderboardEntries.length === 0 ? (
                <p className="text-xs text-gray-500">No entries yet.</p>
              ) : (
                leaderboardEntries.map((entry) => (
                  <div
                    key={entry.address}
                    className="flex items-start justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-gray-200 break-words">
                        {entry.message}
                      </p>
                      {entry.name && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {entry.name.startsWith("0x")
                            ? `${entry.name.slice(0, 6)}...${entry.name.slice(-4)}`
                            : entry.name}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-mono text-gray-400 flex-shrink-0 mt-0.5">
                      {parseFloat(
                        formatEther(BigInt(entry.totalFundsAdded)),
                      ).toFixed(3)}{" "}
                      ETH
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1.5">
            Your Message{" "}
            <span className="text-xs text-gray-500 font-normal">
              ({message.length}/{maxMessageLength})
            </span>
          </label>
          <textarea
            className="w-full rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-600 font-mono text-sm px-3 py-2.5 resize-y min-h-[80px] text-center focus:outline-none focus:border-teal-500/60 transition-colors"
            placeholder="this is a sign."
            value={message}
            maxLength={maxMessageLength}
            rows={3}
            onChange={(e) => {
              setMessage(e.target.value);
              setError(null);
            }}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1.5">
            Your Name{" "}
            <span className="text-xs text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            className="w-full rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-600 text-sm px-3 py-2.5 focus:outline-none focus:border-teal-500/60 transition-colors"
            placeholder="vitalik"
            value={name}
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* ETH Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            ETH Amount
            {isOnBase && balance && (
              <span className="text-xs text-gray-500 font-normal ml-2">
                (balance: {parseFloat(formatEther(balance.value)).toFixed(3)} ETH)
              </span>
            )}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {hasCompetition && (
              <button
                type="button"
                onClick={() => {
                  setEthAmount(formatEther(takeTopSpot));
                  setError(null);
                }}
                className={`flex flex-col items-center justify-center rounded px-2 py-2.5 border-2 transition-colors text-center ${
                  ethAmount === formatEther(takeTopSpot)
                    ? "border-yellow-400 bg-yellow-400/10"
                    : "border-yellow-400/40 hover:border-yellow-400/70 bg-gray-800"
                }`}
              >
                <span className="text-xs font-mono font-semibold text-gray-100">
                  {takeTopSpotEth} ETH
                </span>
                <span className="text-xs text-gray-400 mt-0.5 leading-tight">
                  Take top spot
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setEthAmount(formatEther(minimumPrice));
                setError(null);
              }}
              className={`flex flex-col items-center justify-center rounded px-2 py-2.5 border transition-colors text-center ${
                ethAmount === formatEther(minimumPrice) &&
                ethAmount !== formatEther(takeTopSpot)
                  ? "border-gray-400 bg-gray-700"
                  : "border-gray-700 hover:border-gray-500 bg-gray-800"
              }`}
            >
              <span className="text-xs font-mono font-semibold text-gray-100">
                {minEth} ETH
              </span>
              <span className="text-xs text-gray-400 mt-0.5 leading-tight">
                Minimum
              </span>
            </button>
            <input
              type="number"
              className="rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-600 font-mono text-xs text-center px-2 py-2.5 focus:outline-none focus:border-teal-500/60 transition-colors"
              placeholder={takeTopSpotEth}
              value={ethAmount}
              min="0"
              step="any"
              onChange={(e) => {
                setEthAmount(e.target.value);
                setError(null);
              }}
            />
          </div>
        </div>

        {/* Wrong network */}
        {isConnected && !isOnBase && (
          <div className="rounded border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-yellow-400">Switch to Base to continue.</p>
            <button
              onClick={() => switchChainAsync({ chainId: base.id })}
              className="ml-3 text-xs font-semibold bg-yellow-500 text-black px-3 py-1.5 rounded hover:bg-yellow-400 transition-colors"
            >
              Switch to Base
            </button>
          </div>
        )}

        {/* Low balance */}
        {lowBalance && (
          <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">
              Your Base ETH balance is too low. You need at least {minEth} ETH to buy a message.
            </p>
          </div>
        )}

        {error && (
          <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {isSuccess && (
          <p className="rounded border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-sm text-teal-400">
            Transaction confirmed! Refreshing...
          </p>
        )}

        {/* Action */}
        <div className="flex justify-center pt-1">
          {!isConnected ? (
            <button
              onClick={() => {
                dialogRef.current?.close();
                openConnectModal?.();
              }}
              className="px-8 py-2.5 rounded bg-teal-500 text-gray-900 text-sm font-semibold hover:bg-teal-400 transition-colors"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading || isSuccess || insufficientBalance || lowBalance}
              className="px-8 py-2.5 rounded bg-teal-500 text-gray-900 text-sm font-semibold hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isPending
                ? "Confirm in wallet..."
                : isConfirming
                  ? "Confirming..."
                  : isSuccess
                    ? "Done!"
                    : "Buy Message"}
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 pb-1">
          You&apos;ll receive MARKEE tokens with your purchase and co-own the{" "}
          <a
            href={GARDENS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-400 transition-colors"
          >
            Markee Network
          </a>
          .
        </p>
      </div>
    </dialog>
  );
}
