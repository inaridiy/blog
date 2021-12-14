import markdownToHtml from "zenn-markdown-html";
import { loadDefaultJapaneseParser } from "budoux";
export const parser = loadDefaultJapaneseParser();

export const mdToHTML = (markdown: string) => {
  const html = (markdownToHtml as any).default(markdown);
  const result = html
    .replace(/<p>(.*?)<\/p>/gs, pReplacer)
    .replace(/<h(\d) (.*?)>(.*?)<\/h\d>/gs, heddingReplacer)
    .replace(/<img (.*?)src="(.*?)" (.*?)>/gs, imageReplacer);
  return result;
};
//
const pReplacer = (match: string, p1: string, p2: string) => {
  const result = `<p>${parser.translateHTMLString(p1)}</p>`;
  return result;
};

const heddingReplacer = (match: string, p1: string, p2: string, p3: string) => {
  const result = `<h${p1} ${p2}>${parser.translateHTMLString(p3)}</h${p1}>`;
  return result;
};

const imageReplacer = (match: string, p1: string, p2: string, p3: string) => {
  const result = `<img loading="lazy" ${p1} src="${p2}?h=480" ${p3} />`;
  return result;
};
