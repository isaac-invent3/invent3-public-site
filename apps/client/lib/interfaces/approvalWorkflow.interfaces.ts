import { QueryParams } from '@repo/interfaces';

interface ApprovalWorkflowActionOption {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
  approvalActionOptionId: number;
  optionName: string;
  description: string;
}

interface ApprovalWorkflowActionOptionMap {
  rowId: number;
  approvalActionOptionMapId: number;
  approvalActionOptionId: number;
  optionName: string;
  approvalActionId: number;
  actionName: string;
  approvalActionDescription: string;
}

interface ApprovalWorkflowAction {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
  approvalActionId: number;
  actionName: string;
  description: string;
}

interface ApprovalWorkflowPartyInstance {
  rowId: number;
  approvalWorkFlowPartyInstanceId: number;
  guid: string;
  parentId: number;
  levelNumber: number;
  isDeleted: boolean;
  approvalWorkFlowInstanceId: number;
  approvalWorkFlowinstanceName: string;
  approvalActionId: number;
  requiredAction: string;
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  email: string;
  selectedApprovalOptionId?: number | null;
  selectedApprovalOptionName?: string | null;
  currentStatusId: number;
  currentStatusName: string;
  approvalRequestId: number;
  approvalRequirementTypeId: number;
  approvalRequirementTypeName: string;
  employeeDesignation: string;
}

interface GetApprovalWorkflowPartyInstances extends QueryParams {
  approvalWorkFlowInstanceId?: number;
  approvalRequestId?: number;
  levelNumber?: number;
}
interface CreateApprovalPartyInstancePayload {}

interface ApprovalWorkflowRequestDocument {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string;
  guid: string;
  approvalRequestDocumentId: number;
  systemContextTypeId: number;
  contextId: number;
  approvalRequestId: number;
}

interface ApprovalWorkflowRequest {
  approvalRequestId: number;
  approvalTypeId: number;
  approvalTypeName: string;
  contextId: number;
  currentStatusId: number;
  currentStatusName: string;
  dateRequested: string;
  guid: string;
  isDeleted: boolean;
  numberOfApprovalLevels: number;
  requestedByUserDesignation: string;
  requestedByUserEmail: string;
  requestedByUserFirstName: string;
  requestedByUserId: number;
  requestedByUserLastName: string;
  requestedByUserName: string;
  requestedByUserPhoneNo: string | null;
  rowId: number;
  systemContextTypeId: number;
  systemContextTypeName: string;
}
interface CreateApprovalWorkflowRequestPayload {}

interface ApprovalWorkflowRequirementType {}

interface ApprovalWorkflowStatus {}
interface CreateApprovalWorkflowStatusPayload {}

interface ApprovalWorkflowType {
  approvalTypeId: number;
  approvalTypeName: string;
  systemContextTypeId: number;
  isNew: boolean;
  createdDate: string;
  createdBy: string | null;
  lastModifiedDate: string | null;
  lastModifiedBy: string | null;
  isDeleted: boolean;
  deletedDate: string | null;
  deletedBy: string | null;
  guid: string;
}
interface CreateApprovalWorkflowTypePayload {}

interface ApprovalWorkflowInstance {}
interface CreateApprovalWorkflowInstancePayload {}

export type {
  ApprovalWorkflowAction,
  ApprovalWorkflowActionOption,
  ApprovalWorkflowActionOptionMap,
  ApprovalWorkflowInstance,
  ApprovalWorkflowPartyInstance,
  ApprovalWorkflowRequest,
  ApprovalWorkflowRequestDocument,
  ApprovalWorkflowRequirementType,
  GetApprovalWorkflowPartyInstances,
  ApprovalWorkflowStatus,
  ApprovalWorkflowType,
  CreateApprovalPartyInstancePayload,
  CreateApprovalWorkflowInstancePayload,
  CreateApprovalWorkflowRequestPayload,
  CreateApprovalWorkflowStatusPayload,
  CreateApprovalWorkflowTypePayload,
};
