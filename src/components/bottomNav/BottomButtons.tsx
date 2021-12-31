import Link from 'next/link';
import { memo } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineHome } from 'react-icons/ai';
import { SiAboutdotme } from 'react-icons/si';
import { MdOutlineArticle, MdSearch, MdClose, MdToc } from 'react-icons/md';

type Props = {
  href: string;
  text: string;
  icon: React.ReactNode;
  className?: string;
};

export const BottomButtons: React.FC<{
  setOpen: (b: boolean) => void;
  isOpen: boolean;
}> = memo(function BottomButtons({ setOpen, isOpen }) {
  const { pathname } = useRouter();
  const basePath = pathname.split('/')[1];

  const isAritlcePage =
    pathname.split('/')[1] === 'article' && pathname.split('/')[2];
  return (
    <div className="flex h-16">
      <IconButton
        href="/"
        text="Home"
        className={`hover:text-sky-500 ${
          basePath === '' ? 'text-sky-500' : ''
        }`}
        icon={<AiOutlineHome size="1.5rem" />}
      />
      <IconButton
        href="/article"
        text="Blog"
        className={`hover:text-rose-500 ${
          basePath === 'article' ? 'text-rose-500' : ''
        }`}
        icon={<MdOutlineArticle size="1.5rem" />}
      />
      <IconButton
        href="/profile"
        text="About"
        className={`hover:text-green-500 ${
          basePath === 'profile' ? 'text-green-500' : ''
        }`}
        icon={<SiAboutdotme size="1.5rem" />}
      />
      <button
        className="flex flex-col flex-grow justify-center items-center h-full"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? (
          <MdClose size="1.5rem" />
        ) : isAritlcePage ? (
          <MdToc size="1.5rem" />
        ) : (
          <MdSearch size="1.5rem" />
        )}
        <p className="text-sm">{isAritlcePage ? 'Toc' : 'Search'}</p>
      </button>
    </div>
  );
});

export const IconButton: React.FC<Props> = ({
  href,
  text,
  icon,
  className,
}) => {
  return (
    <Link href={href}>
      <a
        className={`flex flex-col flex-grow justify-center items-center h-full ${className}`}
      >
        {icon}
        <p className="text-sm">{text}</p>
      </a>
    </Link>
  );
};
