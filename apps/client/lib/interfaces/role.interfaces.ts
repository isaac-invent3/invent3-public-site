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

type PermissionKey =
  | 'dashboard'
  | 'asset'
  | 'role'
  | 'task'
  | 'maintenance_plan'
  | 'maintenance_schedule'
  | 'maintenance_history'
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
  | 'asset:dispose'
  | 'asset:raise_ticket'
  | 'maintenance_plan:create'
  | 'maintenance_plan:edit'
  | 'maintenance_plan:delete'
  | 'maintenance_schedule:create'
  | 'maintenance_schedule:edit'
  | 'maintenance_schedule:delete'
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
  | 'user:create'
  | 'user:edit'
  | 'user:delete'
  | 'user:reset_password'
  | 'user:deactivate'
  | 'approval:approve'
  | 'approval:delete';

export type { Role, PermissionKey };
