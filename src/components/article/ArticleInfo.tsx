import { Article } from '../../types/article';
import { useDate } from '../../hooks/useDate';
import { Spacer } from '../ui';
import { CategoryChips } from '../category/CategoryChips';

type Props = { article: Article };

export const ArticleInfo: React.FC<Props> = ({ article }) => {
  const date = useDate(article.publishedAt);
  return (
    <div className="flex overflow-hidden">
      <p>{date}</p>
      <Spacer />
      <CategoryChips categories={article.category} />
    </div>
  );
};
