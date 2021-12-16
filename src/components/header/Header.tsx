import { HeaderTitle } from '.';
import { Spacer } from '../ui';
import { ToggleLightMode } from '../ui';

export const Header: React.FC = ({}) => {
  return (
    <header className="fixed z-10 mx-auto w-full h-16">
      <div className="container flex items-center px-2 sm:px-4 h-full">
        <HeaderTitle />
        <Spacer />
        <ToggleLightMode />
      </div>
    </header>
  );
};
