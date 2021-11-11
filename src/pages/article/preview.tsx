import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
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
import { useRouter } from 'next/dist/client/router';

export default function ArticlePage() {
  // const ogImage = useOgImage(article);
  const [article, setArticle] = useState<Article>();
  const [html, setHtml] = useState<string>('');

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const article = await client.get<Article>({
        endpoint: process.env.ARTICLE_END_POINT || '',
        contentId: router.query.id as string,
        queries: {
          depth: 3,
          draftKey: router.query.draftKey as string,
        },
      });
      const VFile = await mdToHast(article.body);

      setArticle(article);
      setHtml(VFile.value as string);
    })();
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h1, h2, h3',
    });
  }, []);
  return (
    <>
      <TwContainer>
        {article && html && (
          <ArticleView
            html={html}
            article={article}
            side={<ArticleSideContnt />}
          />
        )}
      </TwContainer>
    </>
  );
}

ArticlePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
