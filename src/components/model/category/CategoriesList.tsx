import { HStack } from '@chakra-ui/layout';
import { Category } from '../../../types/article';
import { ArticleTag } from '../article/ArticleTag';

type Props = { categories: Category[] };

export const CategoriesList: React.FC<Props> = ({ categories }) => {
  return (
    <HStack overflow="auto" w="70%">
      {categories.map((category) => (
        <ArticleTag key={category.name} category={category} />
      ))}
    </HStack>
  );
};
