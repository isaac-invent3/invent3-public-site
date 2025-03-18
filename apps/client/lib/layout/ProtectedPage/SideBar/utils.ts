import { getSession } from 'next-auth/react';
import {
  AnalyticsIcon,
  AssetManagementIcon,
  AuditLogIcon,
  CompanyIcon,
  DashboardIcon,
  FeedbackIcon,
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
import {
  ROLE_IDS_ENUM,
  ROUTES,
  SYSTEM_CONTEXT_TYPE,
} from '~/lib/utils/constants';

const DashboardViewMaps: Record<
  number,
  {
    name: string;
    route: DashboardView;
  }
> = {
  [ROLE_IDS_ENUM.SUPER_ADMIN]: {
    name: 'Super Admin',
    route: 'super_admin',
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
    route: 'field_engineer',
  },
  [ROLE_IDS_ENUM.FRONT_DESK]: {
    name: 'Front Desk',
    route: 'front_desk',
  },
};

const clientSideBarData: SideBarData[] = [
  {
    name: 'Asset Management',
    route: ROUTES.ASSETS,
    icon: AssetManagementIcon,
    permissionKey: 'asset',
    contextId: SYSTEM_CONTEXT_TYPE.ASSETS,
    description:
      'Organize, track, and optimize asset lifecycles for efficiency and cost savings.',
  },
  {
    name: 'Task Management',
    route: ROUTES.TASKS,
    icon: TaskIcon,
    permissionKey: 'task',
    contextId: SYSTEM_CONTEXT_TYPE.TASKS,
    description:
      'Assign, prioritize, and monitor tasks to streamline workflow and productivity.',
  },
  {
    name: 'Maintenance',
    route: ROUTES.MAINTENANCE,
    icon: MaintenanceIcon,
    permissionKey: 'maintenance',
    description:
      'Structured strategy for preventive and corrective maintenance',
  },
  {
    name: 'Tickets',
    route: ROUTES.TICKETS,
    icon: TicketIcon,
    permissionKey: 'ticket',
    contextId: SYSTEM_CONTEXT_TYPE.TICKETS,

    description: 'Track, manage, and resolve customer issues and requests.',
  },
  {
    name: 'Report & Analytics',
    route: ROUTES.REPORT,
    icon: AnalyticsIcon,
    permissionKey: 'report',
    description: `Analyze and visualize data to make informed decisions and drive business growth.`,
  },
  {
    name: 'Template Management',
    route: ROUTES.TEMPLATES,
    icon: TemplateIcon,
    permissionKey: 'template',
    contextId: SYSTEM_CONTEXT_TYPE.TEMPLATES,

    description:
      'Create, store, and modify standardized templates for consistency.',
  },
  {
    name: 'User Management',
    route: ROUTES.USERS,
    icon: UserManagementIcon,
    permissionKey: 'user',
    contextId: SYSTEM_CONTEXT_TYPE.USERS,

    description:
      'Control access, roles, and permissions for secure user administration.',
  },

  {
    name: 'Role Management',
    route: ROUTES.ROLES,
    icon: RoleManagementIcon,
    permissionKey: 'role',
    contextId: SYSTEM_CONTEXT_TYPE.ROLES,

    description:
      'Define and manage user roles to enforce security and responsibilities.',
  },
  {
    name: 'Partner Management',
    route: ROUTES.VENDOR,
    icon: VendorManagementIcon,
    permissionKey: 'vendor',
    contextId: SYSTEM_CONTEXT_TYPE.VENDOR,

    description:
      'Manage vendor relationships and contracts for efficient procurement.',
    children: [
      {
        name: 'Vendor',
        route: ROUTES.VENDOR,
      },
      {
        name: 'Service Provider',
        route: '#',
      },
    ],
  },
  {
    name: 'Audit Logs',
    route: ROUTES.AUDIT_LOG,
    icon: AuditLogIcon,
    permissionKey: 'audit',
    contextId: SYSTEM_CONTEXT_TYPE.AUDIT,
    description:
      'Track and monitor system activities for security and compliance.',
  },
  {
    name: 'Compliance',
    route: ROUTES.COMPLIANCE,
    icon: TemplateIcon,
    permissionKey: 'audit',
    description:
      'Manage compliance requirements and certifications for regulatory adherence.',
  },

  {
    name: 'Feedback',
    route: ROUTES.FEEDBACK,
    icon: FeedbackIcon,
    permissionKey: 'feedback',
    description:
      'Manage Feedback of the system.',
  },
];

const sideBarData: SideBarData[] = [
  ...clientSideBarData,
  {
    name: 'Company Management',
    route: ROUTES.COMPANY,
    icon: CompanyIcon,
    permissionKey: 'company',
    contextId: SYSTEM_CONTEXT_TYPE.COMPANY,
    description:
      'Manage company details and settings for organizational control.',
  },
];

async function filterSidebarData() {
  const BaseDashboard: SideBarData = {
    name: 'Dashboard',
    route: ROUTES.DASHBOARD,
    icon: DashboardIcon,
    permissionKey: 'dashboard',
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

export { clientSideBarData, filterSidebarData, sideBarData };
