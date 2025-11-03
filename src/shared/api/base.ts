import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiBase = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE, 
});
 