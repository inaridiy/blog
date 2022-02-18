import React, { createContext, useEffect, useState } from "react";
import { Web3ContextInterface } from "../types/web3Types";
import {
  checkIsTargetChain,
  getAccount,
  getAccountByIds,
  getWeb3Provider,
} from "../util/webeUtil";

type Interface = Web3ContextInterface;

const getDefaultContextValue = (): Web3ContextInterface => ({
  isLoading: true,
  provider: null,
  account: null,
  chainId: null,
  isTargetChain: false,
  error: "",
  connectWallet: async () => {},
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
  const [isLoading, setIsLoading] = useState<Interface["isLoading"]>(false);
  const [isTargetChain, setIsTargetChain] =
    useState<Interface["isTargetChain"]>(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const [instance, _provider] = await getWeb3Provider();
      setProvider(_provider);
      setAccount(await getAccount(_provider));
      instance.on("accountsChanged", handleAccountsChanged);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const resetWeb3 = () => {
    setProvider(null);
    setAccount(null);
    setChainId(null);
  };

  const handleAccountsChanged = async (_accountIds: string[]) => {
    try {
      setIsLoading(true);
      setAccount(await getAccountByIds(_accountIds));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChainChanged = (_chainId: string) => {
    setChainId(_chainId);
    setIsTargetChain(checkIsTargetChain(_chainId));
  };

  useEffect(() => {
    return resetWeb3;
  }, []);
  return (
    <Web3Context.Provider
      value={{
        ...getDefaultContextValue(),
        provider,
        account,
        chainId,
        isLoading,
        isTargetChain,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
