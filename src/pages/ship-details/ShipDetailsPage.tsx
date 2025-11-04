// src/pages/ship-details/ui/ShipDetailsPage.tsx
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';
import { Header } from '../../widgets/header/Header';
import { SkeletonBox } from '../../shared/ui/Skeletons';
import i18n from '../../shared/lib/i18n';
import { useGetMediaPathQuery, useGetVehiclesQuery } from '../../shared/api/services';
import s from './ShipDetailsPage.module.scss';

// --------- Types ----------
type LangCode =
  | 'ru' | 'en' | 'de' | 'fr' | 'es' | 'pl' | 'ja' | 'zh_cn' | 'zh_tw'
  | 'ko' | 'tr' | 'uk' | 'cs' | 'nl' | 'it' | 'pt_br' | 'es_mx' | 'th' | 'zh_sg'
  | string; // оставляем расширяемым

type LocalizedDict = Record<string, string>;

interface Vehicle {
  name: string;
  localization?: {
    mark?: LocalizedDict;
    description?: LocalizedDict;
  };
  icons?: Partial<Record<'large' | 'medium' | 'default', string>>;
  images?: Partial<Record<'large' | 'medium' | 'default', string>>;
}

interface VehiclesResponse {
  data: Record<string, Vehicle>;
}

interface MediaPathResponse {
  data: string; // базовый URL для медиа
}

// --------- Utils ----------
const BACK_LABELS: Record<string, string> = {
  ru: 'Назад',
  en: 'Back',
  de: 'Zurück',
  fr: 'Retour',
  es: 'Atrás',
  pl: 'Wstecz',
  ja: '戻る',
};

const getLang = (): LangCode =>
  (typeof window !== 'undefined'
    ? localStorage.getItem('lang')
    : null) || i18n.language || 'ru';

const pickLocalized = (dict: LocalizedDict | undefined, lang: LangCode): string | undefined =>
  dict?.[lang] ?? dict?.['en'];

const pickImagePath = (v: Vehicle): string | undefined =>
  v.icons?.large ??
  v.icons?.medium ??
  v.icons?.default ??
  v.images?.large ??
  v.images?.medium ??
  v.images?.default;


// --------- Component ----------
export const ShipDetailsPage = () => {
  const { techName } = useParams<{ techName: string }>();
  const lang = getLang();
  useTheme(); 

  const { data: mp, isLoading: isMpLoading } = useGetMediaPathQuery({ lang });
  const { data: vehicles, isLoading: isListLoading } = useGetVehiclesQuery({ lang });

  const loading = isMpLoading || isListLoading;

  if (loading) {
    return (
      <>
        <Header />
        <Box className={s.pageContent}>
          <SkeletonBox h={24} w="100%" />
          <SkeletonBox h={28} w={110} br={8} />
          <SkeletonBox h="64vh" br={16} />

          <Box className={s.textSk}>
            <SkeletonBox h={12} w="60%" />
            <SkeletonBox h={12} w="90%" />
            <SkeletonBox h={12} w="85%" />
            <SkeletonBox h={12} w="80%" />
            <SkeletonBox h={12} w="60%" />
          </Box>
        </Box>
      </>
    );
  }

  const media = (mp as MediaPathResponse | undefined)?.data ?? '';
  const decoded = decodeURIComponent(techName ?? '');
  const list = (vehicles as VehiclesResponse | undefined)?.data ?? {};
  const ship: Vehicle | undefined = Object.values(list).find((v) => v?.name === decoded);

  if (!ship) {
    return (
      <>
        <Header />
        <Box className={s.page}>
          <SkeletonBox h="70vh" br={16} />
        </Box>
      </>
    );
  }

  const title = pickLocalized(ship.localization?.mark, lang) ?? ship.name;
  const imgPath = pickImagePath(ship);

  return (
    <>
      <Header />
      <Box className={s.pageContent}>
        <Button component={RouterLink} to="/" className={s.backBtn}
          startIcon={<span style={{ fontSize: 18, lineHeight: 1 }} className={s.backArrow}>←</span>}>
          {BACK_LABELS[lang] ?? BACK_LABELS.en}
        </Button>

        <h1 className={s.title}>{title}</h1>

        {imgPath ? (
          <img src={`${media}${imgPath}`} alt={title} loading="lazy" decoding="async" className={s.shipImg} />
        ) : (
          <SkeletonBox h="70vh" br={16} />
        )}

        <p className={s.desc}>{pickLocalized(ship.localization?.description, lang) ?? ''}</p>
      </Box>
    </>
  );
};
