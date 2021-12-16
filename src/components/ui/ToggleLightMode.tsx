import { BsSun, BsMoonFill } from 'react-icons/bs';
import { IconButton } from '.';
import { useTheme } from '../../hooks/useTheme';

export const ToggleLightMode: React.FC = ({}) => {
  const { theme, toggleMode } = useTheme();
  return (
    <IconButton>
      {theme.mode === 'light' ? (
        <BsSun size="1.5rem" onClick={toggleMode} />
      ) : (
        <BsMoonFill size="1.5rem" onClick={toggleMode} />
      )}
    </IconButton>
  );
};
