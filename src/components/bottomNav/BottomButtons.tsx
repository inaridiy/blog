import Link from 'next/link';
import { memo } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineArticle } from 'react-icons/md';

type Props = {
  href: string;
  text: string;
  icon: React.ReactNode;
  className?: string;
};

export const BottomButtons: React.FC = memo(function BottomButtons() {
  const { pathname } = useRouter();
  const basePath = pathname.split('/')[1];
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
        href="/"
        text="Homw"
        className="hover:text-emerald-500"
        icon={<AiOutlineHome size="1.5rem" />}
      />
      <IconButton
        href="/"
        text="Home"
        className="hover:text-purple-500"
        icon={<AiOutlineHome size="1.5rem" />}
      />
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
