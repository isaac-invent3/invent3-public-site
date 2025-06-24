import { BaseEntity, QueryParams } from '@repo/interfaces';

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
  lastModifiedBy?: string;
}

interface GetApprovalWorkflowPartyInstances extends QueryParams {
  approvalWorkFlowInstanceId?: number;
  approvalRequestId?: number;
  levelNumber?: number;
}
interface CreateApprovalWorkflowPartyInstancePayload {
  userId: number | null;
  approvalRequirementTypeId: number | null;
  approvalActionId: number | null;
  parentId: number;
  approvalWorkFlowInstanceId: number;
  approvalRequestId: number;
  levelNumber: number;
  overlap?: boolean;
  createdBy: string;
}

interface UpdateSubsequentPartyInstancesLevelNumbersPayload {
  approvalWorkFlowInstanceId: number;
  alteredLevelNumber: number;
  isLevelDeleted: boolean;
  lastModifiedBy: string;
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
  currentLevel: number | null;
}
interface CreateApprovalWorkflowRequestPayload {}

interface ApprovalWorkflowRequirementType extends BaseEntity {
  approvalRequirementTypeId: number;
  approvalRequirementTypeName: string;
  description: string | null;
}

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

interface ApprovalWorkflowComment extends BaseEntity {
  isNew: boolean;
  commentId: number;
  authorId: number;
  comment: string;
  parentCommentId: number;
  approvalRequestId: number;
}

interface ApprovalWorkflowRequestDocument {
  approvalRequestDocumentId: number;
  guid: string;
  systemContextTypeId: number;
  contextId: number;
  approvalRequestId: number;
  approvalTypeId: number;
  approvalStatusId: number;
  approvalRequestContextId: number;
  documentId: number | null;
  documentName: string | null;
  document: string | null;
  base64Prefix: string | null;
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
  ApprovalWorkflowStatus,
  ApprovalWorkflowType,
  CreateApprovalWorkflowInstancePayload,
  CreateApprovalWorkflowPartyInstancePayload,
  CreateApprovalWorkflowRequestPayload,
  CreateApprovalWorkflowStatusPayload,
  CreateApprovalWorkflowTypePayload,
  GetApprovalWorkflowPartyInstances,
  UpdateSubsequentPartyInstancesLevelNumbersPayload,
  ApprovalWorkflowComment,
};
