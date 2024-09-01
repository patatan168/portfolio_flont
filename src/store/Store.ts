import { configureStore } from '@reduxjs/toolkit';
import LoginApi from '@store/api/LoginApi';
import PublicApi from '@store/api/PublicApi';

export const PublicStore = configureStore({
  reducer: {
    [PublicApi.reducerPath]: PublicApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(PublicApi.middleware),
});

export const LoginStore = configureStore({
  reducer: {
    [LoginApi.reducerPath]: LoginApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LoginApi.middleware),
});
