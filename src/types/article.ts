export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  category: Category[];
  title: string;
  body: string;
  og_frame: OGFrame | null;
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

export type CategoryList = {
  contents: Category[];
  total: number;
  totalCount: number;
  offset: number;
  limit: number;
};

export type OGFrame = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  keyWord: string;
  theme: 'light' | 'dark';
  images: UploadImage[];
};

export type UploadImage = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};
