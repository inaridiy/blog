import NextImage from 'next/image';
import { Box, Image } from '@chakra-ui/react';

export const ArticleImage: any = ({ src, alt, ...props }: any) => {
  const isImageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(',').some(
    (domain) => src.includes(domain)
  );

  return (
    <Box
      w={['100%', '70%', '50%']}
      h="56"
      rounded="lg"
      overflow="hidden"
      pos="relative"
    >
      {isImageDomain ? (
        <NextImage
          {...props}
          src={src}
          alt={alt || src}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt || src}
          w="full"
          h="full"
          objectFit="cover"
          rounded="lg"
        />
      )}
    </Box>
  );
};
