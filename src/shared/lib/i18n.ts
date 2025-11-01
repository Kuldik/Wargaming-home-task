import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: { search: 'Искать в новостях', filters: 'Фильтры', reset: 'Сбросить фильтры', nothing: 'По вашему запросу ничего не найдено' } },
    en: { translation: { search: 'Search in news', filters: 'Filters', reset: 'Reset filters', nothing: 'Nothing found for your query' } }
  },
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
