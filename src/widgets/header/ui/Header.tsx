import { AppBar, Box, IconButton, Toolbar, Typography, Drawer, Divider } from '@mui/material';
import AnchorIcon from '@mui/icons-material/Anchor';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { LanguageSwitcher } from '../../../features/language-switcher/ui/LanguageSwitcher';
import { emit, on } from '../../../shared/lib/bus';
import { useEffect, useState, type ReactNode } from 'react';

type HeaderProps = { mobileContent?: ReactNode };

const ThemeToggle = () => {
  const [mode, setMode] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    const off = on('theme:changed', (e) => {
      const next = (e.detail as 'dark' | 'light') || 'dark';
      setMode(next);
    });
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setMode(e.newValue as 'dark' | 'light');
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
    emit('theme:changed', next);
    setMode(next);
  };

  return (
    <IconButton aria-label="toggle-theme" onClick={toggle} title={mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'} sx={{ color: 'var(--text)' }}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export const Header = ({ mobileContent }: HeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(0,0,0,.18) 0%, rgba(0,0,0,.08) 100%)',
        color: 'var(--text)',
        '& .MuiSvgIcon-root': { color: 'var(--text)' },
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: 64 }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: 'flex', gap: 1, alignItems: 'center', textDecoration: 'none', color: 'var(--text)' }}
        >
          <AnchorIcon sx={{ opacity: 0.9 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text)' }}>
            WoW Ships
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* desktop controls */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1.5, alignItems: 'center' }}>
          <LanguageSwitcher />
          <ThemeToggle />
        </Box>

        {/* mobile burger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton aria-label="menu" onClick={() => setOpen(true)} sx={{ color: 'var(--text)' }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 310,
            backgroundColor: 'var(--panel)',
            color: 'var(--text)',
            borderLeft: '1px solid var(--border)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, minHeight: '100%' }} role="presentation">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AnchorIcon sx={{ opacity: 0.9 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text)' }}>
                WoW Ships
              </Typography>
            </Box>
            <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ color: 'var(--text)' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: 'var(--border)' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="caption" sx={{ opacity: .75, color: 'var(--text)' }}>Язык</Typography>
            <LanguageSwitcher />
          </Box>

          <Divider sx={{ my: 1.5, borderColor: 'var(--border)' }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="caption" sx={{ opacity: .75, color: 'var(--text)' }}>Тема</Typography>
            <ThemeToggle />
          </Box>

          {mobileContent && (
            <>
              <Divider sx={{ my: 1.5, borderColor: 'var(--border)' }} />
              <Typography variant="caption" sx={{ opacity: .75, color: 'var(--text)' }}>Фильтры</Typography>
              <Box sx={{ pb: 1 }}>{mobileContent}</Box>
            </>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};
