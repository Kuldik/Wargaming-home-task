import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import favorites from '../../features/favorites/model/slice';
import { api } from '../../shared/api/rtk';

const store = configureStore({
  reducer: { favorites, [api.reducerPath]: api.reducer },
  middleware: (gDM) => gDM().concat(api.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  <Provider store={store}>{children}</Provider>;
