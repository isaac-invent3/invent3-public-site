import {
  AnalyticsIcon,
  AssetManagementIcon,
  AuditLogIcon,
  DashboardIcon,
  MaintenanceIcon,
  TaskIcon,
  TemplateIcon,
  TicketIcon,
  UserManagementIcon,
} from '~/lib/components/CustomIcons/layout';
import { ROUTES } from '~/lib/utils/constants';
import { roleAccessMap } from '~/lib/utils/roleAccess';

const sideBarData = [
  {
    name: 'Dashboard',
    route: ROUTES.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    name: 'Asset Management',
    route: ROUTES.ASSETS,
    icon: AssetManagementIcon,
  },
  {
    name: 'Task Management',
    route: ROUTES.TASKS,
    icon: TaskIcon,
  },
  {
    name: 'Maintenance',
    route: ROUTES.MAINTENANCE,
    icon: MaintenanceIcon,
  },
  {
    name: 'Tickets',
    route: ROUTES.TICKETS,
    icon: TicketIcon,
  },
  {
    name: 'Report & Analytics',
    route: ROUTES.REPORT,
    icon: AnalyticsIcon,
  },
  {
    name: 'Template Management',
    route: ROUTES.TEMPLATES,
    icon: TemplateIcon,
  },
  {
    name: 'User Management',
    route: ROUTES.USERS,
    icon: UserManagementIcon,
  },
  {
    name: 'Audit Logs',
    route: ROUTES.AUDIT_LOG,
    icon: AuditLogIcon,
  },
];

function filterSideBarData(userRoles: number[]) {
  // Get all accessible routes for the user's roles
  const accessibleRoutes = new Set(
    userRoles.flatMap((role) => roleAccessMap[role] || [])
  );

  // Filter the sidebar data based on accessible routes
  return sideBarData.filter((item) => accessibleRoutes.has(`/${item.route}`));
}

// async function filterSideBarData() {
//   const session = await getSession();
//   const user = session?.user;
//   const accessibleRoutes = user?.roleRoutePermissions ?? [];
//   // Get all accessible routes for the user's roles
//   const accessibleRoutePaths = new Set(
//     accessibleRoutes.map((route) => route.routePath)
//   );

//   // Filter the sidebar data based on accessible routes
//   return sideBarData.filter((item) =>
//     accessibleRoutePaths.has(`/${item.route}`)
//   );
// }

export { sideBarData, filterSideBarData };
