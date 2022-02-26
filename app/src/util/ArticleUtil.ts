import { Article, ArticleMetaType, ByContract } from "@/types/articleTypes";
import { hashToURL } from "./EditUtil";
import { convertAccount } from "./web3Util";

export const getArticleData = async (
  baseData: ByContract
): Promise<Article> => {
  const [writer, normalData, ownerOnlyData] = await Promise.all([
    convertAccount(baseData.writer),
    fetchArticleHash(baseData.tokenURI),
    fetchArticleHash(baseData.ownerOnly),
  ]);
  return {
    contract: baseData,
    writer,
    ...normalData,
    image: hashToURL(normalData.image),
    ownerOnly: ownerOnlyData,
  };
};

export const fetchArticleHash = async (hash: string) => {
  const res = await fetch(hashToURL(hash));
  const { meta, image, body } = (await res.json()) as {
    meta: ArticleMetaType;
    image: string;
    body: string;
  };
  return { meta, image, body };
};
