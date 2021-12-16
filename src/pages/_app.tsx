import { useEffect } from 'react';
import { AppProps } from 'next/app';
import initTwitterScriptInner from 'zenn-embed-elements/lib/init-twitter-script-inner';
import 'tailwindcss/tailwind.css';
import '../assets/toc.css';
import '../assets/Article.scss';
import { Header } from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => import('zenn-embed-elements') as any, []);

  return (
    <div className="flex overflow-hidden relative flex-col min-w-full min-h-screen bg-trueGray-100">
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Header />
      <main className="relative flex-grow mt-16">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
