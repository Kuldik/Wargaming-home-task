import { Box, Button, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import { useParams, Link as RouterLink } from 'react-router-dom';
import i18n from '../../../shared/lib/i18n';
import { useGetMediaPathQuery, useGetVehiclesQuery } from '../../../shared/api/services';
import { Header } from '../../../widgets/header/ui/Header';

const shimmer = keyframes`
  0%   { background-position: -250% 0; }
  50%  { background-position:   0% 0; }
  100% { background-position: 250% 0; }
`;

const SkeletonBox = ({
  h, w = '100%', br = 12,
}: { h: number | string; w?: number | string; br?: number | string }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const a = dark ? '#1b2029' : '#e6ebf3';
  const b = dark ? '#2a3342' : '#f7f9ff';
  const c = dark ? '#1b2029' : '#e6ebf3';
  return (
    <Box
      sx={{
        width: w, height: h, borderRadius: br,
        background: `linear-gradient(90deg, ${a} 0%, ${b} 50%, ${c} 100%)`,
        backgroundSize: '300% 100%',
        animation: `${shimmer} 1.05s ease-in-out infinite`,
      }}
    />
  );
};

const backButtonSx = (mode: 'light' | 'dark') => ({
  px: 2, py: 0.75, borderRadius: '8px', textTransform: 'none' as const, fontWeight: 600,
  minHeight: 28, lineHeight: 1.1, width: 110,
  backgroundImage:
    mode === 'dark'
      ? 'radial-gradient(85.3% 129.17% at 50% 95.83%, rgba(245,201,116,.35) 0%, rgba(245,201,116,0) 53.65%), linear-gradient(180deg, #F2B751 0%, #E7A43E 100%)'
      : 'radial-gradient(85.3% 129.17% at 50% 95.83%, rgba(255,165,0,.25) 0%, rgba(255,165,0,0) 53.65%), linear-gradient(180deg, #FFD08A 0%, #FFC158 100%)',
  color: '#1b1003', boxShadow: 'none', '&:hover': { filter: 'brightness(0.96)' },
});

export const ShipDetailsPage = () => {
  const { techName } = useParams();
  const lang = (localStorage.getItem('lang') || i18n.language || 'ru') as string;
  const theme = useTheme();

  const { data: mp, isLoading: isMpLoading } = useGetMediaPathQuery({ lang });
  const { data: vehicles, isLoading: isListLoading } = useGetVehiclesQuery({ lang });

  const loading = isMpLoading || isListLoading;
  if (loading) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3, display: 'grid', gap: 2 }}>
          <SkeletonBox h={28} w={110} br={8} />
          <SkeletonBox h={'70vh'} br={16} />
        </Box>
      </>
    );
  }

  const media = mp?.data ?? '';
  const decoded = decodeURIComponent(techName || '');
  const ship = vehicles?.data ? Object.values(vehicles.data).find((v: any) => v?.name === decoded) : undefined;
  if (!ship) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3 }}><SkeletonBox h={'70vh'} br={16} /></Box>
      </>
    );
  }

  const anyShip: any = ship;
  const title =
    anyShip.localization?.mark?.[lang] ||
    anyShip.localization?.mark?.['en'] ||
    anyShip.name;

  const imgPath =
    anyShip?.icons?.large ||
    anyShip?.icons?.medium ||
    anyShip?.icons?.default ||
    anyShip?.images?.large ||
    anyShip?.images?.medium ||
    anyShip?.images?.default ||
    '';

  return (
    <>
      <Header />
      <Box sx={{ p: 3, display: 'grid', gap: 2, color: 'var(--text)' }}>
        <Button
          component={RouterLink}
          to="/"
          sx={backButtonSx(theme.palette.mode)}
          startIcon={<span style={{ fontSize: 18, lineHeight: 1 }}>←</span>}
        >
          {({
            ru: 'Назад', en: 'Back', de: 'Zurück', fr: 'Retour', es: 'Atrás', pl: 'Wstecz', ja: '戻る',
          } as Record<string, string>)[lang] || 'Back'}
        </Button>

        <h1 style={{ margin: 0, color: 'var(--text)' }}>{title}</h1>

        {imgPath ? (
          <img
            src={`${media}${imgPath}`}
            alt={title}
            loading="lazy"
            decoding="async"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 12 }}
          />
        ) : (
          <SkeletonBox h={'70vh'} br={16} />
        )}

        <p style={{ opacity: 0.85, color: 'var(--text)' }}>
          {anyShip.localization?.description?.[lang] ||
            anyShip.localization?.description?.['en'] ||
            ''}
        </p>
      </Box>
    </>
  );
};
