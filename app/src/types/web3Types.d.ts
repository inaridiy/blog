import { ethers } from "ethers";

export interface Account {
  id: string;
  abbreviatedId: string;
  ethName: string | null;
  avatar: string | null;
}
export interface Web3ContextInterface {
  provider: ethers.providers.Web3Provider | null;
  account: Account | null;
  chainId: string | null;
  isInitializing: boolean;
  isTargetChain: boolean;
  isConnected: boolean;
  error: string;
  metamask: boolean;
  disconnect: () => void;
  initWeb3: (opt?: {
    isRequestAccount?: boolean;
    wallet?: "metamask" | "wallet_connect";
  }) => Promise<void>;
  switchToTargetChain: () => Promise<void>;
}
