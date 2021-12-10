import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import tocbot from 'tocbot';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { mdToHTML } from '../../lib/transpiler';
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
  return <></>;
}

export const getServerSideProps: GetServerSideProps<{ article: Article }> =
  async (context) => {
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
    const html = mdToHTML(article.body);

    return {
      props: { article, html }, // ページコンポーネントにpropsとして渡されます。
    };
  };
