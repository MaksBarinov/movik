import { configureStore } from "@reduxjs/toolkit"
import { omdbApi } from "../api/omdbApi"

export const store = configureStore({
  reducer: {
    [omdbApi.reducerPath]: omdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;