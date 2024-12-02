import { LocationFilter, Option } from './general.interfaces';
import { taskFormDetails } from './task.interfaces';

interface MaintenancePlan {
  rowId: number;
  maintenancePlanId: number;
  planName: string;
  startDate: string;
  endDate: string;
  dateCreated: string;
  cost: number;
  isDeleted: boolean;
  owner: string;
  assetId: number;
  assetName: string;
  assetCode: string;
  assetTypeId: number;
  serialNo: string;
  assetDescription: string;
  planTypeId: number;
  planTypeName: string;
  planStatusName: string;
  frequencyName: string;
  frequencyId: number;
  assetTypeName: string;
  ownedByAssetType: number;
  activeSchedules: number;
  openTasks: number;
  assetLocation: string;
  groupTypeName: 'string' | null;
  assetGroupContextName: 'string' | null;
}

interface BaseMaintenanceSchedule {
  rowId: number;
  assetId: number;
  assetName: string;
  assetTypeId: number;
  countryId: number;
  stateId: number;
  frequencyId: number;
  maintenancePlanId: number;
  planName: string;
  frequencyName: string;
  scheduledDate: string; // ISO 8601 format
  completionDate: string; // ISO 8601 format
  durationInHours: number;
  description: string;
  maintenanceTypeId: number;
  isDeleted: boolean;
  sla: number;
  comments: string;
  assignedTo: number;
  currentStatus: string;
  contactPerson: string;
  contactPersonPhoneNo: string;
  contactPersonEmail: string;
  maintenanceType: string;
  activeTasksCount: number;
  createdBy: string;
  locationId: number;
  facilityId: number;
  buildingId: number;
  floorId: number;
  departmentId: number;
  roomId: number;
  aisleId: number;
  shelfId: number;
  lgaId: number;
  totalCost: number;
  assetLocation: string;
}

interface MaintenanceSchedule extends BaseMaintenanceSchedule {
  scheduleId: number;
  scheduleGuid: string;
  endDate: string; // ISO 8601 format
  scheduleName: string;
  ticketId: number;
  statusId: number;
  displayColorCode: string;
}

interface MaintenanceScheduleInstance extends BaseMaintenanceSchedule {
  scheduleInstanceId: number;
  scheduleInstanceName: string;
  estimatedDurationInHours: number;
  scheduleInstanceGuid: string;
  parentScheduleId: number;
  currentStatusId: number;
  statusDisplayColorCode: string;
  statusCategoryId: number;
  statusCategoryName: string;
}

interface AggregateMaintenanceSchedule {
  totalScheduleCount: number;
  scheduledDate: string;
  maxCompletionDate: string;
}

interface MaintenanceScheduleStat {
  totalSchedules: number;
  totalHours: number;
  totalCost: number;
  completed: number;
  pending: number;
  missed: number;
}

interface ScheduleFormDetails {
  name: string | null;
  scheduleId: number | null;
  localId: number | null;
  planId: number | null;
  typeId: number | null;
  typeName: string | null;
  assetId: number | null;
  assetTypeId: number | null;
  assetName: string | null;
  sla: number | null;
  frequencyId: number | null;
  frequencyName: string | null;
  assetLocation: string | null;
  description: string | null;
  comment: string | null;
  scheduledDate: string | null;
  endDate: string | null;
  completionDate: string | null;
  ticketId: number | null;
  intervalValue: number | null;
  deletedTaskIDs: number[];
  updatedTaskIDs: number[];
  dayOccurrences: string[] | null;
  weekOccurrences: number[] | null;
  monthOccurrences: number[] | null;
  yearOccurrences: {
    [name: number]: number[];
  } | null;
  maintenancePlanInfo: {
    planName: string | null;
    planType: string | null;
    assetName: string | null;
    assetTypeName: string | null;
    planStatus: string | null;
    startDate: string | null;
    endDate: string | null;
  } | null;
  taskCount: number | null;
  tasks: taskFormDetails[];
  firstInstanceDate: string | null;
  contactPerson?: string | null;
  contactPersonPhoneNo?: string | null;
  contactPersonEmail?: string | null;
}

interface PlanFormDetails {
  planId: number | null;
  planName: string | null;
  frequencyId: number | null;
  frequencyName: string | null;
  assetName: string | null;
  assetId: number | null;
  planTypeId: number | null;
  planTypeName: string | null;
  assetGroupTypeID: number | null;
  assetGroupContextID: number | null;
  assetGroupTypeName: string | null;
  assetGroupContextName: string | null;
  owner: string | null;
  ownerId: number | null;
  startDate: string | null;
  endDate: string | null;
  cost: number | null;
  deletedScheduleIDs: number[];
  updatedScheduleIDs: number[];
  schedules: ScheduleFormDetails[];
}

interface MaintenanceFrequency {
  frequencyId: number;
  frequencyName: string;
  intervalValues: number[];
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string | null;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
}

interface TemplateFilter {
  createdDate: string | null;
  owner: number[];
  apply: boolean;
}

interface PlanFilter extends LocationFilter {
  planType: Option[];
}

interface ScheduleFilter extends LocationFilter {
  maintenanceType: Option[];
}

export type {
  MaintenancePlan,
  MaintenanceScheduleStat,
  AggregateMaintenanceSchedule,
  ScheduleFormDetails,
  MaintenanceSchedule,
  MaintenanceScheduleInstance,
  MaintenanceFrequency,
  PlanFormDetails,
  TemplateFilter,
  PlanFilter,
  ScheduleFilter,
};
