"use client";

import { useState } from "react";
import { useModeration } from "@/components/moderation/ModerationProvider";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface FlagButtonProps {
  chainId: number | string;
  markeeId: string;
  compact?: boolean;
}

export function FlagButton({
  chainId,
  markeeId,
  compact = false,
}: FlagButtonProps) {
  const { isAdmin, isFlagged, toggleFlag } = useModeration();
  const [isToggling, setIsToggling] = useState(false);

  if (!isAdmin) return null;

  const flagged = isFlagged(chainId, markeeId);
  const iconSize = compact ? 14 : 16;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isToggling) return;
    setIsToggling(true);
    try {
      await toggleFlag(chainId, markeeId);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isToggling}
      className={`
        flex items-center gap-1 rounded transition-all flex-shrink-0
        ${compact ? "p-1" : "px-2 py-1"}
        ${
          flagged
            ? "bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30"
            : "bg-gray-800 border border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-500"
        }
        ${isToggling ? "opacity-50 cursor-wait" : "cursor-pointer"}
      `}
      title={flagged ? "Unflag this message" : "Flag this message"}
    >
      {flagged ? (
        <ShieldAlert size={iconSize} />
      ) : (
        <ShieldCheck size={iconSize} />
      )}
      {!compact && (
        <span className="text-[10px] font-medium">
          {flagged ? "Unflag" : "Flag"}
        </span>
      )}
    </button>
  );
}
