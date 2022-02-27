import { Account } from "./web3Types";

export type ArticleMetaType = {
  title: string;
  slug: string;
  category: string[];
};

export type OGPImageOpt = {
  title: string;
  path?: string;
  name?: string;
  twitter?: string;
};

export type ForContract = {
  tokenURI: string;
  ownerOnly: string;
  quantity: string;
  price: string;
};

export type ByContract = {
  id: number;
  tokenURI: string;
  ownerOnly: string;
  price: string;
  writer: string;
};

export type Article = {
  contract: { id: number; tokenURI: string; ownerOnly: string; price: string };
  writer: Account;
  image: string;
  meta: ArticleMetaType;
  body: string;
  ownerOnly: {
    image: string;
    meta: ArticleMetaType;
    body: string;
  };
};

export type ForEdit = {
  id: number;
  tokenURI: string;
  ownerOnly: string;
  price: string;
};
