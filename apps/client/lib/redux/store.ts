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
import assetSlice from './slices/AssetSlice';
import dashboardSlice from './slices/DashboardSlice';
import { utilityApi } from './services/utility.services';
import { locationApi } from './services/asset/location.services';
import { categoryApi } from './services/asset/category.services';
import { conditionApi } from './services/asset/condition.services';
import { userApi } from './services/user.services';
import { depreciationApi } from './services/asset/depreciation.services';
import { vendorsApi } from './services/asset/vendor.services';
import { employeesApi } from './services/employees.services';
import { assetStatsApi } from './services/asset/stats.services';
import { dashboardApi } from './services/dashboard.services';
import { maintenancePlanApi } from './services/maintenance/plan.services';
import { maintenanceScheduleApi } from './services/maintenance/schedule.services';
import maintenanceSlice from './slices/MaintenanceSlice';
import taskSlice from './slices/TaskSlice';
import { maintenanceTypeApi } from './services/maintenance/type.services';
import { maintenanceFrequencyApi } from './services/maintenance/frequency.services';
import { taskApi } from './services/task/general.services';
import { taskPrioritiesApi } from './services/task/priorities.services';
import { taskTypeApi } from './services/task/types.services';
import { ticketApi } from './services/ticket.services';
import { assetTypeApi } from './services/asset/types.services';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [assetStatsApi.reducerPath]: assetStatsApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [conditionApi.reducerPath]: conditionApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [depreciationApi.reducerPath]: depreciationApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [maintenanceFrequencyApi.reducerPath]: maintenanceFrequencyApi.reducer,
  [maintenancePlanApi.reducerPath]: maintenancePlanApi.reducer,
  [maintenanceScheduleApi.reducerPath]: maintenanceScheduleApi.reducer,
  [maintenanceTypeApi.reducerPath]: maintenanceTypeApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [taskPrioritiesApi.reducerPath]: taskPrioritiesApi.reducer,
  [taskTypeApi.reducerPath]: taskTypeApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [utilityApi.reducerPath]: utilityApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [vendorsApi.reducerPath]: vendorsApi.reducer,
  asset: assetSlice,
  dashboard: dashboardSlice,
  maintenance: maintenanceSlice,
  task: taskSlice,
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
        assetStatsApi.middleware,
        assetTypeApi.middleware,
        dashboardApi.middleware,
        depreciationApi.middleware,
        employeesApi.middleware,
        maintenanceFrequencyApi.middleware,
        maintenancePlanApi.middleware,
        maintenanceScheduleApi.middleware,
        maintenanceTypeApi.middleware,
        taskApi.middleware,
        taskPrioritiesApi.middleware,
        taskTypeApi.middleware,
        ticketApi.middleware,
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
