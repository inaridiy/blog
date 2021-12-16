import { useContext } from 'react';
import {
  setThemeContext,
  themeValueContext,
} from '../components/ThemeProvider';

export const useTheme = () => {
  const themeValue = useContext(themeValueContext);
  const setTheme = useContext(setThemeContext);
  const toggleMode = () =>
    setTheme({
      ...themeValue,
      mode: themeValue.mode === 'light' ? 'dark' : 'light',
    });
  return { theme: themeValue, setTheme, toggleMode };
};
