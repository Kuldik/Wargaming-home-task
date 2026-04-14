import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const FALLBACK = 'https://wows-proxy.tim-klimenkoo.workers.dev/api';

export const API_BASE =
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_API_BASE) || FALLBACK;

export const apiBase = fetchBaseQuery({
  baseUrl: API_BASE,
});
