import { useEffect } from 'react';
import '../../shared/lib/i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const fromStorage = localStorage.getItem('lang') || 'ru';
    i18n.changeLanguage(fromStorage);
    document.documentElement.lang = fromStorage;
  }, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
