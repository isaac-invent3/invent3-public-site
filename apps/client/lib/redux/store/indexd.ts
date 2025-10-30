// lib/store/index.ts
import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';

import { apiReducers, apiMiddlewares } from './apiRegistry';
import { sliceRegistry } from './sliceRegistry';

const rootReducer = combineReducers({
  ...sliceRegistry,
  ...apiReducers,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: false,
      }).concat(...(apiMiddlewares as Middleware[])),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
