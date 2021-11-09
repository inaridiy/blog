import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import tocbot from 'tocbot';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { TwContainer } from '../../components/ui/TwContainer';
import { mdToHast } from '../../lib/transpiler';
import { ArticleView } from '../../components/model/article/ArticleView';
import { ArticleSideContnt } from '../../components/model/article/ArticleSideContnt';

export default function ArticlePage({
  article,
  html,
}: {
  article: Article;
  html: string;
}) {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h1, h2, h3',
    });
  }, []);
  return (
    <TwContainer>
      <ArticleView html={html} article={article} side={<ArticleSideContnt />} />
    </TwContainer>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
  });
  //console.log(data);
  const paths: string[] = data.contents.map(
    (article) => `/article/${article.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ article: Article }> = async (
  context
) => {
  const contentId = context.params?.id as string;
  const article = await client.get<Article>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    contentId,
    queries: {
      depth: 3,
    },
  });
  const VFile = await mdToHast(article.body);

  return {
    props: { article, html: VFile.value }, // ページコンポーネントにpropsとして渡されます。
  };
};

ArticlePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
