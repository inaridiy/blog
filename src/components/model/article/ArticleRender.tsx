import { createElement } from 'react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { ArticleLink } from './ArticleLink';
import { ReactElement } from 'rehype-react/lib';

type Props = { html: string };
const HtmlToReact = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    createElement,
    components: {
      a: ArticleLink as any,
    },
  });

export const ArticleRender: React.FC<Props> = ({ html }) => {
  return <>{HtmlToReact.processSync(html).result}</>;
};
