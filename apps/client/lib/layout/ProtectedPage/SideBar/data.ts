import {
  AnalyticsIcon,
  AssetManagementIcon,
  ComplianceIcon,
  DashboardIcon,
  MaintenanceIcon,
  TaskIcon,
  TicketIcon,
} from '~/lib/components/CustomIcons/layout';
import { ROUTES } from '~/lib/utils/constants';

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
    name: 'Compliance',
    route: 'compliance',
    icon: ComplianceIcon,
  },
];

export default sideBarData;
