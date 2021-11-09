import { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Heading, Stack, IconButton, HStack, Spacer } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const ArticleSideContnt: React.FC = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Stack
        w={{ base: '100%', md: '30%' }}
        h={{ base: '100vh', md: 'full' }}
        pos={{ base: 'fixed', md: 'sticky' }}
        padding={{ base: '5', md: '0' }}
        bg={{
          base: useColorModeValue('gray.100', 'gray.800'),
          md: 'transparent',
        }}
        zIndex={10}
        display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
        top={{ base: '-2', md: '16' }}
        right="0"
      >
        <HStack>
          <Heading as="h2">目次</Heading>
          <Spacer />
          <IconButton
            icon={<CloseIcon />}
            size="lg"
            aria-label="Toggle sidebar"
            display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
            onClick={() => setIsOpen(!isOpen)}
          ></IconButton>
        </HStack>
        <nav className="toc" />
      </Stack>
      <IconButton
        icon={<HamburgerIcon />}
        bg={{
          base: useColorModeValue('gray.100', 'gray.800'),
          md: 'transparent',
        }}
        aria-label="Toggle sidebar"
        display={{ base: !isOpen ? 'block' : 'none', md: 'none' }}
        pos="fixed"
        size="lg"
        rounded="full"
        shadow="md"
        bottom="5"
        right="5"
        onClick={() => setIsOpen(!isOpen)}
      ></IconButton>
    </>
  );
};
