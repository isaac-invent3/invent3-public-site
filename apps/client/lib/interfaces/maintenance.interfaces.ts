interface MaintenancePlan {
  rowId: number;
  assetId: number;
  maintenancePlanId: number;
  planName: string;
  scheduleId: number;
  scheduledDate: string;
  completionDate: string;
  durationInHours: number;
  comments: string;
  ticketId: number;
  assignedTo: number;
  statusId: number;
  currentStatus: string;
  contactPerson: string;
  contactPersonPhoneNo: string;
  contactPersonEmail: string;
  maintenanceType: string;
  createdBy: string;
  totalCost: number;
}

export type { MaintenancePlan };
