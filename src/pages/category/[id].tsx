import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Box, Stack, Spacer, VStack, Heading } from '@chakra-ui/react';
import { client } from '../../lib/client';
import { ArticleList, CategoryList } from '../../types/article';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { TwContainer } from '../../components/ui/TwContainer';
import { ArticleCard } from '../../components/model/article/ArticleCard';
import { Categories } from '../../components/model/category/Categories';
import { useRouter } from 'next/dist/client/router';

export default function Home({
  articles,
  categories,
}: {
  articles: ArticleList;
  categories: CategoryList;
}): ReactElement {
  const router = useRouter();
  const thisCategory = categories.contents.find(
    (s) => s.id === router.query.id
  );
  return (
    <Box p="2" pt="5">
      <TwContainer h="80" rounded="lg">
        <Heading as="h1" size="xl" py="4">
          Category: {thisCategory?.name}
        </Heading>
        <Stack
          alignItems="flex-start"
          direction={{ base: 'column', md: 'row' }}
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
    </Box>
  );
}

export const getStaticPaths = async () => {
  const data = await client.get<CategoryList>({
    endpoint: process.env.CATEGORY_END_POINT || '',
  });
  //console.log(data);
  const paths: string[] = data.contents.map(
    (category) => `/category/${category.id}`
  );
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  articles: ArticleList;
  categories: CategoryList;
}> = async (context) => {
  const contentId = context.params?.id as string;
  const articles = await client.get<ArticleList>({
    endpoint: process.env.ARTICLE_END_POINT || '',
    queries: {
      depth: 3,
      filters: `category[contains]${contentId}`,
    },
  });

  const categories = await client.get<CategoryList>({
    endpoint: process.env.CATEGORY_END_POINT || '',
    queries: {
      depth: 3,
    },
  });

  return {
    props: { articles, categories }, // ページコンポーネントにpropsとして渡されます。
  };
};

Home.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
