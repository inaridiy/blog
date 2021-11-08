import { createElement } from 'react';
import { unified } from 'unified';
import dynamic from 'next/dynamic';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';

type Props = { html: string };
const HtmlToReact = unified()
  .use(rehypeParse, { fragment: true }) // fragmentは必ずtrueにする
  .use(rehypeReact, {
    createElement: createElement,
  });

export const ArticleRender: React.FC<Props> = ({ html }) => {
  return <>{HtmlToReact.processSync(html).result}</>;
};
