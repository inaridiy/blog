import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Box } from '@chakra-ui/layout';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';
GA_TRACKING_ID || console.warn('GA_TRACKING_ID is not defined');

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon-180x180-precomposed.png"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap"
            rel="stylesheet"
          />
          {GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                  `,
                }}
              />
            </>
          )}
          <meta name="theme-color" content="#fff" />
        </Head>

        <Box as="body" fontFamily="'Noto Sans JP', sans-serif">
          <Main />
          <NextScript />
        </Box>
      </Html>
    );
  }
}

export default MyDocument;
