import { useEffect } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';
import Head from 'next/head';
import { ThemeProvider } from '../components/ThemeProvider';

import 'tailwindcss/tailwind.css';
import '../assets/toc.css';
import '../assets/Article.scss';
import '../assets/global.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => import('zenn-embed-elements') as any, []);

  return (
    <ThemeProvider>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content="無名な学生のしがないブログ" />
        <meta name="keywords" content="無名,学生,ブログ" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <script
        defer
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />

      <div className="flex relative flex-col min-w-full min-h-screen text-gray-900 dark:text-white bg-trueGray-100 dark:bg-trueGray-800 duration-150">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
