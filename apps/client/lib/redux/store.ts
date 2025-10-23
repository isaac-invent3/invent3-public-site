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
import { operationManagerDashboardApis } from './services/dashboard/operationmanager.services';
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
import { dataUploadAPi } from './services/dataUpload.services';
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
import notesSlice from './slices/NoteSlice';
import auditLogSlice from './slices/AuditLogSlice';
import companySlice from './slices/CompanySlice';
import settingSlice from './slices/SettingsSlice';
import commonSlice from './slices/CommonSlice';
import locationSlice from './slices/LocationSlice';
import approvalSlice from './slices/ApprovalSlice';

import { approvalWorkflowRequestApi } from './services/approval-workflow/requests.services';
import { assetDisposalApi } from './services/asset/disposal.services';
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
import { scheduleInstanceApi } from './services/maintenance/scheduleInstance.services';
import { systemContextTypesApi } from './services/systemcontexttypes.services';
import { approvalWorkflowRequestDocumentApi } from './services/approval-workflow/requestDocuments.services';
import { approvalWorkflowActionApi } from './services/approval-workflow/actions.services';
import { approvalWorkflowActionOptionApi } from './services/approval-workflow/actionOptions.services';
import { approvalWorkflowActionOptionsMapApi } from './services/approval-workflow/actionOptionsMaps.services';
import { approvalWorkflowInstanceApi } from './services/approval-workflow/workflowInstances.services';
import { approvalWorkflowPartyInstanceApi } from './services/approval-workflow/partyInstances.services';
import { approvalWorkflowRequirementTypeApi } from './services/approval-workflow/requirementTypes.services';
import { approvalWorkflowStatusApi } from './services/approval-workflow/statuses.services';
import { approvalWorkflowTypeApi } from './services/approval-workflow/types.services';
import { approvalWorkflowSettingsApi } from './services/approval-workflow/settings.services';
import { vendorApi } from './services/vendor.services';
import { logApi } from './services/log.services';
import { rolesApi } from './services/role.services';
import { moduleApi } from './services/modules.services';
import { superAdminApi } from './services/dashboard/superadmin.services';
import { clientAdminApi } from './services/dashboard/clientadmin.services';
import { industryApi } from './services/industry.services';
import { integrationApi } from './services/integration.services';
import { subscriptionApi } from './services/subscription.services';
import { thirdPartyApi } from './services/dashboard/thirdparty.services';
import { complianceApi } from './services/asset/compliance.services';
import { notesApi } from './services/notes.services';
import { fieldEngineerDashboardApi } from './services/dashboard/fieldengineer.services';
import { feedbackApi } from './services/feedback.services';
import { forecastApi } from './services/forecast.services';
import { executiveDashboardApis } from './services/dashboard/executive.services';
import { BMSApi } from './services/dashboard/bms.services';
import { settingsApi } from './services/settings.services';
import { authApi } from './services/auth.services';
import { assetTransferApi } from './services/asset/transfer.services';
import { approvalWorkflowRequestCommentApi } from './services/approval-workflow/requestComments.services';
import { assetBulkActionApi } from './services/asset/bulkAction.services';
import { designationApi } from './services/designation.services';
import { teamApi } from './services/team.services';
import { companyApiKey } from './services/apiKey.services';
import { webhookApi } from './services/webhook.services';
import { predictionApi } from './services/prediction.services';
import { bmsReadingApi } from './services/bms/bmsReading.services';
import { assetLifeCycleApi } from './services/asset/lifeCycle.services';
import { slaApi } from './services/settings/sla.services';
import { bmsAnomaliesApi } from './services/bms/bmsAnomalies.services';
import { lifeCycleComparisonApi } from './services/location/lifecycleComparison.services';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['general'],
};

const rootReducer = combineReducers({
  // Asset-related APIs
  [assetApi.reducerPath]: assetApi.reducer,
  [assetDocumentApi.reducerPath]: assetDocumentApi.reducer,
  [assetDisposalApi.reducerPath]: assetDisposalApi.reducer,
  [assetTransferApi.reducerPath]: assetTransferApi.reducer,
  [assetBulkActionApi.reducerPath]: assetBulkActionApi.reducer,
  [assetGroupTypeApi.reducerPath]: assetGroupTypeApi.reducer,
  [assetStatsApi.reducerPath]: assetStatsApi.reducer,
  [assetTypeApi.reducerPath]: assetTypeApi.reducer,
  [conditionApi.reducerPath]: conditionApi.reducer,
  [assetVendorsApi.reducerPath]: assetVendorsApi.reducer,
  [assetLifeCycleApi.reducerPath]: assetLifeCycleApi.reducer,
  [complianceApi.reducerPath]: complianceApi.reducer,

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
  [operationManagerDashboardApis.reducerPath]:
    operationManagerDashboardApis.reducer,
  [frontdeskDashboardApi.reducerPath]: frontdeskDashboardApi.reducer,
  [superAdminApi.reducerPath]: superAdminApi.reducer,
  [clientAdminApi.reducerPath]: clientAdminApi.reducer,
  [thirdPartyApi.reducerPath]: thirdPartyApi.reducer,
  [fieldEngineerDashboardApi.reducerPath]: fieldEngineerDashboardApi.reducer,
  [executiveDashboardApis.reducerPath]: executiveDashboardApis.reducer,
  [BMSApi.reducerPath]: BMSApi.reducer,

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

  // Utility APIs
  [utilityApi.reducerPath]: utilityApi.reducer,

  // Data Upload APIs
  [dataUploadAPi.reducerPath]: dataUploadAPi.reducer,

  // User-related APIs
  [userApi.reducerPath]: userApi.reducer,
  [designationApi.reducerPath]: designationApi.reducer,

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
  [lifeCycleComparisonApi.reducerPath]: lifeCycleComparisonApi.reducer,

  // Report APIS
  [reportApi.reducerPath]: reportApi.reducer,

  // Vendor-related APIs
  [vendorApi.reducerPath]: vendorApi.reducer,

  // Notification APIs
  [notificationApi.reducerPath]: notificationApi.reducer,

  // Utlis APIS
  [systemContextTypesApi.reducerPath]: systemContextTypesApi.reducer,

  // Approval Workflow Related APIs
  [approvalWorkflowRequestApi.reducerPath]: approvalWorkflowRequestApi.reducer,
  [approvalWorkflowRequestDocumentApi.reducerPath]:
    approvalWorkflowRequestDocumentApi.reducer,
  [approvalWorkflowActionApi.reducerPath]: approvalWorkflowActionApi.reducer,
  [approvalWorkflowActionOptionApi.reducerPath]:
    approvalWorkflowActionOptionApi.reducer,
  [approvalWorkflowActionOptionsMapApi.reducerPath]:
    approvalWorkflowActionOptionsMapApi.reducer,
  [approvalWorkflowInstanceApi.reducerPath]:
    approvalWorkflowInstanceApi.reducer,
  [approvalWorkflowPartyInstanceApi.reducerPath]:
    approvalWorkflowPartyInstanceApi.reducer,
  [approvalWorkflowRequirementTypeApi.reducerPath]:
    approvalWorkflowRequirementTypeApi.reducer,
  [approvalWorkflowStatusApi.reducerPath]: approvalWorkflowStatusApi.reducer,
  [approvalWorkflowTypeApi.reducerPath]: approvalWorkflowTypeApi.reducer,
  [approvalWorkflowRequestCommentApi.reducerPath]:
    approvalWorkflowRequestCommentApi.reducer,
  [approvalWorkflowSettingsApi.reducerPath]:
    approvalWorkflowSettingsApi.reducer,

  // Log APIS
  [logApi.reducerPath]: logApi.reducer,

  // Roles APIS
  [rolesApi.reducerPath]: rolesApi.reducer,

  // Company APIS
  [companyApi.reducerPath]: companyApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,

  // Module APIS
  [moduleApi.reducerPath]: moduleApi.reducer,

  // Industry APIS
  [industryApi.reducerPath]: industryApi.reducer,

  // Notes APIS
  [notesApi.reducerPath]: notesApi.reducer,

  // Feedback APIS
  [feedbackApi.reducerPath]: feedbackApi.reducer,

  // Settings APIS
  [settingsApi.reducerPath]: settingsApi.reducer,

  // Teams APIS
  [teamApi.reducerPath]: teamApi.reducer,

  // Integrations APIS
  [integrationApi.reducerPath]: integrationApi.reducer,

  // Company API Keys APIS
  [companyApiKey.reducerPath]: companyApiKey.reducer,

  // Webhook URL APIS
  [webhookApi.reducerPath]: webhookApi.reducer,

  // Auth APIS
  [authApi.reducerPath]: authApi.reducer,

  // Forecast APIS
  [forecastApi.reducerPath]: forecastApi.reducer,

  // Prediction APIS
  [predictionApi.reducerPath]: predictionApi.reducer,

  // BMS APIS
  [bmsReadingApi.reducerPath]: bmsReadingApi.reducer,
  [bmsAnomaliesApi.reducerPath]: bmsAnomaliesApi.reducer,

  // SLA APIs
  // [slaApi.reducerPath]: slaApi.reducer,

  asset: assetSlice,
  auditLog: auditLogSlice,
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
  company: companySlice,
  settings: settingSlice,
  notes: notesSlice,
  common: commonSlice,
  location: locationSlice,
  approval: approvalSlice,
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
        assetTransferApi.middleware,
        assetBulkActionApi.middleware,
        assetVendorsApi.middleware,
        assetLifeCycleApi.middleware,
        complianceApi.middleware,

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
        categoryApi.middleware,
        conditionApi.middleware,

        // Dashboard APIs
        operationManagerDashboardApis.middleware,
        frontdeskDashboardApi.middleware,
        superAdminApi.middleware,
        clientAdminApi.middleware,
        thirdPartyApi.middleware,
        fieldEngineerDashboardApi.middleware,
        executiveDashboardApis.middleware,
        BMSApi.middleware,

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
        lifeCycleComparisonApi.middleware,

        // Utility APIs
        utilityApi.middleware,

        // Data Upload APIs
        dataUploadAPi.middleware,

        // User-related APIs
        userApi.middleware,
        designationApi.middleware,

        // Vendor-related APIs
        vendorApi.middleware,
        systemContextTypesApi.middleware,

        // Report Apis
        reportApi.middleware,

        // Approval-Workflow Related APIs
        approvalWorkflowRequestApi.middleware,
        approvalWorkflowRequestDocumentApi.middleware,
        approvalWorkflowActionApi.middleware,
        approvalWorkflowActionOptionApi.middleware,
        approvalWorkflowActionOptionsMapApi.middleware,
        approvalWorkflowInstanceApi.middleware,
        approvalWorkflowPartyInstanceApi.middleware,
        approvalWorkflowRequirementTypeApi.middleware,
        approvalWorkflowStatusApi.middleware,
        approvalWorkflowTypeApi.middleware,
        approvalWorkflowRequestCommentApi.middleware,
        approvalWorkflowSettingsApi.middleware,

        // Log Apis
        logApi.middleware,

        // Roles Apis
        rolesApi.middleware,

        // Company APIs
        companyApi.middleware,
        subscriptionApi.middleware,

        // Module APIs
        moduleApi.middleware,

        // Industry APIs
        industryApi.middleware,

        // Notes Apis
        notesApi.middleware,

        // Feedback Apis
        feedbackApi.middleware,

        // Settings Apis
        settingsApi.middleware,

        // Teams Apis
        teamApi.middleware,

        // Integration Apis
        integrationApi.middleware,

        // APIKeys Apis
        companyApiKey.middleware,

        // Webhook Apis
        webhookApi.middleware,

        // Report Apis
        forecastApi.middleware,

        // Auth Apis
        authApi.middleware,

        // Prediction Apis
        predictionApi.middleware,

        // BMS Apis
        bmsReadingApi.middleware,
        bmsAnomaliesApi.middleware,

        // SLA Apis
        // slaApi.middleware,
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
