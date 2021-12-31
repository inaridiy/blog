import { HeaderTitle } from '.';
import { Spacer } from '../ui';
import { HeaderButtons } from './HeaderButtons';

export const Header: React.FC = ({}) => {
  return (
    <header className="flex fixed z-10 justify-center w-full ">
      <div className="container flex items-center pr-4 mx-0 sm:mx-4 h-16 drop-shadow-lg">
        <HeaderTitle />
        <Spacer />
        <HeaderButtons />
      </div>
    </header>
  );
};
