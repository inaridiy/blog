import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';
import 'prism-themes/themes/prism-material-oceanic.css';
import '../assets/toc.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content="無名な学生のしがないブログ" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_ORIGIN} />
        <meta property="og:title" content={process.env.NEXT_PUBLIC_SITE_NAME} />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_SITE_NAME}
        />
        <meta property="og:description" content="無名な学生のしがないブログ" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_ORIGIN}/logo.png`}
        />
      </Head>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </>
  );
}

export default MyApp;
