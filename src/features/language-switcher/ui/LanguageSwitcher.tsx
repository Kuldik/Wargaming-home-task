import { MenuItem, Select } from '@mui/material';
import i18n from '../../../shared/lib/i18n';
import { useEffect, useState } from 'react';

const langs = ['ru','en','de','fr','pl','ja','es','zh_cn','zh_tw','ko','tr','uk','cs','nl','it','pt_br','es_mx','th','zh_sg'];

export const LanguageSwitcher = () => {
  const [value, setValue] = useState<string>(localStorage.getItem('lang') || i18n.language || 'ru');

  useEffect(() => {
    i18n.changeLanguage(value);
    document.documentElement.lang = value;
    localStorage.setItem('lang', value);
  }, [value]);

  return (
    <Select size="small" value={value} onChange={(e) => setValue(String(e.target.value))}>
      {langs.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
    </Select>
  );
};
