import { GetStaticProps } from 'next';
import { client } from '../../lib/client';
import { NormalLayout } from '../../components/layouts/normal';
import { Article, ArticleList } from '../../types/article';
import { mdToHTML, parser } from '../../lib/transpiler';
import {
  ArticleView,
  ArticleTitle,
  ArticleThumbnail,
  ArticleToc,
} from '../../components/article';
import { Progress } from '../../components/ui/Progress';
import { ArticleInfo } from '../../components/article/ArticleInfo';
import { ArticleMeta } from '../../components/article/ArticleMeta';

type staticProps = {
  article: Article;
  html: string;
  titleHtml: string;
};

export default function ArticlePage({ article, html, titleHtml }: staticProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 px-2 md:px-4 pt-2 mx-auto max-w-screen-xl">
      <Progress />
      <ArticleMeta article={article} />
      <div className="col-span-1 sm:col-span-2">
        <ArticleThumbnail article={article} />
        <article className="px-2">
          <ArticleInfo article={article} />
          <ArticleTitle titleHtml={titleHtml} />
          <ArticleView html={html} />
        </article>
      </div>
      <div className="mx-2 ">
        <div className="sticky top-16 right-0">
          <h1 className="text-4xl font-bold">目次</h1>
          <ArticleToc />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      limit: 1000,
    },
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
