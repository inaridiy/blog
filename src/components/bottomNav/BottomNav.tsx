import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { BottomButtons, BottomSearch } from '.';

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
      eventData.velocity > 1 &&
        (eventData.dir === 'Up' ? setOpen(true) : 'Down' ? setOpen(false) : '');
    },
    onSwiping: (eventData) => {
      if (
        eventData.dir === 'Up' ||
        (eventData.dir === 'Down' && eventData.velocity > 0.2)
      ) {
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
        'flex sm:hidden overflow-auto fixed bottom-0 z-10 flex-col w-full bg-trueGray-100 text-gray-800 rounded-t-xl drop-shadow-t-xl duration-150 ' +
        className
      }
      {...handlers}
    >
      <div className="relative flex-grow w-full">
        <div className="my-2 mx-auto w-1/4 h-1.5 bg-gray-600 rounded-full"></div>
        <div
          style={{
            transitionDuration: isSwiping ? undefined : '300ms',
            height: isOpen
              ? `max(0px,calc(60vh - ${-drawerX}px))`
              : `max(0px,${drawerX}px)`,
          }}
          className="overflow-hidden"
        >
          <BottomSearch />
        </div>
      </div>
      <BottomButtons />
    </nav>
  );
};
