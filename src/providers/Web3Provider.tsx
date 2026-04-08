"use client";

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
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

const config = getDefaultConfig({
  appName: "Gitcoin",
  projectId: projectId ?? "placeholder",
  chains: [base],
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
