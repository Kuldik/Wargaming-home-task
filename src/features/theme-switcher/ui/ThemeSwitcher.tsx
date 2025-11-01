import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export const ThemeSwitcher = () => {
  const current = (localStorage.getItem('theme') as 'dark'|'light') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  return (
    <IconButton
      aria-label="toggle-theme"
      onClick={() => { localStorage.setItem('theme', next); location.reload(); }}
    >
      {current === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};
