import type { ReactElement } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { TwContainer } from '../components/ui/TwContainer';
import { ArticleCard } from '../components/model/article/ArticleCard';

export default function Home() {
  return (
    <Box p="2" pt="5">
      <TwContainer h="80" rounded="lg">
        <VStack spacing="5">
          <ArticleCard title="TestTitle" />
          <ArticleCard title="TestTitle" />
          <ArticleCard title="TestTitle" />
          <ArticleCard title="TestTitle" />
        </VStack>
      </TwContainer>
    </Box>
  );
}

Home.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
