import { useEffect } from 'react';
import tocbot from 'tocbot';

type Props = {};

export const ArticleToc: React.FC<Props> = ({}) => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.znc',
      headingSelector: 'h1, h2, h3, h4, h5',
    });
  }, []);
  return <div className="toc"></div>;
};
