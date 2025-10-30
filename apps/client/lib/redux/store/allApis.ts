// lib/store/allApis.ts

// --- Asset APIs ---
export { assetApi } from '../services/asset/general.services';
export { assetDocumentApi } from '../services/asset/document.services';
export { assetDisposalApi } from '../services/asset/disposal.services';
export { assetTransferApi } from '../services/asset/transfer.services';
export { assetBulkActionApi } from '../services/asset/bulkAction.services';
export { assetGroupTypeApi } from '../services/asset/groupType.services';
export { assetStatsApi } from '../services/asset/stats.services';
export { assetTypeApi } from '../services/asset/types.services';
export { assetVendorsApi } from '../services/asset/vendors.services';
export { assetLifeCycleApi } from '../services/asset/lifeCycle.services';
export { complianceApi } from '../services/asset/compliance.services';
export { categoryApi } from '../services/asset/category.services';
export { conditionApi } from '../services/asset/condition.services';
export { depreciationApi } from '../services/asset/depreciation.services';

// --- Maintenance APIs ---
export { maintenanceFrequencyApi } from '../services/maintenance/frequency.services';
export { maintenancePlanApi } from '../services/maintenance/plan.services';
export { maintenanceScheduleApi } from '../services/maintenance/schedule.services';
export { maintenanceTypeApi } from '../services/maintenance/type.services';
export { scheduleInstanceApi } from '../services/maintenance/scheduleInstance.services';

// --- Task APIs ---
export { taskApi } from '../services/task/general.services';
export { taskInstanceApi } from '../services/task/instance.services';
export { taskPrioritiesApi } from '../services/task/priorities.services';
export { taskStatusApi } from '../services/task/statuses.services';
export { taskTypeApi } from '../services/task/types.services';

// --- Dashboard APIs ---
export { operationManagerDashboardApis } from '../services/dashboard/operationmanager.services';
export { frontdeskDashboardApi } from '../services/dashboard/frontdesk.services';
export { superAdminApi } from '../services/dashboard/superadmin.services';
export { clientAdminApi } from '../services/dashboard/clientadmin.services';
export { thirdPartyApi } from '../services/dashboard/thirdparty.services';
export { fieldEngineerDashboardApi } from '../services/dashboard/fieldengineer.services';
export { executiveDashboardApis } from '../services/dashboard/executive.services';
export { BMSApi } from '../services/dashboard/bms.services';

// --- Location APIs ---
export { aisleApi } from '../services/location/aisle.services';
export { buildingApi } from '../services/location/building.services';
export { countryApi } from '../services/location/country.services';
export { departmentApi } from '../services/location/department.services';
export { facilityApi } from '../services/location/facility.services';
export { floorApi } from '../services/location/floor.services';
export { lgaApi } from '../services/location/lga.services';
export { roomApi } from '../services/location/room.services';
export { shelfApi } from '../services/location/shelf.services';
export { stateApi } from '../services/location/state.services';
export { lifeCycleComparisonApi } from '../services/location/lifecycleComparison.services';

// --- Approval Workflow APIs ---
export { approvalWorkflowRequestApi } from '../services/approval-workflow/requests.services';
export { approvalWorkflowRequestDocumentApi } from '../services/approval-workflow/requestDocuments.services';
export { approvalWorkflowActionApi } from '../services/approval-workflow/actions.services';
export { approvalWorkflowActionOptionApi } from '../services/approval-workflow/actionOptions.services';
export { approvalWorkflowActionOptionsMapApi } from '../services/approval-workflow/actionOptionsMaps.services';
export { approvalWorkflowInstanceApi } from '../services/approval-workflow/workflowInstances.services';
export { approvalWorkflowPartyInstanceApi } from '../services/approval-workflow/partyInstances.services';
export { approvalWorkflowRequirementTypeApi } from '../services/approval-workflow/requirementTypes.services';
export { approvalWorkflowStatusApi } from '../services/approval-workflow/statuses.services';
export { approvalWorkflowTypeApi } from '../services/approval-workflow/types.services';
export { approvalWorkflowSettingsApi } from '../services/approval-workflow/settings.services';
export { approvalWorkflowRequestCommentApi } from '../services/approval-workflow/requestComments.services';

// --- Other APIs ---
export { notificationApi } from '../services/notification.services';
export { reportApi } from '../services/reports.services';
export { templateApi } from '../services/template.services';
export { ticketApi } from '../services/ticket.services';
export { userApi } from '../services/user.services';
export { vendorApi } from '../services/vendor.services';
export { employeesApi } from '../services/employees.services';
export { rolesApi } from '../services/role.services';
export { moduleApi } from '../services/modules.services';
export { industryApi } from '../services/industry.services';
export { integrationApi } from '../services/integration.services';
export { subscriptionApi } from '../services/subscription.services';
export { notesApi } from '../services/notes.services';
export { feedbackApi } from '../services/feedback.services';
export { forecastApi } from '../services/forecast.services';
export { settingsApi } from '../services/settings.services';
export { authApi } from '../services/auth.services';
export { logApi } from '../services/log.services';
export { teamApi } from '../services/team.services';
export { companyApi } from '../services/company.services';
export { companyApiKey } from '../services/apiKey.services';
export { webhookApi } from '../services/webhook.services';
export { predictionApi } from '../services/prediction.services';
export { bmsReadingApi } from '../services/bms/bmsReading.services';
export { bmsAnomaliesApi } from '../services/bms/bmsAnomalies.services';
export { systemContextTypesApi } from '../services/systemcontexttypes.services';
export { dataUploadAPi } from '../services/dataUpload.services';
export { slaApi } from '../services/settings/sla.services';
export { designationApi } from '../services/designation.services';
export { utilityApi } from '../services/utility.services';
