import { Contract } from "ethers";
import useSWR from "swr";

export const useContractFetcher = <T extends Contract, S>(
  contract: T | null,
  key: string,
  fetcher: (contract: T) => Promise<S>
) => {
  const _fetcher = async () => await fetcher(contract as T);
  const { data, error } = useSWR(
    contract ? `contractFetch/${key}` : null,
    _fetcher
  );

  return { data, error };
};
