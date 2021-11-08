import { Article } from '../types/article';

export const useOgImage = (article: Article) => {
  const { title, og_frame: frame } = article;
  const endPoint = process.env.NEXT_PUBLIC_OG_IMAGE_END_POINT;
  const theme = frame?.theme || 'light';
  const fontSize = '100px';
  const keyWord = frame?.keyWord;
  const images =
    frame?.images.map((imageData) => `images=${imageData.image.url}`) || [];

  const url = `${endPoint}/${title}.png?${
    keyWord ? 'keyWord=' + keyWord : ''
  }&theme=${theme}&md=1&fontSize=${fontSize}&${images.join('&')}`;

  return encodeURI(url);
};
