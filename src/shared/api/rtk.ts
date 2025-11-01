import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vortex.worldofwarships.eu/api/encyclopedia' }),
  tagTypes: ['Vehicles','Nations','Types','MediaPath'],
  endpoints: () => ({})
});
