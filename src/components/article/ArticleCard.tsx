import { Article } from '../../types/article';
import Link from 'next/link';
import Image from 'next/image';
import { useOgImage } from '../../hooks/useOgImage';

type Props = { article: Article };

export const ArticleCardTop: React.FC<Props> = ({ article }) => {
  const ogImage = useOgImage(article);
  return (
    <Link href={`/article/${article.id}`}>
      <a className="flex">
        <div className="overflow-hidden drop-shadow-lg w-32">
          <Image
            className="rounded-lg"
            src={ogImage}
            alt={article.title}
            width="512"
            height="292"
          />
        </div>
        <h2 className="text-xl font-bold px-2">{article.title}</h2>
      </a>
    </Link>
  );
};
