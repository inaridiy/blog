import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Box, Stack, Spacer, VStack, Text } from '@chakra-ui/react';
import { client } from '../lib/client';
import { ArticleList, CategoryList } from '../types/article';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { TwContainer } from '../components/ui/TwContainer';
import { ArticleCard } from '../components/model/article/ArticleCard';
import { Categories } from '../components/model/category/Categories';

export default function Home({
  articles,
  categories,
}: {
  articles: ArticleList;
  categories: CategoryList;
}): ReactElement {
  return (
    <TwContainer rounded="lg">
      <Stack
        alignItems="flex-start"
        direction={{ base: 'column', md: 'row' }}
        mt={{ base: '10', md: '20' }}
      >
        <VStack spacing="5">
          {articles.contents.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </VStack>
        <VStack w={{ base: 'full', md: '72' }}>
          <Categories categories={categories} />
          <Spacer />
        </VStack>
      </Stack>
    </TwContainer>
  );
}
export const getStaticProps: GetStaticProps<{
  articles: ArticleList;
  categories: CategoryList;
}> = async (context) => {
  const articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
    },
  });

  const categories = await client.get<CategoryList>({
    endpoint: process.env.CATEGORY_END_POINT || '',
    queries: {
      depth: 3,
      limit: 100,
    },
  });
  return {
    props: { articles, categories }, // ページコンポーネントにpropsとして渡されます。
  };
};

Home.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
