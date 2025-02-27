import { FORM_ENUM } from '../utils/constants';

interface Role {
  roleId: number;
  roleName: string;
  noOfAssociatedUsers: number;
  noOfAssignedSystemModuleContextTypes: number;
  dateCreated: string;
  currentStatusId: number;
  currentStatusName: string;
  currentStatusDisplayColorCode: string;
  isDeleted: boolean;
}

interface RoleSystemModuleContextPermission {
  rowId: number;
  roleSystemModuleContextPermissionId: number;
  guid: string;
  roleId: number;
  roleName: string;
  systemModuleContextTypeId: number;
  systemModuleContextTypeName: string;
  systemModuleContextTypeKeyName: string;
  systemModuleContextDescription: string;
  systemSubModuleContextTypeId: number;
  subModuleContextTypeName: string;
  subModuleContextTypeKeyName: string;
  subModuleContextDescription: string;
}

interface RoleModulePermission {
  roleSystemModuleContextPermissionId: number | null;
  systemModuleContextTypeId: number | null;
  systemSubModuleContextTypeId: number | null;
}

type ModuleKey =
  | 'dashboard'
  | 'asset'
  | 'role'
  | 'task'
  | 'maintenance'
  | 'ticket'
  | 'report'
  | 'audit'
  | 'user'
  | 'template'
  | 'vendor'
  | 'compliance'
  | 'approval'
  | 'profile'
  | 'company'
  | 'settings';

type SubModuleKey =
  | 'asset:create'
  | 'asset:edit'
  | 'asset:delete'
  | 'asset:transfer'
  | 'asset:dispose'
  | 'asset:raise_ticket'
  | 'maintenance:plan_create'
  | 'maintenance:plan_edit'
  | 'maintenance_plan:delete'
  | 'maintenance:schedule_create'
  | 'maintenance:schedule_edit'
  | 'maintenance:schedule_delete'
  | 'task:create'
  | 'task:edit'
  | 'task:delete'
  | 'task:mark_completed'
  | 'ticket:create'
  | 'ticket:edit'
  | 'ticket:assign'
  | 'ticket:schedule'
  | 'ticket:delete'
  | 'ticket:mark_completed'
  | 'template:edit'
  | 'template:delete'
  | 'report:generate'
  | 'report:save'
  | 'role:create'
  | 'role:assign_permission'
  | 'role:delete'
  | 'user:create'
  | 'user:edit'
  | 'user:delete'
  | 'user:reset_password'
  | 'user:deactivate'
  | 'approval:approve'
  | 'approval:delete'
  | 'vendor:create'
  | 'vendor:edit'
  | 'vendor:delete'
  | 'company:create'
  | 'company:edit'
  | 'company:delete';

type PermissionKey = ModuleKey | SubModuleKey;

interface RoleSystemModuleContextPermissionDtos {
  roleSystemModuleContextPermissionId: number | null;
  roleId?: number | null;
  systemModuleContextTypeId: number;
  systemSubModuleContextTypeId: number;
  changeInitiatedBy: string;
}

interface createRoleSystemModuleContextPermissionDtos
  extends RoleSystemModuleContextPermissionDtos {
  actionType: typeof FORM_ENUM.add;
}

interface updateRoleSystemModuleContextPermissionDtos
  extends RoleSystemModuleContextPermissionDtos {
  actionType: typeof FORM_ENUM.add | typeof FORM_ENUM.delete;
}

interface createRoleModulePermissionPayload {
  createRoleDto: {
    roleName: string;
    createdBy: string;
  };
  createRoleSystemModuleContextPermissionDtos: createRoleSystemModuleContextPermissionDtos[];
}

interface updateRoleModulePermissionPayload {
  updateRoleDto: {
    roleId: number;
    roleName?: string;
    lastModifiedBy: string;
  };
  updateRoleSystemModuleContextPermissionDtos: updateRoleSystemModuleContextPermissionDtos[];
}

export type {
  createRoleModulePermissionPayload,
  ModuleKey,
  PermissionKey,
  Role,
  RoleModulePermission,
  RoleSystemModuleContextPermission,
  SubModuleKey,
  updateRoleModulePermissionPayload,
};
