import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import 'tailwindcss/tailwind.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
  );
}

export default MyApp;
