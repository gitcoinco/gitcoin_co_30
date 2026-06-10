"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ADMIN_ADDRESSES, MODERATION_API } from "@/lib/moderation/config";

interface ModerationContextValue {
  flaggedSet: Set<string>;
  isAdmin: boolean;
  isFlagged: (chainId: number | string, markeeId: string) => boolean;
  toggleFlag: (chainId: number | string, markeeId: string) => Promise<boolean>;
  isLoading: boolean;
}

const ModerationContext = createContext<ModerationContextValue>({
  flaggedSet: new Set(),
  isAdmin: false,
  isFlagged: () => false,
  toggleFlag: async () => false,
  isLoading: true,
});

export function useModeration() {
  return useContext(ModerationContext);
}

export function ModerationProvider({ children }: { children: ReactNode }) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [flaggedSet, setFlaggedSet] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const isAdminUser = address
    ? ADMIN_ADDRESSES.some((a) => a.toLowerCase() === address.toLowerCase())
    : false;

  useEffect(() => {
    fetch(MODERATION_API)
      .then((r) => r.json())
      .then((d) => setFlaggedSet(new Set(d.flagged ?? [])))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const isFlagged = useCallback(
    (chainId: number | string, markeeId: string) =>
      flaggedSet.has(`${chainId}:${markeeId}`),
    [flaggedSet],
  );

  const toggleFlag = useCallback(
    async (chainId: number | string, markeeId: string): Promise<boolean> => {
      if (!address || !isAdminUser) return false;

      const key = `${chainId}:${markeeId}`;
      const currentlyFlagged = flaggedSet.has(key);
      const action = currentlyFlagged ? "unflag" : "flag";

      // Optimistic update
      setFlaggedSet((prev) => {
        const next = new Set(prev);
        action === "flag" ? next.add(key) : next.delete(key);
        return next;
      });

      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const message = `markee-moderation:${action}:${chainId}:${markeeId}:${timestamp}`;
        const signature = await signMessageAsync({ message });

        const res = await fetch(MODERATION_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            markeeId,
            chainId,
            action,
            adminAddress: address,
            signature,
            timestamp,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFlaggedSet(new Set(data.flagged ?? []));
        return action === "flag";
      } catch (err) {
        console.error("[moderation] toggleFlag error:", err);
        // Rollback
        setFlaggedSet((prev) => {
          const rollback = new Set(prev);
          action === "flag" ? rollback.delete(key) : rollback.add(key);
          return rollback;
        });
        return currentlyFlagged;
      }
    },
    [address, isAdminUser, flaggedSet, signMessageAsync],
  );

  return (
    <ModerationContext.Provider
      value={{ flaggedSet, isAdmin: isAdminUser, isFlagged, toggleFlag, isLoading }}
    >
      {children}
    </ModerationContext.Provider>
  );
}
