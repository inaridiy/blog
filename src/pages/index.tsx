import { NormalLayout } from '../components/layouts/normal';
import { About } from '../components/about';

export default function Home(): React.ReactElement {
  return <div className="container px-2 md:px-4 mx-auto"></div>;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <NormalLayout>{page}</NormalLayout>;
};
