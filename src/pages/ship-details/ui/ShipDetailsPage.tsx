import { Box } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import i18n from '../../../shared/lib/i18n';
import { useGetMediaPathQuery, useGetVehiclesQuery } from '../../../shared/api/services';

export const ShipDetailsPage = () => {
  const { techName } = useParams();
  const lang = i18n.language || 'ru';
  const { data: mp } = useGetMediaPathQuery({ lang });
  const { data: vehicles } = useGetVehiclesQuery({ lang });

  const media = mp?.data ?? '';
  const ship = vehicles?.data ? Object.values(vehicles.data).find(v => v.name === techName) : undefined;

  if (!ship) return <Box sx={{ p:3 }}>Загрузка…</Box>;

  const title = ship.localization?.mark?.[lang] || ship.localization?.mark?.en || ship.name;
  const img = ship.icons.large || ship.icons.medium || ship.icons.default;

  return (
    <Box sx={{ p: 3, display: 'grid', gap: 2 }}>
      <Link to="/">← Назад</Link>
      <h1 style={{ margin: 0 }}>{title}</h1>
      <img src={`${media}${img}`} alt={title} loading="lazy" decoding="async" style={{ maxWidth: '100%', height: 'auto' }} />
      <p style={{ opacity: .8 }}>{ship.localization?.description?.[lang] || ship.localization?.description?.en || ''}</p>
    </Box>
  );
};
