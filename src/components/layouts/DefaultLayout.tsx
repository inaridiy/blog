import { Flex, Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Header } from '../model/header/Header';

type Props = { children: React.ReactNode };

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <Box flexGrow={1}>{children}</Box>
      <Box
        h="100vh"
        w="full"
        zIndex={-1}
        pos="absolute"
        bgGradient={useColorModeValue(
          'linear(to-br, cyan.300, pink.500)',
          'linear(to-bl, gray.800, gray.600)'
        )}
      ></Box>
    </Flex>
  );
};
