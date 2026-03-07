"use client";

import { ReactNode, useState } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";
import { IS_STAGING } from "@/lib/staking-contract";

const config = IS_STAGING
  ? createConfig({
      chains: [sepolia],
      connectors: [injected()],
      transports: { [sepolia.id]: http() },
      ssr: true,
    })
  : createConfig({
      chains: [mainnet],
      connectors: [injected()],
      transports: { [mainnet.id]: http() },
      ssr: true,
    });

export function WalletProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
