import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import i18n from '../../shared/lib/i18n';
import s from '../../shared/styles/common/CommonUI.module.scss';

type LangOpt = { code: string; label: string };

const OPTIONS: LangOpt[] = [
  { code: 'ru', label: 'ru' }, { code: 'en', label: 'en' }, { code: 'de', label: 'de' },
  { code: 'fr', label: 'fr' }, { code: 'pl', label: 'pl' }, { code: 'ja', label: 'ja' },
  { code: 'es', label: 'es' }, { code: 'zh_cn', label: 'zh_cn' }, { code: 'zh_tw', label: 'zh_tw' },
  { code: 'ko', label: 'ko' }, { code: 'tr', label: 'tr' }, { code: 'uk', label: 'uk' },
  { code: 'cs', label: 'cs' }, { code: 'nl', label: 'nl' }, { code: 'it', label: 'it' },
  { code: 'pt_br', label: 'pt_br' }, { code: 'es_mx', label: 'es_mx' }, { code: 'th', label: 'th' },
  { code: 'zh_sg', label: 'zh_sg' },
];

export const LanguageSwitcher = () => {
  const [value, setValue] = useState<string>(localStorage.getItem('lang') || i18n.language || 'ru');

  useEffect(() => {
    i18n.changeLanguage(value);
    document.documentElement.lang = value;
    localStorage.setItem('lang', value);
  }, [value]);

  const handleChange = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    document.documentElement.lang = lng;
    location.reload();
  };

  return (
    <Select
      size="small"
      value={value}
      onChange={(e) => handleChange(String(e.target.value))}
      className={s.langSelectRoot}
      MenuProps={{
        PaperProps: { className: s.langMenuPaper },
      }}
    >
      {OPTIONS.map((o) => (
        <MenuItem key={o.code} value={o.code}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
};
