import { MenuItem, Select } from '@mui/material';
import i18n from '../../../shared/lib/i18n';

const langs = ['ru','en','de','fr','pl','ja','es','zh_cn','zh_tw','ko','tr','uk','cs','nl','it','pt_br','es_mx','th','zh_sg'];

export const LanguageSwitcher = () => {
  const value = i18n.language;
  return (
    <Select size="small" value={value} onChange={(e) => {
      const lang = e.target.value;
      localStorage.setItem('lang', String(lang));
      i18n.changeLanguage(String(lang));
      document.documentElement.lang = String(lang);
      location.reload(); // перерисовать данные и кеши RTK по новой локали
    }}>
      {langs.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
    </Select>
  );
};
