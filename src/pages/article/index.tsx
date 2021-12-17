import { GetStaticProps } from 'next';
import { client } from '../../lib/client';
import { ArticleList } from '../../types/article';

export default function Articles() {
  return <></>;
}

export const getStaticProps: GetStaticProps<{
  articles: ArticleList;
}> = async (context) => {
  const articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
    },
  });

  return {
    props: { articles }, // ページコンポーネントにpropsとして渡されます。
  };
};
