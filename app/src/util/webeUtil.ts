import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Account } from "../types/web3Types";

const providerOptions = async () => ({
  walletconnect: {
    package: (await import("@walletconnect/web3-provider")).default,
    options: {
      rpc: {
        1: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
        80001: `https://rpc-mumbai.matic.today`,
      },
    },
  },
});

export const getInfuraProvider = () =>
  new ethers.providers.InfuraProvider(
    "homestead",
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  );

export const getWeb3Provider = async (): Promise<
  [any, ethers.providers.Web3Provider]
> => {
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: await providerOptions(),
  });
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  return [instance, provider];
};

export const getAccountIds = (
  provider: ethers.providers.Web3Provider
): Promise<string[]> => provider.send("eth_accounts", []);

export const convertAccount = async (id: string): Promise<Account> => {
  const provider = getInfuraProvider();
  const abbreviatedId = `${id.slice(0, 4)}...${id.slice(-3)}`;
  const ethName = await provider.lookupAddress(id);
  const avatar = ethName ? await provider.getAvatar(ethName) : null;
  return { id, abbreviatedId, ethName, avatar };
};

export const convertAccounts = (accountIds: string[]): Promise<Account[]> =>
  Promise.all(accountIds.map(convertAccount));

export const selectFirstAccount = (accounts: Account[]): Account | null =>
  accounts[0] || null;

export const getAccount = async (
  provider: ethers.providers.Web3Provider
): Promise<Account | null> =>
  selectFirstAccount(await convertAccounts(await getAccountIds(provider)));

export const getAccountByIds = async (ids: string[]): Promise<Account | null> =>
  selectFirstAccount(await convertAccounts(ids));

export const getChainId = (
  provider: ethers.providers.Web3Provider
): Promise<string> => provider.send("eth_chainId", []);

export const checkIsTargetChain = (chainId: string | number) =>
  Number(chainId) === Number(process.env.NEXT_PUBLIC_TARGET_CHAIN_ID);
