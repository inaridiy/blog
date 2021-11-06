import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Box } from '@chakra-ui/layout';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap"
            rel="stylesheet"
          />
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
