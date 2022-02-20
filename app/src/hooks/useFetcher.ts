import { Contract } from "ethers";
import { useEffect, useState } from "react";

export const useContractFetcher = <T extends Contract, S>(
  contract: T | null,
  fetcher: (contract: T) => Promise<S>
) => {
  const [data, setData] = useState<S | null>(null);
  const [error, setError] = useState<any | null>(null);
  const _fetcher = async (contract: T) => {
    try {
      const _data = await fetcher(contract);
      setData(_data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    contract && _fetcher(contract);
  }, [contract]);

  return { data, error };
};
