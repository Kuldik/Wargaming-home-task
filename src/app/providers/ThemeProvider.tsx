import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';

const THEME_KEY = 'theme';

function readInitialMode(): 'light' | 'dark' {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved as 'light' | 'dark';
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export const ThemeProviderApp = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => readInitialMode());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent).detail;
      if (next === 'light' || next === 'dark') setMode(next);
    };
    window.addEventListener('theme:set', handler as EventListener);
    return () => window.removeEventListener('theme:set', handler as EventListener);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
