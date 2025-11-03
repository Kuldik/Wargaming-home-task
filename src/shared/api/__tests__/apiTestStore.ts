import { configureStore } from '@reduxjs/toolkit';
import { api } from '../rtk';

export const makeApiTestStore = () => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (gdm) =>
    gdm({ serializableCheck: false, immutableCheck: false }).concat(api.middleware),
});
