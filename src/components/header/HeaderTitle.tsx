import Link from 'next/link';

export const HeaderTitle: React.FC = ({}) => {
  return (
    <Link href="/" passHref>
      <a>
        <h1 className="text-4xl font-bold dark:text-gray-100">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </h1>
      </a>
    </Link>
  );
};
