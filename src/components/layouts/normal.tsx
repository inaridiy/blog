import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSwipeable, SwipeEventData } from 'react-swipeable';
import { useTheme } from '../../hooks/useTheme';
import { BottomNav } from '../bottomNav';
import { Header } from '../header';

type Props = { children: React.ReactNode; alwaysShowBottomNav?: boolean };

export const NormalLayout: React.FC<Props> = ({
  children,
  alwaysShowBottomNav = false,
}) => {
  const { theme } = useTheme();
  const { pathname } = useRouter();

  const [dir, setDir] = useState<SwipeEventData['dir']>('Down');
  const [isOpen, setOpen] = useState(true);
  const handler = useSwipeable({
    onSwiped: (eventData) => {
      //eventData.dir === 'Down' && setOpen(false);
      setDir(eventData.dir);
    },
  });

  return (
    <>
      <div
        className="absolute w-full h-48 sm:h-72 md:h-96"
        style={{
          backgroundColor:
            pathname.split('/')[1] === 'article' ? theme.color : undefined,
        }}
      ></div>
      <Header />
      <main className="relative flex-grow mt-16 mb-24" {...handler}>
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
