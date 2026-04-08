"use client";

import { useEffect, useRef, useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { formatEther, parseEther, UserRejectedRequestError } from "viem";
import {
  useAccount,
  useBalance,
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
  BUY_URL,
  MIN_INCREMENT,
} from "@/lib/markee";

const GARDENS_URL =
  "https://app.gardens.fund/gardens/8453/0xce6b968c8bd130ca08f1fcc97b509a824380d867";

type ModalTab = "buy" | "boost";

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

// Floor ETH string to 3 decimal places so clicking balance never exceeds actual balance
function floorTo3(ethStr: string): string {
  const n = parseFloat(ethStr);
  if (isNaN(n)) return "0";
  return (Math.floor(n * 1000) / 1000).toString();
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
  const [tab, setTab] = useState<ModalTab>("buy");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ethAmount, setEthAmount] = useState("");
  const [boostAmount, setBoostAmount] = useState("");
  const [selectedAddr, setSelectedAddr] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { address, isConnected, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { openConnectModal, connectModalOpen } = useConnectModal();

  // Use account-bound chainId so it stays in sync with the connected wallet
  // even when multiple wallet extensions are present
  const isOnBase = isConnected && chainId === base.id;

  const { data: balance } = useBalance({
    address,
    chainId: base.id,
    query: { enabled: !!address },
  });

  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  // Leaderboard: read top 10 markees from contract (only when on boost tab)
  const { data: topMarkeesData, isPending: topMarkeesPending } = useReadContract({
    address: LEADERBOARD_ADDRESS,
    abi: LEADERBOARD_ABI,
    functionName: "getTopMarkees",
    args: [10n],
    chainId: base.id,
    query: { enabled: tab === "boost" },
  });

  const topAddresses =
    (topMarkeesData as [`0x${string}`[], bigint[]] | undefined)?.[0] ?? [];
  const topFundsArr =
    (topMarkeesData as [`0x${string}`[], bigint[]] | undefined)?.[1] ?? [];

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
      totalFundsAdded: topFundsArr[i] ?? 0n,
    }))
    .filter((e) => e.message);

  const leaderboardLoading =
    tab === "boost" &&
    (topMarkeesPending || (topAddresses.length > 0 && markeeDataPending));

  // Selected entry for boost tab
  const selectedEntry = leaderboardEntries.find(
    (e) => e.address.toLowerCase() === selectedAddr?.toLowerCase(),
  );
  const selectedFunds = selectedEntry?.totalFundsAdded ?? 0n;
  const isSelectedTop = topFundsAdded > 0n && selectedFunds >= topFundsAdded;
  const boostTakeTopSpot = isSelectedTop
    ? selectedFunds + MIN_INCREMENT
    : topFundsAdded > 0n
      ? topFundsAdded - selectedFunds + MIN_INCREMENT
      : MIN_INCREMENT;
  const boostTakeTopSpotEth = trimZeros(
    parseFloat(formatEther(boostTakeTopSpot)).toFixed(3),
  );

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
    if (isSuccess) setTimeout(onSuccess, 3000);
  }, [isSuccess, onSuccess]);

  const takeTopSpotEth = trimZeros(
    parseFloat(formatEther(takeTopSpot)).toFixed(3),
  );
  const minEth = trimZeros(parseFloat(formatEther(minimumPrice)).toFixed(6));
  const hasCompetition = topFundsAdded > 0n;

  const parsedAmount = (() => {
    try { return ethAmount ? parseEther(ethAmount) : null; } catch { return null; }
  })();

  const parsedBoostAmount = (() => {
    try { return boostAmount ? parseEther(boostAmount) : null; } catch { return null; }
  })();

  const insufficientBalance =
    isOnBase && balance && parsedAmount ? parsedAmount > balance.value : false;
  const insufficientBoostBalance =
    isOnBase && balance && parsedBoostAmount ? parsedBoostAmount > balance.value : false;
  const lowBalance =
    isConnected && isOnBase && balance ? balance.value < minimumPrice : false;

  const isLoading = isPending || isConfirming;
  const isFormDirty =
    message.length > 0 || name.length > 0 || ethAmount.length > 0 || boostAmount.length > 0;

  const handleBuySubmit = async () => {
    setError(null);
    if (!message.trim()) { setError("Message is required."); return; }
    if (!parsedAmount || parsedAmount <= 0n) { setError("Enter a valid ETH amount."); return; }
    if (parsedAmount < minimumPrice) { setError(`Minimum is ${minEth} ETH.`); return; }
    if (insufficientBalance) { setError("Insufficient ETH balance."); return; }
    if (!isConnected) { setError("Connect your wallet first."); return; }
    if (!isOnBase) {
      try { await switchChainAsync({ chainId: base.id }); } catch { setError("Please switch to Base network."); }
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
      const msg = String(err).toLowerCase();
      if (msg.includes("chain") || msg.includes("network") || msg.includes("mismatch")) {
        setError("Wrong network. Please switch to Base and try again.");
        return;
      }
      setError("Transaction failed. Please try again.");
    }
  };

  const handleBoostSubmit = async () => {
    setError(null);
    if (!selectedAddr) { setError("Select a message to boost."); return; }
    if (!parsedBoostAmount || parsedBoostAmount <= 0n) { setError("Enter a valid ETH amount."); return; }
    if (insufficientBoostBalance) { setError("Insufficient ETH balance."); return; }
    if (!isConnected) { setError("Connect your wallet first."); return; }
    if (!isOnBase) {
      try { await switchChainAsync({ chainId: base.id }); } catch { setError("Please switch to Base network."); }
      return;
    }
    try {
      await writeContractAsync({
        address: LEADERBOARD_ADDRESS,
        abi: LEADERBOARD_ABI,
        functionName: "addFunds",
        args: [selectedAddr],
        value: parsedBoostAmount,
        chainId: base.id,
      });
    } catch (err: unknown) {
      if (err instanceof UserRejectedRequestError) return;
      const msg = String(err).toLowerCase();
      if (msg.includes("chain") || msg.includes("network") || msg.includes("mismatch")) {
        setError("Wrong network. Please switch to Base and try again.");
        return;
      }
      setError("Transaction failed. Please try again.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target !== dialogRef.current || isFormDirty) return;
    onClose();
  };

  const balanceEth = balance ? formatEther(balance.value) : null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto max-w-md sm:max-w-xl w-full rounded-xl bg-gray-900 border border-gray-700 shadow-2xl p-0 max-h-[85vh] flex flex-col overflow-hidden backdrop:bg-black/60 backdrop:backdrop-blur-sm open:flex"
      onClick={handleBackdropClick}
      onClose={() => onClose()}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/markee-light.png" alt="Markee" className="h-5 w-auto" />
          <h3 className="text-base font-semibold text-gray-25">
            Change Gitcoin&apos;s Markee Message
          </h3>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Current message */}
      <div className="px-6 pt-4 pb-0">
        <div className="rounded border border-gray-700 bg-gray-800/50 px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">Current message</p>
          <p className="font-mono text-sm text-gray-200 break-words">{currentMessage}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="px-6 pt-4 flex gap-1 flex-shrink-0">
        {(["buy", "boost"] as ModalTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(null); }}
            className={`flex-1 py-2 rounded text-xs font-semibold transition-colors ${
              tab === t
                ? "bg-teal-500 text-gray-900"
                : "bg-gray-800 text-gray-400 hover:text-gray-200"
            }`}
          >
            {t === "buy" ? "Buy a Message" : "Boost Existing Message"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

        {/* Success state (both tabs) */}
        {isSuccess && (
          <div className="flex flex-col items-center justify-center py-8 gap-4 text-center">
            <CheckCircle className="h-12 w-12 text-teal-400" />
            <p className="text-base font-semibold text-gray-100">Transaction confirmed!</p>
            <a
              href={`https://basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-teal-400 underline hover:text-teal-300 transition-colors"
            >
              View on Basescan &rarr;
            </a>
            <p className="text-xs text-gray-500">Refreshing in a moment...</p>
          </div>
        )}

        {/* BUY TAB */}
        {!isSuccess && tab === "buy" && (
          <>
            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1.5">
                Your Message{" "}
                <span className="text-xs text-gray-500 font-normal">
                  ({message.length}/{maxMessageLength})
                </span>
              </label>
              <textarea
                className="w-full rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-600 font-mono text-sm px-3 py-2.5 resize-y min-h-[80px] focus:outline-none focus:border-teal-500/60 transition-colors"
                placeholder="this is a sign."
                value={message}
                maxLength={maxMessageLength}
                rows={3}
                onChange={(e) => { setMessage(e.target.value); setError(null); }}
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
                {isOnBase && balanceEth && (
                  <button
                    type="button"
                    onClick={() => { setEthAmount(floorTo3(balanceEth)); setError(null); }}
                    className="text-xs text-gray-500 font-normal ml-2 underline hover:text-gray-300 transition-colors"
                  >
                    balance: {parseFloat(balanceEth).toFixed(3)} ETH
                  </button>
                )}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {hasCompetition && (
                  <button
                    type="button"
                    onClick={() => { setEthAmount(formatEther(takeTopSpot)); setError(null); }}
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
                  onClick={() => { setEthAmount(formatEther(minimumPrice)); setError(null); }}
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
                  onChange={(e) => { setEthAmount(e.target.value); setError(null); }}
                />
              </div>
              {insufficientBalance && (
                <p className="mt-2 text-xs text-red-400">
                  Amount exceeds your balance of {parseFloat(balanceEth ?? "0").toFixed(4)} ETH.
                </p>
              )}
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
                  Your Base ETH balance is too low. You need at least {minEth} ETH.
                </p>
              </div>
            )}

            {error && (
              <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <div className="flex justify-center pt-1">
              {!isConnected ? (
                <button
                  onClick={() => { dialogRef.current?.close(); openConnectModal?.(); }}
                  className="px-8 py-2.5 rounded bg-teal-500 text-gray-900 text-sm font-semibold hover:bg-teal-400 transition-colors"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={handleBuySubmit}
                  disabled={isLoading || insufficientBalance || lowBalance}
                  className="px-8 py-2.5 rounded bg-teal-500 text-gray-900 text-sm font-semibold hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {isPending ? "Confirm in wallet..." : isConfirming ? "Confirming..." : "Buy Message"}
                </button>
              )}
            </div>
          </>
        )}

        {/* BOOST TAB */}
        {!isSuccess && tab === "boost" && (
          <>
            {leaderboardLoading ? (
              <p className="text-xs text-gray-500 font-mono py-2">loading...</p>
            ) : leaderboardEntries.length === 0 ? (
              <p className="text-xs text-gray-500 py-2">No messages yet. Be the first!</p>
            ) : (
              <>
                <div className="space-y-2">
                  {leaderboardEntries.slice(0, 5).map((entry, rank) => (
                    <button
                      key={entry.address}
                      type="button"
                      onClick={() => {
                        setSelectedAddr(entry.address);
                        setBoostAmount("");
                        setError(null);
                      }}
                      className={`w-full text-left rounded border px-4 py-3 transition-colors ${
                        selectedAddr === entry.address
                          ? "border-teal-500/60 bg-teal-500/10"
                          : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
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
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {rank === 0 && (
                            <span className="text-xs text-yellow-400 font-mono">#1</span>
                          )}
                          <span className="text-xs font-mono text-gray-400">
                            {parseFloat(formatEther(entry.totalFundsAdded)).toFixed(3)} ETH
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* See more / edit link */}
                <p className="text-xs text-gray-600 text-center">
                  <a
                    href={BUY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-400 transition-colors"
                  >
                    {leaderboardEntries.length > 5
                      ? "See more messages and edit messages you own."
                      : "Edit messages you own on the Markee app."}
                  </a>
                </p>

                {/* Selected entry boost controls */}
                {selectedEntry && (
                  <div className="space-y-3 pt-1">
                    {isSelectedTop && (
                      <p className="text-xs text-gray-400 bg-yellow-400/10 border border-yellow-400/30 rounded px-3 py-2">
                        This message has the top spot. Add more funds to make it harder to reach.
                      </p>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Amount to Pay
                        {isOnBase && balanceEth && (
                          <button
                            type="button"
                            onClick={() => { setBoostAmount(floorTo3(balanceEth)); setError(null); }}
                            className="text-xs text-gray-500 font-normal ml-2 underline hover:text-gray-300 transition-colors"
                          >
                            balance: {parseFloat(balanceEth).toFixed(3)} ETH
                          </button>
                        )}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {!isSelectedTop && (
                          <button
                            type="button"
                            onClick={() => { setBoostAmount(formatEther(boostTakeTopSpot)); setError(null); }}
                            className={`flex flex-col items-center justify-center rounded px-2 py-2.5 border-2 transition-colors text-center ${
                              boostAmount === formatEther(boostTakeTopSpot)
                                ? "border-yellow-400 bg-yellow-400/10"
                                : "border-yellow-400/40 hover:border-yellow-400/70 bg-gray-800"
                            }`}
                          >
                            <span className="text-xs font-mono font-semibold text-gray-100">
                              {boostTakeTopSpotEth} ETH
                            </span>
                            <span className="text-xs text-gray-400 mt-0.5 leading-tight">
                              Take top spot
                            </span>
                          </button>
                        )}
                        <input
                          type="number"
                          className="rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-600 font-mono text-xs text-center px-2 py-2.5 focus:outline-none focus:border-teal-500/60 transition-colors"
                          placeholder="0.001"
                          value={boostAmount}
                          min="0"
                          step="any"
                          onChange={(e) => { setBoostAmount(e.target.value); setError(null); }}
                        />
                      </div>
                      {insufficientBoostBalance && (
                        <p className="mt-2 text-xs text-red-400">
                          Amount exceeds your balance of {parseFloat(balanceEth ?? "0").toFixed(4)} ETH.
                        </p>
                      )}
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

                    {error && (
                      <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                      </p>
                    )}

                    <div className="flex justify-center">
                      {!isConnected ? (
                        <button
                          onClick={() => { dialogRef.current?.close(); openConnectModal?.(); }}
                          className="px-8 py-2.5 rounded bg-teal-500 text-gray-900 text-sm font-semibold hover:bg-teal-400 transition-colors"
                        >
                          Connect Wallet
                        </button>
                      ) : (
                        <button
                          onClick={handleBoostSubmit}
                          disabled={isLoading || insufficientBoostBalance}
                          className="px-8 py-2.5 rounded bg-teal-500 text-gray-900 text-sm font-semibold hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          {isPending
                            ? "Confirm in wallet..."
                            : isConfirming
                              ? "Confirming..."
                              : "Add Funds to this Message"}
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </>
            )}
          </>
        )}

      </div>

      {/* Footer */}
      {!isSuccess && (
        <div className="px-6 pb-4 pt-0 flex-shrink-0">
          <p className="text-center text-xs text-gray-600">
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
      )}
    </dialog>
  );
}
