import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBase } from './base';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: apiBase, 
  endpoints: () => ({}),
  tagTypes: ['MediaPath','Vehicles','Nations','Types'],
});