import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import storage from '../customStorage';

// Import Slices
import assetSlice from '../slices/AssetSlice';
import dashboardSlice from '../slices/DashboardSlice';
import dateSlice from '../slices/DateSlice';
import generalSlice from '../slices/GeneralSlice';
import maintenanceSlice from '../slices/MaintenanceSlice';
import reportSlice from '../slices/ReportSlice';
import taskSlice from '../slices/TaskSlice';
import templateSlice from '../slices/TemplateSlice';
import ticketSlice from '../slices/TicketSlice';
import userSlice from '../slices/UserSlice';
import roleSlice from '../slices/RoleSlice';
import vendorSlice from '../slices/VendorSlice';
import notesSlice from '../slices/NoteSlice';
import auditLogSlice from '../slices/AuditLogSlice';
import companySlice from '../slices/CompanySlice';
import settingSlice from '../slices/SettingsSlice';
import commonSlice from '../slices/CommonSlice';
import locationSlice from '../slices/LocationSlice';
import approvalSlice from '../slices/ApprovalSlice';

import { baseApi } from '../services/baseApi.services';

const generalPersistConfig = {
  key: 'general',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  asset: assetSlice,
  general: persistReducer(generalPersistConfig, generalSlice),
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
  company: companySlice,
  settings: settingSlice,
  notes: notesSlice,
  common: commonSlice,
  location: locationSlice,
  approval: approvalSlice,
  auditLog: auditLogSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

// Configure store
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        immutableCheck: false,
      }).concat(baseApi.middleware),
  });
};

//  Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

//  Next.js wrapper
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
