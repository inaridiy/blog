import Head from 'next/head';
import { useOgImage } from '../../hooks/useOgImage';
import { Article } from '../../types/article';

type Props = { article: Article };

export const ArticleMeta: React.FC<Props> = ({ article }) => {
  const ogImage = useOgImage(article);
  return (
    <Head>
      <title>{article.title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={article.body.slice(0, 120)} />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_ORIGIN}/article/${article.id}`}
      />
      <meta property="og:title" content={article.title} />
      <meta
        property="og:site_name"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta property="og:description" content={article.body.slice(0, 120)} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  );
};
