import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Account } from "../types/web3Types";

export const getWeb3Provider = (ethereum: any) =>
  new ethers.providers.Web3Provider(ethereum);

export const getWeb3ProviderByWalletConnect = async () => {
  const walletConnect = new WalletConnectProvider({
    rpc: {
      1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
      80001: `https://rpc-mumbai.matic.today`,
    },
  });
  await walletConnect.enable();
  return new ethers.providers.Web3Provider(walletConnect);
};

export const getInfuraProvider = () =>
  new ethers.providers.InfuraProvider(
    "homestead",
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  );

export const getAccountIds = (
  provider: ethers.providers.Web3Provider,
  isRequestAccount: boolean
): Promise<string[]> =>
  provider.send(isRequestAccount ? "eth_requestAccounts" : "eth_accounts", []);

export const convertAccount = async (id: string): Promise<Account> => {
  const provider = getInfuraProvider();
  const ethName = await provider.lookupAddress(id);
  const avatar = ethName ? await provider.getAvatar(ethName) : null;
  return { id, ethName, avatar };
};

export const convertAccounts = (accountIds: string[]): Promise<Account[]> =>
  Promise.all(accountIds.map(convertAccount));

export const selectFirstAccount = (accounts: Account[]): Account | null =>
  accounts[0] || null;

export const getAccount = async (
  provider: ethers.providers.Web3Provider,
  isRequestAccount: boolean
): Promise<Account | null> =>
  selectFirstAccount(
    await convertAccounts(await getAccountIds(provider, isRequestAccount))
  );

export const getChainId = (
  provider: ethers.providers.Web3Provider
): Promise<string> => provider.send("eth_chainId", []);
