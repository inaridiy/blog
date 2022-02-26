import { ByContract } from "@/types/articleTypes";
import { getArticleData } from "@/util/ArticleUtil";
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

export const useArticleFetcher = (data: ByContract) => {
  const _fetcher = () => getArticleData(data);
  const { data: article, error } = useSWR(
    `article/${data.ownerOnly},${data.tokenURI}`,
    _fetcher
  );
  return { article, error };
};
