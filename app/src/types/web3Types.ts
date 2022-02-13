import { ethers } from "ethers";

export interface Account {
  id: string;
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
  initWeb3: (opt?: { isRequestAccount?: boolean }) => Promise<void>;
  switchToTargetChain: () => Promise<void>;
}
