import { GetServerSideProps } from 'next';
import { client } from '../../lib/client';
import { Article } from '../../types/article';
import { mdToHTML } from '../../lib/transpiler';
import {
  ArticleView,
  ArticleTitle,
  ArticleThumbnail,
  ArticleToc,
  ArticleInfo,
  ArticleMeta,
} from '../../components/article';
import { Progress } from '../../components/ui/Progress';

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
    const titleHtml = mdToHTML(article.title);

    return {
      props: { article, html, titleHtml }, // ページコンポーネントにpropsとして渡されます。
    };
  };
