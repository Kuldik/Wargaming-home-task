# WoW Ships

**Живое приложение → [wargaming-home-task-tau.vercel.app](https://wargaming-home-task-tau.vercel.app/)**

Одностраничное приложение для просмотра кораблей World of Warships: фильтры, карточки, детальная страница, локализация и тёмная тема.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel)](https://wargaming-home-task-tau.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=fff)](https://vitejs.dev/)

## Возможности

- список кораблей с карточками и переходом в детали;
- фильтры: **уровень**, **нация**, **тип**, **поиск**;
- **i18next** — интерфейс на множестве языков;
- **светлая / тёмная тема** с сохранением в `localStorage`;
- адаптивная вёрстка и выезжающая панель фильтров на мобильных;
- **RTK Query** для данных API (нации, типы, корабли, медиа);
- splash-экран при первом заходе в сессию.

## Стек

| Категория        | Технологии                                      |
| ---------------- | ----------------------------------------------- |
| UI               | React 19, TypeScript, MUI, Emotion, SCSS        |
| Состояние и API  | Redux Toolkit, RTK Query                        |
| Сборка           | Vite 6                                          |
| Тесты            | Vitest, React Testing Library, MSW              |
| Маршрутизация    | React Router (HashRouter)                       |

## Структура проекта

```
public/
├── fonts/Roboto/…
├── images/          # логотипы, фавикон
└── video/           # фон splash

src/
├── app/             # провайдеры, splash, вход
├── entities/        # ship, nation, vtype
├── features/        # избранное, язык, тема
├── pages/           # список кораблей, детали
├── shared/          # api, lib, стили, общие UI
└── widgets/         # шапка, панель фильтров
```

## Локализация

Тексты интерфейса задаются в `shared/lib/i18n.ts` (объект `resources`).  
Короткие подписи наций — в словаре `nations_short` для карточек.

## Темы

Тема хранится в `localStorage` (`theme`: `light` | `dark`). На `<html>` вешается `data-theme` для CSS-переменных (`--panel`, `--text`, `--border` и др.).

## Скрипты

| Команда                 | Назначение              |
| ----------------------- | ----------------------- |
| `npm run dev`           | dev-сервер (Vite)       |
| `npm run build`         | production-сборка       |
| `npm run preview`       | предпросмотр `dist`     |
| `npm run test`          | тесты (Vitest)          |
| `npm run test:ui`       | Vitest UI               |
| `npm run test:coverage` | покрытие                |

После `npm run dev` приложение: **http://localhost:5173**

## Деплой (Vercel)

Сборка для продакшена: `npm run build` (`vite build --mode vercel`, см. `.env.vercel`).  
Настройки проекта: [`vercel.json`](./vercel.json) (команда сборки, каталог `dist`, `npm ci`).  
Запросы к игровому API идут через same-origin прокси **`/api`** (Edge Function в `api/`), чтобы обойти CORS в браузере.

## Тесты (что покрыто)

- `toRoman()` — уровни кораблей;
- `useDebouncedValue()`;
- шина событий `bus`;
- `FiltersPanel` — ключевые контролы;
- `Splash` — показ и скрытие.

## Установка

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
```
