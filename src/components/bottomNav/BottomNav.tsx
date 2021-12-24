import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { BottomButtons } from '.';

type Props = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  className?: string;
};

export const BottomNav: React.FC<Props> = ({ className, isOpen, setOpen }) => {
  const [drawerX, setDrawerX] = useState(0);
  const [isSwiping, setSwiping] = useState(false);
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      setSwiping(false);
      setDrawerX(0);
      eventData.dir === 'Up' ? setOpen(true) : 'Down' ? setOpen(false) : '';
    },
    onSwiping: (eventData) => {
      if (eventData.dir === 'Up' || eventData.dir === 'Down') {
        setSwiping(true);
        setDrawerX(-eventData.deltaY);
      }
    },
    trackMouse: true,
  });

  return (
    <nav
      style={{ touchAction: 'none' }}
      className={
        'flex sm:hidden overflow-auto fixed bottom-0 z-10 flex-col w-screen bg-trueGray-100 dark:bg-trueGray-900 rounded-t-xl drop-shadow-t-xl ' +
        className
      }
      {...handlers}
    >
      <div className="relative flex-grow w-full">
        <div className="my-2 mx-auto w-1/4 h-1.5 bg-gray-600 dark:bg-gray-200 rounded-full"></div>
        <div
          style={{
            transitionDuration: isSwiping ? undefined : '300ms',
            height: isOpen
              ? `max(0px,calc(60vh - ${-drawerX}px))`
              : `max(0px,${drawerX}px)`,
          }}
          className="overflow-hidden"
        >
          <h1 className="text-4xl">Teststsetstst</h1>
        </div>
      </div>
      <BottomButtons />
    </nav>
  );
};
