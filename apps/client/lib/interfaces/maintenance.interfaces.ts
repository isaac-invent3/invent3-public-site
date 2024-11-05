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

interface MaintenanceSchedule {
  rowId: number;
  assetId: number | null;
  assetTypeId: number | null;
  assetName: string | null;
  countryId: number | null;
  stateId: number | null;
  maintenancePlanId: number | null;
  planName: string | null;
  scheduleId: number;
  scheduleGuid: string;
  scheduledDate: string | null;
  endDate: string | null;
  intervalValue: number | null;
  dayOccurrences: string[];
  weekOccurrences: number[];
  monthOccurrences: number[];
  yearOccurences: {
    [name: number]: number[];
  } | null;
  completionDate: string | null;
  durationInHours: number | null;
  scheduleName: string | null;
  description: string | null;
  sla: number | null;
  maintenanceTypeId: number | null;
  isDeleted: boolean | null;
  comments: string | null;
  ticketId: number | null;
  assignedTo: number | null;
  statusId: number | null;
  currentStatus: string | null;
  contactPerson: string | null;
  contactPersonPhoneNo: string | null;
  contactPersonEmail: string | null;
  maintenanceType: string | null;
  frequencyName: string | null;
  frequencyId: number | null;
  createdBy: string | null;
  totalCost: number | null;
  assetLocation: string | null;
  activeTasksCount: number | null;
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
  dayOccurrences: string[];
  weekOccurrences: number[];
  monthOccurrences: number[];
  yearOccurences: {
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
  };
  taskCount: number | null;
  tasks: taskFormDetails[];
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

export type {
  MaintenancePlan,
  MaintenanceScheduleStat,
  AggregateMaintenanceSchedule,
  ScheduleFormDetails,
  MaintenanceSchedule,
  MaintenanceFrequency,
  PlanFormDetails,
};
