import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import tocbot from 'tocbot';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { mdToHTML, parser } from '../../lib/transpiler';
import { useOgImage } from '../../hooks/useOgImage';
import {
  ArticleView,
  ArticleTitle,
  ArticleThumbnail,
} from '../../components/article';

export default function ArticlePage({
  article,
  html,
}: {
  article: Article;
  html: string;
}) {
  const ogImage = useOgImage(article);
  /* useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.content',
      headingSelector: 'h1, h2, h3, h4, h5',
    });
  }, []);*/
  return (
    <article className="container px-2 md:px-4 mx-auto ">
      <ArticleTitle titleHtml={article.title} />
      <ArticleThumbnail article={article} />
      <ArticleView html={html}></ArticleView>
    </article>
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
  article.title = parser.translateHTMLString(article.title);
  const html = mdToHTML(article.body);

  return {
    props: { article, html }, // ページコンポーネントにpropsとして渡されます。
  };
};
