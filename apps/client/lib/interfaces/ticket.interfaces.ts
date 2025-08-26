import { Document, LocationFilter, Option } from './general.interfaces';

interface Ticket {
  rowId: number;
  ticketId: number;
  ticketTitle: string;
  issueDescription: string;
  issueReportDate: string;
  resolutionDate: string;
  dateCreated: string;
  isScheduled: boolean;
  isDeleted: boolean;
  assetId: number;
  assetName: string;
  assetCode: string;
  serialNo: string;
  assetDescription: string;
  reportedBy: string | null;
  reportedByEmployeeId: number | null;
  resolvedBy: string | null;
  resolvedByEmployeeId: number | null;
  assignedTo: string | null;
  assignedToEmployeeId: number | null;
  activeSchedules: number | null;
  openTasks: number | null;
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
  totalTasksCount: number;
  activeTasksCount: number;
  completedTasksCount: number;
  assetLocation: string;
  attachment: Document | null;
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

interface UpdateTicketPayload extends Partial<CreateTicketPayload> {
  id: number;
  ticketId: number;
  ticketStatusId?: number | null;
  ticketTypeId?: number | null;
  ticketPriorityId?: number | null;
  lastModifiedBy?: string;
}

interface DeleteTicketPayload {
  id: number;
  deletedBy?: string;
}

interface CreateTicketForm extends Omit<CreateTicketPayload, 'createdBy'> {
  reportedByEmployeeName: string | null;
  assignedToEmployeeName: string | null;
  document: Document | null;
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

interface TicketFilter extends LocationFilter {
  users: Option[];
  ticketTypes: Option[];
}

export type {
  CreateTicketForm,
  CreateTicketPayload,
  DeleteTicketPayload,
  SelectedTicketAction,
  Ticket,
  TicketCategory,
  TicketTypeDetails,
  UpdateTicketPayload,
  TicketFilter,
};
