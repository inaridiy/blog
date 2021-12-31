import { useEffect } from 'react';
import { useRouter } from 'next/router';
import tocbot from 'tocbot';

type Props = {};

export const BottomToc: React.FC<Props> = ({}) => {
  const { pathname } = useRouter();
  useEffect(() => {
    pathname.split('/')[1] === 'article' &&
      tocbot.init({
        tocSelector: '.toc2',
        contentSelector: '.znc',
        headingSelector: 'h1, h2, h3, h4, h5',
      });
  }, []);
  return (
    <div className="mx-6">
      <h2 className="mb-4 text-4xl font-bold">目次</h2>
      <div className="relative toc2"></div>
    </div>
  );
};
