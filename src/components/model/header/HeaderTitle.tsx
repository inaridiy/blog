import { useColorModeValue } from '@chakra-ui/color-mode';
import { Heading, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';

export const HeaderTitle: React.FC = ({}) => {
  return (
    <NextLink href="/" passHref>
      <a>
        <Heading as="h1" color={useColorModeValue('gray.800', 'gray.50')}>
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </Heading>
      </a>
    </NextLink>
  );
};
