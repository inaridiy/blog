import { HeaderTitle } from '.';
import { Spacer } from '../ui';
import { ToggleLightMode } from '../ui';

export const Header: React.FC = ({}) => {
  return (
    <header className="container flex fixed z-10 items-center px-2 sm:px-4 mx-auto w-full h-16">
      <HeaderTitle />
      <Spacer />
      <ToggleLightMode />
    </header>
  );
};
