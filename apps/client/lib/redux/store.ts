import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';

import storage from './customStorage';
import { categoryApi } from './services/asset/category.services';
import { conditionApi } from './services/asset/condition.services';
import { depreciationApi } from './services/asset/depreciation.services';
import { assetApi } from './services/asset/general.services';
import { assetGroupTypeApi } from './services/asset/groupType.services';
import { locationApi } from './services/asset/location.services';
import { assetStatsApi } from './services/asset/stats.services';
import { assetTypeApi } from './services/asset/types.services';
import { vendorsApi } from './services/asset/vendor.services';
import { authApi } from './services/auth.services';
import { dashboardApi } from './services/dashboard.services';
import { employeesApi } from './services/employees.services';
import { maintenanceFrequencyApi } from './services/maintenance/frequency.services';
import { maintenancePlanApi } from './services/maintenance/plan.services';
import { maintenanceScheduleApi } from './services/maintenance/schedule.services';
import { maintenanceTypeApi } from './services/maintenance/type.services';
import { reportApi } from './services/reports.services';
import { taskApi } from './services/task/general.services';
import { taskInstanceApi } from './services/task/instance.services';
import { taskPrioritiesApi } from './services/task/priorities.services';
import { taskStatusApi } from './services/task/statuses.services';
import { taskTypeApi } from './services/task/types.services';
import { templateApi } from './services/template.services';
import { ticketApi } from './services/ticket.services';
import { userApi } from './services/user.services';
import { utilityApi } from './services/utility.services';
import assetSlice from './slices/AssetSlice';
import dashboardSlice from './slices/DashboardSlice';
import dateSlice from './slices/DateSlice';
import generalSlice from './slices/GeneralSlice';
import maintenanceSlice from './slices/MaintenanceSlice';
import taskSlice from './slices/TaskSlice';
import ticketSlice from './slices/TicketSlice';

import { scheduleInstanceApi } from './services/maintenance/scheduleInstance.services';
import { systemContextTypesApi } from './services/systemcontexttypes.services';
import { assetDocumentApi } from './services/asset/document.services';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['general'],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [assetApi.reducerPath]: assetApi.reducer,
  [assetDocumentApi.reducerPath]: assetDocumentApi.reducer,
  [assetStatsApi.reducerPath]: assetStatsApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [assetGroupTypeApi.reducerPath]: assetGroupTypeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [conditionApi.reducerPath]: conditionApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [depreciationApi.reducerPath]: depreciationApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [maintenanceFrequencyApi.reducerPath]: maintenanceFrequencyApi.reducer,
  [maintenancePlanApi.reducerPath]: maintenancePlanApi.reducer,
  [maintenanceScheduleApi.reducerPath]: maintenanceScheduleApi.reducer,
  [maintenanceTypeApi.reducerPath]: maintenanceTypeApi.reducer,
  [scheduleInstanceApi.reducerPath]: scheduleInstanceApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [taskInstanceApi.reducerPath]: taskInstanceApi.reducer,
  [taskPrioritiesApi.reducerPath]: taskPrioritiesApi.reducer,
  [taskTypeApi.reducerPath]: taskTypeApi.reducer,
  [taskStatusApi.reducerPath]: taskStatusApi.reducer,
  [templateApi.reducerPath]: templateApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [utilityApi.reducerPath]: utilityApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [vendorsApi.reducerPath]: vendorsApi.reducer,
  [systemContextTypesApi.reducerPath]: systemContextTypesApi.reducer,
  asset: assetSlice,
  general: generalSlice,
  dashboard: dashboardSlice,
  maintenance: maintenanceSlice,
  task: taskSlice,
  date: dateSlice,
  ticket: ticketSlice,
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
        assetDocumentApi.middleware,
        assetStatsApi.middleware,
        assetTypeApi.middleware,
        assetGroupTypeApi.middleware,
        dashboardApi.middleware,
        depreciationApi.middleware,
        employeesApi.middleware,
        maintenanceFrequencyApi.middleware,
        maintenancePlanApi.middleware,
        maintenanceScheduleApi.middleware,
        maintenanceTypeApi.middleware,
        scheduleInstanceApi.middleware,
        taskApi.middleware,
        taskInstanceApi.middleware,
        taskPrioritiesApi.middleware,
        taskTypeApi.middleware,
        taskStatusApi.middleware,
        templateApi.middleware,
        ticketApi.middleware,
        reportApi.middleware,
        locationApi.middleware,
        categoryApi.middleware,
        conditionApi.middleware,
        utilityApi.middleware,
        userApi.middleware,
        vendorsApi.middleware,
        systemContextTypesApi.middleware
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
