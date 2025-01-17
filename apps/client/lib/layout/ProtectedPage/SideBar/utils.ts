import {
  AnalyticsIcon,
  AssetManagementIcon,
  DashboardIcon,
  MaintenanceIcon,
  TaskIcon,
  TemplateIcon,
  TicketIcon,
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
];

function filterSideBarData(userRoles: number[]) {
  // Get all accessible routes for the user's roles
  const accessibleRoutes = new Set(
    userRoles.flatMap((role) => roleAccessMap[role] || [])
  );

  // Filter the sidebar data based on accessible routes
  return sideBarData.filter((item) => accessibleRoutes.has(`/${item.route}`));
}

export { sideBarData, filterSideBarData };
