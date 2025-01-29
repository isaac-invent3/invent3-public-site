import { FORM_ENUM } from '../utils/constants';

interface Role {
  isNew: boolean;
  createdDate: string;
  createdBy: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  isDeleted: boolean;
  deletedDate: string;
  deletedBy: string;
  guid: string;
  roleId: number;
  roleName: string;
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

type PermissionKey =
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
  | 'approval:delete';

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
  Role,
  PermissionKey,
  RoleSystemModuleContextPermission,
  RoleModulePermission,
  createRoleModulePermissionPayload,
  updateRoleModulePermissionPayload,
};
