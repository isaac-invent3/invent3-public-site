// lib/store/sliceRegistry.ts
import { persistReducer } from 'redux-persist';
import storage from '../customStorage';

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

const generalPersistConfig = {
  key: 'general',
  storage,
};

export const sliceRegistry = {
  asset: assetSlice,
  auditLog: auditLogSlice,
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
};
