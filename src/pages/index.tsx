import type { ReactElement } from 'react';
import { Heading } from '@chakra-ui/react';
import { DefaultLayout } from '../components/layouts/DefaultLayout';

export default function Home() {
  return <Heading>Test</Heading>;
}

Home.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
