interface Ticket {
  rowId: number;
  ticketId: number;
  ticketTitle: string;
  issueDescription: string;
  issueReportDate: string;
  resolutionDate: string;
  isDeleted: boolean;
  assetId: number;
  assetCode: string;
  serialNo: string;
  assetDescription: string;
  reportedBy: string;
  reportedByEmployeeId: number;
  assignedTo: string;
  assignedToEmployeeId: number;
  resolvedBy: string;
  resolvedByEmployeeId: number;
  activeSchedules: number;
  openTasks: number;
  facilityName: string;
  facilityRef: string;
  facilityAddress: string;
  facilityLongitude: number;
  facilityLatitude: number;
  buildingName: string;
  buildingRef: string;
  buildingAddress: string;
  buildingLongitude: number;
  buildingLatitude: number;
  ticketPriorityName: string;
  priorityColorCode: string;
  ticketTypeName: string;
  floor: string;
  floorRef: string;
  department: string;
  departmentRef: string;
  room: string;
  roomRef: string;
  aisle: string;
  aisleRef: string;
  shelf: string;
  shelfRef: string;
  ticketPriorityId: number;
  ticketStatusId: number;
  statusColorCode: string;
  statusName: string;
  taskStatusId: number;
  ticketTypeId: number;
  assetLocation: string;
}

type SelectedTicketAction =
  | 'schedule'
  | 'assign'
  | 'edit'
  | 'view'
  | 'delete'
  | 'markAsCompleted';

type TicketCategory =
  | 'new'
  | 'assigned'
  | 'scheduled'
  | 'in_progress'
  | 'completed';

export type { SelectedTicketAction, Ticket, TicketCategory };
