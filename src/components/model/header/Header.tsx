import {
  HStack,
  Spacer,
  Container,
  Text,
  IconButton,
  Link,
  Box,
} from '@chakra-ui/react';
import { BsTwitter } from 'react-icons/bs';
import { ToggleColorBtn } from '../../ui/buttons/toggleLightMode';

import { HeaderTitle } from './HeaderTitle';

type Props = {};

export const Header: React.FC<Props> = ({}) => {
  const twitter = process.env.NEXT_PUBLIC_TWITTER;
  return (
    <Box pos="fixed" w="full">
      <Container maxW={'container.xl'} zIndex={5}>
        <HStack bg="transparent" h="24">
          <HeaderTitle />
          <Spacer />
          <Link href={twitter} isExternal>
            <IconButton
              icon={<BsTwitter />}
              aria-label="Toggle menu"
              variant="ghost"
              size="lg"
              to={twitter}
            />
          </Link>
          <ToggleColorBtn />
        </HStack>
      </Container>
    </Box>
  );
};
