interface Ticket {
  rowId: number;
  ticketId: number;
  ticketTitle: string;
  issueDescription: string;
  issueReportDate: string;
  resolutionDate: string | null;
  dateCreated: string;
  isScheduled: boolean;
  isDeleted: boolean;
  assetId: number;
  assetCode: string;
  serialNo: string | null;
  assetDescription: string;
  reportedBy: string | null;
  reportedByEmployeeId: number | null;
  resolvedBy: string | null;
  resolvedByEmployeeId: number | null;
  assignedTo: string | null;
  assignedToEmployeeId: number | null;
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
  ticketPriorityName: string;
  priorityColorCode: string;
  ticketStatusId: number;
  statusName: string;
  statusColorCode: string;
  ticketTypeId: number;
  ticketTypeName: string;
  totalTasksCount: number | null;
  activeTasksCount: number | null;
  completedTasksCount: number | null;
  assetLocation: string | null; // Assuming this continues from "assetLocat" in the provided data
}

interface CreateTicketPayload {
  ticketTitle: string;
  issueDescription: string;
  issueReportDate: string;
  assetId: number | null;
  reportedByEmployeeId: number | null;
  ticketTypeId: number | null;
  ticketPriorityId: number | null;
  assignedTo: number | null;
  createdBy?: string;
}

interface CreateTicketForm extends Omit<CreateTicketPayload, 'createdBy'> {
  reportedByEmployeeName: string | null;
  assignedToEmployeeName: string | null;
}

interface TicketTypeDetails {
  createdBy: string;
  createdDate: string;
  deletedBy: string;
  deletedDate: string | null;
  description: string;
  guid: string;
  isDeleted: boolean;
  isNew: boolean;
  lastModifiedBy: string;
  lastModifiedDate: string | null;
  ticketTypeId: number;
  ticketTypeName: string;
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

export type {
  CreateTicketForm,
  CreateTicketPayload,
  SelectedTicketAction,
  Ticket,
  TicketCategory,
  TicketTypeDetails,
};
