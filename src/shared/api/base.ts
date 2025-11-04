// src/shared/api/apiBase.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBase = fetchBaseQuery({
  baseUrl: 'https://wows-proxy.tim-klimenkoo.workers.dev/api',
});
