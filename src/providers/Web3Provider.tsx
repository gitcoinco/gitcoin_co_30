"use client";

import { ReactNode } from "react";
import { WagmiProvider, http } from "wagmi";
import { base } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  console.error(
    "[Markee] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set — WalletConnect (mobile wallets) will not work. Get a free project ID at https://cloud.walletconnect.com",
  );
}

const baseRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL;

const config = getDefaultConfig({
  appName: "Gitcoin",
  projectId: projectId ?? "placeholder",
  chains: [base],
  transports: {
    [base.id]: baseRpcUrl ? http(baseRpcUrl) : http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
