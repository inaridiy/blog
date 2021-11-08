import { Stack, Box, HStack, Heading } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Image from 'next/image';
import NextLink from 'next/link';
import { Article } from '../../../types/article';
import { useOgImage } from '../../../hooks/useOgImage';

type Props = { article: Article };
export const ArticleCard: React.FC<Props> = ({ article }) => {
  const image = useOgImage(article);
  return (
    <NextLink href={`/article/${article.id}`}>
      <Stack
        h={{ base: '72', sm: '40', md: '48' }}
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
          h={{ base: '60%', sm: '100%' }}
          pos="relative"
          borderRight={{ base: '0', sm: '2px' }}
          borderColor={{
            base: '0',
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
          p={{ base: '2', sm: '5' }}
        >
          <Heading as="h3" size="md">
            {article.title}
          </Heading>
        </Stack>
      </Stack>
    </NextLink>
  );
};
