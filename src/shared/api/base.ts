import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const FALLBACK = 'https://wows-proxy.tim-klimenkoo.workers.dev/api';

export const API_BASE =
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_API_BASE) || FALLBACK;

console.info('[API_BASE from bundle] =', API_BASE);

export const apiBase = fetchBaseQuery({
  baseUrl: API_BASE,
});
