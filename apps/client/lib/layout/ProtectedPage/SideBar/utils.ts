import { getSession } from 'next-auth/react';
import {
  AnalyticsIcon,
  AssetManagementIcon,
  AuditLogIcon,
  CompanyIcon,
  DashboardIcon,
  MaintenanceIcon,
  RoleManagementIcon,
  TaskIcon,
  TemplateIcon,
  TicketIcon,
  UserManagementIcon,
  VendorManagementIcon,
} from '~/lib/components/CustomIcons/layout';
import { DashboardView } from '~/lib/interfaces/dashboard.interfaces';
import { SideBarData } from '~/lib/interfaces/general.interfaces';
import { ROLE_IDS_ENUM, ROUTES } from '~/lib/utils/constants';

const DashboardViewMaps: Record<
  number,
  {
    name: string;
    route: DashboardView;
  }
> = {
  [ROLE_IDS_ENUM.SUPER_ADMIN]: {
    name: 'Super Admin',
    route: 'executive',
  },
  [ROLE_IDS_ENUM.CLIENT_ADMIN]: {
    name: 'Client Admin',
    route: 'client_admin',
  },
  [ROLE_IDS_ENUM.EXECUTIVE]: {
    name: 'Executive',
    route: 'executive',
  },
  [ROLE_IDS_ENUM.OPERATION_MANAGER]: {
    name: 'Operation Manager',
    route: 'operation_manager',
  },
  [ROLE_IDS_ENUM.FIELD_ENGINEER]: {
    name: 'Field Engineer',
    route: 'client_admin',
  },
  [ROLE_IDS_ENUM.FRONT_DESK]: {
    name: 'Front Desk',
    route: 'front_desk',
  },
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
    name: 'Vendor Management',
    route: ROUTES.VENDOR,
    icon: VendorManagementIcon,
    permissionKey: 'vendor',
  },
  {
    name: 'Audit Logs',
    route: ROUTES.AUDIT_LOG,
    icon: AuditLogIcon,
    permissionKey: 'audit',
  },
  {
    name: 'Compliance',
    route: ROUTES.COMPLIANCE,
    icon: TemplateIcon,
    permissionKey: 'audit',
  },
  {
    name: 'Settings',
    route: ROUTES.SETTINGS,
    icon: TemplateIcon,
    permissionKey: 'audit',
  },
  {
    name: 'Company Management',
    route: ROUTES.COMPANY,
    icon: CompanyIcon,
    permissionKey: 'audit',
  },
];

async function filterSidebarData() {
  const BaseDashboard: SideBarData = {
    name: 'Dashboard',
    route: ROUTES.DASHBOARD,
    icon: DashboardIcon,
    permissionKey: 'dashboard',
    children: [],
  };
  try {
    const session = await getSession();

    if (!session?.user) {
      return [BaseDashboard]; // Return default dashboard if no session
    }

    const roleIds = session?.user?.roleIds;

    // Filter valid Dashboard views based on roleIds
    const validDashboardViews = roleIds
      .map((roleId) => DashboardViewMaps[roleId])
      .filter((view) => view !== undefined);

    const Dashboard: SideBarData = {
      ...BaseDashboard,
      name: `Dashboard${validDashboardViews.length > 1 ? 's' : ''}`,
      children:
        validDashboardViews.length > 1
          ? validDashboardViews.map((view) => ({
              name: view.name,
              route: `${ROUTES.DASHBOARD}?view=${view.route}`,
            }))
          : [],
    };

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
    return [BaseDashboard]; // Return default dashboard in case of an error
  }
}

export { sideBarData, filterSidebarData };
