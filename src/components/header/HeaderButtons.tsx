import { MdOutlineArticle } from 'react-icons/md';
import { ToggleLightMode } from '../ui';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {};

export const HeaderButtons: React.FC<Props> = ({}) => {
  const { pathname } = useRouter();
  const basePath = pathname.split('/')[1];
  return (
    <div className="flex gap-5 text-gray-800 dark:text-white">
      <Link href="/profile">
        <a
          className={`font-bold text-2xl hidden sm:block border-gray-700 ${
            basePath === 'profile' ? 'border-b-2' : ''
          }`}
        >
          About
        </a>
      </Link>
      <Link href="/article">
        <a
          className={`font-bold text-2xl hidden sm:block border-gray-700 ${
            basePath === 'article' ? 'border-b-2' : ''
          }`}
        >
          BLOG
        </a>
      </Link>
      <ToggleLightMode />
    </div>
  );
};
