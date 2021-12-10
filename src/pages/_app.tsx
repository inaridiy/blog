import { useEffect } from 'react';
import { AppProps } from 'next/app';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';
import 'tailwindcss/tailwind.css';
import '../assets/toc.css';
import '../assets/Article.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => import('zenn-embed-elements') as any, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
