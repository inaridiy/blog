import { Article } from '../../types/article';
import Link from 'next/link';
import Image from 'next/image';
import { useOgImage } from '../../hooks/useOgImage';
import { useDate } from '../../hooks/useDate';

type Props = { article: Article };

export const ArticleCardTop: React.FC<Props> = ({ article }) => {
  const ogImage = useOgImage(article);
  const date = useDate(article.publishedAt);
  return (
    <Link href={`/article/${article.id}`}>
      <a className="flex overflow-hidden relative flex-col bg-trueGray-100 dark:bg-trueGray-900 rounded-lg drop-shadow-lg">
        <div className="px-1 text-sm sm:text-base text-white bg-gray-800 rounded-t">
          {date}
        </div>
        <div className="flex sm:flex-col-reverse">
          <div className="flex-grow">
            <h2 className="px-2 text-lg sm:text-xl font-bold">
              {article.title}
            </h2>
          </div>
          <div className="overflow-hidden flex-shrink-0 p-1 w-40 sm:w-full drop-shadow">
            <Image
              className="rounded-lg"
              src={ogImage}
              alt={article.title}
              width="512"
              height="292"
            />
          </div>
        </div>
      </a>
    </Link>
  );
};
