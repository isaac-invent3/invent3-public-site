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
import ticketSlice from './slices/TicketSlice';
import { utilityApi } from './services/utility.services';
import { categoryApi } from './services/asset/category.services';
import { conditionApi } from './services/asset/condition.services';
import { userApi } from './services/user.services';
import { depreciationApi } from './services/asset/depreciation.services';
import { vendorsApi } from './services/asset/vendor.services';
import { employeesApi } from './services/employees.services';
import { assetStatsApi } from './services/asset/stats.services';
import { assetDocumentApi } from './services/asset/document.services';
import { dashboardApi } from './services/dashboard.services';
import { maintenancePlanApi } from './services/maintenance/plan.services';
import { maintenanceScheduleApi } from './services/maintenance/schedule.services';
import maintenanceSlice from './slices/MaintenanceSlice';
import taskSlice from './slices/TaskSlice';
import { maintenanceTypeApi } from './services/maintenance/type.services';
import { maintenanceFrequencyApi } from './services/maintenance/frequency.services';
import { taskApi } from './services/task/general.services';
import { taskInstanceApi } from './services/task/instance.services';
import { taskPrioritiesApi } from './services/task/priorities.services';
import { taskTypeApi } from './services/task/types.services';
import { templateApi } from './services/template.services';
import { ticketApi } from './services/ticket.services';
import { assetTypeApi } from './services/asset/types.services';
import { assetGroupTypeApi } from './services/asset/groupType.services';
import dateSlice from './slices/DateSlice';
import generalSlice from './slices/GeneralSlice';
import { taskStatusApi } from './services/task/statuses.services';
import { scheduleInstanceApi } from './services/maintenance/scheduleInstance.services';
import { aisleApi } from './services/location/aisle.services';
import { buildingApi } from './services/location/building.services';
import { countryApi } from './services/location/country.services';
import { departmentApi } from './services/location/department.services';
import { facilityApi } from './services/location/facility.services';
import { floorApi } from './services/location/floor.services';
import { lgaApi } from './services/location/lga.services';
import { roomApi } from './services/location/room.services';
import { shelfApi } from './services/location/shelf.services';
import { stateApi } from './services/location/state.services';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['general'],
};

const rootReducer = combineReducers({
  // Auth-related APIs
  [authApi.reducerPath]: authApi.reducer,

  // Asset-related APIs
  [assetApi.reducerPath]: assetApi.reducer,
  [assetDocumentApi.reducerPath]: assetDocumentApi.reducer,
  [assetGroupTypeApi.reducerPath]: assetGroupTypeApi.reducer,
  [assetStatsApi.reducerPath]: assetStatsApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [conditionApi.reducerPath]: conditionApi.reducer,

  // Maintenance-related APIs
  [maintenanceFrequencyApi.reducerPath]: maintenanceFrequencyApi.reducer,
  [maintenancePlanApi.reducerPath]: maintenancePlanApi.reducer,
  [maintenanceScheduleApi.reducerPath]: maintenanceScheduleApi.reducer,
  [maintenanceTypeApi.reducerPath]: maintenanceTypeApi.reducer,
  [scheduleInstanceApi.reducerPath]: scheduleInstanceApi.reducer,

  // Task-related APIs
  [taskApi.reducerPath]: taskApi.reducer,
  [taskInstanceApi.reducerPath]: taskInstanceApi.reducer,
  [taskPrioritiesApi.reducerPath]: taskPrioritiesApi.reducer,
  [taskStatusApi.reducerPath]: taskStatusApi.reducer,
  [taskTypeApi.reducerPath]: taskTypeApi.reducer,

  // Dashboard-related APIs
  [dashboardApi.reducerPath]: dashboardApi.reducer,

  // Category and condition APIs
  [categoryApi.reducerPath]: categoryApi.reducer,

  // Depreciation APIs
  [depreciationApi.reducerPath]: depreciationApi.reducer,

  // Employee-related APIs
  [employeesApi.reducerPath]: employeesApi.reducer,

  // Template APIs
  [templateApi.reducerPath]: templateApi.reducer,

  // Ticket APIs
  [ticketApi.reducerPath]: ticketApi.reducer,

  // Location-related APIs
  [aisleApi.reducerPath]: aisleApi.reducer,
  [buildingApi.reducerPath]: buildingApi.reducer,
  [countryApi.reducerPath]: countryApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [facilityApi.reducerPath]: facilityApi.reducer,
  [floorApi.reducerPath]: floorApi.reducer,
  [lgaApi.reducerPath]: lgaApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [shelfApi.reducerPath]: shelfApi.reducer,
  [stateApi.reducerPath]: stateApi.reducer,

  // Utility and user APIs
  [utilityApi.reducerPath]: utilityApi.reducer,
  [userApi.reducerPath]: userApi.reducer,

  // Vendor-related APIs
  [vendorsApi.reducerPath]: vendorsApi.reducer,
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
        // Auth-related APIs
        authApi.middleware,

        // Asset-related APIs
        assetApi.middleware,
        assetDocumentApi.middleware,
        assetGroupTypeApi.middleware,
        assetStatsApi.middleware,
        assetTypeApi.middleware,

        // Maintenance-related APIs
        maintenanceFrequencyApi.middleware,
        maintenancePlanApi.middleware,
        maintenanceScheduleApi.middleware,
        maintenanceTypeApi.middleware,
        scheduleInstanceApi.middleware,

        // Task-related APIs
        taskApi.middleware,
        taskInstanceApi.middleware,
        taskPrioritiesApi.middleware,
        taskStatusApi.middleware,
        taskTypeApi.middleware,

        // Dashboard-related APIs
        dashboardApi.middleware,

        // Category and condition APIs
        categoryApi.middleware,
        conditionApi.middleware,

        // Depreciation APIs
        depreciationApi.middleware,

        // Employee-related APIs
        employeesApi.middleware,

        // Template APIs
        templateApi.middleware,

        // Ticket APIs
        ticketApi.middleware,

        // Location-related APIs
        aisleApi.middleware,
        buildingApi.middleware,
        countryApi.middleware,
        departmentApi.middleware,
        facilityApi.middleware,
        floorApi.middleware,
        lgaApi.middleware,
        roomApi.middleware,
        shelfApi.middleware,
        stateApi.middleware,

        // Utility and user APIs
        utilityApi.middleware,
        userApi.middleware,

        // Vendor-related APIs
        vendorsApi.middleware,
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
