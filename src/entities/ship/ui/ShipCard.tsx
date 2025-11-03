import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Vehicle } from '../model/types';
import i18n from '../../../shared/lib/i18n';
import { toRoman } from '../../../shared/lib/roman';

export const ShipCard: React.FC<{ ship: Vehicle; media: string }> = ({ ship, media }) => {
  const lang = (localStorage.getItem('lang') || i18n.language || 'ru') as string;
  const title = ship.localization?.mark?.[lang] || ship.localization?.mark?.en || ship.name;
  const img = ship.icons?.large || ship.icons?.medium || ship.icons?.default;

  return (
    <Link to={`/ship/${encodeURIComponent(ship.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
      <Box
        className="card-like"
        sx={{
          display: 'grid',
          gridTemplateRows: '160px auto auto',
          gap: 1.5,
          padding: 2,
          background: 'var(--panel)',
          color: 'var(--text)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={`${media}${img}`}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: 160, objectFit: 'contain', pointerEvents: 'none' }}
        />

        {/* Имя по центру */}
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 18 }}>{title}</div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 14,
            opacity: 0.85,
          }}
        >
          <span>{ship.nation}</span>
          <span>lvl {toRoman(ship.level)}</span>
        </div>

        {/* Кнопка по центру */}
        <button className="b b-orange b-focus" style={{ justifySelf: 'center' }}>Подробнее</button>
      </Box>
    </Link>
  );
};
