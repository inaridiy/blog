import { Stack, Box, Text, Heading, HStack, Spacer } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Image from 'next/image';
import NextLink from 'next/link';
import { Article } from '../../../types/article';
import { useOgImage } from '../../../hooks/useOgImage';
import { ArticleTag } from '../article/ArticleTag';
import { useDate } from '../../../hooks/useDate';
import { CategoriesList } from '../category/CategoriesList';

type Props = { article: Article };
export const ArticleCard: React.FC<Props> = ({ article }) => {
  const image = useOgImage(article);
  const date = useDate(article.updatedAt);
  return (
    <NextLink href={`/article/${article.id}`}>
      <Stack
        h={{ base: 'auto', sm: '40', md: '56' }}
        w="full"
        transition="all 0.2s"
        _hover={{
          transform: 'scale(1.02)',
        }}
        shadow="md"
        direction={{ base: 'column', sm: 'row' }}
        bg={useColorModeValue('gray.50', 'gray.700')}
        rounded="lg"
        overflow="hidden"
      >
        <Box
          w={{ base: '100%', sm: '40%', md: '50%' }}
          h={{ base: '40', sm: '100%' }}
          pos="relative"
          borderRight={{ base: '0', sm: '2px' }}
          borderBottom={{ base: '2px', sm: '0' }}
          borderColor={{
            base: useColorModeValue('gray.400', 'gray.700'),
            sm: useColorModeValue('gray.400', 'gray.700'),
          }}
        >
          <Image
            src={image}
            alt="Article"
            sizes="100%"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Stack
          w={{ base: '100%', sm: '60%' }}
          h={{ base: '40%', sm: '100%' }}
          p={{ base: '2', sm: '3' }}
          display="flex"
        >
          <Heading as="h3" size="md">
            {article.title}
          </Heading>
          <Text
            display={{ base: 'none', sm: 'block' }}
            fontWeight="normal"
            fontSize="xs"
            pl="2"
            color="gray.500"
            flexGrow={1}
            overflow="hidden"
          >
            {article.body.slice(0, 140)}
          </Text>
          <HStack>
            <CategoriesList categories={article.category} />
            <Spacer />
            <Text fontSize="xs">{date}</Text>
          </HStack>
        </Stack>
      </Stack>
    </NextLink>
  );
};
