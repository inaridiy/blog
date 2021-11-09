import { HStack, Spacer, Container, Text } from '@chakra-ui/react';
import { ToggleColorBtn } from '../../ui/buttons/toggleLightMode';

import { HeaderTitle } from './HeaderTitle';

type Props = {};

export const Header: React.FC<Props> = ({}) => {
  return (
    <Container maxW={'container.xl'} pos="fixed" zIndex={5}>
      <HStack bg="transparent" h="24">
        <HeaderTitle />
        <Spacer />
        <ToggleColorBtn />
      </HStack>
    </Container>
  );
};
