import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

export type ThemeId = 'a' | 'b';

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'ainexus-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();
  const paramTheme = params.get('theme');
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (paramTheme === 'a' || paramTheme === 'b') return paramTheme;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'a' || stored === 'b') return stored;
    return 'a';
  });

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
    const next = new URLSearchParams(params);
    next.set('theme', t);
    setParams(next, { replace: true });
  };

  useEffect(() => {
    if (paramTheme === 'a' || paramTheme === 'b') {
      setThemeState(paramTheme);
      localStorage.setItem(STORAGE_KEY, paramTheme);
    }
  }, [paramTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === 'a' ? 'b' : 'a'),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
