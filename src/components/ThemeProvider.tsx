import React, { createContext, useState, useEffect } from 'react';
import { ThemeValue, SetTheme } from '../types/theme';

export const themeValueContext = createContext<ThemeValue>({ mode: 'light' });
export const setThemeContext = createContext<SetTheme>(() => undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeValue>({ mode: 'light' });
  useEffect(() => {
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  return (
    <themeValueContext.Provider value={theme}>
      <setThemeContext.Provider value={setTheme}>
        {children}
      </setThemeContext.Provider>
    </themeValueContext.Provider>
  );
};
