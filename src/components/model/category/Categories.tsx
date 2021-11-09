import { useColorModeValue } from '@chakra-ui/color-mode';
import { Heading, Flex, Text, Box } from '@chakra-ui/layout';
import { CategoryList } from '../../../types/article';
import Link from 'next/link';

type Props = { categories: CategoryList };

export const Categories: React.FC<Props> = ({
  categories: { contents: categories },
}) => {
  return (
    <Flex alignItems="flex-start" direction="column" px="4" w="full" minW="56">
      <Heading as="h2" size="lg" py="3">
        Categories
      </Heading>
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`} passHref>
          <Box
            as="a"
            borderTop="2px"
            w="full"
            p="2"
            transition="all 0.2s"
            _hover={{ bg: 'whiteAlpha.400' }}
          >
            <Text fontSize="lg">{category.name}</Text>
          </Box>
        </Link>
      ))}
    </Flex>
  );
};
