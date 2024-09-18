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
  statusId: number;
  currentStatus: string;
  owner: string;
  ownerContactNo: string;
  ownerContactEmail: string;
  typeName: string;
}

export type { MaintenancePlan };
