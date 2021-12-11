import { Article } from '../../../types/article';
import { useOgImage } from '../../../hooks/useOgImage';
import Image from 'next/image';

type Props = { article: Article };

export const ArticleThumbnail: React.FC<Props> = ({ article }) => {
  const ogImage = useOgImage(article);
  return (
    <div className="overflow-hidden rounded-lg drop-shadow-lg">
      <Image
        src={ogImage}
        alt={article.title}
        layout="responsive"
        width="1024"
        height="585"
        objectFit="cover"
      />
    </div>
  );
};
