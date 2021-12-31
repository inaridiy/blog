import { useEffect } from 'react';
import { useRouter } from 'next/router';
import tocbot from 'tocbot';

type Props = {};

export const ArticleToc: React.FC<Props> = ({}) => {
  const { pathname } = useRouter();
  useEffect(() => {
    pathname.split('/')[1] === 'article' &&
      tocbot.init({
        tocSelector: '.toc',
        contentSelector: '.znc',
        headingSelector: 'h1, h2, h3, h4, h5',
      });
  }, []);
  return <div className="w-full h-full toc"></div>;
};
