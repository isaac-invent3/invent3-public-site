import { BaseEntity } from '@repo/interfaces';
import { FORM_ENUM } from '../utils/constants';
import {
  BaseDto,
  Document,
  LocationFilter,
  Option,
} from './general.interfaces';

export interface BaseMainTask extends BaseEntity {
  taskId: number;
  taskTypeId: number;
  taskName: string;
  taskDescription: string;
  priorityId: number;
  taskStatusId: number;
  assignedTo: number;
  dateCreated: string;
  dateCompleted: string;
  costEstimate: number;
  actualCost: number;
  estimatedDurationInHours: number;
  comments: string;
  scheduleId: number;
}

interface BaseTask {
  rowId: number;
  dateCreated: string;
  dateCompleted: string | null;
  actualCost: number | null;
  taskDescription: string;
  assignedTo: number | null;
  assignedToEmployeeName: string;
  comments: string | null;
  taskStatusId: number;
  estimatedDurationInHours: number;
  costEstimate: number;
  isDeleted: boolean;
  taskTypeId: number;
  taskType: string;
  priorityId: number;
  taskPriorityId: number;
  priorityName: string;
  statusColorCode: string;
  priorityColorCode: string;
  assetId: number;
  assetCode: string;
  assetSerialNo: string;
  assetDescription: string;
  stateId: number;
  countryId: number;
  locationId: number;
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
  assetLocation: string;
  statusCategoryId: number;
  document: Document | null;
}

interface TaskInstanceModel extends BaseEntity {
  taskInstanceId: number;
  taskInstanceName: string;
  parentTaskId: number;
  scheduleInstanceId: number;
  taskTypeId: number;
  description: string;
  priorityId: number;
  costEstimate: number;
  dateCreated: string;
  dueDate: string;
  dateCompleted: string;
  actualCost: number;
  estimatedDurationInHours: number;
  assignedTo: number;
  comments: string;
  taskStatusId: number;
}

interface Task extends BaseTask {
  taskId: number;
  taskName: string;
  scheduleId: number | null;
  alias: string;
  status: string;
  statusId: number;
}

interface TaskInstance extends BaseTask {
  taskInstanceId: number;
  taskInstanceGuid: string;
  parentTaskId: number;
  scheduleInstanceId: number;
  taskInstanceName: string;
  currentStatus: string;
  currentStatusId: number;
  assignedToEmployeeId: number;
  statusAlias: string;
  categoryName: string;
  assetName: string;
}

interface SingleTask extends BaseMainTask {
  taskInfoHeader: Task;
}

interface baseTaskFormDetail {
  taskTypeId: number | null;
  taskDescription: string | null | undefined;
  priorityId: number | null;
  assignedTo: number | null;
  dateCompleted: string | null;
  costEstimate: number | null;
  estimatedDurationInHours: number | null;
  actualCost: number | null;
  comments: string | null;
  document: Document | null;
}

interface FormDetails {
  taskId: number | null;
  scheduleId: number | null;
  taskName: string | null;
  localId: number | null;
  taskType: string | null;
  statusId: number | null;
  status: string | null;
  priorityName: string | null;
  assignedToEmployeeName: string | null;
  assetId: number | null;
  assetName: string | null;
  assetLocation: string | null;
  statusColorCode: string | null;
  priorityColorCode: string | null;
  parentTaskId?: number | null;
}

interface TaskStatus extends BaseEntity {
  taskStatusId: number;
  statusName: string;
  statusCategoryId: number | null;
  alias: string | null;
  displayColorCode: string;
}

interface TaskPriority extends BaseEntity {
  taskPriorityId: number;
  priority: string;
  displayColorCode: string;
}

interface TaskType extends BaseEntity {
  taskTypeId: number;
  typeName: string;
}

interface taskFormDetails extends baseTaskFormDetail, FormDetails {}

// Common Payload for Task Metadata
interface TaskMetadata {
  taskTypeId: number;
  priorityId: number;
  assignedTo: number;
  costEstimate: number;
  estimatedDurationInHours: number;
  comments?: string | null;
  createdBy?: string;
  lastModifiedBy?: string;
  changeInitiatedBy?: string;
  actionType?: (typeof FORM_ENUM)[keyof typeof FORM_ENUM];
  actualCost?: number | null;
  dateCompleted?: string;
}

interface TaskPayload extends TaskMetadata {
  taskId?: number | null;
  taskName: string;
  taskDescription: string;
  scheduleId: number;
}

interface TaskDocumentDto extends BaseDto {
  documentName: string;
  base64Document: string;
}

interface TaskDocumentsLink {
  taskDocumentId: number;
  taskId: number;
  createdBy: string;
}

interface CreateTaskPayload {
  createTaskDto: TaskPayload & { createdBy: string };
  createTaskDocumentDto: TaskDocumentDto[] | null;
  createTaskDocumentsLinkDtos: TaskDocumentsLink[] | null;
}

interface TaskInstancePayload extends TaskMetadata {
  taskInstanceId?: number;
  taskStatusId?: number;
  taskInstanceName: string;
  description: string;
  scheduleInstanceId: number;
  parentTaskId: number;
  dueDate?: string;
}

interface UpdateTaskInstanceMetadataPayload {
  taskInstanceIds: number[];
  taskStatusId?: number;
  taskPriorityId?: number;
  assignedTo?: number;
  lastModifiedBy: string;
}
interface TaskFilter extends LocationFilter {
  users: Option[];
}

export type {
  Task,
  TaskInstanceModel,
  TaskInstance,
  baseTaskFormDetail,
  taskFormDetails,
  TaskStatus,
  TaskPriority,
  TaskType,
  SingleTask,
  TaskPayload,
  TaskInstancePayload,
  UpdateTaskInstanceMetadataPayload,
  TaskFilter,
  CreateTaskPayload,
};
