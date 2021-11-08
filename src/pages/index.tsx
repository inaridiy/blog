import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Box, VStack } from '@chakra-ui/react';
import { client } from '../lib/client';
import { Article, ArticleList } from '../types/article';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { TwContainer } from '../components/ui/TwContainer';
import { ArticleCard } from '../components/model/article/ArticleCard';

export default function Home({
  articles,
}: {
  articles: ArticleList;
}): ReactElement {
  return (
    <Box p="2" pt="5">
      <TwContainer h="80" rounded="lg">
        <VStack spacing="5">
          {articles.contents.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </VStack>
      </TwContainer>
    </Box>
  );
}
export const getStaticProps: GetStaticProps<{ articles: ArticleList }> = async (
  context
) => {
  const articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
    },
  });

  return {
    props: { articles }, // ページコンポーネントにpropsとして渡されます。
  };
};

Home.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
