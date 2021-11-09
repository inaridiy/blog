import { Flex, Box, VStack, Text, Link } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Header } from '../model/header/Header';

type Props = { children: React.ReactNode };

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Box flex={1} mt="20">
        {children}
      </Box>
      <Box as="footer" w="full">
        <VStack pt="2" bg="gray.800" color="white">
          <Text>
            made by
            <Link href="https://twitter.com/unknown_gakusei" px="1">
              @unknown_gakusei
            </Link>
          </Text>
        </VStack>
      </Box>
      <Box
        h="100vh"
        w="full"
        zIndex={-1}
        pos="fixed"
        bgGradient={useColorModeValue(
          'linear(to-br, cyan.300, pink.500)',
          'linear(to-b, gray.900, gray.800, pink.900)'
        )}
      ></Box>
    </Flex>
  );
};
