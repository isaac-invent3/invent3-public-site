import { PermissionKey } from '../interfaces/role.interfaces';
import { ROUTES } from './constants';

const ROUTES_PERMISSION_KEY: { [name: string]: PermissionKey } = {
  [`/${ROUTES.DASHBOARD}`]: 'dashboard',
  [`/${ROUTES.ASSETS}`]: 'asset',
  [`/${ROUTES.ASSETS}/asset-count`]: 'asset',
  [`/${ROUTES.ASSETS}/add`]: 'asset:create',
  [`/${ROUTES.ASSETS}/[id]/edit`]: 'asset:edit',
  [`/${ROUTES.ASSETS}/[id]/dispose`]: 'asset:dispose',
  [`/${ROUTES.ASSETS}/[id]/transfer`]: 'asset:transfer',
  [`/${ROUTES.ASSETS}/bulk-dispose`]: 'asset:dispose',
  [`/${ROUTES.ASSETS}/bulk-transfer`]: 'asset:transfer',
  [`/${ROUTES.MAINTENANCE}`]: 'maintenance',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}`]: 'maintenance',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}/add`]:
    'maintenance:plan_create',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}/[id]/edit`]:
    'maintenance:plan_edit',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}`]: 'maintenance',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}/[id]/edit`]:
    'maintenance:schedule_edit',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}/add`]:
    'maintenance:schedule_create',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}/instances/[id]/edit`]:
    'maintenance:schedule_edit',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_HISTORY}`]: 'maintenance',
  [`/${ROUTES.TASKS}`]: 'task',
  [`/${ROUTES.TASKS}/add`]: 'task:create',
  [`/${ROUTES.TASKS}/bulk-update`]: 'task:edit',
  [`/${ROUTES.TASKS}/[id]`]: 'task',
  [`/${ROUTES.TASKS}/[id]/edit`]: 'task:edit',
  [`/${ROUTES.TICKETS}`]: 'ticket',
  [`/${ROUTES.TICKETS}/bulk-update`]: 'ticket:edit',
  [`/${ROUTES.REPORT}`]: 'report',
  [`/${ROUTES.REPORT}/[id]`]: 'report',
  [`/${ROUTES.REPORT}/generate`]: 'report:generate',
  [`/${ROUTES.TEMPLATES}`]: 'template',
  [`/${ROUTES.TEMPLATES}/[id]/detail`]: 'template',
  [`/${ROUTES.PROFILE}`]: 'profile',
  [`/${ROUTES.USERS}`]: 'user',
  [`/${ROUTES.USERS}/add`]: 'user:create',
  [`/${ROUTES.USERS}/directory`]: 'user:create',
  [`/${ROUTES.USERS}/[id]/edit`]: 'user',
  [`/${ROUTES.AUDIT_LOG}`]: 'audit',
  [`/${ROUTES.ROLES}`]: 'role',
  [`/${ROUTES.ROLES}/role/[id]/detail`]: 'role',
  [`/${ROUTES.VENDOR}`]: 'vendor',
  [`/${ROUTES.VENDOR}/add`]: 'vendor:create',
  [`/${ROUTES.VENDOR}/[id]/edit`]: 'vendor:edit',
  [`/${ROUTES.VENDOR}/[id]/edit`]: 'vendor:edit',
  [`/${ROUTES.COMPANY}`]: 'company',
  [`/${ROUTES.COMPANY}/[id]/details`]: 'company',
  [`/${ROUTES.COMPANY}/add`]: 'company:create',
  [`/${ROUTES.COMPANY}/[id]/edit`]: 'company:edit',
  [`/${ROUTES.SETTINGS}`]: 'settings',
  [`/${ROUTES.COMPLIANCE}`]: 'settings',
  [`/${ROUTES.APPROVAL}`]: 'approval',
  [`/${ROUTES.APPROVAL}/[id]`]: 'approval',
};

function getPathPermissionKey(pathname: string): PermissionKey | undefined {
  // Iterate through the ROUTES_PERMISSION_KEY object to find a match
  for (const route in ROUTES_PERMISSION_KEY) {
    // Create a regex from the route by replacing dynamic segments with a pattern
    const regexPattern = route
      .replace(/\[.*?\]/g, '[^/]+')
      .replace(/\//g, '\\/');
    const regex = new RegExp(`^${regexPattern}$`);
    if (regex.test(pathname)) {
      return ROUTES_PERMISSION_KEY[route];
    }
  }

  // If no match is found, return undefined
  return undefined;
}

export { getPathPermissionKey };
