"use client"
import "./globals.scss";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { config } from "../wagmi.config";

const queryClient = new QueryClient();

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <AntdRegistry>{children}</AntdRegistry>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
