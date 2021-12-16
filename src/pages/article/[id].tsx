import { GetStaticProps } from 'next';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { mdToHTML, parser } from '../../lib/transpiler';
import {
  ArticleView,
  ArticleTitle,
  ArticleThumbnail,
  ArticleToc,
} from '../../components/article';

type staticProps = {
  article: Article;
  html: string;
  titleHtml: string;
};

export default function ArticlePage({ article, html, titleHtml }: staticProps) {
  return (
    <article className="container px-2 md:px-4 mx-auto ">
      <ArticleTitle titleHtml={titleHtml} />
      <ArticleThumbnail article={article} />
      <ArticleView html={html}></ArticleView>
    </article>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
  });
  const paths: string[] = data.contents.map(
    (article) => `/article/${article.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<staticProps> = async (context) => {
  const contentId = context.params?.id as string;
  const article = await client.get<Article>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    contentId,
    queries: {
      depth: 3,
    },
  });
  const titleHtml = parser.translateHTMLString(article.title);
  const html = mdToHTML(article.body);

  return {
    props: { article, html, titleHtml },
  };
};
