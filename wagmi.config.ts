import { http, createConfig } from 'wagmi'
import { optimism, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [optimism, sepolia],
  transports: {
    [optimism.id]: http(),
    [sepolia.id]: http(),
  },
})