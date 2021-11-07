export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  category: [];
  title: string;
  body: string;
};

export type ArticleList = {
  contents: Article[];
  total: number;
  totalCount: number;
  offset: number;
  limit: number;
};

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};
