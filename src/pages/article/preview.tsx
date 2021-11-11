import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import tocbot from 'tocbot';
import Head from 'next/head';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { TwContainer } from '../../components/ui/TwContainer';
import { mdToHast } from '../../lib/transpiler';
import { ArticleView } from '../../components/model/article/ArticleView';
import { ArticleSideContnt } from '../../components/model/article/ArticleSideContnt';
import { useOgImage } from '../../hooks/useOgImage';

export default function ArticlePage({
  article,
  html,
}: {
  article: Article;
  html: string;
}) {
  const ogImage = useOgImage(article);
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h1, h2, h3',
    });
  }, []);
  return (
    <>
      <TwContainer>
        <ArticleView
          html={html}
          article={article}
          side={<ArticleSideContnt />}
        />
      </TwContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ article: Article }> =
  async (context) => {
    console.log(context.query);
    const contentId = context.query.id as string;
    const draftKey = context.query.draftKey as string;

    const article = await client.get<Article>({
      endpoint: process.env.ARTICLE_END_POINT || '',
      contentId,
      queries: {
        depth: 3,
        draftKey,
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
