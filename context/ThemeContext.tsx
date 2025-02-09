import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Theme } from '@/app/types';
import useStorage from '@/hooks/useStorage';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }) => {
  const { settings, updateSettings } = useStorage();
  const systemColorScheme = useColorScheme();

  const toggleTheme = async () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    await updateSettings({ theme: newTheme });
  };

  return (
    <ThemeContext.Provider value={{ theme: settings.theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);