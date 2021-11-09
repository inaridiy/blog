import { remark } from 'remark';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import slug from 'remark-slug';
const rehypePrism = require('@mapbox/rehype-prism');

export const mdToHast = async (markdown: string) =>
  remark()
    .use(remarkUnwrapImages)
    .use(slug)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .processSync(markdown);
