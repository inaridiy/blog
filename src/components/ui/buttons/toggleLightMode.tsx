import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ToggleColorBtn: React.FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle light/dark mode"
      bg="transparent"
      size="lg"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
    />
  );
};
