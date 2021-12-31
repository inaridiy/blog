import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../lib/client';
import { ArticleList } from '../../types/article';

export default async function searchApi(
  req: NextApiRequest,
  res: NextApiResponse<ArticleList | string>
) {
  const query = req.query.query as string;
  if (query === undefined) {
    res.status(400).send('query is required');
  } else {
    const response = await client.get<ArticleList>({
      endpoint: process.env.ARTICLE_END_POINT || '',
      queries: {
        depth: 3,
        q: query,
      },
    });

    res.status(200).json(response);
  }
}
