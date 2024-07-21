import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import React from "react";

export const config = createConfig(
    getDefaultConfig({
        chains: [sepolia],
        transports: {
          // RPC URL for each chain
          [sepolia.id]: http(
            `https://rpc.sepolia.org`,
          ),
        },
      walletConnectProjectId: '6b2bb4d988d866f9449aa510de577844',
  
      // Required
      appName: "ERC1155",
  
    }),
  );
const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};