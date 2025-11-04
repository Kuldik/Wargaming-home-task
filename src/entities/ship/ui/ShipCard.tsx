import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Vehicle } from '../model/types';
import { toRoman } from '../../../shared/lib/roman';
import s from './ShipCard.module.scss';

type Props = { ship: Vehicle; media: string };

export const ShipCard: React.FC<Props> = ({ ship, media }) => {
  const { t, i18n } = useTranslation(['ui', 'nations_short']);

  const lang = (localStorage.getItem('lang') || i18n.language || 'ru') as string;
  const title =
    ship.localization?.mark?.[lang] ||
    ship.localization?.mark?.en ||
    ship.name;

  const img = ship.icons?.large || ship.icons?.medium || ship.icons?.default;

  const nationKey = String(ship.nation || '').toLowerCase();
  const nationLabel =
    t(`nations_short:${nationKey}`, { defaultValue: nationKey }) || nationKey;

  return (
    <Link to={`/ship/${encodeURIComponent(ship.name)}`} className={s.cardLink}>
      <Box className={`card-like ${s.card}`}>
        <img src={`${media}${img}`} alt="" loading="lazy" decoding="async" className={s.cardImg} />

        <div className={s.cardTitle}>{title}</div>

        <div className={s.cardMeta}>
          <span>{nationLabel}</span>
          <span>lvl {toRoman(ship.level)}</span>
        </div>

        <button className={`b b-orange b-focus ${s.cardBtn}`}>{t('ui:more')}</button>
      </Box>
    </Link>
  );
};
