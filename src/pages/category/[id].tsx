import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { client } from '../../lib/client';
import { ArticleList, CategoryList } from '../../types/article';
import { useRouter } from 'next/dist/client/router';

export default function Home({
  articles,
  categories,
}: {
  articles: ArticleList;
  categories: CategoryList;
}): ReactElement {
  const router = useRouter();
  const thisCategory = categories.contents.find(
    (s) => s.id === router.query.id
  );
  return <></>;
}

export const getStaticPaths = async () => {
  const data = await client.get<CategoryList>({
    endpoint: process.env.CATEGORY_END_POINT || '',
  });
  //console.log(data);
  const paths: string[] = data.contents.map(
    (category) => `/category/${category.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  articles: ArticleList;
  categories: CategoryList;
}> = async (context) => {
  const contentId = context.params?.id as string;
  const articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
      filters: `category[contains]${contentId}`,
    },
  });

  const categories = await client.get<CategoryList>({
    endpoint: process.env.CATEGORY_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
    },
  });

  return {
    props: { articles, categories }, // ページコンポーネントにpropsとして渡されます。
  };
};
