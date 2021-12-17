import type { ReactElement } from 'react';
import { About } from '../components/about';

export default function Home(): ReactElement {
  return (
    <div className="container px-2 md:px-4 mx-auto">
      <About />
    </div>
  );
}
