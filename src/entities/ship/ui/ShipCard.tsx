import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Vehicle } from '../model/types';
import { toRoman } from '../../../shared/lib/roman';

type Props = { ship: Vehicle; media: string };

export const ShipCard: React.FC<Props> = ({ ship, media }) => {
  const { t, i18n } = useTranslation(['ui', 'nations_short']);

  const lang = (localStorage.getItem('lang') || i18n.language || 'ru') as string;
  const title =
    ship.localization?.mark?.[lang] ||
    ship.localization?.mark?.en ||
    ship.name;

  const img = ship.icons?.large || ship.icons?.medium || ship.icons?.default;

  // ключ нации
  const nationKey = String(ship.nation || '').toLowerCase();

  // короткое имя нации (если ключа нет в словаре — покажем исходный код)
  const nationLabel =
    t(`nations_short:${nationKey}`, { defaultValue: nationKey }) || nationKey;

  return (
    <Link
      to={`/ship/${encodeURIComponent(ship.name)}`}
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <Box
        className="card-like"
        sx={{
          display: 'grid',
          gridTemplateRows: '160px auto auto',
          gap: 1.5,
          p: 2,
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

        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 18 }}>
          {title}
        </div>

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
          <span>{nationLabel}</span>
          <span>lvl {toRoman(ship.level)}</span>
        </div>

        <button className="b b-orange b-focus" style={{ justifySelf: 'center' }}>
          {t('ui:more')}
        </button>
      </Box>
    </Link>
  );
};
