import { getSession } from 'next-auth/react';
import {
  AnalyticsIcon,
  AssetManagementIcon,
  AuditLogIcon,
  DashboardIcon,
  MaintenanceIcon,
  RoleManagementIcon,
  TaskIcon,
  TemplateIcon,
  TicketIcon,
  UserManagementIcon,
  VendorManagementIcon,
} from '~/lib/components/CustomIcons/layout';
import { SideBarData } from '~/lib/interfaces/general.interfaces';
import { ROUTES } from '~/lib/utils/constants';

const Dashboard: SideBarData = {
  name: 'Dashboard',
  route: ROUTES.DASHBOARD,
  icon: DashboardIcon,
  permissionKey: 'dashboard',
};

const sideBarData: SideBarData[] = [
  {
    name: 'Asset Management',
    route: ROUTES.ASSETS,
    icon: AssetManagementIcon,
    permissionKey: 'asset',
  },
  {
    name: 'Task Management',
    route: ROUTES.TASKS,
    icon: TaskIcon,
    permissionKey: 'task',
  },
  {
    name: 'Maintenance',
    route: ROUTES.MAINTENANCE,
    icon: MaintenanceIcon,
    permissionKey: 'maintenance',
  },
  {
    name: 'Tickets',
    route: ROUTES.TICKETS,
    icon: TicketIcon,
    permissionKey: 'ticket',
  },
  {
    name: 'Report & Analytics',
    route: ROUTES.REPORT,
    icon: AnalyticsIcon,
    permissionKey: 'report',
  },
  {
    name: 'Template Management',
    route: ROUTES.TEMPLATES,
    icon: TemplateIcon,
    permissionKey: 'template',
  },
  {
    name: 'User Management',
    route: ROUTES.USERS,
    icon: UserManagementIcon,
    permissionKey: 'user',
  },

  {
    name: 'Role Management',
    route: ROUTES.ROLES,
    icon: RoleManagementIcon,
    permissionKey: 'role',
  },
  {
    name: 'Audit Logs',
    route: ROUTES.AUDIT_LOG,
    icon: AuditLogIcon,
    permissionKey: 'audit',
  },
  {
    name: 'Vendor Management',
    route: ROUTES.VENDOR,
    icon: VendorManagementIcon,
    permissionKey: 'vendor',
  },
];

async function filterSidebarData() {
  try {
    const session = await getSession();

    if (!session?.user) {
      return [Dashboard]; // Return default dashboard if no session
    }

    const accessibleModules =
      session.user.roleSystemModuleContextPermissions ?? {};

    // Create a Set of permission keys from accessibleModules
    const accessiblePermissionKeys = new Set(Object.values(accessibleModules));

    if (accessiblePermissionKeys.size === 0) {
      return [Dashboard]; // Return default dashboard if no routes are accessible
    }

    // Filter the sidebar data based on accessible permission keys
    const filteredSidebarItems = sideBarData.filter((item) =>
      accessiblePermissionKeys.has(item.permissionKey)
    );

    return [Dashboard, ...filteredSidebarItems];
  } catch (error) {
    return [Dashboard]; // Return default dashboard in case of an error
  }
}

export { sideBarData, filterSidebarData };
