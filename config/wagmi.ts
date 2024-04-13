import { http, createConfig } from "wagmi";
import { optimismSepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(),
  },
});