import { ContextTypeColumn } from '~/lib/interfaces/report.interfaces';

const assetColumns: ContextTypeColumn[] = [
  { columnId: 1, columnName: 'AssetName', columnType: 'string' },
  { columnId: 2, columnName: 'AssetType', columnType: 'string' },
  { columnId: 3, columnName: 'AssetId', columnType: 'number' },
  { columnId: 4, columnName: 'AcquisitionDate', columnType: 'string' },
  { columnId: 5, columnName: 'PurchasePrice', columnType: 'number' },
  { columnId: 6, columnName: 'CurrentValue', columnType: 'number' },
  { columnId: 7, columnName: 'DepreciationRate', columnType: 'number' },
  { columnId: 8, columnName: 'Location', columnType: 'string' },
  { columnId: 9, columnName: 'AssignedTo', columnType: 'string' },
  { columnId: 10, columnName: 'MaintenanceDate', columnType: 'string' },
  { columnId: 11, columnName: 'WarrantyExpiration', columnType: 'string' },
  { columnId: 12, columnName: 'Status', columnType: 'string' },
  { columnId: 13, columnName: 'SupplierName', columnType: 'string' },
  { columnId: 14, columnName: 'AssetCondition', columnType: 'string' },
  { columnId: 15, columnName: 'InsurancePolicyNumber', columnType: 'string' },
  { columnId: 16, columnName: 'InsuranceExpiryDate', columnType: 'string' },
  { columnId: 17, columnName: 'LastServicedOn', columnType: 'string' },
  { columnId: 18, columnName: 'NextServiceDue', columnType: 'string' },
  { columnId: 19, columnName: 'ServiceCost', columnType: 'number' },
  { columnId: 20, columnName: 'DisposalDate', columnType: 'string' },
];

const ticketColumns: ContextTypeColumn[] = [
  { columnId: 1, columnName: 'TicketId', columnType: 'number' },
  { columnId: 2, columnName: 'Subject', columnType: 'string' },
  { columnId: 3, columnName: 'Description', columnType: 'string' },
  { columnId: 4, columnName: 'Priority', columnType: 'string' },
  { columnId: 5, columnName: 'Status', columnType: 'string' },
  { columnId: 6, columnName: 'CreatedAt', columnType: 'string' },
  { columnId: 7, columnName: 'UpdatedAt', columnType: 'string' },
  { columnId: 8, columnName: 'AssignedTo', columnType: 'string' },
  { columnId: 9, columnName: 'Reporter', columnType: 'string' },
  { columnId: 10, columnName: 'DueDate', columnType: 'string' },
];

const tasksColumns: ContextTypeColumn[] = [
  { columnId: 1, columnName: 'TaskId', columnType: 'number' },
  { columnId: 2, columnName: 'TaskName', columnType: 'string' },
  { columnId: 3, columnName: 'AssignedTo', columnType: 'string' },
  { columnId: 4, columnName: 'Description', columnType: 'string' },
  { columnId: 5, columnName: 'Priority', columnType: 'string' },
  { columnId: 6, columnName: 'Status', columnType: 'string' },
  { columnId: 7, columnName: 'StartDate', columnType: 'string' },
  { columnId: 8, columnName: 'DueDate', columnType: 'string' },
  { columnId: 9, columnName: 'CreatedBy', columnType: 'string' },
  { columnId: 10, columnName: 'CompletedAt', columnType: 'string' },
];

const maintenanceScheduleColumns: ContextTypeColumn[] = [
  { columnId: 1, columnName: 'ScheduleId', columnType: 'number' },
  { columnId: 2, columnName: 'AssetId', columnType: 'number' },
  { columnId: 3, columnName: 'AssetName', columnType: 'string' },
  { columnId: 4, columnName: 'MaintenanceType', columnType: 'string' },
  { columnId: 5, columnName: 'ScheduledDate', columnType: 'string' },
  { columnId: 6, columnName: 'Technician', columnType: 'string' },
  { columnId: 7, columnName: 'Priority', columnType: 'string' },
  { columnId: 8, columnName: 'Status', columnType: 'string' },
  { columnId: 9, columnName: 'Notes', columnType: 'string' },
  { columnId: 10, columnName: 'CreatedAt', columnType: 'string' },
];

const maintenancePlanColumns: ContextTypeColumn[] = [
  { columnId: 1, columnName: 'PlanId', columnType: 'number' },
  { columnId: 2, columnName: 'AssetId', columnType: 'number' },
  { columnId: 3, columnName: 'AssetName', columnType: 'string' },
  { columnId: 4, columnName: 'PlanName', columnType: 'string' },
  { columnId: 5, columnName: 'Frequency', columnType: 'string' },
  { columnId: 6, columnName: 'StartDate', columnType: 'string' },
  { columnId: 7, columnName: 'EndDate', columnType: 'string' },
  { columnId: 8, columnName: 'LastMaintenanceDate', columnType: 'string' },
  { columnId: 9, columnName: 'NextMaintenanceDate', columnType: 'string' },
  { columnId: 10, columnName: 'CreatedBy', columnType: 'string' },
];

export {
  assetColumns,
  maintenancePlanColumns,
  maintenanceScheduleColumns,
  tasksColumns,
  ticketColumns,
};
