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
  planId: string | null;
  planName: string | null;
  typeId: string | null;
  typeName: string | null;
  assetId: string | null;
  assetName: string | null;
  assetLocation: string | null;
  description: string | null;
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
};
