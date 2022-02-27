import { Article, ArticleMetaType, ByContract } from "@/types/articleTypes";
import { fetchArticleHash, getArticleData } from "@/util/ArticleUtil";
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
  ) as { data: S | undefined; error: unknown };

  return { data, error };
};

export const useArticleFetcher = (data: ByContract) => {
  const _fetcher = () => getArticleData(data);
  const { data: article, error } = useSWR(
    `article/${data.ownerOnly},${data.tokenURI}`,
    _fetcher
  ) as { data: Article | undefined; error: unknown };
  return { article, error };
};

export const useHashFetcher = (uri: string) => {
  const _fetcher = () => fetchArticleHash(uri);
  const { data: article, error } = useSWR(`articleHash/${uri}`, _fetcher) as {
    data: { image: string; meta: ArticleMetaType; body: string };
    error: unknown;
  };

  return { article, error };
};
