import React, { createContext, useEffect, useState } from "react";
import { Web3ContextInterface } from "../types/web3Types";
import { getAccount, getWeb3Provider } from "../util/webeUtil";

declare let window: any;
type Interface = Web3ContextInterface;

const getDefaultContextValue = (): Web3ContextInterface => ({
  isInitializing: true,
  provider: null,
  initWeb3: async () => {},
  account: null,
  chainId: null,
  isTargetChain: false,
  isConnected: false,
  error: "",
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
  const [isInitializing, setIsInitializing] =
    useState<Interface["isInitializing"]>(true);

  const initWeb3 = async ({ isRequestAccount = false } = {}) => {
    const { ethereum } = process.browser && window;
    setIsInitializing(true);
    resetWeb3();
    try {
      if (ethereum) {
        const _provider = getWeb3Provider(ethereum);
        setProvider(_provider);
        setAccount(await getAccount(_provider, isRequestAccount));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsInitializing(false);
    }
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

  const handleAccountsChanged = async (_accountId: string) => {};

  const handleChainChanged = (_chainId: string) => {};

  useEffect(() => {
    initWeb3();
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
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
