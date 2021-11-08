import { createElement } from 'react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { ArticleLink } from './ArticleLink';

type Props = { html: string };
const HtmlToReact = unified()
  .use(rehypeParse, { fragment: true }) // fragmentは必ずtrueにする
  .use(rehypeReact, {
    createElement: createElement,
    components: {
      a: ArticleLink,
    },
  });

export const ArticleRender: React.FC<Props> = ({ html }) => {
  return <>{HtmlToReact.processSync(html).result}</>;
};
