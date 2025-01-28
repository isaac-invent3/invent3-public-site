import { PermissionKey } from '../interfaces/role.interfaces';
import { ROUTES } from './constants';

const ROUTES_PERMISSION_KEY: { [name: string]: PermissionKey } = {
  [`/${ROUTES.DASHBOARD}`]: 'dashboard',
  [`/${ROUTES.ASSETS}`]: 'asset',
  [`/${ROUTES.ASSETS}/add`]: 'asset:create',
  [`/${ROUTES.ASSETS}/[id]/edit`]: 'asset:edit',
  [`/${ROUTES.ASSETS}/[id]/dispose`]: 'asset:dispose',
  [`/${ROUTES.ASSETS}/[id]/transfer`]: 'asset:transfer',
  [`/${ROUTES.ASSETS}/bulk-dispose`]: 'asset:dispose',
  [`/${ROUTES.ASSETS}/bulk-transfer`]: 'asset:transfer',
  [`/${ROUTES.MAINTENANCE}`]: 'maintenance_plan',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_PLANS}`]: 'maintenance_plan',
  [`/${ROUTES.MAINTENANCE_PLANS}/add`]: 'maintenance_plan:create',
  [`/${ROUTES.MAINTENANCE_PLANS}/[id]/edit`]: 'maintenance_plan:edit',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_SCHEDULES}`]:
    'maintenance_schedule',
  [`/${ROUTES.MAINTENANCE_SCHEDULES}/[id]/edit`]: 'maintenance_schedule:edit',
  [`/${ROUTES.MAINTENANCE_SCHEDULES}/add`]: 'maintenance_schedule:create',
  [`/${ROUTES.MAINTENANCE_SCHEDULES}/instances/[id]/edit`]:
    'maintenance_schedule:edit',
  [`/${ROUTES.MAINTENANCE}/${ROUTES.MAINTENANCE_HISTORY}`]:
    'maintenance_history',
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
  [`/${ROUTES.AUDIT_LOG}`]: 'audit',
  [`/${ROUTES.ROLES}`]: 'role',
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
