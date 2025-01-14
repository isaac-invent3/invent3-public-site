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

export default sideBarData;
