import { BottomButton } from '.';

type Props = {};

export const BottomNav: React.FC<Props> = ({}) => {
  return (
    <nav
      className="sm:hidden fixed bottom-0 z-10 w-screen h-16 bg-trueGray-100 
    dark:bg-trueGray-900 rounded-t-xl drop-shadow-t-xl"
    >
      <div className="absolute w-full">
        <div className="mx-auto mt-1.5 w-1/4 h-1.5 bg-gray-600 dark:bg-gray-200 rounded-full drop-shadow-xl"></div>
      </div>
      <div className="flex h-full">
        <BottomButton href="/" text="Home" />
        <BottomButton href="/" text="Blog" />
        <BottomButton href="/" text="Homw" />
        <BottomButton href="/" text="Home" />
      </div>
    </nav>
  );
};
