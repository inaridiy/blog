import { BottomNav } from '../bottomNav';
import { Header } from '../header';

type Props = { children: React.ReactNode };

export const NormalLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="relative flex-grow mt-16">{children}</main>
      <BottomNav />
    </>
  );
};
