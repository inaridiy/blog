import WalletConnectProvider from "@walletconnect/web3-provider";
import React, { createContext, useEffect, useState } from "react";
import { Web3ContextInterface } from "../types/web3Types";
import {
  checkIsTargetChain,
  getAccount,
  getAccountByIds,
  getWeb3Provider,
  getWeb3ProviderByWalletConnect,
} from "../util/webeUtil";

declare let window: any;
type Interface = Web3ContextInterface;

const getDefaultContextValue = (): Web3ContextInterface => ({
  isInitializing: true,
  provider: null,
  account: null,
  chainId: null,
  isTargetChain: false,
  isConnected: false,
  error: "",
  metamask: false,
  initWeb3: async () => {},
  disconnect: () => {},
  switchToTargetChain: async () => {},
});

export const Web3Context = createContext<Web3ContextInterface>(
  getDefaultContextValue()
);

export const Web3Provider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [provider, setProvider] = useState<Interface["provider"]>(null);
  const [account, setAccount] = useState<Interface["account"]>(null);
  const [chainId, setChainId] = useState<Interface["chainId"]>(null);
  const [metamask, setMetamask] = useState<Interface["metamask"]>(false);
  const [isInitializing, setIsInitializing] =
    useState<Interface["isInitializing"]>(true);
  const [walletConnect, setWalletConnect] =
    useState<WalletConnectProvider | null>(null);
  const [isTargetChain, setIsTargetChain] =
    useState<Interface["isTargetChain"]>(false);

  const initWeb3 = async ({
    isRequestAccount = false,
    wallet = "metamask",
  } = {}) => {
    const { ethereum } = process.browser && window;
    setMetamask(Boolean(ethereum));
    setIsInitializing(true);
    resetWeb3();
    try {
      if (ethereum && !isRequestAccount) {
        await connectMetamask(ethereum, false);
      } else if (ethereum && wallet === "metamask") {
        await connectMetamask(ethereum, true);
      } else if (wallet === "wallet_connect") {
        await connectWalletConnect();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitializing(false);
    }
  };

  const connectMetamask = async (ethereum: any, isRequestAccount = false) => {
    const _provider = getWeb3Provider(ethereum);
    setProvider(_provider);
    setAccount(await getAccount(_provider, isRequestAccount));
    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);
  };

  const connectWalletConnect = async () => {
    const [_walletConnect, _provider] = await getWeb3ProviderByWalletConnect();
    setWalletConnect(_walletConnect);
    setProvider(_provider);
    setAccount(await getAccount(_provider, false));
  };

  const disconnect = () => {
    resetWeb3();
    walletConnect && walletConnect.disconnect();
  };

  const resetWeb3 = () => {
    const { ethereum } = process.browser && window;
    setProvider(null);
    setAccount(null);
    setChainId(null);
    if (ethereum) {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    }
  };

  const handleAccountsChanged = async (_accountId: string[]) => {
    try {
      setIsInitializing(true);
      setAccount(await getAccountByIds(_accountId));
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleChainChanged = (_chainId: string) => {
    setChainId(_chainId);
    setIsTargetChain(checkIsTargetChain(_chainId));
  };

  useEffect(() => {
    initWeb3({ isRequestAccount: false, wallet: "metamask" });
    return resetWeb3;
  }, []);
  return (
    <Web3Context.Provider
      value={{
        ...getDefaultContextValue(),
        provider,
        account,
        chainId,
        initWeb3,
        isInitializing,
        isTargetChain,
        disconnect,
        metamask,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
