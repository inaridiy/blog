import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
const rehypePrism = require('@mapbox/rehype-prism');

export const mdToHast = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .processSync(markdown);
