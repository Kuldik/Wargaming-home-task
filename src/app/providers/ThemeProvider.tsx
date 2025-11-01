import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { on } from '../../shared/lib/bus';

const mkTheme = (mode: 'dark' | 'light', videoOn: boolean) => createTheme({
  palette: {
    mode,
    background: {
      // если видео включено — фон темы прозрачный
      default: videoOn ? 'transparent' : (mode === 'dark' ? '#0d0f12' : '#f6f7f9')
    },
    text: {
      primary: mode === 'dark' ? '#e6e9ef' : '#0b0d11',
      secondary: mode === 'dark' ? '#a1a8b3' : '#4b5563'
    },
    divider: mode === 'dark' ? '#232731' : '#e5e7eb'
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'Roboto, system-ui, -apple-system, Segoe UI, Arial, sans-serif' }
});

export const ThemeProviderApp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );
  const [videoOn, setVideoOn] = useState(localStorage.getItem('video-bg') !== 'off');

  // синк темы
  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // слушаем смену темы
  useEffect(() => {
    const h = (e: Event) => {
      const next = (e as CustomEvent).detail as 'dark' | 'light' | undefined;
      if (next && next !== mode) setMode(next);
    };
    const storage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setMode(e.newValue);
      }
    };
    window.addEventListener('theme:changed', h as EventListener);
    window.addEventListener('storage', storage);
    return () => {
      window.removeEventListener('theme:changed', h as EventListener);
      window.removeEventListener('storage', storage);
    };
  }, [mode]);

  // слушаем видео-режим
  useEffect(() => {
    const hv = (e: Event) => {
      const val = (e as CustomEvent).detail as 'on' | 'off' | undefined;
      setVideoOn((val ?? (localStorage.getItem('video-bg') === 'off' ? 'off' : 'on')) !== 'off');
    };
    const storage = (e: StorageEvent) => {
      if (e.key === 'video-bg') setVideoOn(e.newValue !== 'off');
    };
    window.addEventListener('video:changed', hv as EventListener);
    window.addEventListener('storage', storage);
    return () => {
      window.removeEventListener('video:changed', hv as EventListener);
      window.removeEventListener('storage', storage);
    };
  }, []);

  const theme = useMemo(() => mkTheme(mode, videoOn), [mode, videoOn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
