import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { client } from '../lib/client';
import { ArticleList, CategoryList } from '../types/article';
import { About } from '../components/about';

export default function Home({
  articles,
  categories,
}: {
  articles: ArticleList;
  categories: CategoryList;
}): ReactElement {
  return (
    <div className="container px-2 md:px-4 mx-auto">
      <About />
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  articles: ArticleList;
  categories: CategoryList;
}> = async (context) => {
  const articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
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
