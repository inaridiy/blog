import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Stack, Box, Heading, HStack, Spacer, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { client } from '../../lib/client';
import { Article, ArticleList } from '../../types/article';
import { DefaultLayout } from '../../components/layouts/DefaultLayout';
import { ArticleRender } from '../../components/model/article/ArticleRender';
import { TwContainer } from '../../components/ui/TwContainer';
import { useOgImage } from '../../hooks/useOgImage';
import { mdToHast } from '../../lib/transpiler';
import Image from 'next/image';
import { ArticleTag } from '../../components/model/article/ArticleTag';
import { useDate } from '../../hooks/useDate';

export default function ArticlePage({
  article,
  html,
}: {
  article: Article;
  html: string;
}) {
  const ogImage = useOgImage(article);
  const updatedDay = useDate(article.updatedAt);
  console.log(updatedDay);
  return (
    <TwContainer>
      <Stack mx={{ base: '2', md: '10' }}>
        <Heading as="h1" size="xl" py="12">
          {article.title}
        </Heading>
        <HStack py="4">
          {article.category.map((category) => (
            <ArticleTag key={category.name} category={category} />
          ))}
          <Spacer />
          <Text fontSize="sm">更新日: {updatedDay}</Text>
        </HStack>
        <Box pos="relative" w="full" rounded="xl" overflow="hidden">
          <Image
            src={ogImage}
            alt={article.title}
            layout="responsive"
            width="1024"
            height="585"
            objectFit="cover"
          />
        </Box>
        <Box
          as="article"
          className={`prose prose-sm prose-red lg:prose-lg ${useColorModeValue(
            '',
            'prose-dark'
          )}`}
        >
          <ArticleRender html={html} />
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
    queries: {
      depth: 3,
    },
  });
  const VFile = await mdToHast(article.body);

  return {
    props: { article, html: VFile.value }, // ページコンポーネントにpropsとして渡されます。
  };
};

ArticlePage.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);
