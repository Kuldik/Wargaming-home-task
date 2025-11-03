import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    ui: {
      search: 'Искать корабль',
      filters: 'Фильтры',
      reset: 'Сбросить фильтры',
      nothing: 'По вашему запросу ничего не найдено',
      loading: 'Загрузка…',
      back: 'Назад',
      levels: 'Уровень',
      nations: 'Нации',
      types: 'Типы',
    },
  },
  en: {
    ui: {
      search: 'Search for ship',
      filters: 'Filters',
      reset: 'Reset filters',
      nothing: 'Nothing found for your query',
      loading: 'Loading…',
      back: 'Back',
      levels: 'Levels',
      nations: 'Nations',
      types: 'Types',
    },
  },
  de: {
    ui: {
      search: 'Schiff suchen',
      filters: 'Filter',
      reset: 'Filter zurücksetzen',
      nothing: 'Keine Ergebnisse gefunden',
      loading: 'Wird geladen…',
      back: 'Zurück',
      levels: 'Stufen',
      nations: 'Nationen',
      types: 'Typen',
    },
  },
  fr: {
    ui: {
      search: 'Rechercher un navire',
      filters: 'Filtres',
      reset: 'Réinitialiser les filtres',
      nothing: 'Aucun résultat',
      loading: 'Chargement…',
      back: 'Retour',
      levels: 'Niveaux',
      nations: 'Nations',
      types: 'Types',
    },
  },
  es: {
    ui: {
      search: 'Buscar barco',
      filters: 'Filtros',
      reset: 'Restablecer filtros',
      nothing: 'No hay resultados',
      loading: 'Cargando…',
      back: 'Atrás',
      levels: 'Niveles',
      nations: 'Naciones',
      types: 'Tipos',
    },
  },
  pl: {
    ui: {
      search: 'Szukaj okrętu',
      filters: 'Filtry',
      reset: 'Resetuj filtry',
      nothing: 'Brak wyników',
      loading: 'Ładowanie…',
      back: 'Wstecz',
      levels: 'Poziomy',
      nations: 'Narody',
      types: 'Typy',
    },
  },
  ja: {
    ui: {
      search: '艦を検索',
      filters: 'フィルター',
      reset: 'フィルターをリセット',
      nothing: '見つかりませんでした',
      loading: '読み込み中…',
      back: '戻る',
      levels: 'レベル',
      nations: '国家',
      types: 'タイプ',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  ns: ['ui'],
  defaultNS: 'ui',
  interpolation: { escapeValue: false },
});

export default i18n;
