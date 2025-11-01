import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

const buildTheme = (mode: 'dark' | 'light') => createTheme({
  palette: { mode, background: { default: 'var(--bg)' }, text: { primary: 'var(--text)' } },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif' }
});

export const ThemeProviderApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'dark' | 'light'>(() => (localStorage.getItem('theme') as any) || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
