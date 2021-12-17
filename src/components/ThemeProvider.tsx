import React, { createContext, useState, useEffect } from 'react';
import { ThemeValue, SetTheme } from '../types/theme';
import { useLocalStorage } from 'react-use';

export const themeValueContext = createContext<ThemeValue>({ mode: 'light' });
export const setThemeContext = createContext<SetTheme>(() => undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeValue>({ mode: 'light' });
  const [storageValue, setStorage] = useLocalStorage<'dark' | 'light'>('theme');

  useEffect(() => {
    storageValue ||
      setStorage(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    setTheme({
      ...theme,
      mode: storageValue ?? 'light',
    });
  }, []);

  useEffect(() => {
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setStorage(theme.mode);
    console.log(storageValue);
  }, [theme]);
  return (
    <themeValueContext.Provider value={theme}>
      <setThemeContext.Provider value={setTheme}>
        {children}
      </setThemeContext.Provider>
    </themeValueContext.Provider>
  );
};
