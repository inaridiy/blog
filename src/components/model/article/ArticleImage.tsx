import Image from 'next/image';
import { Box } from '@chakra-ui/react';

export const ArticleImage: any = ({ src, alt, ...props }: any) => (
  <Box w="50%" h="64" rounded="lg" overflow="hidden" pos="relative">
    <Image
      {...props}
      src={src}
      alt={alt || src}
      layout="fill"
      objectFit="cover"
    />
  </Box>
);
