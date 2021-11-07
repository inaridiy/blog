import { useColorModeValue } from '@chakra-ui/color-mode';
import { Heading } from '@chakra-ui/layout';

export const HeaderTitle: React.FC = ({}) => {
  return (
    <Heading as="h1" color={useColorModeValue('gray.800', 'gray.50')}>
      {process.env.NEXT_PUBLIC_SITE_NAME}
    </Heading>
  );
};
