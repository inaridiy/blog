import Link from 'next/link';

export const HeaderTitle: React.FC = ({}) => {
  return (
    <Link href="/" passHref>
      <a>
        <h1 className="text-4xl font-bold">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </h1>
      </a>
    </Link>
  );
};
