import { HeaderTitle } from '.';
import { Spacer } from '../ui';

export const Header: React.FC = ({}) => {
  return (
    <header className="fixed z-10 mx-auto w-full h-16 backdrop-blur-md">
      <div className="container flex items-center px-4">
        <HeaderTitle />
        <Spacer />
      </div>
    </header>
  );
};
