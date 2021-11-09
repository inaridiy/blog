import { Box, Link } from '@chakra-ui/react';
import toMaterialStyle from 'material-color-hash';
import NextLink from 'next/link';
import { Category } from '../../../types/article';

type Props = { category: Category };

export const ArticleTag: React.FC<Props> = ({ category }) => {
  const color = toMaterialStyle(String(category.name), 900);

  return (
    <NextLink href={`/category/${category.id}`}>
      <Link
        color="white"
        px="4"
        py="0.5"
        rounded="full"
        bg={color.backgroundColor}
      >
        {category.name}
      </Link>
    </NextLink>
  );
};
