import ReactMarkdown from 'react-markdown';

import dynamic from 'next/dynamic';

type Props = { markdown: string };

export const ArticleRender: React.FC<Props> = ({ markdown }) => {
  const components = {
    code: dynamic(() => import('./ArticleCodeBlock')),
  };

  return <ReactMarkdown components={components}>{markdown}</ReactMarkdown>;
};
