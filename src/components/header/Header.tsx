import { HeaderTitle } from '.';
import { Spacer } from '../ui';
import { ToggleLightMode } from '../ui';

export const Header: React.FC = ({}) => {
  return (
    <header className="flex fixed z-10 justify-center w-full drop-shadow-lg">
      <div className="container flex items-center pr-4 mx-0 sm:mx-4 h-16">
        <HeaderTitle />
        <Spacer />
        <ToggleLightMode />
      </div>
    </header>
  );
};
