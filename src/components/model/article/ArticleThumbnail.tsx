import { Article } from '../../../types/article';
import { useOgImage } from '../../../hooks/useOgImage';
import Image from 'next/image';

type Props = { article: Article };

export const ArticleThumbnail: React.FC<Props> = ({ article }) => {
  const ogImage = useOgImage(article);
  return (
    <div className="overflow-hidden drop-shadow-lg">
      <Image
        className="rounded-lg"
        src={ogImage}
        alt={article.title}
        width="1024"
        height="585"
      />
    </div>
  );
};
