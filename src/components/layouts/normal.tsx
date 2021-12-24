import { useSwipeable } from 'react-swipeable';
import { BottomNav } from '../bottomNav';
import { Header } from '../header';

type Props = { children: React.ReactNode };

let cb: (direction: string) => void;
const onHandle = (callback: (direction: string) => void) => {
  cb = callback;
};
export const NormalLayout: React.FC<Props> = ({ children }) => {
  const handler = useSwipeable({
    onSwiped: (eventData) => {
      cb(eventData.dir);
    },
  });
  return (
    <>
      <Header />
      <main className="relative flex-grow mt-16" {...handler}>
        {children}
      </main>
      <BottomNav onHandleRoot={onHandle} />
    </>
  );
};
