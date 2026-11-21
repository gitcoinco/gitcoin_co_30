"use client";

import { useState, type ReactNode } from "react";
import { useModeration } from "@/components/moderation/ModerationProvider";
import { MODERATION_DEFAULTS } from "@/lib/moderation/config";

interface ModeratedContentProps {
  chainId: number | string;
  markeeId: string;
  children: ReactNode;
  blurAmount?: string;
  overlayText?: string;
  allowReveal?: boolean;
  className?: string;
}

export function ModeratedContent({
  chainId,
  markeeId,
  children,
  blurAmount = MODERATION_DEFAULTS.blurAmount,
  overlayText = MODERATION_DEFAULTS.overlayText,
  allowReveal = MODERATION_DEFAULTS.allowReveal,
  className = "",
}: ModeratedContentProps) {
  const { isFlagged, isAdmin } = useModeration();
  const [revealed, setRevealed] = useState(false);

  const flagged = isFlagged(chainId, markeeId);

  if (!flagged || isAdmin) {
    return (
      <div className={`relative ${className}`}>
        {children}
        {flagged && isAdmin && (
          <div className="absolute top-1 right-1 text-[10px] bg-red-500/80 text-white px-1.5 py-0.5 rounded font-medium pointer-events-none">
            Flagged
          </div>
        )}
      </div>
    );
  }

  if (revealed) {
    return (
      <div className={`relative ${className}`}>
        {children}
        <button
          onClick={() => setRevealed(false)}
          className="absolute top-1 right-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
        >
          Hide
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className="select-none pointer-events-none"
        style={{ filter: `blur(${blurAmount})` }}
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900/70 rounded">
        <span className="text-sm text-gray-400 text-center px-4">
          {overlayText}
        </span>
        {allowReveal && (
          <button
            onClick={() => setRevealed(true)}
            className="text-xs text-teal-400 hover:text-teal-300 underline transition-colors"
          >
            {MODERATION_DEFAULTS.revealText}
          </button>
        )}
      </div>
    </div>
  );
}
