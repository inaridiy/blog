import type { IncomingMessage, ServerResponse } from "http";
import { client } from "~~/src/lib/client";
import { mdToHTML, parser } from "~~/src/lib/transpiler";
import { ArticleRes, Article } from "~~/src/types/api";

export default async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<Article | void> => {
  const url = new URL(req.url!, `http://${req.headers.host}/api/article`);
  const obj: { [key: string]: string } = {};

  for (const [key, value] of url.searchParams) {
    obj[key] = value;
  }

  if (!Object.entries(obj).length) {
    res.statusCode = 404;
    return res.end("nothing found");
  }

  const { id } = obj;
  if (!id) {
    res.statusCode = 403;
    return res.end("need id");
  }

  try {
    const articleRes = await client.get<ArticleRes>({
      endpoint: "article",
      contentId: id,
      queries: {
        depth: 3,
      },
    });

    const [html, titleHtml] = [
      mdToHTML(articleRes.body),
      parser.translateHTMLString(articleRes.title),
    ];
    const article = { ...articleRes, html, titleHtml };

    return article as Article;
  } catch (e) {
    res.statusCode = 404;
    console.error(e);
    return res.end("nothing found");
  }
};
