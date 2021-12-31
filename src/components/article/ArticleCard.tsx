import { Article } from '../../types/article';
import Link from 'next/link';
import Image from 'next/image';
import { useOgImage } from '../../hooks/useOgImage';
import { useDate } from '../../hooks/useDate';
import { CategoryChips } from '../category/CategoryChips';
import { Spacer } from '../ui';

type Props = { article: Article };

export const ArticleCard: React.FC<Props> = ({ article }) => {
  const ogImage = useOgImage(article);
  const date = useDate(article.publishedAt);
  return (
    <Link href={`/article/${article.id}`}>
      <div className="flex overflow-hidden relative sm:flex-col-reverse h-full bg-trueGray-100 dark:bg-trueGray-900 rounded-lg drop-shadow article-card">
        <div className="flex flex-col flex-grow min-w-0">
          <h2
            className="px-2 text-lg sm:text-2xl font-bold"
            dangerouslySetInnerHTML={{ __html: article.title }}
          />
          <Spacer />
          <div className="flex overflow-auto p-1 w-full text-sm sm:text-base">
            <p>{date}</p>
            <Spacer />
            <CategoryChips categories={article.category} />
          </div>
        </div>
        <div className="overflow-hidden flex-shrink-0 w-40 sm:w-full">
          <div className="px-1 pt-1 text-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg drop-shadow">
            <Image
              className="rounded-lg"
              src={ogImage}
              alt={article.title}
              width="512"
              height="292"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
