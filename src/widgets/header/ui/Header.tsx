import { AppBar, Box, Toolbar } from '@mui/material';
import { ThemeSwitcher } from '../../../features/theme-switcher/ui/ThemeSwitcher';
import { LanguageSwitcher } from '../../../features/language-switcher/ui/LanguageSwitcher';

export const Header = () => (
  <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(6px)', borderBottom: '1px solid var(--border)' }}>
    <Toolbar sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
      <Box>⚓ WoWS Ships</Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </Box>
    </Toolbar>
  </AppBar>
);
