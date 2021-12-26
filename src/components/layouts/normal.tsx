import { useState } from 'react';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import { BottomNav } from '../bottomNav';
import { Header } from '../header';

type Props = { children: React.ReactNode; alwaysShowBottomNav?: boolean };

export const NormalLayout: React.FC<Props> = ({
  children,
  alwaysShowBottomNav = false,
}) => {
  const [dir, setDir] = useState<SwipeEventData['dir']>('Down');
  const [isOpen, setOpen] = useState(false);
  const handler = useSwipeable({
    onSwiped: (eventData) => {
      eventData.dir === 'Down' && setOpen(false);
      setDir(eventData.dir);
    },
  });

  return (
    <>
      <Header />
      <main
        className="relative flex-grow mt-16"
        {...handler}
        onClick={() => {
          setOpen(false);
        }}
      >
        {children}
      </main>
      <BottomNav
        className={`duration-300 ${
          dir === 'Up' && !isOpen && !alwaysShowBottomNav
            ? 'translate-y-16'
            : ''
        }`}
        {...{ isOpen, setOpen }}
      />
    </>
  );
};
