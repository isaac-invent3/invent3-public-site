import { ROUTES, SYSTEM_ROLES } from './constants';

const MANAGER_ROUTES = [
  `/`,
  `/${ROUTES.DASHBOARD}`,
  `/${ROUTES.ASSETS}`,
  `/${ROUTES.ASSETS}/add`,
  `/${ROUTES.ASSETS}/[id]`,
  `/${ROUTES.ASSETS}/[id]/dispose`,
  `/${ROUTES.ASSETS}/[id]/transfer`,
  `/${ROUTES.MAINTENANCE}`,
  `/${ROUTES.MAINTENANCE_PLANS}`,
  `/${ROUTES.MAINTENANCE_PLANS}/[id]`,
  `/${ROUTES.MAINTENANCE_PLANS}/[id]/edit`,
  `/${ROUTES.MAINTENANCE_PLANS}/add`,
  `/${ROUTES.MAINTENANCE_SCHEDULES}`,
  `/${ROUTES.MAINTENANCE_SCHEDULES}/add`,
  `/${ROUTES.MAINTENANCE_SCHEDULES}/instances/[id]/edit`,
  `/${ROUTES.MAINTENANCE_HISTORY}`,
  `/${ROUTES.TASKS}`,
  `/${ROUTES.TICKETS}`,
  `/${ROUTES.REPORT}`,
  `/${ROUTES.REPORT}/[id]`,
  `/${ROUTES.REPORT}/generate`,
  `/${ROUTES.TEMPLATES}`,
  `/${ROUTES.TEMPLATES}/[id]`,
  `/${ROUTES.PROFILE}`,
];

const FRONTDESK_ROUTE = [
  `/`,
  `/${ROUTES.DASHBOARD}`,
  `/${ROUTES.ASSETS}`,
  `/${ROUTES.MAINTENANCE}`,
  `/${ROUTES.MAINTENANCE_PLANS}`,
  `/${ROUTES.MAINTENANCE_SCHEDULES}`,
  `/${ROUTES.TASKS}`,
  `/${ROUTES.TICKETS}`,
  `/${ROUTES.PROFILE}`,
];

const roleAccessMap = {
  [SYSTEM_ROLES.ADMIN]: MANAGER_ROUTES,
  [SYSTEM_ROLES.MANAGER]: MANAGER_ROUTES,
  [SYSTEM_ROLES.EXECUTIVE]: MANAGER_ROUTES,
  [SYSTEM_ROLES.TEAM_MEMBERS]: MANAGER_ROUTES,
  [SYSTEM_ROLES.FRONT_DESK]: FRONTDESK_ROUTE,
};

function doesRoleHaveAccessToURL(roles: number[], url: string) {
  // Ensure roles is always an array
  const roleArray = Array.isArray(roles) ? roles : [roles];
  return roleArray.some((role) => {
    const accessibleRoutes = roleAccessMap[role] || [];

    return accessibleRoutes.some((route) => {
      // Create a regex from the route by replacing dynamic segments
      const regexPattern = route
        .replace(/\[.*?\]/g, '[^/]+')
        .replace('/', '\\/');
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(url);
    });
  });
}

export { doesRoleHaveAccessToURL, roleAccessMap };
