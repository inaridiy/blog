import { createElement } from 'react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import { ArticleLink } from './ArticleLink';
import { ArticleImage } from './ArticleImage';

type Props = { html: string };
const HtmlToReact = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, {
    createElement,
    components: {
      a: ArticleLink as any,
      img: ArticleImage,
    },
  });

export const ArticleRender: React.FC<Props> = ({ html }) => {
  return <>{HtmlToReact.processSync(html).result}</>;
};
