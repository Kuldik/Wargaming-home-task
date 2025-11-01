import { api } from './rtk';
// import type { VehiclesResponse } from '../../entities/ship/model/types';
// import type { Nation } from '../../entities/nation/model/types';
// import type { VehicleTypesResponse } from '../../entities/vtype/model/types';

export const services = api.injectEndpoints({
  endpoints: (build) => ({
    getMediaPath: build.query<{ status: string; data: string }, { lang: string }>({
      query: ({ lang }) => `/${lang}/media_path/`,
      providesTags: ['MediaPath']
    }),
    // getVehicles: build.query<{ status: string; data: VehiclesResponse }, { lang: string }>({
    //   query: ({ lang }) => `/${lang}/vehicles/`,
    //   providesTags: (_r, _e, a) => [{ type: 'Vehicles', id: a.lang }]
    // }),
    // getNations: build.query<{ status: string; data: Nation[] }, { lang: string }>({
    //   query: ({ lang }) => `/${lang}/nations/`,
    //   providesTags: (_r, _e, a) => [{ type: 'Nations', id: a.lang }]
    // }),
    // getVehicleTypes: build.query<{ status: string; data: VehicleTypesResponse }, { lang: string }>({
    //   query: ({ lang }) => `/${lang}/vehicle_types_common/`,
    //   providesTags: (_r, _e, a) => [{ type: 'Types', id: a.lang }]
    // })
  })
});

export const {
//   useGetVehiclesQuery,
//   useGetNationsQuery,
//   useGetVehicleTypesQuery,
  useGetMediaPathQuery
} = services;
