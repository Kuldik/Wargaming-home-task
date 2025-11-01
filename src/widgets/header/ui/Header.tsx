import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AnchorIcon from '@mui/icons-material/Anchor';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { LanguageSwitcher } from '../../../features/language-switcher/ui/LanguageSwitcher';
import { emit, on } from '../../../shared/lib/bus';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [mode, setMode] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    // подписка на внешние переключения (другие кнопки/вкладки)
    const off = on('theme:changed', (e) => {
      const next = (e.detail as 'dark' | 'light') || 'dark';
      setMode(next);
    });
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setMode(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      off();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const next = mode === 'dark' ? 'light' : 'dark';
  const toggle = () => {
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
    emit('theme:changed', next); // провайдер подхватит
    setMode(next); // мгновенно обновим иконку
  };

  return (
    <IconButton aria-label="toggle-theme" onClick={toggle} title={mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

const VideoToggle = () => {
  const [off, setOff] = useState(localStorage.getItem('video-bg') === 'off');

  useEffect(() => {
    // слушаем внешние переключения
    const unsub = on('video:changed', (e) => {
      const val = (e.detail as 'on' | 'off') ?? (localStorage.getItem('video-bg') === 'off' ? 'off' : 'on');
      setOff(val === 'off');
    });
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'video-bg') setOff(e.newValue === 'off');
    };
    window.addEventListener('storage', onStorage);
    return () => {
      unsub();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = () => {
    const next = off ? 'on' : 'off';
    localStorage.setItem('video-bg', next);
    emit('video:changed', next); // фон подхватит
    setOff(next === 'off');
  };

  return (
    <IconButton aria-label="toggle-video" onClick={toggle} title={off ? 'Включить видео-фон' : 'Выключить видео-фон'}>
      {off ? <VideocamOffIcon /> : <VideocamIcon />}
    </IconButton>
  );
};

export const Header = () => (
  <AppBar
    position="sticky"
    color="transparent"
    elevation={0}
    sx={{
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border)',
      background: 'linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 100%)'
    }}
  >
    <Toolbar sx={{ gap: 2, minHeight: 64 }}>
      <AnchorIcon sx={{ opacity: 0.9 }} />
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>WoWS Ships</Typography>
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <VideoToggle />
        <LanguageSwitcher />
        <ThemeToggle />
      </Box>
    </Toolbar>
  </AppBar>
);
