import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from 'redux-persist';

import storage from './customStorage';
import { assetApi } from './services/asset/general.services';
import { authApi } from './services/auth.services';
import assetSlice from './slices/assetSlice';
import { utilityApi } from './services/utility.services';
import { locationApi } from './services/asset/location.services';
import { categoryApi } from './services/asset/category.services';
import { conditionApi } from './services/asset/condition.services';
import { userApi } from './services/user.services';
import { depreciationApi } from './services/asset/depreciation.services';
import { vendorsApi } from './services/asset/vendor.services';
import { employeesApi } from './services/employees.services';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [conditionApi.reducerPath]: conditionApi.reducer,
  [depreciationApi.reducerPath]: depreciationApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [utilityApi.reducerPath]: utilityApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [vendorsApi.reducerPath]: vendorsApi.reducer,
  asset: assetSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        authApi.middleware,
        assetApi.middleware,
        depreciationApi.middleware,
        employeesApi.middleware,
        locationApi.middleware,
        categoryApi.middleware,
        conditionApi.middleware,
        utilityApi.middleware,
        userApi.middleware,
        vendorsApi.middleware,
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
