import { HStack, Spacer, Text } from '@chakra-ui/react';
import { ToggleColorBtn } from '../../ui/buttons/toggleLightMode';
import { HeaderTitle } from './HeaderTitle';

type Props = {};

export const Header: React.FC<Props> = ({}) => {
  return (
    <HStack p="2" bg="transparent">
      <HeaderTitle />
      <Spacer />
      <ToggleColorBtn />
    </HStack>
  );
};
