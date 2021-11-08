import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Stack, Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { ArticleRender } from '../../components/model/article/ArticleRender';
import { TwContainer } from '../../components/ui/TwContainer';

export default function ArticlePage({ article }: { article: Article }) {
  return (
    <TwContainer>
      <Stack mx={{ base: '2', md: '10' }}>
        <Box
          as="article"
          className={`prose prose-sm prose-red lg:prose-lg ${useColorModeValue(
            '',
            'prose-dark'
          )}`}
        >
          <ArticleRender markdown={article.body} />
        </Box>
      </Stack>
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
  });

  return {
    props: { article }, // ページコンポーネントにpropsとして渡されます。
  };
};

ArticlePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
