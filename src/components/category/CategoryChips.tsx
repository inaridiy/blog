import { Category } from '../../types/article';
import toMaterialStyle from 'material-color-hash';
import Link from 'next/link';

type Props = { categories: Category[]; className?: string };

export const CategoryChips: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={className}>
      {categories.map((category) => (
        <CategoryChip key={category.id} category={category} />
      ))}
    </div>
  );
};

export const CategoryChip: React.FC<{ category: Category }> = ({
  category,
}) => {
  const { backgroundColor } = toMaterialStyle(String(category.name), 900);
  return (
    <Link href={`/category/${category.id}`}>
      <a
        className="p-0.5 px-1.5 m-0.5 sm:m-1 text-white rounded-full"
        style={{ backgroundColor }}
      >
        {category.name}
      </a>
    </Link>
  );
};
