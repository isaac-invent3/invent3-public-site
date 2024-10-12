interface MaintenancePlan {
  rowId: number;
  assetId: number;
  assetName: string;
  countryId: number;
  stateId: number;
  maintenancePlanId: number;
  planName: string;
  scheduleId: number;
  scheduledDate: string;
  completionDate: string | null;
  durationInHours: number;
  comments: string;
  ticketId: number | null;
  assignedTo: number | null;
  statusId: number;
  currentStatus: string;
  contactPerson: string | null;
  contactPersonPhoneNo: string | null;
  contactPersonEmail: string | null;
  maintenanceType: string;
  createdBy: string | null;
  totalCost: number;
  assetLocation: string;
}

interface MaintenanceSchedule {
  isNew: boolean | null;
  createdDate: string | null;
  createdBy: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
  isDeleted: boolean | null;
  deletedDate: string | null;
  deletedBy: string | null;
  guid: string | null;
  scheduleId: number | null;
  planId: number | null;
  scheduleName: string | null;
  description: string | null;
  sla: number | null;
  maintenanceTypeId: number | null;
  frequencyId: number | null;
  comments: string | null;
  scheduledDate: string | null;
  completionDate: string | null;
  durationInHours: number | null;
  statusId: number | null;
  ticketId: number | null;
  assignedTo: number | null;
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
  planId: number | null;
  planName: string | null;
  typeId: number | null;
  typeName: string | null;
  assetId: number | null;
  assetName: string | null;
  sla: number | null;
  frequencyId: number | null;
  frequencyName: string | null;
  assetLocation: string | null;
  description: string | null;
  comment: string | null;
  scheduledDate: string | null;
  completionDate: string | null;
  ticketId: string | null;
  contactDetails: {
    picture: string | null;
    contactPerson: string | null;
  };
}

export type {
  MaintenancePlan,
  MaintenanceScheduleStat,
  AggregateMaintenanceSchedule,
  ScheduleFormDetails,
  MaintenanceSchedule,
};
