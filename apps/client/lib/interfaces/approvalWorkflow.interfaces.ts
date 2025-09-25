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
  displayColorCode: string;
  approvalRequestId: number;
  approvalRequirementTypeId: number;
  approvalRequirementTypeName: string;
  employeeDesignation: string;
  lastModifiedBy?: string;
  actionDate?: string;
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

interface UpdateApprovalWorkflowPartyInstancePayload {
  approvalWorkFlowInstanceId: number;
  approvalWorkFlowPartyInstanceId: number;
  approvalActionId: number | null;
  approvalRequestId: number;
  approvalRequirementTypeId: number | null;
  userId: number | null;
  levelNumber: number;
  lastModifiedBy: string;
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
  displayColorCode: string;
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

interface ApprovalWorkflowComment {
  commentId: number;
  guid: string;
  authorId: number;
  comment: string;
  parentCommentId: number;
  approvalRequestId: number;
  dateCreated: string;
  author: string;
  username: string;
  authorStatusId: number;
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

interface ApprovalWorkflow {
  rowId: number;
  approvalWorkFlowId: number;
  approvalWorkFlowName: string;
  guid: string;
  description: string;
  numberOfApprovalLevels: number;
  isDefaultApprovalWorkFlow: boolean;
  isDeleted: boolean;
  approvalTypeId: number;
  approvalTypeName: string;
  systemContextTypeId: number;
  totalNoOfParties: number;
  turnAroundTime: number;
  escalationTurnAroundTime: number;
}

interface ApprovalWorkflowParty {
  rowId: number;
  approvalWorkFlowPartyId: number;
  guid: string;
  levelNumber: number;
  isDeleted: boolean;
  approvalWorkFlowId: number;
  approvalWorkFlowName: string;
  approvalActionId: number;
  actionName: string;
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  approvalRequirementTypeId: number;
  approvalRequirementTypeName: string;
  employeeDesignation: string;
}

interface CreateApprovalWorkflowPayload {
  createApprovalWorkFlowDto: {
    approvalWorkFlowName: string;
    description: string;
    approvalTypeId: number;
    isDefaultApprovalWorkFlow: boolean;
    createdBy: string;
  };
  createApprovalWorkFlowPartyDtos: {
    approvalWorkFlowPartyId: number | null;
    approvalWorkFlowId: number;
    userId: number;
    approvalActionId: number;
    levelNumber: number;
    approvalRequirementTypeId: number;
    actionType: number;
    changeInitiatedBy: string;
  }[];
  escalatorForLevel: {
    [key: number]: number;
  } | null;
  turnAroundTime: number;
  escalationTurnAroundTime: number;
}

interface UpdateApprovalWorkflowPayload {
  updateApprovalWorkFlowDto: {
    approvalWorkFlowId: number;
    approvalWorkFlowName: string;
    description: string;
    approvalTypeId: number;
    isDefaultApprovalWorkFlow: boolean;
    lastModifiedBy: string;
  };
  updateApprovalWorkFlowPartyDtos: {
    approvalWorkFlowPartyId: number | null;
    approvalWorkFlowId: number;
    userId: number;
    approvalActionId: number;
    levelNumber: number;
    approvalRequirementTypeId: number;
    actionType: number;
    changeInitiatedBy: string;
  }[];
  escalatorForLevel: {
    [key: number]: number;
  } | null;
  turnAroundTime: number;
  escalationTurnAroundTime: number;
}

interface ApprovalLevel {
  levelNumber: number;
  approvers: {
    userId: number;
    partyId: number | null;
    userFullName: string | null;
    approvalActionId: number;
    approvalActionName: string;
  }[];
  escalatorApprover?: EscalatorApprover | null;
}

interface EscalatorApprover {
  userId: number;
  userFullName: string | null;
}

interface CreateApprovalWorkflowTypePayload {}
interface ApprovalWorkflowInstance {}
interface CreateApprovalWorkflowInstancePayload {}

interface CreateApprovalWorkflowFormikValues {
  approvalTypeId: number | null;
  approvalLevel: number;
  approvalWorkFlowName?: string;
  description?: string;
  isDefaultApprovalWorkFlow?: boolean;
  levels: ApprovalLevel[];
  deletedParties: { partyId: number; levelNumber: number }[];
  turnaroundTime: number | null;
  escalationTurnaroundTime: number | null;
}

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
  ApprovalWorkflow,
  CreateApprovalWorkflowPayload,
  ApprovalLevel,
  CreateApprovalWorkflowFormikValues,
  UpdateApprovalWorkflowPayload,
  ApprovalWorkflowParty,
  UpdateApprovalWorkflowPartyInstancePayload,
  EscalatorApprover,
};
