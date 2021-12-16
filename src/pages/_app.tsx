import { useEffect } from 'react';
import { AppProps } from 'next/app';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';
import 'tailwindcss/tailwind.css';
import '../assets/toc.css';
import '../assets/Article.scss';
import { Header } from '../components/header';
import { ThemeProvider } from '../components/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => import('zenn-embed-elements') as any, []);

  return (
    <ThemeProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <div className="flex overflow-hidden relative flex-col min-w-full min-h-screen bg-trueGray-100 dark:bg-trueGray-800">
        <Header />
        <main className="relative flex-grow mt-16">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
