import { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { BottomButtons } from '.';

type Props = {};

export const BottomNav: React.FC<Props> = ({}) => {
  const [isOpen, setOpen] = useState(false);
  const [drawerX, setDrawerX] = useState(0);
  const [isSwiping, setSwiping] = useState(false);
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      setSwiping(false);
      setDrawerX(0);
      eventData.dir === 'Up' ? setOpen(true) : 'Down' ? setOpen(false) : '';
    },
    onSwiping: (eventData) => {
      setSwiping(true);
      setDrawerX(-eventData.deltaY);
      console.log(eventData.deltaY);
    },
  });

  return (
    <nav
      className="flex sm:hidden fixed bottom-0 z-10 flex-col w-screen bg-trueGray-100 dark:bg-trueGray-900 rounded-t-xl drop-shadow-t-xl"
      {...handlers}
    >
      <div
        className="overflow-hidden relative flex-grow w-full"
        style={{
          transitionDuration: isSwiping ? undefined : '300ms',
          height: isOpen
            ? `max(20px,calc(80vh - ${-drawerX}px))`
            : `max(20px,${drawerX + 20}px)`,
        }}
      >
        <div className="my-2 mx-auto w-1/4 h-1.5 bg-gray-600 dark:bg-gray-200 rounded-full"></div>
        <div className="absolute">
          <h1 className="text-4xl">Teststsetstst</h1>
        </div>
      </div>
      <BottomButtons />
    </nav>
  );
};
