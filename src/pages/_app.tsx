import { useEffect } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';
import { Header } from '../components/header';
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
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <div className="flex overflow-hidden relative flex-col min-w-full min-h-screen text-gray-900 dark:text-white bg-trueGray-100 dark:bg-trueGray-800 duration-150">
        {getLayout(<Component {...pageProps} />)}
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
