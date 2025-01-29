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
import { createWrapper } from 'next-redux-wrapper';

import storage from './customStorage';
import { categoryApi } from './services/asset/category.services';
import { companyApi } from './services/company.services';
import { conditionApi } from './services/asset/condition.services';
import { depreciationApi } from './services/asset/depreciation.services';
import { assetApi } from './services/asset/general.services';
import { assetGroupTypeApi } from './services/asset/groupType.services';
import { assetStatsApi } from './services/asset/stats.services';
import { assetTypeApi } from './services/asset/types.services';
import { assetVendorsApi } from './services/asset/vendors.services';
import { dashboardApi } from './services/dashboard.services';
import { employeesApi } from './services/employees.services';
import { frontdeskDashboardApi } from './services/dashboard/frontdesk.services';
import { maintenanceFrequencyApi } from './services/maintenance/frequency.services';
import { maintenancePlanApi } from './services/maintenance/plan.services';
import { maintenanceScheduleApi } from './services/maintenance/schedule.services';
import { maintenanceTypeApi } from './services/maintenance/type.services';
import { notificationApi } from './services/notification.services';
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
import reportSlice from './slices/ReportSlice';
import taskSlice from './slices/TaskSlice';
import templateSlice from './slices/TemplateSlice';
import ticketSlice from './slices/TicketSlice';
import userSlice from './slices/UserSlice';
import roleSlice from './slices/RoleSlice';
import vendorSlice from './slices/VendorSlice';

import { assetDocumentApi } from './services/asset/document.services';
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
import { assetDisposalApi } from './services/asset/disposal.services';
import { scheduleInstanceApi } from './services/maintenance/scheduleInstance.services';
import { systemContextTypesApi } from './services/systemcontexttypes.services';
import { vendorApi } from './services/vendor.services';
import { logApi } from './services/log.services';
import { rolesApi } from './services/role.services';
import { moduleApi } from './services/modules.services';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['general', 'report'],
};

const rootReducer = combineReducers({
  // Asset-related APIs
  [assetApi.reducerPath]: assetApi.reducer,
  [assetDocumentApi.reducerPath]: assetDocumentApi.reducer,
  [assetDisposalApi.reducerPath]: assetDisposalApi.reducer,
  [assetGroupTypeApi.reducerPath]: assetGroupTypeApi.reducer,
  [assetStatsApi.reducerPath]: assetStatsApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [conditionApi.reducerPath]: conditionApi.reducer,
  [assetVendorsApi.reducerPath]: assetVendorsApi.reducer,

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
  [frontdeskDashboardApi.reducerPath]: frontdeskDashboardApi.reducer,

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
  [utilityApi.reducerPath]: utilityApi.reducer,
  [userApi.reducerPath]: userApi.reducer,

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

  // Report APIS
  [reportApi.reducerPath]: reportApi.reducer,

  // Vendor-related APIs
  [vendorApi.reducerPath]: vendorApi.reducer,

  // Notification APIs
  [notificationApi.reducerPath]: notificationApi.reducer,

  // Utlis APIS
  [systemContextTypesApi.reducerPath]: systemContextTypesApi.reducer,

  // Log APIS
  [logApi.reducerPath]: logApi.reducer,

  // Roles APIS
  [rolesApi.reducerPath]: rolesApi.reducer,

  // Company APIS
  [companyApi.reducerPath]: companyApi.reducer,

  // Module APIS
  [moduleApi.reducerPath]: moduleApi.reducer,

  asset: assetSlice,
  general: generalSlice,
  dashboard: dashboardSlice,
  maintenance: maintenanceSlice,
  task: taskSlice,
  date: dateSlice,
  template: templateSlice,
  vendor: vendorSlice,
  user: userSlice,
  ticket: ticketSlice,
  report: reportSlice,
  role: roleSlice,
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
        // Asset-related APIs
        assetApi.middleware,
        assetDocumentApi.middleware,
        assetGroupTypeApi.middleware,
        assetStatsApi.middleware,
        assetTypeApi.middleware,
        assetDisposalApi.middleware,
        assetVendorsApi.middleware,

        // Maintenance-related APIs
        maintenanceFrequencyApi.middleware,
        maintenancePlanApi.middleware,
        maintenanceScheduleApi.middleware,
        maintenanceTypeApi.middleware,
        scheduleInstanceApi.middleware,

        // Notification APIs
        notificationApi.middleware,

        // Task-related APIs
        taskApi.middleware,
        taskInstanceApi.middleware,
        taskPrioritiesApi.middleware,
        taskTypeApi.middleware,
        taskStatusApi.middleware,
        templateApi.middleware,
        ticketApi.middleware,
        categoryApi.middleware,
        conditionApi.middleware,

        // Dashboard APIs
        dashboardApi.middleware,
        frontdeskDashboardApi.middleware,

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
        vendorApi.middleware,
        systemContextTypesApi.middleware,

        // Report Apis
        reportApi.middleware,

        // Log Apis
        logApi.middleware,

        // Roles Apis
        rolesApi.middleware,

        // Company APIs
        companyApi.middleware,

        // Module APIs
        moduleApi.middleware,
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
