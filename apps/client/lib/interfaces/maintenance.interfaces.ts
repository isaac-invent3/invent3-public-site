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

export type { MaintenancePlan };
