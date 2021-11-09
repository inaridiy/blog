import {
  HStack,
  Box,
  Heading,
  Stack,
  Spacer,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Image from 'next/image';
import { Article } from '../../../types/article';
import { ArticleTag } from './ArticleTag';
import { ArticleRender } from './ArticleRender';
import { useOgImage } from '../../../hooks/useOgImage';
import { useDate } from '../../../hooks/useDate';
import React from 'react';

type Props = {
  article: Article;
  html: string;
  side?: React.ReactNode;
};

export const ArticleView: React.FC<Props> = ({ article, html, side }) => {
  const createdDay = useDate(article.createdAt);
  const ogImage = useOgImage(article);

  return (
    <Stack>
      <Heading as="h1" size="xl" py="12">
        {article.title}
      </Heading>
      <HStack py="4" w="full">
        {article.category.map((category) => (
          <ArticleTag key={category.name} category={category} />
        ))}
        <Spacer />
        <Text fontSize="sm">公開日: {createdDay}</Text>
      </HStack>
      <Stack
        dalignItems="flex-start"
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
      >
        <Stack w={{ base: '100%', md: '70%' }}>
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
            id="article"
            className={`content prose prose-sm prose-red lg:prose-lg ${useColorModeValue(
              '',
              'prose-dark'
            )}`}
          >
            <ArticleRender html={html} />
          </Box>
        </Stack>
        {side}
      </Stack>
    </Stack>
  );
};
