import { GetStaticProps } from 'next';
import { ArticleCardTop } from '../../components/article/ArticleCard';
import { NormalLayout } from '../../components/layouts/normal';
import { client } from '../../lib/client';
import { ArticleList } from '../../types/article';

export default function ArticlesPage({ articles }: { articles: ArticleList }) {
  return (
    <div className="container px-2 md:px-4 mx-auto">
      {articles.contents.map((article) => (
        <ArticleCardTop article={article} key={article.id} />
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  articles: ArticleList;
}> = async (context) => {
  let articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
    },
  });

  articles = {
    ...articles,
    contents: articles.contents.map((article) => ({
      ...article,
      body: '',
    })),
  };
  return {
    props: { articles },
  };
};

ArticlesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <NormalLayout alwaysShowBottomNav>{page}</NormalLayout>;
};
