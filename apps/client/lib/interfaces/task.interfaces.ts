interface BaseTask {
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

interface TaskStatus {
  taskStatusId: number;
  statusName: string;
  statusCategoryId: number | null;
  alias: string | null;
  displayColorCode: string;
  isNew: boolean;
  createdDate: string;
  createdBy: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
}

interface TaskPriority {
  taskPriorityId: number;
  priority: string;
  lastModifiedBy: string;
  lastModifiedDate: string | null;
  isNew: boolean;
  isDeleted: boolean;
  guid: string;
  displayColorCode: string;
  deletedDate: string | null;
  deletedBy: string;
  createdDate: string;
  createdBy: string;
}

interface taskFormDetails extends baseTaskFormDetail, FormDetails {}

export type {
  Task,
  TaskInstance,
  baseTaskFormDetail,
  taskFormDetails,
  TaskStatus,
  TaskPriority,
};
