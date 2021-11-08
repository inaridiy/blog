import Link from 'next/link';

export const ArticleLink: React.FC<{
  children: string;
  href: string;
}> = ({ children, href }) =>
  href.startsWith('/') || href === '' ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
