import { Heading, Stack } from '@chakra-ui/layout';

const NaviCSS = {};

export const ArticleSideContnt: React.FC = ({}) => {
  return (
    <Stack
      w="30%"
      display={{ base: 'none', md: 'flex' }}
      pos="sticky"
      top="16"
      overflowY="scroll"
      className="SideNav"
    >
      <Heading as="h2">目次</Heading>
      <nav className="toc" />
    </Stack>
  );
};
