import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { NormalLayout } from '../../components/layouts/normal';
import { ArticleCard } from '../../components/article/ArticleCard';
import { client } from '../../lib/client';
import { ArticleList, CategoryList } from '../../types/article';

export default function Home({
  articles,
  categories,
}: {
  articles: ArticleList;
  categories: CategoryList;
}) {
  const router = useRouter();
  const thisCategory = categories.contents.find(
    (s) => s.id === router.query.id
  );
  return (
    <div className="container grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-y-10 px-2 md:px-4 mx-auto max-w-screen-lg">
      <h2 className="text-3xl font-bold">{`${thisCategory?.name} の記事一覧`}</h2>
      {articles.contents.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
    </div>
  );
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

Home.getLayout = function getPageLayout(page: React.ReactElement) {
  return <NormalLayout alwaysShowBottomNav>{page}</NormalLayout>;
};
