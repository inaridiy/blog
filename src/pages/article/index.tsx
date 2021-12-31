import { GetStaticProps } from 'next';
import { ArticleCard } from '../../components/article/ArticleCard';
import { NormalLayout } from '../../components/layouts/normal';
import { client, colorGene, parser } from '../../lib';
import { ArticleList } from '../../types/article';
import toMaterialStyle from 'material-color-hash';

export default function ArticlesPage({ articles }: { articles: ArticleList }) {
  return (
    <div className="container grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-y-10 px-2 md:px-4 mx-auto max-w-screen-lg">
      <div className="sm:col-span-2 row-span-2">
        <ArticleCard article={articles.contents[0]} />
      </div>
      {articles.contents.slice(1).map((article) => (
        <ArticleCard article={article} key={article.id} />
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
      title: parser.translateHTMLString(article.title),
      body: '',
      color: toMaterialStyle(article.title, 800).backgroundColor,
      bgColor: colorGene(article.title),
    })),
  };
  return {
    props: { articles },
  };
};

ArticlesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <NormalLayout alwaysShowBottomNav>{page}</NormalLayout>;
};
