import { remark } from 'remark';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
const rehypePrism = require('@mapbox/rehype-prism');

export const mdToHast = async (markdown: string) =>
  remark()
    .use(remarkUnwrapImages)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .processSync(markdown);
