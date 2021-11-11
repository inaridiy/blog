import { remark } from 'remark';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import slug from 'remark-slug';
const rehypePrism = require('@mapbox/rehype-prism');
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';

export const mdToHast = async (markdown: string) =>
  await remark()
    .use(remarkEmbedder as any, {
      transformers: [oembedTransformer],
    })
    .use(remarkUnwrapImages)
    .use(slug)
    .use(remarkRehype)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown);
