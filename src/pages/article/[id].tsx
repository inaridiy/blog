import { GetStaticProps } from 'next';
import { client } from '../../lib/client';
import { NormalLayout } from '../../components/layouts/normal';
import { Article, ArticleList } from '../../types/article';
import { mdToHTML, parser } from '../../lib/transpiler';
import {
  ArticleView,
  ArticleTitle,
  ArticleThumbnail,
} from '../../components/article';
import { Progress } from '../../components/ui/Progress';
import { ArticleInfo } from '../../components/article/ArticleInfo';

type staticProps = {
  article: Article;
  html: string;
  titleHtml: string;
};

export default function ArticlePage({ article, html, titleHtml }: staticProps) {
  return (
    <article className="container px-2 md:px-4 pt-2 mx-auto">
      <Progress />
      <ArticleThumbnail article={article} />
      <div className="px-2">
        <ArticleInfo article={article} />
        <ArticleTitle titleHtml={titleHtml} />
        <ArticleView html={html} />
      </div>
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

ArticlePage.getLayout = function getLayout(page: React.ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
