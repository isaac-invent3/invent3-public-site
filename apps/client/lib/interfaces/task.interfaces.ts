import { BaseEntity } from '@repo/interfaces';

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
}

// Optional Fields for Task Completion
interface TaskCompletionDetails {
  actualCost?: number | null;
  dateCompleted?: string; // ISO string format
}

// Base Task Interface
interface BaseTaskPayload extends TaskMetadata {
  taskName: string;
  taskDescription: string;
  scheduleId: number;
}

// Base Task Instance Interface
interface BaseTaskInstancePayload extends TaskMetadata {
  taskInstanceName: string;
  description: string;
  scheduleInstanceId: number;
  parentTaskId: number;
  dueDate?: string; // ISO string format
}

// Create and Update Interfaces
interface CreatedByInfo {
  createdBy: string;
}

interface ModifiedByInfo {
  lastModifiedBy: string;
}

// Task Payloads
interface CreateTaskPayload extends BaseTaskPayload, CreatedByInfo {}

interface UpdateTaskPayload
  extends BaseTaskPayload,
    TaskCompletionDetails,
    ModifiedByInfo {
  taskId: number;
}

// Task Instance Payloads
interface CreateTaskInstancePayload
  extends BaseTaskInstancePayload,
    CreatedByInfo {}

interface UpdateTaskInstancePayload
  extends BaseTaskInstancePayload,
    TaskCompletionDetails,
    ModifiedByInfo {
  taskInstanceId: number;
  taskStatusId: number;
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
  CreateTaskPayload,
  UpdateTaskPayload,
  CreateTaskInstancePayload,
  UpdateTaskInstancePayload,
};
